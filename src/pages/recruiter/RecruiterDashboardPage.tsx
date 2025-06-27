import React, { useState } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import RecruiterPostJob from "./RecruiterPostJob";

const jobs = [
  {
    id: 1,
    title: "Cardiology Consultant",
    status: "Open",
    date: "2024-06-01",
    applications: [
      {
        id: 1,
        name: "Dr. Alice Smith",
        date: "2024-06-02",
      },
      {
        id: 2,
        name: "Dr. Bob Lee",
        date: "2024-06-03",
      },
    ],
  },
  {
    id: 2,
    title: "ICU Nurse",
    status: "Closed",
    date: "2024-05-20",
    applications: [
      {
        id: 3,
        name: "Nurse Carol White",
        date: "2024-05-21",
      },
    ],
  },
];

// Flatten all applications for Applicants tab
const allApplications = jobs.flatMap((job) =>
  job.applications.map((app) => ({
    ...app,
    jobTitle: job.title,
    jobId: job.id,
  }))
);

const sidebarItems = [
  { key: "dashboard", label: "Dashboard" },
  { key: "jobs", label: "Jobs" },
  { key: "applicants", label: "Applicants" },
  { key: "profile", label: "Profile" },
];

const RecruiterDashboardPage = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isPostingJob, setJobPosting] = useState(false);
  const [editingJobId, setEditingJobId] = useState<number | null>(null);
  const [viewingJobId, setViewingJobId] = useState<number | null>(null);
  const [viewingApplicationId, setViewingApplicationId] = useState<
    number | null
  >(null);

  const navigate = useNavigate();

  // Stats
  const totalJobs = jobs.length;
  const totalApplications = jobs.reduce(
    (acc, job) => acc + job.applications.length,
    0
  );
  const openJobs = jobs.filter((job) => job.status === "Open").length;
  const closedJobs = jobs.filter((job) => job.status === "Closed").length;

  // Placeholder edit job UI
  const EditJobUI = ({ jobId }: { jobId: number }) => (
    <div className="bg-white border rounded p-8 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Edit Job #{jobId}</h2>
      <div className="mb-4 text-gray-500">Edit job form coming soon.</div>
      <Button
        variant="ghost"
        onClick={() => {
          setEditingJobId(null);
          setActiveTab("dashboard");
        }}
      >
        Cancel
      </Button>
      <Button
        className="ml-2"
        onClick={() => {
          setEditingJobId(null);
          setActiveTab("dashboard");
        }}
      >
        Save
      </Button>
    </div>
  );

  // Placeholder view job UI
  const ViewJobUI = ({ jobId }: { jobId: number }) => {
    const job = jobs.find((j) => j.id === jobId);
    if (!job) return null;
    return (
      <div className="bg-white border rounded p-8 max-w-xl mx-auto">
        <h2 className="text-xl font-bold mb-4">{job.title}</h2>
        <div className="mb-2">
          Status: <span className="font-semibold">{job.status}</span>
        </div>
        <div className="mb-2">Posted: {job.date}</div>
        <Button variant="ghost" onClick={() => setViewingJobId(null)}>
          Back
        </Button>
      </div>
    );
  };

  // Placeholder application details UI
  const ApplicationDetailsUI = ({ appId }: { appId: number }) => {
    const app = allApplications.find((a) => a.id === appId);
    if (!app) return null;
    return (
      <div className="bg-white border rounded p-8 max-w-xl mx-auto">
        <h2 className="text-xl font-bold mb-4">Application Details</h2>
        <div className="mb-2">
          Applicant: <span className="font-semibold">{app.name}</span>
        </div>
        <div className="mb-2">
          Applied for: <span className="font-semibold">{app.jobTitle}</span>
        </div>
        <div className="mb-2">Date: {app.date}</div>
        <Button variant="ghost" onClick={() => setViewingApplicationId(null)}>
          Back
        </Button>
      </div>
    );
  };

  return (
    <>
      <DashboardHeader />
      <div className="min-h-screen bg-[#f7f9fa] flex">
        {/* Sidebar */}
        <aside className="w-56 p-6 bg-white border-r flex flex-col">
          <nav className="flex flex-col gap-2">
            {sidebarItems.map((item) => (
              <button
                key={item.key}
                className={`text-left px-4 py-2 rounded font-medium text-sm transition ${
                  activeTab === item.key
                    ? "bg-blue-600 text-white shadow"
                    : "text-[#7a9ca5] hover:bg-blue-50 hover:text-blue-600"
                }`}
                onClick={() => setActiveTab(item.key)}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </aside>
        {/* Main Content */}
        <main className="flex-1 p-8">
          {/* Edit Job UI */}
          {editingJobId && <EditJobUI jobId={editingJobId} />}
          {/* View Job UI */}
          {viewingJobId && <ViewJobUI jobId={viewingJobId} />}
          {/* Application Details UI */}
          {viewingApplicationId && (
            <ApplicationDetailsUI appId={viewingApplicationId} />
          )}

          {/* Dashboard Tab */}
          {activeTab === "dashboard" &&
            !editingJobId &&
            !viewingJobId &&
            !viewingApplicationId &&
            (isPostingJob ? (
              <RecruiterPostJob setJobPosting={setJobPosting} />
            ) : (
              <>
                <div className="flex justify-between items-center">
                  <h1 className="text-2xl font-bold mb-6">
                    Recruiter Dashboard
                  </h1>
                  <Button variant="default" onClick={() => setJobPosting(true)}>
                    Post Job
                  </Button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="bg-blue-50 border rounded p-4 text-center">
                    <div className="text-2xl font-bold text-blue-700">
                      {totalJobs}
                    </div>
                    <div className="text-xs text-gray-600">Jobs Posted</div>
                  </div>
                  <div className="bg-blue-50 border rounded p-4 text-center">
                    <div className="text-2xl font-bold text-blue-700">
                      {totalApplications}
                    </div>
                    <div className="text-xs text-gray-600">
                      Total Applications
                    </div>
                  </div>
                  <div className="bg-blue-50 border rounded p-4 text-center">
                    <div className="text-2xl font-bold text-blue-700">
                      {openJobs}
                    </div>
                    <div className="text-xs text-gray-600">Open Jobs</div>
                  </div>
                  <div className="bg-blue-50 border rounded p-4 text-center">
                    <div className="text-2xl font-bold text-blue-700">
                      {closedJobs}
                    </div>
                    <div className="text-xs text-gray-600">Closed Jobs</div>
                  </div>
                </div>
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">Your Jobs</h2>
                  <div className="space-y-4">
                    {jobs.map((job) => (
                      <div
                        key={job.id}
                        className="bg-white border rounded p-4 flex flex-col md:flex-row md:items-center md:justify-between"
                      >
                        <div>
                          <div className="font-bold text-lg">{job.title}</div>
                          <div className="text-xs text-gray-500 mb-1">
                            Posted: {job.date}
                          </div>
                          <div className="inline-block px-2 py-1 text-xs rounded bg-blue-100 text-blue-700 font-semibold mb-2">
                            {job.status}
                          </div>
                        </div>
                        <div className="flex gap-2 mt-2 md:mt-0">
                          <Button
                            variant="outline"
                            onClick={() => setViewingJobId(job.id)}
                          >
                            View
                          </Button>
                          <Button
                            variant="secondary"
                            onClick={() => setEditingJobId(job.id)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="default"
                            onClick={() => setActiveTab("applicants")}
                          >
                            View Applications
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ))}

          {/* Jobs Tab */}
          {activeTab === "jobs" &&
            !editingJobId &&
            !viewingJobId &&
            !viewingApplicationId && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-bold">Your Jobs</h1>
                  <Button variant="default" onClick={() => setJobPosting(true)}>
                    Post Job
                  </Button>
                </div>
                <div className="space-y-4">
                  {jobs.map((job) => (
                    <div
                      key={job.id}
                      className="bg-white border rounded p-4 flex flex-col md:flex-row md:items-center md:justify-between"
                    >
                      <div>
                        <div className="font-bold text-lg">{job.title}</div>
                        <div className="text-xs text-gray-500 mb-1">
                          Posted: {job.date}
                        </div>
                        <div className="inline-block px-2 py-1 text-xs rounded bg-blue-100 text-blue-700 font-semibold mb-2">
                          {job.status}
                        </div>
                      </div>
                      <div className="flex gap-2 mt-2 md:mt-0">
                        <Button
                          variant="outline"
                          onClick={() => setViewingJobId(job.id)}
                        >
                          View
                        </Button>
                        {job.status === "Open" && (
                          <Button
                            variant="secondary"
                            onClick={() => setEditingJobId(job.id)}
                          >
                            Edit
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          {/* Applicants Tab */}
          {activeTab === "applicants" &&
            !editingJobId &&
            !viewingJobId &&
            !viewingApplicationId && (
              <div>
                <h1 className="text-2xl font-bold mb-6">All Applications</h1>
                <div className="space-y-4">
                  {allApplications.map((app) => (
                    <div
                      key={app.id}
                      className="bg-white border rounded p-4 flex flex-col md:flex-row md:items-center md:justify-between"
                    >
                      <div>
                        <div className="font-medium">{app.name}</div>
                        <div className="text-xs text-gray-400">
                          Applied: {app.date}
                        </div>
                        <div className="text-xs text-gray-500">
                          For: {app.jobTitle}
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => setViewingApplicationId(app.id)}
                      >
                        View Details
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

          {/* Profile Tab */}
          {activeTab === "profile" &&
            !editingJobId &&
            !viewingJobId &&
            !viewingApplicationId && (
              <div>
                <h1 className="text-2xl font-bold mb-6">Profile</h1>
                <div className="bg-white border rounded p-6">
                  Profile details coming soon.
                </div>
              </div>
            )}
        </main>
      </div>
      <Footer />
    </>
  );
};

export default RecruiterDashboardPage;
