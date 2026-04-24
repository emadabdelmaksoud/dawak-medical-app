import { useState, useEffect } from 'react';
import {
  Home, PlusCircle, List, History, Bell, Settings, Search, Filter,
  CheckCircle, XCircle, Clock, AlertCircle, User, Menu, X, FileText,
  MessageSquare, Activity, Eye, Globe, LogOut, AlarmClock, Edit3, Truck,
  ShieldCheck, Mail, Lock, Stethoscope, HeartPulse, HelpCircle, Phone,
  UserPlus, Briefcase, MapPin, Moon, Sun, Pill, Save, Send, KeyRound, Cake,
  Sparkles, Wand2
} from 'lucide-react';

// ---------------- Gemini API Config ----------------
const apiKey = ""; 

const callGeminiAPI = async (prompt) => {
  const retries = 5;
  const delay = (ms) => new Promise(res => setTimeout(res, ms));
  let currentDelay = 1000;
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated.";
    } catch (error) {
      if (i === retries - 1) return `Error: Could not generate content. Please try again.`;
      await delay(currentDelay);
      currentDelay *= 2;
    }
  }
  return "";
};

// ---------------- Translations ----------------
const TRANSLATIONS = {
  ar: {
    appTitle: "دواء", appTitleHighlight: "ك",
    loginTitle: "مرحباً بك في دواءك", loginSubtitle: "سجل الدخول أو أنشئ حساباً جديداً",
    signIn: "تسجيل الدخول", signUp: "إنشاء حساب",
    email: "البريد الإلكتروني", password: "كلمة المرور",
    googleSignIn: "تسجيل الدخول بواسطة Google",
    privacyNotice: "بياناتك الطبية مشفرة ومحمية بالكامل وفقاً لمعايير الخصوصية.",
    demoLogins: "أو جرب الحسابات التجريبية:",
    doctorRole: "طبيب", patientRole: "مريض", pharmacyRole: "صيدلية", adminRole: "Admin", registeredPatient: "مريض مسجل",
    dashboard: "لوحة القيادة", newRequest: "طلب دواء جديد", addMedication: "إضافة دواء", requestsList: "الطلبات",
    history: "السجل الطبي", notifications: "الإشعارات", settings: "الإعدادات", support: "الدعم",
    patientsList: "قائمة المرضى", selectPatientPrompt: "اختر مريضاً لعرض سجله الطبي", backToPatients: "← العودة إلى قائمة المرضى",
    noPatients: "لا يوجد مرضى مسجلين",
    searchPatients: "ابحث بالاسم أو رقم الملف", noPatientsMatch: "لا توجد نتائج مطابقة",
    editAllergy: "تعديل الحساسية", deleteAllergy: "حذف الحساسية", confirmDeleteAllergy: "حذف هذه الحساسية؟",
    followUpDate: "موعد المتابعة", prescription: "الوصفة الطبية", bloodPressure: "ضغط الدم", temperature: "الحرارة (°C)", heartRate: "نبضات القلب",
    vitals: "العلامات الحيوية", optionalField: "اختياري",
    alarms: "منبه الأدوية", logout: "تسجيل الخروج", profile: "الملف الشخصي",
    manageProfiles: "إدارة الحسابات", customerSupport: "دعم العملاء",
    welcome: "مرحباً،", totalReqs: "إجمالي الطلبات", pending: "قيد الانتظار", approved: "جاهز للصرف",
    rejected: "مرفوض", needsReview: "يحتاج مراجعة", dispensed: "تم الصرف والتوصيل", referred: "محول لصيدلية أخرى",
    latestReqs: "أحدث الطلبات", viewAll: "عرض الكل",
    newReqTitle: "طلب دواء / وصفة جديدة",
    medName: "اسم الدواء *", medDose: "الجرعة *", medDuration: "المدة (أيام) *",
    medPlaceholder: "مثال: أملوديبين", dosePlaceholder: "مثال: 5مغ", durationPlaceholder: "مثال: 30",
    selectRefill: "اختر الدواء لإعادة الصرف *",
    notes: "ملاحظات إضافية", notesPlaceholder: "أضف أي ملاحظات هنا...", createBtn: "إنشاء الطلب",
    refillReady: "جاهز لإعادة الصرف", refillDue: "موعد الصرف القادم:",
    reqListTitle: "قائمة الطلبات", searchPlaceholder: "ابحث برقم الطلب، الدواء...", allStatuses: "جميع الحالات",
    colId: "رقم الطلب", colPatient: "المريض", colMed: "الدواء المطلوب", colDate: "تاريخ الطلب", colStatus: "الحالة", colActions: "إجراءات",
    noReqs: "لا توجد طلبات مطابقة.", viewDetails: "عرض التفاصيل",
    historyTitle: "السجل الطبي للمريض", addRecord: "إضافة سجل", editRecord: "تعديل السجل", saveRecord: "حفظ",
    recordDate: "التاريخ", recordDiagnosis: "التشخيص", recordNotes: "الملاحظات الطبية",
    allergiesTitle: "الحساسية والأمراض المزمنة", addAllergy: "إضافة حساسية", allergyPlaceholder: "مثال: حساسية البنسلين",
    alarmsTitle: "منبه الأدوية", addAlarm: "إضافة منبه", alarmTime: "وقت التنبيه", alarmMed: "الدواء",
    autoAlarm: "تفعيل المنبه التلقائي عند الصرف",
    settingsTitle: "الإعدادات", accSettings: "إعدادات الحساب", emailAlerts: "تنبيهات البريد", smsAlerts: "تنبيهات SMS",
    sysPrefs: "تفضيلات النظام", darkMode: "الوضع الليلي",
    homeLocation: "عنوان المنزل", workLocation: "عنوان العمل",
    deliveryAddress: "عنوان التوصيل", addressPlaceholder: "أدخل العنوان بالتفصيل...", saveAddress: "حفظ",
    supportTitle: "الدعم والمساعدة", subject: "الموضوع", subjPlaceholder: "عنوان الرسالة",
    msg: "رسالتك", msgPlaceholder: "اكتب تفاصيل استفسارك...", sendMsg: "إرسال الرسالة",
    modalTitle: "تفاصيل الطلب", currentStatus: "الحالة الحالية:",
    patName: "اسم المريض", reqDate: "تاريخ الطلب", reqMed: "الدواء المطلوب", reqDoseDuration: "الجرعة والمدة", patNotes: "ملاحظات:",
    prescribedBy: "وصف بواسطة:",
    btnApprove: "موافقة", btnReject: "رفض", btnReview: "يحتاج مراجعة", btnMsg: "إرسال رسالة",
    btnDispense: "صرف وتوصيل الدواء", btnRefer: "تحويل لصيدلية أخرى",
    help: "مساعدة", hotline: "الخط الساخن",
    mrn: "رقم الملف الطبي", phone: "رقم الهاتف", dob: "تاريخ الميلاد",
    gender: "النوع", male: "ذكر", female: "أنثى", weight: "الوزن (كغ)", height: "الطول (سم)",
    edit: "تعديل", save: "حفظ", cancel: "إلغاء",
    requestCorrection: "طلب تصحيح",
    correctionFor: "حقل التصحيح", correctionReason: "السبب / القيمة الصحيحة",
    submitCorrection: "إرسال طلب التصحيح",
    createProfile: "إنشاء حساب جديد", profileType: "نوع الحساب",
    fullName: "الاسم الكامل", regNumber: "رقم التسجيل", username: "اسم المستخدم",
    branch: "الفرع", specialty: "التخصص",
    autoMrnNote: "سيتم إنشاء رقم الملف الطبي تلقائياً",
    correctionRequests: "طلبات التصحيح",
    supportTickets: "تذاكر الدعم",
    diagnosis: "التشخيص",
    medType: "نوع الدواء", acute: "حاد (Acute)", chronic: "مزمن (Chronic)",
    chronicMonths: "المدة (أشهر)",
    mealTiming: "التوقيت مع الطعام",
    beforeMeal: "قبل الأكل", afterMeal: "بعد الأكل", withMeal: "مع الأكل",
    medSearchHint: "اكتب لاكتشاف الأدوية تلقائياً",
    loginAsPatient: "دخول المريض", loginAsDoctor: "دخول الطبيب",
    loginAsPharmacy: "دخول الصيدلية", loginAsAdmin: "دخول المدير",
    mrnOrDob: "رقم الملف الطبي أو تاريخ الميلاد",
    dobFormat: "YYYY-MM-DD",
    setPassword: "تعيين كلمة المرور",
    confirmPassword: "تأكيد كلمة المرور",
    signupHint: "التسجيل لتعيين كلمة المرور فقط بنفس بيانات الاعتماد",
    noNotifications: "لا توجد إشعارات",
    markAllRead: "تمييز الكل كمقروء",
    correctionSent: "تم إرسال طلب التصحيح للمدير",
    profileCreated: "تم إنشاء الحساب بنجاح",
    alarmCreatedAuto: "تم إنشاء منبه تلقائي للدواء",
    saved: "تم الحفظ",
    deactivate: "تعطيل", activate: "تفعيل", delete: "حذف", deactivated: "معطل",
    resetPassword: "إعادة تعيين كلمة المرور", newPassword: "كلمة المرور الجديدة", passwordResetDone: "تم إعادة تعيين كلمة المرور",
    auditLog: "سجل النشاط", auditEmpty: "لا يوجد نشاط",
    actCreated: "أنشأ حساب", actEdited: "عدّل بيانات", actDeactivated: "عطّل حساب",
    actActivated: "فعّل حساب", actDeleted: "حذف حساب", actPasswordReset: "أعاد تعيين كلمة مرور",
    aiExplainTitle: "شرح مبسط للدواء بالذكاء الاصطناعي",
    aiExplainBtn: "✨ اشرح لي هذا الدواء",
    aiSuggestTitle: "اقتراحات علاجية (الذكاء الاصطناعي)",
    aiSuggestBtn: "✨ اقتراح أدوية للخطة العلاجية",
    aiLoading: "جاري تحليل البيانات واستدعاء الذكاء الاصطناعي...",
    aiDisclaimer: "تنبيه: هذا الشرح تم توليده بواسطة الذكاء الاصطناعي، يرجى استشارة طبيبك دائماً.",
  },
  en: {
    appTitle: "Dawa", appTitleHighlight: "k",
    loginTitle: "Welcome to Dawak", loginSubtitle: "Sign in or create a new account",
    signIn: "Sign In", signUp: "Sign Up",
    email: "Email Address", password: "Password",
    googleSignIn: "Sign in with Google",
    privacyNotice: "Your medical data is fully encrypted and privacy-protected.",
    demoLogins: "Or try our demo accounts:",
    doctorRole: "Doctor", patientRole: "Patient", pharmacyRole: "Pharmacy", adminRole: "Admin", registeredPatient: "Registered Patient",
    dashboard: "Dashboard", newRequest: "New Request", addMedication: "Add Medication", requestsList: "Requests",
    history: "Medical History", notifications: "Notifications", settings: "Settings", support: "Support",
    patientsList: "Patients", selectPatientPrompt: "Select a patient to view their medical record", backToPatients: "← Back to patients",
    noPatients: "No patients registered",
    searchPatients: "Search by name or MRN", noPatientsMatch: "No matching patients",
    editAllergy: "Edit allergy", deleteAllergy: "Delete allergy", confirmDeleteAllergy: "Delete this allergy?",
    followUpDate: "Follow-up date", prescription: "Prescription", bloodPressure: "Blood pressure", temperature: "Temperature (°C)", heartRate: "Heart rate (bpm)",
    vitals: "Vitals", optionalField: "optional",
    alarms: "Medication Alarms", logout: "Log Out", profile: "Profile",
    manageProfiles: "Manage Profiles", customerSupport: "Customer Support",
    welcome: "Welcome,", totalReqs: "Total Requests", pending: "Pending", approved: "Ready to Dispense",
    rejected: "Rejected", needsReview: "Needs Review", dispensed: "Dispensed & Delivered", referred: "Referred",
    latestReqs: "Latest Requests", viewAll: "View All",
    newReqTitle: "New Medication Request",
    medName: "Medication Name *", medDose: "Dose *", medDuration: "Duration (Days) *",
    medPlaceholder: "e.g., Amlodipine", dosePlaceholder: "e.g., 5mg", durationPlaceholder: "e.g., 30",
    selectRefill: "Select Medication for Refill *",
    notes: "Additional Notes", notesPlaceholder: "Add any notes here...", createBtn: "Create Request",
    refillReady: "Ready for refill", refillDue: "Next refill due:",
    reqListTitle: "Requests List", searchPlaceholder: "Search by ID, medication...", allStatuses: "All Statuses",
    colId: "Request ID", colPatient: "Patient Name", colMed: "Requested Medication", colDate: "Request Date", colStatus: "Status", colActions: "Actions",
    noReqs: "No matching requests found.", viewDetails: "View Details",
    historyTitle: "Patient Medical History", addRecord: "Add Record", editRecord: "Edit Record", saveRecord: "Save",
    recordDate: "Date", recordDiagnosis: "Diagnosis", recordNotes: "Medical Notes",
    allergiesTitle: "Allergies & Chronic Conditions", addAllergy: "Add Allergy", allergyPlaceholder: "e.g., Penicillin Allergy",
    alarmsTitle: "Medication Alarms", addAlarm: "Add Alarm", alarmTime: "Alarm Time", alarmMed: "Medication",
    autoAlarm: "Auto-create alarms for dispensed medications",
    settingsTitle: "Settings", accSettings: "Account Settings", emailAlerts: "Email Alerts", smsAlerts: "SMS Alerts",
    sysPrefs: "System Preferences", darkMode: "Dark Mode",
    homeLocation: "Home Location", workLocation: "Work Location",
    deliveryAddress: "Delivery Address", addressPlaceholder: "Enter detailed address...", saveAddress: "Save",
    supportTitle: "Support & Help", subject: "Subject", subjPlaceholder: "Message Subject",
    msg: "Your Message", msgPlaceholder: "Write your inquiry details here...", sendMsg: "Send Message",
    modalTitle: "Request Details", currentStatus: "Current Status:",
    patName: "Patient Name", reqDate: "Request Date", reqMed: "Requested Medication", reqDoseDuration: "Dose & Duration", patNotes: "Notes:",
    prescribedBy: "Prescribed By:",
    btnApprove: "Approve", btnReject: "Reject", btnReview: "Needs Review", btnMsg: "Send Message",
    btnDispense: "Dispense & Deliver", btnRefer: "Refer to Pharmacy",
    help: "Help", hotline: "Hotline",
    mrn: "Medical Record Number", phone: "Phone Number", dob: "Date of Birth",
    gender: "Gender", male: "Male", female: "Female", weight: "Weight (kg)", height: "Height (cm)",
    edit: "Edit", save: "Save", cancel: "Cancel",
    requestCorrection: "Request Correction",
    correctionFor: "Field to Correct", correctionReason: "Reason / Correct Value",
    submitCorrection: "Submit Correction Request",
    createProfile: "Create New Profile", profileType: "Profile Type",
    fullName: "Full Name", regNumber: "Registration Number", username: "Username",
    branch: "Branch", specialty: "Specialty",
    autoMrnNote: "Medical Record Number will be generated automatically",
    correctionRequests: "Correction Requests",
    supportTickets: "Support Tickets",
    diagnosis: "Diagnosis",
    medType: "Medication Type", acute: "Acute", chronic: "Chronic",
    chronicMonths: "Duration (months)",
    mealTiming: "Meal Timing",
    beforeMeal: "Before Meals", afterMeal: "After Meals", withMeal: "With Meals",
    medSearchHint: "Type to autodetect medications",
    loginAsPatient: "Patient Login", loginAsDoctor: "Doctor Login",
    loginAsPharmacy: "Pharmacy Login", loginAsAdmin: "Admin Login",
    mrnOrDob: "Medical Record Number or Date of Birth",
    dobFormat: "YYYY-MM-DD",
    setPassword: "Set Password",
    confirmPassword: "Confirm Password",
    signupHint: "Sign up only to set a password, using the same credentials.",
    noNotifications: "No notifications",
    markAllRead: "Mark all as read",
    correctionSent: "Correction request sent to admin",
    profileCreated: "Profile created successfully",
    alarmCreatedAuto: "Auto alarm created for medication",
    saved: "Saved",
    deactivate: "Deactivate", activate: "Activate", delete: "Delete", deactivated: "Inactive",
    resetPassword: "Reset Password", newPassword: "New Password", passwordResetDone: "Password reset successfully",
    auditLog: "Activity Log", auditEmpty: "No activity yet",
    actCreated: "created account", actEdited: "edited",
    actDeactivated: "deactivated", actActivated: "activated",
    actDeleted: "deleted account", actPasswordReset: "reset password for",
    aiExplainTitle: "AI Medication Explanation",
    aiExplainBtn: "✨ Explain this medication",
    aiSuggestTitle: "AI Treatment Suggestions",
    aiSuggestBtn: "✨ Suggest Treatment",
    aiLoading: "Analyzing data and calling AI...",
    aiDisclaimer: "Note: This explanation is generated by AI. Always consult your doctor.",
  }
};

