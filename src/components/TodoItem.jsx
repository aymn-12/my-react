import { useContext, useState } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { TodoContext } from '../Context/TodoContext';
import { Edit3, Check, X, Trash2 } from 'lucide-react';


const TodoItem = ({todo , onDeleteClick, onUpdateSuccess}) => {
    const {toggleComplete,updateTodo} = useContext(TodoContext);
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(todo.text);
    const [originalText, setOriginalText] = useState(todo.text);

    

    const handleStartEdit = () => {
        setOriginalText(todo.text); // Store the current text when starting to edit
        setEditText(todo.text);
        setIsEditing(true);
    };

    const handleUpdate = () => {
        const Texteditior = editText.trim();

        if (Texteditior.length > 0  && Texteditior !== todo.text) {
          updateTodo(todo.id, editText.trim());

          onUpdateSuccess(todo.id, Texteditior)
        }
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditText(originalText);
         // Revert to the original text before editing
        setIsEditing(false);
    };

   

    return (
      <>
        <Motion.div
          layout
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, x: -100 }}
          whileHover={{ scale: 1.02 }}
          className={`flex items-center flex-row-reverse justify-between p-3 sm:p-4 rounded-lg transition-all duration-300 ${
            todo.completed 
              ? "bg-green-50 text-green-400 border-l-4 border-green-400" 
              : "hover:bg-neutral-50 hover:shadow-md border-l-4 border-transparent hover:border-purple-400"
          }`}
        >
  {isEditing ? (
    <div className="flex flex-1  gap-2 items-center">
      <input
        type="text"
        value={editText}
        onChange={(e) => setEditText(e.target.value)}
        className="flex-1 px-3 py-1 text-sm border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
        autoFocus
        dir='rtl'
      />
      <Motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleUpdate}
        className="inline-flex items-center justify-center w-8 h-8 rounded-lg font-medium transition-colors bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg"
        aria-label="save"
      >
        <Check className="w-4 h-4" />
      </Motion.button>
      <Motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleCancel}
        className="inline-flex items-center justify-center w-8 h-8 rounded-lg font-medium transition-colors bg-gray-500 text-white hover:bg-gray-600 shadow-lg"
        aria-label="cancel"
      >
        <X className="w-4 h-4" />
      </Motion.button>
    </div>
  ) : (
    <>
      <div className="flex gap-1.5">
        <Motion.button
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleStartEdit}
          className="inline-flex items-center justify-center h-9 px-3 rounded-lg font-medium transition-all bg-blue-500 text-white hover:bg-blue-600 shadow-lg hover:shadow-xl"
          aria-label="edit"
          disabled={todo.completed}
        >
          <Edit3 className="w-4 h-4" />
        </Motion.button>

        <Motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => toggleComplete(todo.id)}
          className={`inline-flex items-center justify-center h-9 px-3 rounded-lg font-medium transition-all shadow-lg hover:shadow-xl ${
            todo.completed 
              ? "bg-gray-400 text-white hover:bg-gray-500" 
              : "bg-emerald-500 text-white hover:bg-emerald-600"
          }`}
          aria-label="complete"
        >
          <Check className="w-4 h-4" />
        </Motion.button>

        <Motion.button
          whileHover={{ scale: 1.1, rotate: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onDeleteClick(todo.id, todo.text)}
          className="inline-flex items-center justify-center h-9 px-3 rounded-lg font-medium transition-all bg-rose-500 text-white hover:bg-rose-600 shadow-lg hover:shadow-xl"
          aria-label="delete"
        >
          <Trash2 className="w-4 h-4" />
        </Motion.button>
      </div>

      <Motion.span 
        className={`text-sm sm:text-base flex-1 text-left pr-4 transition-all duration-300 ${
          todo.completed ? "line-through opacity-60" : ""
        }`} 
        dir="auto"
        animate={{
          scale: todo.completed ? 0.95 : 1,
        }}
      >
        {todo.text}
      </Motion.span>
    </>
  )}
</Motion.div>

    
    </>
  )
}

export default TodoItem;