import { useContext, useState } from "react"
import { TodoContext } from "../Context/TodoContext"

export default function CompletedTodo(){
   const {todos , deleteTodo} = useContext(TodoContext)
   const [showCompleted, setShowCompleted] = useState(false)
   
   // Calculate completed todos count
   const completedCount = todos.filter(todo => todo.completed).length
   const completedTodos = todos.filter(todo => todo.completed)

   const toggleShowCompleted = () => {
      setShowCompleted(!showCompleted)
   }

   if(completedCount === 0){
      return (
         <div className="py-8 text-center">
           <p className="text-neutral-500 text-sm">لا توجد مهام مكتملة</p>
         </div>
      )
   }

    return(
        <div className="mt-6">
            {/* Completed Todos Button */}
            <button 
               onClick={toggleShowCompleted}
               className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50 to-green-50 hover:from-emerald-100 hover:to-green-100 rounded-xl border border-emerald-200 transition-all duration-200 shadow-sm hover:shadow-md group"
            >
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center shadow-sm">
                     <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                     </svg>
                  </div>
                  <div className="text-right">
                     <h3 className="text-emerald-800 font-semibold text-lg">المهام المكتملة</h3>
                     <p className="text-emerald-600 text-sm">{completedCount} مهمة مكتملة</p>
                  </div>
               </div>
               
               <div className="flex items-center gap-2">
                  <div className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                     {completedCount}
                  </div>
                  <svg 
                     className={`w-5 h-5 text-emerald-600 transition-transform duration-200 ${showCompleted ? 'rotate-180' : ''}`} 
                     fill="none" 
                     stroke="currentColor" 
                     viewBox="0 0 24 24"
                  >
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
               </div>
            </button>

            {/* Completed Todos List */}
            {showCompleted && (
               <div className="mt-4 space-y-2 animate-fadeIn">
                  <div className="bg-emerald-50/50 rounded-lg p-3 border border-emerald-100">
                     <h4 className="text-emerald-800 font-medium mb-3 text-right">المهام المكتملة:</h4>
                     <div className="space-y-2">
                        {completedTodos.map((todo) => (
                            <div key={todo.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-emerald-100 shadow-sm">
                              <div className="flex items-center gap-3">
                                 <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                 </div>
                                 <span className="text-emerald-700 line-through text-sm">{todo.text}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                 <div className="text-emerald-500 text-xs bg-emerald-100 px-2 py-1 rounded-full">
                                    مكتملة
                                 </div>
                                 <button 
                                    onClick={() => deleteTodo(todo.id)}
                                    className="inline-flex items-center justify-center w-6 h-6 rounded-full font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 bg-rose-500 text-white hover:bg-rose-600 text-xs"
                                    aria-label="delete"
                                 >
                                    ✕
                                 </button>
                            </div>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            )}
        </div>
    )
}