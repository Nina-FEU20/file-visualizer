import Tree from './components/Tree';
import ThemeSelector from './components/ThemeSelector';

function App() {
  return (
    <div className='App flex flex-col items-center p-4 sm:px-4 py-10 bg-teal-900 min-h-screen text-teal-50'>
      <header>
        <h1 className='text-3xl mb-10 font-semibold text-center'>File Visualizer</h1>
        <ThemeSelector />
      </header>

      <Tree />
    </div>
  );
}

export default App;
