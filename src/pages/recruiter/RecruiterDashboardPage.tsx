import React, { useState } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import RecruiterPostJob from "./RecruiterPostJob";
import { Heart, Share } from "lucide-react";
import { GoBriefcase } from "react-icons/go";
import { CiPhone } from "react-icons/ci";
import { FaRegEye } from "react-icons/fa";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

const jobs: {
  id: number;
  title: string;
  company: string;
  type: string;
  description: string;
  image: (File | string)[];
  status: string;
  date: string;
  applications: { id: number; name: string; date: string }[];
}[] = [
  {
    id: 1,
    title: "Cardiology Consultant",
    company: "Toronto General Hospital",
    type: "full-time",
    description:
      "Seeking an experienced cardiology consultant to join our team.",
    image: [
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    ],
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
    company: "Vancouver General Hospital",
    type: "contract",
    description: "ICU nurse needed for a 6-month contract.",
    image: [],
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
  { key: "logout", label: "Logout", route: "/login" },
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
  const EditJobUI = ({ jobId }: { jobId: number }) => {
    const job = jobs.find((j) => j.id === jobId);
    if (!job) return null;
    return (
      <RecruiterPostJob
        setJobPosting={() => {
          setEditingJobId(null);
          setActiveTab("dashboard");
        }}
        jobToEdit={{
          title: job.title,
          company: job.company,
          type: job.type,
          description: job.description,
          image: job.image,
        }}
        mode="edit"
      />
    );
  };

  // View Job UI with AddViewPage left column style
  const ViewJobUI = ({ jobId }: { jobId: number }) => {
    const job = jobs.find((j) => j.id === jobId);
    const [showPhone, setShowPhone] = useState(false);
    if (!job) return null;
    return (
      <div className="max-w-2xl mx-auto p-4 font-sans">
        <button
          type="button"
          onClick={() => setViewingJobId(null)}
          className="mb-4 flex items-center text-blue-600 hover:underline focus:outline-none"
        >
          <span className="mr-2">←</span> Back
        </button>
        {/* Job Header */}
        <img
          src={
            job.image && job.image.length > 0
              ? typeof job.image[0] === "string"
                ? job.image[0]
                : undefined
              : "https://media.istockphoto.com/id/475352876/photo/man-applying-for-a-job-on-the-internet.jpg?s=612x612&w=0&k=20&c=SQeciz8vqdGWu_KJoGC7yK8xmpBl69UewPtZSyWSrOI="
          }
          alt=""
          className="rounded mb-5"
        />
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-[#3e4153]">
            {job.company || job.title}
          </h1>
          <div className="flex justify-between items-center mt-2">
            <span className="text-gray-500">Posted {job.date}</span>
          </div>
          <div className="flex gap-4 mt-2 text-sm text-gray-600">
            <span>
              Status: <span className="font-semibold">{job.status}</span>
            </span>
            <span>
              Applications:{" "}
              <span className="font-semibold">{job.applications.length}</span>
            </span>
          </div>
        </div>
        <hr className="my-4" />
        <div className="flex gap-4">
          <button className="flex items-center gap-1 px-3 py-1 border border-[#3e4153] text-[#3e4153] hover:text-blue-500 hover:border-blue-500 font-semibold rounded-md text-sm">
            <Heart className="w-4" />
            <span>Save</span>
          </button>
          <button className="flex items-center gap-1 px-3 py-1 border border-[#3e4153] text-[#3e4153] hover:text-blue-500 hover:border-blue-500 font-semibold rounded-md text-sm">
            <Share className="w-4" />
            <span>Share</span>
          </button>
        </div>
        <hr className="my-4" />
        {/* Job Details */}
        <div className="mb-6 flex items-center gap-2">
          <span>
            <GoBriefcase className="text-3xl" />
          </span>
          <div>
            <h3 className="text-lg font-semibold mb-2">Job Type</h3>
            <p>
              {job.type
                ? job.type.charAt(0).toUpperCase() +
                  job.type.slice(1).replace("-", " ")
                : "N/A"}
            </p>
          </div>
        </div>
        <hr className="my-4" />
        {/* Description */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Description</h2>
          <p className="whitespace-pre-line">
            {job.description || "No description provided."}
          </p>
        </div>
        <hr className="my-4" />
        {/* Listed By Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Listed By</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <p className="text-xl w-12 h-12 grid place-content-center rounded-full bg-green-200">
                {job.company ? job.company.charAt(0) : job.title.charAt(0)}
              </p>
              <div>
                <p className="font-medium">{job.company || job.title}</p>
                <div className="flex items-center gap-1 mb-1">
                  <span className="text-yellow-400 text-2xl">★★★★★</span>
                  <span className="text-xs text-gray-500">5.0 (44)</span>
                </div>
                <p className="text-sm text-gray-600">Professional Employer</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <CiPhone strokeWidth="1" className="text-blue-500 text-xl" />
              <button
                onClick={() => setShowPhone(!showPhone)}
                className="font-[500] text-blue-600 hover:underline"
              >
                {showPhone ? "+1-514-969-6919" : "Reveal phone number"}
              </button>
            </div>
            <div>
              <p>Av Trans-Island, Montréal, H3W 386</p>
            </div>
            <div className="pt-4 border-t flex items-center gap-3 ">
              <p className="text-gray-500 flex items-center gap-2 text-xs border rounded px-2 py-1 font-medium">
                <FaRegEye /> <span>329 views</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Application Details UI with full-page PDF viewer
  const ApplicationDetailsUI = ({ appId }: { appId: number }) => {
    const app = allApplications.find((a) => a.id === appId);
    const [showPdf, setShowPdf] = useState(false);
    const [showEmailModal, setShowEmailModal] = useState(false);
    const [emailSubject, setEmailSubject] = useState("");
    const [emailMessage, setEmailMessage] = useState("");
    const { toast } = useToast();
    const dummyPdfUrl = "https://msnlabs.com/img/resume-sample.pdf";
    // Dummy applicant info
    const dummyEmail = "alice.smith@email.com";
    const dummyPhone = "+1-555-123-4567";
    const dummyMessage = "Hello, I am interested in this position.";
    if (!app) return null;
    return (
      <>
        <div className="bg-white border rounded p-4 md:p-8 max-w-xl mx-auto relative">
          <h2 className="text-xl font-bold mb-4">Application Details</h2>
          <div className="mb-2">
            Applicant: <span className="font-semibold">{app.name}</span>
          </div>
          <div className="mb-2">
            Applied for: <span className="font-semibold">{app.jobTitle}</span>
          </div>
          <div className="mb-2">Date: {app.date}</div>
          <div className="mb-2">
            Email: <span className="font-semibold">{dummyEmail}</span>
          </div>
          <div className="mb-2">
            Phone: <span className="font-semibold">{dummyPhone}</span>
          </div>
          <div className="mb-4">
            Message: <span className="font-normal">{dummyMessage}</span>
          </div>
          <div className="flex flex-wrap gap-2 mt-6">
            <Button variant="default" onClick={() => setShowPdf(true)}>
              View Resume
            </Button>

            <Dialog open={showEmailModal} onOpenChange={setShowEmailModal}>
              <DialogTrigger asChild>
                <Button variant="secondary">Send Email</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Send Email to {app.name}</DialogTitle>
                </DialogHeader>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    toast({
                      title: "Email sent!",
                      description: `Your email to ${dummyEmail} has been sent.`,
                      variant: "default",
                    });
                    setShowEmailModal(false);
                    setEmailSubject("");
                    setEmailMessage("");
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium mb-1">To</label>
                    <input
                      type="email"
                      value={dummyEmail}
                      disabled
                      className="w-full border rounded px-3 py-2 bg-gray-100 text-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={emailSubject}
                      onChange={(e) => setEmailSubject(e.target.value)}
                      required
                      className="w-full border rounded px-3 py-2"
                      placeholder="Subject"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Message
                    </label>
                    <textarea
                      value={emailMessage}
                      onChange={(e) => setEmailMessage(e.target.value)}
                      required
                      className="w-full border rounded px-3 py-2"
                      rows={5}
                      placeholder="Write your message here..."
                    />
                  </div>
                  <DialogFooter>
                    <Button type="submit" variant="default">
                      Send Email
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>

            <Button
              variant="ghost"
              onClick={() => setViewingApplicationId(null)}
            >
              Back
            </Button>
          </div>
        </div>
        {showPdf && (
          <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex flex-col items-center justify-center">
            <button
              className="absolute top-4 right-4 text-white text-3xl font-bold z-50"
              onClick={() => setShowPdf(false)}
              aria-label="Close PDF"
            >
              ×
            </button>
            <div className="w-full max-w-3xl h-[90vh] bg-white rounded shadow-lg overflow-hidden flex flex-col">
              <iframe
                src={dummyPdfUrl}
                title="Resume PDF"
                width="100%"
                height="100%"
                className="w-full h-full"
              />
            </div>
          </div>
        )}
      </>
    );
  };

  const handleTabClick = (key: string) => {
    setActiveTab(key);
    if (key === "logout") {
      navigate("/login");
    }
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
                onClick={() => handleTabClick(item.key)}
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
                <div className="bg-white border rounded p-6 max-w-xl mx-auto">
                  <form
                    className="space-y-4"
                    onSubmit={(e) => {
                      e.preventDefault();
                      alert("Profile updated successfully!");
                    }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="firstName"
                          className="block font-medium mb-1"
                        >
                          First Name
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          defaultValue="John"
                          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="First Name"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="lastName"
                          className="block font-medium mb-1"
                        >
                          Last Name
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          defaultValue="Doe"
                          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Last Name"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="email"
                          className="block font-medium mb-1"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          defaultValue="recruiter@email.com"
                          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Email"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="phone"
                          className="block font-medium mb-1"
                        >
                          Phone
                        </label>
                        <input
                          type="text"
                          id="phone"
                          name="phone"
                          defaultValue="+1-555-987-6543"
                          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Phone"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded w-full mt-4"
                    >
                      Save Profile
                    </button>
                  </form>
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
