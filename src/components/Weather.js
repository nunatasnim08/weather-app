import React,{useState, useEffect} from "react";
import axios from "axios";

function Weather() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [error, setError] = useState(null);

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=b224e03b84ce0390f6f152362676b0b6`)

        .then((response) => {
          setData(response.data);
          setError(null);
        })
        .catch((error) => {
          setError(error.message);
        });
      setLocation('');
    }
  }

  useEffect(() => {
    console.log('Data changed:', data);
  }, [data]);

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Enter Location'
          type="text" />
      </div>
      <div className="container">
        {error && <p>{error}</p>}
        {data.name !== undefined &&
          <div>
            <div className="top">
              <div className="location">
                <p>{data.name}</p>
              </div>
              <div className="temp">
                 {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
              </div>

              <div className="description">
                {data.weather ? <p>{data.weather[0].main}</p> : null}
              </div>
            </div>
            <div className="const">
              <div className="bottom">
                <div className="feels">
                  {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°F</p> : null}
                  <p>Feels Like</p>
                </div>
                <div className="humidity">
                  {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
                  <p>Humidity</p>
                </div>
                <div className="wind">
                  {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
                  <p>Wind Speed</p>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default Weather;
