import { useState } from "react";

export const WeatherApp = () => {
  const urlBase = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = "8f82809f1d5d99c725d17192b9d82858";

  const [ciudad, setCiudad] = useState("");
  const [dataClima, setDataClima] = useState(null);
  const difKelvin = 273.15;

  const handleCambioCiudad = (e) => {
    setCiudad(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ciudad.length > 0) fetchWeather();
  };

  const fetchWeather = async () => {
    try {
      const response = await fetch(`${urlBase}?q=${ciudad}&appid=${API_KEY}`);
      const data = await response.json();
      setDataClima(data);
    } catch (error) {
      console.error("Error fetching weather data", error);
    }
  };

  return (
    <div className="container">
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city name"
          value={ciudad}
          onChange={handleCambioCiudad}
        />
        <button>Search</button>
      </form>
      {dataClima && (
        <div>
          <h2>{dataClima.name}</h2>
          <p>{dataClima.weather[0].description}</p>
          <p>Temperature: {parseInt(dataClima?.main?.temp - difKelvin)}°C</p>
          <img
            src={`http://openweathermap.org/img/wn/${dataClima.weather[0].icon}.png`}
            alt="weather icon"
          />
        </div>
      )}
    </div>
  );
};
