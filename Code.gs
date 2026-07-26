/*******************************************************************
 * NIQESH — Google Apps Script Backend
 * Deploy as Web App (Execute as: Me, Access: Anyone)
 *******************************************************************/

const MASTER_CLIENTS_SHEET_NAME = 'Niqesh Clients';
const MASTER_SUBSCRIPTIONS_SHEET_NAME = 'Niqesh Subscription Requests';

const PRODUCTS_HEADERS = ['Item Name', 'Size', 'Cost', 'Price'];
const SALES_HEADERS = ['Date', 'Item Name', 'Quantity', 'Sell Price', 'Cost Price', 'Discount', 'Notes', 'Session ID'];
const EXPENSES_HEADERS = ['Date', 'Category', 'Description', 'Amount'];
const COLLECTIONS_HEADERS = ['Date', 'Description', 'Amount'];
const DUES_HEADERS = ['Date', 'Customer Name Description', 'Amount'];
const EXPENSE_CATEGORY_LIST = ['Rent','Salary','Utility Bills','Transportation','Refreshments','Dealer Payoff','Marketing','Miscellaneous'];

/* ---------------------------- ENTRY POINTS ---------------------------- */

function doGet(e) {
  return handleRequest(e);
}
function doPost(e) {
  return handleRequest(e);
}

function handleRequest(e) {
  let params = {};
  try {
    if (e.postData && e.postData.contents) {
      params = JSON.parse(e.postData.contents);
    } else if (e.parameter) {
      params = e.parameter;
    }
  } catch (err) {
    return jsonResponse({ error: 'Invalid request payload' });
  }

  const action = params.action;
  try {
    let result;
    switch (action) {
      case 'setupClient': result = setupClient(params); break;
      case 'checkStatus': result = checkStatus(params.sheetId); break;
      case 'updateClientProfile': result = updateClientProfile(params); break;
      case 'getClientProfile': result = getClientProfile(params.sheetId); break;
      case 'recoverAccount': result = recoverAccount(params.recoveryPIN); break;
      case 'getProducts': result = getProducts(params.sheetId); break;
      case 'addProduct': result = addProduct(params); break;
      case 'updateProduct': result = updateProduct(params); break;
      case 'deleteProduct': result = deleteProduct(params.sheetId, params.rowIndex); break;
      case 'saveSale': result = saveSale(params); break;
      case 'saveSaleSession': result = saveSaleSession(params); break;
      case 'saveExpense': result = saveExpense(params); break;
      case 'saveCollection': result = saveCollection(params); break;
      case 'saveDue': result = saveDue(params); break;
      case 'deleteEntry': result = deleteEntry(params.sheetId, params.tabName, params.rowIndex); break;
      case 'getDailySummary': result = getDailySummary(params.sheetId); break;
      case 'getDailyReport': result = getDailyReport(params.sheetId, params.date); break;
      case 'getMonthContext': result = getMonthContext(params.sheetId, params.month, params.year); break;
      case 'getMonthlyReport': result = getMonthlyReport(params.sheetId, params.month, params.year); break;
      case 'saveSubscriptionRequest': result = saveSubscriptionRequest(params); break;
      case 'getRecentEntries': result = getRecentEntries(params.sheetId); break;
      default: result = { error: 'Unknown action: ' + action };
    }
    return jsonResponse(result);
  } catch (err) {
    return jsonResponse({ error: err.message });
  }
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

/* ---------------------------- HELPERS ---------------------------- */

function todayStr() {
  return Utilities.formatDate(new Date(), Session.getScriptTimeZone() || 'GMT', 'dd/MM/yyyy');
}
function numOrZero(v) { const n = parseFloat(v); return isNaN(n) ? 0 : n; }
function round2(n) { return Math.round(n * 100) / 100; }

function getOrCreateMasterSheet(name, headers) {
  let files = DriveApp.getFilesByName(name);
  let ss;
  if (files.hasNext()) {
    ss = SpreadsheetApp.open(files.next());
  } else {
    ss = SpreadsheetApp.create(name);
    const sheet = ss.getSheets()[0];
    sheet.setName('Data');
    sheet.appendRow(headers);
  }
  return ss.getSheets()[0];
}

function getSheetById(sheetId) {
  return SpreadsheetApp.openById(sheetId);
}
function getTab(ss, tabName, headers) {
  let sheet = ss.getSheetByName(tabName);
  if (!sheet) {
    sheet = ss.insertSheet(tabName);
    sheet.appendRow(headers);
  }
  return sheet;
}
function readRows(sheet) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return [];
  return sheet.getRange(2, 1, lastRow - 1, sheet.getLastColumn()).getValues();
}
function findAboutRowIndex(aboutSheet, label) {
  const data = aboutSheet.getDataRange().getValues();
  for (let i = 0; i < data.length; i++) {
    if (data[i][0] === label) return i + 1; // 1-based row number
  }
  return -1;
}
function getAboutValue(aboutSheet, label) {
  const idx = findAboutRowIndex(aboutSheet, label);
  if (idx === -1) return '';
  return aboutSheet.getRange(idx, 2).getValue();
}
function setAboutValue(aboutSheet, label, value) {
  const idx = findAboutRowIndex(aboutSheet, label);
  if (idx === -1) {
    aboutSheet.appendRow([label, value]);
  } else {
    aboutSheet.getRange(idx, 2).setValue(value);
  }
}
function parseDDMMYYYY(str) {
  if (!str) return null;
  const parts = String(str).split('/');
  if (parts.length !== 3) return null;
  return { d: parseInt(parts[0], 10), m: parseInt(parts[1], 10), y: parseInt(parts[2], 10) };
}
function dateMatches(cellValue, dateStr) {
  const target = parseDDMMYYYY(dateStr);
  if (!target) return false;
  let d;
  if (cellValue instanceof Date) {
    d = { d: cellValue.getDate(), m: cellValue.getMonth() + 1, y: cellValue.getFullYear() };
  } else {
    d = parseDDMMYYYY(cellValue);
  }
  if (!d) return false;
  return d.d === target.d && d.m === target.m && d.y === target.y;
}
function dateMatchesMonthYear(cellValue, month, year) {
  let d;
  if (cellValue instanceof Date) {
    d = { m: cellValue.getMonth() + 1, y: cellValue.getFullYear() };
  } else {
    const p = parseDDMMYYYY(cellValue);
    if (!p) return false;
    d = { m: p.m, y: p.y };
  }
  return d.m === parseInt(month, 10) && d.y === parseInt(year, 10);
}
function dayOfCell(cellValue) {
  if (cellValue instanceof Date) return cellValue.getDate();
  const p = parseDDMMYYYY(cellValue);
  return p ? p.d : null;
}

