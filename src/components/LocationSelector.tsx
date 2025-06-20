import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Location = {
  id: string;
  name: string;
  children?: Location[];
};

const LOCATIONS: Location[] = [
  {
    id: "alberta",
    name: "Alberta",
    children: [
      { id: "banff", name: "Banff/Canmore" },
      { id: "calgary", name: "Calgary" },
      {
        id: "edmonton",
        name: "Edmonton Area",
        children: [
          { id: "Edmonton", name: "Edmonton" },
          { id: "st-Albert", name: "St. Albert" },
          { id: "Strathcona", name: "Strathcona County" },
        ],
      },
      { id: "fort-mcmurray", name: "Fort McMurray" },
      { id: "grande-prairie", name: "Grande Prairie" },
      { id: "lethbridge", name: "Lethbridge" },
      { id: "lloydminster", name: "Lloydminster" },
      { id: "medicine-hat", name: "Medicine Hat" },
      { id: "red-deer", name: "Red Deer" },
    ],
  },
  { id: "bc", name: "British Columbia" },
  { id: "manitoba", name: "Manitoba" },
  { id: "new-brunswick", name: "New Brunswick" },
  { id: "newfoundland", name: "Newfoundland" },
  { id: "nova-scotia", name: "Nova Scotia" },
  { id: "ontario-al", name: "Ontario (A - L)" },
  { id: "ontario-mz", name: "Ontario (M - Z)" },
  { id: "pei", name: "Prince Edward Island" },
  { id: "quebec", name: "Quebec" },
  { id: "saskatchewan", name: "Saskatchewan" },
  { id: "territories", name: "Territories" },
];

export default function LocationSelector() {
  const [selectedLocations, setSelectedLocations] = useState<Location[]>([]);

  const handleLocationSelect = (location: Location, level: number) => {
    const newSelected = [...selectedLocations];
    newSelected[level] = location;
    setSelectedLocations(newSelected.slice(0, level + 1));
  };
  const navigate = useNavigate();

  const columns: Location[][] = [LOCATIONS];
  selectedLocations.forEach((location) => {
    if (location.children && location.children.length > 0) {
      columns.push(location.children);
    }
  });

  return (
    <div className="max-w-4xl mx-auto border border-gray-300 rounded shadow-sm">
      {/* Header with blue background */}
      <div className="bg-blue-600 p-3 text-center">
        <h1 className="  text-white">Select Location</h1>
      </div>

      {/* Subtitle with border bottom */}
      <div className="p-3 border-b border-gray-300">
        <p className="text-gray-700">
          To see classifieds ads or post your own ad, click an area.
        </p>
      </div>

      {/* Location columns container */}
      <div className="flex flex-row min-h-[200px] overflow-x-auto">
        {columns.map((column, colIndex) => (
          <div
            key={colIndex}
            className="border-r border-gray-300 w-1/3 flex-shrink-0"
          >
            {column.map((loc) => (
              <button
                key={loc.id}
                onClick={() => handleLocationSelect(loc, colIndex)}
                className={`w-full p-2 text-left text-xs rounded transition-all duration-100 ${
                  selectedLocations[colIndex]?.id === loc.id
                    ? "bg-green-600 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                {loc.name}
              </button>
            ))}
          </div>
        ))}
      </div>

      {/* GO button */}
      <div className="p-2 border-t flex justify-center border-gray-300">
        <button
          onClick={() => navigate("/hospital/post-ad-details")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded text-xs"
          disabled={selectedLocations.length === 0}
        >
          GO
        </button>
      </div>
    </div>
  );
}
