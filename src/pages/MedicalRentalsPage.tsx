import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const rentals = [
  {
    title: "Furnished Studio Near St. Michael's Hospital",
    location: "Toronto, ON",
    price: "$1,800/mo",
  },
  {
    title: "2BR Condo Close to Mount Sinai Hospital",
    location: "Toronto, ON",
    price: "$2,400/mo",
  },
  {
    title: "1BR Apartment by Toronto General Hospital",
    location: "Toronto, ON",
    price: "$2,000/mo",
  },
];

const MedicalRentalsPage = () => (
  <div>
    <Header />
    <div className="bg-gray-50 min-h-screen py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded shadow p-6">
        <h1 className="text-2xl font-bold mb-4 text-blue-700">
          Medical Rentals
        </h1>
        <p className="mb-6 text-gray-700 text-sm">
          Browse rental properties ideal for medical professionals and students
          near major hospitals and medical schools.
        </p>
        <div className="grid gap-6">
          {rentals.map((rental, idx) => (
            <div key={idx} className="border-b pb-4">
              <h2 className="font-semibold text-lg text-blue-700 mb-1">
                {rental.title}
              </h2>
              <p className="text-xs text-gray-400 mb-1">{rental.location}</p>
              <p className="text-gray-700 text-sm mb-2">{rental.price}</p>
              <a href="#" className="text-blue-700 hover:underline text-sm">
                View Details
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

export default MedicalRentalsPage;