/* ---------------------------- CLIENT SETUP ---------------------------- */

function generateRecoveryPIN(masterSheet) {
  const existing = readRows(masterSheet).map((r) => String(r[9])); // Recovery PIN column index 9
  let pin;
  do {
    pin = String(Math.floor(100000 + Math.random() * 900000));
  } while (existing.indexOf(pin) !== -1);
  return pin;
}

function setupClient(p) {
  const masterHeaders = ['Business Name','Owner Name','Phone','WhatsApp','Email','District','Division','Sheet ID','Sheet URL','Recovery PIN','Date Created','Status','Valid Until','Last Updated'];
  const masterSheet = getOrCreateMasterSheet(MASTER_CLIENTS_SHEET_NAME, masterHeaders);

  const recoveryPIN = generateRecoveryPIN(masterSheet);

  const ss = SpreadsheetApp.create(p.businessName || 'Niqesh Client');
  const sheetId = ss.getId();
  const sheetURL = ss.getUrl();

  // Rename first default sheet then create the rest
  const defaultSheet = ss.getSheets()[0];
  defaultSheet.setName('Products');
  defaultSheet.appendRow(PRODUCTS_HEADERS);

  const salesSheet = ss.insertSheet('Sales');
  salesSheet.appendRow(SALES_HEADERS);

  const expensesSheet = ss.insertSheet('Expenses');
  expensesSheet.appendRow(EXPENSES_HEADERS);

  const collectionsSheet = ss.insertSheet('Collections');
  collectionsSheet.appendRow(COLLECTIONS_HEADERS);

  const duesSheet = ss.insertSheet('Dues');
  duesSheet.appendRow(DUES_HEADERS);

  const aboutSheet = ss.insertSheet('About');
  const created = todayStr();
  const aboutRows = [
    ["Business Name", p.businessName || ''],
    ["Owner's Name", p.ownerName || ''],
    ["Phone Number", p.phone || ''],
    ["WhatsApp Number", p.whatsapp || ''],
    ["Email Address", p.email || ''],
    ["House Street", p.houseStreet || ''],
    ["Police Station", p.policeStation || ''],
    ["District", p.district || ''],
    ["Division", p.division || ''],
    ["Zip Code", p.zipCode || ''],
    ["Sheet ID", sheetId],
    ["Recovery PIN", recoveryPIN],
    ["Date Created", created],
    ["Status", "Trial"],
    ["Valid Until", ""],
    ["Activated On", ""]
  ];
  aboutSheet.getRange(1, 1, aboutRows.length, 2).setValues(aboutRows);

  masterSheet.appendRow([
    p.businessName || '', p.ownerName || '', p.phone || '', p.whatsapp || '', p.email || '',
    p.district || '', p.division || '', sheetId, sheetURL, recoveryPIN, created, 'Trial', '', created
  ]);

  return { sheetId: sheetId, sheetURL: sheetURL, recoveryPIN: recoveryPIN };
}

