import Home from './pages/Home';
import TodoProvider from './Context/TodoContext.jsx';
import AnimatedNumbers from '/src/components/AnimatedNumbers.jsx';

export default function App(){
  return (
    <div>
     <TodoProvider>
      <Home></Home>
     </TodoProvider>
    </div>
  )
}