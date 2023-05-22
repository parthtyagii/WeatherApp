import React, { useEffect, useState } from 'react';
import './RightPanel.css';
import RainChanceBars from '../RainChanceBars/RainChanceBars';


function RightPanel({ weatherData, userLocation }) {

    const [sunrise, setSunrise] = useState();
    const [sunset, setSunset] = useState();

    const getSunTime = () => {
        if (weatherData) {

            const sunriseTimestamp = weatherData.sys.sunrise;
            const sunriseDate = new Date(sunriseTimestamp * 1000);
            const sunriseTime = sunriseDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            const sunsetTimestamp = weatherData.sys.sunset;
            const sunsetDate = new Date(sunsetTimestamp * 1000);
            const sunsetTime = sunsetDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            // console.log(sunriseTime, sunsetTime);
            setSunrise(sunriseTime);
            setSunset(sunsetTime);
        }
    }


    useEffect(() => {
        getSunTime();
    }, [weatherData])

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
                    <div>07:24 AM</div>
                </div>

                <div className="low">
                    <div>
                        <span className="material-symbols-rounded">
                            partly_cloudy_day
                        </span>
                        {weatherData && (
                            <span>{Math.floor(weatherData.main.temp)}&deg; C</span>
                        )}
                    </div>
                    {weatherData && (
                        <div>{weatherData.weather[0].description}</div>
                    )}
                </div>
            </div>

            <div className="rightPanelRainInfo">
                <div className="heading">Chance of rain</div>

                <RainChanceBars />

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
                    <div>4 hours ago</div>
                </div>

                <div className="sunInfo">
                    <span className="material-symbols-rounded sunIcon">
                        wb_twilight
                    </span>
                    <div>
                        <span>Sunset</span>
                        <span>{sunset}</span>
                    </div>
                    <div>in 9 hours</div>
                </div>
            </div>

        </div>
    );
};

export default RightPanel;
