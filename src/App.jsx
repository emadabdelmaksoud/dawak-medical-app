import React, { useState, useEffect } from 'react';
import { 
  Home, PlusCircle, List, History, Bell, Settings, PhoneCall, Search, Filter,
  CheckCircle, XCircle, Clock, AlertCircle, User, Menu, X, FileText,
  MessageSquare, Activity, Send, Eye, Globe, LogOut, MapPin, AlarmClock,
  Edit3, Truck, ShieldCheck, Mail, Lock, Stethoscope, HeartPulse,
  ChevronRight, ArrowRight, ArrowLeft
} from 'lucide-react';

// --- Global Style Injection for Vercel/Production ---
// This ensures custom rounded corners and fonts work even without a tailwind.config.js
const GlobalStyles = () => (
  <style dangerouslySetInnerHTML={{ __html: `
    @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800;900&family=Inter:wght@400;500;600;700;800&display=swap');
    
    :root {
      --primary: #4f46e5;
      --primary-soft: #eef2ff;
    }

    body {
      margin: 0;
      padding: 0;
      background-color: #f8fafc;
      -webkit-font-smoothing: antialiased;
    }

    /* Force high-fidelity rounding if Tailwind config is missing in Vercel */
    .custom-rounded-xl { border-radius: 2.5rem !important; }
    .custom-rounded-lg { border-radius: 2rem !important; }
    .custom-shadow-premium { box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02) !important; }
    
    .font-ar { font-family: 'Tajawal', sans-serif !important; }
    .font-en { font-family: 'Inter', sans-serif !important; }

    /* Custom scrollbar for that clean tech look */
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
    ::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
  `}} />
);

// --- Translations ---
const TRANSLATIONS = {
  ar: {
    appTitle: "دواء", appTitleHighlight: "ك",
    loginTitle: "مرحباً بك في دواءك", loginSubtitle: "نظام ذكي لإدارة الوصفات الطبية وصرف الأدوية",
    signIn: "تسجيل الدخول", signUp: "إنشاء حساب",
    email: "البريد الإلكتروني", password: "كلمة المرور",
    googleSignIn: "تسجيل الدخول بواسطة Google",
    privacyNotice: "بياناتك مشفرة بالكامل ومتوافقة مع معايير HIPAA و GDPR العالمية.",
    demoLogins: "أو الدخول بصفة تجريبية:",
    doctorRole: "طبيب", patientRole: "مريض", pharmacyRole: "صيدلية",
    dashboard: "الرئيسية", newRequest: "طلب جديد", requestsList: "طلباتي", history: "السجل الطبي", notifications: "الإشعارات", settings: "الإعدادات", support: "الدعم", alarms: "المنبه", logout: "خروج",
    welcome: "مرحباً،", totalReqs: "إجمالي الطلبات", pending: "قيد الانتظار", approved: "جاهز للصرف", rejected: "مرفوض", dispensed: "تم التوصيل",
    latestReqs: "آخر النشاطات", viewAll: "عرض الكل",
    newReqTitle: "إنشاء طلب دواء جديد", 
    medName: "اسم الدواء", medDose: "الجرعة", medDuration: "المدة (أيام)", 
    medPlaceholder: "مثال: بانادول", dosePlaceholder: "500ملجم", durationPlaceholder: "7",
    notes: "ملاحظات إضافية", notesPlaceholder: "أضف ملاحظاتك للطبيب أو الصيدلي...", createBtn: "تأكيد الطلب",
    reqListTitle: "إدارة الطلبات", searchPlaceholder: "بحث عن رقم الطلب أو الدواء...", allStatuses: "الكل",
    colId: "الرقم", colPatient: "المريض", colMed: "الدواء", colDate: "التاريخ", colStatus: "الحالة", colActions: "إجراءات",
    modalTitle: "تفاصيل الوصفة", currentStatus: "الحالة:",
    patName: "اسم المريض", reqDate: "تاريخ الطلب", reqMed: "الدواء", reqDoseDuration: "الجرعة والمدة",
    prescribedBy: "وصف بواسطة:",
    btnApprove: "قبول الطلب", btnDispense: "صرف وتوصيل",
  },
  en: {
    appTitle: "Dawa", appTitleHighlight: "k",
    loginTitle: "Welcome to Dawak", loginSubtitle: "Smart Prescription & Medication Management",
    signIn: "Sign In", signUp: "Sign Up",
    email: "Email Address", password: "Password",
    googleSignIn: "Sign in with Google",
    privacyNotice: "Your data is fully encrypted and HIPAA/GDPR compliant.",
    demoLogins: "Login as:",
    doctorRole: "Doctor", patientRole: "Patient", pharmacyRole: "Pharmacy",
    dashboard: "Dashboard", newRequest: "New Request", requestsList: "Requests", history: "Medical History", notifications: "Notifications", settings: "Settings", support: "Support", alarms: "Alarms", logout: "Logout",
    welcome: "Welcome,", totalReqs: "Total", pending: "Pending", approved: "Ready", rejected: "Rejected", dispensed: "Delivered",
    latestReqs: "Recent Activity", viewAll: "View All",
    newReqTitle: "Create Medication Request", 
    medName: "Medication", medDose: "Dosage", medDuration: "Duration (Days)",
    medPlaceholder: "e.g., Panadol", dosePlaceholder: "500mg", durationPlaceholder: "7",
    notes: "Notes", notesPlaceholder: "Add any notes...", createBtn: "Confirm Request",
    reqListTitle: "Manage Requests", searchPlaceholder: "Search ID or Meds...", allStatuses: "All",
    colId: "ID", colPatient: "Patient", colMed: "Medication", colDate: "Date", colStatus: "Status", colActions: "Actions",
    modalTitle: "Request Details", currentStatus: "Status:",
    patName: "Patient", reqDate: "Date", reqMed: "Medication", reqDoseDuration: "Dose & Duration",
    prescribedBy: "Prescribed By:",
    btnApprove: "Approve", btnDispense: "Dispense",
  }
};

