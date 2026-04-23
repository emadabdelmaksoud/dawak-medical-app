import React, { useState } from 'react';
import { 
  Home, PlusCircle, List, History, Bell, Settings, PhoneCall, Search, Filter,
  CheckCircle, XCircle, Clock, AlertCircle, User, Menu, X, FileText,
  MessageSquare, Activity, Send, Eye, Globe, LogOut, MapPin, AlarmClock,
  Edit3, Truck, ShieldCheck, Mail, Lock, Stethoscope, HeartPulse
} from 'lucide-react';

// --- Translations ---
const TRANSLATIONS = {
  ar: {
    appTitle: "دواء", appTitleHighlight: "ك",
    loginTitle: "مرحباً بك في دواءك", loginSubtitle: "سجل الدخول أو أنشئ حساباً جديداً",
    signIn: "تسجيل الدخول", signUp: "إنشاء حساب",
    email: "البريد الإلكتروني", password: "كلمة المرور",
    googleSignIn: "تسجيل الدخول بواسطة Google",
    privacyNotice: "بياناتك الطبية مشفرة ومحمية بالكامل وفقاً لمعايير الخصوصية.",
    demoLogins: "أو جرب الحسابات التجريبية:",
    doctorRole: "طبيب", patientRole: "مريض", pharmacyRole: "صيدلية", registeredPatient: "مريض مسجل",
    dashboard: "لوحة القيادة", newRequest: "طلب دواء جديد", requestsList: "الطلبات", history: "السجل الطبي", notifications: "الإشعارات", settings: "الإعدادات", support: "الدعم", alarms: "منبه الأدوية", logout: "تسجيل الخروج",
    welcome: "مرحباً،", totalReqs: "إجمالي الطلبات", pending: "قيد الانتظار", approved: "جاهز للصرف", rejected: "مرفوض", needsReview: "يحتاج مراجعة", dispensed: "تم الصرف والتوصيل", referred: "محول لصيدلية أخرى",
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
    historyTitle: "السجل الطبي للمريض", addRecord: "إضافة سجل", editRecord: "تعديل السجل", saveRecord: "حفظ", recordDate: "التاريخ", recordDiagnosis: "التشخيص", recordNotes: "الملاحظات الطبية",
    allergiesTitle: "الحساسية والأمراض المزمنة", addAllergy: "إضافة حساسية", allergyPlaceholder: "مثال: حساسية البنسلين",
    alarmsTitle: "منبه الأدوية", addAlarm: "إضافة منبه", alarmTime: "وقت التنبيه", alarmMed: "الدواء",
    settingsTitle: "الإعدادات", accSettings: "إعدادات الحساب", emailAlerts: "تنبيهات البريد", smsAlerts: "تنبيهات SMS", sysPrefs: "تفضيلات النظام", darkMode: "الوضع الليلي",
    deliveryAddress: "عنوان التوصيل", addressPlaceholder: "أدخل عنوان التوصيل بالتفصيل...", saveAddress: "حفظ العنوان",
    supportTitle: "الدعم والمساعدة", subject: "الموضوع", subjPlaceholder: "عنوان الرسالة", msg: "رسالتك", msgPlaceholder: "اكتب تفاصيل استفسارك...", sendMsg: "إرسال الرسالة",
    modalTitle: "تفاصيل الطلب", currentStatus: "الحالة الحالية:",
    patName: "اسم المريض", reqDate: "تاريخ الطلب", reqMed: "الدواء المطلوب", reqDoseDuration: "الجرعة والمدة", patNotes: "ملاحظات:",
    prescribedBy: "وصف بواسطة:",
    btnApprove: "موافقة", btnReject: "رفض", btnReview: "يحتاج مراجعة", btnMsg: "إرسال رسالة",
    btnDispense: "صرف وتوصيل الدواء", btnRefer: "تحويل لصيدلية أخرى",
    viewMode: "وضع العرض:",
  },
  en: {
    appTitle: "Dawa", appTitleHighlight: "k",
    loginTitle: "Welcome to Dawak", loginSubtitle: "Sign in or create a new account",
    signIn: "Sign In", signUp: "Sign Up",
    email: "Email Address", password: "Password",
    googleSignIn: "Sign in with Google",
    privacyNotice: "Your medical data is fully encrypted and privacy-protected.",
    demoLogins: "Or try our demo accounts:",
    doctorRole: "Doctor", patientRole: "Patient", pharmacyRole: "Pharmacy", registeredPatient: "Registered Patient",
    dashboard: "Dashboard", newRequest: "New Request", requestsList: "Requests", history: "Medical History", notifications: "Notifications", settings: "Settings", support: "Support", alarms: "Medication Alarms", logout: "Log Out",
    welcome: "Welcome,", totalReqs: "Total Requests", pending: "Pending", approved: "Ready to Dispense", rejected: "Rejected", needsReview: "Needs Review", dispensed: "Dispensed & Delivered", referred: "Referred",
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
    historyTitle: "Patient Medical History", addRecord: "Add Record", editRecord: "Edit Record", saveRecord: "Save", recordDate: "Date", recordDiagnosis: "Diagnosis", recordNotes: "Medical Notes",
    allergiesTitle: "Allergies & Chronic Conditions", addAllergy: "Add Allergy", allergyPlaceholder: "e.g., Penicillin Allergy",
    alarmsTitle: "Medication Alarms", addAlarm: "Add Alarm", alarmTime: "Alarm Time", alarmMed: "Medication",
    settingsTitle: "Settings", accSettings: "Account Settings", emailAlerts: "Email Alerts", smsAlerts: "SMS Alerts", sysPrefs: "System Preferences", darkMode: "Dark Mode",
    deliveryAddress: "Delivery Address", addressPlaceholder: "Enter detailed delivery address...", saveAddress: "Save Address",
    supportTitle: "Support & Help", subject: "Subject", subjPlaceholder: "Message Subject", msg: "Your Message", msgPlaceholder: "Write your inquiry details here...", sendMsg: "Send Message",
    modalTitle: "Request Details", currentStatus: "Current Status:",
    patName: "Patient Name", reqDate: "Request Date", reqMed: "Requested Medication", reqDoseDuration: "Dose & Duration", patNotes: "Notes:",
    prescribedBy: "Prescribed By:",
    btnApprove: "Approve", btnReject: "Reject", btnReview: "Needs Review", btnMsg: "Send Message",
    btnDispense: "Dispense & Deliver", btnRefer: "Refer to Pharmacy",
    viewMode: "View Mode:",
  }
};

