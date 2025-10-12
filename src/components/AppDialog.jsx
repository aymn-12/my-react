// AppDialog.jsx - التصدير الافتراضي (Default Export)

export default function AppDialog({ isOpen, handleClose, children }){
  
  if (!isOpen) return null;

  return(
    <div 
     
      className="fixed inset-0 bg-gray-900/70 flex items-center justify-center p-4 sm:p-6 z-50 overflow-y-auto backdrop-blur-sm transition-opacity duration-300"
      onClick={handleClose} 
      aria-modal="true"
      role="dialog"
    >
      
      <div 
       
        className="relative mt-0 p-6 sm:p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl ring-1 ring-black/5 w-full max-w-lg 
                   transform transition-all duration-300 ease-out" 
        onClick={(e) => e.stopPropagation()} // منع الإغلاق عند النقر داخل النافذة
      >

        {children}
      </div>
    </div>
  )
}