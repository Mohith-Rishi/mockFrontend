import { useEffect, useState } from "react";
import { generatePollutionData } from "./data/mockStream";
import StatCard from "./components/statCard";
import PollutantGraph from "./components/pollutionGraphs";
import Alerts from "./components/AlertsPanel";
import Recommendations from "./components/RecommendationsTab";

export default function App() {
  const [data, setData] = useState([]);
  const [showGraphs, setShowGraphs] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => {
        const updated = [...prev, generatePollutionData()];
        return updated.slice(-150); // ~5 min (2s interval)
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const latest = data[data.length - 1];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">
        🌍 Real-Time Pollution Dashboard
      </h1>

      {/* Cards */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <StatCard label="PM2.5" value={latest?.PM2_5} unit="µg/m³" />
        <StatCard label="NO2" value={latest?.NO2} unit="ppb" />
      </div>

      {/* Button */}
      <button
        className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 mb-6"
        onClick={() => setShowGraphs(!showGraphs)}
      >
        {showGraphs ? "Hide Graphs" : "Show Graphs"}
      </button>

      {/* Graphs */}
      {showGraphs && <PollutantGraph data={data} />}

      <Alerts value={latest?.PM2_5} />
      <Recommendations />
    </div>
  );
}
