import { useState } from "react";
import Weather from "./Weather";

export default function Appui() {
  const [location, setLocation] = useState("");
  const [triggerFetch, setTriggerFetch] = useState(0);

  const handleFetch = () => {
    if (!location) return;
    setTriggerFetch(prev => prev + 1);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleFetch();
  };





  return (

    <div className="flex flex-col items-center min-h-screen p-4 sm:p-8">
      <div className="bg-amber-300 w-full max-w-3xl rounded-lg p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
        <h1 className="text-2xl sm:text-3xl font-bold flex-1 text-center sm:text-left">
          Weather App
        </h1>

        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter location"
          className="flex-1 px-3 py-2 rounded-md border bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400 w-full sm:w-auto"
        />

        <button
          onClick={handleFetch}
          className="bg-amber-500 text-white px-4 py-2 rounded-md hover:bg-amber-600 w-full sm:w-auto"
        >
          Get Weather
        </button>
      </div>

    
      <div className="flex justify-center items-center mt-6 w-full">
        <Weather location={location} triggerFetch={triggerFetch} />
      </div>
    </div>
  );
}
