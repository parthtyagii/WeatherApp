import React, { useEffect, useRef, useState } from 'react';
import './MiddlePanel.css';
import WeatherChart from '../WeatherChart.jsx/WeatherChart';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';
import SuggestionBar from '../SuggestionBar/SuggestionBar';
import WeatherLoader from '../WeatherLoader/WeatherLoader';



const Months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const WeekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function MiddlePanel({ setWeatherLoader, weatherCurrData, setWeatherCurrData, weatherDailyData, setWeatherDailyData }) {

    const toast = useToast();

    const d = new Date();
    const date = d.getDate();
    const weekDay = WeekDays[d.getDay() % 7];
    const month = Months[d.getMonth() % 12];
    const year = d.getFullYear();

    const [searchedCity, setSearchedCity] = useState(null);
    const [suggestions, setSuggestions] = useState(null);
    const [searchLoader, setSearchLoader] = useState(false);
    const inputRef = useRef();

    const changeHandler = async (e) => {
        setSearchedCity(e.target.value);

        if (e.target.value.trim().length === 0) {
            setSearchLoader(false);
            setSuggestions(null);
            return;
        }

        try {
            const options = {
                method: 'GET',
                url: `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${e.target.value}&minPopulation=1000000`,
                headers: {
                    'X-RapidAPI-Key': '4f12eff405msh17328e33aeb8a9ap1bad65jsn1e99a9868f95',
                    'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
                }
            };

            const response = await axios.request(options);
            // console.log(response.data.data);
            setSuggestions(response.data.data);
            setSearchLoader(true);
            setTimeout(() => {
                setSuggestions(null);
                setSearchLoader(false);
            }, 10000);
        }
        catch (err) {
            // console.log(err);
        }
    }

    const searchWeather = async (e) => {
        try {

            if (e.key !== 'Enter') {
                return;
            }

            if (!searchedCity || (searchedCity.trim().length === 0)) {
                // console.log('galat key')
                throw new Error();
            }
            else {
                setSuggestions(null);
                setSearchLoader(false);
                setWeatherLoader(true);
                return getWeatherDetails(searchedCity);
            }
        }
        catch (err) {
            // console.log(err);
            toast({
                title: 'Error!',
                description: "Please enter City name or postal code.",
                status: 'error',
                duration: 4000,
                isClosable: true,
            });
        }
    };

    const getWeatherDetails = async (lookFor) => {
        try {
            const response1 = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${lookFor}&appid=${process.env.REACT_APP_API_KEY}&units=metric`);
            // console.log(response1.data);

            const response2 = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${lookFor}&appid=${process.env.REACT_APP_API_KEY}&units=metric`);
            // console.log(response2.data);

            setTimeout(() => {
                setWeatherLoader(false);
                setWeatherCurrData(response1.data);
                setWeatherDailyData(response2.data.list);
            }, 800);
        }
        catch (err) {
            // console.log(err);
            setTimeout(() => {
                setWeatherLoader(false);
                toast({
                    title: 'Error!',
                    description: "Incorrect city name or postal code.",
                    status: 'error',
                    duration: 4000,
                    isClosable: true,
                });
            }, 800);
        }
    };

    return (
        <>
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

                        <input type="text" ref={inputRef} onChange={(e) => changeHandler(e)} onKeyDown={(e) => searchWeather(e)} placeholder='Search Location here' />

                        {searchLoader && (
                            <SuggestionBar inputRef={inputRef} suggestions={suggestions} setSearchedCity={setSearchedCity} />
                        )}

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

        </>
    );
};

export default MiddlePanel;
