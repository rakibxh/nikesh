/* ===================== Niqesh — app.js ===================== */
'use strict';

const BACKEND_URL = 'https://script.google.com/macros/s/AKfycbw1FZIU5hWGRwuko1h7GNuLw9WLJQV0UhYCTeaB3Insxes4FdOjXq1UmAcsLZKO7ao9/exec';

/* ------------------------------------------------------------------
   TRANSLATIONS
------------------------------------------------------------------- */
const translations = {
  en: {
    appName: "Niqesh",
    save: "Save", cancel: "Cancel", delete: "Delete", edit: "Edit",
    loading: "Loading...", error: "Something went wrong. Please try again.",
    success: "Saved successfully.", noData: "No entries found.",
    offline: "You are offline — data will sync when connected.",
    pendingSync: "entries pending sync", syncNow: "Sync Now",
    lastSynced: "Last synced:", searchProduct: "Search Product",
    confirm: "Confirm", back: "Back",

    welcomeTitle: "Welcome to Niqesh", welcomeSubtitle: "Create your account to get started",
    businessName: "Business Name", ownerName: "Owner's Name", phoneNumber: "Phone Number",
    whatsappNumber: "WhatsApp Number", emailAddress: "Email Address", houseStreet: "House, Street",
    policeStation: "Police Station", district: "District", division: "Division", zipCode: "Zip Code",
    createPin: "Create a 4-digit PIN", confirmPin: "Confirm PIN", setupAccount: "Set Up My Account",
    alreadyHaveAccount: "Already have an account? Recover it here",
    pinMismatch: "PINs do not match. Please try again.",
    recoveryPinTitle: "Your Recovery PIN is:",
    recoveryPinWarning: "Write this down and keep it safe. You will need it to restore access on a new device.",
    savedMyPin: "I have saved my PIN",

    enterPin: "Enter your 4-digit PIN", unlock: "Unlock",
    incorrectPin: "Incorrect PIN. Please try again.", forgotPin: "Forgot PIN? Recover account",

    recoverAccount: "Recover Account", enterRecoveryPin: "Enter your 6-digit Recovery PIN",
    recoverButton: "Recover", recoveryFailed: "Recovery PIN not found. Please check and try again.",
    setNewPin: "Set New PIN", confirmNewPin: "Confirm New PIN",

    todaysRevenue: "Today's Revenue", todaysProfit: "Today's Profit", profitMargin: "Profit Margin (%)",
    recordSale: "Record a Sale", startSaleSession: "Start Sale Session",
    collectionDue: "Record a Collection / Due", recordExpense: "Record an Expense",
    dashboard: "Dashboard", recentEntries: "Recent Entries",

    dashboardTitle: "Dashboard", subscribedTill: "Subscribed till", onTrialTill: "On trial till",
    trialDaysRemaining: "days remaining", editAccount: "Edit Account", manageProducts: "Manage Products",
    dailyReport: "Daily Report", monthlyReport: "Monthly Report", subscriptionPayment: "Subscription Payment",

    editAccountTitle: "Edit Account", recoveryPinLabel: "Recovery PIN (non-editable)",
    accountPin: "Account PIN", saveChanges: "Save Changes",

    productName: "Product Name", size: "Size", cost: "Cost", price: "Price",
    addProduct: "Add Product", updateProduct: "Update Product", currentProducts: "Current Products",
    confirmDeleteProduct: "Delete this product?",

    selectProduct: "Select a Product", quantity: "Quantity", discount: "Discount (flat amount)",
    notes: "Notes (optional)", saveSale: "Save Sale", saleRecorded: "Sale recorded!",

    saleSessionTitle: "Sale Session", addToCart: "Add to Cart",
    cartEmpty: "Cart is empty. Search and add products above.",
    sessionTotal: "Session Total", saveSession: "Save Session", sessionSaved: "Session saved successfully!",
    clearCart: "Clear Cart", confirmClearCart: "Clear all items from cart?", itemDiscount: "Item Discount",

    collectionDueTitle: "Collection / Due", recordCollection: "Record a Collection",
    recordDue: "Record a Due", collectionDescription: "Description (optional)",
    collectionAmount: "Amount Collected", saveCollection: "Save Collection",
    collectionRecorded: "Collection recorded!", outstandingDueDesc: "Customer Name / Description",
    outstandingDueAmount: "Amount", saveDue: "Save Due", dueRecorded: "Due recorded!",

    selectCategory: "Select Category:", catRent: "Rent", catSalary: "Salary", catUtility: "Utility Bills",
    catTransport: "Transportation", catRefreshments: "Refreshments", catDealerPayoff: "Dealer Payoff",
    catMarketing: "Marketing", catMiscellaneous: "Miscellaneous", description: "Description",
    amount: "Amount", saveExpense: "Save Expense", expenseRecorded: "Expense recorded!",

    dailyReportTitle: "Daily Report", reportDate: "Report Date", sales: "Sales", product: "Product",
    sizeCol: "Size", qty: "Qty", unitPrice: "Unit Price", discountCol: "Discount",
    totalDiscount: "Total Discount", total: "Total", totalGrossSales: "Total Gross Sales",
    netSalesRevenue: "Net Sales Revenue", totalCollections: "Total Collections",
    outstandingDues: "Outstanding Dues", totalExpenses: "Total Expenses", dailySummary: "Daily Summary",
    totalCashIn: "Total Cash In", cogs: "Cost of Goods Sold", grossProfit: "Gross Profit",
    reportGenerated: "Report generated by Niqesh — go.niqesh.com", downloadPDF: "Download PDF Report",
    salesTrend: "Sales Trend", expenseBreakdown: "Expense Breakdown", top10Products: "Top 10 Products",

    monthlyReportTitle: "Monthly Report", selectMonth: "Select Month", executiveSummary: "Executive Summary",
    salesSummary: "Sales Summary", numTransactions: "Number of Transactions", avgSaleValue: "Average Sale Value",
    bestSalesDay: "Best Sales Day", lowestSalesDay: "Lowest Sales Day", productPerformance: "Product Performance",
    top10Best: "Top 10 Best-Selling Products", slowMoving: "Slow-Moving Products",
    expenseSummary: "Expense Summary", collectionsAndDues: "Collections & Outstanding Dues",
    totalCollectionsMonth: "Total Collections Received", totalOutstandingDues: "Total Outstanding Dues",
    profitAnalysis: "Profit Analysis", operatingExpenses: "Operating Expenses", netProfit: "Net Profit",
    netProfitMargin: "Net Profit Margin (%)", grossProfitMargin: "Gross Profit Margin (%)",

    subscribeTitle: "Subscribe to Niqesh", benefitsTitle: "Monthly subscribers will receive:",
    benefit1: "One month app subscription", benefit2: "Full training and customer support",
    benefit3: "Products enlistment support", benefit4: "Daily business report",
    benefit5: "Monthly business report", benefit6: "Printed hardcopy report file",
    paymentTitle: "Make Payment", paymentInstruction: "Send payment to any of the following numbers:",
    monthLabel: "Month", monthPlaceholder: "e.g. August 2026", transactionId: "Transaction ID",
    submitPayment: "Submit Payment Details", whatsappConfirm: "Send payment confirmation on WhatsApp",
    paymentSubmitted: "Payment details submitted. We will verify and activate your account within 24 hours.",

    trialDay1: "Subscribe — Day 1 of 3-day trial", trialDay2: "Subscribe — Day 2 of 3-day trial",
    trialDay3: "Subscribe — Last day of 3-day trial", trialExpired: "Trial expired. Please subscribe to continue."
  },
  bn: {
    appName: "নিকেশ",
    save: "সেইভ করুন", cancel: "বাতিল", delete: "মুছুন", edit: "সম্পাদনা",
    loading: "লোড হচ্ছে...", error: "কিছু একটা ভুল হয়েছে। আবার চেষ্টা করুন।",
    success: "সফলভাবে সেইভ হয়েছে।", noData: "কোনো এন্ট্রি পাওয়া যায়নি।",
    offline: "আপনি অফলাইনে আছেন — সংযুক্ত হলে ডেটা সিঙ্ক হবে।",
    pendingSync: "টি এন্ট্রি সিঙ্ক হওয়ার অপেক্ষায়", syncNow: "এখনই সিঙ্ক করুন",
    lastSynced: "সর্বশেষ সিঙ্ক:", searchProduct: "পণ্য খুঁজুন",
    confirm: "নিশ্চিত করুন", back: "ফিরে যান",

    welcomeTitle: "নিকেশে স্বাগতম", welcomeSubtitle: "শুরু করতে আপনার অ্যাকাউন্ট তৈরি করুন",
    businessName: "ব্যবসার নাম", ownerName: "স্বত্বাধিকারীর নাম", phoneNumber: "ফোন নম্বর",
    whatsappNumber: "WhatsApp নম্বর", emailAddress: "ইমেইল ঠিকানা", houseStreet: "বাড়ি, রাস্তা",
    policeStation: "থানা", district: "জেলা", division: "বিভাগ", zipCode: "জিপ কোড",
    createPin: "৪ সংখ্যার পিন তৈরি করুন", confirmPin: "পিন নিশ্চিত করুন", setupAccount: "অ্যাকাউন্ট তৈরি করুন",
    alreadyHaveAccount: "আগে থেকে অ্যাকাউন্ট আছে? এখানে রিকভার করুন",
    pinMismatch: "পিন দুটি মিলছে না। আবার চেষ্টা করুন।",
    recoveryPinTitle: "আপনার রিকভারি পিন হলো:",
    recoveryPinWarning: "এটি লিখে নিরাপদে রাখুন। নতুন ডিভাইসে অ্যাকাউন্ট ফিরে পেতে এই পিন লাগবে।",
    savedMyPin: "আমি পিনটি সেইভ করেছি",

    enterPin: "আপনার ৪ সংখ্যার পিন দিন", unlock: "আনলক করুন",
    incorrectPin: "পিন সঠিক নয়। আবার চেষ্টা করুন।", forgotPin: "পিন ভুলে গেছেন? অ্যাকাউন্ট রিকভার করুন",

    recoverAccount: "অ্যাকাউন্ট রিকভার করুন", enterRecoveryPin: "আপনার ৬ সংখ্যার রিকভারি পিন দিন",
    recoverButton: "রিকভার করুন", recoveryFailed: "রিকভারি পিন পাওয়া যায়নি। আবার চেষ্টা করুন।",
    setNewPin: "নতুন পিন সেট করুন", confirmNewPin: "নতুন পিন নিশ্চিত করুন",

    todaysRevenue: "আজকের আয়", todaysProfit: "আজকের লাভ", profitMargin: "প্রফিট মার্জিন (%)",
    recordSale: "বিক্রয় যোগ করুন", startSaleSession: "সেল সেশন শুরু করুন",
    collectionDue: "বকেয়া / আদায় যোগ করুন", recordExpense: "খরচ যোগ করুন",
    dashboard: "ড্যাশবোর্ড", recentEntries: "সাম্প্রতিক এন্ট্রি",

    dashboardTitle: "ড্যাশবোর্ড", subscribedTill: "সাবস্ক্রিপশন চলবে", onTrialTill: "ট্রায়াল চলবে",
    trialDaysRemaining: "দিন বাকি", editAccount: "এডিট একাউন্ট", manageProducts: "পণ্যের তালিকা",
    dailyReport: "দৈনিক রিপোর্ট", monthlyReport: "মাসিক রিপোর্ট", subscriptionPayment: "সাবস্ক্রিপশন পেমেন্ট করুন",

    editAccountTitle: "এডিট একাউন্ট", recoveryPinLabel: "রিকভারি পিন (পরিবর্তনযোগ্য নয়)",
    accountPin: "একাউন্ট পিন", saveChanges: "পরিবর্তন সেইভ করুন",

    productName: "পণ্যের নাম", size: "আকার / পরিমাণ", cost: "ক্রয়মূল্য", price: "বিক্রয়মূল্য",
    addProduct: "পণ্য যোগ করুন", updateProduct: "পণ্য আপডেট করুন", currentProducts: "বর্তমান পণ্যসমূহ",
    confirmDeleteProduct: "এই পণ্যটি মুছে ফেলবেন?",

    selectProduct: "পণ্য নির্বাচন করুন", quantity: "পরিমাণ / সংখ্যা", discount: "ছাড় / মূল্যহ্রাস",
    notes: "মন্তব্য (ঐচ্ছিক)", saveSale: "বিক্রয় সেইভ করুন", saleRecorded: "বিক্রয় সেইভ হয়েছে!",

    saleSessionTitle: "সেল সেশন", addToCart: "কার্টে যোগ করুন",
    cartEmpty: "কার্ট খালি। উপরে পণ্য খুঁজুন এবং যোগ করুন।",
    sessionTotal: "সেশনের মোট", saveSession: "সেশন সেইভ করুন", sessionSaved: "সেশন সফলভাবে সেইভ হয়েছে!",
    clearCart: "কার্ট মুছুন", confirmClearCart: "কার্ট থেকে সব আইটেম মুছে ফেলবেন?", itemDiscount: "আইটেম ছাড়",

    collectionDueTitle: "বকেয়া / আদায়", recordCollection: "আদায় যোগ করুন",
    recordDue: "বাকি যোগ করুন", collectionDescription: "গ্রাহকের নাম / আদায়ের বিবরণ",
    collectionAmount: "আদায়ের পরিমাণ", saveCollection: "আদায় সংরক্ষণ করুন",
    collectionRecorded: "আদায় সংরক্ষণ হয়েছে!", outstandingDueDesc: "গ্রাহকের নাম / বিবরণ",
    outstandingDueAmount: "টাকার পরিমাণ", saveDue: "বাকি সংরক্ষণ করুন", dueRecorded: "বাকি সংরক্ষণ হয়েছে!",

    selectCategory: "ক্যাটাগরি নির্বাচন করুন:", catRent: "ভাড়া", catSalary: "বেতন", catUtility: "ইউটিলিটি বিল",
    catTransport: "যাতায়াত", catRefreshments: "নাস্তা", catDealerPayoff: "ডিলার",
    catMarketing: "মার্কেটিং", catMiscellaneous: "অন্যান্য", description: "খরচের বিবরণ",
    amount: "টাকার পরিমাণ", saveExpense: "খরচ সেইভ করুন", expenseRecorded: "খরচ সেইভ হয়েছে!",

    dailyReportTitle: "দৈনিক রিপোর্ট", reportDate: "রিপোর্টের তারিখ", sales: "বিক্রয়", product: "আইটেম",
    sizeCol: "পরিমাণ", qty: "সংখ্যা", unitPrice: "একক মূল্য", discountCol: "ছাড়",
    totalDiscount: "সর্বমোট মূল্যহ্রাস", total: "সর্বমোট", totalGrossSales: "সর্বমোট মোট বিক্রয়",
    netSalesRevenue: "নিট বিক্রয় আয়", totalCollections: "সর্বমোট আদায়",
    outstandingDues: "বকেয়া পাওনা", totalExpenses: "সর্বমোট ব্যয়", dailySummary: "দিনের হিসাব সারসংক্ষেপ",
    totalCashIn: "সর্বমোট নগদ প্রাপ্তি", cogs: "বিক্রিত পণ্যের মোট ক্রয়মূল্য", grossProfit: "মোট মুনাফা",
    reportGenerated: "Niqesh কর্তৃক প্রস্তুত রিপোর্ট — go.niqesh.com", downloadPDF: "পিডিএফ রিপোর্ট ডাউনলোড করুন",
    salesTrend: "বিক্রয় ট্রেন্ড", expenseBreakdown: "খরচের বিবরণী", top10Products: "শীর্ষ ১০টি পণ্য",

    monthlyReportTitle: "মাসিক রিপোর্ট", selectMonth: "মাস নির্বাচন করুন", executiveSummary: "নির্বাহী সারসংক্ষেপ",
    salesSummary: "বিক্রয় সারসংক্ষেপ", numTransactions: "বিক্রয় লেনদেনের সংখ্যা", avgSaleValue: "গড় বিক্রয় মূল্য",
    bestSalesDay: "সর্বাধিক বিক্রির দিন", lowestSalesDay: "সর্বনিম্ন বিক্রির দিন", productPerformance: "পণ্যের কাটতি",
    top10Best: "শীর্ষ ১০টি সর্বাধিক বিক্রিত পণ্য", slowMoving: "ধীরগতিতে বিক্রীত পণ্য",
    expenseSummary: "ব্যয়ের সারসংক্ষেপ", collectionsAndDues: "আদায় ও বাকি",
    totalCollectionsMonth: "মোট প্রাপ্ত আদায়", totalOutstandingDues: "মোট বকেয়া পাওনা",
    profitAnalysis: "লাভের বিশ্লেষণ", operatingExpenses: "পরিচালন ব্যয়", netProfit: "নিট লাভ",
    netProfitMargin: "নিট লাভের শতকরা হার", grossProfitMargin: "মোট লাভের শতকরা হার",

    subscribeTitle: "নিকেশ সাবস্ক্রাইব করুন", benefitsTitle: "মাসিক সাবস্ক্রাইব করা মেম্বারগণ যা পাবেন:",
    benefit1: "অ্যাপটির এক মাসের সাবস্ক্রিপশন", benefit2: "পূর্ণাঙ্গ প্রশিক্ষণ ও কাস্টমার সাপোর্ট",
    benefit3: "পণ্য তালিকাভুক্তকরণে সহায়তা", benefit4: "দৈনিক ব্যবসায়িক প্রতিবেদন",
    benefit5: "মাসিক ব্যবসায়িক প্রতিবেদন", benefit6: "প্রিন্টেড/হার্ডকপি প্রতিবেদন ফাইল",
    paymentTitle: "পেমেন্ট করুন", paymentInstruction: "নিচের যেকোনো নম্বরে পেমেন্ট পাঠান:",
    monthLabel: "মাস", monthPlaceholder: "যেমন: আগস্ট ২০২৬", transactionId: "ট্রানজেকশন আইডি",
    submitPayment: "পেমেন্টের তথ্য জমা দিন", whatsappConfirm: "WhatsApp এ পেমেন্ট কনফার্মেশন জানান",
    paymentSubmitted: "পেমেন্টের তথ্য জমা হয়েছে। আমরা ২৪ ঘণ্টার মধ্যে যাচাই করে আপনার অ্যাকাউন্ট সক্রিয় করব।",

    trialDay1: "সাবস্ক্রাইব — ৩-দিন ট্রায়াল পিরিয়ডের ১ম দিন", trialDay2: "সাবস্ক্রাইব — ৩-দিন ট্রায়াল পিরিয়ডের ২য় দিন",
    trialDay3: "সাবস্ক্রাইব — ৩-দিন ট্রায়াল পিরিয়ডের শেষ দিন", trialExpired: "ট্রায়াল শেষ হয়েছে। চালিয়ে যেতে সাবস্ক্রাইব করুন।"
  }
};

