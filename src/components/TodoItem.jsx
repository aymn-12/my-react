import { useContext, useState } from 'react';
import { TodoContext } from '../Context/TodoContext';
import AppDialog  from './AppDialog';

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
        if (editText.trim() && editText !== todo.text) {
          updateTodo(todo.id, editText.trim());

          onUpdateSuccess(todo.id, todo.text)
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
        <div
      className={`flex justify-between items-center p-3 sm:p-4 rounded-lg transition-colors ${
        todo.completed ? "bg-neutral-50 text-neutral-400" : "hover:bg-neutral-50"
      }`}
    >
      {isEditing ? (
        <div className="flex-1 flex gap-2 items-center">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="flex-1 px-3 py-1 text-sm border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            autoFocus
          />
          <button
            onClick={handleUpdate}
            className="inline-flex items-center justify-center w-8 h-8 rounded-lg font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 bg-emerald-500 text-white hover:bg-emerald-600 text-xs"
            aria-label="save"
          >
            ✓
          </button>
          <button
            onClick={handleCancel}
            className="inline-flex items-center justify-center w-8 h-8 rounded-lg font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 bg-gray-500 text-white hover:bg-gray-600 text-xs"
            aria-label="cancel"
          >
            ✕
          </button>
        </div>
      ) : (
        <>
          <span className="text-sm sm:text-base flex-1">{todo.text}</span> {/** Text **/}


          <div className="flex gap-1.5">
            <button
              onClick={handleStartEdit}
              className="inline-flex items-center justify-center gap-2 h-9 px-3 rounded-lg font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 bg-blue-500 text-white hover:bg-blue-600"
              aria-label="edit"
              disabled={todo.completed}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              onClick={() => toggleComplete(todo.id)}
              className="inline-flex items-center justify-center gap-2 h-9 px-3 rounded-lg font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 bg-emerald-500 text-white hover:bg-emerald-600"
              aria-label="complete"
            >
              ✓
            </button>
            <button
              onClick={() => onDeleteClick(todo.id,todo.text)}
              className="inline-flex items-center justify-center gap-2 h-9 px-3 rounded-lg font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 bg-rose-500 text-white hover:bg-rose-600"
              aria-label="delete"
            >
              ✕
            </button>
          </div>
        </>
      )}
    </div>

    
    </>
  )
}

export default TodoItem;