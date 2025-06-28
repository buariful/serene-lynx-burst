import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const initialFavourites = [
  {
    id: 1,
    title: "Favourite Ad Title",
    status: "Active",
    image:
      "http://img.freepik.com/free-vector/house-rent-concept-background_23-2147779983.jpg",
    datePosted: "2024-06-02",
    dateAdded: "2024-05-29",
  },
  // Add more favourites as needed
];

const MyFavouritesPage = () => {
  const [favourites, setFavourites] = useState(initialFavourites);
  const navigate = useNavigate();

  const handleRemove = (id: number) => {
    setFavourites((prev) => prev.filter((ad) => ad.id !== id));
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-xl font-bold mb-4">My Favourites</h1>
      {/* Table Header */}
      <div className="flex items-center px-2 py-2 bg-gray-100 border-b rounded-t text-xs font-semibold text-gray-700">
        <div className="w-24 flex-shrink-0">Image</div>
        <div className="flex-1 min-w-0">Title</div>
        <div className="w-28 text-left">Date Posted</div>
        <div className="w-28 text-left">Date Added</div>
        <div className="w-20 text-left">Status</div>
        <div className="w-16 text-left">Action</div>
      </div>
      <ul className="space-y-2">
        {favourites.map((ad) => (
          <li
            key={ad.id}
            className="flex items-center bg-white border-b px-2 py-2 last:rounded-b cursor-pointer"
            onClick={() => navigate(`/hospital/device-details/${ad.id}`)}
          >
            <img
              src={ad.image}
              alt={ad.title}
              className="w-24 h-20 object-cover rounded border flex-shrink-0"
            />
            <div className="flex-1 min-w-0 px-2">
              <h4 className="font-medium text-gray-800 truncate mb-1">
                {ad.title}
              </h4>
            </div>
            <div className="w-28 text-xs text-gray-500 px-2">
              {ad.datePosted}
            </div>
            <div className="w-28 text-xs text-gray-500 px-2">
              {ad.dateAdded}
            </div>
            <div className="w-20 px-2">
              <span className="bg-gray-300 text-gray-700 text-xs px-2 py-1 rounded inline-block">
                {ad.status}
              </span>
            </div>
            <div className="w-16 px-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(ad.id);
                }}
                className="text-xs text-red-600 hover:underline px-2 py-1 rounded border border-red-100 hover:bg-red-50"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
        {favourites.length === 0 && (
          <li className="text-center text-gray-400 text-sm py-8">
            No favourites found.
          </li>
        )}
      </ul>
    </div>
  );
};

export default MyFavouritesPage;
