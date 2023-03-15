import { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ country }) => {
  const [weather, setWeather] = useState();
  const api_key = process.env.REACT_APP_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${api_key}&units=metric`;

  const hook = () => {
    axios.get(url).then((response) => {
      setWeather(response.data);
    });
  };

  useEffect(hook, [url]);

  return (
    <>
      <h2>Weather in {country.capital}</h2>
      {weather ? <p>temperature {weather.main.temp} Celcius </p> : null}
      {weather ? (
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt="'hi"
        />
      ) : null}
      {weather ? <p>wind {weather.wind.speed} m/s </p> : null}
    </>
  );
};

export default Weather;

/* REACT_APP_API_KEY=4a11837dd48aa430e5b7b84f3907f1c4 npm start */
