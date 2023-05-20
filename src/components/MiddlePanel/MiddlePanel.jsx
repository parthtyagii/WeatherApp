import React from 'react';
import './MiddlePanel.css';




function MiddlePanel() {
    return (
        <div className='middlePanelContainer'>
            <div className="middleHeader">
                <div className="day">
                    <span>January 2023</span>
                    <span>Thursday, Jan 4, 2023</span>
                </div>

                <div className="searchPanel">
                    <span id='searchIcon' class="material-symbols-outlined">
                        search
                    </span>
                    <input type="text" placeholder='Search Location here' />
                    <button>
                        <span class="material-symbols-rounded">
                            notifications
                        </span>
                    </button>
                    <button>
                        <span class="material-symbols-rounded">
                            person
                        </span>
                    </button>
                </div>
            </div>

            <div className="middleInfo">
                <div className="heading">Today overview</div>

                <div className="weatherAbout">
                    <div className="weatherInfo">
                        <span class="material-symbols-rounded weatherIcon">
                            air
                        </span>
                        <div className="data">
                            <span>Wind Speed</span>
                            <span>12km/h</span>
                        </div>
                    </div>
                    <div className="weatherInfo">
                        <span class="material-symbols-rounded weatherIcon">
                            rainy
                        </span>
                        <div className="data">
                            <span>Rain Chance</span>
                            <span>24%</span>
                        </div>
                    </div><div className="weatherInfo">
                        <span class="material-symbols-rounded weatherIcon">
                            water
                        </span>
                        <div className="data">
                            <span>Pressure</span>
                            <span>720 hpa</span>
                        </div>
                    </div><div className="weatherInfo">
                        <span class="material-symbols-rounded weatherIcon">
                            clear_day
                        </span>
                        <div className="data">
                            <span>Uv Index</span>
                            <span>2,3</span>
                        </div>
                    </div>
                </div>
            </div>



        </div>
    );
};

export default MiddlePanel;
