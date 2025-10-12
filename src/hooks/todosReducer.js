export default function todosReducer(state,action){
    if (!action || !action.type) return state;
    switch(action.type){
        case "ADD":
            return [...state, {id: Date.now(), text: action.payload, completed: false}];
        case "DELETE":
            return state.filter(t => t.id != action.payload);
        case "UPDATE":
            return state.map(t => 
                t.id === action.payload.id ? { ...t, text: action.payload.text } : t
            )
        case "TOGGLE":
                return state.map(t =>
                  t.id === action.payload ? { ...t, completed: !t.completed } : t
                );
        default:
          return state;
    }
}