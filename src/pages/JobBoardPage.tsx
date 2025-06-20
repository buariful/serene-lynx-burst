import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const jobs = [
  {
    title: "Registered Nurse - Toronto General Hospital",
    location: "Toronto, ON",
    type: "Full Time",
    posted: "2024-06-01",
  },
  {
    title: "Medical Office Assistant - Mount Sinai Hospital",
    location: "Toronto, ON",
    type: "Part Time",
    posted: "2024-05-28",
  },
  {
    title: "Resident Physician - London Health Sciences Centre",
    location: "London, ON",
    type: "Contract",
    posted: "2024-05-25",
  },
];

const JobBoardPage = () => (
  <div>
    <Header />
    <div className="bg-gray-50 min-h-screen py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded shadow p-6">
        <h1 className="text-2xl font-bold mb-4 text-blue-700">Job Board</h1>
        <p className="mb-6 text-gray-700 text-sm">
          Find the latest job opportunities in the medical and healthcare
          sector.
        </p>
        <div className="grid gap-6">
          {jobs.map((job, idx) => (
            <div key={idx} className="border-b pb-4">
              <h2 className="font-semibold text-lg text-blue-700 mb-1">
                {job.title}
              </h2>
              <p className="text-xs text-gray-400 mb-1">
                {job.location} &middot; {job.type} &middot; Posted {job.posted}
              </p>
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

export default JobBoardPage;