// --- Mock Data ---
const MOCK_USERS = [
  { id: 'u1', role: 'doctor', name: { ar: 'د. أحمد محمود', en: 'Dr. Ahmed Mahmoud' } },
  { id: 'u2', role: 'patient', name: { ar: 'سارة خالد', en: 'Sarah Khaled' } },
  { id: 'u3', role: 'pharmacy', name: { ar: 'صيدلية الشفاء', en: 'Al-Shifa Pharmacy' } },
];

const INITIAL_REQUESTS = [
  { id: 'D-2024-101', patientName: { ar: 'سارة خالد', en: 'Sarah Khaled' }, patientId: 'u2', prescribedBy: { ar: 'د. أحمد محمود', en: 'Dr. Ahmed Mahmoud' }, medicationName: { ar: 'أملوديبين', en: 'Amlodipine' }, dose: '5mg', duration: '30', date: '2024-05-12', status: 'Pending', notes: { ar: 'مراجعة دورية', en: 'Routine check' } },
  { id: 'D-2024-102', patientName: { ar: 'محمد علي', en: 'Mohamed Ali' }, patientId: 'p2', prescribedBy: { ar: 'د. يوسف عمر', en: 'Dr. Youssef Omar' }, medicationName: { ar: 'ميتفورمين', en: 'Metformin' }, dose: '1000mg', duration: '60', date: '2024-05-11', status: 'Approved', notes: { ar: 'للسكري', en: 'For Diabetes' } },
  { id: 'D-2024-103', patientName: { ar: 'ليلى حسن', en: 'Layla Hassan' }, patientId: 'p3', prescribedBy: { ar: 'د. أحمد محمود', en: 'Dr. Ahmed Mahmoud' }, medicationName: { ar: 'أوميبرازول', en: 'Omeprazole' }, dose: '20mg', duration: '14', date: '2024-05-10', status: 'Dispensed', notes: { ar: 'قبل الفطور', en: 'Before breakfast' } },
];

const getText = (obj, l) => (obj && typeof obj === 'object' ? obj[l] : obj) || '';

