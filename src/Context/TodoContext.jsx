import { useEffect, useState } from "react";
import { TodoContext } from "./TodoContext";

export default function TodoProvider ({children}) {
    const [todos,setTodos] = useState(() => {
        const save = localStorage.getItem("Todos");
        return save ? JSON.parse(save) : []
    });
    

    useEffect(() => { //LocalStorage, API, Event
        localStorage.setItem("Todos" , JSON.stringify(todos))
    }, [todos])


    const addTodo = (text) => {

        const newTodo = {
            completed: false,
            text,
            id: Date.now()
        }

        setTodos(prev => [...prev, newTodo])
    }

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id))
    }

    const toggleComplete = (id) => {
        setTodos(todos.map((todo) => (
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )))
    }

    const updateTodo = (id, newText) => {
        setTodos(todos.map((todo) => (
            todo.id === id ? { ...todo, text: newText } : todo
        )))
    }
    return (
        <TodoContext.Provider value={{todos,addTodo,deleteTodo,updateTodo,toggleComplete}}>
            {children}
        </TodoContext.Provider>
    )
}