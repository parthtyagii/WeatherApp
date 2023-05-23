import React, { useEffect, useState } from 'react';
import './MiddlePanel.css';
import WeatherChart from '../WeatherChart.jsx/WeatherChart';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';



const Months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const WeekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function MiddlePanel({ weatherCurrData, setWeatherCurrData, weatherDailyData, setWeatherDailyData }) {

    const toast = useToast();

    const d = new Date();
    const date = d.getDate();
    const weekDay = WeekDays[d.getDay() % 7];
    const month = Months[d.getMonth() % 12];
    const year = d.getFullYear();

    const [searchedCity, setSearchedCity] = useState(null);

    const getWeatherDetails = async (lookFor) => {
        try {
            const response1 = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${lookFor}&appid=${process.env.REACT_APP_API_KEY}&units=metric`);
            // console.log(response1.data);
            setWeatherCurrData(response1.data);

            const response2 = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${lookFor}&appid=${process.env.REACT_APP_API_KEY}&units=metric`);
            // console.log(response2.data);
            setWeatherDailyData(response2.data.list);

        }
        catch (err) {
            // console.log(err);
            toast({
                title: 'Error!',
                description: "Incorrect city name or postal code.",
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const searchWeather = async (e) => {
        try {

            if (e.key !== 'Enter') {
                return;
            }

            if (!searchedCity || (searchedCity.trim().length === 0)) {
                // console.log('galat key')
                // return getWeatherDetails()
                throw new Error();
            }
            else {
                return getWeatherDetails(searchedCity);
            }
        }
        catch (err) {
            // console.log(err);
            toast({
                title: 'Error!',
                description: "Please enter City name or postal code.",
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    // console.log(weatherData)

    return (
        <div className='middlePanelContainer'>
            <div className="middleHeader">
                <div className="day">
                    <span>{month} {year}</span>
                    <span>{weekDay}, {month.substring(0, 3)} {date}, {year}</span>
                </div>

                <div className="searchPanel">
                    <span id='searchIcon' className="material-symbols-outlined">
                        search
                    </span>

                    <input type="text" onChange={(e) => setSearchedCity(e.target.value)} onKeyDown={(e) => searchWeather(e)} placeholder='Search Location here' />

                    <button>
                        <span className="material-symbols-rounded">
                            notifications
                        </span>
                    </button>
                    <button>
                        <span className="material-symbols-rounded">
                            person
                        </span>
                    </button>
                </div>
            </div>

            <div className="middleInfo">
                <div className="heading">Today overview</div>

                <div className="weatherAbout">
                    <div className="weatherInfo">
                        <span className="material-symbols-rounded weatherIcon">
                            air
                        </span>
                        <div className="data">
                            <span>Wind Speed</span>
                            {weatherCurrData && (
                                <span>{weatherCurrData.wind.speed} m/s</span>
                            )}
                        </div>
                    </div>
                    <div className="weatherInfo">
                        <span className="material-symbols-outlined weatherIcon">
                            humidity_mid
                        </span>
                        <div className="data">
                            <span>Humidity</span>
                            {weatherCurrData && (
                                <span>{weatherCurrData.main.humidity}%</span>
                            )}
                        </div>
                    </div><div className="weatherInfo">
                        <span className="material-symbols-rounded weatherIcon">
                            water
                        </span>
                        <div className="data">
                            <span>Pressure</span>
                            {weatherCurrData && (
                                <span>{weatherCurrData.main.pressure} hPa</span>
                            )}
                        </div>
                    </div><div className="weatherInfo">
                        <span className="material-symbols-rounded weatherIcon">
                            visibility
                        </span>
                        <div className="data">
                            <span>Visibilty</span>
                            {weatherCurrData && (
                                <span>{weatherCurrData.visibility} m</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="lowerGraph">
                <div className="heading">Average Daily Temperature</div>

                <WeatherChart weatherDailyData={weatherDailyData} />

            </div>



        </div>
    );
};

export default MiddlePanel;
