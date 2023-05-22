import React from 'react';
import './LeftPanel.css';
import Logo from './logo.png';


function LeftPanel() {
    return (
        <div className='leftPanelContainer'>
            <div className="leftPanelUpper">
                <div className="leftPanelTitle">
                    <img id='leftPanelLogo' src={Logo} alt="logo" />
                    Meteorica
                </div>
                <div className="leftPanelOptions">
                    <span className="material-symbols-rounded">
                        dashboard
                    </span>
                    Dashboard
                </div>
                <div className="leftPanelOptions">
                    <span className="material-symbols-rounded">
                        explore
                    </span>
                    Map
                </div>
                <div className="leftPanelOptions">
                    <span className="material-symbols-rounded">
                        share_location
                    </span>
                    Saved Location
                </div>
                <div className="leftPanelOptions">
                    <span className="material-symbols-rounded">
                        calendar_month
                    </span>
                    Calender
                </div>
            </div>

            <div className="leftPanelLower">
                <div>System</div>
                <div className="leftPanelOptions">
                    <span className="material-symbols-rounded">
                        settings
                    </span>
                    Setting
                </div>
                <div className="leftPanelOptions">
                    <span className="material-symbols-rounded">
                        logout
                    </span>
                    Logout account
                </div>
            </div>
        </div>
    );
};

export default LeftPanel;
