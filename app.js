/* =========================================================
   NIKESH (নিকেশ) — APP LOGIC
   by Digiwizr
   ========================================================= */

// -----------------------------------------------------------
// CONFIG
// -----------------------------------------------------------
const BACKEND_URL = "https://script.google.com/macros/s/AKfycbw1FZIU5hWGRwuko1h7GNuLw9WLJQV0UhYCTeaB3Insxes4FdOjXq1UmAcsLZKO7ao9/exec";
const APP_URL = "nikesh.digiwizr.com";
const TRIAL_LENGTH_DAYS = 3;
const SUBSCRIPTION_WHATSAPP_NUMBER = "8801713048416";

// localStorage keys
const LS_SHEET_ID = "digiwizr_sheetId";
const LS_BUSINESS_NAME = "digiwizr_businessName";
const LS_PHONE = "digiwizr_phone";
const LS_ACCESS_PIN_HASH = "digiwizr_accessPinHash";
const LS_RECOVERY_PIN = "digiwizr_recoveryPin";
const LS_PENDING_SYNC = "digiwizr_pendingSync";
const LS_LAST_SYNCED = "digiwizr_lastSynced";
const LS_IOS_BANNER_DISMISSED = "digiwizr_iosBannerDismissed";
const LS_REGISTRATION_DATE = "digiwizr_registrationDate";
const LS_LANGUAGE = "appLanguage";

// sessionStorage keys
const SS_AUTHENTICATED = "digiwizr_authenticated";
const SS_SUBSCRIPTION_STATUS = "digiwizr_subscriptionStatus";

// -----------------------------------------------------------
// STATE
// -----------------------------------------------------------
let selectedProduct = null; // { name, size, cost, price, rowIndex } on the Sale screen
let selectedExpenseCategory = null;
let recoveryReturnScreen = "setup";
let pendingRecovery = null;
let editingProductRowIndex = null;
let allSaleProducts = [];
let allManageProducts = [];
let monthPickerYear = new Date().getFullYear();
let monthPickerSelectedMonth = null;
let chartInstances = {}; // canvasId -> Chart instance, destroyed before re-render

// -----------------------------------------------------------
// DOM SHORTCUTS
// -----------------------------------------------------------
const $ = (id) => document.getElementById(id);

const screens = {
  setup: $("screen-setup"),
  pinEntry: $("screen-pin-entry"),
  recovery: $("screen-recovery"),
  home: $("screen-home"),
  sale: $("screen-sale"),
  expense: $("screen-expense"),
  collectionDue: $("screen-collection-due"),
  products: $("screen-products"),
  dailyReport: $("screen-daily-report"),
  monthlyReport: $("screen-monthly-report"),
  subscription: $("screen-subscription"),
};

const headerScreenTitle = $("headerScreenTitle");
const headerBusinessName = $("headerBusinessName");
const backBtn = $("backBtn");
const offlineBanner = $("offlineBanner");
const syncBadge = $("syncBadge");
const syncBadgeText = $("syncBadgeText");
const lastSyncedText = $("lastSyncedText");
const trialRibbon = $("trialRibbon");

const SCREEN_TITLES = {
  sale: "recordSale",
  expense: "recordExpense",
  collectionDue: "collectionDue",
  products: "manageProducts",
  dailyReport: "dailyReport",
  monthlyReport: "monthlyReport",
  subscription: "subscribeTitle",
};

const BACK_TO_HOME_SCREENS = ["sale", "expense", "collectionDue", "products", "dailyReport", "monthlyReport", "subscription"];

/* =========================================================
   TRANSLATIONS DICTIONARY
   ========================================================= */
const DEFAULT_LANGUAGE = "En-৳";

