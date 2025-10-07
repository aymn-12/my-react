import { useEffect, useState } from "react";
import { TodoContext } from "./TodoContext";

export default function TodoProvider ({children}) {
    const [todos,setTodos] = useState(() => {
        const save = localStorage.getItem("Todos");
        return save ? JSON.parse(save) : []
    });
    
    // نظام النقاط والمستويات
    const [userStats, setUserStats] = useState(() => {
        const savedStats = localStorage.getItem("UserStats");
        return savedStats ? JSON.parse(savedStats) : {
            totalPoints: 0,
            level: 1,
            completedTodos: 0,
            streak: 0,
            lastCompletionDate: null,
            badges: []
        }
    });

   


    useEffect(() => { //LocalStorage, API, Event
        localStorage.setItem("Todos" , JSON.stringify(todos))
    }, [todos])

    useEffect(() => {
        localStorage.setItem("UserStats", JSON.stringify(userStats))
    }, [userStats])


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
        const todo = todos.find(t => t.id === id);
        const wasCompleted = todo?.completed;
        
        setTodos(todos.map((todo) => (
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )));

        // إضافة النقاط عند إكمال المهمة
        if (!wasCompleted && todo) {
            const points = 10; // نقاط أساسية لكل مهمة
            const today = new Date().toDateString();
            
            setUserStats(prev => {
                const newCompletedTodos = prev.completedTodos + 1;
                const newTotalPoints = prev.totalPoints + points;
                const newLevel = Math.floor(newTotalPoints / 100) + 1;
                
                // حساب السلسلة (streak)
                let newStreak = prev.streak;
                if (prev.lastCompletionDate === today) {
                    // نفس اليوم، لا تغيير في السلسلة
                } else if (prev.lastCompletionDate === new Date(Date.now() - 86400000).toDateString()) {
                    // اليوم السابق، زيادة السلسلة
                    newStreak += 1;
                } else {
                    // انقطاع في السلسلة
                    newStreak = 1;
                }

                // إضافة شارات جديدة
                const newBadges = [...prev.badges];
                if (newCompletedTodos === 1 && !newBadges.includes('first-todo')) {
                    newBadges.push('first-todo');
                }
                if (newCompletedTodos === 10 && !newBadges.includes('ten-todos')) {
                    newBadges.push('ten-todos');
                }
                if (newStreak === 7 && !newBadges.includes('week-streak')) {
                    newBadges.push('week-streak');
                }

                return {
                    ...prev,
                    totalPoints: newTotalPoints,
                    level: newLevel,
                    completedTodos: newCompletedTodos,
                    streak: newStreak,
                    lastCompletionDate: today,
                    badges: newBadges
                };
            });
        }
    }

    const updateTodo = (id, newText) => {
        setTodos(todos.map((todo) => (
            todo.id === id ? { ...todo, text: newText } : todo
        )))
    }
    return (
        <TodoContext.Provider value={{todos, addTodo, deleteTodo, updateTodo, toggleComplete, userStats}}>
            {children}
        </TodoContext.Provider>
    )
}