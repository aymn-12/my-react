import Home from './pages/Home';
import TodoProvider from './Context/TodoContext.jsx';
import AnimatedNumbers from '/src/components/AnimatedNumbers.jsx';
import UIProvider from './Context/UIProvider.jsx';

export default function App() {
  return (
    <UIProvider>
      <TodoProvider>
        <Home />
      </TodoProvider>
    </UIProvider>
  );
}