import './App.css';
import LeftPanel from './components/LeftPanel/LeftPanel.jsx';
import MiddlePanel from './components/MiddlePanel/MiddlePanel';
import RightPanel from './components/RightPanel/RightPanel';


function App() {
  return (
    <div className="WeatherApp">
      <LeftPanel />
      <MiddlePanel />
      <RightPanel />
    </div>
  );
}

export default App;