// --- Mock Data ---
const MOCK_USERS = [
  { id: 'u1', role: 'doctor', name: { ar: 'د. أحمد محمود', en: 'Dr. Ahmed Mahmoud' }, specialty: { ar: 'طبيب باطنة', en: 'Internal Medicine' } },
  { id: 'u2', role: 'patient', name: { ar: 'سارة خالد', en: 'Sarah Khaled' }, age: 34, bloodType: 'O+' },
  { id: 'u3', role: 'pharmacy', name: { ar: 'صيدلية الشفاء', en: 'Al-Shifa Pharmacy' }, branch: { ar: 'فرع التجمع', en: 'New Cairo Branch' } },
];

const INITIAL_REQUESTS = [
  { id: 'REQ-101', patientName: { ar: 'سارة خالد', en: 'Sarah Khaled' }, patientId: 'u2', prescribedBy: { ar: 'د. أحمد محمود', en: 'Dr. Ahmed Mahmoud' }, medicationName: { ar: 'أملوديبين', en: 'Amlodipine' }, dose: '5mg', duration: '30', date: '2026-04-20', status: 'Pending', notes: { ar: 'الرجاء إعادة الصرف', en: 'Please refill' } },
  { id: 'REQ-102', patientName: { ar: 'محمد علي', en: 'Mohamed Ali' }, patientId: 'p2', prescribedBy: { ar: 'د. يوسف عمر', en: 'Dr. Youssef Omar' }, medicationName: { ar: 'ميتفورمين', en: 'Metformin' }, dose: '1000mg', duration: '60', date: '2026-04-19', status: 'Approved', notes: { ar: 'الجرعة المعتادة', en: 'Standard dose' } },
  { id: 'REQ-103', patientName: { ar: 'عمر حسن', en: 'Omar Hassan' }, patientId: 'p3', prescribedBy: { ar: 'د. أحمد محمود', en: 'Dr. Ahmed Mahmoud' }, medicationName: { ar: 'أوميبرازول', en: 'Omeprazole' }, dose: '20mg', duration: '14', date: '2026-04-22', status: 'Dispensed', notes: { ar: 'يعاني من حموضة', en: 'Acidity issues' } },
];