function checkStatus(sheetId) {
  const ss = getSheetById(sheetId);
  const aboutSheet = ss.getSheetByName('About');
  const status = getAboutValue(aboutSheet, 'Status') || 'Trial';
  const validUntil = getAboutValue(aboutSheet, 'Valid Until') || '';
  const activatedOn = getAboutValue(aboutSheet, 'Activated On') || '';
  return { status: status, validUntil: validUntil, activatedOn: activatedOn };
}

function updateClientProfile(p) {
  const ss = getSheetById(p.sheetId);
  const aboutSheet = ss.getSheetByName('About');
  setAboutValue(aboutSheet, 'Business Name', p.businessName || '');
  setAboutValue(aboutSheet, "Owner's Name", p.ownerName || '');
  setAboutValue(aboutSheet, 'Phone Number', p.phone || '');
  setAboutValue(aboutSheet, 'WhatsApp Number', p.whatsapp || '');
  setAboutValue(aboutSheet, 'Email Address', p.email || '');
  setAboutValue(aboutSheet, 'House Street', p.houseStreet || '');
  setAboutValue(aboutSheet, 'Police Station', p.policeStation || '');
  setAboutValue(aboutSheet, 'District', p.district || '');
  setAboutValue(aboutSheet, 'Division', p.division || '');
  setAboutValue(aboutSheet, 'Zip Code', p.zipCode || '');

  const masterSheet = getOrCreateMasterSheet(MASTER_CLIENTS_SHEET_NAME, []);
  const data = masterSheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (String(data[i][7]) === String(p.sheetId)) {
      masterSheet.getRange(i + 1, 1, 1, 7).setValues([[p.businessName||'', p.ownerName||'', p.phone||'', p.whatsapp||'', p.email||'', p.district||'', p.division||'']]);
      masterSheet.getRange(i + 1, 14).setValue(todayStr());
      break;
    }
  }
  return { success: true };
}

function getClientProfile(sheetId) {
  const ss = getSheetById(sheetId);
  const aboutSheet = ss.getSheetByName('About');
  return {
    businessName: getAboutValue(aboutSheet, 'Business Name'),
    ownerName: getAboutValue(aboutSheet, "Owner's Name"),
    phone: getAboutValue(aboutSheet, 'Phone Number'),
    whatsapp: getAboutValue(aboutSheet, 'WhatsApp Number'),
    email: getAboutValue(aboutSheet, 'Email Address'),
    houseStreet: getAboutValue(aboutSheet, 'House Street'),
    policeStation: getAboutValue(aboutSheet, 'Police Station'),
    district: getAboutValue(aboutSheet, 'District'),
    division: getAboutValue(aboutSheet, 'Division'),
    zipCode: getAboutValue(aboutSheet, 'Zip Code'),
    recoveryPIN: getAboutValue(aboutSheet, 'Recovery PIN')
  };
}

function recoverAccount(recoveryPIN) {
  const masterSheet = getOrCreateMasterSheet(MASTER_CLIENTS_SHEET_NAME, []);
  const data = masterSheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (String(data[i][9]) === String(recoveryPIN)) {
      return { sheetId: data[i][7], businessName: data[i][0] };
    }
  }
  return { error: 'Recovery PIN not found' };
}