const SPECIALTIES = [
  { ar: 'طبيب باطنة', en: 'Internal Medicine' },
  { ar: 'طبيب عائلة', en: 'Family Medicine' },
  { ar: 'أطفال', en: 'Pediatrics' },
  { ar: 'نساء وتوليد', en: 'Obstetrics & Gynecology' },
  { ar: 'قلب', en: 'Cardiology' },
  { ar: 'سكر وغدد صماء', en: 'Endocrinology' },
  { ar: 'جلدية', en: 'Dermatology' },
  { ar: 'عظام', en: 'Orthopedics' },
  { ar: 'مخ وأعصاب', en: 'Neurology' },
  { ar: 'نفسية', en: 'Psychiatry' },
  { ar: 'أنف وأذن وحنجرة', en: 'ENT' },
  { ar: 'عيون', en: 'Ophthalmology' },
  { ar: 'جراحة عامة', en: 'General Surgery' },
  { ar: 'مسالك بولية', en: 'Urology' },
  { ar: 'صيدلة سريرية', en: 'Clinical Pharmacy' },
];

const COMMON_MEDS = [
  'Amlodipine', 'Metformin', 'Omeprazole', 'Atorvastatin', 'Lisinopril',
  'Amoxicillin', 'Azithromycin', 'Paracetamol', 'Ibuprofen', 'Losartan',
  'Simvastatin', 'Pantoprazole', 'Ciprofloxacin', 'Aspirin', 'Salbutamol',
  'Insulin Glargine', 'Levothyroxine', 'Bisoprolol', 'Clopidogrel', 'Furosemide'
];

const getText = (field, lang) => {
  if (!field) return '';
  return typeof field === 'string' ? field : (field[lang] || field.en || '');
};

// ---------------- MRN generation (8 digits, +1 each time) ----------------
function nextMRN(existing) {
  const nums = existing
    .map(m => parseInt(m, 10))
    .filter(n => !Number.isNaN(n));
  const max = nums.length ? Math.max(...nums) : 10000000;
  const next = Math.max(max + 1, 10000001);
  return String(next).padStart(8, '0');
}

// ---------------- Initial seeded data ----------------
const SEED_USERS = [
  { id: 'admin1', role: 'admin', name: { ar: 'المدير', en: 'System Admin' }, username: 'admin', email: 'admin@dawak.health', password: 'admin' },
  { id: 'doc1', role: 'doctor', name: { ar: 'د. أحمد محمود', en: 'Dr. Ahmed Mahmoud' }, specialty: { ar: 'طبيب باطنة', en: 'Internal Medicine' }, registrationNumber: 'REG-1001', password: 'doctor' },
  { id: 'pat1', role: 'patient', name: { ar: 'سارة خالد', en: 'Sarah Khaled' }, mrn: '10000001', dob: '1991-04-12', gender: 'female', phone: '+20 100 111 2222', weight: 64, height: 165, password: 'patient' },
  { id: 'pat2', role: 'patient', name: { ar: 'محمد علي', en: 'Mohamed Ali' }, mrn: '10000002', dob: '1985-09-03', gender: 'male', phone: '+20 100 333 4444', weight: 82, height: 178, password: 'patient' },
  { id: 'pharm1', role: 'pharmacy', name: { ar: 'صيدلية الشفاء', en: 'Al-Shifa Pharmacy' }, branch: { ar: 'فرع التجمع', en: 'New Cairo Branch' }, username: 'shifa', email: 'shifa@dawak.health', password: 'pharmacy' },
];

const SEED_REQUESTS = [
  { id: 'REQ-101', patientName: { ar: 'سارة خالد', en: 'Sarah Khaled' }, patientId: 'pat1', prescribedBy: { ar: 'د. أحمد محمود', en: 'Dr. Ahmed Mahmoud' }, medicationName: { ar: 'أملوديبين', en: 'Amlodipine' }, dose: '5mg', duration: '30', date: '2026-04-20', status: 'Pending', notes: { ar: 'الرجاء إعادة الصرف', en: 'Please refill' } },
  { id: 'REQ-102', patientName: { ar: 'محمد علي', en: 'Mohamed Ali' }, patientId: 'pat2', prescribedBy: { ar: 'د. يوسف عمر', en: 'Dr. Youssef Omar' }, medicationName: { ar: 'ميتفورمين', en: 'Metformin' }, dose: '1000mg', duration: '60', date: '2026-04-19', status: 'Approved', notes: { ar: 'الجرعة المعتادة', en: 'Standard dose' } },
  { id: 'REQ-103', patientName: { ar: 'سارة خالد', en: 'Sarah Khaled' }, patientId: 'pat1', prescribedBy: { ar: 'د. أحمد محمود', en: 'Dr. Ahmed Mahmoud' }, medicationName: { ar: 'أوميبرازول', en: 'Omeprazole' }, dose: '20mg', duration: '14', date: '2026-04-22', status: 'Dispensed', notes: { ar: 'يعاني من حموضة', en: 'Acidity issues' } },
];

const PATIENT_MEDICATIONS = [
  { id: 'm1', name: { ar: 'أملوديبين', en: 'Amlodipine' }, dose: '5mg', duration: '30', nextRefillDate: '2026-04-25' },
  { id: 'm2', name: { ar: 'ميتفورمين', en: 'Metformin' }, dose: '1000mg', duration: '30', nextRefillDate: '2026-04-20' },
];

const INITIAL_HISTORY = [
  { id: 'h1', date: '2025-11-10', diagnosis: { ar: 'ارتفاع ضغط الدم', en: 'Hypertension' }, notes: { ar: 'المريض يستجيب جيداً للعلاج', en: 'Responding well to treatment' } },
];

