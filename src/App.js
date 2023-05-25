import { useState, useEffect } from 'react';
import './App.css';
import LeftPanel from './components/LeftPanel/LeftPanel.jsx';
import MiddlePanel from './components/MiddlePanel/MiddlePanel';
import RightPanel from './components/RightPanel/RightPanel';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';
import HashLoader from 'react-spinners/HashLoader';
import WeatherLoader from './components/WeatherLoader/WeatherLoader';


function App() {

  const [loader, setLoader] = useState();
  const [weatherLoader, setWeatherLoader] = useState(false);
  const toast = useToast();

  const [weatherCurrData, setWeatherCurrData] = useState(null);
  const [weatherDailyData, setWeatherDailyData] = useState(null);
  const [userLocation, setUserLocation] = useState(null);


  const getUserLocation = async () => {
    setLoader(true);
    try {
      //finding user location...
      const options = {
        method: 'GET',
        url: 'https://find-any-ip-address-or-domain-location-world-wide.p.rapidapi.com/iplocation',
        params: {
          apikey: `${process.env.REACT_APP_LOCATION_KEY}`
        },
        headers: {
          'X-RapidAPI-Key': '4f12eff405msh17328e33aeb8a9ap1bad65jsn1e99a9868f95',
          'X-RapidAPI-Host': 'find-any-ip-address-or-domain-location-world-wide.p.rapidapi.com'
        }
      };
      const response1 = await axios.request(options);
      // console.log(response1.data);

      //weather info..
      const response2 = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${response1.data.city || 'delhi'}&appid=${process.env.REACT_APP_API_KEY}&units=metric`);
      // console.log(response2.data);
      setWeatherCurrData(response2.data);

      const response3 = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${response1.data.city}&appid=${process.env.REACT_APP_API_KEY}&units=metric`);
      // console.log(response3.data);
      setWeatherDailyData(response3.data.list);
      setTimeout(() => {
        setLoader(false);
      }, 1000);
    }
    catch (err) {
      // console.log(err);
      setTimeout(() => {
        setLoader(false);
        setTimeout(() => {
          toast({
            title: 'Error!',
            description: "Couldn't get weather data. Refresh or search again.",
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        }, 500);
      }, 1000);
    }

  }

  useEffect(() => {
    getUserLocation();
  }, []);

  return (
    <>
      <div className="WeatherApp">

        {loader && (
          <div className='loader'>
            <HashLoader size='80px' color="#008adf" />
          </div>
        )}

        {!loader && (
          <>
            <LeftPanel />
            <MiddlePanel setWeatherLoader={setWeatherLoader} weatherCurrData={weatherCurrData} setWeatherCurrData={setWeatherCurrData} weatherDailyData={weatherDailyData} setWeatherDailyData={setWeatherDailyData} />
            <RightPanel weatherCurrData={weatherCurrData} weatherDailyData={weatherDailyData} userLocation={userLocation} />
          </>
        )}

      </div >

      {weatherLoader && (
        <WeatherLoader />
      )}

    </>
  );
}

export default App;
