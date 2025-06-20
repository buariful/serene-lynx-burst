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
  "The Ottawa Hospital - Civic Campus",
  "Hamilton General Hospital",
  "London Health Sciences Centre",
  "Kingston General Hospital",
  "Thunder Bay Regional Health Sciences Centre",
  "Windsor Regional Hospital - Metropolitan Campus",
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
    <div>
      <Header />
      <section className="bg-blue-700 text-white py-12 px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          Hospitals in Ontario Canada
        </h1>
        <p className="text-sm md:text-base max-w-2xl mx-auto">
          Browse a comprehensive list of hospitals in Ontario. Use the search
          below to quickly find a hospital by name.
        </p>
      </section>
      <section className="max-w-3xl mx-auto py-8 px-4">
        <input
          type="text"
          placeholder="Search hospitals..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mb-6 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200 text-sm"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredHospitals.length === 0 ? (
            <div className="col-span-2 text-center text-gray-500">
              No hospitals found.
            </div>
          ) : (
            filteredHospitals.map((hospital, idx) => (
              <div
                key={idx}
                className="bg-white rounded shadow p-4 flex flex-col justify-between h-full"
              >
                <div className="flex items-center gap-3 mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8 text-blue-600 flex-shrink-0"
                  >
                    <rect
                      x="3"
                      y="5"
                      width="18"
                      height="14"
                      rx="2"
                      className="fill-blue-100 stroke-blue-600"
                    />
                    <path
                      d="M9 9h6M12 9v6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  <h2 className="font-semibold text-lg text-blue-700">
                    {hospital}
                  </h2>
                </div>
                <p className="text-gray-600 text-xs">Ontario, Canada</p>
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
