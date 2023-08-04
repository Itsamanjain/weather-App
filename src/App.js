import React, { useState } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const apiKey = 'c410136c0354fa5682995851457793d4';

  const handleChange = (event) => {
    setCity(event.target.value);
  };

  const handleSearch = () => {
    if (city.trim()) {
      fetchWeatherData();
    } else {
      alert('Please enter a city name.');
    }
  };

  const fetchWeatherData = () => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setWeatherData(data);
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
      });
  };

  return (
    <div className="container">
      <h1>Weather App</h1>
      <input
        type="text"
        value={city}
        onChange={handleChange}
        placeholder="Enter city name"
      />
      <button onClick={handleSearch}>Search</button>
      {weatherData && (
        <div id="weatherInfo">
          <h2>{weatherData.name}</h2>
          <p>{weatherData.weather[0].description}</p>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
          <p>Sunrise: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}</p>
          <p>Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}</p>
          <p>Current Time: {new Date(weatherData.dt * 1000).toLocaleTimeString()}</p>
        </div>
      )}
    </div>
  );
}

export default App;
