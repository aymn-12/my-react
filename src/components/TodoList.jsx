// src/components/TodoList.jsx
import { useContext, useMemo  } from "react";
import { TodoContext } from "../Context/TodoContext";
import TodoItem from "./TodoItem";
import CompletedTodo from "./CompletedTodo";

const TodoList = ({ openDeleteConfirmDialog, openUpdateSuccessDialog}) => {
  const { todos } = useContext(TodoContext);
  
  // Filter active (non-completed) todos
  const activeTodos = useMemo(() => {
    return todos.filter(todo => !todo.completed);
  },[todos])
  

  if (todos.length === 0)
    return (
      <div className="py-8 text-center">
        <p className="text-neutral-700">لا توجد مهام حالياً</p>
        <p className="text-sm text-neutral-500 mt-1">أضف مهمة جديدة للبدء</p>
      </div>
  );

  return (
    <div>
      {/* Active Todos */}
      {activeTodos.length > 0 && (
        <div className="flex flex-col divide-y divide-black/5">
          {activeTodos.map((todo) => (
            <TodoItem key={todo.id} 
            todo={todo} 
            onDeleteClick = {openDeleteConfirmDialog}
             onUpdateSuccess = {openUpdateSuccessDialog} 
            />
          ))}
        </div>
      )}
      
      {/* Show message if no active todos but there are completed ones */}
      {activeTodos.length === 0 && todos.length > 0 && (
        <div className="py-6 text-center">
          <p className="text-neutral-600">🎉 رائع! لقد أكملت جميع مهامك</p>
          <p className="text-sm text-neutral-500 mt-1">أضف مهمة جديدة أو راجع المهام المكتملة أدناه</p>
        </div>
      )}
      
      {/* Completed Todos Section */}
      <CompletedTodo />
    </div>
  );
};

export default TodoList;
