import { useState, useEffect } from 'react';
import './App.css';
import LeftPanel from './components/LeftPanel/LeftPanel.jsx';
import MiddlePanel from './components/MiddlePanel/MiddlePanel';
import RightPanel from './components/RightPanel/RightPanel';
import axios from 'axios';


function App() {

  const [weatherCurrData, setWeatherCurrData] = useState(null);
  const [weatherDailyData, setWeatherDailyData] = useState(null);
  const [userLocation, setUserLocation] = useState(null);


  async function getUserLocation() {
    try {
      //finding user location...
      const response1 = await axios.get('http://ip-api.com/json/');
      // console.log(response1.data);
      setUserLocation(response1.data);

      //weather info..
      const response2 = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${response1.data.city}&appid=${process.env.REACT_APP_API_KEY}&units=metric`);
      // console.log(response2.data);
      setWeatherCurrData(response2.data);

      const response3 = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${response1.data.city}&appid=${process.env.REACT_APP_API_KEY}&units=metric`);
      // console.log(response3.data);
      setWeatherDailyData(response3.data.list);

    }
    catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getUserLocation();
  }, []);



  return (
    <div className="WeatherApp">
      <LeftPanel />
      <MiddlePanel weatherCurrData={weatherCurrData} setWeatherCurrData={setWeatherCurrData} weatherDailyData={weatherDailyData} setWeatherDailyData={setWeatherDailyData} />
      <RightPanel weatherCurrData={weatherCurrData} weatherDailyData={weatherDailyData} userLocation={userLocation} />
    </div>
  );
}

export default App;
