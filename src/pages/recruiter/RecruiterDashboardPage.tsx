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
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

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
          className="mb-4 flex items-center text-blue-600 dark:text-blue-400 hover:underline focus:outline-none"
        >
          <span className="mr-2">←</span> {t('recruiter.jobDetails.back')}
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
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
            {job.company || job.title}
          </h1>
          <div className="flex justify-between items-center mt-2">
            <span className="text-gray-500 dark:text-gray-400">{t('recruiter.jobDetails.posted')} {job.date}</span>
          </div>
          <div className="flex gap-4 mt-2 text-sm text-gray-600 dark:text-gray-300">
            <span>
              {t('recruiter.jobDetails.status')}: <span className="font-semibold">{job.status}</span>
            </span>
            <span>
              {t('recruiter.jobDetails.applications')}:{" "}
              <span className="font-semibold">{job.applications.length}</span>
            </span>
          </div>
        </div>
        <hr className="my-4 border-gray-200 dark:border-gray-700" />
        <div className="flex gap-4">
          <button className="flex items-center gap-1 px-3 py-1 border border-gray-600 dark:border-gray-400 text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 hover:border-blue-500 dark:hover:border-blue-400 font-semibold rounded-md text-sm">
            <Heart className="w-4" />
            <span>{t('recruiter.jobDetails.save')}</span>
          </button>
          <button className="flex items-center gap-1 px-3 py-1 border border-gray-600 dark:border-gray-400 text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 hover:border-blue-500 dark:hover:border-blue-400 font-semibold rounded-md text-sm">
            <Share className="w-4" />
            <span>{t('recruiter.jobDetails.share')}</span>
          </button>
        </div>
        <hr className="my-4 border-gray-200 dark:border-gray-700" />
        {/* Job Details */}
        <div className="mb-6 flex items-center gap-2">
          <span>
            <GoBriefcase className="text-3xl text-gray-700 dark:text-gray-300" />
          </span>
          <div>
            <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">{t('recruiter.jobDetails.jobType')}</h3>
            <p className="text-gray-600 dark:text-gray-300">
              {job.type
                ? job.type.charAt(0).toUpperCase() +
                  job.type.slice(1).replace("-", " ")
                : "N/A"}
            </p>
          </div>
        </div>
        <hr className="my-4 border-gray-200 dark:border-gray-700" />
        {/* Description */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">{t('recruiter.jobDetails.description')}</h2>
          <p className="whitespace-pre-line text-gray-600 dark:text-gray-300">
            {job.description || "No description provided."}
          </p>
        </div>
        <hr className="my-4 border-gray-200 dark:border-gray-700" />
        {/* Listed By Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">{t('recruiter.jobDetails.listedBy')}</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <p className="text-xl w-12 h-12 grid place-content-center rounded-full bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200">
                {job.company ? job.company.charAt(0) : job.title.charAt(0)}
              </p>
              <div>
                <p className="font-medium text-gray-800 dark:text-white">{job.company || job.title}</p>
                <div className="flex items-center gap-1 mb-1">
                  <span className="text-yellow-400 text-2xl">★★★★★</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">5.0 (44)</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">{t('recruiter.jobDetails.professionalEmployer')}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <CiPhone strokeWidth="1" className="text-blue-500 text-xl" />
              <button
                onClick={() => setShowPhone(!showPhone)}
                className="font-[500] text-blue-600 dark:text-blue-400 hover:underline"
              >
                {showPhone ? "+1-514-969-6919" : t('recruiter.jobDetails.revealPhoneNumber')}
              </button>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-300">Av Trans-Island, Montréal, H3W 386</p>
            </div>
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center gap-3 ">
              <p className="text-gray-500 dark:text-gray-400 flex items-center gap-2 text-xs border border-gray-300 dark:border-gray-600 rounded px-2 py-1 font-medium">
                <FaRegEye /> <span>{t('recruiter.jobDetails.views', { count: 329 })}</span>
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
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded p-4 md:p-8 max-w-xl mx-auto relative">
          <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">{t('recruiter.applicationDetails.title')}</h2>
          <div className="mb-2 text-gray-600 dark:text-gray-300">
            {t('recruiter.applicationDetails.applicant')}: <span className="font-semibold text-gray-800 dark:text-white">{app.name}</span>
          </div>
          <div className="mb-2 text-gray-600 dark:text-gray-300">
            {t('recruiter.applicationDetails.appliedFor')}: <span className="font-semibold text-gray-800 dark:text-white">{app.jobTitle}</span>
          </div>
          <div className="mb-2 text-gray-600 dark:text-gray-300">{t('recruiter.applicationDetails.date')}: {app.date}</div>
          <div className="mb-2 text-gray-600 dark:text-gray-300">
            Email: <span className="font-semibold text-gray-800 dark:text-white">{dummyEmail}</span>
          </div>
          <div className="mb-2 text-gray-600 dark:text-gray-300">
            Phone: <span className="font-semibold text-gray-800 dark:text-white">{dummyPhone}</span>
          </div>
          <div className="mb-4 text-gray-600 dark:text-gray-300">
            Message: <span className="font-normal">{dummyMessage}</span>
          </div>
          <div className="flex flex-wrap gap-2 mt-6">
            <Button variant="default" onClick={() => setShowPdf(true)}>
              {t('recruiter.applicationDetails.viewResume')}
            </Button>

            <Dialog open={showEmailModal} onOpenChange={setShowEmailModal}>
              <DialogTrigger asChild>
                <Button variant="secondary">{t('recruiter.applicationDetails.sendEmail')}</Button>
              </DialogTrigger>
              <DialogContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <DialogHeader>
                  <DialogTitle className="text-gray-800 dark:text-white">{t('recruiter.applicationDetails.sendEmailTo')} {app.name}</DialogTitle>
                </DialogHeader>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    toast({
                      title: t('recruiter.applicationDetails.emailSent'),
                      description: t('recruiter.applicationDetails.emailSentDescription', { email: dummyEmail }),
                      variant: "default",
                    });
                    setShowEmailModal(false);
                    setEmailSubject("");
                    setEmailMessage("");
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">{t('recruiter.applicationDetails.to')}</label>
                    <input
                      type="email"
                      value={dummyEmail}
                      disabled
                      className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                      {t('recruiter.applicationDetails.subject')}
                    </label>
                    <input
                      type="text"
                      value={emailSubject}
                      onChange={(e) => setEmailSubject(e.target.value)}
                      required
                      className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Subject"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                      {t('recruiter.applicationDetails.message')}
                    </label>
                    <textarea
                      value={emailMessage}
                      onChange={(e) => setEmailMessage(e.target.value)}
                      required
                      className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      rows={5}
                      placeholder="Write your message here..."
                    />
                  </div>
                  <DialogFooter>
                    <Button type="submit" variant="default">
                      {t('recruiter.applicationDetails.sendEmail')}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>

            <Button
              variant="ghost"
              onClick={() => setViewingApplicationId(null)}
            >
              {t('recruiter.jobDetails.back')}
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
            <div className="w-full max-w-3xl h-[90vh] bg-white dark:bg-gray-800 rounded shadow-lg overflow-hidden flex flex-col">
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
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
        {/* Sidebar */}
        <aside className="w-56 p-6 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
          <nav className="flex flex-col gap-2">
            {sidebarItems.map((item) => (
              <button
                key={item.key}
                className={`text-left px-4 py-2 rounded font-medium text-sm transition ${
                  activeTab === item.key
                    ? "bg-blue-600 text-white shadow"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400"
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
                  <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
                    {t('recruiter.dashboard.title')}
                  </h1>
                  <Button variant="default" onClick={() => setJobPosting(true)}>
                    {t('recruiter.dashboard.postJob')}
                  </Button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-gray-200 dark:border-gray-700 rounded p-4 text-center">
                    <div className="text-2xl font-bold text-blue-700 dark:text-blue-400">
                      {totalJobs}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">{t('recruiter.dashboard.jobsPosted')}</div>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-gray-200 dark:border-gray-700 rounded p-4 text-center">
                    <div className="text-2xl font-bold text-blue-700 dark:text-blue-400">
                      {totalApplications}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      {t('recruiter.dashboard.totalApplications')}
                    </div>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-gray-200 dark:border-gray-700 rounded p-4 text-center">
                    <div className="text-2xl font-bold text-blue-700 dark:text-blue-400">
                      {openJobs}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">{t('recruiter.dashboard.openJobs')}</div>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-gray-200 dark:border-gray-700 rounded p-4 text-center">
                    <div className="text-2xl font-bold text-blue-700 dark:text-blue-400">
                      {closedJobs}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">{t('recruiter.dashboard.closedJobs')}</div>
                  </div>
                </div>
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">{t('recruiter.dashboard.yourJobs')}</h2>
                  <div className="space-y-4">
                    {jobs.map((job) => (
                      <div
                        key={job.id}
                        className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded p-4 flex flex-col md:flex-row md:items-center md:justify-between"
                      >
                        <div>
                          <div className="font-bold text-lg text-gray-800 dark:text-white">{job.title}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                            {t('recruiter.dashboard.posted')}: {job.date}
                          </div>
                          <div className="inline-block px-2 py-1 text-xs rounded bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-semibold mb-2">
                            {job.status}
                          </div>
                        </div>
                        <div className="flex gap-2 mt-2 md:mt-0">
                          <Button
                            variant="outline"
                            onClick={() => setViewingJobId(job.id)}
                          >
                            {t('recruiter.dashboard.view')}
                          </Button>
                          <Button
                            variant="secondary"
                            onClick={() => setEditingJobId(job.id)}
                          >
                            {t('recruiter.dashboard.edit')}
                          </Button>
                          <Button
                            variant="default"
                            onClick={() => setActiveTab("applicants")}
                          >
                            {t('recruiter.dashboard.viewApplications')}
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
                  <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{t('recruiter.jobs.title')}</h1>
                  <Button variant="default" onClick={() => setJobPosting(true)}>
                    {t('recruiter.jobs.postJob')}
                  </Button>
                </div>
                <div className="space-y-4">
                  {jobs.map((job) => (
                    <div
                      key={job.id}
                      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded p-4 flex flex-col md:flex-row md:items-center md:justify-between"
                    >
                      <div>
                        <div className="font-bold text-lg text-gray-800 dark:text-white">{job.title}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                          {t('recruiter.dashboard.posted')}: {job.date}
                        </div>
                        <div className="inline-block px-2 py-1 text-xs rounded bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-semibold mb-2">
                          {job.status}
                        </div>
                      </div>
                      <div className="flex gap-2 mt-2 md:mt-0">
                        <Button
                          variant="outline"
                          onClick={() => setViewingJobId(job.id)}
                        >
                          {t('recruiter.dashboard.view')}
                        </Button>
                        {job.status === "Open" && (
                          <Button
                            variant="secondary"
                            onClick={() => setEditingJobId(job.id)}
                          >
                            {t('recruiter.dashboard.edit')}
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
                <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">{t('recruiter.applicants.title')}</h1>
                <div className="space-y-4">
                  {allApplications.map((app) => (
                    <div
                      key={app.id}
                      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded p-4 flex flex-col md:flex-row md:items-center md:justify-between"
                    >
                      <div>
                        <div className="font-medium text-gray-800 dark:text-white">{app.name}</div>
                        <div className="text-xs text-gray-400 dark:text-gray-500">
                          {t('recruiter.applicants.applied')}: {app.date}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {t('recruiter.applicants.for')}: {app.jobTitle}
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => setViewingApplicationId(app.id)}
                      >
                        {t('recruiter.applicants.viewDetails')}
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
                <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">{t('recruiter.profile.title')}</h1>
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded p-6 max-w-xl mx-auto">
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
                          className="block font-medium mb-1 text-gray-700 dark:text-gray-300"
                        >
                          {t('recruiter.profile.firstName')}
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          defaultValue="John"
                          className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          placeholder="First Name"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="lastName"
                          className="block font-medium mb-1 text-gray-700 dark:text-gray-300"
                        >
                          {t('recruiter.profile.lastName')}
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          defaultValue="Doe"
                          className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          placeholder="Last Name"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="email"
                          className="block font-medium mb-1 text-gray-700 dark:text-gray-300"
                        >
                          {t('recruiter.profile.email')}
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          defaultValue="recruiter@email.com"
                          className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          placeholder="Email"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="phone"
                          className="block font-medium mb-1 text-gray-700 dark:text-gray-300"
                        >
                          {t('recruiter.profile.phone')}
                        </label>
                        <input
                          type="text"
                          id="phone"
                          name="phone"
                          defaultValue="+1-555-987-6543"
                          className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          placeholder="Phone"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-bold py-2 px-6 rounded w-full mt-4"
                    >
                      {t('recruiter.profile.saveProfile')}
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
