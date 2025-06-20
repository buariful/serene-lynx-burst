import React from "react";

const Card2 = ({
  image = "http://img.freepik.com/free-vector/house-rent-concept-background_23-2147779983.jpg",
}) => {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden max-w-xs">
      {/* Image Section */}
      <div className="h-48 bg-gray-200 relative">
        <img
          src={
            image || "https://via.placeholder.com/300x200?text=Property+Image"
          }
          alt="Property"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Section */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center">
            <span className="text-xl font-bold">$2275</span>
            <span className="ml-2 text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded">
              Verified
            </span>
          </div>
          <button className="text-blue-600 text-sm hover:underline">
            Details
          </button>
        </div>

        <div className="text-gray-600 text-sm mb-2">
          <span>House</span>
          <span className="mx-1">•</span>
          <span>7 minutes ago</span>
        </div>

        <div className="text-sm mb-2">
          <span>5 BED</span>
          <span className="mx-1">•</span>
          <span>2 BATH</span>
          <span className="mx-1">•</span>
          <span>1250 FT²</span>
        </div>

        <div className="text-sm">
          <p>2003 13 Avenue South, Lethbridge, AB</p>
        </div>
      </div>
    </div>
  );
};

export default Card2;
