
export default function WeatherCard({ data }) {
  if (!data || !data.weather) return null; 

  return (
    <div className="bg-white p-4 rounded shadow w-full max-w-md text-center">
      <h2 className="text-xl font-bold mb-2">
        {data.name}, {data.sys?.country}
      </h2>
      <p className="text-lg">{data.weather?.[0]?.description ?? "N/A"}</p>
      <p>🌡 Temperature: {data.main?.temp ?? "N/A"} °C</p>
      <p>💧 Humidity: {data.main?.humidity ?? "N/A"}%</p>
      <p>💨 Wind: {data.wind?.speed ?? "N/A"} m/s</p>
      <p>☁ Clouds: {data.clouds?.all ?? "N/A"}%</p>
    </div>
  );
}
