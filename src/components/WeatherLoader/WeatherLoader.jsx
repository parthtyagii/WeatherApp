import { background } from '@chakra-ui/react';
import React from 'react';
import FadeLoader from 'react-spinners/FadeLoader';
import './WeatherLoader.css';


function WeatherLoader() {
    return (
        <div className='weatherLoader'>
            <FadeLoader color="#008adf" />
        </div>
    );
};

export default WeatherLoader;