/* ---------------------------- PRODUCTS ---------------------------- */

function getProducts(sheetId) {
  const ss = getSheetById(sheetId);
  let sheet = ss.getSheetByName('Products');
  if (!sheet) sheet = getTab(ss, 'Products', PRODUCTS_HEADERS);

  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  if (headers.indexOf('Cost') === -1) {
    sheet.insertColumnBefore(3);
    sheet.getRange(1, 3).setValue('Cost');
  }

  const rows = readRows(sheet);
  const products = rows.map((r) => ({
    name: r[0] || '', size: r[1] || '', cost: numOrZero(r[2]), price: numOrZero(r[3])
  })).filter((p) => p.name);
  products.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
  return products;
}

function addProduct(p) {
  const ss = getSheetById(p.sheetId);
  const sheet = getTab(ss, 'Products', PRODUCTS_HEADERS);
  sheet.appendRow([p.name || '', p.size || '', numOrZero(p.cost), numOrZero(p.price)]);
  return { success: true };
}
function updateProduct(p) {
  const ss = getSheetById(p.sheetId);
  const sheet = getTab(ss, 'Products', PRODUCTS_HEADERS);
  sheet.getRange(p.rowIndex, 1, 1, 4).setValues([[p.name || '', p.size || '', numOrZero(p.cost), numOrZero(p.price)]]);
  return { success: true };
}
function deleteProduct(sheetId, rowIndex) {
  const ss = getSheetById(sheetId);
  const sheet = ss.getSheetByName('Products');
  sheet.deleteRow(parseInt(rowIndex, 10));
  return { success: true };
}

/* ---------------------------- SALES / EXPENSES / COLLECTIONS / DUES ---------------------------- */

function saveSale(p) {
  const ss = getSheetById(p.sheetId);
  const sheet = getTab(ss, 'Sales', SALES_HEADERS);
  sheet.appendRow([todayStr(), p.itemName || '', numOrZero(p.quantity), numOrZero(p.sellPrice), numOrZero(p.costPrice), numOrZero(p.discount), p.notes || '', '']);
  return { success: true, rowIndex: sheet.getLastRow() };
}

function saveSaleSession(p) {
  const ss = getSheetById(p.sheetId);
  const sheet = getTab(ss, 'Sales', SALES_HEADERS);
  const date = todayStr();
  const items = p.cartItems || [];
  items.forEach((item) => {
    sheet.appendRow([date, item.itemName || '', numOrZero(item.quantity), numOrZero(item.sellPrice), numOrZero(item.costPrice), numOrZero(item.discount), '', p.sessionId || '']);
  });
  return { success: true, count: items.length };
}

function saveExpense(p) {
  const ss = getSheetById(p.sheetId);
  const sheet = getTab(ss, 'Expenses', EXPENSES_HEADERS);
  sheet.appendRow([todayStr(), p.category || '', p.description || '', numOrZero(p.amount)]);
  return { success: true, rowIndex: sheet.getLastRow() };
}

function saveCollection(p) {
  const ss = getSheetById(p.sheetId);
  const sheet = getTab(ss, 'Collections', COLLECTIONS_HEADERS);
  sheet.appendRow([todayStr(), p.description || '', numOrZero(p.amount)]);
  return { success: true, rowIndex: sheet.getLastRow() };
}

function saveDue(p) {
  const ss = getSheetById(p.sheetId);
  const sheet = getTab(ss, 'Dues', DUES_HEADERS);
  sheet.appendRow([todayStr(), p.description || '', numOrZero(p.amount)]);
  return { success: true, rowIndex: sheet.getLastRow() };
}

function deleteEntry(sheetId, tabName, rowIndex) {
  const ss = getSheetById(sheetId);
  const sheet = ss.getSheetByName(tabName);
  if (!sheet) return { error: 'Tab not found' };
  sheet.deleteRow(parseInt(rowIndex, 10));
  return { success: true };
}

/* ---------------------------- SUMMARIES / REPORTS ---------------------------- */

