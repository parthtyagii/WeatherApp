import React from 'react';
import './WeatherChart.css';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const d = {
    labels: ['A', 'B', 'C', 'D', 'E', 'F', 'F', 'G'],
    datasets: [
        {
            label: 'Temperature',
            data: [30, 21, 32, 18, 29, 41, 25, 36],
            fill: true,
            backgroundColor: '#008adf2b',
            borderColor: '#008adf',
            pointBackgroundColor: 'blue',
            pointBorderColor: 'white',
            pointBorderWidth: 2,
            pointRadius: 5,
        }
    ]
}

const op = {
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
}

function WeatherChart() {
    return (
        <div className='WeatherChart'>
            <Line data={d} options={op} />
        </div>
    );
};

export default WeatherChart;