const translations = {
  // BRANDING
  appName: { en: "Nikesh", bn: "নিকেশ" },
  tagline: { en: "Know Your Numbers. Grow Your Business.", bn: "হিসাব জানুন। ব্যবসা বাড়ান।" },

  // GENERAL
  save: { en: "Save", bn: "সেইভ করুন" },
  cancel: { en: "Cancel", bn: "বাতিল" },
  delete: { en: "Delete", bn: "মুছুন" },
  edit: { en: "Edit", bn: "সম্পাদনা" },
  loading: { en: "Loading...", bn: "লোড হচ্ছে..." },
  error: { en: "Something went wrong. Please try again.", bn: "কিছু একটা ভুল হয়েছে। আবার চেষ্টা করুন।" },
  success: { en: "Saved successfully.", bn: "সফলভাবে সেইভ হয়েছে।" },
  noData: { en: "No entries found.", bn: "কোনো এন্ট্রি পাওয়া যায়নি।" },
  offline: { en: "You are offline — data will sync when connected.", bn: "আপনি অফলাইনে আছেন — সংযুক্ত হলে ডেটা সিঙ্ক হবে।" },
  pendingSync: { en: "entries pending sync", bn: "টি এন্ট্রি সিঙ্ক হওয়ার অপেক্ষায়" },
  syncNow: { en: "Sync Now", bn: "এখনই সিঙ্ক করুন" },
  lastSynced: { en: "Last synced:", bn: "সর্বশেষ সিঙ্ক:" },
  searchProduct: { en: "Search Product", bn: "পণ্য খুঁজুন" },
  confirm: { en: "Confirm", bn: "নিশ্চিত করুন" },

  // SIGNUP PAGE
  welcomeTitle: { en: "Welcome to Nikesh", bn: "নিকেশে স্বাগতম" },
  welcomeSubtitle: { en: "Create your account to get started", bn: "শুরু করতে আপনার অ্যাকাউন্ট তৈরি করুন" },
  businessName: { en: "Business Name", bn: "ব্যবসার নাম" },
  phoneNumber: { en: "Phone Number", bn: "ফোন নম্বর" },
  emailAddress: { en: "Email Address", bn: "ইমেইল ঠিকানা" },
  businessAddress: { en: "Business Address", bn: "ব্যবসার ঠিকানা" },
  createPin: { en: "Create a 4-digit PIN", bn: "৪ সংখ্যার পিন তৈরি করুন" },
  confirmPin: { en: "Confirm PIN", bn: "পিন নিশ্চিত করুন" },
  setupAccount: { en: "Set Up My Account", bn: "অ্যাকাউন্ট তৈরি করুন" },
  alreadyHaveAccount: { en: "Already have an account? Recover it here", bn: "আগে থেকে অ্যাকাউন্ট আছে? এখানে রিকভার করুন" },
  pinMismatch: { en: "PINs do not match. Please try again.", bn: "পিন দুটি মিলছে না। আবার চেষ্টা করুন।" },
  recoveryPinTitle: { en: "Your Recovery PIN is:", bn: "আপনার রিকভারি পিন হলো:" },
  recoveryPinWarning: { en: "Write this down and keep it safe. You will need it to restore access on a new device.", bn: "এটি লিখে নিরাপদে রাখুন। নতুন ডিভাইসে অ্যাকাউন্ট ফিরে পেতে এই পিন লাগবে।" },
  savedMyPin: { en: "I have saved my PIN", bn: "আমি পিনটি সেইভ করেছি" },
  errBusinessName: { en: "Please enter your business name.", bn: "ব্যবসার নাম লিখুন।" },
  errPhone: { en: "Please enter a phone number.", bn: "ফোন নম্বর লিখুন।" },
  errEmail: { en: "Please enter an email address.", bn: "ইমেইল ঠিকানা লিখুন।" },
  errEmailInvalid: { en: "Please enter a valid email address.", bn: "দয়া করে সঠিক ইমেইল ঠিকানা লিখুন।" },
  errPinDigits: { en: "PIN must be exactly 4 digits.", bn: "পিন অবশ্যই ৪-সংখ্যার হতে হবে।" },

  // PIN PAGE
  enterPin: { en: "Enter your 4-digit PIN", bn: "আপনার ৪ সংখ্যার পিন দিন" },
  unlock: { en: "Unlock", bn: "আনলক করুন" },
  incorrectPin: { en: "Incorrect PIN. Please try again.", bn: "পিন সঠিক নয়। আবার চেষ্টা করুন।" },
  forgotPin: { en: "Forgot PIN? Recover account", bn: "পিন ভুলে গেছেন? অ্যাকাউন্ট রিকভার করুন" },

  // RECOVERY PAGE
  recoverAccount: { en: "Recover Account", bn: "অ্যাকাউন্ট রিকভার করুন" },
  enterRecoveryPin: { en: "Enter your 6-digit Recovery PIN", bn: "আপনার ৬ সংখ্যার রিকভারি পিন দিন" },
  recoverButton: { en: "Recover", bn: "রিকভার করুন" },
  recoveryFailed: { en: "Recovery PIN not found. Please check and try again.", bn: "রিকভারি পিন পাওয়া যায়নি। আবার চেষ্টা করুন।" },
  setNewPin: { en: "Set New PIN", bn: "নতুন পিন সেট করুন" },

  // HOMEPAGE
  todaysRevenue: { en: "Today's Revenue", bn: "আজকের আয়" },
  todaysProfit: { en: "Today's Profit", bn: "আজকের লাভ" },
  profitMargin: { en: "Profit Margin (%)", bn: "প্রফিট মার্জিন (%)" },
  recordSale: { en: "Record a Sale", bn: "বিক্রয় যোগ করুন" },
  recordExpense: { en: "Record an Expense", bn: "খরচ যোগ করুন" },
  collectionDue: { en: "Collection / Due", bn: "বকেয়া / আদায়" },
  manageProducts: { en: "Manage Products", bn: "পণ্যের তালিকা" },
  dailyReport: { en: "Daily Report", bn: "দৈনিক রিপোর্ট" },
  monthlyReport: { en: "Monthly Report", bn: "মাসিক রিপোর্ট" },
  recentEntries: { en: "Recent Entries", bn: "সাম্প্রতিক এন্ট্রি" },

  // MANAGE PRODUCTS PAGE
  productName: { en: "Product Name", bn: "পণ্যের নাম" },
  size: { en: "Size", bn: "আকার / পরিমাণ" },
  costPrice: { en: "Cost Price (per unit)", bn: "ক্রয়মূল্য (প্রতি একক)" },
  price: { en: "Price (per unit)", bn: "বিক্রয়মূল্য (প্রতি একক)" },
  addProduct: { en: "Add Product", bn: "পণ্য যোগ করুন" },
  updateProduct: { en: "Update Product", bn: "পণ্য আপডেট করুন" },
  currentProducts: { en: "Current Products", bn: "বর্তমান পণ্যসমূহ" },
  confirmDeleteProduct: { en: "Delete this product?", bn: "এই পণ্যটি মুছে ফেলবেন?" },

  // RECORD A SALE PAGE
  selectProduct: { en: "Select a Product", bn: "পণ্য নির্বাচন করুন" },
  quantity: { en: "Quantity", bn: "পরিমাণ / সংখ্যা" },
  discount: { en: "Discount (flat amount)", bn: "ছাড় / মূল্যহ্রাস" },
  notes: { en: "Notes (optional)", bn: "মন্তব্য (ঐচ্ছিক)" },
  saveSale: { en: "Save Sale", bn: "বিক্রয় সেইভ করুন" },
  saleRecorded: { en: "Sale recorded!", bn: "বিক্রয় সেইভ হয়েছে!" },

  // RECORD AN EXPENSE PAGE
  selectCategory: { en: "Select Category:", bn: "ক্যাটাগরি নির্বাচন করুন:" },
  catRent: { en: "Rent", bn: "ভাড়া" },
  catSalary: { en: "Salary", bn: "বেতন" },
  catUtility: { en: "Utility Bills", bn: "ইউটিলিটি বিল" },
  catTransport: { en: "Transportation", bn: "যাতায়াত" },
  catRefreshments: { en: "Refreshments", bn: "নাস্তা" },
  catDealerPayoff: { en: "Dealer Payoff", bn: "ডিলার" },
  catMarketing: { en: "Marketing", bn: "মার্কেটিং" },
  catMiscellaneous: { en: "Miscellaneous", bn: "অন্যান্য" },
  description: { en: "Description", bn: "খরচের বিবরণ" },
  amount: { en: "Amount", bn: "টাকার পরিমাণ" },
  saveExpense: { en: "Save Expense", bn: "খরচ সেইভ করুন" },
  expenseRecorded: { en: "Expense recorded!", bn: "খরচ সেইভ হয়েছে!" },
  errSelectCategory: { en: "Please select a category.", bn: "একটি ক্যাটাগরি নির্বাচন করুন।" },

  // COLLECTION / DUE PAGE
  sectionRecordCollection: { en: "Record a Collection", bn: "আদায় লিপিবদ্ধ করুন" },
  sectionRecordDue: { en: "Record a Due", bn: "বাকি লিপিবদ্ধ করুন" },
  collectionDescription: { en: "Description (optional)", bn: "গ্রাহকের নাম / আদায়ের বিবরণ" },
  collectionAmount: { en: "Amount Collected", bn: "আদায়ের পরিমাণ" },
  outstandingDue: { en: "Outstanding Due", bn: "বাকি-বকেয়া" },
  outstandingDueDesc: { en: "Customer Name / Description", bn: "গ্রাহকের নাম / বিবরণ" },
  saveCollectionDue: { en: "Save Collection", bn: "আদায় সংরক্ষণ করুন" },
  saveDue: { en: "Save Due", bn: "বাকি সংরক্ষণ করুন" },
  collectionRecorded: { en: "Collection recorded!", bn: "আদায় সংরক্ষণ হয়েছে!" },
  dueRecorded: { en: "Due recorded!", bn: "বাকি সংরক্ষণ হয়েছে!" },

  // DAILY REPORT PAGE
  reportDate: { en: "Report Date", bn: "রিপোর্টের তারিখ" },
  sales: { en: "Sales", bn: "বিক্রয়" },
  product: { en: "Product", bn: "আইটেম" },
  sizeCol: { en: "Size", bn: "পরিমাণ" },
  qty: { en: "Qty", bn: "সংখ্যা" },
  unitPrice: { en: "Unit Price", bn: "একক মূল্য" },
  totalDiscount: { en: "Total Discount", bn: "সর্বমোট মূল্যহ্রাস" },
  total: { en: "Total", bn: "সর্বমোট" },
  totalSales: { en: "Total Sales", bn: "সর্বমোট বিক্রয় মূল্য" },
  totalCollections: { en: "Total Collections", bn: "সর্বমোট আদায়" },
  outstandingDues: { en: "Outstanding Dues", bn: "বকেয়া পাওনা" },
  totalExpenses: { en: "Total Expenses", bn: "সর্বমোট ব্যয়" },
  dailySummary: { en: "Daily Summary", bn: "দিনের হিসাব সারসংক্ষেপ" },
  totalCashIn: { en: "Total Cash In", bn: "সর্বমোট নগদ প্রাপ্তি" },
  cogs: { en: "Cost of Goods Sold", bn: "বিক্রিত পণ্যের মোট ক্রয়মূল্য" },
  grossProfit: { en: "Gross Profit", bn: "মোট মুনাফা" },
  reportGenerated: { en: "Report generated by Nikesh — nikesh.digiwizr.com", bn: "Nikesh কর্তৃক প্রস্তুত রিপোর্ট — nikesh.digiwizr.com" },
  downloadPDF: { en: "Download PDF Report", bn: "পিডিএফ রিপোর্ট ডাউনলোড করুন" },

  // MONTHLY REPORT PAGE
  selectMonth: { en: "Select Month", bn: "মাস নির্বাচন করুন" },
  executiveSummary: { en: "Executive Summary", bn: "নির্বাহী সারসংক্ষেপ" },
  salesSummary: { en: "Sales Summary", bn: "বিক্রয় সারসংক্ষেপ" },
  numTransactions: { en: "Number of Transactions", bn: "বিক্রয় লেনদেনের সংখ্যা" },
  avgSaleValue: { en: "Average Sale Value", bn: "গড় বিক্রয় মূল্য" },
  bestSalesDay: { en: "Best Sales Day", bn: "সর্বাধিক বিক্রির দিন" },
  lowestSalesDay: { en: "Lowest Sales Day", bn: "সর্বনিম্ন বিক্রির দিন" },
  productPerformance: { en: "Product Performance", bn: "পণ্যের কাটতি" },
  top10Products: { en: "Top 10 Best-Selling Products", bn: "শীর্ষ ১০টি সর্বাধিক বিক্রিত পণ্য" },
  slowMoving: { en: "Slow-Moving Products", bn: "ধীরগতিতে বিক্রীত পণ্য" },
  expenseSummary: { en: "Expense Summary", bn: "ব্যয়ের সারসংক্ষেপ" },
  collectionsAndDues: { en: "Collections & Outstanding Dues", bn: "আদায় ও বাকি" },
  totalCollectionsMonth: { en: "Total Collections Received", bn: "মোট প্রাপ্ত আদায়" },
  totalOutstandingDues: { en: "Total Outstanding Dues", bn: "মোট বকেয়া পাওনা" },
  profitAnalysis: { en: "Profit Analysis", bn: "লাভের বিশ্লেষণ" },
  operatingExpenses: { en: "Operating Expenses", bn: "পরিচালন ব্যয়" },
  netProfit: { en: "Net Profit", bn: "নিট লাভ" },
  netProfitMargin: { en: "Net Profit Margin (%)", bn: "নিট লাভের শতকরা হার" },
  grossProfitMargin: { en: "Gross Profit Margin (%)", bn: "মোট লাভের শতকরা হার" },
  chartsGraphs: { en: "Charts & Graphs", bn: "চার্ট ও গ্রাফ" },
  salesTrend: { en: "Daily Sales Trend", bn: "মাসিক বিক্রয়ের ট্রেন্ড" },
  expenseBreakdown: { en: "Expense Breakdown", bn: "খরচের বিবরণী" },
  top10Chart: { en: "Top 10 Products", bn: "শীর্ষ ১০টি বিক্রিত পণ্য" },

  // SUBSCRIPTION PAGE
  subscribeTitle: { en: "Subscribe to Nikesh", bn: "নিকেশ সাবস্ক্রাইব করুন" },
  benefitsTitle: { en: "Monthly subscribers will receive:", bn: "মাসিক সাবস্ক্রাইব করা মেম্বারগণ যা পাবেন:" },
  benefit1: { en: "One month app subscription", bn: "অ্যাপটির এক মাসের সাবস্ক্রিপশন" },
  benefit2: { en: "Full training and customer support", bn: "পূর্ণাঙ্গ প্রশিক্ষণ ও কাস্টমার সাপোর্ট" },
  benefit3: { en: "Products enlistment support", bn: "পণ্য তালিকাভুক্তকরণে সহায়তা" },
  benefit4: { en: "Daily business report", bn: "দৈনিক ব্যবসায়িক প্রতিবেদন" },
  benefit5: { en: "Monthly business report", bn: "মাসিক ব্যবসায়িক প্রতিবেদন" },
  benefit6: { en: "Printed hardcopy report file", bn: "প্রিন্টেড/হার্ডকপি প্রতিবেদন ফাইল" },
  paymentTitle: { en: "Make Payment", bn: "পেমেন্ট করুন" },
  paymentInstruction: { en: "Send payment to any of the following numbers:", bn: "নিচের যেকোনো নম্বরে পেমেন্ট পাঠান:" },
  transactionId: { en: "Transaction ID", bn: "ট্রানজেকশন আইডি" },
  submitPayment: { en: "Submit Payment Details", bn: "পেমেন্টের তথ্য জমা দিন" },
  whatsappConfirm: { en: "Send payment confirmation on WhatsApp", bn: "WhatsApp এ পেমেন্ট কনফার্মেশন জানান" },
  paymentSubmitted: { en: "Payment details submitted. We will verify and activate your account within 24 hours.", bn: "পেমেন্টের তথ্য জমা হয়েছে। আমরা ২৪ ঘণ্টার মধ্যে যাচাই করে আপনার অ্যাকাউন্ট সক্রিয় করব।" },
  errTransactionId: { en: "Please enter your Transaction ID.", bn: "আপনার ট্রানজেকশন আইডি লিখুন।" },

  // TRIAL RIBBON
  trialDay1: { en: "Subscribe — Day 1 of 3-day trial", bn: "সাবস্ক্রাইব — ৩-দিন ট্রায়াল পিরিয়ডের ১ম দিন" },
  trialDay2: { en: "Subscribe — Day 2 of 3-day trial", bn: "সাবস্ক্রাইব — ৩-দিন ট্রায়াল পিরিয়ডের ২য় দিন" },
  trialDay3: { en: "Subscribe — Last day of 3-day trial", bn: "সাবস্ক্রাইব — ৩-দিন ট্রায়াল পিরিয়ডের শেষ দিন" },
  trialExpired: { en: "Trial expired. Please subscribe to continue.", bn: "ট্রায়াল শেষ হয়েছে। চালিয়ে যেতে সাবস্ক্রাইব করুন।" },

  // RECENT ENTRIES
  sale: { en: "SALE", bn: "বিক্রয়" },
  expense: { en: "EXPENSE", bn: "খরচ" },
  collection: { en: "COLLECTION", bn: "আদায়" },
  due: { en: "DUE", bn: "বাকি" },
  deleteEntryConfirm: { en: "Delete entry?", bn: "এন্ট্রিটি মুছে ফেলবেন?" },
};

function getCurrentLanguage() {
  return localStorage.getItem(LS_LANGUAGE) || DEFAULT_LANGUAGE;
}

function getCurrency() {
  return getCurrentLanguage() === "En-$" ? "$" : "৳";
}

function t(key) {
  const entry = translations[key];
  if (!entry) {
    console.warn("Missing translation key:", key);
    return key;
  }
  return getCurrentLanguage() === "Bn-৳" ? entry.bn : entry.en;
}

function applyStaticTranslations() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.getAttribute("data-i18n"));
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    el.setAttribute("placeholder", t(el.getAttribute("data-i18n-placeholder")));
  });
}

