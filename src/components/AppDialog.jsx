// AppDialog.jsx - التصدير الافتراضي (Default Export)

export default function AppDialog({ isOpen, handleClose, children }){
  
  // لا تعرض المكون إذا كان مغلقًا
  if (!isOpen) return null;

  return(
    // 1. Overlay (الخلفية): داكنة، شفافة، ومضبابية
    <div 
      // fixed inset-0: لتغطية الشاشة بالكامل
      // bg-gray-900/70: خلفية شبه شفافة داكنة (70% شفافية)
      // backdrop-blur-sm: يضيف تأثير الضبابية على الخلفية (ميزة عصرية)
      // z-50: يضمن ظهور النافذة فوق كل عناصر الصفحة
      className="fixed inset-0 bg-gray-900/70 flex items-center justify-center p-4 sm:p-6 z-50 overflow-y-auto backdrop-blur-sm transition-opacity duration-300"
      onClick={handleClose} 
      aria-modal="true"
      role="dialog"
    >
      
      {/* 2. Modal/Dialog Content (النافذة الفعلية): الصندوق الطافي */}
      <div 
        // max-w-lg: عرض معقول على الشاشات الكبيرة
        // p-6 sm:p-8: مساحة داخلية جيدة
        // rounded-3xl: حواف دائرية كبيرة لمظهر ناعم
        // shadow-2xl: ظل عميق لتبدو نافرة
        // transform transition-all duration-300: للانتقال البصري عند الظهور
        className="relative mt-0 p-6 sm:p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl ring-1 ring-black/5 w-full max-w-lg 
                   transform transition-all duration-300 ease-out" 
        onClick={(e) => e.stopPropagation()} // منع الإغلاق عند النقر داخل النافذة
      >
        
        {/* زر الإغلاق (X) */}
        <button
          onClick={handleClose}
          // تصميم دائري وأنيق للزر
          className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:text-gray-500 transition-colors"
          aria-label="إغلاق النافذة"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        {/* محتوى النافذة المنبثقة (يأتي من الـ children) */}
        {children}

      </div>
    </div>
  )
}