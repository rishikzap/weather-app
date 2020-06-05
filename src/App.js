import React from 'react';

const api = {
  key: process.env.REACT_APP_WEATHER_API_KEY,
  base: "https://api.openweathermap.org/data/2.5/"
}


function App() {
  const [query, setQuery] = React.useState('');
  const [weather, setWeather] = React.useState({});

  const search = event => {
    if(event.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=imperial&appid=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
        })
    }
  };

  const dateObject = new Date();

  const dateInfo = {
    day: dateObject.getDate(),
    dayOfWeek: dateObject.getDay(),
    month: dateObject.getMonth(),
    year: dateObject.getFullYear()
  };
  
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday", 
    "Saturday",
  ]

  const todayIs = `${days[dateInfo.dayOfWeek]}, ${months[dateInfo.month]} ${dateInfo.day}`;
  
  const chooseBack = weather => {
    if(typeof weather.name != "undefined") {
      if(weather.main.temp > 55)
        return "App-warm";
      else
        return "App";
    }
    else
      return "App-warm";
  };

  return (
    <div className={chooseBack(weather)}>
      <main>
        <div className="search-box">
          <input 
          className="search-bar"
          type="text"
          onChange = {e => setQuery(e.target.value)}
          value = {query}
          placeholder="Enter City, State, or Country"
          onKeyPress={search}
          >
          </input>
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="location-box">
            <div className="location">
              {weather.name}, {weather.sys.country}
            </div>
            <div className="date">
              {todayIs}
            </div>
            <div className="weather-box">
              <div className="temp">
                {Math.round(weather.main.temp)}°F
              </div>
              <div className="weather">
                {weather.weather[0].main}
              </div>
            </div>
          </div>
          </div>
          ) : ('')}
      </main>
    </div>
  );
}

export default App;
