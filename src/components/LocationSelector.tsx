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
      { id: "edmonton", name: "Edmonton Area" },
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

  const currentChildren = () => {
    if (selectedLocations.length === 0) return LOCATIONS;
    const lastSelected = selectedLocations[selectedLocations.length - 1];
    return lastSelected.children || [];
  };

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
      <div className="flex flex-row min-h-[200px]">
        {/* Render each level of selection */}
        {selectedLocations.length > 0 && (
          <div className="border-r border-gray-300 w-1/3">
            {LOCATIONS.map((loc) => (
              <button
                key={loc.id}
                onClick={() => handleLocationSelect(loc, 0)}
                className={`w-full p-2 text-left text-xs rounded transition-all duration-100 ${
                  selectedLocations[0]?.id === loc.id
                    ? "bg-green-600 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                {loc.name}
              </button>
            ))}
          </div>
        )}

        {/* Render children of selected locations */}
        {selectedLocations.map((loc, index) => {
          if (!loc.children || index === selectedLocations.length - 1)
            return null;
          return (
            <div key={index} className="border-r border-gray-300 w-1/3">
              {loc.children?.map((child) => (
                <button
                  key={child.id}
                  onClick={() => handleLocationSelect(child, index + 1)}
                  className={`w-full p-2 text-left text-xs rounded transition-all duration-100 ${
                    selectedLocations[index + 1]?.id === child.id
                      ? "bg-green-600 text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {child.name}
                </button>
              ))}
            </div>
          );
        })}

        {/* Current level children */}
        <div className="w-1/3">
          {currentChildren().map((loc) => (
            <button
              key={loc.id}
              onClick={() =>
                handleLocationSelect(loc, selectedLocations.length)
              }
              className={`w-full p-2 text-left text-xs rounded transition-all duration-100 ${
                selectedLocations[selectedLocations.length]?.id === loc.id
                  ? "bg-green-600 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {loc.name}
            </button>
          ))}
        </div>
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