const MONTHS_EN = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
const MONTHS_EN_FULL = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const MONTHS_BN = ["জানু","ফেব্রু","মার্চ","এপ্রিল","মে","জুন","জুলাই","আগস্ট","সেপ্টে","অক্টো","নভে","ডিসে"];
const EXPENSE_CATEGORIES = [
  { key: 'catRent', value: 'Rent' }, { key: 'catSalary', value: 'Salary' },
  { key: 'catUtility', value: 'Utility Bills' }, { key: 'catTransport', value: 'Transportation' },
  { key: 'catRefreshments', value: 'Refreshments' }, { key: 'catDealerPayoff', value: 'Dealer Payoff' },
  { key: 'catMarketing', value: 'Marketing' }, { key: 'catMiscellaneous', value: 'Miscellaneous' }
];

/* ------------------------------------------------------------------
   STATE / STORAGE HELPERS
------------------------------------------------------------------- */
const store = {
  get(key) { try { return localStorage.getItem(key); } catch (e) { return null; } },
  set(key, val) { try { localStorage.setItem(key, val); } catch (e) {} },
  getJSON(key, fallback) { try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch (e) { return fallback; } },
  setJSON(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) {} },
  remove(key) { try { localStorage.removeItem(key); } catch (e) {} }
};
const sess = {
  get(key) { try { return sessionStorage.getItem(key); } catch (e) { return null; } },
  set(key, val) { try { sessionStorage.setItem(key, val); } catch (e) {} },
  getJSON(key, fallback) { try { const v = sessionStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch (e) { return fallback; } },
  setJSON(key, val) { try { sessionStorage.setItem(key, JSON.stringify(val)); } catch (e) {} },
  remove(key) { try { sessionStorage.removeItem(key); } catch (e) {} }
};

let state = {
  language: store.get('appLanguage') || 'en-bdt', // en-usd | en-bdt | bn-bdt
  route: 'home',
  routeParams: {},
  productCache: null,
  chartInstances: {}
};

function langCode() { return state.language.startsWith('bn') ? 'bn' : 'en'; }
function t(key) { return (translations[langCode()] && translations[langCode()][key]) || translations.en[key] || key; }
function getCurrency() {
  if (state.language === 'en-usd') return '$';
  return '৳';
}
function fmtMoney(n) {
  n = Number(n);
  if (isNaN(n)) n = 0;
  return getCurrency() + n.toLocaleString(undefined, { maximumFractionDigits: 2 });
}
function safeNum(n) { n = parseFloat(n); return isNaN(n) ? 0 : n; }

function setLanguage(val) {
  state.language = val;
  store.set('appLanguage', val);
  document.body.classList.toggle('lang-bn', langCode() === 'bn');
  render();
}

/* ------------------------------------------------------------------
   BACKEND / API + OFFLINE QUEUE
------------------------------------------------------------------- */
async function apiCall(action, payload) {
  payload = payload || {};
  const body = Object.assign({ action: action }, payload);
  try {
    const res = await fetch(BACKEND_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(body)
    });
    if (!res.ok) throw new Error('Network response not ok');
    const data = await res.json();
    if (data && data.error) throw new Error(data.error);
    return { ok: true, data: data };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}

function queuePendingSync(action, fields) {
  const queue = store.getJSON('pendingSync', []);
  queue.push({ action: action, sheetId: state.sheetId, fields: fields, timestamp: Date.now() });
  store.setJSON('pendingSync', queue);
}

async function trySyncPending() {
  let queue = store.getJSON('pendingSync', []);
  if (!queue.length) return;
  const remaining = [];
  for (const item of queue) {
    const r = await apiCall(item.action, Object.assign({ sheetId: item.sheetId }, item.fields));
    if (!r.ok) remaining.push(item);
  }
  store.setJSON('pendingSync', remaining);
  store.set('lastSynced', new Date().toISOString());
  if (state.route === 'home') render();
}
window.addEventListener('online', trySyncPending);

/* ------------------------------------------------------------------
   ROUTER
------------------------------------------------------------------- */
function navigate(route, params) {
  state.route = route;
  state.routeParams = params || {};
  window.scrollTo(0, 0);
  render();
}

function goBack() { navigate('home'); }

/* ------------------------------------------------------------------
   ACCESS CONTROL
------------------------------------------------------------------- */
function daysElapsedSinceRegistration() {
  const reg = store.get('registrationDate');
  if (!reg) return 0;
  const regDate = new Date(reg);
  const regMid = new Date(regDate.getFullYear(), regDate.getMonth(), regDate.getDate());
  const today = new Date();
  const todayMid = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  return Math.floor((todayMid - regMid) / 86400000);
}

async function refreshAccessStatus() {
  const cached = sess.getJSON('accessStatus', null);
  if (cached) return cached;
  const sheetId = store.get('sheetId');
  const daysElapsed = daysElapsedSinceRegistration();
  let statusResp = { status: 'Trial', validUntil: '', activatedOn: '' };
  const r = await apiCall('checkStatus', { sheetId: sheetId });
  if (r.ok && r.data) statusResp = r.data;

  let accessLevel = 'trial';
  let trialDay = Math.min(daysElapsed + 1, 3);
  const todayStr = new Date();

  if (statusResp.status === 'Active') {
    if (statusResp.validUntil) {
      const validDate = new Date(statusResp.validUntil);
      accessLevel = (todayStr <= validDate) ? 'active' : 'expired';
    } else {
      accessLevel = 'active';
    }
  } else if (statusResp.status === 'Trial') {
    accessLevel = daysElapsed < 3 ? 'trial' : 'expired';
  } else {
    accessLevel = 'expired';
  }

  const result = Object.assign({}, statusResp, { accessLevel: accessLevel, trialDay: trialDay });
  sess.setJSON('accessStatus', result);
  return result;
}

/* ------------------------------------------------------------------
   ICON HELPER
------------------------------------------------------------------- */
function icon(name, extra) {
  extra = extra || '';
  return `<i data-lucide="${name}" style="width:18px;height:18px;stroke-width:1.8;color:var(--emerald);${extra}"></i>`;
}
function afterRender() {
  if (window.lucide) lucide.createIcons();
}

/* ------------------------------------------------------------------
   SHARED UI PIECES
------------------------------------------------------------------- */
function vibrate(ms) {
  try { if (window.navigator && navigator.vibrate) navigator.vibrate(ms || 35); } catch (e) {}
}

function logoHeaderHTML(showBusinessName) {
  const businessName = store.get('businessName') || '';
  return `
    <div class="app-header">
      <div style="display:flex;flex-direction:column;align-items:center;flex:1;">
        <img class="logo" src="logo-header.png" alt="Niqesh" onerror="this.style.display='none'">
        ${showBusinessName && businessName ? `<div class="business-name-tag">${businessName}</div>` : ''}
      </div>
      ${langSwitcherHTML()}
    </div>`;
}

function langSwitcherHTML() {
  return `
    <div class="lang-switcher">
      <select onchange="setLanguage(this.value)">
        <option value="en-usd" ${state.language === 'en-usd' ? 'selected' : ''}>En-$</option>
        <option value="en-bdt" ${state.language === 'en-bdt' ? 'selected' : ''}>En-৳</option>
        <option value="bn-bdt" ${state.language === 'bn-bdt' ? 'selected' : ''}>Bn-৳</option>
      </select>
    </div>`;
}

function headerHTML(titleKey, opts) {
  opts = opts || {};
  const backBtn = opts.noBack ? '' :
    `<button class="back-btn" onclick="(${opts.onBack ? opts.onBack.toString() : 'goBack'})()">${icon('arrow-left', 'color:#fff;')}</button>`;
  const title = opts.customTitle || t(titleKey);
  return `
    <div class="app-header">
      <div class="header-left">${backBtn}<h1 class="header-title">${title}</h1></div>
      ${opts.showLang !== false ? langSwitcherHTML() : '<div></div>'}
    </div>`;
}

function footerCreditHTML() {
  return `
    <div class="footer-credit">
      App by <a href="https://digiwizr.com/" target="_blank" rel="noopener"><span class="brand-digi">Digi</span><span class="brand-wizr">wizr</span></a>
    </div>`;
}

function trialRibbonHTML(accessInfo) {
  if (!accessInfo) return '';
  if (accessInfo.accessLevel === 'active') return '';
  if (sess.get('ribbonDismissed') === 'true' && accessInfo.accessLevel !== 'expired') return '';

  let textKey = 'trialDay1';
  let expired = false;
  if (accessInfo.accessLevel === 'expired') { textKey = 'trialExpired'; expired = true; }
  else if (accessInfo.trialDay === 1) textKey = 'trialDay1';
  else if (accessInfo.trialDay === 2) textKey = 'trialDay2';
  else textKey = 'trialDay3';

  const xBtn = expired ? '' : `<button class="ribbon-x" onclick="dismissRibbon(event)">${icon('x', 'color:#fff;')}</button>`;
  return `
    <div class="trial-ribbon ${expired ? 'expired' : ''}" onclick="${expired ? '' : "navigate('subscription')"}">
      ${icon('crown', 'color:#fff;')}<span>${t(textKey)}</span>${xBtn}
    </div>`;
}
function dismissRibbon(e) {
  e.stopPropagation();
  sess.set('ribbonDismissed', 'true');
  render();
}

function messageHTML(msg) {
  if (!msg) return '';
  return `<div class="msg ${msg.type}">${msg.text}</div>`;
}

/* ------------------------------------------------------------------
   SCREEN: FIRST TIME SETUP
------------------------------------------------------------------- */
let setupMsg = null;
function renderSetup() {
  const f = state.routeParams.form || {};
  return `
    ${logoHeaderHTML(false)}
    <div class="screen-body">
      <h2 style="text-align:center;margin-top:6px;">${t('welcomeTitle')}</h2>
      <p class="muted center" style="margin-bottom:20px;">${t('welcomeSubtitle')}</p>
      ${messageHTML(setupMsg)}
      <div class="field"><label>${t('businessName')} *</label><input id="s_businessName" type="text" value="${f.businessName||''}"></div>
      <div class="field"><label>${t('ownerName')} *</label><input id="s_ownerName" type="text" value="${f.ownerName||''}"></div>
      <div class="field"><label>${t('phoneNumber')} *</label><input id="s_phone" type="tel" value="${f.phone||''}"></div>
      <div class="field"><label>${t('whatsappNumber')}</label><input id="s_whatsapp" type="tel" value="${f.whatsapp||''}"></div>
      <div class="field"><label>${t('emailAddress')} *</label><input id="s_email" type="email" value="${f.email||''}"></div>
      <div class="field"><label>${t('houseStreet')}</label><input id="s_house" type="text" value="${f.house||''}"></div>
      <div class="field"><label>${t('policeStation')}</label><input id="s_ps" type="text" value="${f.ps||''}"></div>
      <div class="field"><label>${t('district')}</label><input id="s_district" type="text" value="${f.district||''}"></div>
      <div class="field"><label>${t('division')}</label><input id="s_division" type="text" value="${f.division||''}"></div>
      <div class="field"><label>${t('zipCode')}</label><input id="s_zip" type="text" value="${f.zip||''}"></div>
      <div class="field"><label>${t('createPin')} *</label><input id="s_pin1" type="password" inputmode="numeric" maxlength="4"></div>
      <div class="field"><label>${t('confirmPin')} *</label><input id="s_pin2" type="password" inputmode="numeric" maxlength="4"></div>
      <button class="btn" id="setupBtn" onclick="submitSetup()">${t('setupAccount')}</button>
      <div class="center"><a href="javascript:void(0)" onclick="navigate('recovery')">${t('alreadyHaveAccount')}</a></div>
      ${footerCreditHTML()}
    </div>`;
}

async function submitSetup() {
  const val = (id) => document.getElementById(id).value.trim();
  const form = {
    businessName: val('s_businessName'), ownerName: val('s_ownerName'), phone: val('s_phone'),
    whatsapp: val('s_whatsapp'), email: val('s_email'), house: val('s_house'), ps: val('s_ps'),
    district: val('s_district'), division: val('s_division'), zip: val('s_zip')
  };
  const pin1 = val('s_pin1'), pin2 = val('s_pin2');

  if (!form.businessName || !form.ownerName || !form.phone || !form.email) {
    setupMsg = { type: 'error', text: t('error') };
    navigate('setup', { form: form }); return;
  }
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
  if (!emailOk) { setupMsg = { type: 'error', text: t('error') }; navigate('setup', { form: form }); return; }
  if (!pin1 || pin1.length !== 4 || pin1 !== pin2) {
    setupMsg = { type: 'error', text: t('pinMismatch') };
    navigate('setup', { form: form }); return;
  }

  const btn = document.getElementById('setupBtn');
  btn.innerHTML = `<span class="spinner"></span>`;
  btn.disabled = true;

  const r = await apiCall('setupClient', {
    businessName: form.businessName, ownerName: form.ownerName, phone: form.phone,
    whatsapp: form.whatsapp, email: form.email, houseStreet: form.house, policeStation: form.ps,
    district: form.district, division: form.division, zipCode: form.zip
  });

  if (!r.ok) {
    setupMsg = { type: 'error', text: t('error') };
    navigate('setup', { form: form }); return;
  }

  store.set('sheetId', r.data.sheetId);
  store.set('businessName', form.businessName);
  store.set('accessPIN', pin1);
  store.set('registrationDate', new Date().toISOString());
  state.sheetId = r.data.sheetId;
  state.businessName = form.businessName;

  showRecoveryPinModal(r.data.recoveryPIN);
}

function showRecoveryPinModal(pin) {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal-box">
      <h3>${t('recoveryPinTitle')}</h3>
      <div class="recovery-pin-display">${pin}</div>
      <p class="muted" style="font-size:13px;">${t('recoveryPinWarning')}</p>
      <button class="btn" id="pinSavedBtn">${t('savedMyPin')}</button>
    </div>`;
  document.body.appendChild(overlay);
  document.getElementById('pinSavedBtn').onclick = () => {
    document.body.removeChild(overlay);
    sess.set('authenticated', 'true');
    navigate('home');
  };
}

/* ------------------------------------------------------------------
   SCREEN: PIN ENTRY
------------------------------------------------------------------- */
let pinError = '';
function renderPinEntry() {
  return `
    <div class="screen-body center" style="display:flex;flex-direction:column;justify-content:center;min-height:80vh;">
      <img class="logo" src="logo-header.png" style="margin:0 auto 20px;" alt="Niqesh" onerror="this.style.display='none'">
      <label style="text-align:center;">${t('enterPin')}</label>
      <input id="pinField" class="pin-input" type="password" inputmode="numeric" maxlength="4" style="margin-bottom:14px;">
      ${pinError ? `<div class="msg error">${pinError}</div>` : ''}
      <button class="btn" onclick="submitPin()">${t('unlock')}</button>
      <div class="center" style="margin-top:8px;"><a href="javascript:void(0)" onclick="navigate('recovery')">${t('forgotPin')}</a></div>
      ${footerCreditHTML()}
    </div>`;
}
function submitPin() {
  const val = document.getElementById('pinField').value.trim();
  const saved = store.get('accessPIN');
  if (val && val === saved) {
    pinError = '';
    sess.set('authenticated', 'true');
    navigate('home');
  } else {
    pinError = t('incorrectPin');
    render();
  }
}

/* ------------------------------------------------------------------
   SCREEN: RECOVERY
------------------------------------------------------------------- */
let recoveryState = { stage: 'enter', error: '', sheetId: null, businessName: null };
function renderRecovery() {
  if (recoveryState.stage === 'enter') {
    return `
      <div class="screen-body">
        ${headerHTML('recoverAccount', { onBack: () => navigate('home') })}
        <div class="field"><label>${t('enterRecoveryPin')}</label>
          <input id="recPin" class="pin-input" type="text" inputmode="numeric" maxlength="6"></div>
        ${recoveryState.error ? `<div class="msg error">${recoveryState.error}</div>` : ''}
        <button class="btn" onclick="submitRecovery()">${t('recoverButton')}</button>
        ${footerCreditHTML()}
      </div>`;
  }
  return `
    <div class="screen-body">
      ${headerHTML('setNewPin', { onBack: () => navigate('home') })}
      <div class="field"><label>${t('setNewPin')}</label><input id="newPin1" type="password" inputmode="numeric" maxlength="4"></div>
      <div class="field"><label>${t('confirmNewPin')}</label><input id="newPin2" type="password" inputmode="numeric" maxlength="4"></div>
      ${recoveryState.error ? `<div class="msg error">${recoveryState.error}</div>` : ''}
      <button class="btn" onclick="submitNewPin()">${t('save')}</button>
      ${footerCreditHTML()}
    </div>`;
}
async function submitRecovery() {
  const pin = document.getElementById('recPin').value.trim();
  const r = await apiCall('recoverAccount', { recoveryPIN: pin });
  if (r.ok && r.data && r.data.sheetId) {
    recoveryState.sheetId = r.data.sheetId;
    recoveryState.businessName = r.data.businessName;
    recoveryState.stage = 'newpin';
    recoveryState.error = '';
    render();
  } else {
    recoveryState.error = t('recoveryFailed');
    render();
  }
}
function submitNewPin() {
  const p1 = document.getElementById('newPin1').value.trim();
  const p2 = document.getElementById('newPin2').value.trim();
  if (!p1 || p1.length !== 4 || p1 !== p2) {
    recoveryState.error = t('pinMismatch');
    render(); return;
  }
  store.set('sheetId', recoveryState.sheetId);
  store.set('businessName', recoveryState.businessName || '');
  store.set('accessPIN', p1);
  if (!store.get('registrationDate')) store.set('registrationDate', new Date().toISOString());
  state.sheetId = recoveryState.sheetId;
  recoveryState = { stage: 'enter', error: '', sheetId: null, businessName: null };
  sess.set('authenticated', 'true');
  navigate('home');
}

/* ------------------------------------------------------------------
   SCREEN: HOME
------------------------------------------------------------------- */
let homeData = { summary: null, entries: null, accessInfo: null };
function renderHome() {
  const queue = store.getJSON('pendingSync', []);
  const lastSynced = store.get('lastSynced');
  const businessName = store.get('businessName') || '';

  const summary = homeData.summary;
  const revenueHTML = summary ? fmtMoney(summary.revenue) : `<div class="shimmer"></div>`;
  const profitVal = summary ? summary.profit : null;
  const profitClass = profitVal === null ? '' : (profitVal >= 0 ? 'positive' : 'negative');
  const profitHTML = summary ? fmtMoney(summary.profit) : `<div class="shimmer"></div>`;
  const marginVal = summary ? summary.profitMargin : null;
  const marginClass = marginVal === null ? '' : (marginVal >= 0 ? 'positive' : 'negative');
  const marginHTML = summary ? (summary.profitMargin + '%') : `<div class="shimmer"></div>`;

  const accessInfo = homeData.accessInfo;
  const expired = accessInfo && accessInfo.accessLevel === 'expired';

  const actionBtn = (labelKey, iconName, route, dangerLock) => `
    <button class="btn ${dangerLock ? 'disabled' : ''}" onclick="${dangerLock ? `alert('${t('trialExpired')}')` : `navigate('${route}')`}">
      ${icon(iconName, `color:${dangerLock ? '#888' : '#fff'};`)} ${t(labelKey)} ${dangerLock ? icon('lock', 'color:#888;') : ''}
    </button>`;

  return `
    ${logoHeaderHTML(true)}
    <div class="screen-body">
      ${queue.length ? `
        <div class="offline-banner">
          ${icon('wifi-off', 'color:var(--navy);')}
          <span>${queue.length} ${t('pendingSync')}</span>
          <button class="btn small" style="margin:0;width:auto;" onclick="trySyncPending()">${t('syncNow')}</button>
        </div>` : ''}

      <div class="stat-row">
        <div class="stat-card"><div class="stat-label">${t('todaysRevenue')}</div><div class="stat-value">${revenueHTML}</div></div>
        <div class="stat-card"><div class="stat-label">${t('todaysProfit')}</div><div class="stat-value ${profitClass}">${profitHTML}</div></div>
        <div class="stat-card"><div class="stat-label">${t('profitMargin')}</div><div class="stat-value ${marginClass}">${marginHTML}</div></div>
      </div>
      ${lastSynced ? `<div class="muted" style="font-size:11px;margin-bottom:14px;">${t('lastSynced')} ${new Date(lastSynced).toLocaleString()}</div>` : ''}

      ${actionBtn('recordSale', 'receipt', 'sale', expired)}
      ${actionBtn('startSaleSession', 'shopping-cart', 'session', expired)}
      ${actionBtn('collectionDue', 'banknote', 'collectionDue', expired)}
      ${actionBtn('recordExpense', 'minus-circle', 'expense', expired)}
      ${actionBtn('dashboard', 'layout-dashboard', 'dashboard', false)}

      <div class="section-title">${t('recentEntries')}</div>
      ${renderRecentEntries()}
    </div>
    ${trialRibbonHTML(accessInfo)}
    ${footerCreditHTML()}
    ${renderIosBanner()}
  `;
}

function renderRecentEntries() {
  const entries = homeData.entries;
  if (!entries) return `<div class="loading-wrap"><span class="spinner" style="border-top-color:var(--navy);border-color:rgba(29,52,79,0.3);"></span></div>`;
  if (!entries.length) return `<div class="muted italic">${t('noData')}</div>`;
  return entries.map((e) => {
    const badgeClass = { Sales: 'sale', Expenses: 'expense', Collections: 'collection', Dues: 'due' }[e.tab] || '';
    const badgeLabel = { Sales: 'SALE', Expenses: 'EXPENSE', Collections: 'COLLECTION', Dues: 'DUE' }[e.tab] || e.tab;
    const desc = e.description || e.itemName || '';
    const amt = e.amount !== undefined ? fmtMoney(e.amount) : (e.quantity !== undefined ? e.quantity : '');
    return `
      <div class="card entry-row">
        <div class="entry-info">
          <span class="badge ${badgeClass}">${badgeLabel}</span>
          <div class="entry-desc">${desc} <span class="muted">• ${e.date || ''}</span></div>
        </div>
        <div class="entry-amount">${amt}</div>
        <button class="icon-btn danger" onclick="deleteEntry('${e.tab}', ${e.rowIndex})">${icon('trash-2', 'color:var(--red);')}</button>
      </div>`;
  }).join('');
}

async function deleteEntry(tab, rowIndex) {
  if (!confirm(t('confirmDeleteProduct'))) return;
  const r = await apiCall('deleteEntry', { sheetId: state.sheetId, tabName: tab, rowIndex: rowIndex });
  if (r.ok) {
    homeData.entries = homeData.entries.filter((e) => !(e.tab === tab && e.rowIndex === rowIndex));
    render();
  }
}

async function loadHomeData() {
  homeData.accessInfo = await refreshAccessStatus();
  const [summaryR, entriesR] = await Promise.all([
    apiCall('getDailySummary', { sheetId: state.sheetId }),
    apiCall('getRecentEntries', { sheetId: state.sheetId })
  ]);
  homeData.summary = summaryR.ok ? summaryR.data : { revenue: 0, profit: 0, profitMargin: 0 };
  homeData.entries = entriesR.ok ? entriesR.data : [];
  if (state.route === 'home') render();
}

/* ------------------------------------------------------------------
   iOS INSTALL BANNER
------------------------------------------------------------------- */
function isIosSafari() {
  const ua = window.navigator.userAgent;
  const isIos = /iPad|iPhone|iPod/.test(ua);
  const isSafari = /Safari/.test(ua) && !/CriOS|FxiOS|OPiOS|mercury/.test(ua);
  const isStandalone = window.navigator.standalone === true;
  return isIos && isSafari && !isStandalone;
}
function renderIosBanner() {
  if (!isIosSafari() || store.get('iosBannerDismissed') === 'true') return '';
  return `
    <div class="ios-banner">
      ${icon('arrow-down', 'color:#fff;')}
      <span>Install this app: tap the Share icon below, then select Add to Home Screen.</span>
      <button class="close-x" onclick="dismissIosBanner()">${icon('x', 'color:#fff;')}</button>
    </div>`;
}
function dismissIosBanner() { store.set('iosBannerDismissed', 'true'); render(); }

/* ------------------------------------------------------------------
   SCREEN: RECORD A SALE
------------------------------------------------------------------- */
let saleState = { search: '', selected: null, qty: 1, discount: 0, notes: '', msg: null };
async function ensureProducts() {
  if (state.productCache) return state.productCache;
  const r = await apiCall('getProducts', { sheetId: state.sheetId });
  state.productCache = r.ok ? r.data : [];
  return state.productCache;
}
async function renderSaleScreen() {
  const products = await ensureProducts();
  const filtered = products.filter((p) => p.name.toLowerCase().includes(saleState.search.toLowerCase()));
  const html = `
    <div class="screen-body">
      ${headerHTML('recordSale')}
      ${messageHTML(saleState.msg)}

      ${saleState.selected ? `
        <div class="card" style="margin-bottom:14px;">
          <div class="bold">${saleState.selected.name}</div>
          <div class="muted" style="font-size:12px;">${saleState.selected.size || ''} | ${t('cost')}: ${fmtMoney(saleState.selected.cost)} | ${t('price')}: ${fmtMoney(saleState.selected.price)}</div>
        </div>
        <div class="field"><label>${t('quantity')}</label><input id="saleQty" type="number" min="1" value="${saleState.qty}" onchange="saleState.qty=this.value"></div>
        <div class="field"><label>${t('discount')}</label><input id="saleDiscount" type="number" value="${saleState.discount}" onchange="saleState.discount=this.value"></div>
        <div class="field"><label>${t('notes')}</label><input id="saleNotes" type="text" value="${saleState.notes}" onchange="saleState.notes=this.value"></div>
        <button class="btn" onclick="submitSale()">${t('saveSale')}</button>
      ` : `<div class="muted italic" style="margin-bottom:14px;">${t('selectProduct')}</div>`}

      <hr class="divider">
      <div class="section-title">Product List</div>
      <div class="field input-with-icon">
        <span class="icon-left">${icon('search')}</span>
        <input type="text" placeholder="${t('searchProduct')}" value="${saleState.search}" oninput="saleSearchInput(this.value)">
      </div>
      <div id="saleProductList">${renderSaleProductList(filtered)}</div>
      ${footerCreditHTML()}
    </div>`;
  document.getElementById('app').innerHTML = html;
  afterRender();
}
function renderSaleProductList(list) {
  if (!list.length) return `<div class="muted italic">${t('noData')}</div>`;
  return list.map((p, i) => `
    <div class="card product-card ${saleState.selected === p ? 'selected' : ''}" onclick="selectSaleProduct(${i}, event)">
      <div class="bold">${p.name}</div>
      <div class="muted" style="font-size:12px;">${p.size || ''} | ${t('cost')}: ${fmtMoney(p.cost)} | ${t('price')}: ${fmtMoney(p.price)}</div>
    </div>`).join('');
}
function saleSearchInput(val) {
  saleState.search = val;
  const products = state.productCache || [];
  const filtered = products.filter((p) => p.name.toLowerCase().includes(val.toLowerCase()));
  document.getElementById('saleProductList').innerHTML = renderSaleProductList(filtered);
  afterRender();
}
function selectSaleProduct(i, e) {
  const products = state.productCache || [];
  const filtered = products.filter((p) => p.name.toLowerCase().includes(saleState.search.toLowerCase()));
  saleState.selected = filtered[i];
  saleState.qty = 1;
  saleState.discount = 0;
  saleState.notes = '';
  renderSaleScreen();
}
async function submitSale() {
  if (!saleState.selected || safeNum(saleState.qty) <= 0) {
    saleState.msg = { type: 'error', text: t('error') };
    return renderSaleScreen();
  }
  const p = saleState.selected;
  const fields = {
    itemName: p.name, quantity: safeNum(saleState.qty), sellPrice: safeNum(p.price),
    costPrice: safeNum(p.cost), discount: safeNum(saleState.discount), notes: saleState.notes
  };
  const r = await apiCall('saveSale', Object.assign({ sheetId: state.sheetId }, fields));
  if (!r.ok) queuePendingSync('saveSale', fields);
  vibrate(35);
  saleState = { search: '', selected: null, qty: 1, discount: 0, notes: '', msg: { type: 'success', text: t('saleRecorded') } };
  renderSaleScreen();
}

/* ------------------------------------------------------------------
   SCREEN: SALE SESSION
------------------------------------------------------------------- */
let sessionSearch = '';
function getCart() { return sess.getJSON('saleSessionCart', []); }
function setCart(cart) { sess.setJSON('saleSessionCart', cart); }

async function renderSessionScreen() {
  const products = await ensureProducts();
  const filtered = sessionSearch ? products.filter((p) => p.name.toLowerCase().includes(sessionSearch.toLowerCase())) : [];
  const cart = getCart();
  const total = cart.reduce((sum, item) => sum + (item.qty * item.price - safeNum(item.itemDiscount)), 0);

  const html = `
    <div class="screen-body">
      ${headerHTML('saleSessionTitle', { onBack: () => confirmLeaveSession() })}
      <div class="field input-with-icon">
        <span class="icon-left">${icon('search')}</span>
        <input type="text" placeholder="${t('searchProduct')}" value="${sessionSearch}" oninput="sessionSearchInput(this.value)">
      </div>
      <div id="sessionResults">${renderSessionResults(filtered)}</div>
      <div id="cartList">${renderCartList(cart)}</div>
      <hr class="divider">
      <div class="flex-between" style="margin-bottom:14px;">
        <span class="bold">${t('sessionTotal')}</span>
        <span class="bold" style="color:var(--emerald);font-size:20px;">${fmtMoney(total)}</span>
      </div>
      <button class="btn outline small" onclick="clearCart()">${t('clearCart')}</button>
      <button class="btn" onclick="submitSession()">${t('saveSession')}</button>
      ${footerCreditHTML()}
    </div>`;
  document.getElementById('app').innerHTML = html;
  afterRender();
}
function renderSessionResults(list) {
  if (!list.length) return '';
  return list.map((p, i) => `
    <div class="card" onclick="addToCart(${i})" style="cursor:pointer;">
      <div class="bold">${p.name}</div>
      <div class="muted" style="font-size:12px;">${p.size || ''} | ${fmtMoney(p.price)}</div>
    </div>`).join('');
}
function cartItemKey(name, size) { return `${name}__${size || ''}`; }
function renderCartList(cart) {
  if (!cart.length) return `<div class="muted italic">${t('cartEmpty')}</div>`;
  return cart.map((item, i) => {
    const lineTotal = item.qty * item.price - safeNum(item.itemDiscount);
    return `
      <div class="card cart-item-v2">
        <button class="remove-x" onclick="removeCartItem(${i})">${icon('x', 'color:var(--red);')}</button>
        <div class="cart-v2-row1">
          <span class="cart-v2-name">${item.name}</span>
          <div class="cart-v2-qty">
            <button onclick="decrementCartItem(${i})">${icon('minus', 'color:var(--navy);')}</button>
            <input type="number" value="${item.qty}" onchange="setCartQty(${i}, this.value)">
            <button onclick="incrementCartItem(${i})">${icon('plus', 'color:var(--navy);')}</button>
          </div>
          <div class="cart-v2-discount">
            <input type="number" title="${t('itemDiscount')}" value="${item.itemDiscount || 0}" onchange="setCartDiscount(${i}, this.value)">
          </div>
        </div>
        <div class="cart-v2-row2">
          <span class="cart-v2-meta">${item.size || ''}${item.size ? ' | ' : ''}${fmtMoney(item.price)}</span>
          <span class="cart-v2-total">${fmtMoney(lineTotal)}</span>
        </div>
      </div>`;
  }).join('');
}
function sessionSearchInput(val) {
  sessionSearch = val;
  const products = state.productCache || [];
  const filtered = val ? products.filter((p) => p.name.toLowerCase().includes(val.toLowerCase())) : [];
  document.getElementById('sessionResults').innerHTML = renderSessionResults(filtered);
  afterRender();
}
function addToCart(i) {
  const products = (state.productCache || []).filter((p) => p.name.toLowerCase().includes(sessionSearch.toLowerCase()));
  const p = products[i];
  const cart = getCart();
  // Match by name AND size — items sharing a name but differing by size are distinct products
  const existing = cart.find((c) => c.name === p.name && (c.size || '') === (p.size || ''));
  if (existing) existing.qty += 1;
  else cart.push({ name: p.name, size: p.size, price: safeNum(p.price), cost: safeNum(p.cost), qty: 1, itemDiscount: 0 });
  setCart(cart);
  vibrate(20);
  renderSessionScreen();
}
function incrementCartItem(i) { const c = getCart(); c[i].qty += 1; setCart(c); renderSessionScreen(); }
function decrementCartItem(i) {
  const c = getCart(); c[i].qty -= 1;
  if (c[i].qty <= 0) c.splice(i, 1);
  setCart(c); renderSessionScreen();
}
function setCartQty(i, val) { const c = getCart(); c[i].qty = Math.max(1, safeNum(val)); setCart(c); renderSessionScreen(); }
function setCartDiscount(i, val) { const c = getCart(); c[i].itemDiscount = safeNum(val); setCart(c); renderSessionScreen(); }
function removeCartItem(i) { const c = getCart(); c.splice(i, 1); setCart(c); renderSessionScreen(); }
function clearCart() {
  if (!getCart().length) return;
  if (confirm(t('confirmClearCart'))) { setCart([]); renderSessionScreen(); }
}
function confirmLeaveSession() {
  const cart = getCart();
  if (cart.length && !confirm(`${t('cancel')}? Cart will be cleared.`)) return;
  setCart([]);
  navigate('home');
}
async function submitSession() {
  const cart = getCart();
  if (!cart.length) return;
  const sessionId = 'SESSION-' + Date.now();
  const cartItems = cart.map((c) => ({ itemName: c.name, quantity: c.qty, sellPrice: c.price, costPrice: c.cost, discount: c.itemDiscount || 0 }));
  const r = await apiCall('saveSaleSession', { sheetId: state.sheetId, cartItems: cartItems, sessionId: sessionId });
  if (!r.ok) queuePendingSync('saveSaleSession', { cartItems: cartItems, sessionId: sessionId });
  vibrate(35);
  setCart([]);
  alert(t('sessionSaved'));
  setTimeout(() => navigate('home'), 300);
}

/* ------------------------------------------------------------------
   SCREEN: COLLECTION / DUE
------------------------------------------------------------------- */
let colDueMsg = null;
function renderCollectionDue() {
  return `
    <div class="screen-body">
      ${headerHTML('collectionDueTitle')}
      ${messageHTML(colDueMsg)}
      <div class="bold" style="margin-bottom:10px;">${t('recordCollection')}</div>
      <div class="field"><label>${t('collectionDescription')}</label><input id="colDesc" type="text"></div>
      <div class="field"><label>${t('collectionAmount')}</label><input id="colAmount" type="number"></div>
      <button class="btn" onclick="submitCollection()">${t('saveCollection')}</button>

      <hr class="divider">

      <div class="bold" style="margin-bottom:10px;">${t('recordDue')}</div>
      <div class="field"><label>${t('outstandingDueDesc')}</label><input id="dueDesc" type="text"></div>
      <div class="field"><label>${t('outstandingDueAmount')}</label><input id="dueAmount" type="number"></div>
      <button class="btn outline" onclick="submitDue()">${t('saveDue')}</button>
      ${footerCreditHTML()}
    </div>`;
}
async function submitCollection() {
  const desc = document.getElementById('colDesc').value.trim();
  const amount = safeNum(document.getElementById('colAmount').value);
  if (amount <= 0) { colDueMsg = { type: 'error', text: t('error') }; return render(); }
  const fields = { description: desc, amount: amount };
  const r = await apiCall('saveCollection', Object.assign({ sheetId: state.sheetId }, fields));
  if (!r.ok) queuePendingSync('saveCollection', fields);
  colDueMsg = { type: 'success', text: t('collectionRecorded') };
  render();
}
async function submitDue() {
  const desc = document.getElementById('dueDesc').value.trim();
  const amount = safeNum(document.getElementById('dueAmount').value);
  if (!desc || amount <= 0) { colDueMsg = { type: 'error', text: t('error') }; return render(); }
  const fields = { description: desc, amount: amount };
  const r = await apiCall('saveDue', Object.assign({ sheetId: state.sheetId }, fields));
  if (!r.ok) queuePendingSync('saveDue', fields);
  colDueMsg = { type: 'success', text: t('dueRecorded') };
  render();
}

/* ------------------------------------------------------------------
   SCREEN: RECORD AN EXPENSE
------------------------------------------------------------------- */
let expenseState = { category: null, description: '', amount: '', msg: null };
function renderExpenseScreen() {
  return `
    <div class="screen-body">
      ${headerHTML('recordExpense')}
      ${messageHTML(expenseState.msg)}
      <div class="section-title">${t('selectCategory')}</div>
      <div class="chip-row">
        ${EXPENSE_CATEGORIES.map((c) => `
          <div class="chip ${expenseState.category === c.value ? 'selected' : ''}" onclick="selectExpenseCategory('${c.value}')">${t(c.key)}</div>
        `).join('')}
      </div>
      <div class="field"><label>${t('description')}</label><input id="expDesc" type="text" value="${expenseState.description}"></div>
      <div class="field"><label>${t('amount')}</label><input id="expAmount" type="number" value="${expenseState.amount}"></div>
      <button class="btn" onclick="submitExpense()">${t('saveExpense')}</button>
      ${footerCreditHTML()}
    </div>`;
}
function selectExpenseCategory(val) { expenseState.category = val; render(); }
async function submitExpense() {
  const description = document.getElementById('expDesc').value.trim();
  const amount = safeNum(document.getElementById('expAmount').value);
  if (!expenseState.category || amount <= 0) {
    expenseState.msg = { type: 'error', text: t('error') };
    return render();
  }
  const fields = { category: expenseState.category, description: description, amount: amount };
  const r = await apiCall('saveExpense', Object.assign({ sheetId: state.sheetId }, fields));
  if (!r.ok) queuePendingSync('saveExpense', fields);
  expenseState = { category: null, description: '', amount: '', msg: { type: 'success', text: t('expenseRecorded') } };
  render();
}

/* ------------------------------------------------------------------
   SCREEN: DASHBOARD
------------------------------------------------------------------- */
function renderDashboard() {
  const accessInfo = sess.getJSON('accessStatus', null);
  let statusHTML = '';
  if (accessInfo) {
    if (accessInfo.accessLevel === 'active') {
      const validText = accessInfo.validUntil ? `${t('subscribedTill')} ${formatDateLong(accessInfo.validUntil)}` : 'Account Active';
      statusHTML = `<div class="status-card active">${icon('shield-check', 'color:var(--emerald);')} ${validText}</div>`;
    } else if (accessInfo.accessLevel === 'trial') {
      const daysRemaining = Math.max(0, 3 - daysElapsedSinceRegistration());
      statusHTML = `<div class="status-card trial">${icon('clock', 'color:var(--amber);')} ${t('onTrialTill')} — ${daysRemaining} ${t('trialDaysRemaining')}</div>`;
    } else {
      statusHTML = `<div class="status-card expired">${icon('lock', 'color:var(--red);')} ${t('trialExpired')}</div>`;
    }
  }
  return `
    <div class="screen-body">
      ${headerHTML('dashboardTitle')}
      ${statusHTML}
      <button class="btn left-align" onclick="navigate('editAccount')">${icon('settings', 'color:#fff;')} ${t('editAccount')}</button>
      <button class="btn left-align" onclick="navigate('products')">${icon('box', 'color:#fff;')} ${t('manageProducts')}</button>
      <button class="btn left-align" onclick="navigate('dailyReport')">${icon('file-text', 'color:#fff;')} ${t('dailyReport')}</button>
      <button class="btn left-align" onclick="navigate('monthlyReport')">${icon('bar-chart-2', 'color:#fff;')} ${t('monthlyReport')}</button>
      <button class="btn left-align" onclick="navigate('subscription')">${icon('crown', 'color:#fff;')} ${t('subscriptionPayment')}</button>
      ${footerCreditHTML()}
    </div>`;
}
function formatDateLong(dateStr) {
  const d = new Date(dateStr);
  if (isNaN(d)) return dateStr;
  const months = MONTHS_EN_FULL;
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

/* ------------------------------------------------------------------
   SCREEN: EDIT ACCOUNT
------------------------------------------------------------------- */
let editAccountState = { profile: null, loading: true, msg: null };
async function renderEditAccountScreen() {
  document.getElementById('app').innerHTML = `
    <div class="screen-body">
      ${headerHTML('editAccountTitle')}
      <div class="loading-wrap"><span class="spinner" style="border-top-color:var(--navy);border-color:rgba(29,52,79,0.3);"></span></div>
    </div>`;
  if (!editAccountState.profile) {
    const r = await apiCall('getClientProfile', { sheetId: state.sheetId });
    editAccountState.profile = r.ok ? r.data : {};
  }
  renderEditAccountForm();
}
function renderEditAccountForm() {
  const p = editAccountState.profile || {};
  const html = `
    <div class="screen-body">
      ${headerHTML('editAccountTitle')}
      ${messageHTML(editAccountState.msg)}
      <div class="field"><label>${t('businessName')} *</label><input id="e_businessName" type="text" value="${p.businessName||''}"></div>
      <div class="field"><label>${t('ownerName')} *</label><input id="e_ownerName" type="text" value="${p.ownerName||''}"></div>
      <div class="field"><label>${t('phoneNumber')} *</label><input id="e_phone" type="tel" value="${p.phone||''}"></div>
      <div class="field"><label>${t('whatsappNumber')}</label><input id="e_whatsapp" type="tel" value="${p.whatsapp||''}"></div>
      <div class="field"><label>${t('emailAddress')} *</label><input id="e_email" type="email" value="${p.email||''}"></div>
      <div class="field"><label>${t('houseStreet')}</label><input id="e_house" type="text" value="${p.houseStreet||''}"></div>
      <div class="field"><label>${t('policeStation')}</label><input id="e_ps" type="text" value="${p.policeStation||''}"></div>
      <div class="field"><label>${t('district')}</label><input id="e_district" type="text" value="${p.district||''}"></div>
      <div class="field"><label>${t('division')}</label><input id="e_division" type="text" value="${p.division||''}"></div>
      <div class="field"><label>${t('zipCode')}</label><input id="e_zip" type="text" value="${p.zipCode||''}"></div>
      <div class="field"><label>${t('accountPin')}</label><input id="e_pin" type="password" inputmode="numeric" maxlength="4" placeholder="••••"></div>
      <div class="field"><label>${t('recoveryPinLabel')}</label>
        <div class="flex-between">
          <input type="text" value="${p.recoveryPIN||''}" readonly style="background:#f5f5f5;">
          <button class="icon-btn" style="margin-left:8px;" onclick="copyRecoveryPin('${p.recoveryPIN||''}')">${icon('key')}</button>
        </div>
      </div>
      <button class="btn" onclick="submitEditAccount()">${t('saveChanges')}</button>
      ${footerCreditHTML()}
    </div>`;
  document.getElementById('app').innerHTML = html;
  afterRender();
}
function copyRecoveryPin(pin) { navigator.clipboard && navigator.clipboard.writeText(pin); }
async function submitEditAccount() {
  const val = (id) => document.getElementById(id).value.trim();
  const fields = {
    businessName: val('e_businessName'), ownerName: val('e_ownerName'), phone: val('e_phone'),
    whatsapp: val('e_whatsapp'), email: val('e_email'), houseStreet: val('e_house'),
    policeStation: val('e_ps'), district: val('e_district'), division: val('e_division'), zipCode: val('e_zip')
  };
  const pin = val('e_pin');
  if (pin && pin.length === 4) store.set('accessPIN', pin);
  const r = await apiCall('updateClientProfile', Object.assign({ sheetId: state.sheetId }, fields));
  editAccountState.msg = { type: r.ok ? 'success' : 'error', text: r.ok ? t('success') : t('error') };
  if (r.ok) {
    store.set('businessName', fields.businessName);
    editAccountState.profile = Object.assign({}, editAccountState.profile, fields);
  }
  renderEditAccountForm();
}

/* ------------------------------------------------------------------
   SCREEN: MANAGE PRODUCTS
------------------------------------------------------------------- */
let productsState = { search: '', editingIndex: null, msg: null };
async function renderProductsScreen() {
  const products = await ensureProducts();
  renderProductsForm(products);
}
function renderProductsForm(products) {
  const editing = productsState.editingIndex !== null ? products[productsState.editingIndex] : null;
  const filtered = products.filter((p) => p.name.toLowerCase().includes(productsState.search.toLowerCase()))
    .sort((a, b) => a.name.localeCompare(b.name));
  const html = `
    <div class="screen-body">
      ${headerHTML('manageProducts')}
      ${messageHTML(productsState.msg)}
      <div class="field"><label>${t('productName')}</label><input id="p_name" type="text" value="${editing ? editing.name : ''}"></div>
      <div class="field"><label>${t('size')}</label><input id="p_size" type="text" value="${editing ? (editing.size||'') : ''}"></div>
      <div class="field"><label>${t('cost')}</label><input id="p_cost" type="number" value="${editing ? editing.cost : ''}"></div>
      <div class="field"><label>${t('price')}</label><input id="p_price" type="number" value="${editing ? editing.price : ''}"></div>
      <button class="btn" onclick="submitProduct()">${icon('plus-circle', 'color:#fff;')} ${editing ? t('updateProduct') : t('addProduct')}</button>
      ${editing ? `<div class="center" style="margin-bottom:14px;"><a href="javascript:void(0)" onclick="cancelEditProduct()">${t('cancel')}</a></div>` : ''}

      <div class="field input-with-icon">
        <span class="icon-left">${icon('search')}</span>
        <input type="text" placeholder="${t('searchProduct')}" value="${productsState.search}" oninput="productSearchInput(this.value)">
      </div>

      <div class="section-title">${t('currentProducts')}</div>
      <div id="productList">${renderProductList(filtered, products)}</div>
      ${footerCreditHTML()}
    </div>`;
  document.getElementById('app').innerHTML = html;
  afterRender();
}
function renderProductList(filtered, allProducts) {
  if (!filtered.length) return `<div class="muted italic">${t('noData')}</div>`;
  return filtered.map((p) => {
    const realIndex = allProducts.indexOf(p);
    return `
      <div class="card entry-row">
        <div class="entry-info">${p.name} | ${p.size||''} | ${t('cost')}: ${fmtMoney(p.cost)} | ${t('price')}: ${fmtMoney(p.price)}</div>
        <button class="icon-btn" onclick="editProduct(${realIndex})">${icon('pencil')}</button>
        <button class="icon-btn danger" onclick="deleteProduct(${realIndex})">${icon('trash-2', 'color:var(--red);')}</button>
      </div>`;
  }).join('');
}
function productSearchInput(val) {
  productsState.search = val;
  const products = state.productCache || [];
  const filtered = products.filter((p) => p.name.toLowerCase().includes(val.toLowerCase())).sort((a,b) => a.name.localeCompare(b.name));
  document.getElementById('productList').innerHTML = renderProductList(filtered, products);
  afterRender();
}
function editProduct(i) { productsState.editingIndex = i; renderProductsForm(state.productCache); }
function cancelEditProduct() { productsState.editingIndex = null; renderProductsForm(state.productCache); }
async function submitProduct() {
  const name = document.getElementById('p_name').value.trim();
  const size = document.getElementById('p_size').value.trim();
  const cost = safeNum(document.getElementById('p_cost').value);
  const price = safeNum(document.getElementById('p_price').value);
  if (!name) { productsState.msg = { type: 'error', text: t('error') }; return renderProductsForm(state.productCache); }

  if (productsState.editingIndex !== null) {
    await apiCall('updateProduct', { sheetId: state.sheetId, rowIndex: productsState.editingIndex + 2, name, size, cost, price });
  } else {
    await apiCall('addProduct', { sheetId: state.sheetId, name, size, cost, price });
  }
  productsState.editingIndex = null;
  productsState.msg = { type: 'success', text: t('success') };
  state.productCache = null;
  await renderProductsScreen();
}
async function deleteProduct(i) {
  if (!confirm(t('confirmDeleteProduct'))) return;
  await apiCall('deleteProduct', { sheetId: state.sheetId, rowIndex: i + 2 });
  state.productCache = null;
  await renderProductsScreen();
}

/* ------------------------------------------------------------------
   SCREEN: DAILY REPORT
------------------------------------------------------------------- */
let dailyReportState = { date: new Date(), data: null, loading: true };
function ddmmyyyy(d) {
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  return `${dd}/${mm}/${d.getFullYear()}`;
}
function formatDayHeading(d) {
  const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  return `${days[d.getDay()]}, ${d.getDate()} ${MONTHS_EN_FULL[d.getMonth()]} ${d.getFullYear()}`;
}
async function renderDailyReportScreen() {
  document.getElementById('app').innerHTML = `
    <div class="screen-body">
      ${headerHTML('dailyReportTitle')}
      <input class="date-selector" type="date" value="${dailyReportState.date.toISOString().slice(0,10)}" onchange="changeDailyReportDate(this.value)">
      <div class="loading-wrap"><span class="spinner" style="border-top-color:var(--navy);border-color:rgba(29,52,79,0.3);"></span></div>
    </div>`;
  const dateStr = ddmmyyyy(dailyReportState.date);
  const r = await apiCall('getDailyReport', { sheetId: state.sheetId, date: dateStr });
  dailyReportState.data = r.ok ? r.data : { sales: [], collections: [], dues: [], expenses: [], summary: {} };
  renderDailyReportBody();
}
function changeDailyReportDate(val) {
  dailyReportState.date = new Date(val + 'T00:00:00');
  renderDailyReportScreen();
}
function renderDailyReportBody() {
  const d = dailyReportState.data;
  const s = d.summary || {};
  const html = `
    <div class="screen-body">
      ${headerHTML('dailyReportTitle')}
      <div class="print-header"><span class="bold">${store.get('businessName')||''}</span><span>${formatDayHeading(dailyReportState.date)}</span></div>
      <input class="date-selector" type="date" value="${dailyReportState.date.toISOString().slice(0,10)}" onchange="changeDailyReportDate(this.value)">
      <div class="muted center" style="margin:8px 0;">${formatDayHeading(dailyReportState.date)}</div>

      <div class="section-title">${t('sales')}</div>
      ${!d.sales.length ? `<div class="muted italic">${t('noData')}</div>` : `
      <table class="report-table">
        <thead><tr><th>${t('product')}</th><th>${t('sizeCol')}</th><th class="num">${t('qty')}</th><th class="num">${t('unitPrice')}</th><th class="num">${t('discountCol')}</th><th class="num">${t('total')}</th></tr></thead>
        <tbody>${d.sales.map((row) => `<tr><td>${row.itemName}</td><td>${row.size||''}</td><td class="num">${row.quantity}</td><td class="num">${fmtMoney(row.sellPrice)}</td><td class="num">${fmtMoney(row.discount)}</td><td class="num">${fmtMoney(row.quantity*row.sellPrice-row.discount)}</td></tr>`).join('')}</tbody>
      </table>`}
      <div class="summary-line"><span>${t('totalGrossSales')}</span><span>${fmtMoney(s.totalGrossSales)}</span></div>
      <div class="summary-line"><span>${t('totalDiscount')}</span><span>— ${fmtMoney(s.totalDiscount)}</span></div>
      <div class="summary-line total"><span>${t('netSalesRevenue')}</span><span>${fmtMoney(s.netSalesRevenue)}</span></div>

      <div class="section-title">${t('collectionDue')}</div>
      ${!d.collections.length ? `<div class="muted italic">${t('noData')}</div>` : `
      <table class="report-table"><thead><tr><th>${t('description')}</th><th class="num">${t('amount')}</th></tr></thead>
      <tbody>${d.collections.map((c) => `<tr><td>${c.description||''}</td><td class="num">${fmtMoney(c.amount)}</td></tr>`).join('')}</tbody></table>`}
      <div class="summary-line total"><span>${t('totalCollections')}</span><span>${fmtMoney(s.totalCollections)}</span></div>

      <div class="section-title">${t('outstandingDues')}</div>
      ${!d.dues.length ? `<div class="muted italic">${t('noData')}</div>` : `
      <table class="report-table"><thead><tr><th>${t('description')}</th><th class="num">${t('amount')}</th></tr></thead>
      <tbody>${d.dues.map((c) => `<tr><td>${c.description||''}</td><td class="num">${fmtMoney(c.amount)}</td></tr>`).join('')}</tbody></table>`}
      <div class="summary-line total"><span>${t('outstandingDues')}</span><span>${fmtMoney(s.totalDues)}</span></div>

      <div class="section-title">${t('recordExpense')}</div>
      ${!d.expenses.length ? `<div class="muted italic">${t('noData')}</div>` : `
      <table class="report-table"><thead><tr><th>${t('selectCategory')}</th><th>${t('description')}</th><th class="num">${t('amount')}</th></tr></thead>
      <tbody>${d.expenses.map((e) => `<tr><td>${e.category}</td><td>${e.description||''}</td><td class="num">${fmtMoney(e.amount)}</td></tr>`).join('')}</tbody></table>`}
      <div class="summary-line total"><span>${t('totalExpenses')}</span><span>${fmtMoney(s.totalExpenses)}</span></div>

      <div class="section-title" style="border-left-color:var(--navy);">${t('dailySummary')}</div>
      <div class="summary-line"><span>${t('totalCashIn')}</span><span>${fmtMoney(s.totalCashIn)}</span></div>
      <div class="summary-line"><span>${t('cogs')}</span><span>${fmtMoney(s.cogs)}</span></div>
      <div class="summary-line"><span>${t('totalExpenses')}</span><span>${fmtMoney(s.totalExpenses)}</span></div>
      <div class="summary-line total"><span>${t('grossProfit')}</span><span style="color:${s.grossProfit>=0?'var(--emerald)':'var(--red)'};">${fmtMoney(s.grossProfit)}</span></div>
      <div class="summary-line"><span>${t('profitMargin')}</span><span style="color:${s.profitMargin>=0?'var(--emerald)':'var(--red)'};">${s.profitMargin||0}%</span></div>

      <div class="chart-wrap no-print"><canvas id="dailyLineChart" height="180"></canvas></div>
      <div class="chart-wrap no-print"><canvas id="dailyDoughnutChart" height="180"></canvas></div>
      <div class="chart-wrap no-print"><canvas id="dailyBarChart" height="220"></canvas></div>

      <div class="muted" style="font-size:11px;margin:10px 0;">${t('reportGenerated')}</div>
      <button class="btn download-pdf-btn" onclick="window.print()">${icon('download', 'color:#fff;')} ${t('downloadPDF')}</button>
      <div class="print-footer">${t('reportGenerated')} | ${new Date().toLocaleString()}</div>
      ${footerCreditHTML()}
    </div>`;
  document.getElementById('app').innerHTML = html;
  afterRender();
  loadDailyReportCharts();
}
async function loadDailyReportCharts() {
  const y = dailyReportState.date.getFullYear(), m = dailyReportState.date.getMonth() + 1;
  const r = await apiCall('getMonthContext', { sheetId: state.sheetId, month: m, year: y });
  destroyChart('dailyLine'); destroyChart('dailyDoughnut'); destroyChart('dailyBar');

  // Line chart: genuine month-to-date sales trend (uses monthly context, trimmed to the selected day)
  if (r.ok) {
    const ctx = r.data;
    const upTo = dailyReportState.date.getDate();
    const dayLabels = Array.from({length: upTo}, (_, i) => i + 1);
    const dailyLineEl = document.getElementById('dailyLineChart');
    if (dailyLineEl) state.chartInstances.dailyLine = new Chart(dailyLineEl, {
      type: 'line', data: { labels: dayLabels, datasets: [{ label: t('salesTrend'), data: ctx.dailySales.slice(0, upTo), borderColor: '#2ECC71', backgroundColor: 'rgba(46,204,113,0.1)', fill: true }] },
      options: { plugins: { title: { display: true, text: t('salesTrend') } } }
    });
  }

  // Doughnut and bar charts: only the SELECTED DAY's own data, not the whole month
  const dayData = dailyReportState.data || { sales: [], expenses: [] };

  const dayExpenseByCategory = {};
  (dayData.expenses || []).forEach((e) => {
    const cat = e.category || 'Miscellaneous';
    dayExpenseByCategory[cat] = (dayExpenseByCategory[cat] || 0) + safeNum(e.amount);
  });
  const doughEl = document.getElementById('dailyDoughnutChart');
  if (doughEl) state.chartInstances.dailyDoughnut = new Chart(doughEl, {
    type: 'doughnut', data: { labels: Object.keys(dayExpenseByCategory), datasets: [{ data: Object.values(dayExpenseByCategory) }] },
    options: { plugins: { title: { display: true, text: t('expenseBreakdown') }, legend: { position: 'bottom' } } }
  });

  const dayTop10 = (dayData.sales || []).slice().sort((a, b) => safeNum(b.quantity) - safeNum(a.quantity)).slice(0, 10);
  const barEl = document.getElementById('dailyBarChart');
  if (barEl) {
    state.chartInstances.dailyBar = new Chart(barEl, {
      type: 'bar', data: { labels: dayTop10.map((p) => p.itemName), datasets: [{ label: t('top10Products'), data: dayTop10.map((p) => safeNum(p.quantity)), backgroundColor: '#2ECC71' }] },
      options: { indexAxis: 'y', plugins: { title: { display: true, text: t('top10Products') } } }
    });
  }
}
function destroyChart(key) { if (state.chartInstances[key]) { state.chartInstances[key].destroy(); delete state.chartInstances[key]; } }

/* ------------------------------------------------------------------
   SCREEN: MONTHLY REPORT
------------------------------------------------------------------- */
let monthlyState = { year: new Date().getFullYear(), month: null, data: null };
function renderMonthlyReportScreen() {
  const monthLabels = langCode() === 'bn' ? MONTHS_BN : MONTHS_EN;
  const html = `
    <div class="screen-body">
      ${headerHTML('monthlyReportTitle')}
      <div class="month-picker-card">
        <div class="year-row">
          <button class="arrow-btn" onclick="changeMonthlyYear(-1)">${icon('chevron-left', 'color:var(--emerald);')}</button>
          <span class="year-label">${monthlyState.year}</span>
          <button class="arrow-btn" onclick="changeMonthlyYear(1)">${icon('chevron-right', 'color:var(--emerald);')}</button>
        </div>
        <div class="month-grid">
          ${monthLabels.map((label, i) => `<button class="month-btn ${monthlyState.month===i+1?'selected':''}" onclick="selectMonthlyMonth(${i+1})">${label}</button>`).join('')}
        </div>
      </div>
      <div id="monthlyReportBody">${monthlyState.data ? renderMonthlyReportBody() : ''}</div>
      ${footerCreditHTML()}
    </div>`;
  document.getElementById('app').innerHTML = html;
  afterRender();
}
function changeMonthlyYear(delta) { monthlyState.year += delta; renderMonthlyReportScreen(); }
async function selectMonthlyMonth(m) {
  monthlyState.month = m;
  renderMonthlyReportScreen();
  const r = await apiCall('getMonthlyReport', { sheetId: state.sheetId, month: m, year: monthlyState.year });
  monthlyState.data = r.ok ? r.data : {};
  renderMonthlyReportScreen();
  loadMonthlyCharts();
}
function renderMonthlyReportBody() {
  const d = monthlyState.data || {};
  return `
    <div class="print-header"><span class="bold">${store.get('businessName')||''}</span><span>${(langCode()==='bn'?MONTHS_BN:MONTHS_EN)[monthlyState.month-1]} ${monthlyState.year}</span></div>

    <div class="section-title">${t('executiveSummary')}</div>
    <div class="summary-line"><span>${t('sales')}</span><span>${fmtMoney(d.totalSalesRevenue)}</span></div>
    <div class="summary-line"><span>${t('totalCollections')}</span><span>${fmtMoney(d.totalCollections)}</span></div>
    <div class="summary-line"><span>${t('totalExpenses')}</span><span>${fmtMoney(d.totalExpenses)}</span></div>
    <div class="summary-line"><span>${t('grossProfit')}</span><span>${fmtMoney(d.grossProfit)}</span></div>
    <div class="summary-line"><span>${t('netProfit')}</span><span>${fmtMoney(d.netProfit)}</span></div>
    <div class="summary-line total"><span>${t('profitMargin')}</span><span>${d.profitMarginPercent||0}%</span></div>

    <div class="section-title">${t('salesSummary')}</div>
    <div class="summary-line"><span>${t('sales')}</span><span>${fmtMoney(d.totalSalesAmount)}</span></div>
    <div class="summary-line"><span>${t('numTransactions')}</span><span>${d.numTransactions||0}</span></div>
    <div class="summary-line"><span>${t('avgSaleValue')}</span><span>${fmtMoney(d.avgSaleValue)}</span></div>
    <div class="summary-line"><span>${t('bestSalesDay')}</span><span>${d.bestSalesDay ? d.bestSalesDay.date+' — '+fmtMoney(d.bestSalesDay.amount) : '-'}</span></div>
    <div class="summary-line"><span>${t('lowestSalesDay')}</span><span>${d.lowestSalesDay ? d.lowestSalesDay.date+' — '+fmtMoney(d.lowestSalesDay.amount) : '-'}</span></div>

    <div class="section-title">${t('productPerformance')}</div>
    <div class="bold" style="margin-bottom:6px;">${t('top10Best')}</div>
    <table class="report-table"><thead><tr><th>#</th><th>${t('product')}</th><th>${t('sizeCol')}</th><th class="num">${t('qty')}</th><th class="num">${t('total')}</th></tr></thead>
    <tbody>${(d.top10||[]).map((p, i) => `<tr><td>${i+1}</td><td>${p.itemName}</td><td>${p.size||''}</td><td class="num">${p.qtySold}</td><td class="num">${fmtMoney(p.totalRevenue)}</td></tr>`).join('')}</tbody></table>
    <div class="bold" style="margin:10px 0 6px;">${t('slowMoving')}</div>
    ${(d.slowMoving||[]).length ? `<ul>${d.slowMoving.map((p) => `<li>${p.itemName}</li>`).join('')}</ul>` : `<div class="muted italic">${t('noData')}</div>`}

    <div class="section-title">${t('expenseSummary')}</div>
    <table class="report-table"><tbody>
      ${EXPENSE_CATEGORIES.map((c) => `<tr><td>${t(c.key)}</td><td class="num">${fmtMoney((d.expensesByCategory||{})[c.value]||0)}</td></tr>`).join('')}
      <tr class="bold"><td>${t('total')}</td><td class="num">${fmtMoney(d.totalExpenses)}</td></tr>
    </tbody></table>

    <div class="section-title">${t('collectionsAndDues')}</div>
    <div class="summary-line"><span>${t('totalCollectionsMonth')}</span><span>${fmtMoney(d.totalCollections)}</span></div>
    <div class="summary-line"><span>${t('totalOutstandingDues')}</span><span>${fmtMoney(d.totalDues)}</span></div>

    <div class="section-title">${t('profitAnalysis')}</div>
    <div class="summary-line"><span>${t('cogs')}</span><span>${fmtMoney(d.cogs)}</span></div>
    <div class="summary-line"><span>${t('grossProfit')}</span><span>${fmtMoney(d.grossProfit)}</span></div>
    <div class="summary-line"><span>${t('grossProfitMargin')}</span><span>${d.grossProfitMargin||0}%</span></div>
    <div class="summary-line"><span>${t('operatingExpenses')}</span><span>${fmtMoney(d.operatingExpenses)}</span></div>
    <div class="summary-line"><span>${t('netProfit')}</span><span>${fmtMoney(d.netProfit)}</span></div>
    <div class="summary-line total"><span>${t('netProfitMargin')}</span><span>${d.netProfitMargin||0}%</span></div>

    <div class="chart-wrap no-print"><canvas id="monthlyLineChart" height="180"></canvas></div>
    <div class="chart-wrap no-print"><canvas id="monthlyDoughnutChart" height="180"></canvas></div>
    <div class="chart-wrap no-print"><canvas id="monthlyBarChart" height="220"></canvas></div>

    <button class="btn download-pdf-btn" onclick="window.print()">${icon('download', 'color:#fff;')} ${t('downloadPDF')}</button>
    <div class="print-footer">${t('reportGenerated')} | ${new Date().toLocaleString()}</div>
  `;
}
function loadMonthlyCharts() {
  const d = monthlyState.data || {};
  destroyChart('monthlyLine'); destroyChart('monthlyDoughnut'); destroyChart('monthlyBar');
  const trend = d.dailySalesTrend || [];
  const lineEl = document.getElementById('monthlyLineChart');
  if (lineEl) state.chartInstances.monthlyLine = new Chart(lineEl, {
    type: 'line', data: { labels: trend.map((_, i) => i + 1), datasets: [{ label: t('salesTrend'), data: trend, borderColor: '#2ECC71', backgroundColor: 'rgba(46,204,113,0.1)', fill: true }] }
  });
  const doughEl = document.getElementById('monthlyDoughnutChart');
  if (doughEl) state.chartInstances.monthlyDoughnut = new Chart(doughEl, {
    type: 'doughnut', data: { labels: Object.keys(d.expenseBreakdown||{}), datasets: [{ data: Object.values(d.expenseBreakdown||{}) }] },
    options: { plugins: { legend: { position: 'bottom' } } }
  });
  const barEl = document.getElementById('monthlyBarChart');
  if (barEl) {
    const top10 = (d.top10Products||[]).slice(0, 10);
    state.chartInstances.monthlyBar = new Chart(barEl, {
      type: 'bar', data: { labels: top10.map((p) => p.itemName), datasets: [{ label: t('top10Products'), data: top10.map((p) => p.qtySold||p.totalQty), backgroundColor: '#2ECC71' }] },
      options: { indexAxis: 'y' }
    });
  }
}

/* ------------------------------------------------------------------
   SCREEN: SUBSCRIPTION PAGE
------------------------------------------------------------------- */
let subState = { msg: null };
function renderSubscriptionScreen() {
  const businessName = store.get('businessName') || '';
  return `
    <div class="screen-body">
      ${headerHTML('subscribeTitle')}
      ${messageHTML(subState.msg)}
      <div class="bold" style="margin-bottom:10px;">${t('benefitsTitle')}</div>
      ${['benefit1','benefit2','benefit3','benefit4','benefit5','benefit6'].map((k) => `
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">${icon('check-circle')}<span>${t(k)}</span></div>
      `).join('')}
      <hr class="divider">
      <div class="bold" style="margin-bottom:6px;">${t('paymentTitle')}</div>
      <p class="muted" style="font-size:13px;">${t('paymentInstruction')}</p>
      <div class="card">bKash: 01713 04 84 16</div>
      <div class="card">Nagad: 01713 04 84 16</div>
      <div class="card">Rocket: 01713 04 84 16</div>

      <div class="field"><label>${t('monthLabel')}</label><input id="subMonth" type="text" placeholder="${t('monthPlaceholder')}"></div>
      <div class="field"><label>${t('transactionId')}</label><input id="subTxn" type="text"></div>
      <button class="btn" onclick="submitSubscription()">${icon('check-circle', 'color:#fff;')} ${t('submitPayment')}</button>
      <button class="btn whatsapp" onclick="openWhatsappConfirm()">${whatsappSVG()} ${t('whatsappConfirm')}</button>
      ${footerCreditHTML()}
    </div>`;
}
function whatsappSVG() {
  return `<svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366"><path d="M17.6 6.32A7.85 7.85 0 0 0 12.05 4a7.94 7.94 0 0 0-6.9 11.9L4 20l4.2-1.1a7.9 7.9 0 0 0 3.85 1h.01a7.94 7.94 0 0 0 7.94-7.94 7.9 7.9 0 0 0-2.4-5.64zm-5.55 12.2h-.01a6.6 6.6 0 0 1-3.36-.92l-.24-.14-2.5.65.67-2.43-.16-.25a6.6 6.6 0 1 1 12.26-3.5 6.6 6.6 0 0 1-6.66 6.59zm3.62-4.94c-.2-.1-1.17-.58-1.35-.64-.18-.07-.31-.1-.44.1-.13.2-.5.64-.61.77-.11.13-.23.14-.42.05-.2-.1-.83-.31-1.58-.98-.58-.52-.98-1.16-1.09-1.36-.11-.2-.01-.3.09-.4.09-.1.2-.24.3-.36.1-.12.13-.2.2-.34.07-.13.03-.25-.02-.35-.05-.1-.44-1.06-.6-1.45-.16-.38-.32-.33-.44-.33h-.37c-.13 0-.34.05-.52.24-.18.2-.68.66-.68 1.62 0 .95.7 1.87.8 2 .1.13 1.37 2.1 3.33 2.94.46.2.83.32 1.11.41.47.15.9.13 1.24.08.38-.06 1.17-.48 1.33-.94.16-.46.16-.86.11-.94-.05-.08-.18-.13-.38-.23z"/></svg>`;
}
async function submitSubscription() {
  const month = document.getElementById('subMonth').value.trim();
  const txn = document.getElementById('subTxn').value.trim();
  if (!month || !txn) { subState.msg = { type: 'error', text: t('error') }; return render(); }
  const today = ddmmyyyy(new Date());
  const r = await apiCall('saveSubscriptionRequest', {
    sheetId: state.sheetId, businessName: store.get('businessName'), phone: '',
    month: month, transactionId: txn, submissionDate: today
  });
  subState.msg = { type: r.ok ? 'success' : 'error', text: r.ok ? t('paymentSubmitted') : t('error') };
  render();
}
function openWhatsappConfirm() {
  const businessName = store.get('businessName') || '';
  const month = (document.getElementById('subMonth')||{}).value || '';
  const txn = (document.getElementById('subTxn')||{}).value || '';
  const today = ddmmyyyy(new Date());
  const msg = `Niqesh Subscription Payment%0ABusiness: ${encodeURIComponent(businessName)}%0APhone: %0ASubscription Month: ${encodeURIComponent(month)}%0ATransaction ID: ${encodeURIComponent(txn)}%0ADate: ${today}`;
  window.open(`https://wa.me/8801713048416?text=${msg}`, '_blank');
}

/* ------------------------------------------------------------------
   MAIN RENDER DISPATCH
------------------------------------------------------------------- */
async function render() {
  document.body.classList.toggle('lang-bn', langCode() === 'bn');

  if (!store.get('sheetId')) {
    if (state.route !== 'recovery') state.route = 'setup';
  } else if (sess.get('authenticated') !== 'true') {
    if (state.route !== 'recovery') state.route = 'pin';
  }
  state.sheetId = store.get('sheetId');
  state.businessName = store.get('businessName');

  switch (state.route) {
    case 'setup': document.getElementById('app').innerHTML = renderSetup(); afterRender(); break;
    case 'pin': document.getElementById('app').innerHTML = renderPinEntry(); afterRender(); break;
    case 'recovery': document.getElementById('app').innerHTML = renderRecovery(); afterRender(); break;
    case 'home':
      document.getElementById('app').innerHTML = renderHome(); afterRender();
      loadHomeData();
      break;
    case 'sale': renderSaleScreen(); break;
    case 'session': renderSessionScreen(); break;
    case 'collectionDue': document.getElementById('app').innerHTML = renderCollectionDue(); afterRender(); break;
    case 'expense': document.getElementById('app').innerHTML = renderExpenseScreen(); afterRender(); break;
    case 'dashboard': document.getElementById('app').innerHTML = renderDashboard(); afterRender(); break;
    case 'editAccount': renderEditAccountScreen(); break;
    case 'products': renderProductsScreen(); break;
    case 'dailyReport': renderDailyReportScreen(); break;
    case 'monthlyReport': renderMonthlyReportScreen(); break;
    case 'subscription': document.getElementById('app').innerHTML = renderSubscriptionScreen(); afterRender(); break;
    default:
      document.getElementById('app').innerHTML = renderHome(); afterRender();
      loadHomeData();
  }
}

/* ------------------------------------------------------------------
   INIT
------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.toggle('lang-bn', langCode() === 'bn');
  render();
  if (navigator.onLine) trySyncPending();
});
