
export const fetchWeatherData = async (query) => {
  const URL = "https://api.openweathermap.org/data/2.5/weather";
  const apiKey = "80aea625d8b927cc56ee34e3edfacc4b";
  let fetchUrl = "";

  
  if (typeof query === "string" && query.includes(",")) {
    const [lat, lon] = query.split(",");
    fetchUrl = `${URL}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  } else {
    fetchUrl = `${URL}?q=${query}&appid=${apiKey}&units=metric`;
  }

  try {
    const response = await fetch(fetchUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather: ", error);
    return null;
  }
};