function applyLanguageDisplay() {
  const lang = getCurrentLanguage();
  document.body.classList.toggle("lang-bn", lang === "Bn-৳");
  document.querySelectorAll(".language-select").forEach((select) => { select.value = lang; });
  applyStaticTranslations();
  updateTrialRibbonText();
  safeCreateIcons();
}

function refreshCurrentScreenDynamicContent() {
  const activeKey = Object.keys(screens).find((key) => screens[key].classList.contains("active"));

  if (activeKey === "home") {
    loadDailySummary();
    loadRecentEntries();
    refreshSyncBadge();
    updateLastSyncedText();
  } else if (activeKey === "sale") {
    loadProductsForSale();
  } else if (activeKey === "products") {
    loadProductsForManage();
  } else if (activeKey === "dailyReport") {
    const dateInput = $("reportDateInput");
    if (dateInput && dateInput.value) loadDailyReport(dateInput.value);
  } else if (activeKey === "monthlyReport") {
    if (monthPickerSelectedMonth) loadMonthlyReport(monthPickerSelectedMonth, monthPickerYear);
  }

  updateOfflineBanner();
}

function handleLanguageChange(newLang) {
  localStorage.setItem(LS_LANGUAGE, newLang);
  applyLanguageDisplay();
  refreshCurrentScreenDynamicContent();
}

function initLanguageSwitcher() {
  applyLanguageDisplay();
  document.querySelectorAll(".language-select").forEach((select) => {
    select.addEventListener("change", (e) => handleLanguageChange(e.target.value));
  });
}

function updateLanguageSwitcherVisibility(activeScreenName) {
  const shouldShow = ["setup", "pinEntry", "home"].includes(activeScreenName);
  document.querySelectorAll(".language-select-wrap").forEach((wrap) => {
    wrap.style.display = shouldShow ? "block" : "none";
  });
}

/**
 * Wraps lucide.createIcons() defensively — the CDN script may not be
 * loaded yet (e.g. slow connection) when this first runs.
 */
function safeCreateIcons() {
  if (window.lucide && typeof window.lucide.createIcons === "function") {
    window.lucide.createIcons();
  }
}

/* =========================================================
   NAVIGATION
   ========================================================= */
function showScreen(name) {
  Object.entries(screens).forEach(([key, el]) => {
    el.classList.toggle("active", key === name);
  });

  const isSubScreen = BACK_TO_HOME_SCREENS.includes(name);
  backBtn.style.display = isSubScreen ? "inline-flex" : "none";

  if (SCREEN_TITLES[name]) {
    headerScreenTitle.textContent = t(SCREEN_TITLES[name]);
    headerScreenTitle.style.display = "block";
  } else {
    headerScreenTitle.style.display = "none";
  }

  if (name === "sale") loadProductsForSale();
  if (name === "products") loadProductsForManage();
  if (name === "home") loadHomeData();
  if (name === "dailyReport") initDailyReportScreen();
  if (name === "monthlyReport") initMonthlyReportScreen();

  updateLanguageSwitcherVisibility(name);
  updateTrialRibbonVisibility(name);
  safeCreateIcons();
}

backBtn.addEventListener("click", () => showScreen("home"));

function applyBusinessNameToHeader(name) {
  headerBusinessName.textContent = name;
  headerBusinessName.style.display = "block";
}

/* =========================================================
   BACKEND COMMUNICATION
   ========================================================= */
async function callBackend(action, params) {
  if (!BACKEND_URL) {
    throw new Error("Backend URL is not configured yet.");
  }
  const payload = Object.assign({}, params, { action });
  const response = await fetch(BACKEND_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error("Network response was not ok (" + response.status + ")");
  const data = await response.json();
  if (!data.success) throw new Error(data.error || "Unknown backend error");
  return data;
}

/* =========================================================
   MESSAGE / NUMBER HELPERS
   ========================================================= */
function showMessage(el, text, type) {
  el.textContent = text;
  el.className = "message visible " + type;
}

function clearMessage(el) {
  el.textContent = "";
  el.className = "message";
}

function simpleHash(str) {
  let hash = 0;
  const s = String(str);
  for (let i = 0; i < s.length; i++) hash = (hash * 31 + s.charCodeAt(i)) >>> 0;
  return hash.toString(16);
}

function safeFloat(value) {
  const n = parseFloat(value);
  return isNaN(n) || !isFinite(n) ? 0 : n;
}

function roundTo2Display(n) {
  return Math.round(safeFloat(n) * 100) / 100;
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = String(str);
  return div.innerHTML;
}

function formatDateTimeDisplay(date) {
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = date.getFullYear();
  const hh = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");
  return `${dd}/${mm}/${yyyy} ${hh}:${min}`;
}

function markSynced() {
  localStorage.setItem(LS_LAST_SYNCED, new Date().toISOString());
  updateLastSyncedText();
}

function updateLastSyncedText() {
  const iso = localStorage.getItem(LS_LAST_SYNCED);
  if (!iso) {
    lastSyncedText.textContent = t("lastSynced") + " " + (getCurrentLanguage() === "Bn-৳" ? "কখনো না" : "Never");
    return;
  }
  lastSyncedText.textContent = t("lastSynced") + " " + formatDateTimeDisplay(new Date(iso));
}

/* =========================================================
   TRIAL PERIOD LOGIC
   ========================================================= */
function getDaysElapsedSinceRegistration() {
  const iso = localStorage.getItem(LS_REGISTRATION_DATE);
  if (!iso) return 0;
  const regDate = new Date(iso);
  const today = new Date();
  const regMidnight = new Date(regDate.getFullYear(), regDate.getMonth(), regDate.getDate());
  const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const diffMs = todayMidnight - regMidnight;
  return Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
}

async function refreshSubscriptionStatus() {
  const cached = sessionStorage.getItem(SS_SUBSCRIPTION_STATUS);
  if (cached) return cached;

  const sheetId = localStorage.getItem(LS_SHEET_ID);
  try {
    const data = await callBackend("checkStatus", { sheetId });
    const status = data.status || "Trial";
    sessionStorage.setItem(SS_SUBSCRIPTION_STATUS, status);
    return status;
  } catch (err) {
    return "Trial"; // fail safe: don't lock out a paying user just because the status check failed
  }
}

function getTrialRibbonKey(daysElapsed, status) {
  if (status === "Active") return null;
  if (daysElapsed >= TRIAL_LENGTH_DAYS) return "trialExpired";
  if (daysElapsed === 0) return "trialDay1";
  if (daysElapsed === 1) return "trialDay2";
  return "trialDay3";
}

function isTrialExpired(daysElapsed, status) {
  return daysElapsed >= TRIAL_LENGTH_DAYS && status !== "Active";
}

let currentTrialRibbonKey = null;

async function updateTrialState() {
  const daysElapsed = getDaysElapsedSinceRegistration();
  const status = await refreshSubscriptionStatus();
  currentTrialRibbonKey = getTrialRibbonKey(daysElapsed, status);
  lockActionCardsIfExpired(isTrialExpired(daysElapsed, status));
  updateTrialRibbonVisibility(Object.keys(screens).find((key) => screens[key].classList.contains("active")));
  updateTrialRibbonText();
}

function updateTrialRibbonText() {
  if (!currentTrialRibbonKey) return;
  $("trialRibbonText").textContent = t(currentTrialRibbonKey);
}

function updateTrialRibbonVisibility(activeScreenName) {
  // Never show the ribbon on pre-auth screens
  const preAuthScreens = ["setup", "pinEntry", "recovery"];
  if (!currentTrialRibbonKey || preAuthScreens.includes(activeScreenName)) {
    trialRibbon.style.display = "none";
    return;
  }
  trialRibbon.style.display = "flex";
  updateTrialRibbonText();
  safeCreateIcons();
}

trialRibbon.addEventListener("click", () => showScreen("subscription"));

function lockActionCardsIfExpired(expired) {
  const lockedCardIds = ["cardSale", "cardExpense", "cardCollectionDue"];
  lockedCardIds.forEach((id) => {
    const card = $(id);
    card.classList.toggle("trial-locked", expired);
    const overlay = card.querySelector(".lock-overlay");
    if (overlay) overlay.style.display = expired ? "flex" : "none";
  });
}

function isActionCardLocked(cardId) {
  return $(cardId).classList.contains("trial-locked");
}

function showTrialExpiredModal() {
  $("trialExpiredModal").style.display = "flex";
  safeCreateIcons();
}

$("trialExpiredModalCloseBtn").addEventListener("click", () => {
  $("trialExpiredModal").style.display = "none";
  showScreen("subscription");
});

/* =========================================================
   SCREEN 1 — SETUP
   ========================================================= */
$("setupBtn").addEventListener("click", handleSetup);
$("goToRecoveryFromSetup").addEventListener("click", () => showRecoveryScreen("setup"));

async function handleSetup() {
  const msgEl = $("setupMessage");
  clearMessage(msgEl);

  const businessName = $("businessNameInput").value.trim();
  const phone = $("phoneInput").value.trim();
  const email = $("emailInput").value.trim();
  const address = $("addressInput").value.trim();
  const pin = $("setupPinInput").value.trim();
  const pinConfirm = $("setupPinConfirmInput").value.trim();

  if (!businessName) return showMessage(msgEl, t("errBusinessName"), "error");
  if (!phone) return showMessage(msgEl, t("errPhone"), "error");
  if (!email) return showMessage(msgEl, t("errEmail"), "error");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return showMessage(msgEl, t("errEmailInvalid"), "error");
  if (!/^\d{4}$/.test(pin)) return showMessage(msgEl, t("errPinDigits"), "error");
  if (pin !== pinConfirm) return showMessage(msgEl, t("pinMismatch"), "error");

  setSetupLoading(true);

  try {
    const data = await callBackend("setupClient", { businessName, phone, email, address });

    localStorage.setItem(LS_SHEET_ID, data.sheetId);
    localStorage.setItem(LS_BUSINESS_NAME, businessName);
    localStorage.setItem(LS_PHONE, phone);
    localStorage.setItem(LS_ACCESS_PIN_HASH, simpleHash(pin));
    localStorage.setItem(LS_RECOVERY_PIN, data.recoveryPIN);
    localStorage.setItem(LS_REGISTRATION_DATE, new Date().toISOString());

    showSetupCompleteModal(data.recoveryPIN, businessName);
  } catch (err) {
    showMessage(msgEl, t("error") + " (" + err.message + ")", "error");
  } finally {
    setSetupLoading(false);
  }
}

function setSetupLoading(isLoading) {
  $("setupBtn").disabled = isLoading;
  $("setupSpinner").style.display = isLoading ? "flex" : "none";
}

function showSetupCompleteModal(recoveryPIN, businessName) {
  $("modalRecoveryPin").textContent = recoveryPIN;
  $("setupCompleteModal").style.display = "flex";

  $("modalConfirmBtn").onclick = async () => {
    $("setupCompleteModal").style.display = "none";
    applyBusinessNameToHeader(businessName);
    sessionStorage.setItem(SS_AUTHENTICATED, "true");
    await updateTrialState();
    showScreen("home");
  };
}

/* =========================================================
   SCREEN 2 — PIN ENTRY
   ========================================================= */
$("unlockBtn").addEventListener("click", handleUnlock);
$("goToRecoveryFromPin").addEventListener("click", () => showRecoveryScreen("pinEntry"));

$("accessPinInput").addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleUnlock();
});

