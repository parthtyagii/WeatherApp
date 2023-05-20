import './App.css';
import LeftPanel from './components/LeftPanel/LeftPanel.jsx';
import MiddlePanel from './components/MiddlePanel/MiddlePanel';


function App() {
  return (
    <div className="WeatherApp">
      <LeftPanel />
      <MiddlePanel />
    </div>
  );
}

export default App;
