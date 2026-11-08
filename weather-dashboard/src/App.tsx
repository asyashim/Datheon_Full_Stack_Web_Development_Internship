import { useState } from 'react';
import SearchBar from './components/SearchBar';
import './App.css';


type WeatherData = {
  name: string;
  sys: {
    country: string;
  };
  main: {
    temp: number;
    humidity: number;
    pressure: number;
  };
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
  };
};

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error,setError] =useState('')

  const fetchWeather = async (searchedCity: string) => {
  setLoading(true);
  setError(''); // Reset error state before fetching new data
  setWeather(null);

  try {
    const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(searchedCity)}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) {
  if (response.status === 404) {
    throw new Error('City not found. Please enter a valid city name.');
  }

  throw new Error('Something went wrong. Please try again.');
}

    const data: WeatherData = await response.json();

    setWeather(data);

  }catch (error) {
  if (error instanceof Error) {
    setError(error.message);
  } else {
    setError('Something went wrong.');
  }
}

   finally {
    setLoading(false);
  }
};

  const handleSearch = (searchedCity: string) => {
    setCity(searchedCity);
    fetchWeather(searchedCity);
  };

  return (
    <div className="weather-app">
      <header>
        <h1>Weather Dashboard</h1>
        <p>Check the weather anywhere in the world.</p>
      </header>

      <SearchBar onSearch={handleSearch} />

      {city && (
        <p className="search-result">
          Searching weather for: {city}
        </p>
      )}

     <main className="weather-content">
     {loading && <p className="loading-message">Loading weather data...</p>}
     {error && <p className="error-message">{error}</p>}
  {weather && (
    <>
      <section className="current-weather">
        <h2>Current Weather</h2>

        <h1>{Math.round(weather.main.temp)}°C</h1>

        <p>
          {weather.name}, {weather.sys.country}
        </p>

        <img
  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
  alt={weather.weather[0].description}
/>

        <p>{weather.weather[0].description}</p>
      </section>

      <section className="weather-details">
        <div>
          <h3>Humidity</h3>
          <p>{weather.main.humidity}%</p>
        </div>

        <div>
          <h3>Wind Speed</h3>
          <p>{(weather.wind.speed * 3.6).toFixed(1)} km/h</p>
        </div>

        <div>
          <h3>Pressure</h3>
          <p>{weather.main.pressure} hPa</p>
        </div>
      </section>
    </>
  )}
</main>
       
    </div>
  );
}

export default App;