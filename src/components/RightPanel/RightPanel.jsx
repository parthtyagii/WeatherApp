import React from 'react';
import './RightPanel.css';


function RightPanel() {
    return (
        <div className='rightPanelContainer'>
            <div className="rightPanelHeader">
                <div className="up">
                    <div>
                        <span>Parth Tyagi</span>
                        <span>Delhi, India</span>
                    </div>
                    <div>07:24 AM</div>
                </div>

                <div className="low">
                    <div>
                        <span class="material-symbols-rounded">
                            partly_cloudy_day
                        </span>
                        <span>27&deg; C</span>
                    </div>
                    <div>Dramatic cloudy</div>
                </div>
            </div>

            <div className="rightPanelRainInfo">
                <div className="heading">Chance of rain</div>

            </div>

            <div className="rightPanelLower">
                <div className="heading">Sunrise & Sunset</div>

                <div className="sunInfo">
                    <span class="material-symbols-rounded sunIcon">
                        wb_sunny
                    </span>
                    <div>
                        <span>Sunrise</span>
                        <span>4:20 AM</span>
                    </div>
                    <div>4 hours ago</div>
                </div>

                <div className="sunInfo">
                    <span class="material-symbols-rounded sunIcon">
                        wb_twilight
                    </span>
                    <div>
                        <span>Sunset</span>
                        <span>5:50 PM</span>
                    </div>
                    <div>in 9 hours</div>
                </div>
            </div>

        </div>
    );
};

export default RightPanel;
