import { useEffect, useReducer } from "react";
import { TodoContext } from "./TodoContext";
import statsReducer from "../hooks/statsReducer";
import todosReducer from "../hooks/todosReducer";

export default function TodoProvider ({children}) {
    const [todos, dispatchTodos] = useReducer(
        todosReducer,
        JSON.parse(localStorage.getItem("Todos")) || []
      );
      
      const [userStats, dispatchStats] = useReducer(
        statsReducer,
        JSON.parse(localStorage.getItem("UserStats")) || {
          totalPoints: 0,
          level: 1,
          completedTodos: 0,
          streak: 0,
          lastCompletionDate: null,
          badges: []
        }
      );

   


    useEffect(() => { //LocalStorage, API, Event
        localStorage.setItem("Todos" , JSON.stringify(todos))
    }, [todos])

    useEffect(() => {
        localStorage.setItem("UserStats", JSON.stringify(userStats))
    }, [userStats])


    const addTodo = (text) => dispatchTodos({ type: "ADD", payload: text });
const deleteTodo = (id) => dispatchTodos({ type: "DELETE", payload: id });
const updateTodo = (id, newText) =>
  dispatchTodos({ type: "UPDATE", payload: { id, text: newText } });

const toggleComplete = (id) => {
  const todo = todos.find(t => t.id === id);
  if (!todo) return;

  const wasCompleted = todo.completed;
  dispatchTodos({ type: "TOGGLE", payload: id });

  if (!wasCompleted) dispatchStats({ type: "TODO_COMPLETED" });
};




    return (
        <TodoContext.Provider value={{todos, addTodo, deleteTodo, updateTodo, toggleComplete, userStats}}>
            {children}
        </TodoContext.Provider>
    )
}