function getDailySummary(sheetId) {
  const ss = getSheetById(sheetId);
  const today = todayStr();

  const salesRows = readRows(getTab(ss, 'Sales', SALES_HEADERS));
  let netSales = 0, cogs = 0;
  salesRows.forEach((r) => {
    if (dateMatches(r[0], today)) {
      const qty = numOrZero(r[2]), sellPrice = numOrZero(r[3]), costPrice = numOrZero(r[4]), discount = numOrZero(r[5]);
      netSales += (qty * sellPrice) - discount;
      cogs += qty * costPrice;
    }
  });

  const collectionsRows = readRows(getTab(ss, 'Collections', COLLECTIONS_HEADERS));
  let totalCollections = 0;
  collectionsRows.forEach((r) => { if (dateMatches(r[0], today)) totalCollections += numOrZero(r[2]); });

  const expensesRows = readRows(getTab(ss, 'Expenses', EXPENSES_HEADERS));
  let totalExpenses = 0;
  expensesRows.forEach((r) => { if (dateMatches(r[0], today)) totalExpenses += numOrZero(r[3]); });

  const revenue = netSales + totalCollections;
  const profit = revenue - cogs - totalExpenses;
  const profitMargin = revenue > 0 ? round2((profit / revenue) * 100) : 0;

  return { revenue: round2(revenue) || 0, profit: round2(profit) || 0, profitMargin: profitMargin || 0 };
}

function getDailyReport(sheetId, date) {
  const ss = getSheetById(sheetId);
  const productsList = getProducts(sheetId);
  const productSizeMap = {};
  productsList.forEach((p) => { productSizeMap[p.name] = p.size; });

  const salesRows = readRows(getTab(ss, 'Sales', SALES_HEADERS));
  const sales = salesRows.filter((r) => dateMatches(r[0], date)).map((r) => ({
    itemName: r[1] || '', size: productSizeMap[r[1]] || '', quantity: numOrZero(r[2]),
    sellPrice: numOrZero(r[3]), costPrice: numOrZero(r[4]), discount: numOrZero(r[5])
  })).sort((a, b) => a.itemName.localeCompare(b.itemName));

  const collectionsRows = readRows(getTab(ss, 'Collections', COLLECTIONS_HEADERS));
  const collections = collectionsRows.filter((r) => dateMatches(r[0], date)).map((r) => ({ description: r[1] || '', amount: numOrZero(r[2]) }));

  const duesRows = readRows(getTab(ss, 'Dues', DUES_HEADERS));
  const dues = duesRows.filter((r) => dateMatches(r[0], date)).map((r) => ({ description: r[1] || '', amount: numOrZero(r[2]) }));

  const expensesRows = readRows(getTab(ss, 'Expenses', EXPENSES_HEADERS));
  const expenses = expensesRows.filter((r) => dateMatches(r[0], date)).map((r) => ({ category: r[1] || '', description: r[2] || '', amount: numOrZero(r[3]) }));

  const totalGrossSales = sales.reduce((s, r) => s + r.quantity * r.sellPrice, 0);
  const totalDiscount = sales.reduce((s, r) => s + r.discount, 0);
  const netSalesRevenue = totalGrossSales - totalDiscount;
  const totalCollections = collections.reduce((s, r) => s + r.amount, 0);
  const totalDues = dues.reduce((s, r) => s + r.amount, 0);
  const totalExpenses = expenses.reduce((s, r) => s + r.amount, 0);
  const cogs = sales.reduce((s, r) => s + r.quantity * r.costPrice, 0);
  const totalCashIn = netSalesRevenue + totalCollections;
  const grossProfit = totalCashIn - cogs - totalExpenses;
  const profitMargin = totalCashIn > 0 ? round2((grossProfit / totalCashIn) * 100) : 0;

  return {
    sales, collections, dues, expenses,
    summary: {
      totalGrossSales: round2(totalGrossSales), totalDiscount: round2(totalDiscount),
      netSalesRevenue: round2(netSalesRevenue), totalCollections: round2(totalCollections),
      totalDues: round2(totalDues), totalCashIn: round2(totalCashIn), cogs: round2(cogs),
      totalExpenses: round2(totalExpenses), grossProfit: round2(grossProfit), profitMargin: profitMargin
    }
  };
}

