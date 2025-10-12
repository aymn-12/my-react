export default function statsReducer(state, action) {
    if (!action || action.type !== "TODO_COMPLETED") return state;
  
    const points = 10;
    const today = new Date().toDateString();
  
    const newCompleted = state.completedTodos + 1;
    const newTotalPoints = state.totalPoints + points;
    const newLevel = Math.floor(newTotalPoints / 100) + 1;
  
    let newStreak = state.streak;
    if (state.lastCompletionDate === today) {
      // لا تغيير
    } else if (state.lastCompletionDate === new Date(Date.now() - 86400000).toDateString()) {
      newStreak += 1;
    } else {
      newStreak = 1;
    }
  
    const newBadges = [...state.badges];
    if (newCompleted === 1 && !newBadges.includes("first-todo")) newBadges.push("first-todo");
    if (newCompleted === 10 && !newBadges.includes("ten-todos")) newBadges.push("ten-todos");
    if (newStreak === 7 && !newBadges.includes("week-streak")) newBadges.push("week-streak");
  
    return {
      ...state,
      totalPoints: newTotalPoints,
      level: newLevel,
      completedTodos: newCompleted,
      streak: newStreak,
      lastCompletionDate: today,
      badges: newBadges
    };
  }
  