async function handleUnlock() {
  const msgEl = $("pinEntryMessage");
  clearMessage(msgEl);

  const pinInput = $("accessPinInput");
  const entered = pinInput.value.trim();
  const storedHash = localStorage.getItem(LS_ACCESS_PIN_HASH);

  if (simpleHash(entered) === storedHash) {
    sessionStorage.setItem(SS_AUTHENTICATED, "true");
    pinInput.value = "";
    const businessName = localStorage.getItem(LS_BUSINESS_NAME) || "";
    applyBusinessNameToHeader(businessName);
    await updateTrialState();
    showScreen("home");
  } else {
    showMessage(msgEl, t("incorrectPin"), "error");
    pinInput.value = "";
    pinInput.focus();
  }
}

/* =========================================================
   SCREEN 3 — RECOVERY
   ========================================================= */
$("recoveryBackLink").addEventListener("click", () => showScreen(recoveryReturnScreen));
$("recoverAccountBtn").addEventListener("click", handleRecoverAccount);
$("setNewPinBtn").addEventListener("click", handleSetNewPin);

function showRecoveryScreen(returnScreen) {
  recoveryReturnScreen = returnScreen;
  pendingRecovery = null;

  $("recoveryPinInput").value = "";
  $("newPinInput").value = "";
  $("newPinConfirmInput").value = "";
  clearMessage($("recoveryMessage"));
  clearMessage($("recoveryStep2Message"));

  $("recoveryStep1").style.display = "block";
  $("recoveryStep2").style.display = "none";

  showScreen("recovery");
}

async function handleRecoverAccount() {
  const msgEl = $("recoveryMessage");
  clearMessage(msgEl);

  const recoveryPIN = $("recoveryPinInput").value.trim();
  if (!/^\d{6}$/.test(recoveryPIN)) {
    showMessage(msgEl, t("recoveryFailed"), "error");
    return;
  }

  const btn = $("recoverAccountBtn");
  btn.disabled = true;

  try {
    const data = await callBackend("recoverAccount", { recoveryPIN });
    pendingRecovery = { sheetId: data.sheetId, businessName: data.businessName, recoveryPIN: recoveryPIN };
    $("recoveryStep1").style.display = "none";
    $("recoveryStep2").style.display = "block";
  } catch (err) {
    showMessage(msgEl, t("recoveryFailed"), "error");
  } finally {
    btn.disabled = false;
  }
}

async function handleSetNewPin() {
  const msgEl = $("recoveryStep2Message");
  clearMessage(msgEl);

  const newPin = $("newPinInput").value.trim();
  const newPinConfirm = $("newPinConfirmInput").value.trim();

  if (!pendingRecovery) return showMessage(msgEl, t("error"), "error");
  if (!/^\d{4}$/.test(newPin)) return showMessage(msgEl, t("errPinDigits"), "error");
  if (newPin !== newPinConfirm) return showMessage(msgEl, t("pinMismatch"), "error");

  localStorage.setItem(LS_SHEET_ID, pendingRecovery.sheetId);
  localStorage.setItem(LS_BUSINESS_NAME, pendingRecovery.businessName);
  localStorage.setItem(LS_ACCESS_PIN_HASH, simpleHash(newPin));
  localStorage.setItem(LS_RECOVERY_PIN, pendingRecovery.recoveryPIN);
  // Recovered accounts didn't set a registrationDate on this device — treat as
  // already past trial (0-day trial) rather than granting a fresh 3-day trial.
  if (!localStorage.getItem(LS_REGISTRATION_DATE)) {
    localStorage.setItem(LS_REGISTRATION_DATE, new Date(0).toISOString());
  }

  sessionStorage.setItem(SS_AUTHENTICATED, "true");
  applyBusinessNameToHeader(pendingRecovery.businessName);

  pendingRecovery = null;
  await updateTrialState();
  showScreen("home");
}

/* =========================================================
   SCREEN 4 — HOME
   ========================================================= */
function handleActionCardClick(cardId, targetScreen) {
  if (isActionCardLocked(cardId)) {
    showTrialExpiredModal();
    return;
  }
  showScreen(targetScreen);
}

$("cardSale").addEventListener("click", () => handleActionCardClick("cardSale", "sale"));
$("cardExpense").addEventListener("click", () => handleActionCardClick("cardExpense", "expense"));
$("cardCollectionDue").addEventListener("click", () => handleActionCardClick("cardCollectionDue", "collectionDue"));
$("manageProductsLink").addEventListener("click", () => showScreen("products"));
$("dailyReportLink").addEventListener("click", () => showScreen("dailyReport"));
$("monthlyReportLink").addEventListener("click", () => showScreen("monthlyReport"));
$("syncNowBtn").addEventListener("click", () => syncPendingEntries());

[$("cardSale"), $("cardExpense"), $("cardCollectionDue")].forEach((card) => {
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      card.click();
    }
  });
});

function loadHomeData() {
  clearMessage($("homeMessage"));
  refreshSyncBadge();
  updateLastSyncedText();
  loadDailySummary();
  loadRecentEntries();
  if (navigator.onLine) syncPendingEntries();
}

async function loadDailySummary() {
  const revenueEl = $("statRevenueValue");
  const profitEl = $("statProfitValue");
  const profitMarginEl = $("statProfitMarginValue");

  [revenueEl, profitEl, profitMarginEl].forEach((el) => {
    el.classList.add("shimmer");
    el.classList.remove("positive", "negative");
    el.textContent = "\u00A0";
  });

  const sheetId = localStorage.getItem(LS_SHEET_ID);

  try {
    const data = await callBackend("getDailySummary", { sheetId });

    const revenue = safeFloat(data.revenue);
    const profit = safeFloat(data.profit);
    const profitMargin = safeFloat(data.profitMargin);

    revenueEl.textContent = getCurrency() + revenue;

    profitEl.textContent = getCurrency() + profit;
    profitEl.classList.add(profit < 0 ? "negative" : "positive");

    profitMarginEl.textContent = profitMargin.toFixed(1) + "%";
    profitMarginEl.classList.add(profitMargin < 0 ? "negative" : "positive");
  } catch (err) {
    revenueEl.textContent = "—";
    profitEl.textContent = "—";
    profitMarginEl.textContent = "—";
  } finally {
    [revenueEl, profitEl, profitMarginEl].forEach((el) => el.classList.remove("shimmer"));
  }
}

async function loadRecentEntries() {
  const loadingEl = $("recentEntriesLoading");
  const listEl = $("recentEntriesList");

  listEl.innerHTML = "";
  loadingEl.style.display = "flex";

  const sheetId = localStorage.getItem(LS_SHEET_ID);

  try {
    const data = await callBackend("getRecentEntries", { sheetId });
    renderRecentEntries(data.entries || []);
  } catch (err) {
    listEl.innerHTML = `<div class="empty-state">${t("error")}</div>`;
  } finally {
    loadingEl.style.display = "none";
  }
}

function getTabBadgeInfo(tab) {
  if (tab === "Sales") return { label: t("sale"), className: "sale" };
  if (tab === "Expenses") return { label: t("expense"), className: "expense" };
  if (tab === "Collections") return { label: t("collection"), className: "collection" };
  if (tab === "Dues") return { label: t("due"), className: "due" };
  return { label: tab, className: "" };
}

function renderRecentEntries(entries) {
  const listEl = $("recentEntriesList");
  listEl.innerHTML = "";

  if (entries.length === 0) {
    listEl.innerHTML = `<div class="empty-state">${t("noData")}</div>`;
    return;
  }

  entries.forEach((entry) => {
    const badgeInfo = getTabBadgeInfo(entry.tab);
    const valueText = entry.tab === "Sales" ? t("qty") + ": " + entry.value : getCurrency() + entry.value;

    const card = document.createElement("div");
    card.className = "entry-card";

    const badge = document.createElement("span");
    badge.className = "entry-badge " + badgeInfo.className;
    badge.textContent = badgeInfo.label;
    card.appendChild(badge);

    const details = document.createElement("div");
    details.className = "entry-details";

    const desc = document.createElement("div");
    desc.className = "entry-desc";
    desc.textContent = entry.label || "(no description)";
    details.appendChild(desc);

    const meta = document.createElement("div");
    meta.className = "entry-meta";
    meta.textContent = entry.date + " • " + valueText;
    details.appendChild(meta);

    card.appendChild(details);

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "entry-delete-btn";
    deleteBtn.innerHTML = '<i data-lucide="trash-2"></i>';
    deleteBtn.addEventListener("click", () => handleDeleteEntry(entry.tab, entry.rowIndex));
    card.appendChild(deleteBtn);

    listEl.appendChild(card);
  });

  safeCreateIcons();
}

async function handleDeleteEntry(tab, rowIndex) {
  const confirmed = window.confirm(t("deleteEntryConfirm"));
  if (!confirmed) return;

  const msgEl = $("homeMessage");
  clearMessage(msgEl);
  const sheetId = localStorage.getItem(LS_SHEET_ID);

  try {
    await callBackend("deleteEntry", { sheetId, tabName: tab, rowIndex });
    showMessage(msgEl, t("success"), "success");
    loadRecentEntries();
    loadDailySummary();
  } catch (err) {
    showMessage(msgEl, t("error") + " (" + err.message + ")", "error");
  }
}

/* =========================================================
   SCREEN 5 — RECORD A SALE
   ========================================================= */
function normalizeProduct(product) {
  if (typeof product === "string") {
    return { name: product, size: "", cost: 0, price: 0, rowIndex: null };
  }
  return {
    name: product.name || product.itemName || "",
    size: product.size || "",
    cost: safeFloat(product.cost),
    price: safeFloat(product.price),
    rowIndex: product.rowIndex !== undefined ? product.rowIndex : null,
  };
}

function buildProductMetaText(product) {
  const parts = [];
  if (product.size) parts.push(product.size);
  parts.push(t("costPrice").split(" (")[0] + ": " + getCurrency() + product.cost);
  parts.push(t("price").split(" (")[0] + ": " + getCurrency() + product.price);
  return " | " + parts.join(" | ");
}

function sortProductsAlphabetically(products) {
  return products.slice().sort((a, b) => {
    const nameA = normalizeProduct(a).name.toLowerCase();
    const nameB = normalizeProduct(b).name.toLowerCase();
    return nameA.localeCompare(nameB);
  });
}

async function loadProductsForSale() {
  const listEl = $("saleProductList");
  const loadingEl = $("saleLoading");
  const formEl = $("saleFormFields");
  const msgEl = $("saleMessage");

  clearMessage(msgEl);
  selectedProduct = null;
  listEl.innerHTML = "";
  formEl.style.display = "none";
  loadingEl.style.display = "flex";
  $("saleProductSearchInput").value = "";

  const sheetId = localStorage.getItem(LS_SHEET_ID);

  try {
    const data = await callBackend("getProducts", { sheetId });
    allSaleProducts = sortProductsAlphabetically(data.products || []);
    renderProductList(allSaleProducts);
    formEl.style.display = "block";
  } catch (err) {
    showMessage(msgEl, t("error") + " (" + err.message + ")", "error");
  } finally {
    loadingEl.style.display = "none";
  }
}