function getMonthContext(sheetId, month, year) {
  const ss = getSheetById(sheetId);
  const salesRows = readRows(getTab(ss, 'Sales', SALES_HEADERS));

  const dailySales = new Array(31).fill(0);
  const productMap = {};

  salesRows.forEach((r) => {
    if (!dateMatchesMonthYear(r[0], month, year)) return;
    const day = dayOfCell(r[0]);
    const qty = numOrZero(r[2]), sellPrice = numOrZero(r[3]), discount = numOrZero(r[5]);
    const net = qty * sellPrice - discount;
    if (day && day >= 1 && day <= 31) dailySales[day - 1] += net;

    const name = r[1] || '';
    if (!productMap[name]) productMap[name] = { itemName: name, totalQty: 0, totalRevenue: 0 };
    productMap[name].totalQty += qty;
    productMap[name].totalRevenue += net;
  });

  const productTotals = Object.values(productMap).sort((a, b) => b.totalQty - a.totalQty);

  const expensesRows = readRows(getTab(ss, 'Expenses', EXPENSES_HEADERS));
  const expensesByCategory = {};
  EXPENSE_CATEGORY_LIST.forEach((c) => { expensesByCategory[c] = 0; });
  expensesRows.forEach((r) => {
    if (!dateMatchesMonthYear(r[0], month, year)) return;
    const cat = r[1] || 'Miscellaneous';
    expensesByCategory[cat] = (expensesByCategory[cat] || 0) + numOrZero(r[3]);
  });

  return { dailySales, productTotals, expensesByCategory };
}

function getMonthlyReport(sheetId, month, year) {
  const ss = getSheetById(sheetId);
  const productsList = getProducts(sheetId);
  const productSizeMap = {};
  productsList.forEach((p) => { productSizeMap[p.name] = p.size; });

  const salesRows = readRows(getTab(ss, 'Sales', SALES_HEADERS)).filter((r) => dateMatchesMonthYear(r[0], month, year));
  const collectionsRows = readRows(getTab(ss, 'Collections', COLLECTIONS_HEADERS)).filter((r) => dateMatchesMonthYear(r[0], month, year));
  const duesRows = readRows(getTab(ss, 'Dues', DUES_HEADERS)).filter((r) => dateMatchesMonthYear(r[0], month, year));
  const expensesRows = readRows(getTab(ss, 'Expenses', EXPENSES_HEADERS)).filter((r) => dateMatchesMonthYear(r[0], month, year));

  let totalSalesAmount = 0, cogs = 0;
  const dayTotals = {};
  const productMap = {};
  salesRows.forEach((r) => {
    const qty = numOrZero(r[2]), sellPrice = numOrZero(r[3]), costPrice = numOrZero(r[4]), discount = numOrZero(r[5]);
    const net = qty * sellPrice - discount;
    totalSalesAmount += net;
    cogs += qty * costPrice;
    const day = dayOfCell(r[0]);
    if (day) dayTotals[day] = (dayTotals[day] || 0) + net;

    const name = r[1] || '';
    if (!productMap[name]) productMap[name] = { itemName: name, size: productSizeMap[name] || '', qtySold: 0, totalRevenue: 0, transactions: 0 };
    productMap[name].qtySold += qty;
    productMap[name].totalRevenue += net;
    productMap[name].transactions += 1;
  });

  const numTransactions = salesRows.length;
  const avgSaleValue = numTransactions > 0 ? round2(totalSalesAmount / numTransactions) : 0;

  let bestSalesDay = null, lowestSalesDay = null;
  Object.keys(dayTotals).forEach((day) => {
    const amt = dayTotals[day];
    if (!bestSalesDay || amt > bestSalesDay.amount) bestSalesDay = { date: `${day}/${month}/${year}`, amount: round2(amt) };
    if (!lowestSalesDay || amt < lowestSalesDay.amount) lowestSalesDay = { date: `${day}/${month}/${year}`, amount: round2(amt) };
  });

  const productList = Object.values(productMap);
  const top10 = productList.slice().sort((a, b) => b.qtySold - a.qtySold).slice(0, 10);
  const slowMoving = productList.filter((p) => p.transactions < 3);

  const totalCollections = collectionsRows.reduce((s, r) => s + numOrZero(r[2]), 0);
  const totalDues = duesRows.reduce((s, r) => s + numOrZero(r[2]), 0);

  const expensesByCategory = {};
  EXPENSE_CATEGORY_LIST.forEach((c) => { expensesByCategory[c] = 0; });
  let totalExpenses = 0;
  expensesRows.forEach((r) => {
    const cat = r[1] || 'Miscellaneous';
    expensesByCategory[cat] = (expensesByCategory[cat] || 0) + numOrZero(r[3]);
    totalExpenses += numOrZero(r[3]);
  });

  const totalSalesRevenue = totalSalesAmount;
  const grossProfit = totalSalesRevenue - cogs;
  const grossProfitMargin = totalSalesRevenue > 0 ? round2((grossProfit / totalSalesRevenue) * 100) : 0;
  const operatingExpenses = totalExpenses;
  const netProfit = grossProfit + totalCollections - operatingExpenses;
  const netRevenueBase = totalSalesRevenue + totalCollections;
  const netProfitMargin = netRevenueBase > 0 ? round2((netProfit / netRevenueBase) * 100) : 0;
  const profitMarginPercent = netProfitMargin;

  const dailySalesTrend = [];
  for (let d = 1; d <= 31; d++) dailySalesTrend.push(round2(dayTotals[d] || 0));

  return {
    totalSalesRevenue: round2(totalSalesRevenue), totalCollections: round2(totalCollections),
    totalExpenses: round2(totalExpenses), grossProfit: round2(grossProfit), netProfit: round2(netProfit),
    profitMarginPercent: profitMarginPercent,
    totalSalesAmount: round2(totalSalesAmount), numTransactions: numTransactions, avgSaleValue: avgSaleValue,
    bestSalesDay: bestSalesDay, lowestSalesDay: lowestSalesDay,
    top10: top10, slowMoving: slowMoving,
    expensesByCategory: expensesByCategory,
    totalDues: round2(totalDues),
    cogs: round2(cogs), grossProfitMargin: grossProfitMargin, operatingExpenses: round2(operatingExpenses),
    netProfitMargin: netProfitMargin,
    dailySalesTrend: dailySalesTrend, expenseBreakdown: expensesByCategory,
    top10Products: top10
  };
}

