import { mport { , eState, us, ontext, u, Effect, } eMem "react";
import { TodoContext } from "../Context/TodoContext";
import { UIContext } from "../Context/UIContext";
import Header from "../components/Header";
import TodoList from "../components/TodoList";
import AppDialog from "../components/AppDialog";
import StatsPanel from "../components/StatsPanel";
import CelebtationEffect from "../components/CelebtationEffect";




const Home = () => {
  const { addTodo, deleteTodo, todos, userStats } = useContext(TodoContext);
  const {showSnackbar} = useContext(UIContext)

  const [input, setInput] = useState("");
  const [dialogState, setDialogState] = useState({
    isOpen: false,
    type: null,
    todo: {id : null,text:''}
  });

  

  const [celebration, setCelebration] = useState({
    show: false,
    type: 'task'
  });

  const [previousLevel, setPreviousLevel] = useState(userStats?.level || 1);

  // تتبع تغييرات المستوى والاحتفال
  useEffect(() => {
    if (userStats && userStats.level > previousLevel) {
      setCelebration({ show: true, type: 'level' });
      setPreviousLevel(userStats.level);
    }
  }, [userStats, previousLevel]);
  
 
  
  const closeDialog = () => setDialogState({isOpen: false, type: null, todo: {id:null , text:''}})

  const openDeleteConfirmDialog = (id,text) => {
    setDialogState({ 
      isOpen: true, 
      type: 'DELETE', 
      todo: { id, text } 
    });
  };

  const openUpdate = (id) => {
    setDialogState({isOpen: true, 
    type: 'UPDATE_SUCCESS', 
    todo : {id}})
  }

  const handleConfirmDelete = () => {
    if(dialogState.type === 'DELETE' && dialogState.todo?.id){
      deleteTodo(dialogState.todo.id)
      closeDialog();
    }
  }

  const activeTodos = useMemo(() => {
    return todos.filter(todo => !todo.completed);
  },[todos])

  const handleAdd = () => {
    const normalize = str => str.trim().toLowerCase().replace(/\s+/g, ' ');
    const value = normalize(input);
    if (!value) return showSnackbar('Write The Task','error');
  
    const exists = activeTodos.some(todo => normalize(todo.text) === value);
  
    if (exists) return showSnackbar('There is the same task in the list', 'warning');

    addTodo(input.trim());
    setInput("");
    showSnackbar("Add to List", 'success')
  };
  
  function handlekeydown(e){
    if(e.key == 'Enter'){
      handleAdd()
    }
  }

  const renederDialogContent = () => {
    if(!dialogState.isOpen || !dialogState.type) return null

    

    switch(dialogState.type){
      case 'DELETE':
  return (
    <div className="text-center p-2">
      {/* أيقونة تحذير - دائرة حمراء ناعمة */}
      <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-50 ring-2 ring-red-200">
        <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.3 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>

      <h3 className="text-xl font-extrabold text-white mt-4">تأكيد الحذف</h3>
      <p  className="text-base text-white mt-2">
          هل انت متاكد من الحذف نهائيا 
      </p>
      
      
      {/* الأزرار: تصميم عصري */}
      <div className="mt-6 flex justify-center gap-3">
        {/* زر الإلغاء (خلفية شفافة / إطار خفيف) */}
        <button 
          onClick={closeDialog} 
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-700 font-semibold hover:bg-gray-50 transition shadow-sm"
        >
          إلغاء
        </button>
        {/* زر التأكيد (أحمر ساطع / ظل قوي) */}
        <button 
          onClick={handleConfirmDelete} 
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-transparent bg-red-600 text-white font-semibold hover:bg-red-700 transition "
        >
          نعم، احذفها
        </button>
      </div>
    </div>
  );
  case 'UPDATE_SUCCESS':
    return (
      <div className="text-center p-2">
        {/* أيقونة النجاح - دائرة خضراء ناعمة */}
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-50 ring-2 ring-green-200">
          <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        
        <h3 className="text-xl font-extrabold text-white mt-4">تم التعديل بنجاح!</h3>
        <p className="text-base text-white mt-2">
           تم تحديث العملية بنجاح 
           
        </p>
        
        {/* زر الإغلاق: باللون البنفسجي ليتناسب مع ثيم التطبيق */}
        <div className="mt-6 flex justify-center">
          <button 
            onClick={closeDialog} 
            // استخدام اللون الأرجواني (Purple) الخاص بـ Home.jsx
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl border border-transparent bg-purple-600 text-white font-semibold hover:bg-purple-700 transition "
          >
            إغلاق
          </button>
        </div>
      </div>
    );

      default:
        return null;
    }
  }

  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-purple-400/20 to-purple-700/30 flex flex-col items-center p-6">
      
      <div className="w-full max-w-2xl">
        <Header />
        <StatsPanel />


        <div className="bg-white/90 backdrop-blur rounded-xl shadow-md ring-1 ring-black/5 p-4 sm:p-6 mb-6">
          <div className="flex gap-2">
            <input
              dir="rtl"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="أضف مهمة جديدة..."
              onKeyDown={handlekeydown}
              className="w-full px-4 py-2 rounded-lg bg-white text-neutral-800 placeholder-neutral-400 outline-none ring-1 ring-black/10 focus:ring-purple-400"
            />
            <button
              onClick={handleAdd}
              className="inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 disabled:opacity-50 disabled:cursor-not-allowed bg-white text-purple-600 hover:bg-neutral-100 px-4 sm:px-5"
            >
              إضافة
            </button>
          </div>
        </div>
        <div className="bg-white/90 backdrop-blur rounded-xl shadow-md ring-1 ring-black/5 p-2 sm:p-4">
        <TodoList 
           openDeleteConfirmDialog={openDeleteConfirmDialog} 
           openUpdateSuccessDialog={openUpdate}
          />
        </div>
      </div>

      
    
    {/* استخدام AppDialog مرة واحدة في Home */}
    <AppDialog 
      isOpen={dialogState.isOpen} 
      handleClose={closeDialog}
    >
      {renederDialogContent()}
    </AppDialog>

    

      <footer className="w-full max-w-2xl mt-10">
        <div className="relative">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-emerald-400 rounded-full opacity-70" />
          <div className="text-center text-xs sm:text-sm text-neutral-600/80 bg-white/70 backdrop-blur rounded-xl py-4 ring-1 ring-black/5 shadow-sm">
            <div className="flex items-center justify-center gap-2 mb-1">
              <span className="align-middle">© {new Date().getFullYear()}</span>
              <span className="text-gradient-animated font-semibold">Aymen.ceo, Azez.asst</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <a href="https://t.me/gsap_100" className="text-neutral-500 hover:text-sky-600 transition-colors" aria-label="Telegram">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9.036 15.75l-.363 5.107c.518 0 .742-.222 1.011-.486l2.427-2.325 5.027 3.68c.922.509 1.579.242 1.832-.854l3.32-15.52h.001c.294-1.37-.495-1.907-1.397-1.57L1.72 9.51c-1.34.52-1.32 1.268-.228 1.606l5.044 1.575 11.7-7.384c.552-.375 1.056-.167.642.208z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/code.edition1?igsh=YmxheXpzdjdsNzQ1" className="text-neutral-500 hover:text-pink-600 transition-colors" aria-label="Instagram">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm10 2c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V7c0-1.7 1.3-3 3-3h10zm-5 3.5A5.5 5.5 0 1 0 17.5 13 5.51 5.51 0 0 0 12 7.5zm0 2A3.5 3.5 0 1 1 8.5 13 3.51 3.51 0 0 1 12 9.5zM18 6.5a1 1 0 1 0 1 1 1 1 0 0 0-1-1z"/></svg>
              </a>
            </div>
            <div className="mt-1 text-[11px] text-neutral-500">جميع الحقوق محفوظة</div>
          </div>
        </div>
      </footer>

      <CelebtationEffect 
        show={celebration.show}
        type={celebration.type}
        onComplete={() => setCelebration({ show: false, type: 'task' })}
      />


    </div>
  </>
  );
};

export default Home;
