import React, { useRef, useState, useEffect } from 'react'
import './WeatherApp.css'
import search_icon from '../Assets/search.png';
import clear_icon from '../Assets/clear.png';
import cloud_icon from '../Assets/cloud.png';
import drizzle_icon from '../Assets/drizzle.png';
import humidity_icon from '../Assets/humidity.png';
import rain_icon from '../Assets/rain.png';
import snow_icon from '../Assets/snow.png';
import wind_icon from '../Assets/wind.png';

export const WeatherApp = () => {

    useEffect(() => { }, [])

    let inputRef = useRef();
    let [humidity, setHumidity] = useState();
    let [wind, setWind] = useState();
    let [wicon, setIcon] = useState(cloud_icon);
    let apiKey = 'ceb3960ef9bf712e31a321272247e6b8';

    const search = async () => {
        const element = inputRef.current.value;
        if (element === '') {
            return 0;
        }
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element}&units=Metric&appid=${apiKey}`;
        try {
            let response = await fetch(url);
            let data = await response.json();
            const temperature = document.getElementsByClassName('weather-temp');
            const location = document.getElementsByClassName('weather-location');
            setHumidity(data?.main.humidity + "%");
            setWind(Math.floor(data?.wind.speed) + "km/h");
            temperature[0].innerHTML = Math.floor(data.main.temp) + "°c";
            location[0].innerHTML = data.name;
            let { weather: [{ icon }] } = data;
            switch (true) {
                case (icon === '01d' || icon === '01n'): setIcon(clear_icon); break;
                case (icon === '02d' || icon === '02n'): setIcon(cloud_icon); break;
                case (icon === '03d' || icon === '03n'): setIcon(drizzle_icon); break;
                case (icon === '04d' || icon === '04n'): setIcon(drizzle_icon); break;
                case (icon === '09d' || icon === '09n'): setIcon(rain_icon); break;
                case (icon === '10d' || icon === '10n'): setIcon(snow_icon); break;
                case (icon === '13d' || icon === '13n'): setIcon(clear_icon); break;
                default: setIcon(clear_icon); break;
            }
        }
        catch (e) {
            alert('Not found');
        }
    }
    let handleKeyPress = ({ key }) => {
        if (key === 'Enter') search();
    }
    return (
        <div className='container'>
            <div className="top-bar">
                <input type="text" className="cityInput" placeholder='search' ref={inputRef} onKeyDown={handleKeyPress} />
                <div className="search-icon" onClick={() => { search() }}>
                    <img src={search_icon} alt="search" />
                </div>
            </div>
            <div className="weather-image">
                <img src={wicon} alt="cloud" />
            </div>
            <div className="weather-temp">24 c</div>
            <div className="weather-location">London</div>
            <div className="data-container">
                <div className="element">
                    <img src={humidity_icon} alt="" className='icon' />
                    <div className="data">
                        <div className="humidity-percent">{humidity}</div>
                        <div className="text">Humidity</div>
                    </div>
                </div>
                <div className="element">
                    <img src={wind_icon} alt="" className='icon' />
                    <div className="data">
                        <div className="wind-rate">{wind}</div>
                        <div className="text">Wind Speed</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