/* ---------------------------- SUBSCRIPTION ---------------------------- */

function saveSubscriptionRequest(p) {
  const headers = ['Business Name','Phone','Sheet ID','Subscription Month','Transaction ID','Submission Date','Status'];
  const sheet = getOrCreateMasterSheet(MASTER_SUBSCRIPTIONS_SHEET_NAME, headers);
  sheet.appendRow([p.businessName || '', p.phone || '', p.sheetId || '', p.month || '', p.transactionId || '', p.submissionDate || todayStr(), 'Pending']);
  return { success: true };
}

/* ---------------------------- RECENT ENTRIES ---------------------------- */

function getRecentEntries(sheetId) {
  const ss = getSheetById(sheetId);

  const salesSheet = getTab(ss, 'Sales', SALES_HEADERS);
  const salesRows = readRows(salesSheet);
  const salesEntries = salesRows.map((r, i) => ({ tab: 'Sales', date: r[0], itemName: r[1], quantity: numOrZero(r[2]), rowIndex: i + 2 })).slice(-5);

  const expensesSheet = getTab(ss, 'Expenses', EXPENSES_HEADERS);
  const expensesRows = readRows(expensesSheet);
  const expenseEntries = expensesRows.map((r, i) => ({ tab: 'Expenses', date: r[0], description: r[2] || r[1], amount: numOrZero(r[3]), rowIndex: i + 2 })).slice(-5);

  const collectionsSheet = getTab(ss, 'Collections', COLLECTIONS_HEADERS);
  const collectionsRows = readRows(collectionsSheet);
  const collectionEntries = collectionsRows.map((r, i) => ({ tab: 'Collections', date: r[0], description: r[1], amount: numOrZero(r[2]), rowIndex: i + 2 })).slice(-5);

  const duesSheet = getTab(ss, 'Dues', DUES_HEADERS);
  const duesRows = readRows(duesSheet);
  const dueEntries = duesRows.map((r, i) => ({ tab: 'Dues', date: r[0], description: r[1], amount: numOrZero(r[2]), rowIndex: i + 2 })).slice(-5);

  const merged = [].concat(salesEntries, expenseEntries, collectionEntries, dueEntries);
  merged.sort((a, b) => {
    const da = parseDDMMYYYY(a.date), db = parseDDMMYYYY(b.date);
    if (!da || !db) return 0;
    const ta = new Date(da.y, da.m - 1, da.d).getTime();
    const tb = new Date(db.y, db.m - 1, db.d).getTime();
    return tb - ta;
  });
  return merged.slice(0, 5);
}