function filterSaleProducts() {
  const query = $("saleProductSearchInput").value.trim().toLowerCase();
  if (!query) return renderProductList(allSaleProducts);
  const filtered = allSaleProducts.filter((p) => normalizeProduct(p).name.toLowerCase().includes(query));
  renderProductList(filtered);
}
$("saleProductSearchInput").addEventListener("input", filterSaleProducts);

function renderProductList(products) {
  const listEl = $("saleProductList");
  listEl.innerHTML = "";

  if (products.length === 0) {
    listEl.innerHTML = `<div class="empty-state">${t("noData")}</div>`;
    return;
  }

  products.forEach((rawProduct) => {
    const product = normalizeProduct(rawProduct);
    const card = document.createElement("div");
    card.className = "product-card";
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");

    const nameEl = document.createElement("span");
    nameEl.className = "product-card-name";
    nameEl.textContent = product.name;
    card.appendChild(nameEl);

    const metaEl = document.createElement("span");
    metaEl.className = "product-card-meta";
    metaEl.textContent = buildProductMetaText(product);
    card.appendChild(metaEl);

    card.addEventListener("click", () => selectProduct(product, card));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); selectProduct(product, card); }
    });

    listEl.appendChild(card);
  });
}

function selectProduct(product, cardEl) {
  selectedProduct = product;
  document.querySelectorAll("#saleProductList .product-card").forEach((c) => c.classList.remove("selected"));
  cardEl.classList.add("selected");
}

$("saveSaleBtn").addEventListener("click", handleSaveSale);

async function handleSaveSale() {
  const msgEl = $("saleMessage");
  clearMessage(msgEl);

  if (!selectedProduct) {
    showMessage(msgEl, t("selectProduct"), "error");
    return;
  }

  const quantityRaw = $("quantityInput").value.trim();
  const quantity = Number(quantityRaw);
  if (!quantityRaw || isNaN(quantity) || quantity <= 0) {
    showMessage(msgEl, t("quantity"), "error");
    $("quantityInput").focus();
    return;
  }

  const discountRaw = $("discountInput").value.trim();
  let discount = discountRaw ? safeFloat(discountRaw) : 0;
  if (discount < 0) discount = 0;

  const notes = $("notesInput").value.trim();
  const sheetId = localStorage.getItem(LS_SHEET_ID);

  const entry = {
    action: "saveSale",
    sheetId,
    itemName: selectedProduct.name,
    quantity: quantityRaw,
    sellPrice: safeFloat(selectedProduct.price),
    costPrice: safeFloat(selectedProduct.cost),
    discount: discount,
    notes,
  };

  const btn = $("saveSaleBtn");
  btn.disabled = true;

  try {
    if (!navigator.onLine) throw new Error("offline");
    await callBackend("saveSale", entry);
    markSynced();
    showMessage(msgEl, t("saleRecorded"), "success");
    resetSaleForm();
  } catch (err) {
    if (!navigator.onLine || err.message === "offline") {
      queuePendingEntry(entry);
      showMessage(msgEl, t("offline"), "error");
      resetSaleForm();
    } else {
      showMessage(msgEl, t("error") + " (" + err.message + ")", "error");
    }
  } finally {
    btn.disabled = false;
  }
}

function resetSaleForm() {
  selectedProduct = null;
  document.querySelectorAll("#saleProductList .product-card").forEach((c) => c.classList.remove("selected"));
  $("quantityInput").value = "";
  $("discountInput").value = "";
  $("notesInput").value = "";
}

/* =========================================================
   SCREEN 6 — RECORD AN EXPENSE
   ========================================================= */
document.querySelectorAll(".category-chip").forEach((chip) => {
  chip.addEventListener("click", () => {
    document.querySelectorAll(".category-chip").forEach((c) => c.classList.remove("selected"));
    chip.classList.add("selected");
    selectedExpenseCategory = chip.getAttribute("data-category");
  });
});

$("saveExpenseBtn").addEventListener("click", handleSaveExpense);

async function handleSaveExpense() {
  const msgEl = $("expenseMessage");
  clearMessage(msgEl);

  if (!selectedExpenseCategory) {
    showMessage(msgEl, t("errSelectCategory"), "error");
    return;
  }

  const description = $("descriptionInput").value.trim();
  const amount = $("amountInput").value.trim();
  const sheetId = localStorage.getItem(LS_SHEET_ID);

  if (!amount) {
    showMessage(msgEl, t("amount"), "error");
    return;
  }

  const entry = { action: "saveExpense", sheetId, category: selectedExpenseCategory, description, amount };

  const btn = $("saveExpenseBtn");
  btn.disabled = true;

  try {
    if (!navigator.onLine) throw new Error("offline");
    await callBackend("saveExpense", entry);
    markSynced();
    showMessage(msgEl, t("expenseRecorded"), "success");
    clearExpenseForm();
  } catch (err) {
    if (!navigator.onLine || err.message === "offline") {
      queuePendingEntry(entry);
      showMessage(msgEl, t("offline"), "error");
      clearExpenseForm();
    } else {
      showMessage(msgEl, t("error") + " (" + err.message + ")", "error");
    }
  } finally {
    btn.disabled = false;
  }
}

function clearExpenseForm() {
  $("descriptionInput").value = "";
  $("amountInput").value = "";
  document.querySelectorAll(".category-chip").forEach((c) => c.classList.remove("selected"));
  selectedExpenseCategory = null;
}

/* =========================================================
   SCREEN 7 — COLLECTION / DUE
   ========================================================= */
$("saveCollectionBtn").addEventListener("click", handleSaveCollection);
$("saveDueBtn").addEventListener("click", handleSaveDue);

async function handleSaveCollection() {
  const msgEl = $("collectionMessage");
  clearMessage(msgEl);

  const description = $("collectionDescriptionInput").value.trim();
  const amount = $("collectionAmountInput").value.trim();
  const sheetId = localStorage.getItem(LS_SHEET_ID);

  if (!amount) {
    showMessage(msgEl, t("collectionAmount"), "error");
    return;
  }

  const entry = { action: "saveCollection", sheetId, description, amount };
  const btn = $("saveCollectionBtn");
  btn.disabled = true;

  try {
    if (!navigator.onLine) throw new Error("offline");
    await callBackend("saveCollection", entry);
    markSynced();
    showMessage(msgEl, t("collectionRecorded"), "success");
    $("collectionDescriptionInput").value = "";
    $("collectionAmountInput").value = "";
  } catch (err) {
    if (!navigator.onLine || err.message === "offline") {
      queuePendingEntry(entry);
      showMessage(msgEl, t("offline"), "error");
      $("collectionDescriptionInput").value = "";
      $("collectionAmountInput").value = "";
    } else {
      showMessage(msgEl, t("error") + " (" + err.message + ")", "error");
    }
  } finally {
    btn.disabled = false;
  }
}

async function handleSaveDue() {
  const msgEl = $("dueMessage");
  clearMessage(msgEl);

  const description = $("dueDescriptionInput").value.trim();
  const amount = $("dueAmountInput").value.trim();
  const sheetId = localStorage.getItem(LS_SHEET_ID);

  if (!description) {
    showMessage(msgEl, t("outstandingDueDesc"), "error");
    return;
  }
  if (!amount) {
    showMessage(msgEl, t("outstandingDue"), "error");
    return;
  }

  const entry = { action: "saveDue", sheetId, description, amount };
  const btn = $("saveDueBtn");
  btn.disabled = true;

  try {
    if (!navigator.onLine) throw new Error("offline");
    await callBackend("saveDue", entry);
    markSynced();
    showMessage(msgEl, t("dueRecorded"), "success");
    $("dueDescriptionInput").value = "";
    $("dueAmountInput").value = "";
  } catch (err) {
    if (!navigator.onLine || err.message === "offline") {
      queuePendingEntry(entry);
      showMessage(msgEl, t("offline"), "error");
      $("dueDescriptionInput").value = "";
      $("dueAmountInput").value = "";
    } else {
      showMessage(msgEl, t("error") + " (" + err.message + ")", "error");
    }
  } finally {
    btn.disabled = false;
  }
}





/* =========================================================
   SCREEN 8 — MANAGE PRODUCTS
   ========================================================= */
async function loadProductsForManage() {
  const listEl = $("productsList");
  const loadingEl = $("productsLoading");
  const msgEl = $("productsMessage");

  clearMessage(msgEl);
  listEl.style.display = "none";
  listEl.innerHTML = "";
  loadingEl.style.display = "flex";
  $("manageProductSearchInput").value = "";

  const sheetId = localStorage.getItem(LS_SHEET_ID);

  try {
    const data = await callBackend("getProducts", { sheetId });
    allManageProducts = data.products || [];
    renderManageList(allManageProducts);
  } catch (err) {
    showMessage(msgEl, t("error") + " (" + err.message + ")", "error");
  } finally {
    loadingEl.style.display = "none";
    listEl.style.display = "flex";
  }
}

function filterManageProducts() {
  const query = $("manageProductSearchInput").value.trim().toLowerCase();
  if (!query) return renderManageList(allManageProducts);
  const filtered = allManageProducts.filter((p) => normalizeProduct(p).name.toLowerCase().includes(query));
  renderManageList(filtered);
}
$("manageProductSearchInput").addEventListener("input", filterManageProducts);

function renderManageList(products) {
  const listEl = $("productsList");
  listEl.innerHTML = "";

  if (products.length === 0) {
    listEl.innerHTML = `<li class="empty-state">${t("noData")}</li>`;
    return;
  }

  products.forEach((rawProduct) => {
    const product = normalizeProduct(rawProduct);
    const li = document.createElement("li");

    const textWrap = document.createElement("div");
    textWrap.className = "product-text";

    const nameEl = document.createElement("span");
    nameEl.className = "product-name";
    nameEl.textContent = product.name;
    textWrap.appendChild(nameEl);

    const metaEl = document.createElement("span");
    metaEl.className = "product-meta";
    metaEl.textContent = buildProductMetaText(product);
    textWrap.appendChild(metaEl);

    li.appendChild(textWrap);

    const actions = document.createElement("div");
    actions.className = "product-actions";

    const editBtn = document.createElement("button");
    editBtn.className = "icon-btn edit-btn";
    editBtn.setAttribute("aria-label", "Edit product");
    editBtn.innerHTML = '<i data-lucide="pencil"></i>';
    editBtn.addEventListener("click", () => startEditProduct(product));
    actions.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "icon-btn delete-btn";
    deleteBtn.setAttribute("aria-label", "Delete product");
    deleteBtn.innerHTML = '<i data-lucide="trash-2"></i>';
    deleteBtn.addEventListener("click", () => handleDeleteProduct(product));
    actions.appendChild(deleteBtn);

    li.appendChild(actions);
    listEl.appendChild(li);
  });

  safeCreateIcons();
}

