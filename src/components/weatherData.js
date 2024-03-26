import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDroplet,
  faWind,
  faMagnifyingGlass,
  faSun,
} from '@fortawesome/free-solid-svg-icons';
import './weatherData.css';
import clear from '../images/clear.gif';
import rain from '../images/rain.gif';
import drizzle from '../images/drizzle.gif';
import snow from '../images/snow.gif';
import storm from '../images/clouds-storm.gif';
import mist from '../images/mist.gif';
import brokenClouds from '../images/brokenClouds.gif';
import scatteredClouds from '../images/scatteredClouds.gif';
import fewClouds from '../images/fewClouds.gif';
import thurnderStorm from '../images/thuderStorm.gif';

export const WeatherData = () => {
  const [weatherNum, setWeatherNUm] = useState({
    CurrentWeatherIcon: '',
    temperature: 22,
    city: 'London',
    humidityIcon: faDroplet,
    humidityData: 64,
    humidityText: 'Humidity',
    windIcon: faWind,
    windData: 34,
    windText: 'Wind Speed',
  });

  const inputRef = useRef(null);
  /*making API call to fetch the Data from openweathermap*/
  function search() {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputRef.current.value}&units=Metric&APPID=f4a03e547a1ee8dfc12b6502cdd956a0`;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (inputRef.current.value === '') {
          return 0;
        }
        const newWeatherData = {
          //this is the object which will be used to update state
          CurrentWeatherIcon:
            data.weather[0].icon === '01d' || data.weather[0].icon === '01n'
              ? clear
              : data.weather[0].icon === '10d' || data.weather[0].icon === '10n'
              ? rain
              : data.weather[0].icon === '13d' || data.weather[0].icon === '13n'
              ? snow
              : data.weather[0].icon === '09d' || data.weather[0].icon === '09n'
              ? drizzle
              : data.weather[0].icon === '11d' || data.weather[0].icon === '11n'
              ? thurnderStorm
              : data.weather[0].icon === '04d' || data.weather[0].icon === '04n'
              ? brokenClouds
              : data.weather[0].icon === '50d' || data.weather[0].icon === '50n'
              ? mist
              : data.weather[0].icon === '03d' || data.weather[0].icon === '03n'
              ? scatteredClouds
              : data.weather[0].icon === '02d' || data.weather[0].icon === '02n'
              ? fewClouds
              : false,
          temperature: data.main.temp,
          city: data.name,
          humidityData: data.main.humidity,
          humidityIcon: faDroplet,
          windData: data.wind.speed,
          windText: 'Wind Speed',
          humidityText: 'Humidity',
          windIcon: faWind,
        };
        setWeatherNUm(newWeatherData); // the setWeatherNUm takes the newWeatherData and updates the state

        // Trigger the pulsating effect of the temparature value
        const tempElement = document.querySelector('.temp-city div');
        tempElement.classList.remove('pulsate');
        void tempElement.offsetWidth; // Trigger reflow
        tempElement.classList.add('pulsate');
      })
      .catch((error) => console.error('Error fetching data:', error));
  }

  return (
    <div className='weather-data'>
      <div className='search-center'>
        <div className='search-container'>
          <input
            type='text'
            placeholder='search for a city or country'
            className='input'
            ref={inputRef}
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                search();
              }
            }}
          />
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className='search-icon'
            onClick={search}
          />
        </div>
      </div>

      <div className='weather-icons'>
        <img src={weatherNum.CurrentWeatherIcon} />
      </div>
      <div className='temp-city'>
        <div>{Math.floor(weatherNum.temperature) + ' °C'}</div>
      </div>
      <div className='london-city'>
        <div>{weatherNum.city}</div>
      </div>
      <div className='humidity'>
        <div className='humity-icon-num'>
          <div>
            <FontAwesomeIcon
              icon={weatherNum.humidityIcon}
              className='humidity-icon'
              bounce
            />
          </div>
          <div>{weatherNum.humidityData + '%'}</div>
          <div>{weatherNum.humidityText}</div>
        </div>
      </div>
      <div className='wind-speed'>
        <div>
          <FontAwesomeIcon icon={weatherNum.windIcon} beatFade />
        </div>
        <div>{Math.floor(weatherNum.windData) + ' ' + 'km/h'}</div>
        <div>{weatherNum.windText}</div>
      </div>
    </div>
  );
};

export default WeatherData;