const INITIAL_ALLERGIES = [
  { id: 'al1', text: { ar: 'حساسية البنسلين', en: 'Penicillin Allergy' } },
  { id: 'al2', text: { ar: 'حساسية الفول السوداني', en: 'Peanut Allergy' } }
];

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authMode, setAuthMode] = useState('signin');
  const [authRole, setAuthRole] = useState('patient');
  const [lang, setLang] = useState('ar');
  const [currentUser, setCurrentUser] = useState(null);
  const [currentView, setCurrentView] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [users, setUsers] = useState(SEED_USERS);
  const [requests, setRequests] = useState(SEED_REQUESTS);
  const [patientHistory, setPatientHistory] = useState(INITIAL_HISTORY);
  const [allergies, setAllergies] = useState(INITIAL_ALLERGIES);
  const [alarms, setAlarms] = useState([]);
  const [autoAlarmEnabled, setAutoAlarmEnabled] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [corrections, setCorrections] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [auditLog, setAuditLog] = useState([]);
  const [prefs, setPrefs] = useState({ home: '', work: '', darkMode: false });

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [patientSearch, setPatientSearch] = useState('');
  const [editingAllergyId, setEditingAllergyId] = useState(null);
  const [editingAllergyText, setEditingAllergyText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Patient profile editing state
  const [editingProfile, setEditingProfile] = useState(false);
  const [editPhone, setEditPhone] = useState('');
  const [editWeight, setEditWeight] = useState('');
  const [editHeight, setEditHeight] = useState('');
  const [showCorrection, setShowCorrection] = useState(false);

  // Admin create-profile role tab
  const [adminCreateRole, setAdminCreateRole] = useState('patient');
  const [editUser, setEditUser] = useState(null);

  // Alarms form state
  const [newAlarmTime, setNewAlarmTime] = useState('');
  const [newAlarmMed, setNewAlarmMed] = useState('');

  // Doctor "Add Medication" form
  const [reqMedName, setReqMedName] = useState('');
  const [reqDose, setReqDose] = useState('');
  const [reqDuration, setReqDuration] = useState('');
  const [reqNotes, setReqNotes] = useState('');
  const [reqDiagnosis, setReqDiagnosis] = useState('');
  const [reqMedType, setReqMedType] = useState('acute');
  const [reqChronicMonths, setReqChronicMonths] = useState('');
  const [reqMealTiming, setReqMealTiming] = useState('after');
  const [medSuggestions, setMedSuggestions] = useState([]);
  
  // AI Feature States
  const [aiSuggestions, setAiSuggestions] = useState(null);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [aiExplanation, setAiExplanation] = useState(null);
  const [isExplaining, setIsExplaining] = useState(false);

  const [editingHistory, setEditingHistory] = useState(null);
  const [newAllergy, setNewAllergy] = useState('');

  // Help & Hotline modals
  const [showHelp, setShowHelp] = useState(false);
  const [showHotline, setShowHotline] = useState(false);

  const t = TRANSLATIONS[lang];

  useEffect(() => {
    if (prefs.darkMode) document.body.classList.add('dark-mode');
    else document.body.classList.remove('dark-mode');
  }, [prefs.darkMode]);

  useEffect(() => {
    document.body.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  // ---------------- Helpers ----------------
  const toggleLanguage = () => setLang(lang === 'ar' ? 'en' : 'ar');

  const logAudit = (action, target) => {
    if (!currentUser) return;
    setAuditLog(prev => [{
      id: `au-${Date.now()}-${Math.random()}`,
      date: new Date().toISOString(),
      actorName: getText(currentUser.name, 'en'),
      action,
      targetName: getText(target.name, 'en'),
      targetRole: target.role,
    }, ...prev]);
  };

  const pushNotification = (userId, textAr, textEn) => {
    setNotifications(prev => [{
      id: `n-${Date.now()}-${Math.random()}`,
      userId,
      text: { ar: textAr, en: textEn },
      date: new Date().toISOString(),
      read: false,
    }, ...prev]);
  };

  const handleLogin = (user) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
    setCurrentView('dashboard');
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    let user;

    if (authRole === 'patient') {
      const cred = String(fd.get('cred') || '').trim();
      user = users.find(u => u.role === 'patient' && (u.mrn === cred || u.dob === cred));
    } else if (authRole === 'doctor') {
      const reg = String(fd.get('reg') || '').trim();
      user = users.find(u => u.role === 'doctor' && u.registrationNumber === reg);
    } else if (authRole === 'pharmacy') {
      const cred = String(fd.get('cred') || '').trim().toLowerCase();
      user = users.find(u => u.role === 'pharmacy' && (u.username?.toLowerCase() === cred || u.email?.toLowerCase() === cred));
    } else {
      const cred = String(fd.get('cred') || '').trim().toLowerCase();
      user = users.find(u => u.role === 'admin' && (u.username?.toLowerCase() === cred || u.email?.toLowerCase() === cred));
    }

    if (!user) { alert(lang === 'ar' ? 'بيانات الاعتماد غير صحيحة' : 'Invalid credentials'); return; }
    if (user.active === false) { alert(lang === 'ar' ? 'هذا الحساب معطل' : 'This account is deactivated'); return; }

    if (authMode === 'signup') {
      const pw = String(fd.get('password') || '');
      const cf = String(fd.get('confirm') || '');
      if (!pw || pw !== cf) { alert(lang === 'ar' ? 'كلمتا المرور غير متطابقتين' : 'Passwords do not match'); return; }
      setUsers(prev => prev.map(u => u.id === user.id ? { ...u, password: pw } : u));
      handleLogin({ ...user, password: pw });
    } else {
      const pw = String(fd.get('password') || '');
      if (user.password && user.password !== pw) { alert(lang === 'ar' ? 'كلمة المرور غير صحيحة' : 'Wrong password'); return; }
      handleLogin(user);
    }
  };

  const handleLogout = () => { setIsAuthenticated(false); setCurrentUser(null); };

  const handleStatusChange = (id, newStatus) => {
    const target = requests.find(r => r.id === id);
    setRequests(prev => prev.map(req => req.id === id ? { ...req, status: newStatus } : req));
    if (selectedRequest && selectedRequest.id === id) {
      setSelectedRequest({ ...selectedRequest, status: newStatus });
    }
    if (target) {
      pushNotification(target.patientId,
        `تم تحديث حالة طلبك ${target.id} إلى ${newStatus}`,
        `Your request ${target.id} status was updated to ${newStatus}`);

      // Auto alarm on dispense
      if (newStatus === 'Dispensed' && autoAlarmEnabled) {
        const medName = getText(target.medicationName, 'en');
        setAlarms(prev => [{
          id: `a-${Date.now()}`,
          userId: target.patientId,
          medication: medName,
          time: '08:00',
          auto: true,
        }, ...prev]);
        pushNotification(target.patientId, t.alarmCreatedAuto, TRANSLATIONS.en.alarmCreatedAuto);
      }
    }
  };

  const handleSuggestTreatment = async () => {
    if (!reqDiagnosis) return;
    setIsSuggesting(true);
    setAiSuggestions(null);
    const targetLang = lang === 'ar' ? 'Arabic' : 'English';
    const prompt = `You are a clinical AI assistant. The doctor has entered the diagnosis: '${reqDiagnosis}'. Provide a brief list of standard common medications (names only) and a 1-sentence general guideline. Keep it extremely concise. Respond in ${targetLang}.`;
    const response = await callGeminiAPI(prompt);
    setAiSuggestions(response);
    setIsSuggesting(false);
  };

  const handleExplainMedication = async () => {
    if (!selectedRequest) return;
    setIsExplaining(true);
    setAiExplanation(null);
    const medName = getText(selectedRequest.medicationName, 'en');
    const targetLang = lang === 'ar' ? 'Arabic' : 'English';
    const prompt = `Explain the medication '${medName}' in simple terms for a patient. Include what it is for, how it works briefly, and common general advice. Keep it under 3-4 short sentences. Respond in ${targetLang}.`;
    const response = await callGeminiAPI(prompt);
    setAiExplanation(response);
    setIsExplaining(false);
  };

  const handleSubmitRequest = (e) => {
    e.preventDefault();
    if (!currentUser) return;

    let finalMedName, finalDose, finalDuration;

    if (currentUser.role === 'patient') {
      const selectedMed = PATIENT_MEDICATIONS.find(m => m.id === reqMedName);
      if (!selectedMed) return;
      finalMedName = selectedMed.name;
      finalDose = selectedMed.dose;
      finalDuration = selectedMed.duration;
    } else {
      if (!reqMedName || !reqDose || !reqDuration) return;
      finalMedName = { ar: reqMedName, en: reqMedName };
      finalDose = reqDose;
      finalDuration = reqDuration;
    }

    const newReq = {
      id: `REQ-${Math.floor(Math.random() * 1000) + 200}`,
      patientName: currentUser.role === 'patient' ? currentUser.name : { ar: 'مريض جديد', en: 'New Patient' },
      patientId: currentUser.role === 'patient' ? currentUser.id : 'temp-p',
      prescribedBy: currentUser.role === 'doctor' ? currentUser.name : { ar: 'طبيب العائلة', en: 'Family Doctor' },
      medicationName: finalMedName,
      dose: finalDose,
      duration: finalDuration,
      date: new Date().toISOString().split('T')[0],
      status: currentUser.role === 'doctor' ? 'Approved' : 'Pending',
      notes: { ar: reqNotes, en: reqNotes },
      diagnosis: currentUser.role === 'doctor' ? { ar: reqDiagnosis, en: reqDiagnosis } : undefined,
      medType: currentUser.role === 'doctor' ? reqMedType : undefined,
      chronicMonths: currentUser.role === 'doctor' && reqMedType === 'chronic' ? Number(reqChronicMonths) || undefined : undefined,
      mealTiming: currentUser.role === 'doctor' ? reqMealTiming : undefined,
    };

    setRequests([newReq, ...requests]);
    pushNotification(newReq.patientId,
      `تم إنشاء طلب جديد للدواء ${getText(finalMedName, 'ar')}`,
      `New request created for ${getText(finalMedName, 'en')}`);

    setReqMedName(''); setReqDose(''); setReqDuration(''); setReqNotes('');
    setReqDiagnosis(''); setReqMedType('acute'); setReqChronicMonths(''); setReqMealTiming('after');
    setMedSuggestions([]);
    setAiSuggestions(null);
    setCurrentView('requests');
  };

  const handleAddAllergy = (e) => {
    e.preventDefault();
    if (!newAllergy) return;
    setAllergies([...allergies, { id: `al-${Date.now()}`, text: { ar: newAllergy, en: newAllergy } }]);
    setNewAllergy('');
  };

  const onMedNameChange = (val) => {
    setReqMedName(val);
    if (!val) { setMedSuggestions([]); return; }
    const matches = COMMON_MEDS.filter(m => m.toLowerCase().startsWith(val.toLowerCase())).slice(0, 6);
    setMedSuggestions(matches);
  };

  const getStatusDetails = (status) => {
    switch (status) {
      case 'Pending': return { label: t.pending, color: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: <Clock size={16} /> };
      case 'Approved': return { label: t.approved, color: 'bg-indigo-100 text-indigo-800 border-indigo-200', icon: <CheckCircle size={16} /> };
      case 'Rejected': return { label: t.rejected, color: 'bg-red-100 text-red-800 border-red-200', icon: <XCircle size={16} /> };
      case 'Needs Review': return { label: t.needsReview, color: 'bg-orange-100 text-orange-800 border-orange-200', icon: <AlertCircle size={16} /> };
      case 'Dispensed': return { label: t.dispensed, color: 'bg-green-100 text-green-800 border-green-200', icon: <Truck size={16} /> };
      case 'Referred': return { label: t.referred, color: 'bg-gray-100 text-gray-800 border-gray-200', icon: <Activity size={16} /> };
      default: return { label: status, color: 'bg-gray-100 text-gray-800', icon: <Activity size={16} /> };
    }
  };

  const filteredRequests = requests.filter(req => {
    let matchRole = false;
    if (currentUser?.role === 'doctor') matchRole = true;
    else if (currentUser?.role === 'patient') matchRole = req.patientId === currentUser.id;
    else if (currentUser?.role === 'pharmacy') matchRole = ['Approved', 'Dispensed', 'Referred'].includes(req.status);

    const medText = getText(req.medicationName, lang);
    const patText = getText(req.patientName, lang);
    const matchSearch = medText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = statusFilter === 'All' || req.status === statusFilter;

    return matchRole && matchSearch && matchStatus;
  });

  const myNotifications = notifications.filter(n => !currentUser || n.userId === currentUser.id || (currentUser.role === 'admin'));
  const unreadCount = myNotifications.filter(n => !n.read).length;

  if (!isAuthenticated) {
    const credentialFields = () => {
      if (authRole === 'patient') {
        return (
          <div>
            <div className="relative">
              <Cake className={`absolute ${lang === 'ar' ? 'right-4' : 'left-4'} top-3.5 text-gray-400`} size={18} />
              <input name="cred" type="text" required placeholder={`${t.mrnOrDob} (${t.dobFormat})`}
                className={`w-full bg-gray-50 border border-gray-200 rounded-xl py-3 outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all ${lang === 'ar' ? 'pr-12 pl-4 text-right' : 'pl-12 pr-4 text-left'}`} />
            </div>
          </div>
        );
      }
      if (authRole === 'doctor') {
        return (
          <div>
            <div className="relative">
              <Stethoscope className={`absolute ${lang === 'ar' ? 'right-4' : 'left-4'} top-3.5 text-gray-400`} size={18} />
              <input name="reg" type="text" required placeholder={t.regNumber}
                className={`w-full bg-gray-50 border border-gray-200 rounded-xl py-3 outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all ${lang === 'ar' ? 'pr-12 pl-4 text-right' : 'pl-12 pr-4 text-left'}`} />
            </div>
          </div>
        );
      }
      return (
        <div>
          <div className="relative">
            <Mail className={`absolute ${lang === 'ar' ? 'right-4' : 'left-4'} top-3.5 text-gray-400`} size={18} />
            <input name="cred" type="text" required placeholder={`${t.username} / ${t.email}`}
              className={`w-full bg-gray-50 border border-gray-200 rounded-xl py-3 outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all ${lang === 'ar' ? 'pr-12 pl-4 text-right' : 'pl-12 pr-4 text-left'}`} />
          </div>
        </div>
      );
    };

    return (
      <div dir={lang === 'ar' ? 'rtl' : 'ltr'} className={`min-h-screen bg-[#F8FAFC] flex flex-col justify-center items-center p-4 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
        <div className="absolute top-6 right-6 left-6 flex justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-lg shadow-indigo-200"><HeartPulse size={24} /></div>
            <h1 className="text-2xl font-black text-gray-800 tracking-tight">{t.appTitle}<span className="text-indigo-600">{t.appTitleHighlight}</span></h1>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setShowHelp(true)} className="flex items-center gap-2 px-3 py-2 bg-white shadow-sm hover:bg-gray-50 border border-gray-100 text-gray-700 rounded-xl font-bold transition-all" title={t.help}>
              <HelpCircle size={18} />
            </button>
            <button onClick={() => setShowHotline(true)} className="flex items-center gap-2 px-3 py-2 bg-white shadow-sm hover:bg-gray-50 border border-gray-100 text-red-600 rounded-xl font-bold transition-all" title={t.hotline}>
              <Phone size={18} />
            </button>
            <button onClick={toggleLanguage} className="flex items-center gap-2 px-4 py-2 bg-white shadow-sm hover:bg-gray-50 border border-gray-100 text-gray-700 rounded-xl font-bold transition-all">
              <Globe size={18} /> <span className="pt-0.5">{lang === 'ar' ? 'English' : 'عربي'}</span>
            </button>
          </div>
        </div>

        <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl w-full max-w-md text-center border border-gray-100 fade-in">
          <h2 className="text-3xl font-black text-gray-800 mb-2">{t.loginTitle}</h2>
          <p className="text-gray-500 mb-6">{t.loginSubtitle}</p>

          <div className="grid grid-cols-4 bg-gray-100 p-1 rounded-xl mb-4 text-xs">
            {['patient', 'doctor', 'pharmacy', 'admin'].map(r => (
              <button key={r} onClick={() => setAuthRole(r)}
                className={`py-2 rounded-lg font-bold transition-colors ${authRole === r ? 'bg-white shadow-sm text-indigo-700' : 'text-gray-500 hover:text-gray-700'}`}>
                {r === 'patient' ? t.patientRole : r === 'doctor' ? t.doctorRole : r === 'pharmacy' ? t.pharmacyRole : t.adminRole}
              </button>
            ))}
          </div>

          <div className="flex bg-gray-100 p-1 rounded-xl mb-6">
            <button onClick={() => setAuthMode('signin')} className={`flex-1 py-2 rounded-lg font-bold text-sm transition-colors ${authMode === 'signin' ? 'bg-white shadow-sm text-indigo-700' : 'text-gray-500 hover:text-gray-700'}`}>{t.signIn}</button>
            <button onClick={() => setAuthMode('signup')} className={`flex-1 py-2 rounded-lg font-bold text-sm transition-colors ${authMode === 'signup' ? 'bg-white shadow-sm text-indigo-700' : 'text-gray-500 hover:text-gray-700'}`}>{t.signUp}</button>
          </div>

          {authMode === 'signup' && (
            <p className="text-xs text-gray-500 bg-indigo-50 border border-indigo-100 rounded-lg p-2 mb-4">{t.signupHint}</p>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4 mb-6 text-left" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
            {credentialFields()}
            <div>
              <div className="relative">
                <Lock className={`absolute ${lang === 'ar' ? 'right-4' : 'left-4'} top-3.5 text-gray-400`} size={18} />
                <input name="password" type="password" required placeholder={authMode === 'signup' ? t.setPassword : t.password}
                  className={`w-full bg-gray-50 border border-gray-200 rounded-xl py-3 outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all ${lang === 'ar' ? 'pr-12 pl-4 text-right' : 'pl-12 pr-4 text-left'}`} />
              </div>
            </div>
            {authMode === 'signup' && (
              <div>
                <div className="relative">
                  <KeyRound className={`absolute ${lang === 'ar' ? 'right-4' : 'left-4'} top-3.5 text-gray-400`} size={18} />
                  <input name="confirm" type="password" required placeholder={t.confirmPassword}
                    className={`w-full bg-gray-50 border border-gray-200 rounded-xl py-3 outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all ${lang === 'ar' ? 'pr-12 pl-4 text-right' : 'pl-12 pr-4 text-left'}`} />
                </div>
              </div>
            )}
            <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-md shadow-indigo-200 mt-2">
              {authMode === 'signin' ? t.signIn : t.signUp}
            </button>
          </form>

          <div className="relative flex py-2 items-center mb-6">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink-0 mx-4 text-gray-400 text-xs uppercase font-semibold">OR</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          <button onClick={() => handleLogin(SEED_USERS[2])} className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-100 hover:bg-gray-50 text-gray-700 font-bold py-3 rounded-xl transition-all mb-8">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            {t.googleSignIn}
          </button>

          <div className="flex items-start gap-2 bg-green-50 p-3 rounded-lg text-left text-green-800" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
            <ShieldCheck size={18} className="shrink-0 mt-0.5 text-green-600" />
            <p className="text-xs font-medium leading-relaxed">{t.privacyNotice}</p>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100">
            <p className="text-xs text-gray-400 font-bold mb-3 uppercase tracking-wider">{t.demoLogins}</p>
            <div className="flex flex-wrap justify-center gap-2">
              {['patient', 'doctor', 'pharmacy', 'admin'].map(role => {
                const user = SEED_USERS.find(u => u.role === role);
                if (!user) return null;
                return (
                  <button key={role} onClick={() => handleLogin(user)} className="px-3 py-1.5 bg-gray-100 hover:bg-indigo-100 text-gray-600 hover:text-indigo-700 text-xs font-bold rounded-lg transition-colors capitalize">
                    {role === 'doctor' ? t.doctorRole : role === 'patient' ? t.patientRole : role === 'pharmacy' ? t.pharmacyRole : t.adminRole}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <HelpModal open={showHelp} onClose={() => setShowHelp(false)} t={t} />
        <HotlineModal open={showHotline} onClose={() => setShowHotline(false)} t={t} />
      </div>
    );
  }

  // ---------------- Nav ----------------
  const navItems = [
    { id: 'dashboard', label: t.dashboard, icon: <Home size={20} />, roles: ['admin', 'doctor', 'patient', 'pharmacy'] },
    { id: 'profile', label: t.profile, icon: <User size={20} />, roles: ['patient', 'doctor', 'pharmacy', 'admin'] },
    { id: 'manage-profiles', label: t.manageProfiles, icon: <UserPlus size={20} />, roles: ['admin'] },
    { id: 'admin-support', label: t.customerSupport, icon: <MessageSquare size={20} />, roles: ['admin'] },
    { id: 'new-request', label: currentUser?.role === 'doctor' ? t.addMedication : t.newRequest, icon: <PlusCircle size={20} />, roles: ['doctor', 'patient'] },
    { id: 'requests', label: t.requestsList, icon: <List size={20} />, roles: ['doctor', 'patient', 'pharmacy'] },
    { id: 'history', label: t.history, icon: <History size={20} />, roles: ['doctor', 'patient'] },
    { id: 'alarms', label: t.alarms, icon: <AlarmClock size={20} />, roles: ['patient'] },
    { id: 'notifications', label: t.notifications, icon: <Bell size={20} />, roles: ['admin', 'doctor', 'patient', 'pharmacy'] },
    { id: 'settings', label: t.settings, icon: <Settings size={20} />, roles: ['admin', 'doctor', 'patient', 'pharmacy'] },
    { id: 'support', label: t.support, icon: <HelpCircle size={20} />, roles: ['doctor', 'patient', 'pharmacy'] },
  ];
  const visibleNavItems = navItems.filter(item => currentUser && item.roles.includes(currentUser.role));

  // ---------------- Views ----------------
  const renderDashboard = () => {
    if (currentUser.role === 'admin') {
      const patientCount = users.filter(u => u.role === 'patient').length;
      const doctorCount = users.filter(u => u.role === 'doctor').length;
      const pharmacyCount = users.filter(u => u.role === 'pharmacy').length;
      const openCorrections = corrections.filter(c => c.status === 'open').length;
      const openTickets = tickets.filter(tk => tk.status === 'open').length;
      return (
        <div className="space-y-6 fade-in">
          <h2 className="text-2xl font-bold text-gray-800">{t.welcome} {getText(currentUser.name, lang)}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="surface bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
              <div><p className="text-sm text-gray-500 mb-1">{t.patientRole}</p><p className="text-3xl font-bold text-gray-800">{patientCount}</p></div>
              <div className="p-4 bg-indigo-50 text-indigo-600 rounded-xl"><User size={28} /></div>
            </div>
            <div className="surface bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
              <div><p className="text-sm text-gray-500 mb-1">{t.doctorRole}</p><p className="text-3xl font-bold text-gray-800">{doctorCount}</p></div>
              <div className="p-4 bg-indigo-50 text-indigo-600 rounded-xl"><Stethoscope size={28} /></div>
            </div>
            <div className="surface bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
              <div><p className="text-sm text-gray-500 mb-1">{t.pharmacyRole}</p><p className="text-3xl font-bold text-gray-800">{pharmacyCount}</p></div>
              <div className="p-4 bg-indigo-50 text-indigo-600 rounded-xl"><Briefcase size={28} /></div>
            </div>
            <div className="surface bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
              <div><p className="text-sm text-gray-500 mb-1">{t.correctionRequests}</p><p className="text-3xl font-bold text-amber-600">{openCorrections}</p></div>
              <div className="p-4 bg-amber-50 text-amber-600 rounded-xl"><AlertCircle size={28} /></div>
            </div>
            <div className="surface bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
              <div><p className="text-sm text-gray-500 mb-1">{t.supportTickets}</p><p className="text-3xl font-bold text-indigo-600">{openTickets}</p></div>
              <div className="p-4 bg-indigo-50 text-indigo-600 rounded-xl"><MessageSquare size={28} /></div>
            </div>
          </div>
        </div>
      );
    }

    const pendingCount = filteredRequests.filter(r => r.status === 'Pending').length;
    const actionCount = filteredRequests.filter(r => r.status === 'Approved').length;

    return (
      <div className="space-y-6 fade-in">
        <h2 className="text-2xl font-bold text-gray-800">{t.welcome} {getText(currentUser.name, lang)}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="surface bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div><p className="text-sm text-gray-500 mb-1">{t.totalReqs}</p><p className="text-3xl font-bold text-gray-800">{filteredRequests.length}</p></div>
            <div className="p-4 bg-indigo-50 text-indigo-600 rounded-xl"><FileText size={28} /></div>
          </div>
          {currentUser.role !== 'pharmacy' && (
            <div className="surface bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
              <div><p className="text-sm text-gray-500 mb-1">{t.pending}</p><p className="text-3xl font-bold text-yellow-600">{pendingCount}</p></div>
              <div className="p-4 bg-yellow-50 text-yellow-600 rounded-xl"><Clock size={28} /></div>
            </div>
          )}
          <div className="surface bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div><p className="text-sm text-gray-500 mb-1">{t.approved}</p><p className="text-3xl font-bold text-green-600">{actionCount}</p></div>
            <div className="p-4 bg-green-50 text-green-600 rounded-xl"><CheckCircle size={28} /></div>
          </div>
        </div>

        <div className="surface bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center">
            <h3 className="text-lg font-bold text-gray-800">{t.latestReqs}</h3>
            <button onClick={() => setCurrentView('requests')} className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">{t.viewAll}</button>
          </div>
          <div className="divide-y divide-gray-50">
            {filteredRequests.slice(0, 4).map(req => (
              <div key={req.id} className="p-4 hover:bg-gray-50 flex items-center justify-between transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-full ${getStatusDetails(req.status).color}`}>{getStatusDetails(req.status).icon}</div>
                  <div>
                    <p className="font-semibold text-gray-800">{getText(req.medicationName, lang)} <span className="text-gray-400 text-sm ml-1">({req.dose})</span></p>
                    <p className="text-xs text-gray-500">{currentUser.role !== 'patient' ? getText(req.patientName, lang) : req.id} • {req.date}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedRequest(req)} className="p-2 text-gray-400 hover:text-indigo-600 rounded-lg hover:bg-indigo-50"><Eye size={20} /></button>
              </div>
            ))}
            {filteredRequests.length === 0 && <div className="p-6 text-center text-gray-400">{t.noReqs}</div>}
          </div>
        </div>
      </div>
    );
  };

  const renderNewRequest = () => (
    <div className="max-w-3xl mx-auto space-y-6 fade-in">
      <h2 className="text-2xl font-bold text-gray-800">{currentUser.role === 'doctor' ? t.addMedication : t.newReqTitle}</h2>

      <div className="surface bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <form onSubmit={handleSubmitRequest} className="space-y-6">
          {currentUser.role === 'doctor' ? (
            <>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">{t.diagnosis}</label>
                <div className="flex flex-col md:flex-row gap-2">
                  <input type="text" value={reqDiagnosis} onChange={e => setReqDiagnosis(e.target.value)} placeholder={t.diagnosis}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none" />
                  <button 
                    type="button" 
                    onClick={handleSuggestTreatment} 
                    disabled={!reqDiagnosis || isSuggesting}
                    className="shrink-0 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 disabled:opacity-50 disabled:cursor-not-allowed border border-indigo-200 px-4 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors">
                    <Sparkles size={18} /> <span className="hidden md:inline">{t.aiSuggestBtn}</span>
                  </button>
                </div>

                {isSuggesting && (
                  <div className="mt-3 text-sm text-indigo-600 flex items-center gap-2 animate-pulse">
                    <Wand2 size={16} /> {t.aiLoading}
                  </div>
                )}
                
                {aiSuggestions && !isSuggesting && (
                  <div className="mt-4 p-4 bg-indigo-50 border border-indigo-200 rounded-xl">
                    <p className="text-sm font-bold text-indigo-800 flex items-center gap-2 mb-2"><Sparkles size={16} /> {t.aiSuggestTitle}</p>
                    <p className="text-sm text-indigo-900 whitespace-pre-wrap leading-relaxed">{aiSuggestions}</p>
                    <p className="text-[10px] text-indigo-400 mt-3 border-t border-indigo-100 pt-2">{t.aiDisclaimer}</p>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2 relative">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{t.medName}</label>
                  <input type="text" required value={reqMedName} onChange={e => onMedNameChange(e.target.value)} placeholder={t.medSearchHint}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none" autoComplete="off" />
                  {medSuggestions.length > 0 && (
                    <div className="absolute z-10 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg w-full max-h-56 overflow-y-auto">
                      {medSuggestions.map(s => (
                        <button type="button" key={s} onClick={() => { setReqMedName(s); setMedSuggestions([]); }}
                          className="w-full text-left px-4 py-2 hover:bg-indigo-50 flex items-center gap-2">
                          <Pill size={16} className="text-indigo-500" /> {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{t.medDose}</label>
                  <input type="text" required value={reqDose} onChange={e => setReqDose(e.target.value)} placeholder={t.dosePlaceholder} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{t.medDuration}</label>
                  <input type="number" required value={reqDuration} onChange={e => setReqDuration(e.target.value)} placeholder={t.durationPlaceholder} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{t.medType}</label>
                  <div className="flex gap-2">
                    {['acute', 'chronic'].map(v => (
                      <button type="button" key={v} onClick={() => setReqMedType(v)}
                        className={`flex-1 py-2.5 rounded-xl border text-sm font-bold transition-colors ${reqMedType === v ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}>
                        {v === 'acute' ? t.acute : t.chronic}
                      </button>
                    ))}
                  </div>
                </div>
                {reqMedType === 'chronic' && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">{t.chronicMonths}</label>
                    <input type="number" min={1} value={reqChronicMonths} onChange={e => setReqChronicMonths(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none" />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">{t.mealTiming}</label>
                <div className="flex gap-2">
                  {['before', 'with', 'after'].map(v => (
                    <button type="button" key={v} onClick={() => setReqMealTiming(v)}
                      className={`flex-1 py-2.5 rounded-xl border text-sm font-bold transition-colors ${reqMealTiming === v ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}>
                      {v === 'before' ? t.beforeMeal : v === 'after' ? t.afterMeal : t.withMeal}
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">{t.selectRefill}</label>
              <select required value={reqMedName} onChange={e => setReqMedName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none appearance-none bg-transparent">
                <option value="" disabled>-- {t.selectRefill} --</option>
                {PATIENT_MEDICATIONS.map(med => (
                  <option key={med.id} value={med.id}>{getText(med.name, lang)} ({med.dose})</option>
                ))}
              </select>

              {reqMedName && (() => {
                const med = PATIENT_MEDICATIONS.find(m => m.id === reqMedName);
                if (!med) return null;
                const today = new Date('2026-04-23');
                const due = new Date(med.nextRefillDate);
                const isReady = today >= due;
                return (
                  <div className={`mt-3 p-3 rounded-lg border flex items-center gap-2 text-sm font-semibold ${isReady ? 'bg-green-50 border-green-200 text-green-700' : 'bg-yellow-50 border-yellow-200 text-yellow-700'}`}>
                    {isReady ? <CheckCircle size={18} /> : <Clock size={18} />}
                    {isReady ? t.refillReady : `${t.refillDue} ${med.nextRefillDate}`}
                  </div>
                );
              })()}
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">{t.notes}</label>
            <textarea rows={3} value={reqNotes} onChange={e => setReqNotes(e.target.value)} placeholder={t.notesPlaceholder} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"></textarea>
          </div>
          <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2">
            <PlusCircle size={20} /> <span>{t.createBtn}</span>
          </button>
        </form>
      </div>
    </div>
  );

  const renderRequestsList = () => (
    <div className="space-y-6 fade-in">
      <div className="flex justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-800">{t.reqListTitle}</h2>
        {['patient', 'doctor'].includes(currentUser.role) && (
          <button onClick={() => setCurrentView('new-request')} className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 flex items-center gap-2">
            <PlusCircle size={18} /> {currentUser.role === 'doctor' ? t.addMedication : t.newRequest}
          </button>
        )}
      </div>

      <div className="surface bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className={`absolute ${lang === 'ar' ? 'right-3' : 'left-3'} top-3 text-gray-400`} size={20} />
          <input type="text" placeholder={t.searchPlaceholder} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className={`w-full py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none ${lang === 'ar' ? 'pr-10 pl-4' : 'pl-10 pr-4'}`} />
        </div>
        <div className="relative md:w-64">
          <Filter className={`absolute ${lang === 'ar' ? 'right-3' : 'left-3'} top-3 text-gray-400`} size={20} />
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className={`w-full py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none appearance-none ${lang === 'ar' ? 'pr-10 pl-4' : 'pl-10 pr-4'}`}>
            <option value="All">{t.allStatuses}</option>
            <option value="Pending">{t.pending}</option>
            <option value="Approved">{t.approved}</option>
            <option value="Dispensed">{t.dispensed}</option>
            <option value="Rejected">{t.rejected}</option>
          </select>
        </div>
      </div>

      <div className="surface bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className={`w-full whitespace-nowrap ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
            <thead className="bg-gray-50 text-gray-500 text-sm">
              <tr>
                <th className="px-6 py-4 font-semibold">{t.colId}</th>
                {currentUser.role !== 'patient' && <th className="px-6 py-4 font-semibold">{t.colPatient}</th>}
                <th className="px-6 py-4 font-semibold">{t.colMed}</th>
                <th className="px-6 py-4 font-semibold">{t.colDate}</th>
                <th className="px-6 py-4 font-semibold">{t.colStatus}</th>
                <th className="px-6 py-4 font-semibold text-center">{t.colActions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredRequests.map(req => {
                const statusInfo = getStatusDetails(req.status);
                return (
                  <tr key={req.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-800">{req.id}</td>
                    {currentUser.role !== 'patient' && <td className="px-6 py-4 text-gray-600">{getText(req.patientName, lang)}</td>}
                    <td className="px-6 py-4 font-medium text-indigo-600">{getText(req.medicationName, lang)}</td>
                    <td className="px-6 py-4 text-gray-500">{req.date}</td>
                    <td className="px-6 py-4"><span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border ${statusInfo.color}`}>{statusInfo.icon} {statusInfo.label}</span></td>
                    <td className="px-6 py-4 text-center">
                      <button onClick={() => { setSelectedRequest(req); setAiExplanation(null); setIsExplaining(false); }} className="text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors">{t.viewDetails}</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderPatientHistory = () => {
    if (currentUser.role === 'doctor' && !selectedPatientId) {
      const allPatients = users.filter(u => u.role === 'patient');
      const q = patientSearch.trim().toLowerCase();
      const patientList = q
        ? allPatients.filter(p => getText(p.name, 'ar').toLowerCase().includes(q) || getText(p.name, 'en').toLowerCase().includes(q) || (p.mrn || '').toLowerCase().includes(q))
        : allPatients;
      return (
        <div className="space-y-6 fade-in">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{t.patientsList}</h2>
            <p className="text-sm text-gray-500 mt-1">{t.selectPatientPrompt}</p>
          </div>
          {allPatients.length > 0 && (
            <div className="relative">
              <Search size={16} className="absolute top-1/2 -translate-y-1/2 start-3 text-gray-400 pointer-events-none" />
              <input value={patientSearch} onChange={e => setPatientSearch(e.target.value)} placeholder={t.searchPatients}
                className="w-full ps-10 pe-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 text-sm" />
            </div>
          )}
          {allPatients.length === 0 && (
            <div className="surface bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center text-gray-400">{t.noPatients}</div>
          )}
          {allPatients.length > 0 && patientList.length === 0 && (
            <div className="surface bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center text-gray-400">{t.noPatientsMatch}</div>
          )}
          <div className="grid md:grid-cols-2 gap-4">
            {patientList.map(p => (
              <button key={p.id} onClick={() => setSelectedPatientId(p.id)} className="text-start surface bg-white rounded-2xl shadow-sm border border-gray-100 hover:border-indigo-300 hover:shadow-md transition p-4 flex items-center gap-3">
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl"><User size={24} /></div>
                <div className="flex-1">
                  <p className="font-bold text-gray-800">{getText(p.name, lang)}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{t.mrn}: <span className="font-mono">{p.mrn}</span></p>
                  {p.phone && <p className="text-xs text-gray-500">{t.phone}: {p.phone}</p>}
                </div>
                <Eye size={18} className="text-gray-400" />
              </button>
            ))}
          </div>
        </div>
      );
    }

    const selectedPatient = currentUser.role === 'doctor'
      ? users.find(u => u.id === selectedPatientId)
      : currentUser;

    return (
    <div className="space-y-6 fade-in">
      {currentUser.role === 'doctor' && selectedPatient && (
        <>
          <button onClick={() => setSelectedPatientId(null)} className="text-sm font-bold text-indigo-600 hover:text-indigo-800">{t.backToPatients}</button>
          <div className="surface bg-white rounded-2xl shadow-sm border border-indigo-100 p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-indigo-100 text-indigo-700 rounded-xl"><User size={28} /></div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">{getText(selectedPatient.name, lang)}</h3>
                <p className="text-xs text-gray-500">{t.mrn}: <span className="font-mono">{selectedPatient.mrn}</span></p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              {selectedPatient.dob && <div><p className="text-xs text-gray-500">{t.dob}</p><p className="font-bold text-gray-800">{selectedPatient.dob}</p></div>}
              {selectedPatient.phone && <div><p className="text-xs text-gray-500">{t.phone}</p><p className="font-bold text-gray-800">{selectedPatient.phone}</p></div>}
              {selectedPatient.weight && <div><p className="text-xs text-gray-500">{t.weight}</p><p className="font-bold text-gray-800">{selectedPatient.weight} kg</p></div>}
              {selectedPatient.height && <div><p className="text-xs text-gray-500">{t.height}</p><p className="font-bold text-gray-800">{selectedPatient.height} cm</p></div>}
            </div>
          </div>
        </>
      )}
      
      <div className="surface bg-white rounded-2xl shadow-sm border border-red-100 overflow-hidden">
        <div className="bg-red-50 p-4 border-b border-red-100 flex justify-between items-center">
          <h3 className="font-bold text-red-800 flex items-center gap-2"><AlertCircle size={20} /> {t.allergiesTitle}</h3>
        </div>
        <div className="p-6">
          <div className="flex flex-wrap gap-2 mb-4">
            {allergies.map(alg => (
              editingAllergyId === alg.id && currentUser.role === 'doctor' ? (
                <form key={alg.id} onSubmit={e => {
                  e.preventDefault();
                  if (!editingAllergyText.trim()) return;
                  setAllergies(prev => prev.map(a => a.id === alg.id ? { ...a, text: { ar: editingAllergyText, en: editingAllergyText } } : a));
                  setEditingAllergyId(null);
                }} className="flex items-center gap-1 bg-white border border-red-300 rounded-lg px-2 py-1 shadow-sm">
                  <input autoFocus value={editingAllergyText} onChange={e => setEditingAllergyText(e.target.value)} className="text-sm outline-none w-40" />
                  <button type="submit" className="text-green-600 hover:text-green-800" title={t.saved}><CheckCircle size={16} /></button>
                  <button type="button" onClick={() => setEditingAllergyId(null)} className="text-gray-400 hover:text-gray-600" title={t.cancel}><X size={16} /></button>
                </form>
              ) : (
                <span key={alg.id} className="bg-red-100 text-red-800 border border-red-200 ps-3 pe-2 py-1.5 rounded-lg text-sm font-bold flex items-center gap-1 shadow-sm">
                  <XCircle size={14} /> {getText(alg.text, lang)}
                  {currentUser.role === 'doctor' && (
                    <>
                      <button onClick={() => { setEditingAllergyId(alg.id); setEditingAllergyText(getText(alg.text, lang)); }}
                        className="ms-1 text-red-700 hover:text-red-900" title={t.editAllergy}><Edit3 size={13} /></button>
                      <button onClick={() => { if (confirm(t.confirmDeleteAllergy)) setAllergies(prev => prev.filter(a => a.id !== alg.id)); }}
                        className="text-red-700 hover:text-red-900" title={t.deleteAllergy}><X size={14} /></button>
                    </>
                  )}
                </span>
              )
            ))}
            {allergies.length === 0 && <span className="text-gray-500 text-sm">{lang === 'ar' ? 'لا توجد سجلات حساسية.' : 'No allergy records.'}</span>}
          </div>
          {currentUser.role === 'doctor' && (
            <form onSubmit={handleAddAllergy} className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
              <input type="text" required value={newAllergy} onChange={e => setNewAllergy(e.target.value)} placeholder={t.allergyPlaceholder} className="flex-1 px-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-red-400 focus:ring-1 focus:ring-red-400 text-sm" />
              <button type="submit" className="bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 px-4 py-2 rounded-xl text-sm font-bold transition-colors">{t.addAllergy}</button>
            </form>
          )}
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">{t.historyTitle}</h2>
          {currentUser.role === 'doctor' && (
            <button onClick={() => setEditingHistory({})} className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 flex items-center gap-2">
              <PlusCircle size={18} /> {t.addRecord}
            </button>
          )}
        </div>

        {editingHistory !== null && currentUser.role === 'doctor' && (
          <form onSubmit={e => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            const r = {
              id: editingHistory.id || `h-${Date.now()}`,
              date: fd.get('date'),
              diagnosis: { ar: fd.get('d'), en: fd.get('d') },
              notes: { ar: fd.get('n'), en: fd.get('n') },
              followUp: fd.get('followUp') || '',
              prescription: { ar: fd.get('rx') || '', en: fd.get('rx') || '' },
              bp: fd.get('bp') || '',
              temp: fd.get('temp') || '',
              hr: fd.get('hr') || '',
            };
            setPatientHistory(editingHistory.id ? patientHistory.map(h => h.id === r.id ? r : h) : [r, ...patientHistory]);
            setEditingHistory(null);
          }} className="surface bg-white p-6 rounded-2xl shadow-sm border border-indigo-100 mb-6 space-y-4">
            <h3 className="font-bold text-gray-800 border-b pb-2">{editingHistory.id ? t.editRecord : t.addRecord}</h3>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-sm font-semibold mb-1">{t.recordDate}</label><input type="date" name="date" defaultValue={editingHistory.date || ''} required className="w-full px-4 py-2 rounded-xl border border-gray-200" /></div>
              <div><label className="block text-sm font-semibold mb-1">{t.recordDiagnosis}</label><input type="text" name="d" defaultValue={getText(editingHistory.diagnosis, lang)} required className="w-full px-4 py-2 rounded-xl border border-gray-200" /></div>
              <div className="col-span-2"><label className="block text-sm font-semibold mb-1">{t.recordNotes}</label><textarea name="n" defaultValue={getText(editingHistory.notes, lang)} rows={2} className="w-full px-4 py-2 rounded-xl border border-gray-200"></textarea></div>
              <div><label className="block text-sm font-semibold mb-1">{t.followUpDate} <span className="text-xs text-gray-400 font-normal">({t.optionalField})</span></label><input type="date" name="followUp" defaultValue={editingHistory.followUp || ''} className="w-full px-4 py-2 rounded-xl border border-gray-200" /></div>
              <div><label className="block text-sm font-semibold mb-1">{t.bloodPressure} <span className="text-xs text-gray-400 font-normal">({t.optionalField})</span></label><input type="text" name="bp" placeholder="120/80" defaultValue={editingHistory.bp || ''} className="w-full px-4 py-2 rounded-xl border border-gray-200" /></div>
              <div><label className="block text-sm font-semibold mb-1">{t.temperature} <span className="text-xs text-gray-400 font-normal">({t.optionalField})</span></label><input type="text" name="temp" placeholder="37.0" defaultValue={editingHistory.temp || ''} className="w-full px-4 py-2 rounded-xl border border-gray-200" /></div>
              <div><label className="block text-sm font-semibold mb-1">{t.heartRate} <span className="text-xs text-gray-400 font-normal">({t.optionalField})</span></label><input type="text" name="hr" placeholder="72" defaultValue={editingHistory.hr || ''} className="w-full px-4 py-2 rounded-xl border border-gray-200" /></div>
              <div className="col-span-2"><label className="block text-sm font-semibold mb-1">{t.prescription} <span className="text-xs text-gray-400 font-normal">({t.optionalField})</span></label><textarea name="rx" defaultValue={getText(editingHistory.prescription, lang)} rows={2} placeholder={lang === 'ar' ? 'مثال: باراسيتامول 500 ملغ، حبة كل 8 ساعات' : 'e.g. Paracetamol 500mg, 1 tab every 8h'} className="w-full px-4 py-2 rounded-xl border border-gray-200"></textarea></div>
            </div>
            <div className="flex gap-2 justify-end pt-2">
              <button type="button" onClick={() => setEditingHistory(null)} className="px-4 py-2 bg-gray-100 rounded-lg">{t.cancel}</button>
              <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-lg">{t.saveRecord}</button>
            </div>
          </form>
        )}

        <div className="space-y-4">
          {patientHistory.map(record => (
            <div key={record.id} className="surface bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-1 rounded-md">{record.date}</span>
                  <h4 className="font-bold text-indigo-700">{getText(record.diagnosis, lang)}</h4>
                  {record.followUp && <span className="bg-indigo-50 text-indigo-700 text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1"><Clock size={12} /> {t.followUpDate}: {record.followUp}</span>}
                </div>
                {(record.bp || record.temp || record.hr) && (
                  <div className="flex flex-wrap gap-2 mt-2 mb-2">
                    {record.bp && <span className="text-xs bg-rose-50 text-rose-700 border border-rose-100 px-2 py-1 rounded-md font-bold flex items-center gap-1"><HeartPulse size={12} /> {t.bloodPressure}: {record.bp}</span>}
                    {record.temp && <span className="text-xs bg-orange-50 text-orange-700 border border-orange-100 px-2 py-1 rounded-md font-bold">🌡 {record.temp}°C</span>}
                    {record.hr && <span className="text-xs bg-pink-50 text-pink-700 border border-pink-100 px-2 py-1 rounded-md font-bold flex items-center gap-1"><Activity size={12} /> {record.hr} bpm</span>}
                  </div>
                )}
                {record.notes && <p className="text-gray-600 text-sm mt-2">{getText(record.notes, lang)}</p>}
                {getText(record.prescription, lang) && (
                  <div className="mt-3 p-3 bg-indigo-50 border border-indigo-100 rounded-lg">
                    <p className="text-xs font-bold text-indigo-700 flex items-center gap-1 mb-1"><Pill size={12} /> {t.prescription}</p>
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">{getText(record.prescription, lang)}</p>
                  </div>
                )}
              </div>
              {currentUser.role === 'doctor' && <button onClick={() => setEditingHistory(record)} className="h-fit p-2 text-gray-400 hover:text-indigo-600 bg-gray-50 rounded-lg"><Edit3 size={18} /></button>}
            </div>
          ))}
        </div>
      </div>
    </div>
    );
  };

  // ---------------- Patient Profile ----------------
  const startEditProfile = () => {
    if (!currentUser) return;
    setEditPhone(currentUser.phone || '');
    setEditWeight(String(currentUser.weight || ''));
    setEditHeight(String(currentUser.height || ''));
    setEditingProfile(true);
  };

  const saveProfile = () => {
    if (!currentUser) return;
    const updated = { ...currentUser, phone: editPhone, weight: Number(editWeight) || undefined, height: Number(editHeight) || undefined };
    setUsers(prev => prev.map(u => u.id === currentUser.id ? updated : u));
    setCurrentUser(updated);
    setEditingProfile(false);
    pushNotification(currentUser.id, 'تم تحديث بيانات ملفك الشخصي', 'Your profile was updated');
  };

  const submitCorrection = (e) => {
    e.preventDefault();
    if (!currentUser) return;
    const fd = new FormData(e.currentTarget);
    const field = String(fd.get('field') || '');
    const reason = String(fd.get('reason') || '');
    if (!field || !reason) return;
    const c = {
      id: `c-${Date.now()}`, userId: currentUser.id, userName: getText(currentUser.name, 'en'),
      field, reason, date: new Date().toISOString(), status: 'open',
    };
    setCorrections(prev => [c, ...prev]);
    pushNotification(currentUser.id, t.correctionSent, TRANSLATIONS.en.correctionSent);
    setShowCorrection(false);
  };

  const renderProfile = () => {
    if (!currentUser) return null;
    if (currentUser.role !== 'patient') {
      // Generic profile for doctor / pharmacy / admin
      return (
        <div className="max-w-2xl mx-auto fade-in">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">{t.profile}</h2>
          <div className="surface bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-3">
            <Field label={t.fullName} value={getText(currentUser.name, lang)} />
            {currentUser.registrationNumber && <Field label={t.regNumber} value={currentUser.registrationNumber} />}
            {currentUser.specialty && <Field label={t.specialty} value={getText(currentUser.specialty, lang)} />}
            {currentUser.username && <Field label={t.username} value={currentUser.username} />}
            {currentUser.email && <Field label={t.email} value={currentUser.email} />}
            {currentUser.branch && <Field label={t.branch} value={getText(currentUser.branch, lang)} />}
          </div>
        </div>
      );
    }

    return (
      <div className="max-w-3xl mx-auto fade-in space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">{t.profile}</h2>
          <div className="flex gap-2">
            {!editingProfile ? (
              <>
                <button onClick={startEditProfile} className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 flex items-center gap-2">
                  <Edit3 size={16} /> {t.edit}
                </button>
                <button onClick={() => setShowCorrection(true)} className="bg-amber-50 text-amber-700 border border-amber-200 px-4 py-2 rounded-lg text-sm font-medium hover:bg-amber-100 flex items-center gap-2">
                  <AlertCircle size={16} /> {t.requestCorrection}
                </button>
              </>
            ) : (
              <>
                <button onClick={() => setEditingProfile(false)} className="bg-gray-100 px-4 py-2 rounded-lg text-sm font-medium">{t.cancel}</button>
                <button onClick={saveProfile} className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 flex items-center gap-2">
                  <Save size={16} /> {t.save}
                </button>
              </>
            )}
          </div>
        </div>

        <div className="surface bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label={t.mrn} value={currentUser.mrn || '—'} mono />
            <Field label={t.fullName} value={getText(currentUser.name, lang)} />
            <Field label={t.dob} value={currentUser.dob || '—'} />
            <Field label={t.gender} value={currentUser.gender === 'male' ? t.male : currentUser.gender === 'female' ? t.female : '—'} />

            {/* Editable */}
            <EditableField label={t.phone} editing={editingProfile} value={currentUser.phone} edit={editPhone} setEdit={setEditPhone} />
            <EditableField label={t.weight} editing={editingProfile} value={currentUser.weight ? String(currentUser.weight) : ''} edit={editWeight} setEdit={setEditWeight} type="number" />
            <EditableField label={t.height} editing={editingProfile} value={currentUser.height ? String(currentUser.height) : ''} edit={editHeight} setEdit={setEditHeight} type="number" />
          </div>
        </div>

        {showCorrection && (
          <Modal onClose={() => setShowCorrection(false)} title={t.requestCorrection} t={t}>
            <form onSubmit={submitCorrection} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1">{t.correctionFor}</label>
                <select name="field" required className="w-full px-4 py-2 rounded-xl border border-gray-200">
                  <option value="">--</option>
                  <option value="name">{t.fullName}</option>
                  <option value="dob">{t.dob}</option>
                  <option value="gender">{t.gender}</option>
                  <option value="mrn">{t.mrn}</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">{t.correctionReason}</label>
                <textarea name="reason" required rows={3} className="w-full px-4 py-2 rounded-xl border border-gray-200" />
              </div>
              <button type="submit" className="w-full bg-indigo-600 text-white py-2.5 rounded-xl font-bold">{t.submitCorrection}</button>
            </form>
          </Modal>
        )}
      </div>
    );
  };

  // ---------------- Admin: Manage Profiles ----------------
  const handleCreateProfile = (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get('name') || '');
    if (!name) return;

    let newUser;
    if (adminCreateRole === 'admin') {
      const username = String(fd.get('username') || '');
      const email = String(fd.get('email') || '');
      if (users.some(u => u.role === 'admin' && (u.username?.toLowerCase() === username.toLowerCase() || (email && u.email?.toLowerCase() === email.toLowerCase())))) {
        alert(lang === 'ar' ? 'اسم المستخدم أو البريد مستخدم بالفعل' : 'Username or email already exists');
        return;
      }
      newUser = {
        id: `admin-${Date.now()}`, role: 'admin', name: { ar: name, en: name },
        username, email,
      };
    } else if (adminCreateRole === 'patient') {
      const existingMrns = users.filter(u => u.role === 'patient' && u.mrn).map(u => u.mrn);
      const mrn = nextMRN(existingMrns);
      newUser = {
        id: `pat-${Date.now()}`, role: 'patient', name: { ar: name, en: name }, mrn,
        dob: String(fd.get('dob') || ''), gender: String(fd.get('gender') || 'male'),
        phone: String(fd.get('phone') || ''),
        weight: Number(fd.get('weight') || 0) || undefined,
        height: Number(fd.get('height') || 0) || undefined,
      };
    } else if (adminCreateRole === 'doctor') {
      const reg = String(fd.get('reg') || '').trim();
      if (!reg) { alert(lang === 'ar' ? 'رقم التسجيل مطلوب' : 'Registration Number is required'); return; }
      if (users.some(u => u.role === 'doctor' && u.registrationNumber?.toLowerCase() === reg.toLowerCase())) {
        alert(lang === 'ar' ? 'رقم التسجيل مستخدم بالفعل' : 'Registration Number already exists');
        return;
      }
      const spec = String(fd.get('spec') || '');
      const specObj = SPECIALTIES.find(s => s.en === spec) || { ar: spec, en: spec };
      newUser = {
        id: `doc-${Date.now()}`, role: 'doctor', name: { ar: name, en: name },
        registrationNumber: reg,
        specialty: { ar: specObj.ar, en: specObj.en },
      };
    } else {
      newUser = {
        id: `pharm-${Date.now()}`, role: 'pharmacy', name: { ar: name, en: name },
        username: String(fd.get('username') || ''),
        email: String(fd.get('email') || ''),
        branch: { ar: String(fd.get('branch') || ''), en: String(fd.get('branch') || '') },
      };
    }
    setUsers(prev => [...prev, newUser]);
    logAudit('created', newUser);
    e.target.reset();
    alert(t.profileCreated);
  };

  const renderManageProfiles = () => (
    <div className="max-w-5xl mx-auto fade-in space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">{t.manageProfiles}</h2>

      <div className="surface bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><UserPlus size={20} className="text-indigo-600" /> {t.createProfile}</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {['patient', 'doctor', 'pharmacy', 'admin'].map(r => (
            <button key={r} onClick={() => setAdminCreateRole(r)}
              className={`px-4 py-2 rounded-xl text-sm font-bold border transition-colors ${adminCreateRole === r ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}>
              {r === 'patient' ? t.patientRole : r === 'doctor' ? t.doctorRole : r === 'pharmacy' ? t.pharmacyRole : t.adminRole}
            </button>
          ))}
        </div>

        <form onSubmit={handleCreateProfile} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input name="name" label={t.fullName} required />
          {adminCreateRole === 'patient' && (
            <>
              <div className="md:col-span-2 bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs rounded-lg p-2">{t.autoMrnNote}</div>
              <Input name="dob" label={t.dob} type="date" required />
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">{t.gender}</label>
                <select name="gender" className="w-full px-4 py-2 rounded-xl border border-gray-200">
                  <option value="male">{t.male}</option>
                  <option value="female">{t.female}</option>
                </select>
              </div>
              <Input name="phone" label={t.phone} />
              <Input name="weight" label={t.weight} type="number" />
              <Input name="height" label={t.height} type="number" />
            </>
          )}
          {adminCreateRole === 'doctor' && (
            <>
              <Input name="reg" label={t.regNumber} required />
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">{t.specialty} *</label>
                <select name="spec" required defaultValue="" className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-white">
                  <option value="" disabled>--</option>
                  {SPECIALTIES.map(s => (
                    <option key={s.en} value={s.en}>{getText(s, lang)}</option>
                  ))}
                </select>
              </div>
            </>
          )}
          {adminCreateRole === 'pharmacy' && (
            <>
              <Input name="username" label={t.username} required />
              <Input name="email" label={t.email} type="email" />
              <Input name="branch" label={t.branch} />
            </>
          )}
          {adminCreateRole === 'admin' && (
            <>
              <Input name="username" label={t.username} required />
              <Input name="email" label={t.email} type="email" />
            </>
          )}
          <div className="md:col-span-2">
            <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-6 rounded-xl transition-colors flex items-center gap-2">
              <PlusCircle size={18} /> {t.createProfile}
            </button>
          </div>
        </form>
      </div>

      {/* Existing users grouped */}
      {['admin', 'patient', 'doctor', 'pharmacy'].map(role => (
        <div key={role} className="surface bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-bold text-gray-800 capitalize flex items-center gap-2">
              {role === 'patient' && <User size={18} className="text-indigo-600" />}
              {role === 'doctor' && <Stethoscope size={18} className="text-indigo-600" />}
              {role === 'pharmacy' && <Briefcase size={18} className="text-indigo-600" />}
              {role === 'admin' && <ShieldCheck size={18} className="text-indigo-600" />}
              {role === 'patient' ? t.patientRole : role === 'doctor' ? t.doctorRole : role === 'pharmacy' ? t.pharmacyRole : t.adminRole}
            </h3>
            <span className="text-xs text-gray-500">{users.filter(u => u.role === role).length}</span>
          </div>
          <div className="divide-y divide-gray-100">
            {users.filter(u => u.role === role).map(u => (
              <div key={u.id} className="p-4 flex justify-between items-center text-sm">
                <div>
                  <p className="font-bold text-gray-800">{getText(u.name, lang)}</p>
                  <p className="text-xs text-gray-500">
                    {u.mrn && `MRN: ${u.mrn}`}
                    {u.registrationNumber && `${t.regNumber}: ${u.registrationNumber}`}
                    {u.username && `${t.username}: ${u.username}`}
                    {u.specialty && ` • ${getText(u.specialty, lang)}`}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {u.active === false && <span className="text-[10px] font-bold uppercase bg-gray-100 text-gray-500 border border-gray-200 px-2 py-0.5 rounded">{t.deactivated}</span>}
                  <button onClick={() => setEditUser(u)} className="text-xs bg-indigo-50 text-indigo-700 border border-indigo-200 px-3 py-1.5 rounded-lg font-bold flex items-center gap-1">
                    <Edit3 size={14} /> {t.edit}
                  </button>
                  <button onClick={() => {
                    const pw = prompt(t.newPassword);
                    if (!pw) return;
                    setUsers(prev => prev.map(x => x.id === u.id ? { ...x, password: pw } : x));
                    logAudit('password_reset', u);
                    alert(t.passwordResetDone);
                  }} className="text-xs bg-purple-50 text-purple-700 border border-purple-200 px-3 py-1.5 rounded-lg font-bold flex items-center gap-1" title={t.resetPassword}>
                    <KeyRound size={14} />
                  </button>
                  {u.id !== currentUser?.id && (
                    <>
                      <button onClick={() => {
                        const willDeactivate = u.active !== false;
                        if (!confirm(willDeactivate
                          ? (lang === 'ar' ? `تعطيل حساب ${getText(u.name, lang)}؟` : `Deactivate ${getText(u.name, lang)}?`)
                          : (lang === 'ar' ? `إعادة تفعيل حساب ${getText(u.name, lang)}؟` : `Reactivate ${getText(u.name, lang)}?`))) return;
                        setUsers(prev => prev.map(x => x.id === u.id ? { ...x, active: !willDeactivate } : x));
                        logAudit(willDeactivate ? 'deactivated' : 'activated', u);
                      }} className={`text-xs px-3 py-1.5 rounded-lg font-bold flex items-center gap-1 border ${u.active === false ? 'bg-green-50 text-green-700 border-green-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
                        {u.active === false ? t.activate : t.deactivate}
                      </button>
                      <button onClick={() => {
                        if (!confirm(lang === 'ar' ? `حذف حساب ${getText(u.name, lang)} نهائياً؟` : `Permanently delete ${getText(u.name, lang)}?`)) return;
                        setUsers(prev => prev.filter(x => x.id !== u.id));
                        logAudit('deleted', u);
                      }} className="text-xs bg-red-50 text-red-700 border border-red-200 px-3 py-1.5 rounded-lg font-bold flex items-center gap-1">
                        <X size={14} /> {t.delete}
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {editUser && (
        <Modal onClose={() => setEditUser(null)} title={`${t.edit} — ${getText(editUser.name, lang)}`} t={t}>
          <form onSubmit={(e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            const name = String(fd.get('name') || '');
            const updated = { ...editUser, name: { ar: name, en: name } };
            if (editUser.role === 'patient') {
              updated.phone = String(fd.get('phone') || '');
              updated.weight = Number(fd.get('weight') || 0) || undefined;
              updated.height = Number(fd.get('height') || 0) || undefined;
              updated.dob = String(fd.get('dob') || '');
              updated.gender = String(fd.get('gender') || 'male');
            } else if (editUser.role === 'doctor') {
              const reg = String(fd.get('reg') || '').trim();
              if (users.some(u => u.id !== editUser.id && u.role === 'doctor' && u.registrationNumber?.toLowerCase() === reg.toLowerCase())) {
                alert(lang === 'ar' ? 'رقم التسجيل مستخدم بالفعل' : 'Registration Number already exists'); return;
              }
              updated.registrationNumber = reg;
              const spec = String(fd.get('spec') || '');
              const so = SPECIALTIES.find(s => s.en === spec) || { ar: spec, en: spec };
              updated.specialty = so;
            } else if (editUser.role === 'pharmacy') {
              updated.username = String(fd.get('username') || '');
              updated.email = String(fd.get('email') || '');
              updated.branch = { ar: String(fd.get('branch') || ''), en: String(fd.get('branch') || '') };
            } else if (editUser.role === 'admin') {
              updated.username = String(fd.get('username') || '');
              updated.email = String(fd.get('email') || '');
            }
            setUsers(prev => prev.map(u => u.id === editUser.id ? updated : u));
            if (currentUser?.id === editUser.id) setCurrentUser(updated);
            logAudit('edited', updated);
            setEditUser(null);
          }} className="space-y-3">
            <Input name="name" label={t.fullName} required defaultValue={getText(editUser.name, 'en')} />
            {editUser.role === 'patient' && (
              <>
                <Input name="dob" label={t.dob} type="date" defaultValue={editUser.dob} />
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">{t.gender}</label>
                  <select name="gender" defaultValue={editUser.gender || 'male'} className="w-full px-4 py-2 rounded-xl border border-gray-200">
                    <option value="male">{t.male}</option><option value="female">{t.female}</option>
                  </select>
                </div>
                <Input name="phone" label={t.phone} defaultValue={editUser.phone} />
                <Input name="weight" label={t.weight} type="number" defaultValue={editUser.weight} />
                <Input name="height" label={t.height} type="number" defaultValue={editUser.height} />
              </>
            )}
            {editUser.role === 'doctor' && (
              <>
                <Input name="reg" label={t.regNumber} required defaultValue={editUser.registrationNumber} />
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">{t.specialty}</label>
                  <select name="spec" defaultValue={editUser.specialty?.en || ''} className="w-full px-4 py-2 rounded-xl border border-gray-200 bg-white">
                    <option value="" disabled>--</option>
                    {SPECIALTIES.map(s => <option key={s.en} value={s.en}>{getText(s, lang)}</option>)}
                  </select>
                </div>
              </>
            )}
            {editUser.role === 'pharmacy' && (
              <>
                <Input name="username" label={t.username} required defaultValue={editUser.username} />
                <Input name="email" label={t.email} type="email" defaultValue={editUser.email} />
                <Input name="branch" label={t.branch} defaultValue={editUser.branch ? getText(editUser.branch, 'en') : ''} />
              </>
            )}
            {editUser.role === 'admin' && (
              <>
                <Input name="username" label={t.username} required defaultValue={editUser.username} />
                <Input name="email" label={t.email} type="email" defaultValue={editUser.email} />
              </>
            )}
            <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-2.5 rounded-xl flex items-center justify-center gap-2"><Save size={16} /> {t.save}</button>
          </form>
        </Modal>
      )}

      {/* Audit log */}
      <div className="surface bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-bold text-gray-800 flex items-center gap-2"><Activity size={18} className="text-indigo-600" /> {t.auditLog}</h3>
          <span className="text-xs text-gray-500">{auditLog.length}</span>
        </div>
        <div className="divide-y divide-gray-100 max-h-80 overflow-y-auto">
          {auditLog.length === 0 && <div className="p-4 text-center text-gray-400 text-sm">{t.auditEmpty}</div>}
          {auditLog.map(a => {
            const actText = a.action === 'created' ? t.actCreated
              : a.action === 'edited' ? t.actEdited
              : a.action === 'deactivated' ? t.actDeactivated
              : a.action === 'activated' ? t.actActivated
              : a.action === 'deleted' ? t.actDeleted
              : t.actPasswordReset;
            const roleLabel = a.targetRole === 'patient' ? t.patientRole : a.targetRole === 'doctor' ? t.doctorRole : a.targetRole === 'pharmacy' ? t.pharmacyRole : t.adminRole;
            return (
              <div key={a.id} className="p-3 text-sm flex items-center gap-3">
                <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg shrink-0"><Activity size={14} /></div>
                <div className="flex-1">
                  <p className="text-gray-800"><span className="font-bold">{a.actorName}</span> {actText} <span className="font-bold">{a.targetName}</span> <span className="text-xs text-gray-400">({roleLabel})</span></p>
                  <p className="text-xs text-gray-400">{new Date(a.date).toLocaleString()}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Correction requests inbox */}
      <div className="surface bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-bold text-gray-800 flex items-center gap-2"><AlertCircle size={18} className="text-amber-600" /> {t.correctionRequests}</h3>
          <span className="text-xs text-gray-500">{corrections.length}</span>
        </div>
        <div className="divide-y divide-gray-100">
          {corrections.length === 0 && <div className="p-4 text-center text-gray-400 text-sm">—</div>}
          {corrections.map(c => (
            <div key={c.id} className="p-4 flex justify-between items-center text-sm">
              <div>
                <p className="font-bold text-gray-800">{c.userName} <span className="text-xs text-gray-500 font-normal">• {c.field}</span></p>
                <p className="text-xs text-gray-600 mt-1">{c.reason}</p>
              </div>
              {c.status === 'open' && (
                <button onClick={() => setCorrections(prev => prev.map(x => x.id === c.id ? { ...x, status: 'resolved' } : x))}
                  className="text-xs bg-green-50 text-green-700 border border-green-200 px-3 py-1 rounded-lg font-bold">{t.btnApprove}</button>
              )}
              {c.status === 'resolved' && <span className="text-xs text-green-600 font-bold">✓</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAdminSupport = () => (
    <div className="max-w-4xl mx-auto fade-in space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">{t.customerSupport}</h2>
      <div className="surface bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-bold text-gray-800 flex items-center gap-2"><MessageSquare size={18} className="text-indigo-600" /> {t.supportTickets}</h3>
          <span className="text-xs text-gray-500">{tickets.length}</span>
        </div>
        <div className="divide-y divide-gray-100">
          {tickets.length === 0 && <div className="p-6 text-center text-gray-400 text-sm">—</div>}
          {tickets.map(tk => (
            <div key={tk.id} className="p-4 text-sm">
              <div className="flex justify-between items-start gap-3">
                <div>
                  <p className="font-bold text-gray-800">{tk.subject}</p>
                  <p className="text-xs text-gray-500">{tk.userName} • {new Date(tk.date).toLocaleString()}</p>
                  <p className="text-sm text-gray-700 mt-2">{tk.message}</p>
                </div>
                {tk.status === 'open' && (
                  <button onClick={() => setTickets(prev => prev.map(x => x.id === tk.id ? { ...x, status: 'resolved' } : x))}
                    className="shrink-0 text-xs bg-green-50 text-green-700 border border-green-200 px-3 py-1 rounded-lg font-bold">{t.btnApprove}</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ---------------- Alarms (with auto-alarm toggle) ----------------
  const myAlarms = alarms.filter(a => !currentUser || a.userId === currentUser.id);

  const renderAlarms = () => (
    <div className="max-w-3xl mx-auto fade-in space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">{t.alarmsTitle}</h2>

      <div className="surface bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <p className="font-semibold text-gray-700 flex items-center gap-2"><AlarmClock size={18} className="text-indigo-600" /> {t.autoAlarm}</p>
          <Toggle checked={autoAlarmEnabled} onChange={setAutoAlarmEnabled} />
        </div>
      </div>

      <div className="surface bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
        <h3 className="font-bold text-gray-800">{t.addAlarm}</h3>
        <form onSubmit={(e) => {
          e.preventDefault();
          if (!newAlarmMed || !newAlarmTime || !currentUser) return;
          setAlarms(prev => [{ id: `a-${Date.now()}`, userId: currentUser.id, medication: newAlarmMed, time: newAlarmTime }, ...prev]);
          setNewAlarmMed(''); setNewAlarmTime('');
        }} className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-gray-600 mb-1">{t.alarmMed}</label>
            <input value={newAlarmMed} onChange={e => setNewAlarmMed(e.target.value)} className="w-full px-4 py-2 rounded-xl border border-gray-200" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">{t.alarmTime}</label>
            <input type="time" value={newAlarmTime} onChange={e => setNewAlarmTime(e.target.value)} className="w-full px-4 py-2 rounded-xl border border-gray-200" />
          </div>
          <div className="md:col-span-3">
            <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2"><PlusCircle size={16} /> {t.addAlarm}</button>
          </div>
        </form>
      </div>

      <div className="surface bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {myAlarms.length === 0 && <div className="p-6 text-center text-gray-400 text-sm">—</div>}
        {myAlarms.map(a => (
          <div key={a.id} className="p-4 border-b border-gray-100 last:border-0 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg"><AlarmClock size={20} /></div>
              <div>
                <p className="font-bold text-gray-800">{a.medication}</p>
                <p className="text-xs text-gray-500">{a.time} {a.auto && <span className="ml-2 text-indigo-600 font-bold">• AUTO</span>}</p>
              </div>
            </div>
            <button onClick={() => setAlarms(prev => prev.filter(x => x.id !== a.id))} className="p-2 text-gray-400 hover:text-red-500"><X size={18} /></button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="max-w-3xl mx-auto fade-in space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">{t.notifications}</h2>
        {unreadCount > 0 && (
          <button onClick={() => setNotifications(prev => prev.map(n => ({ ...n, read: true })))}
            className="text-sm bg-indigo-50 text-indigo-700 border border-indigo-200 px-3 py-1.5 rounded-lg font-bold">{t.markAllRead}</button>
        )}
      </div>
      <div className="surface bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {myNotifications.length === 0 && <div className="p-6 text-center text-gray-400 text-sm">{t.noNotifications}</div>}
        {myNotifications.map(n => (
          <div key={n.id} className={`p-4 border-b border-gray-100 last:border-0 flex items-start gap-3 ${!n.read ? 'bg-indigo-50/40' : ''}`}>
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg shrink-0"><Bell size={18} /></div>
            <div className="flex-1">
              <p className="text-sm text-gray-800">{getText(n.text, lang)}</p>
              <p className="text-xs text-gray-400 mt-1">{new Date(n.date).toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // ---------------- Settings (with home/work/dark mode for patient) ----------------
  const renderSettings = () => (
    <div className="max-w-3xl mx-auto fade-in space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">{t.settingsTitle}</h2>

      <div className="surface bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
        <h3 className="font-bold text-gray-800">{t.sysPrefs}</h3>
        <div className="flex items-center justify-between">
          <p className="font-semibold text-gray-700 flex items-center gap-2">{prefs.darkMode ? <Moon size={18} /> : <Sun size={18} />} {t.darkMode}</p>
          <Toggle checked={prefs.darkMode} onChange={(v) => setPrefs({ ...prefs, darkMode: v })} />
        </div>
      </div>

      {currentUser?.role === 'patient' && (
        <div className="surface bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
          <h3 className="font-bold text-gray-800 flex items-center gap-2"><MapPin size={18} className="text-indigo-600" /> {t.deliveryAddress}</h3>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">{t.homeLocation}</label>
            <input value={prefs.home} onChange={e => setPrefs({ ...prefs, home: e.target.value })} placeholder={t.addressPlaceholder} className="w-full px-4 py-2.5 rounded-xl border border-gray-200" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">{t.workLocation}</label>
            <input value={prefs.work} onChange={e => setPrefs({ ...prefs, work: e.target.value })} placeholder={t.addressPlaceholder} className="w-full px-4 py-2.5 rounded-xl border border-gray-200" />
          </div>
          <button onClick={() => alert(t.saved)} className="bg-indigo-600 text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2"><Save size={16} /> {t.save}</button>
        </div>
      )}
    </div>
  );

  const renderSupport = () => (
    <div className="max-w-2xl mx-auto fade-in space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">{t.supportTitle}</h2>
      <div className="surface bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <form onSubmit={(e) => {
          e.preventDefault();
          const fd = new FormData(e.currentTarget);
          if (!currentUser) return;
          const tk = {
            id: `tk-${Date.now()}`, userId: currentUser.id, userName: getText(currentUser.name, 'en'),
            subject: String(fd.get('subject') || ''), message: String(fd.get('message') || ''),
            date: new Date().toISOString(), status: 'open',
          };
          setTickets(prev => [tk, ...prev]);
          e.target.reset();
          pushNotification(currentUser.id, 'تم إرسال رسالتك للدعم', 'Your message was sent to support');
        }} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">{t.subject}</label>
            <input name="subject" required placeholder={t.subjPlaceholder} className="w-full px-4 py-2.5 rounded-xl border border-gray-200" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">{t.msg}</label>
            <textarea name="message" required rows={4} placeholder={t.msgPlaceholder} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 resize-none" />
          </div>
          <button type="submit" className="bg-indigo-600 text-white px-4 py-2.5 rounded-xl font-bold flex items-center gap-2"><Send size={16} /> {t.sendMsg}</button>
        </form>
      </div>
    </div>
  );

  // ---------------- Request Details Modal (preserved & AI enhanced) ----------------
  const renderRequestDetailsModal = () => {
    if (!selectedRequest) return null;
    const statusInfo = getStatusDetails(selectedRequest.status);
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm fade-in">
        <div className={`bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh] ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
          <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50 shrink-0">
            <h3 className="text-xl font-bold text-gray-800">{t.modalTitle} {selectedRequest.id}</h3>
            <button onClick={() => { setSelectedRequest(null); setAiExplanation(null); setIsExplaining(false); }} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full"><X size={24} /></button>
          </div>

          <div className="p-6 space-y-6 overflow-y-auto">
            <div className="flex justify-between items-center">
              <span className="text-gray-500 font-medium">{t.currentStatus}</span>
              <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-bold border ${statusInfo.color}`}>{statusInfo.icon} {statusInfo.label}</span>
            </div>

            {allergies.length > 0 && (
              <div className="bg-red-50 p-4 rounded-xl border border-red-200">
                <p className="text-sm font-bold text-red-800 flex items-center gap-2 mb-2"><AlertCircle size={16} /> {t.allergiesTitle}:</p>
                <div className="flex flex-wrap gap-1">
                  {allergies.map(alg => <span key={alg.id} className="text-xs font-bold text-white bg-red-500 px-2 py-1 rounded-md">{getText(alg.text, lang)}</span>)}
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100">
              <div><p className="text-xs text-gray-500 mb-1">{t.patName}</p><p className="font-bold text-gray-800">{getText(selectedRequest.patientName, lang)}</p></div>
              <div><p className="text-xs text-gray-500 mb-1">{t.reqDate}</p><p className="font-bold text-gray-800">{selectedRequest.date}</p></div>

              {currentUser?.role === 'pharmacy' && selectedRequest.prescribedBy && (
                <div className="col-span-2"><p className="text-xs text-indigo-500 font-bold mb-1">{t.prescribedBy}</p><p className="font-bold text-gray-800 flex items-center gap-1"><Stethoscope size={16} className="text-indigo-400" /> {getText(selectedRequest.prescribedBy, lang)}</p></div>
              )}

              <div className="col-span-2 mt-2 pt-2 border-t border-gray-200">
                <p className="text-xs text-gray-500 mb-1">{t.reqMed}</p>
                <p className="font-bold text-indigo-700 text-lg">{getText(selectedRequest.medicationName, lang)}</p>
                <p className="text-sm text-gray-600 font-medium mt-1">{selectedRequest.dose} • {selectedRequest.duration} {lang === 'ar' ? 'يوم' : 'Days'}</p>
              </div>

              {(selectedRequest.diagnosis || selectedRequest.medType || selectedRequest.mealTiming) && (
                <div className="col-span-2 mt-2 pt-2 border-t border-gray-200 grid grid-cols-2 gap-3">
                  {selectedRequest.diagnosis && <div><p className="text-xs text-gray-500">{t.diagnosis}</p><p className="font-bold text-gray-800 text-sm">{getText(selectedRequest.diagnosis, lang)}</p></div>}
                  {selectedRequest.medType && <div><p className="text-xs text-gray-500">{t.medType}</p><p className="font-bold text-gray-800 text-sm">{selectedRequest.medType === 'acute' ? t.acute : `${t.chronic} (${selectedRequest.chronicMonths || '?'} ${lang === 'ar' ? 'شهر' : 'mo'})`}</p></div>}
                  {selectedRequest.mealTiming && <div><p className="text-xs text-gray-500">{t.mealTiming}</p><p className="font-bold text-gray-800 text-sm">{selectedRequest.mealTiming === 'before' ? t.beforeMeal : selectedRequest.mealTiming === 'after' ? t.afterMeal : t.withMeal}</p></div>}
                </div>
              )}
            </div>

            {/* AI Explanation Feature for Patients */}
            {currentUser?.role === 'patient' && (
              <div className="mt-4">
                {!aiExplanation && !isExplaining && (
                  <button 
                    onClick={handleExplainMedication}
                    className="w-full bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 py-3 rounded-xl font-bold flex justify-center items-center gap-2 transition-colors">
                    <Sparkles size={18} /> {t.aiExplainBtn}
                  </button>
                )}

                {isExplaining && (
                  <div className="text-center py-4 text-indigo-600 flex justify-center items-center gap-2 animate-pulse font-medium bg-indigo-50 rounded-xl">
                    <Wand2 size={20} /> {t.aiLoading}
                  </div>
                )}

                {aiExplanation && !isExplaining && (
                  <div className="bg-indigo-50 border border-indigo-200 p-4 rounded-xl">
                    <p className="text-sm font-bold text-indigo-800 flex items-center gap-2 mb-2"><Sparkles size={16} /> {t.aiExplainTitle}</p>
                    <p className="text-sm text-indigo-900 leading-relaxed whitespace-pre-wrap">{aiExplanation}</p>
                    <p className="text-[10px] text-indigo-400 mt-3 border-t border-indigo-100 pt-2">{t.aiDisclaimer}</p>
                  </div>
                )}
              </div>
            )}

            {getText(selectedRequest.notes, lang) && (
              <div><p className="text-sm font-semibold text-gray-700 mb-2">{t.patNotes}</p><div className="p-4 bg-yellow-50 text-yellow-800 rounded-xl border border-yellow-100 text-sm leading-relaxed">{getText(selectedRequest.notes, lang)}</div></div>
            )}
          </div>

          <div className="p-6 border-t border-gray-100 bg-gray-50 flex flex-wrap gap-3 shrink-0">
            {currentUser?.role === 'doctor' && selectedRequest.status === 'Pending' && (
              <>
                <button onClick={() => handleStatusChange(selectedRequest.id, 'Approved')} className="flex-1 bg-green-600 text-white py-2.5 rounded-xl font-bold flex justify-center items-center gap-2"><CheckCircle size={18} /> {t.btnApprove}</button>
                <button onClick={() => handleStatusChange(selectedRequest.id, 'Rejected')} className="flex-1 bg-red-600 text-white py-2.5 rounded-xl font-bold flex justify-center items-center gap-2"><XCircle size={18} /> {t.btnReject}</button>
              </>
            )}
            {currentUser?.role === 'pharmacy' && selectedRequest.status === 'Approved' && (
              <>
                <button onClick={() => handleStatusChange(selectedRequest.id, 'Dispensed')} className="w-full bg-green-600 text-white py-2.5 rounded-xl font-bold flex justify-center items-center gap-2"><Truck size={18} /> {t.btnDispense}</button>
                <button onClick={() => handleStatusChange(selectedRequest.id, 'Referred')} className="w-full bg-gray-200 text-gray-700 py-2.5 rounded-xl font-bold flex justify-center items-center gap-2 mt-2"><Activity size={18} /> {t.btnRefer}</button>
              </>
            )}
            <button className="w-full bg-gray-200 text-gray-700 py-2.5 rounded-xl font-bold flex justify-center items-center gap-2 mt-2"><MessageSquare size={18} /> {t.btnMsg}</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div dir={lang === 'ar' ? 'rtl' : 'ltr'} className={`min-h-screen ${prefs.darkMode ? 'dark-mode' : 'bg-[#F8FAFC]'} flex ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
      {/* Sidebar */}
      <aside className={`hidden md:flex flex-col w-72 surface bg-white ${lang === 'ar' ? 'border-l' : 'border-r'} border-gray-200 shadow-sm z-10 relative`}>
        <div className="p-6 flex items-center gap-3">
          <div className="bg-indigo-600 p-2.5 rounded-xl text-white shadow-md shadow-indigo-100"><HeartPulse size={24} /></div>
          <h1 className="text-2xl font-black text-gray-800 tracking-tight">{t.appTitle}<span className="text-indigo-600">{t.appTitleHighlight}</span></h1>
        </div>
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto mt-4">
          {visibleNavItems.map(item => (
            <button key={item.id} onClick={() => { setCurrentView(item.id); setIsMobileMenuOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${currentView === item.id ? 'bg-indigo-50 text-indigo-700 shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}>
              <div className={currentView === item.id ? 'text-indigo-600' : 'text-gray-400'}>{item.icon}</div>{item.label}
              {item.id === 'notifications' && unreadCount > 0 && (
                <span className="ml-auto bg-red-500 text-white text-[10px] font-bold rounded-full px-1.5 py-0.5">{unreadCount}</span>
              )}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-100">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl font-medium transition-colors"><LogOut size={20} /> {t.logout}</button>
        </div>
      </aside>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/40" onClick={() => setIsMobileMenuOpen(false)}>
          <aside className="surface bg-white w-72 h-full p-4" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="bg-indigo-600 p-2 rounded-xl text-white"><HeartPulse size={20} /></div>
                <h1 className="text-xl font-black text-gray-800">{t.appTitle}<span className="text-indigo-600">{t.appTitleHighlight}</span></h1>
              </div>
              <button onClick={() => setIsMobileMenuOpen(false)}><X size={22} /></button>
            </div>
            <nav className="space-y-1">
              {visibleNavItems.map(item => (
                <button key={item.id} onClick={() => { setCurrentView(item.id); setIsMobileMenuOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm ${currentView === item.id ? 'bg-indigo-50 text-indigo-700' : 'text-gray-500'}`}>
                  {item.icon}{item.label}
                </button>
              ))}
              <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-red-500 rounded-xl"><LogOut size={20} /> {t.logout}</button>
            </nav>
          </aside>
        </div>
      )}

      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <header className="surface bg-white h-20 border-b border-gray-200 flex items-center justify-between px-6 shrink-0 shadow-sm z-10">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden p-2 text-gray-500 bg-gray-50 rounded-lg"><Menu size={24} /></button>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <button onClick={() => setShowHelp(true)} title={t.help} className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"><HelpCircle size={18} /></button>
            <button onClick={() => setShowHotline(true)} title={t.hotline} className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors"><Phone size={18} /></button>
            <button onClick={() => setCurrentView('notifications')} title={t.notifications} className="relative p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors">
              <Bell size={18} />
              {unreadCount > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full px-1.5">{unreadCount}</span>}
            </button>
            <button onClick={toggleLanguage} className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-bold text-sm transition-colors"><Globe size={18} /><span className="pt-0.5">{lang === 'ar' ? 'English' : 'عربي'}</span></button>
            <div className="flex items-center gap-3 border-l border-gray-200 pl-3 ml-1">
              <div className={`hidden md:block ${lang === 'ar' ? 'text-left' : 'text-right'}`}>
                <p className="text-sm font-bold text-gray-800">{getText(currentUser.name, lang)}</p>
                <p className="text-xs text-gray-500">{currentUser.role === 'doctor' ? t.doctorRole : currentUser.role === 'patient' ? t.patientRole : currentUser.role === 'pharmacy' ? t.pharmacyRole : t.adminRole}</p>
              </div>
              <button onClick={() => setCurrentView('profile')} className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold border border-indigo-200 shadow-sm"><User size={20} /></button>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            {currentView === 'dashboard' && renderDashboard()}
            {currentView === 'profile' && renderProfile()}
            {currentView === 'manage-profiles' && currentUser.role === 'admin' && renderManageProfiles()}
            {currentView === 'admin-support' && currentUser.role === 'admin' && renderAdminSupport()}
            {currentView === 'new-request' && renderNewRequest()}
            {currentView === 'requests' && renderRequestsList()}
            {currentView === 'history' && renderPatientHistory()}
            {currentView === 'alarms' && renderAlarms()}
            {currentView === 'notifications' && renderNotifications()}
            {currentView === 'settings' && renderSettings()}
            {currentView === 'support' && renderSupport()}
          </div>
        </div>
      </main>

      {renderRequestDetailsModal()}
      <HelpModal open={showHelp} onClose={() => setShowHelp(false)} t={t} />
      <HotlineModal open={showHotline} onClose={() => setShowHotline(false)} t={t} />
    </div>
  );
}

// ---------------- Small UI helpers ----------------
function Field({ label, value, mono }) {
  return (
    <div>
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className={`font-bold text-gray-800 ${mono ? 'font-mono tracking-wider' : ''}`}>{value}</p>
    </div>
  );
}

function EditableField({ label, value, edit, setEdit, editing, type = 'text' }) {
  return (
    <div>
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      {editing ? (
        <input type={type} value={edit} onChange={e => setEdit(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-indigo-300 focus:ring-2 focus:ring-indigo-500 outline-none" />
      ) : (
        <p className="font-bold text-gray-800">{value || '—'}</p>
      )}
    </div>
  );
}

function Input({ name, label, type = 'text', required, defaultValue }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1">{label}{required && ' *'}</label>
      <input name={name} type={type} required={required} defaultValue={defaultValue} className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none" />
    </div>
  );
}

function Toggle({ checked, onChange }) {
  return (
    <button onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${checked ? 'bg-indigo-600' : 'bg-gray-300'}`}>
      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
  );
}

function Modal({ children, onClose, title, t }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm fade-in" onClick={onClose}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h3 className="text-lg font-bold text-gray-800">{title}</h3>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-red-500 rounded-full"><X size={20} /></button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

function HelpModal({ open, onClose, t }) {
  if (!open) return null;
  return (
    <Modal onClose={onClose} title={t.help} t={t}>
      <div className="space-y-3 text-sm text-gray-700">
        <p className="flex items-start gap-2"><HelpCircle size={16} className="text-indigo-600 mt-0.5" /> {t.help} — Dawak</p>
        <ul className="list-disc pr-5 pl-5 space-y-1 text-gray-600 text-xs leading-relaxed">
          <li>Patient: login with Medical Record Number or Date of Birth.</li>
          <li>Doctor: login with Registration Number.</li>
          <li>Pharmacy / Admin: username or email.</li>
          <li>Admin creates all profiles and manages corrections.</li>
          <li>Use the hotline icon for urgent help.</li>
        </ul>
      </div>
    </Modal>
  );
}

function HotlineModal({ open, onClose, t }) {
  if (!open) return null;
  return (
    <Modal onClose={onClose} title={t.hotline} t={t}>
      <div className="space-y-4 text-center">
        <div className="inline-flex p-4 bg-red-50 text-red-600 rounded-full"><Phone size={32} /></div>
        <p className="text-3xl font-black text-gray-800 tracking-wider">19999</p>
        <p className="text-sm text-gray-500">24/7 Emergency Support</p>
        <a href="tel:19999" className="block w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl">Call Now</a>
      </div>
    </Modal>
  );
}