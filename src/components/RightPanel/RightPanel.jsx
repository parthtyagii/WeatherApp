import React, { useEffect, useState } from 'react';
import './RightPanel.css';
import RainChanceBars from '../RainChanceBars/RainChanceBars';


function RightPanel({ weatherCurrData, weatherDailyData, userLocation }) {

    const [sunrise, setSunrise] = useState();
    const [sunset, setSunset] = useState();
    const [sunriseHours, setSunriseHours] = useState();
    const [sunsetHours, setSunsetHours] = useState();
    const [currTime, setCurrTime] = useState();

    const getSunTime = () => {
        if (weatherCurrData) {

            // console.log(weatherCurrData);

            const currDate = new Date(weatherCurrData.dt * 1000);
            let formattedTime = currDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            // console.log(formattedTime);
            setCurrTime(formattedTime);

            const sunriseTimestamp = weatherCurrData.sys.sunrise;
            const sunriseDate = new Date(sunriseTimestamp * 1000);
            const sunriseTime = sunriseDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            const sunsetTimestamp = weatherCurrData.sys.sunset;
            const sunsetDate = new Date(sunsetTimestamp * 1000);
            const sunsetTime = sunsetDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            // console.log(sunriseTime, sunsetTime);
            setSunrise(sunriseTime);
            setSunset(sunsetTime);

            // console.log(currDate.getHours(), sunriseDate.getHours(), sunsetDate.getHours(), (currDate.getHours() - sunriseDate.getHours()), (currDate.getHours() - sunsetDate.getHours()));
            setSunriseHours((currDate.getHours() - sunriseDate.getHours()));
            setSunsetHours((currDate.getHours() - sunsetDate.getHours()));
        }
    }

    useEffect(() => {
        getSunTime();
    }, [weatherCurrData])


    return (
        <div className='rightPanelContainer'>
            <div className="rightPanelHeader">
                <div className="up">
                    <div>
                        <span>Parth Tyagi</span>
                        {userLocation && (
                            <span>{userLocation.city}, {userLocation.country}</span>
                        )}
                    </div>
                    {currTime && (
                        <div>{currTime}</div>
                    )}
                </div>

                <div className="low">
                    <div>
                        <span className="material-symbols-rounded">
                            partly_cloudy_day
                        </span>
                        {weatherCurrData && (
                            <span>{Math.floor(weatherCurrData.main.temp)}&deg; C</span>
                        )}
                    </div>
                    {weatherCurrData && (
                        <div>{weatherCurrData.weather[0].description}</div>
                    )}
                </div>
            </div>

            <div className="rightPanelRainInfo">
                <div className="heading">Chance of rain</div>

                <RainChanceBars weatherDailyData={weatherDailyData} />

            </div>

            <div className="rightPanelLower">
                <div className="heading">Sunrise & Sunset</div>

                <div className="sunInfo">
                    <span className="material-symbols-rounded sunIcon">
                        wb_sunny
                    </span>
                    <div>
                        <span>Sunrise</span>
                        <span>{sunrise}</span>
                    </div>
                    {sunriseHours && (
                        <div>
                            {sunriseHours < 0 ? `in ${Math.abs(sunriseHours)} hours` : `${Math.abs(sunriseHours)} hours ago`}
                        </div>
                    )}
                </div>

                <div className="sunInfo">
                    <span className="material-symbols-rounded sunIcon">
                        wb_twilight
                    </span>
                    <div>
                        <span>Sunset</span>
                        <span>{sunset}</span>
                    </div>
                    {sunsetHours && (
                        <div>
                            {sunsetHours < 0 ? `in ${Math.abs(sunsetHours)} hours` : `${Math.abs(sunsetHours)} hours ago`}
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
};

export default RightPanel;