export default function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [lang, setLang] = useState('ar');
  const [user, setUser] = useState(null);
  const [view, setView] = useState('dashboard');
  const [requests, setRequests] = useState(INITIAL_REQUESTS);
  const [selectedReq, setSelectedReq] = useState(null);
  const [search, setSearch] = useState('');

  // Form states
  const [formMed, setFormMed] = useState('');
  const [formDose, setFormDose] = useState('');
  const [formDur, setFormDur] = useState('');

  const t = TRANSLATIONS[lang];
  const isRtl = lang === 'ar';
  const currentFont = isRtl ? 'font-ar' : 'font-en';

  const login = (role) => {
    const found = MOCK_USERS.find(u => u.role === role) || MOCK_USERS[1];
    setUser(found);
    setIsAuth(true);
  };

  const getStatusStyle = (s) => {
    switch(s) {
      case 'Pending': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'Approved': return 'bg-indigo-50 text-indigo-600 border-indigo-100';
      case 'Dispensed': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      default: return 'bg-slate-50 text-slate-500 border-slate-100';
    }
  };

  const filtered = requests.filter(r => {
    const searchMatch = getText(r.medicationName, lang).toLowerCase().includes(search.toLowerCase()) || r.id.toLowerCase().includes(search.toLowerCase());
    return searchMatch;
  });

  if (!isAuth) {
    return (
      <div dir={isRtl ? 'rtl' : 'ltr'} className={`min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 ${currentFont}`}>
        <GlobalStyles />
        <div className="flex items-center gap-3 mb-12">
          <div className="bg-indigo-600 p-3 rounded-2xl text-white shadow-xl shadow-indigo-100"><HeartPulse size={36} /></div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter">{t.appTitle}<span className="text-indigo-600">{t.appTitleHighlight}</span></h1>
        </div>

        <div className="bg-white w-full max-w-md custom-rounded-xl shadow-2xl shadow-slate-200/60 p-10 border border-white">
          <h2 className="text-2xl font-black text-slate-900 mb-2">{t.loginTitle}</h2>
          <p className="text-slate-500 font-medium mb-8 leading-relaxed">{t.loginSubtitle}</p>

          <div className="space-y-4 mb-8">
            <input type="email" placeholder={t.email} className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 focus:ring-4 focus:ring-indigo-50 outline-none transition-all font-medium" />
            <input type="password" placeholder={t.password} className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 focus:ring-4 focus:ring-indigo-50 outline-none transition-all font-medium" />
          </div>

          <button onClick={() => login('patient')} className="w-full bg-indigo-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all mb-10 text-lg">
            {t.signIn}
          </button>

          <div className="text-center space-y-4">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{t.demoLogins}</p>
            <div className="flex gap-2">
              <button onClick={() => login('patient')} className="flex-1 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 p-3 rounded-xl text-sm font-bold text-slate-600 transition-all">{t.patientRole}</button>
              <button onClick={() => login('doctor')} className="flex-1 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 p-3 rounded-xl text-sm font-bold text-slate-600 transition-all">{t.doctorRole}</button>
              <button onClick={() => login('pharmacy')} className="flex-1 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 p-3 rounded-xl text-sm font-bold text-slate-600 transition-all">{t.pharmacyRole}</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className={`flex h-screen bg-slate-50 text-slate-900 overflow-hidden ${currentFont}`}>
      <GlobalStyles />
      
      {/* Sidebar */}
      <aside className="w-72 bg-white border-e border-slate-100 hidden lg:flex flex-col p-8 shrink-0">
        <div className="flex items-center gap-3 mb-12">
          <div className="bg-indigo-600 p-2 rounded-xl text-white"><HeartPulse size={24} /></div>
          <h1 className="text-2xl font-black tracking-tighter">{t.appTitle}<span className="text-indigo-600">{t.appTitleHighlight}</span></h1>
        </div>

        <nav className="flex-1 space-y-2">
          {[
            { id: 'dashboard', icon: <Home size={20}/>, label: t.dashboard },
            { id: 'requests', icon: <List size={20}/>, label: t.requestsList },
            { id: 'support', icon: <PhoneCall size={20}/>, label: t.support },
            { id: 'settings', icon: <Settings size={20}/>, label: t.settings },
          ].map(item => (
            <button 
              key={item.id} 
              onClick={() => setView(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl font-bold transition-all ${view === item.id ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </nav>

        <button onClick={() => setIsAuth(false)} className="mt-auto flex items-center gap-4 px-4 py-3.5 rounded-2xl font-bold text-rose-500 hover:bg-rose-50 transition-all">
          <LogOut size={20}/> {t.logout}
        </button>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-8 lg:px-12 shrink-0">
          <h2 className="text-xl font-black capitalize">{t[view] || view}</h2>
          <div className="flex items-center gap-4">
            <button onClick={() => setLang(l => l === 'ar' ? 'en' : 'ar')} className="text-xs font-black bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 text-slate-600">{lang === 'ar' ? 'EN' : 'AR'}</button>
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-indigo-600 font-bold border border-slate-200">
              {user?.name[lang].charAt(0)}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 lg:p-12">
          {view === 'dashboard' && (
            <div className="animate-in fade-in slide-in-from-bottom-4">
              <h3 className="text-3xl font-black text-slate-900 mb-8">{t.welcome} {getText(user.name, lang)}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-white p-6 custom-rounded-lg border border-slate-100 shadow-sm flex items-center gap-6">
                  <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shrink-0"><FileText/></div>
                  <div>
                    <p className="text-slate-400 text-xs font-black uppercase tracking-widest">{t.totalReqs}</p>
                    <p className="text-3xl font-black">{requests.length}</p>
                  </div>
                </div>
                <div className="bg-white p-6 custom-rounded-lg border border-slate-100 shadow-sm flex items-center gap-6">
                  <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center shrink-0"><Clock/></div>
                  <div>
                    <p className="text-slate-400 text-xs font-black uppercase tracking-widest">{t.pending}</p>
                    <p className="text-3xl font-black">{requests.filter(r=>r.status==='Pending').length}</p>
                  </div>
                </div>
                <div className="bg-white p-6 custom-rounded-lg border border-slate-100 shadow-sm flex items-center gap-6">
                  <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0"><CheckCircle/></div>
                  <div>
                    <p className="text-slate-400 text-xs font-black uppercase tracking-widest">{t.approved}</p>
                    <p className="text-3xl font-black">{requests.filter(r=>r.status==='Approved').length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white custom-rounded-xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-slate-50 flex justify-between items-center">
                  <h4 className="text-xl font-black">{t.latestReqs}</h4>
                  <button onClick={() => setView('requests')} className="text-indigo-600 font-bold text-sm flex items-center gap-2">
                    {t.viewAll} <ChevronRight size={16}/>
                  </button>
                </div>
                <div className="divide-y divide-slate-50">
                  {filtered.slice(0, 4).map(req => (
                    <div key={req.id} onClick={() => setSelectedReq(req)} className="p-6 hover:bg-slate-50 flex items-center justify-between cursor-pointer group transition-all">
                      <div className="flex items-center gap-6">
                        <div className={`w-12 h-12 rounded-xl border flex items-center justify-center ${getStatusStyle(req.status)}`}>
                          <FileText size={20}/>
                        </div>
                        <div>
                          <p className="font-black text-slate-900 group-hover:text-indigo-600 transition-all">{getText(req.medicationName, lang)}</p>
                          <p className="text-sm text-slate-400 font-medium">{req.date}</p>
                        </div>
                      </div>
                      <span className={`px-4 py-1.5 rounded-full text-[11px] font-black border uppercase tracking-widest ${getStatusStyle(req.status)}`}>
                        {t[req.status] || req.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Modal - High Fidelity Restoration */}
      {selectedReq && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 animate-in fade-in">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setSelectedReq(null)}></div>
          <div className="bg-white w-full max-w-lg custom-rounded-xl shadow-2xl relative z-10 p-10" dir={isRtl ? 'rtl' : 'ltr'}>
            <div className="flex justify-between items-start mb-8">
              <div>
                <h3 className="text-3xl font-black text-slate-900 mb-1">{t.modalTitle}</h3>
                <p className="text-indigo-600 font-black tracking-widest uppercase text-sm">{selectedReq.id}</p>
              </div>
              <button onClick={() => setSelectedReq(null)} className="p-2 text-slate-400 hover:text-rose-500 transition-all"><X size={32}/></button>
            </div>

            <div className="space-y-6">
               <div className="bg-slate-50 p-6 custom-rounded-lg border border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-indigo-600 font-black">{getText(selectedReq.patientName, lang).charAt(0)}</div>
                    <div>
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{t.patName}</p>
                      <p className="text-xl font-black text-slate-900">{getText(selectedReq.patientName, lang)}</p>
                    </div>
                  </div>
                  <span className={`px-4 py-1.5 rounded-full text-[11px] font-black border uppercase tracking-widest ${getStatusStyle(selectedReq.status)}`}>{t[selectedReq.status] || selectedReq.status}</span>
               </div>

               <div className="bg-indigo-600 p-8 custom-rounded-lg text-white shadow-xl shadow-indigo-100 relative overflow-hidden">
                  <div className="relative z-10">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-80 mb-4">{lang === 'ar' ? 'الوصفة الطبية' : 'Prescription'}</p>
                    <p className="text-3xl font-black mb-2">{getText(selectedReq.medicationName, lang)}</p>
                    <p className="text-indigo-100 font-bold opacity-90 text-lg">{selectedReq.dose} — {selectedReq.duration} {lang === 'ar' ? 'أيام' : 'days'}</p>
                  </div>
                  <HeartPulse className="absolute -bottom-6 -right-6 text-white opacity-10" size={140} />
               </div>
            </div>

            <button onClick={() => setSelectedReq(null)} className="w-full mt-10 bg-slate-100 text-slate-600 font-black py-5 rounded-2xl hover:bg-slate-200 transition-all text-lg">
                {lang === 'ar' ? 'إغلاق' : 'Close'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}