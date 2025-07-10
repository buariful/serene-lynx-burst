import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const hospitals = [
  "Sunnybrook Health Sciences Centre",
  "Toronto General Hospital",
  "Mount Sinai Hospital",
  "St. Michael's Hospital",
  "Women's College Hospital",
  "Toronto Western Hospital",
  "North York General Hospital",
  "Scarborough Health Network - General Campus",
  "Humber River Hospital",
  "The Ottawa hospitals - Civic Campus",
  "Hamilton General Hospital",
  "London Health Sciences Centre",
  "Kingston General Hospital",
  "Thunder Bay Regional Health Sciences Centre",
  "Windsor Regional hospitals - Metropolitan Campus",
  "St. Joseph's Healthcare Hamilton",
  "Southlake Regional Health Centre",
  "Royal Victoria Regional Health Centre Barrie",
  "Grand River Hospital",
  "Trillium Health Partners - Mississauga Hospital",
];

const HospitalListPage = () => {
  const [search, setSearch] = useState("");
  const filteredHospitals = hospitals.filter((hospital) =>
    hospital.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <section className="bg-blue-700 text-white py-12 px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          Hospitals in Ontario Canada
        </h1>
        <p className="text-sm md:text-base max-w-2xl mx-auto">
          Browse a comprehensive list of hospitals in Ontario. Use the search
          below to quickly find a hospitalsby name.
        </p>
      </section>
      <section className="max-w-3xl mx-auto py-8 px-4">
        <input
          type="text"
          placeholder="Search hospitals..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mb-6 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredHospitals.length === 0 ? (
            <div className="col-span-2 text-center text-gray-500 dark:text-gray-400">
              No hospitals found.
            </div>
          ) : (
            filteredHospitals.map((hospital, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-gray-800 rounded shadow p-4 flex flex-col justify-between h-full border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center gap-3 mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8 text-blue-600 dark:text-blue-400 flex-shrink-0"
                  >
                    <rect
                      x="3"
                      y="5"
                      width="18"
                      height="14"
                      rx="2"
                      className="fill-blue-100 dark:fill-blue-900 stroke-blue-600 dark:stroke-blue-400"
                    />
                    <path
                      d="M9 9h6M12 9v6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  <h2 className="font-semibold text-lg text-blue-700 dark:text-blue-400">
                    {hospital}
                  </h2>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-xs">Ontario, Canada</p>
                {/* Placeholder for more info or actions */}
              </div>
            ))
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default HospitalListPage;
