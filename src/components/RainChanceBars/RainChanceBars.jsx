import React, { useEffect, useState } from 'react';
import './RainChanceBars.css';



function RainChanceBars({ weatherDailyData }) {

    const [rainChance, setRainChance] = useState(null);

    const getRainData = () => {
        if (weatherDailyData) {
            let rain = [];
            for (let i = 0; i < 4; i++) {

                const per = weatherDailyData[i].pop * 100;
                const date = new Date(weatherDailyData[i].dt * 1000);
                // console.log(date)

                let time = (date.getHours() % 12).toString();
                if (date.getHours() >= 12) {
                    time = time + ' PM';
                }
                else {
                    time = time + ' AM';
                }

                rain.push({
                    per: per,
                    time: time,
                });
            }
            // console.log(rain)
            setRainChance(rain);
        }
    }

    useEffect(() => {
        getRainData();
    }, [weatherDailyData]);

    return (
        <div className='rainChanceContainer'>

            {rainChance && (
                rainChance.map((r, index) => {

                    let progress = r.per;
                    if (r.per < 10) {
                        progress = 10;
                    }

                    return (
                        <div className="aboutRain" key={index}>
                            <span>{r.time}</span>
                            <div className="rainChance">
                                <div className="progressBar" style={{ width: `${progress}%` }}></div>
                            </div>
                            <span>{Math.floor(r.per)}%</span>
                        </div>
                    );
                })
            )}

        </div>
    );
};

export default RainChanceBars;
