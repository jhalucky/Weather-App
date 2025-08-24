import { useState, useEffect } from "react";
import WeatherCard from "./WeatherCard";
import { fetchWeatherData } from "../Apis/api";

export default function Weather({ location, triggerFetch }) {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Helper to set background and save to localStorage
  const setBodyBackground = (imagePath) => {
    document.body.style.backgroundImage = `url(${imagePath})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";
    localStorage.setItem("bgImage", imagePath);
  };

  // Apply background instantly from localStorage on first load
  useEffect(() => {
    const savedBg = localStorage.getItem("bgImage");
    if (savedBg) {
      // Fix old absolute paths that might be stored in localStorage
      const fixedBg = savedBg.startsWith("/") ? savedBg.substring(1) : savedBg;
      setBodyBackground(fixedBg);
    }
  }, []);

  useEffect(() => {
    const fetchWeather = async (query) => {
      setLoading(true);
      setError("");

      const data = await fetchWeatherData(query);

      if (!data || data.cod !== 200) {
        setError("Could not fetch weather");
        setWeatherData(null);
        setBodyBackground("default.jpg");
        setLoading(false);
        return;
      }

      setWeatherData(data);

    
      const desc =
        data.weather && data.weather[0] && data.weather[0].description
          ? data.weather[0].description.toLowerCase()
          : "";

      const bgMap = [
        { keywords: ["sunny", "clear"], image: "sunny.jpg" },
        { keywords: ["cloud", "overcast"], image: "cloudy.jpg" },
        { keywords: ["rain", "drizzle", "shower"], image: "rain.jpg" },
        { keywords: ["snow"], image: "snow.jpg" },
        { keywords: ["thunderstorm", "storm"], image: "thunderstorm.jpg" },
        { keywords: ["mist", "fog", "haze"], image: "mist.jpg" },
      ];

      const matched = bgMap.find(({ keywords }) =>
        keywords.some((word) => desc.includes(word))
      );

      setBodyBackground(matched ? matched.image : "default.jpg");
      setLoading(false);
    };

    if (location) {
      fetchWeather(location);
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeather(`${latitude},${longitude}`);
        },
        () => {
          setError("Location permission denied or unavailable");
          setBodyBackground("default.jpg");
        }
      );
    } else {
      setError("Geolocation not supported by your browser");
      setBodyBackground("default.jpg");
    }
  }, [location, triggerFetch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!weatherData) return <p>Enter a city or allow location to see weather</p>;

  return <WeatherCard data={weatherData} />;
}