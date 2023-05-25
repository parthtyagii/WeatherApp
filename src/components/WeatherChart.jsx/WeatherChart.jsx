import React, { useEffect, useState } from 'react';
import './WeatherChart.css';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';


function WeatherChart({ weatherDailyData }) {

    const [Data, setData] = useState();

    const chartDetails = () => {
        let arr = [];
        for (let i = 0; i < 40; i += 8) {
            arr.push(Math.floor(weatherDailyData[i].main.temp));
        }

        // console.log(arr);

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
                        elements: {
                            line: {
                                tension: 0.3,
                            },
                        },
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
                                },
                                offset: false,
                            },
                            y: {
                                ticks: {
                                    font: {
                                        family: 'Poppins, sans-serif',
                                        size: '15px',
                                    },
                                    callback: function (value, index, values) {
                                        return `${value}\u00B0  `;
                                    },
                                },
                                border: {
                                    display: false,
                                },
                                // beginAtZero: true,
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