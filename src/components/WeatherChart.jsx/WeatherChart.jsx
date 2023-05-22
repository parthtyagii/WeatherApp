import React, { useEffect, useState } from 'react';
import './WeatherChart.css';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';



function WeatherChart({ weatherDailyData }) {

    const [Data, setData] = useState();

    const chartDetails = () => {
        let arr = [];
        for (let i = 0; i < 40; i += 8) {
            arr.push(weatherDailyData[i].main.temp);
        }

        console.log(arr);

        const D = {
            labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'],
            datasets: [
                {
                    label: 'Temperature',
                    data: arr,
                    fill: true,
                    backgroundColor: '#008adf2b',
                    borderColor: '#008adf',
                    pointBackgroundColor: 'blue',
                    pointBorderColor: 'white',
                    pointBorderWidth: 2,
                    pointRadius: 5,
                }
            ]
        };

        setData(D);

        // console.log(weatherDailyData)
    };

    useEffect(() => {
        if (weatherDailyData) {
            chartDetails();
        }
    }, [weatherDailyData]);

    return (
        <div className='WeatherChart'>
            {Data && (
                <Line data={Data}
                    options={{
                        scales: {
                            x: {
                                grid: {
                                    display: false
                                },
                                ticks: {
                                    font: {
                                        family: 'Poppins, sans-serif',
                                        size: '15px',
                                    },

                                }
                            },
                            y: {
                                ticks: {
                                    font: {
                                        family: 'Poppins, sans-serif',
                                        size: '15px',
                                    }
                                },
                                border: {
                                    display: false,
                                }
                            }
                        },
                        plugins: {
                            legend: {
                                display: false
                            }
                        },
                        responsive: true,
                    }} />
            )}
        </div>
    );
};

export default WeatherChart;