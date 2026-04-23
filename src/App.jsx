import React, { useState, useEffect } from 'react';
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

  // Force scroll to top on view change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

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

  // --- Views ---
  const renderDashboard = () => {
    const pendingCount = filteredRequests.filter(r => r.status === 'Pending').length;
    const actionCount = filteredRequests.filter(r => r.status === 'Approved').length;

    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <h2 className="text-3xl font-black text-gray-900 tracking-tight">{t.welcome} {getText(currentUser.name, lang)}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-all">
            <div><p className="text-sm font-bold text-gray-500 mb-1 uppercase tracking-wider">{t.totalReqs}</p><p className="text-4xl font-black text-gray-900">{filteredRequests.length}</p></div>
            <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl"><FileText size={32}/></div>
          </div>
          {currentUser.role !== 'pharmacy' && (
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-all">
              <div><p className="text-sm font-bold text-gray-500 mb-1 uppercase tracking-wider">{t.pending}</p><p className="text-4xl font-black text-amber-600">{pendingCount}</p></div>
              <div className="p-4 bg-amber-50 text-amber-600 rounded-2xl"><Clock size={32}/></div>
            </div>
          )}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-all">
            <div><p className="text-sm font-bold text-gray-500 mb-1 uppercase tracking-wider">{t.approved}</p><p className="text-4xl font-black text-emerald-600">{actionCount}</p></div>
            <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl"><CheckCircle size={32}/></div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center">
            <h3 className="text-xl font-black text-gray-900">{t.latestReqs}</h3>
            <button onClick={() => setCurrentView('requests')} className="text-sm text-indigo-600 hover:text-indigo-800 font-bold bg-indigo-50 px-4 py-2 rounded-xl transition-all">{t.viewAll}</button>
          </div>
          <div className="divide-y divide-gray-50">
            {filteredRequests.slice(0, 4).map(req => (
              <div key={req.id} className="p-5 hover:bg-gray-50 flex items-center justify-between transition-colors group">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-2xl ${getStatusDetails(req.status).color}`}>{getStatusDetails(req.status).icon}</div>
                  <div>
                    <p className="font-bold text-gray-900 text-lg">{getText(req.medicationName, lang)} <span className="text-gray-400 text-sm font-medium ml-1">({req.dose})</span></p>
                    <p className="text-sm text-gray-500 font-medium">{currentUser.role !== 'patient' ? getText(req.patientName, lang) : req.id} • {req.date}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedRequest(req)} className="p-3 text-gray-400 hover:text-indigo-600 rounded-2xl hover:bg-indigo-50 transition-all opacity-0 group-hover:opacity-100"><Eye size={24} /></button>
              </div>
            ))}
            {filteredRequests.length === 0 && <div className="p-12 text-center text-gray-400 font-bold">{t.noReqs}</div>}
          </div>
        </div>
      </div>
    );
  };

  const renderNewRequest = () => (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in zoom-in-95 duration-500">
      <h2 className="text-3xl font-black text-gray-900 tracking-tight">{t.newReqTitle}</h2>
      
      <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-sm border border-gray-100">
        <form onSubmit={handleSubmitRequest} className="space-y-8">
          
          {currentUser.role === 'doctor' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">{t.medName}</label>
                <input type="text" required value={reqMedName} onChange={e => setReqMedName(e.target.value)} placeholder={t.medPlaceholder} className="w-full px-6 py-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all bg-gray-50 focus:bg-white text-lg" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">{t.medDose}</label>
                <input type="text" required value={reqDose} onChange={e => setReqDose(e.target.value)} placeholder={t.dosePlaceholder} className="w-full px-6 py-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all bg-gray-50 focus:bg-white text-lg" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">{t.medDuration}</label>
                <input type="number" required value={reqDuration} onChange={e => setReqDuration(e.target.value)} placeholder={t.durationPlaceholder} className="w-full px-6 py-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all bg-gray-50 focus:bg-white text-lg" />
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">{t.selectRefill}</label>
              <div className="relative">
                <select 
                  required 
                  value={reqMedName} 
                  onChange={e => setReqMedName(e.target.value)} 
                  className="w-full px-6 py-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none appearance-none bg-gray-50 focus:bg-white text-lg transition-all"
                >
                  <option value="" disabled>-- {t.selectRefill} --</option>
                  {PATIENT_MEDICATIONS.map(med => (
                    <option key={med.id} value={med.id}>{getText(med.name, lang)} ({med.dose})</option>
                  ))}
                </select>
                <div className={`absolute ${lang === 'ar' ? 'left-6' : 'right-6'} top-5 pointer-events-none text-gray-400`}><Filter size={20}/></div>
              </div>

              {reqMedName && (() => {
                const med = PATIENT_MEDICATIONS.find(m => m.id === reqMedName);
                if (!med) return null;
                const today = new Date('2026-04-23');
                const due = new Date(med.nextRefillDate);
                const isReady = today >= due;
                return (
                  <div className={`mt-4 p-5 rounded-2xl border-2 flex items-center gap-4 text-base font-bold animate-in slide-in-from-top-2 ${isReady ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-amber-50 border-amber-100 text-amber-700'}`}>
                    {isReady ? <CheckCircle size={24}/> : <Clock size={24}/>}
                    {isReady ? t.refillReady : `${t.refillDue} ${med.nextRefillDate}`}
                  </div>
                );
              })()}
            </div>
          )}

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">{t.notes}</label>
            <textarea rows="4" value={reqNotes} onChange={e => setReqNotes(e.target.value)} placeholder={t.notesPlaceholder} className="w-full px-6 py-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none resize-none transition-all bg-gray-50 focus:bg-white text-lg"></textarea>
          </div>
          <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-5 px-6 rounded-2xl transition-all shadow-xl shadow-indigo-200 flex items-center justify-center gap-3 text-xl active:scale-95">
            <PlusCircle size={24} /> <span>{t.createBtn}</span>
          </button>
        </form>
      </div>
    </div>
  );

  const renderRequestsList = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-3xl font-black text-gray-900 tracking-tight">{t.reqListTitle}</h2>
        {['patient', 'doctor'].includes(currentUser.role) && (
          <button onClick={() => setCurrentView('new-request')} className="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-black hover:bg-indigo-700 flex items-center gap-2 shadow-lg shadow-indigo-100 active:scale-95 transition-all">
            <PlusCircle size={20} /> {t.newRequest}
          </button>
        )}
      </div>

      <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className={`absolute ${lang === 'ar' ? 'right-4' : 'left-4'} top-4 text-gray-400`} size={20} />
          <input type="text" placeholder={t.searchPlaceholder} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className={`w-full py-3.5 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all bg-gray-50 focus:bg-white font-medium ${lang === 'ar' ? 'pr-12 pl-4 text-right' : 'pl-12 pr-4 text-left'}`} />
        </div>
        <div className="relative md:w-64">
          <Filter className={`absolute ${lang === 'ar' ? 'right-4' : 'left-4'} top-4 text-gray-400`} size={20} />
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className={`w-full py-3.5 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none appearance-none transition-all bg-gray-50 focus:bg-white font-bold ${lang === 'ar' ? 'pr-12 pl-4 text-right' : 'pl-12 pr-4 text-left'}`}>
            <option value="All">{t.allStatuses}</option>
            <option value="Pending">{t.pending}</option>
            <option value="Approved">{t.approved}</option>
            <option value="Dispensed">{t.dispensed}</option>
            <option value="Rejected">{t.rejected}</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className={`w-full whitespace-nowrap ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
            <thead className="bg-gray-50 text-gray-500 text-xs font-black uppercase tracking-widest border-b border-gray-100">
              <tr>
                <th className="px-8 py-5">{t.colId}</th>
                {currentUser.role !== 'patient' && <th className="px-8 py-5">{t.colPatient}</th>}
                <th className="px-8 py-5">{t.colMed}</th>
                <th className="px-8 py-5">{t.colDate}</th>
                <th className="px-8 py-5">{t.colStatus}</th>
                <th className="px-8 py-5 text-center">{t.colActions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredRequests.map((req) => (
                <tr key={req.id} className="hover:bg-indigo-50/30 transition-colors group">
                  <td className="px-8 py-5 font-black text-gray-900">{req.id}</td>
                  {currentUser.role !== 'patient' && <td className="px-8 py-5 font-bold text-gray-700">{getText(req.patientName, lang)}</td>}
                  <td className="px-8 py-5 font-black text-indigo-700 text-lg">{getText(req.medicationName, lang)} <span className="text-gray-400 text-sm font-bold ml-1">({req.dose})</span></td>
                  <td className="px-8 py-5 font-bold text-gray-500">{req.date}</td>
                  <td className="px-8 py-5">
                    <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black border-2 ${getStatusDetails(req.status).color}`}>
                      {getStatusDetails(req.status).icon} {getStatusDetails(req.status).label}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-center">
                    <button onClick={() => setSelectedRequest(req)} className="bg-white text-indigo-600 border-2 border-indigo-100 hover:border-indigo-600 font-black px-6 py-2.5 rounded-2xl transition-all inline-flex items-center gap-2 group-hover:shadow-lg">
                      <Eye size={18} /> <span className="text-sm">{t.viewDetails}</span>
                    </button>
                  </td>
                </tr>
              ))}
              {filteredRequests.length === 0 && (
                <tr>
                  <td colSpan={currentUser.role !== 'patient' ? 6 : 5} className="px-8 py-20 text-center text-gray-400 font-black text-xl">
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

  // --- Auth Screen (Redesigned) ---
  if (!isAuthenticated) {
    return (
      <div dir={lang === 'ar' ? 'rtl' : 'ltr'} className={`min-h-screen bg-[#F8FAFC] flex flex-col justify-center items-center p-4 font-sans ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
        <style dangerouslySetInnerHTML={{__html: `@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;900&family=Inter:wght@400;500;600;700;800;900&display=swap'); body { font-family: ${lang === 'ar' ? "'Tajawal', sans-serif" : "'Inter', sans-serif"}; }`}} />
        
        <div className="absolute top-8 right-8 left-8 flex justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-3 rounded-[1.25rem] text-white shadow-2xl shadow-indigo-200"><HeartPulse size={32} /></div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tighter">{t.appTitle}<span className="text-indigo-600">{t.appTitleHighlight}</span></h1>
          </div>
          <button onClick={toggleLanguage} className="flex items-center gap-2 px-5 py-3 bg-white shadow-sm hover:bg-gray-50 border border-gray-100 text-gray-900 rounded-2xl font-black transition-all">
            <Globe size={20} /> <span className="pt-0.5">{lang === 'ar' ? 'English' : 'العربية'}</span>
          </button>
        </div>

        <div className="bg-white p-10 md:p-14 rounded-[3rem] shadow-2xl w-full max-w-lg text-center border border-gray-50 animate-in fade-in zoom-in duration-700">
          <h2 className="text-4xl font-black text-gray-900 mb-3 tracking-tight">{t.loginTitle}</h2>
          <p className="text-gray-500 font-bold mb-10 text-lg">{t.loginSubtitle}</p>

          <div className="flex bg-gray-100 p-1.5 rounded-[1.5rem] mb-10">
            <button onClick={() => setAuthMode('signin')} className={`flex-1 py-3.5 rounded-[1.25rem] font-black text-base transition-all ${authMode === 'signin' ? 'bg-white shadow-md text-indigo-700' : 'text-gray-500 hover:text-gray-700'}`}>{t.signIn}</button>
            <button onClick={() => setAuthMode('signup')} className={`flex-1 py-3.5 rounded-[1.25rem] font-black text-base transition-all ${authMode === 'signup' ? 'bg-white shadow-md text-indigo-700' : 'text-gray-500 hover:text-gray-700'}`}>{t.signUp}</button>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-6 mb-10 text-left" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
            <div className="flex gap-2 p-1.5 bg-gray-50 rounded-[1.5rem] border border-gray-100 mb-4">
              {['patient', 'doctor', 'pharmacy'].map(role => (
                <button
                  key={role}
                  type="button"
                  onClick={() => setSelectedRole(role)}
                  className={`flex-1 py-3 rounded-[1.25rem] text-sm font-black transition-all ${selectedRole === role ? 'bg-white shadow-md text-indigo-700 border border-gray-200' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  {role === 'doctor' ? t.doctorRole : role === 'patient' ? t.patientRole : t.pharmacyRole}
                </button>
              ))}
            </div>
            <div className="space-y-4">
              <div className="relative">
                <Mail className={`absolute ${lang === 'ar' ? 'right-5' : 'left-5'} top-5 text-gray-400`} size={20} />
                <input type="email" required placeholder={t.email} className={`w-full bg-gray-50 border border-gray-200 rounded-[1.5rem] py-5 outline-none focus:ring-4 focus:ring-indigo-100 focus:bg-white transition-all text-lg font-medium ${lang === 'ar' ? 'pr-14 pl-6 text-right' : 'pl-14 pr-6 text-left'}`} />
              </div>
              <div className="relative">
                <Lock className={`absolute ${lang === 'ar' ? 'right-5' : 'left-5'} top-5 text-gray-400`} size={20} />
                <input type="password" required placeholder={t.password} className={`w-full bg-gray-50 border border-gray-200 rounded-[1.5rem] py-5 outline-none focus:ring-4 focus:ring-indigo-100 focus:bg-white transition-all text-lg font-medium ${lang === 'ar' ? 'pr-14 pl-6 text-right' : 'pl-14 pr-6 text-left'}`} />
              </div>
            </div>
            <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-5 rounded-[1.5rem] transition-all shadow-xl shadow-indigo-100 mt-4 text-xl active:scale-95">
              {authMode === 'signin' ? t.signIn : t.signUp}
            </button>
          </form>

          <div className="flex items-start gap-4 bg-emerald-50 p-6 rounded-[1.75rem] text-left text-emerald-900" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
            <ShieldCheck size={28} className="shrink-0 text-emerald-600" />
            <p className="text-sm font-bold leading-relaxed">{t.privacyNotice}</p>
          </div>

          <div className="mt-12 pt-10 border-t border-gray-100">
            <p className="text-xs text-gray-400 font-black mb-5 uppercase tracking-[0.2em]">{t.demoLogins}</p>
            <div className="flex justify-center flex-wrap gap-3">
              {MOCK_USERS.map(user => (
                <button key={user.id} onClick={() => handleLogin(user)} className="px-5 py-2.5 bg-gray-100 hover:bg-indigo-100 text-gray-700 hover:text-indigo-800 text-sm font-black rounded-2xl transition-all active:scale-95">
                  {user.role === 'doctor' ? t.doctorRole : user.role === 'patient' ? t.patientRole : t.pharmacyRole}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- Main Layout ---
  const visibleNavItems = navItems.filter(item => item.roles.includes(currentUser.role));

  return (
    <div dir={lang === 'ar' ? 'rtl' : 'ltr'} className={`flex h-screen bg-[#F8FAFC] font-sans ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
      <style dangerouslySetInnerHTML={{__html: `@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;900&family=Inter:wght@400;500;600;700;800;900&display=swap'); body { font-family: ${lang === 'ar' ? "'Tajawal', sans-serif" : "'Inter', sans-serif"}; overflow: hidden; }`}} />
      
      {/* Sidebar Overlay (Mobile) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 lg:hidden" onClick={() => setIsMobileMenuOpen(false)}></div>
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 ${lang === 'ar' ? 'right-0' : 'left-0'} z-40 w-80 bg-white border-${lang === 'ar' ? 'l' : 'r'} border-gray-100 transform transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) lg:translate-x-0 lg:static flex flex-col ${isMobileMenuOpen ? 'translate-x-0' : (lang === 'ar' ? 'translate-x-full' : '-translate-x-full')}`}>
        <div className="h-24 flex items-center justify-between px-8 border-b border-gray-50">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2.5 rounded-[1rem] text-white shadow-lg shadow-indigo-100"><HeartPulse size={28} /></div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tighter">{t.appTitle}<span className="text-indigo-600">{t.appTitleHighlight}</span></h1>
          </div>
          <button onClick={() => setIsMobileMenuOpen(false)} className="lg:hidden text-gray-400 hover:text-gray-900 p-2 hover:bg-gray-50 rounded-xl transition-all">
            <X size={28} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-8 px-5 space-y-2">
          {visibleNavItems.map(item => (
            <button 
              key={item.id} 
              onClick={() => { setCurrentView(item.id); setIsMobileMenuOpen(false); }}
              className={`w-full flex items-center gap-5 px-6 py-4 rounded-[1.25rem] font-black text-lg transition-all ${currentView === item.id ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-100' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        <div className="p-6 border-t border-gray-50">
          <div className="bg-gray-50 rounded-[1.5rem] p-5 flex items-center gap-4 mb-5 border border-gray-100">
            <div className="w-12 h-12 rounded-[1rem] bg-indigo-100 text-indigo-700 flex justify-center items-center font-black">
              <User size={24} />
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-base font-black text-gray-900 truncate">{getText(currentUser.name, lang)}</p>
              <p className="text-xs text-gray-400 font-black uppercase tracking-widest mt-0.5">{currentUser.role === 'doctor' ? t.doctorRole : currentUser.role === 'patient' ? t.patientRole : t.pharmacyRole}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="w-full flex items-center gap-4 px-6 py-4 rounded-[1.25rem] font-black text-red-600 hover:bg-red-50 transition-all active:scale-95">
            <LogOut size={24} /> <span>{t.logout}</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-[#F8FAFC]">
        {/* Top Header */}
        <header className="h-24 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-6 lg:px-12 shrink-0 z-20">
          <div className="flex items-center gap-5">
            <button onClick={() => setIsMobileMenuOpen(true)} className="p-3 lg:hidden text-gray-500 hover:bg-gray-50 rounded-[1rem] border border-gray-100 transition-all">
              <Menu size={28} />
            </button>
            <h2 className="text-2xl font-black text-gray-900 hidden sm:block tracking-tight">
              {navItems.find(i => i.id === currentView)?.label}
            </h2>
          </div>
          
          <div className="flex items-center gap-4">
            <button onClick={toggleLanguage} className="flex items-center gap-3 px-5 py-3 bg-gray-50 hover:bg-gray-100 text-gray-900 rounded-[1rem] font-black transition-all border border-gray-100">
              <Globe size={18} /> <span>{lang === 'ar' ? 'EN' : 'AR'}</span>
            </button>
            <button className="relative p-3 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-[1rem] border border-gray-100 transition-all group">
              <Bell size={24} />
              <span className="absolute top-2 right-2 w-3.5 h-3.5 bg-rose-500 rounded-full border-[3px] border-white group-hover:scale-110 transition-all"></span>
            </button>
          </div>
        </header>

        {/* Dynamic View Content */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-12 scroll-smooth">
          {currentView === 'dashboard' && renderDashboard()}
          {currentView === 'new-request' && renderNewRequest()}
          {currentView === 'requests' && renderRequestsList()}
          {/* ... Other views like history/settings follow the same style ... */}
          {currentView === 'history' && (
             <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
               <h2 className="text-3xl font-black text-gray-900 tracking-tight">{t.historyTitle}</h2>
               <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                  <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-3 text-rose-600"><AlertCircle/> {t.allergiesTitle}</h3>
                  <div className="flex flex-wrap gap-3">
                    {allergies.map(al => (
                      <span key={al.id} className="bg-rose-50 text-rose-700 px-5 py-2.5 rounded-2xl font-black border-2 border-rose-100 flex items-center gap-2">
                        {getText(al.text, lang)}
                      </span>
                    ))}
                  </div>
               </div>
               <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-50">
                  {patientHistory.map(record => (
                    <div key={record.id} className="p-8 hover:bg-gray-50 transition-all">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="text-xl font-black text-gray-900">{getText(record.diagnosis, lang)}</h4>
                        <span className="text-sm font-black text-indigo-600 bg-indigo-50 px-4 py-1.5 rounded-full">{record.date}</span>
                      </div>
                      <p className="text-gray-600 font-medium leading-relaxed bg-gray-50/50 p-6 rounded-[1.5rem] border border-gray-100">{getText(record.notes, lang)}</p>
                    </div>
                  ))}
               </div>
             </div>
          )}
        </div>
      </main>

      {/* Detail Modal (Redesigned) */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex justify-center items-center p-6 animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-xl rounded-[3rem] p-10 shadow-2xl relative animate-in zoom-in-95 duration-500" style={{ direction: lang === 'ar' ? 'rtl' : 'ltr' }}>
            <button onClick={() => setSelectedRequest(null)} className="absolute top-8 right-8 lg:right-10 p-3 text-gray-400 hover:text-rose-600 rounded-2xl hover:bg-rose-50 transition-all"><X size={32}/></button>
            
            <div className="mb-10">
              <h3 className="text-3xl font-black text-gray-900 tracking-tight">{t.modalTitle}</h3>
              <p className="text-indigo-600 font-black text-lg mt-1 tracking-widest">#{selectedRequest.id}</p>
            </div>
            
            <div className="space-y-6">
              <div className="flex justify-between items-center bg-gray-50 p-5 rounded-[1.75rem] border border-gray-100">
                <span className="text-gray-500 font-black uppercase tracking-widest text-sm">{t.currentStatus}</span>
                <span className={`px-5 py-2 rounded-full font-black flex items-center gap-2 border-2 ${getStatusDetails(selectedRequest.status).color}`}>
                  {getStatusDetails(selectedRequest.status).icon} {getStatusDetails(selectedRequest.status).label}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-8 py-2">
                <div>
                  <p className="text-gray-400 font-black uppercase tracking-widest text-xs mb-2">{t.patName}</p>
                  <p className="font-black text-gray-900 text-xl">{getText(selectedRequest.patientName, lang)}</p>
                </div>
                <div>
                  <p className="text-gray-400 font-black uppercase tracking-widest text-xs mb-2">{t.reqDate}</p>
                  <p className="font-black text-gray-900 text-xl">{selectedRequest.date}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-gray-400 font-black uppercase tracking-widest text-xs mb-2">{t.reqMed}</p>
                  <p className="font-black text-indigo-700 text-3xl">{getText(selectedRequest.medicationName, lang)}</p>
                </div>
                <div className="col-span-2 bg-indigo-50/50 p-6 rounded-[2rem] border border-indigo-100">
                  <p className="text-indigo-900 font-black flex items-center gap-3 text-lg mb-1"><FileText/> {selectedRequest.dose} — {selectedRequest.duration} {lang === 'ar' ? 'أيام' : 'Days'}</p>
                  <p className="text-gray-500 font-bold">{t.prescribedBy} {getText(selectedRequest.prescribedBy, lang)}</p>
                </div>
              </div>
            </div>

            <div className="mt-12 flex gap-4">
              {currentUser.role === 'doctor' && selectedRequest.status === 'Pending' && (
                <>
                  <button onClick={() => { handleStatusChange(selectedRequest.id, 'Approved'); setSelectedRequest(null); }} className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-black py-5 rounded-2xl transition-all shadow-xl shadow-emerald-100 active:scale-95 text-lg">{t.btnApprove}</button>
                  <button onClick={() => { handleStatusChange(selectedRequest.id, 'Rejected'); setSelectedRequest(null); }} className="flex-1 bg-rose-50 hover:bg-rose-100 text-rose-700 font-black py-5 rounded-2xl transition-all border-2 border-rose-100 active:scale-95 text-lg">{t.btnReject}</button>
                </>
              )}
              {currentUser.role === 'pharmacy' && selectedRequest.status === 'Approved' && (
                <button onClick={() => { handleStatusChange(selectedRequest.id, 'Dispensed'); setSelectedRequest(null); }} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-5 rounded-2xl transition-all shadow-xl shadow-indigo-100 active:scale-95 text-lg flex items-center justify-center gap-3"><Truck/> {t.btnDispense}</button>
              )}
              {currentUser.role === 'patient' && (
                <button onClick={() => setSelectedRequest(null)} className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-black py-5 rounded-2xl transition-all active:scale-95 text-lg">إغلاق</button>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}