function startEditProduct(product) {
  editingProductRowIndex = product.rowIndex;
  $("newProductInput").value = product.name;
  $("newProductSizeInput").value = product.size;
  $("newProductCostInput").value = product.cost;
  $("newProductPriceInput").value = product.price;
  $("addProductBtn").querySelector("span").textContent = t("updateProduct");
  $("cancelEditProductBtn").style.display = "inline-flex";
  $("newProductInput").focus();
}

function cancelEditProduct() {
  editingProductRowIndex = null;
  $("newProductInput").value = "";
  $("newProductSizeInput").value = "";
  $("newProductCostInput").value = "";
  $("newProductPriceInput").value = "";
  $("addProductBtn").querySelector("span").textContent = t("addProduct");
  $("cancelEditProductBtn").style.display = "none";
}

$("cancelEditProductBtn").addEventListener("click", cancelEditProduct);
$("addProductBtn").addEventListener("click", handleAddOrUpdateProduct);

async function handleAddOrUpdateProduct() {
  const msgEl = $("productsMessage");
  clearMessage(msgEl);

  const name = $("newProductInput").value.trim();
  const size = $("newProductSizeInput").value.trim();
  const cost = $("newProductCostInput").value.trim();
  const price = $("newProductPriceInput").value.trim();
  const sheetId = localStorage.getItem(LS_SHEET_ID);

  if (!name) {
    showMessage(msgEl, t("productName"), "error");
    return;
  }

  const btn = $("addProductBtn");
  btn.disabled = true;

  try {
    if (editingProductRowIndex) {
      await callBackend("updateProduct", { sheetId, rowIndex: editingProductRowIndex, name, size, cost, price });
    } else {
      await callBackend("addProduct", { sheetId, name, size, cost, price });
    }
    showMessage(msgEl, t("success"), "success");
    cancelEditProduct();
    loadProductsForManage();
  } catch (err) {
    showMessage(msgEl, t("error") + " (" + err.message + ")", "error");
  } finally {
    btn.disabled = false;
  }
}

async function handleDeleteProduct(product) {
  const confirmed = window.confirm(t("confirmDeleteProduct"));
  if (!confirmed) return;

  const msgEl = $("productsMessage");
  clearMessage(msgEl);
  const sheetId = localStorage.getItem(LS_SHEET_ID);

  try {
    await callBackend("deleteProduct", { sheetId, rowIndex: product.rowIndex });
    showMessage(msgEl, t("success"), "success");
    if (editingProductRowIndex === product.rowIndex) cancelEditProduct();
    loadProductsForManage();
  } catch (err) {
    showMessage(msgEl, t("error") + " (" + err.message + ")", "error");
  }
}

/* =========================================================
   SCREEN 9 — DAILY REPORT
   ========================================================= */
