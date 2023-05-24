import React, { useEffect, useState } from 'react';
import './SuggestionBar.css';
import { useSafeLayoutEffect, useStatStyles } from '@chakra-ui/react';


function SuggestionBar({ suggestions, setSearchedCity, inputRef }) {

    const [cities, setCities] = useState(null);

    const clickHandler = (city) => {
        setSearchedCity(city);
        inputRef.current.focus();
        inputRef.current.value = city;
    }

    const getSuggestions = async () => {
        if (suggestions) {
            let arr = [];
            let x = 3;
            if (suggestions.length < 3) {
                x = suggestions.length;
            }

            for (let i = 0; i < x; i++) {
                arr.push(suggestions[i]);
            }
            setCities(arr);
        }
    }

    useEffect(() => {
        getSuggestions();
    }, [suggestions]);

    return (
        <div className='suggestionContainer'>

            {cities && (
                cities.map((s, index) => {
                    return (
                        <div className='city' key={index}>
                            <div onClick={() => clickHandler(s.city)}>{s.city}</div>
                        </div>
                    );
                })
            )}

        </div>
    )
};

export default SuggestionBar;