const PATIENT_MEDICATIONS = [
  { id: 'm1', name: { ar: 'أملوديبين', en: 'Amlodipine' }, dose: '5mg', duration: '30', nextRefillDate: '2026-04-25' }, 
  { id: 'm2', name: { ar: 'ميتفورمين', en: 'Metformin' }, dose: '1000mg', duration: '30', nextRefillDate: '2026-04-20' } 
];

const INITIAL_HISTORY = [
  { id: 'h1', date: '2025-11-10', diagnosis: { ar: 'ارتفاع ضغط الدم', en: 'Hypertension' }, notes: { ar: 'المريض يستجيب جيداً للعلاج', en: 'Responding well to treatment' } },
];

const INITIAL_ALLERGIES = [
  { id: 'al1', text: { ar: 'حساسية البنسلين', en: 'Penicillin Allergy' } },
  { id: 'al2', text: { ar: 'حساسية الفول السوداني', en: 'Peanut Allergy' } }
];

const getText = (field, lang) => {
  if (!field) return '';
  return typeof field === 'string' ? field : (field[lang] || field['en'] || '');
};

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authMode, setAuthMode] = useState('signin');
  const [selectedRole, setSelectedRole] = useState('patient');
  const [lang, setLang] = useState('ar');
  const [currentUser, setCurrentUser] = useState(null);
  const [currentView, setCurrentView] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Data States
  const [requests, setRequests] = useState(INITIAL_REQUESTS);
  const [patientHistory, setPatientHistory] = useState(INITIAL_HISTORY);
  const [allergies, setAllergies] = useState(INITIAL_ALLERGIES);
  const [alarms, setAlarms] = useState([]);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  
  const [selectedRequest, setSelectedRequest] = useState(null); 
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Request Form States
  const [reqMedName, setReqMedName] = useState('');
  const [reqDose, setReqDose] = useState('');
  const [reqDuration, setReqDuration] = useState('');
  const [reqNotes, setReqNotes] = useState('');
  
  const [newAllergy, setNewAllergy] = useState('');

  const t = TRANSLATIONS[lang];

  // --- Handlers ---
  const toggleLanguage = () => setLang(lang === 'ar' ? 'en' : 'ar');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const userToLogin = MOCK_USERS.find(u => u.role === selectedRole);
    handleLogin(userToLogin || MOCK_USERS[1]); 
  };

  const handleGoogleLogin = () => {
    handleLogin(MOCK_USERS[1]);
  };

  const handleLogin = (user) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  const handleStatusChange = (id, newStatus) => {
    setRequests(requests.map(req => req.id === id ? { ...req, status: newStatus } : req));
    if (selectedRequest && selectedRequest.id === id) {
      setSelectedRequest({ ...selectedRequest, status: newStatus });
    }
  };

  const handleSubmitRequest = (e) => {
    e.preventDefault();
    if (currentUser.role === 'doctor' && (!reqMedName || !reqDose || !reqDuration)) return;
    if (currentUser.role === 'patient' && !reqMedName) return;

    let finalMedName, finalDose, finalDuration;

    if (currentUser.role === 'patient') {
      const selectedMed = PATIENT_MEDICATIONS.find(m => m.id === reqMedName);
      if (!selectedMed) return;
      finalMedName = selectedMed.name;
      finalDose = selectedMed.dose;
      finalDuration = selectedMed.duration;
    } else {
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
      notes: { ar: reqNotes, en: reqNotes }
    };
    
    setRequests([newReq, ...requests]);
    setReqMedName('');
    setReqDose('');
    setReqDuration('');
    setReqNotes('');
    setCurrentView('requests');
  };

  const handleAddAllergy = (e) => {
    e.preventDefault();
    if (!newAllergy) return;
    setAllergies([...allergies, { id: `al-${Date.now()}`, text: { ar: newAllergy, en: newAllergy } }]);
    setNewAllergy('');
  };

  const getStatusDetails = (status) => {
    switch(status) {
      case 'Pending': return { label: t.pending, color: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: <Clock size={16}/> };
      case 'Approved': return { label: t.approved, color: 'bg-indigo-100 text-indigo-800 border-indigo-200', icon: <CheckCircle size={16}/> };
      case 'Rejected': return { label: t.rejected, color: 'bg-red-100 text-red-800 border-red-200', icon: <XCircle size={16}/> };
      case 'Needs Review': return { label: t.needsReview, color: 'bg-orange-100 text-orange-800 border-orange-200', icon: <AlertCircle size={16}/> };
      case 'Dispensed': return { label: t.dispensed, color: 'bg-green-100 text-green-800 border-green-200', icon: <Truck size={16}/> };
      case 'Referred': return { label: t.referred, color: 'bg-gray-100 text-gray-800 border-gray-200', icon: <Activity size={16}/> };
      default: return { label: status, color: 'bg-gray-100 text-gray-800', icon: <Activity size={16}/> };
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

  // --- Nav Items ---
  const navItems = [
    { id: 'dashboard', label: t.dashboard, icon: <Home size={20} />, roles: ['doctor', 'patient', 'pharmacy'] },
    { id: 'new-request', label: t.newRequest, icon: <PlusCircle size={20} />, roles: ['doctor', 'patient'] },
    { id: 'requests', label: t.requestsList, icon: <List size={20} />, roles: ['doctor', 'patient', 'pharmacy'] },
    { id: 'history', label: t.history, icon: <History size={20} />, roles: ['doctor', 'patient'] },
    { id: 'alarms', label: t.alarms, icon: <AlarmClock size={20} />, roles: ['patient'] },
    { id: 'settings', label: t.settings, icon: <Settings size={20} />, roles: ['doctor', 'patient', 'pharmacy'] },
    { id: 'support', label: t.support, icon: <PhoneCall size={20} />, roles: ['doctor', 'patient', 'pharmacy'] },
  ];

  // --- Auth Screen ---
  if (!isAuthenticated) {
    return (
      <div dir={lang === 'ar' ? 'rtl' : 'ltr'} className={`min-h-screen bg-[#F8FAFC] flex flex-col justify-center items-center p-4 font-sans ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
        <style dangerouslySetInnerHTML={{__html: `@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;900&family=Inter:wght@400;500;600;700&display=swap'); body { font-family: ${lang === 'ar' ? "'Tajawal', sans-serif" : "'Inter', sans-serif"}; }`}} />
        
        <div className="absolute top-6 right-6 left-6 flex justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-lg shadow-indigo-200"><HeartPulse size={24} /></div>
            <h1 className="text-2xl font-black text-gray-800 tracking-tight">{t.appTitle}<span className="text-indigo-600">{t.appTitleHighlight}</span></h1>
          </div>
          <button onClick={toggleLanguage} className="flex items-center gap-2 px-4 py-2 bg-white shadow-sm hover:bg-gray-50 border border-gray-100 text-gray-700 rounded-xl font-bold transition-all">
            <Globe size={18} /> <span className="pt-0.5">{lang === 'ar' ? 'English' : 'عربي'}</span>
          </button>
        </div>

        <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl w-full max-w-md text-center border border-gray-100 fade-in">
          <h2 className="text-3xl font-black text-gray-800 mb-2">{t.loginTitle}</h2>
          <p className="text-gray-500 mb-8">{t.loginSubtitle}</p>

          <div className="flex bg-gray-100 p-1 rounded-xl mb-6">
            <button onClick={() => setAuthMode('signin')} className={`flex-1 py-2 rounded-lg font-bold text-sm transition-colors ${authMode === 'signin' ? 'bg-white shadow-sm text-indigo-700' : 'text-gray-500 hover:text-gray-700'}`}>{t.signIn}</button>
            <button onClick={() => setAuthMode('signup')} className={`flex-1 py-2 rounded-lg font-bold text-sm transition-colors ${authMode === 'signup' ? 'bg-white shadow-sm text-indigo-700' : 'text-gray-500 hover:text-gray-700'}`}>{t.signUp}</button>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4 mb-6 text-left" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
            <div className="flex gap-2 p-1 bg-gray-50 rounded-xl border border-gray-100 mb-2">
              {['patient', 'doctor', 'pharmacy'].map(role => (
                <button
                  key={role}
                  type="button"
                  onClick={() => setSelectedRole(role)}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${selectedRole === role ? 'bg-white shadow-sm text-indigo-700 border border-gray-200' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  {role === 'doctor' ? t.doctorRole : role === 'patient' ? t.patientRole : t.pharmacyRole}
                </button>
              ))}
            </div>
            <div>
              <div className="relative">
                <Mail className={`absolute ${lang === 'ar' ? 'right-4' : 'left-4'} top-3.5 text-gray-400`} size={18} />
                <input type="email" required placeholder={t.email} className={`w-full bg-gray-50 border border-gray-200 rounded-xl py-3 outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all ${lang === 'ar' ? 'pr-12 pl-4 text-right' : 'pl-12 pr-4 text-left'}`} />
              </div>
            </div>
            <div>
              <div className="relative">
                <Lock className={`absolute ${lang === 'ar' ? 'right-4' : 'left-4'} top-3.5 text-gray-400`} size={18} />
                <input type="password" required placeholder={t.password} className={`w-full bg-gray-50 border border-gray-200 rounded-xl py-3 outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all ${lang === 'ar' ? 'pr-12 pl-4 text-right' : 'pl-12 pr-4 text-left'}`} />
              </div>
            </div>
            <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-md shadow-indigo-200 mt-2">
              {authMode === 'signin' ? t.signIn : t.signUp}
            </button>
          </form>

          <div className="relative flex py-2 items-center mb-6">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink-0 mx-4 text-gray-400 text-xs uppercase font-semibold">OR</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          <button onClick={handleGoogleLogin} className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-100 hover:bg-gray-50 text-gray-700 font-bold py-3 rounded-xl transition-all mb-8">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            {t.googleSignIn}
          </button>

          <div className="flex items-start gap-2 bg-green-50 p-3 rounded-lg text-left text-green-800" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
            <ShieldCheck size={18} className="shrink-0 mt-0.5 text-green-600" />
            <p className="text-xs font-medium leading-relaxed">{t.privacyNotice}</p>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100">
            <p className="text-xs text-gray-400 font-bold mb-3 uppercase tracking-wider">{t.demoLogins}</p>
            <div className="flex justify-center gap-2">
              {MOCK_USERS.map(user => (
                <button key={user.id} onClick={() => handleLogin(user)} className="px-3 py-1.5 bg-gray-100 hover:bg-indigo-100 text-gray-600 hover:text-indigo-700 text-xs font-bold rounded-lg transition-colors capitalize">
                  {user.role === 'doctor' ? t.doctorRole : user.role === 'patient' ? t.patientRole : t.pharmacyRole}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- Views ---
  const renderDashboard = () => {
    const pendingCount = filteredRequests.filter(r => r.status === 'Pending').length;
    const actionCount = filteredRequests.filter(r => r.status === 'Approved').length;

    return (
      <div className="space-y-6 fade-in">
        <h2 className="text-2xl font-bold text-gray-800">{t.welcome} {getText(currentUser.name, lang)}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div><p className="text-sm text-gray-500 mb-1">{t.totalReqs}</p><p className="text-3xl font-bold text-gray-800">{filteredRequests.length}</p></div>
            <div className="p-4 bg-indigo-50 text-indigo-600 rounded-xl"><FileText size={28}/></div>
          </div>
          {currentUser.role !== 'pharmacy' && (
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
              <div><p className="text-sm text-gray-500 mb-1">{t.pending}</p><p className="text-3xl font-bold text-yellow-600">{pendingCount}</p></div>
              <div className="p-4 bg-yellow-50 text-yellow-600 rounded-xl"><Clock size={28}/></div>
            </div>
          )}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div><p className="text-sm text-gray-500 mb-1">{t.approved}</p><p className="text-3xl font-bold text-green-600">{actionCount}</p></div>
            <div className="p-4 bg-green-50 text-green-600 rounded-xl"><CheckCircle size={28}/></div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
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
      <h2 className="text-2xl font-bold text-gray-800">{t.newReqTitle}</h2>
      
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <form onSubmit={handleSubmitRequest} className="space-y-6">
          
          {currentUser.role === 'doctor' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">{t.medName}</label>
                <input type="text" required value={reqMedName} onChange={e => setReqMedName(e.target.value)} placeholder={t.medPlaceholder} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none" />
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
          ) : (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">{t.selectRefill}</label>
              <select 
                required 
                value={reqMedName} 
                onChange={e => setReqMedName(e.target.value)} 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none appearance-none bg-transparent"
              >
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
                    {isReady ? <CheckCircle size={18}/> : <Clock size={18}/>}
                    {isReady ? t.refillReady : `${t.refillDue} ${med.nextRefillDate}`}
                  </div>
                );
              })()}
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">{t.notes}</label>
            <textarea rows="3" value={reqNotes} onChange={e => setReqNotes(e.target.value)} placeholder={t.notesPlaceholder} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"></textarea>
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
            <PlusCircle size={18} /> {t.newRequest}
          </button>
        )}
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4">
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

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className={`w-full whitespace-nowrap ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
            <thead className="bg-gray-50 text-gray-500 text-sm border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 font-semibold">{t.colId}</th>
                {currentUser.role !== 'patient' && <th className="px-6 py-4 font-semibold">{t.colPatient}</th>}
                <th className="px-6 py-4 font-semibold">{t.colMed}</th>
                <th className="px-6 py-4 font-semibold">{t.colDate}</th>
                <th className="px-6 py-4 font-semibold">{t.colStatus}</th>
                <th className="px-6 py-4 font-semibold text-center">{t.colActions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredRequests.map((req) => (
                <tr key={req.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-800">{req.id}</td>
                  {currentUser.role !== 'patient' && <td className="px-6 py-4 text-gray-600">{getText(req.patientName, lang)}</td>}
                  <td className="px-6 py-4 font-medium text-indigo-600">{getText(req.medicationName, lang)} <span className="text-gray-400 text-sm ml-1">({req.dose})</span></td>
                  <td className="px-6 py-4 text-gray-500">{req.date}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border ${getStatusDetails(req.status).color}`}>
                      {getStatusDetails(req.status).icon} {getStatusDetails(req.status).label}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button onClick={() => setSelectedRequest(req)} className="text-indigo-600 hover:text-indigo-800 font-medium px-4 py-2 rounded-lg hover:bg-indigo-50 transition-colors inline-flex items-center gap-2">
                      <Eye size={16} /> <span className="text-sm">{t.viewDetails}</span>
                    </button>
                  </td>
                </tr>
              ))}
              {filteredRequests.length === 0 && (
                <tr>
                  <td colSpan={currentUser.role !== 'patient' ? 6 : 5} className="px-6 py-12 text-center text-gray-400">
                    {t.noReqs}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderHistory = () => (
    <div className="space-y-6 fade-in max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800">{t.historyTitle}</h2>
      
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-4">{t.allergiesTitle}</h3>
        <div className="flex flex-wrap gap-2 mb-6">
          {allergies.map(al => (
            <span key={al.id} className="bg-red-50 text-red-700 px-3 py-1.5 rounded-lg text-sm font-semibold border border-red-100 flex items-center gap-2">
              <AlertCircle size={16}/> {getText(al.text, lang)}
            </span>
          ))}
          {allergies.length === 0 && <span className="text-gray-400 text-sm">لا توجد سجلات</span>}
        </div>
        
        {currentUser.role === 'patient' && (
          <form onSubmit={handleAddAllergy} className="flex gap-2">
            <input type="text" value={newAllergy} onChange={e => setNewAllergy(e.target.value)} placeholder={t.allergyPlaceholder} className="flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
            <button type="submit" className="bg-red-50 text-red-600 font-bold px-4 py-2 rounded-xl border border-red-100 hover:bg-red-100 transition-colors flex items-center gap-2">
              <PlusCircle size={18} /> {t.addAllergy}
            </button>
          </form>
        )}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-800">السجلات السابقة</h3>
          {currentUser.role === 'doctor' && (
             <button className="text-indigo-600 font-semibold text-sm flex items-center gap-2 hover:bg-indigo-50 px-3 py-1.5 rounded-lg">
               <PlusCircle size={16} /> {t.addRecord}
             </button>
          )}
        </div>
        <div className="divide-y divide-gray-50">
          {patientHistory.map(record => (
            <div key={record.id} className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-gray-800">{getText(record.diagnosis, lang)}</h4>
                <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-md">{record.date}</span>
              </div>
              <p className="text-gray-600 text-sm mt-2 bg-gray-50 p-4 rounded-xl border border-gray-100">{getText(record.notes, lang)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAlarms = () => (
    <div className="space-y-6 fade-in max-w-3xl mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">{t.alarmsTitle}</h2>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 flex items-center gap-2">
          <PlusCircle size={18} /> {t.addAlarm}
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 divide-y divide-gray-50">
        {PATIENT_MEDICATIONS.map(med => (
          <div key={med.id} className="p-6 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-gray-800">{getText(med.name, lang)} <span className="text-indigo-600 text-sm ml-2">({med.dose})</span></h3>
              <p className="text-sm text-gray-500 mt-1 flex items-center gap-1"><Clock size={14}/> 08:00 AM - 08:00 PM</p>
            </div>
            <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
              <input type="checkbox" name="toggle" id={`toggle-${med.id}`} className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer checked:right-0 checked:border-green-500 transition-all duration-300" defaultChecked/>
              <label htmlFor={`toggle-${med.id}`} className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer checked:bg-green-500"></label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6 fade-in max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800">{t.settingsTitle}</h2>
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-4">{t.accSettings}</h3>
          <div className="flex flex-col gap-4">
             <label className="flex items-center gap-3 text-gray-700">
               <input type="checkbox" className="w-5 h-5 rounded text-indigo-600" defaultChecked /> {t.emailAlerts}
             </label>
             <label className="flex items-center gap-3 text-gray-700">
               <input type="checkbox" className="w-5 h-5 rounded text-indigo-600" defaultChecked /> {t.smsAlerts}
             </label>
          </div>
        </div>
        
        {currentUser.role === 'patient' && (
          <div className="pt-6 border-t border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2"><MapPin size={20}/> {t.deliveryAddress}</h3>
            <textarea 
              rows="3" 
              value={deliveryAddress} 
              onChange={e => setDeliveryAddress(e.target.value)} 
              placeholder={t.addressPlaceholder} 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none resize-none mb-3"
            ></textarea>
            <button className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors">{t.saveAddress}</button>
          </div>
        )}
      </div>
    </div>
  );

  const renderSupport = () => (
    <div className="space-y-6 fade-in max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800">{t.supportTitle}</h2>
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
         <form className="space-y-6" onSubmit={e => e.preventDefault()}>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">{t.subject}</label>
              <input type="text" placeholder={t.subjPlaceholder} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">{t.msg}</label>
              <textarea rows="5" placeholder={t.msgPlaceholder} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"></textarea>
            </div>
            <button className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition-colors flex justify-center items-center gap-2">
              <Send size={18} /> {t.sendMsg}
            </button>
         </form>
      </div>
    </div>
  );

  // --- Modal Rendering ---
  const renderModal = () => {
    if (!selectedRequest) return null;
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-center items-center p-4 fade-in" style={{ direction: lang === 'ar' ? 'rtl' : 'ltr' }}>
        <div className="bg-white w-full max-w-lg rounded-3xl p-8 shadow-2xl">
          <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
            <h3 className="text-xl font-bold text-gray-800">{t.modalTitle} <span className="text-indigo-600 text-sm ml-2">#{selectedRequest.id}</span></h3>
            <button onClick={() => setSelectedRequest(null)} className="p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50 transition-colors"><X size={24}/></button>
          </div>
          
          <div className="space-y-4 text-sm">
            <div className="flex justify-between items-center bg-gray-50 p-3 rounded-xl">
              <span className="text-gray-500 font-semibold">{t.currentStatus}</span>
              <span className={`px-3 py-1 rounded-full font-bold flex items-center gap-1 ${getStatusDetails(selectedRequest.status).color}`}>
                {getStatusDetails(selectedRequest.status).icon} {getStatusDetails(selectedRequest.status).label}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-500 mb-1">{t.patName}</p>
                <p className="font-bold text-gray-800">{getText(selectedRequest.patientName, lang)}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">{t.reqDate}</p>
                <p className="font-bold text-gray-800">{selectedRequest.date}</p>
              </div>
              <div className="col-span-2 mt-2">
                <p className="text-gray-500 mb-1">{t.reqMed}</p>
                <p className="font-bold text-indigo-700 text-lg">{getText(selectedRequest.medicationName, lang)}</p>
              </div>
              <div className="col-span-2">
                <p className="text-gray-500 mb-1">{t.reqDoseDuration}</p>
                <p className="font-bold text-gray-800">{selectedRequest.dose} — {selectedRequest.duration} {lang === 'ar' ? 'أيام' : 'Days'}</p>
              </div>
              <div className="col-span-2">
                <p className="text-gray-500 mb-1">{t.prescribedBy}</p>
                <p className="font-bold text-gray-800">{getText(selectedRequest.prescribedBy, lang)}</p>
              </div>
              <div className="col-span-2 bg-yellow-50 p-4 rounded-xl border border-yellow-100 mt-2">
                <p className="text-yellow-800 font-semibold mb-1 flex items-center gap-2"><FileText size={16}/> {t.patNotes}</p>
                <p className="text-yellow-700">{getText(selectedRequest.notes, lang) || '---'}</p>
              </div>
            </div>
          </div>

          {/* Role Based Actions */}
          <div className="mt-8 pt-4 border-t border-gray-100 flex gap-3">
            {currentUser.role === 'doctor' && selectedRequest.status === 'Pending' && (
              <>
                <button onClick={() => { handleStatusChange(selectedRequest.id, 'Approved'); setSelectedRequest(null); }} className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition-colors">{t.btnApprove}</button>
                <button onClick={() => { handleStatusChange(selectedRequest.id, 'Rejected'); setSelectedRequest(null); }} className="flex-1 bg-red-100 hover:bg-red-200 text-red-700 font-bold py-3 rounded-xl transition-colors">{t.btnReject}</button>
              </>
            )}
            {currentUser.role === 'pharmacy' && selectedRequest.status === 'Approved' && (
              <>
                <button onClick={() => { handleStatusChange(selectedRequest.id, 'Dispensed'); setSelectedRequest(null); }} className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-colors">{t.btnDispense}</button>
                <button onClick={() => { handleStatusChange(selectedRequest.id, 'Referred'); setSelectedRequest(null); }} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 rounded-xl transition-colors">{t.btnRefer}</button>
              </>
            )}
            {currentUser.role === 'patient' && (
              <button onClick={() => setSelectedRequest(null)} className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 rounded-xl transition-colors">إغلاق</button>
            )}
          </div>
        </div>
      </div>
    );
  };

  // --- Main Layout ---
  const visibleNavItems = navItems.filter(item => item.roles.includes(currentUser.role));

  return (
    <div dir={lang === 'ar' ? 'rtl' : 'ltr'} className={`flex h-screen bg-[#F8FAFC] font-sans ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
      <style dangerouslySetInnerHTML={{__html: `@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;900&family=Inter:wght@400;500;600;700&display=swap'); body { font-family: ${lang === 'ar' ? "'Tajawal', sans-serif" : "'Inter', sans-serif"}; } .fade-in { animation: fadeIn 0.3s ease-in-out; } @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }`}} />
      
      {/* Sidebar Overlay (Mobile) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setIsMobileMenuOpen(false)}></div>
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 ${lang === 'ar' ? 'right-0' : 'left-0'} z-40 w-72 bg-white border-${lang === 'ar' ? 'l' : 'r'} border-gray-100 transform transition-transform duration-300 lg:translate-x-0 lg:static flex flex-col ${isMobileMenuOpen ? 'translate-x-0' : (lang === 'ar' ? 'translate-x-full' : '-translate-x-full')}`}>
        <div className="h-20 flex items-center justify-between px-6 border-b border-gray-50">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-xl text-white"><HeartPulse size={24} /></div>
            <h1 className="text-2xl font-black text-gray-800 tracking-tight">{t.appTitle}<span className="text-indigo-600">{t.appTitleHighlight}</span></h1>
          </div>
          <button onClick={() => setIsMobileMenuOpen(false)} className="lg:hidden text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          {visibleNavItems.map(item => (
            <button 
              key={item.id} 
              onClick={() => { setCurrentView(item.id); setIsMobileMenuOpen(false); }}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl font-bold transition-all ${currentView === item.id ? 'bg-indigo-50 text-indigo-700' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'}`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        <div className="p-4 border-t border-gray-50">
          <div className="bg-gray-50 rounded-2xl p-4 flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex justify-center items-center font-bold">
              <User size={20} />
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-bold text-gray-800 truncate">{getText(currentUser.name, lang)}</p>
              <p className="text-xs text-gray-500 capitalize">{currentUser.role === 'doctor' ? t.doctorRole : currentUser.role === 'patient' ? t.patientRole : t.pharmacyRole}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-red-600 hover:bg-red-50 transition-colors">
            <LogOut size={20} /> <span>{t.logout}</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-[#F8FAFC]">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-4 lg:px-8 shrink-0">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 lg:hidden text-gray-500 hover:bg-gray-50 rounded-lg">
              <Menu size={24} />
            </button>
            <h2 className="text-xl font-bold text-gray-800 hidden sm:block">
              {navItems.find(i => i.id === currentView)?.label}
            </h2>
          </div>
          
          <div className="flex items-center gap-3">
            <button onClick={toggleLanguage} className="flex items-center gap-2 px-3 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg text-sm font-bold transition-all">
              <Globe size={16} /> <span>{lang === 'ar' ? 'EN' : 'AR'}</span>
            </button>
            <button className="relative p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
              <Bell size={22} />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
          </div>
        </header>

        {/* Dynamic View Content */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8">
          {currentView === 'dashboard' && renderDashboard()}
          {currentView === 'new-request' && renderNewRequest()}
          {currentView === 'requests' && renderRequestsList()}
          {currentView === 'history' && renderHistory()}
          {currentView === 'alarms' && renderAlarms()}
          {currentView === 'settings' && renderSettings()}
          {currentView === 'support' && renderSupport()}
        </div>
      </main>

      {/* Global Modals */}
      {renderModal()}

    </div>
  );
}