function todayISODate() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function isoDateToDDMMYYYY(iso) {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

function formatLongDateFromISO(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  const dateObj = new Date(y, m - 1, d);
  const weekday = dateObj.toLocaleDateString("en-US", { weekday: "long" });
  const month = dateObj.toLocaleDateString("en-US", { month: "long" });
  return `${weekday}, ${d} ${month} ${y}`;
}

function initDailyReportScreen() {
  const dateInput = $("reportDateInput");
  if (!dateInput.value) dateInput.value = todayISODate();
  loadDailyReport(dateInput.value);
}

$("reportDateInput").addEventListener("change", (e) => {
  if (e.target.value) loadDailyReport(e.target.value);
});

async function loadDailyReport(isoDate) {
  const msgEl = $("reportMessage");
  const loadingEl = $("reportLoading");
  const contentEl = $("reportContent");

  clearMessage(msgEl);
  contentEl.style.display = "none";
  loadingEl.style.display = "flex";

  $("reportDateDisplay").textContent = formatLongDateFromISO(isoDate);

  const sheetId = localStorage.getItem(LS_SHEET_ID);
  const businessName = localStorage.getItem(LS_BUSINESS_NAME) || "";
  const ddmmyyyy = isoDateToDDMMYYYY(isoDate);
  const [y, m] = isoDate.split("-").map(Number);

  try {
    const [reportData, monthData] = await Promise.all([
      callBackend("getDailyReport", { sheetId, date: ddmmyyyy }),
      callBackend("getMonthContext", { sheetId, month: m, year: y }).catch(() => ({ dailySales: [], productTotals: [] })),
    ]);

    renderReportSales(reportData.sales || []);
    renderReportCollections(reportData.collections || []);
    renderReportDues(reportData.dues || []);
    renderReportExpenses(reportData.expenses || []);
    renderReportSummary(reportData.summary || {});
    renderDailyReportCharts(monthData, reportData.expenses || [], parseInt(isoDate.split("-")[2], 10));

    $("printBusinessName").textContent = businessName;
    $("printReportDate").textContent = formatLongDateFromISO(isoDate);
    $("printHeaderBusinessName").textContent = businessName;
    $("reportGeneratedNote").textContent = t("reportGenerated");

    contentEl.style.display = "block";
  } catch (err) {
    showMessage(msgEl, t("error") + " (" + err.message + ")", "error");
  } finally {
    loadingEl.style.display = "none";
    safeCreateIcons();
  }
}

function renderReportSales(sales) {
  const el = $("reportSalesBody");

  if (sales.length === 0) {
    el.innerHTML = `<div class="report-empty-state">${t("noData")}</div>`;
    return;
  }

  let grossTotal = 0, discountTotal = 0;
  const rows = sales.map((s) => {
    const qty = safeFloat(s.quantity);
    const unitPrice = safeFloat(s.sellPrice);
    const discount = safeFloat(s.discount);
    const rowTotal = (qty * unitPrice) - discount;
    grossTotal += qty * unitPrice;
    discountTotal += discount;
    return `
      <div class="report-table-row">
        <span>${escapeHtml(s.itemName)}</span>
        <span>${escapeHtml(s.size || "")}</span>
        <span>${qty}</span>
        <span>${getCurrency()}${unitPrice}</span>
        <span>${getCurrency()}${roundTo2Display(discount)}</span>
        <span>${getCurrency()}${roundTo2Display(rowTotal)}</span>
      </div>`;
  }).join("");

  const netTotal = grossTotal - discountTotal;

  el.innerHTML = `
    <div class="report-table">
      <div class="report-table-header-row">
        <span>${t("product")}</span><span>${t("sizeCol")}</span><span>${t("qty")}</span><span>${t("unitPrice")}</span><span>${t("totalDiscount")}</span><span>${t("total")}</span>
      </div>
      ${rows}
      <div class="report-subtotal-row muted-line"><span>${t("totalSales")}:</span><span>${getCurrency()}${roundTo2Display(grossTotal)}</span></div>
      <div class="report-subtotal-row muted-line"><span>${t("totalDiscount")}:</span><span>— ${getCurrency()}${roundTo2Display(discountTotal)}</span></div>
      <div class="report-subtotal-row"><span>${t("totalCashIn")}:</span><span>${getCurrency()}${roundTo2Display(netTotal)}</span></div>
    </div>`;
}

function renderReportCollections(collections) {
  const el = $("reportCollectionsBody");
  if (collections.length === 0) {
    el.innerHTML = `<div class="report-empty-state">${t("noData")}</div>`;
    return;
  }
  let total = 0;
  const rows = collections.map((c) => {
    const amount = safeFloat(c.amount);
    total += amount;
    return `<div class="report-2col-row"><span>${escapeHtml(c.description || "(no description)")}</span><span>${getCurrency()}${amount}</span></div>`;
  }).join("");
  el.innerHTML = `<div class="report-table">${rows}<div class="report-subtotal-row"><span>${t("totalCollections")}:</span><span>${getCurrency()}${roundTo2Display(total)}</span></div></div>`;
}

function renderReportDues(dues) {
  const el = $("reportDuesBody");
  if (dues.length === 0) {
    el.innerHTML = `<div class="report-empty-state">${t("noData")}</div>`;
    return;
  }
  let total = 0;
  const rows = dues.map((d) => {
    const amount = safeFloat(d.amount);
    total += amount;
    return `<div class="report-2col-row"><span>${escapeHtml(d.description || "(no description)")}</span><span>${getCurrency()}${amount}</span></div>`;
  }).join("");
  el.innerHTML = `<div class="report-table">${rows}<div class="report-subtotal-row"><span>${t("outstandingDues")}:</span><span>${getCurrency()}${roundTo2Display(total)}</span></div></div>`;
}

function renderReportExpenses(expenses) {
  const el = $("reportExpensesBody");
  if (expenses.length === 0) {
    el.innerHTML = `<div class="report-empty-state">${t("noData")}</div>`;
    return;
  }
  let total = 0;
  const rows = expenses.map((e) => {
    const amount = safeFloat(e.amount);
    total += amount;
    return `<div class="report-3col-row"><span>${escapeHtml(e.category || "")}</span><span>${escapeHtml(e.description || "")}</span><span>${getCurrency()}${amount}</span></div>`;
  }).join("");
  el.innerHTML = `<div class="report-table">${rows}<div class="report-subtotal-row"><span>${t("totalExpenses")}:</span><span>${getCurrency()}${roundTo2Display(total)}</span></div></div>`;
}

function renderReportSummary(summary) {
  const totalCashIn = safeFloat(summary.totalCashIn);
  const totalExpenses = safeFloat(summary.totalExpenses);
  const cogs = safeFloat(summary.cogs);
  const grossProfit = safeFloat(summary.grossProfit);
  const profitMargin = safeFloat(summary.profitMargin);
  const totalDiscount = safeFloat(summary.totalDiscount);

  const profitClass = grossProfit < 0 ? "negative" : "positive";
  const profitMarginClass = profitMargin < 0 ? "negative" : "positive";

  $("reportSummaryBody").innerHTML = `
    <div class="report-summary-row"><span>${t("totalCashIn")}</span><span class="value">${getCurrency()}${roundTo2Display(totalCashIn)}</span></div>
    <div class="report-summary-row"><span>${t("totalDiscount")}</span><span class="value">${getCurrency()}${roundTo2Display(totalDiscount)}</span></div>
    <div class="report-summary-row"><span>${t("cogs")}</span><span class="value">${getCurrency()}${roundTo2Display(cogs)}</span></div>
    <div class="report-summary-row"><span>${t("totalExpenses")}</span><span class="value">${getCurrency()}${roundTo2Display(totalExpenses)}</span></div>
    <div class="report-summary-row"><span>${t("grossProfit")}</span><span class="value ${profitClass}">${getCurrency()}${roundTo2Display(grossProfit)}</span></div>
    <div class="report-summary-row"><span>${t("profitMargin")}</span><span class="value ${profitMarginClass}">${profitMargin.toFixed(1)}%</span></div>
  `;
}

/**
 * Destroys any existing Chart.js instance on the given canvas
 * before creating a new one, so re-rendering (e.g. after changing
 * the report date or switching language) never throws "Canvas is
 * already in use".
 */
function renderChart(canvasId, config) {
  if (chartInstances[canvasId]) {
    chartInstances[canvasId].destroy();
  }
  const canvas = $(canvasId);
  if (!canvas || typeof Chart === "undefined") return;
  chartInstances[canvasId] = new Chart(canvas, config);
}

const EXPENSE_CATEGORY_COLORS = {
  "Rent": "#2ECC71", "Salary": "#3a6fd8", "Utility Bills": "#E74C3C",
  "Transportation": "#f39c12", "Refreshments": "#9b59b6", "Dealer Payoff": "#1abc9c",
  "Marketing": "#e67e22", "Miscellaneous": "#7F8C8D",
};

function renderDailyReportCharts(monthData, expensesToday, selectedDay) {
  const dailySales = monthData.dailySales || [];
  const labels = dailySales.map((_, i) => i).filter((i) => i >= 1);
  const data = labels.map((day) => safeFloat(dailySales[day]));

  renderChart("dailyReportSalesTrendChart", {
    type: "line",
    data: { labels, datasets: [{ label: t("salesTrend"), data, borderColor: "#2ECC71", backgroundColor: "rgba(46,204,113,0.15)", tension: 0.25, fill: true }] },
    options: { responsive: true, plugins: { legend: { display: false } }, scales: { x: { title: { display: true, text: "Day" } } } },
  });

  const expenseByCategory = {};
  expensesToday.forEach((e) => {
    const cat = e.category || "Miscellaneous";
    expenseByCategory[cat] = (expenseByCategory[cat] || 0) + safeFloat(e.amount);
  });
  const expenseCats = Object.keys(expenseByCategory);
  renderChart("dailyReportExpenseChart", {
    type: "doughnut",
    data: {
      labels: expenseCats,
      datasets: [{ data: expenseCats.map((c) => expenseByCategory[c]), backgroundColor: expenseCats.map((c) => EXPENSE_CATEGORY_COLORS[c] || "#7F8C8D") }],
    },
    options: { responsive: true, plugins: { legend: { position: "bottom" } } },
  });

  const productTotals = (monthData.productTotals || []).slice(0, 10);
  renderChart("dailyReportTop10Chart", {
    type: "bar",
    data: { labels: productTotals.map((p) => p.itemName), datasets: [{ label: t("qty"), data: productTotals.map((p) => p.totalQty), backgroundColor: "#2ECC71" }] },
    options: { indexAxis: "y", responsive: true, plugins: { legend: { display: false } } },
  });
}

$("downloadDailyPdfBtn").addEventListener("click", () => {
  const now = new Date();
  const dd = String(now.getDate()).padStart(2, "0");
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const yyyy = now.getFullYear();
  const hh = String(now.getHours()).padStart(2, "0");
  const min = String(now.getMinutes()).padStart(2, "0");
  $("printFooterLine").textContent = `Generated by Nikesh — nikesh.digiwizr.com | Date: ${dd}/${mm}/${yyyy} ${hh}:${min}`;
  window.print();
});

/* =========================================================
   SCREEN 10 — MONTHLY REPORT
   ========================================================= */
const MONTH_LABELS_EN = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
const MONTH_LABELS_BN = ["জানু","ফেব্রু","মার্চ","এপ্রিল","মে","জুন","জুলাই","আগস্ট","সেপ্টে","অক্টো","নভে","ডিসে"];

function initMonthlyReportScreen() {
  if (!monthPickerSelectedMonth) {
    monthPickerYear = new Date().getFullYear();
    monthPickerSelectedMonth = new Date().getMonth() + 1;
  }
  renderMonthPicker();
  loadMonthlyReport(monthPickerSelectedMonth, monthPickerYear);
}

function renderMonthPicker() {
  $("monthPickerYear").textContent = monthPickerYear;
  const grid = $("monthGrid");
  grid.innerHTML = "";
  const labels = getCurrentLanguage() === "Bn-৳" ? MONTH_LABELS_BN : MONTH_LABELS_EN;

  labels.forEach((label, i) => {
    const monthNum = i + 1;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "month-grid-btn" + (monthNum === monthPickerSelectedMonth ? " selected" : "");
    btn.textContent = label;
    btn.addEventListener("click", () => {
      monthPickerSelectedMonth = monthNum;
      renderMonthPicker();
      loadMonthlyReport(monthNum, monthPickerYear);
    });
    grid.appendChild(btn);
  });
}

$("monthPickerPrevYear").addEventListener("click", () => {
  monthPickerYear -= 1;
  renderMonthPicker();
  if (monthPickerSelectedMonth) loadMonthlyReport(monthPickerSelectedMonth, monthPickerYear);
});
$("monthPickerNextYear").addEventListener("click", () => {
  monthPickerYear += 1;
  renderMonthPicker();
  if (monthPickerSelectedMonth) loadMonthlyReport(monthPickerSelectedMonth, monthPickerYear);
});

async function loadMonthlyReport(month, year) {
  const msgEl = $("monthlyReportMessage");
  const loadingEl = $("monthlyReportLoading");
  const contentEl = $("monthlyReportContent");

  clearMessage(msgEl);
  contentEl.style.display = "none";
  loadingEl.style.display = "flex";

  const sheetId = localStorage.getItem(LS_SHEET_ID);
  const businessName = localStorage.getItem(LS_BUSINESS_NAME) || "";

  try {
    const data = await callBackend("getMonthlyReport", { sheetId, month, year });

    renderMonthlyExecutiveSummary(data.executiveSummary || {});
    renderMonthlySalesSummary(data.salesSummary || {});
    renderMonthlyProductPerformance(data.productPerformance || {});
    renderMonthlyExpenseSummary(data.expenseSummary || {}, data.totalExpenses || 0);
    renderMonthlyCollectionsDues(data.collectionsAndDues || {});
    renderMonthlyProfitAnalysis(data.profitAnalysis || {});
    renderMonthlyCharts(data.charts || {});

    const labels = getCurrentLanguage() === "Bn-৳" ? MONTH_LABELS_BN : MONTH_LABELS_EN;
    const monthDisplay = `${labels[month - 1]} ${year}`;
    $("printMonthlyBusinessName").textContent = businessName;
    $("printMonthlyReportDate").textContent = monthDisplay;
    $("printMonthlyHeaderBusinessName").textContent = businessName;

    contentEl.style.display = "block";
  } catch (err) {
    showMessage(msgEl, t("error") + " (" + err.message + ")", "error");
  } finally {
    loadingEl.style.display = "none";
    safeCreateIcons();
  }
}

function renderMonthlyExecutiveSummary(s) {
  const revenue = safeFloat(s.totalSalesRevenue);
  const collections = safeFloat(s.totalCollections);
  const expenses = safeFloat(s.totalExpenses);
  const grossProfit = safeFloat(s.grossProfit);
  const netProfit = safeFloat(s.netProfit);
  const margin = safeFloat(s.profitMarginPercent);

  $("monthlyExecutiveSummaryBody").innerHTML = `
    <div class="report-summary-row"><span>${t("totalSales")}</span><span class="value">${getCurrency()}${roundTo2Display(revenue)}</span></div>
    <div class="report-summary-row"><span>${t("totalCollections")}</span><span class="value">${getCurrency()}${roundTo2Display(collections)}</span></div>
    <div class="report-summary-row"><span>${t("totalExpenses")}</span><span class="value">${getCurrency()}${roundTo2Display(expenses)}</span></div>
    <div class="report-summary-row"><span>${t("grossProfit")}</span><span class="value ${grossProfit<0?'negative':'positive'}">${getCurrency()}${roundTo2Display(grossProfit)}</span></div>
    <div class="report-summary-row"><span>${t("netProfit")}</span><span class="value ${netProfit<0?'negative':'positive'}">${getCurrency()}${roundTo2Display(netProfit)}</span></div>
    <div class="report-summary-row"><span>${t("profitMargin")}</span><span class="value ${margin<0?'negative':'positive'}">${margin.toFixed(1)}%</span></div>
  `;
}

function renderMonthlySalesSummary(s) {
  const totalAmount = safeFloat(s.totalSalesAmount);
  const numTxn = s.numTransactions || 0;
  const avg = safeFloat(s.avgSaleValue);
  const best = s.bestSalesDay || { date: "—", amount: 0 };
  const lowest = s.lowestSalesDay || { date: "—", amount: 0 };

  $("monthlySalesSummaryBody").innerHTML = `
    <div class="report-summary-row"><span>${t("totalSales")}</span><span class="value">${getCurrency()}${roundTo2Display(totalAmount)}</span></div>
    <div class="report-summary-row"><span>${t("numTransactions")}</span><span class="value">${numTxn}</span></div>
    <div class="report-summary-row"><span>${t("avgSaleValue")}</span><span class="value">${getCurrency()}${roundTo2Display(avg)}</span></div>
    <div class="report-summary-row"><span>${t("bestSalesDay")}</span><span class="value">${escapeHtml(best.date || "—")} (${getCurrency()}${roundTo2Display(best.amount)})</span></div>
    <div class="report-summary-row"><span>${t("lowestSalesDay")}</span><span class="value">${escapeHtml(lowest.date || "—")} (${getCurrency()}${roundTo2Display(lowest.amount)})</span></div>
  `;
}

function renderMonthlyProductPerformance(p) {
  const top10 = p.top10 || [];
  const slowMoving = p.slowMoving || [];

  const top10El = $("monthlyTop10Body");
  if (top10.length === 0) {
    top10El.innerHTML = `<div class="report-empty-state">${t("noData")}</div>`;
  } else {
    const rows = top10.map((prod, i) => `
      <div class="report-table-row" style="grid-template-columns: 0.4fr 1.6fr 0.8fr 0.6fr 0.9fr;">
        <span>${i + 1}</span><span>${escapeHtml(prod.itemName)}</span><span>${escapeHtml(prod.size || "")}</span><span>${roundTo2Display(prod.qtySold)}</span><span>${getCurrency()}${roundTo2Display(prod.totalRevenue)}</span>
      </div>`).join("");
    top10El.innerHTML = `<div class="report-table">${rows}</div>`;
  }

  const slowEl = $("monthlySlowMovingBody");
  if (slowMoving.length === 0) {
    slowEl.innerHTML = `<div class="report-empty-state">${t("noData")}</div>`;
  } else {
    const rows = slowMoving.map((prod) => `
      <div class="report-2col-row"><span>${escapeHtml(prod.itemName)}${prod.size ? " (" + escapeHtml(prod.size) + ")" : ""}</span><span>${roundTo2Display(prod.qtySold)} ${t("qty")}</span></div>`).join("");
    slowEl.innerHTML = `<div class="report-table">${rows}</div>`;
  }
}

function renderMonthlyExpenseSummary(expenseSummary, totalExpenses) {
  const categories = Object.keys(expenseSummary);
  if (categories.length === 0) {
    $("monthlyExpenseSummaryBody").innerHTML = `<div class="report-empty-state">${t("noData")}</div>`;
    return;
  }
  const rows = categories.map((cat) => {
    const catKeyMap = { "Rent": "catRent", "Salary": "catSalary", "Utility Bills": "catUtility", "Transportation": "catTransport", "Refreshments": "catRefreshments", "Dealer Payoff": "catDealerPayoff", "Marketing": "catMarketing", "Miscellaneous": "catMiscellaneous" };
    const label = catKeyMap[cat] ? t(catKeyMap[cat]) : cat;
    return `<div class="report-2col-row"><span>${escapeHtml(label)}</span><span>${getCurrency()}${roundTo2Display(expenseSummary[cat])}</span></div>`;
  }).join("");
  $("monthlyExpenseSummaryBody").innerHTML = `<div class="report-table">${rows}<div class="report-subtotal-row"><span>${t("totalExpenses")}:</span><span>${getCurrency()}${roundTo2Display(totalExpenses)}</span></div></div>`;
}

function renderMonthlyCollectionsDues(cd) {
  const collections = safeFloat(cd.totalCollections);
  const dues = safeFloat(cd.totalDues);
  $("monthlyCollectionsDuesBody").innerHTML = `
    <div class="report-summary-row"><span>${t("totalCollectionsMonth")}</span><span class="value">${getCurrency()}${roundTo2Display(collections)}</span></div>
    <div class="report-summary-row"><span>${t("totalOutstandingDues")}</span><span class="value">${getCurrency()}${roundTo2Display(dues)}</span></div>
  `;
}

function renderMonthlyProfitAnalysis(pa) {
  const cogs = safeFloat(pa.cogs);
  const grossProfit = safeFloat(pa.grossProfit);
  const grossMargin = safeFloat(pa.grossProfitMargin);
  const opEx = safeFloat(pa.operatingExpenses);
  const netProfit = safeFloat(pa.netProfit);
  const netMargin = safeFloat(pa.netProfitMargin);

  $("monthlyProfitAnalysisBody").innerHTML = `
    <div class="report-summary-row"><span>${t("cogs")}</span><span class="value">${getCurrency()}${roundTo2Display(cogs)}</span></div>
    <div class="report-summary-row"><span>${t("grossProfit")}</span><span class="value ${grossProfit<0?'negative':'positive'}">${getCurrency()}${roundTo2Display(grossProfit)}</span></div>
    <div class="report-summary-row"><span>${t("grossProfitMargin")}</span><span class="value ${grossMargin<0?'negative':'positive'}">${grossMargin.toFixed(1)}%</span></div>
    <div class="report-summary-row"><span>${t("operatingExpenses")}</span><span class="value">${getCurrency()}${roundTo2Display(opEx)}</span></div>
    <div class="report-summary-row"><span>${t("netProfit")}</span><span class="value ${netProfit<0?'negative':'positive'}">${getCurrency()}${roundTo2Display(netProfit)}</span></div>
    <div class="report-summary-row"><span>${t("netProfitMargin")}</span><span class="value ${netMargin<0?'negative':'positive'}">${netMargin.toFixed(1)}%</span></div>
  `;
}

function renderMonthlyCharts(charts) {
  const trend = charts.dailySalesTrend || [];
  renderChart("monthlySalesTrendChart", {
    type: "line",
    data: { labels: trend.map((d) => d.day), datasets: [{ label: t("salesTrend"), data: trend.map((d) => safeFloat(d.amount)), borderColor: "#2ECC71", backgroundColor: "rgba(46,204,113,0.15)", tension: 0.25, fill: true }] },
    options: { responsive: true, plugins: { legend: { display: false } }, scales: { x: { title: { display: true, text: "Day" } } } },
  });

  const expenseBreakdown = charts.expenseBreakdown || {};
  const expenseCats = Object.keys(expenseBreakdown);
  renderChart("monthlyExpenseChart", {
    type: "doughnut",
    data: { labels: expenseCats, datasets: [{ data: expenseCats.map((c) => expenseBreakdown[c]), backgroundColor: expenseCats.map((c) => EXPENSE_CATEGORY_COLORS[c] || "#7F8C8D") }] },
    options: { responsive: true, plugins: { legend: { position: "bottom" } } },
  });

  const top10 = (charts.top10Products || []).slice(0, 10);
  renderChart("monthlyTop10Chart", {
    type: "bar",
    data: { labels: top10.map((p) => p.itemName), datasets: [{ label: t("qty"), data: top10.map((p) => p.qtySold), backgroundColor: "#2ECC71" }] },
    options: { indexAxis: "y", responsive: true, plugins: { legend: { display: false } } },
  });
}

$("downloadMonthlyPdfBtn").addEventListener("click", () => {
  const now = new Date();
  const dd = String(now.getDate()).padStart(2, "0");
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const yyyy = now.getFullYear();
  const hh = String(now.getHours()).padStart(2, "0");
  const min = String(now.getMinutes()).padStart(2, "0");
  $("printMonthlyFooterLine").textContent = `Generated by Nikesh — nikesh.digiwizr.com | Date: ${dd}/${mm}/${yyyy} ${hh}:${min}`;
  window.print();
});

/* =========================================================
   SCREEN 11 — SUBSCRIPTION
   ========================================================= */
function buildWhatsAppConfirmUrl() {
  const businessName = localStorage.getItem(LS_BUSINESS_NAME) || "";
  const phone = localStorage.getItem(LS_PHONE) || "";
  const transactionId = $("transactionIdInput").value.trim();
  const today = todayISODate().split("-").reverse().join("/"); // DD/MM/YYYY

  const text = `Nikesh Subscription Payment Confirmation\nBusiness: ${businessName}\nPhone: ${phone}\nTransaction ID: ${transactionId}\nDate: ${today}`;
  return `https://wa.me/${SUBSCRIPTION_WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

$("transactionIdInput").addEventListener("input", () => {
  $("whatsappConfirmBtn").href = buildWhatsAppConfirmUrl();
});
$("whatsappConfirmBtn").href = buildWhatsAppConfirmUrl();

$("submitPaymentBtn").addEventListener("click", handleSubmitPayment);

async function handleSubmitPayment() {
  const msgEl = $("subscriptionMessage");
  clearMessage(msgEl);

  const transactionId = $("transactionIdInput").value.trim();
  if (!transactionId) {
    showMessage(msgEl, t("errTransactionId"), "error");
    return;
  }

  const sheetId = localStorage.getItem(LS_SHEET_ID);
  const businessName = localStorage.getItem(LS_BUSINESS_NAME) || "";
  const phone = localStorage.getItem(LS_PHONE) || "";
  const submissionDate = todayISODate().split("-").reverse().join("/");

  const btn = $("submitPaymentBtn");
  btn.disabled = true;

  try {
    await callBackend("saveSubscriptionRequest", { sheetId, businessName, phone, transactionId, submissionDate });
    showMessage(msgEl, t("paymentSubmitted"), "success");
    $("transactionIdInput").value = "";
    $("whatsappConfirmBtn").href = buildWhatsAppConfirmUrl();
  } catch (err) {
    showMessage(msgEl, t("error") + " (" + err.message + ")", "error");
  } finally {
    btn.disabled = false;
  }
}

/* =========================================================
   OFFLINE HANDLING & PENDING SYNC QUEUE
   ========================================================= */
function getPendingSync() {
  try {
    return JSON.parse(localStorage.getItem(LS_PENDING_SYNC)) || [];
  } catch (e) {
    return [];
  }
}

function setPendingSync(list) {
  localStorage.setItem(LS_PENDING_SYNC, JSON.stringify(list));
}

function queuePendingEntry(entry) {
  const pending = getPendingSync();
  pending.push(Object.assign({}, entry, { timestamp: new Date().toISOString() }));
  setPendingSync(pending);
  refreshSyncBadge();
}

async function syncPendingEntries() {
  if (!BACKEND_URL) return;
  const pending = getPendingSync();
  if (pending.length === 0) return;

  const stillPending = [];
  let anySucceeded = false;

  for (const entry of pending) {
    try {
      const { action, timestamp, ...params } = entry;
      await callBackend(action, params);
      anySucceeded = true;
    } catch (err) {
      stillPending.push(entry);
    }
  }

  setPendingSync(stillPending);
  refreshSyncBadge();

  if (anySucceeded) {
    markSynced();
    if (screens.home.classList.contains("active")) {
      loadDailySummary();
      loadRecentEntries();
    }
  }
}

function refreshSyncBadge() {
  const pending = getPendingSync();
  syncBadge.classList.toggle("visible", pending.length > 0);
  syncBadgeText.textContent = pending.length > 0 ? `${pending.length} ${t("pendingSync")}` : "";
}

function updateOfflineBanner() {
  offlineBanner.classList.toggle("visible", !navigator.onLine);
}

window.addEventListener("online", () => {
  updateOfflineBanner();
  syncPendingEntries();
});
window.addEventListener("offline", updateOfflineBanner);

/* =========================================================
   iOS SAFARI "ADD TO HOME SCREEN" BANNER
   ========================================================= */
function isIosDevice() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}

function isIosSafari() {
  const ua = navigator.userAgent;
  const isSafariUA = /Safari/.test(ua);
  const isOtherBrowser = /CriOS|FxiOS|EdgiOS|OPiOS|mercury/.test(ua);
  return isIosDevice() && isSafariUA && !isOtherBrowser;
}

function isRunningStandalone() {
  const iosStandalone = window.navigator.standalone === true;
  const displayModeStandalone = window.matchMedia("(display-mode: standalone)").matches;
  return iosStandalone || displayModeStandalone;
}

function shouldShowIosInstallBanner() {
  if (isRunningStandalone()) return false;
  if (!isIosSafari()) return false;
  if (localStorage.getItem(LS_IOS_BANNER_DISMISSED) === "true") return false;
  return true;
}

function showIosInstallBanner() {
  $("iosInstallBanner").classList.add("visible");
  document.body.classList.add("ios-banner-visible");
}

function dismissIosInstallBanner() {
  $("iosInstallBanner").classList.remove("visible");
  document.body.classList.remove("ios-banner-visible");
  localStorage.setItem(LS_IOS_BANNER_DISMISSED, "true");
}

function initIosInstallBanner() {
  if (shouldShowIosInstallBanner()) showIosInstallBanner();
  $("iosBannerClose").addEventListener("click", dismissIosInstallBanner);
}

/* =========================================================
   APP INIT
   ========================================================= */
async function init() {
  initLanguageSwitcher();
  updateOfflineBanner();
  initIosInstallBanner();

  const savedSheetId = localStorage.getItem(LS_SHEET_ID);
  const savedBusinessName = localStorage.getItem(LS_BUSINESS_NAME);
  const isAuthenticated = sessionStorage.getItem(SS_AUTHENTICATED) === "true";

  if (!savedSheetId) {
    recoveryReturnScreen = "setup";
    showScreen("setup");
    return;
  }

  applyBusinessNameToHeader(savedBusinessName || "");

  if (isAuthenticated) {
    await updateTrialState();
    showScreen("home");
    if (navigator.onLine) syncPendingEntries();
  } else {
    recoveryReturnScreen = "pinEntry";
    showScreen("pinEntry");
  }
}

init();
