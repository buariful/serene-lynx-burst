import React, { useState } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import Footer from "@/components/Footer";

const doctors = [
  { id: 1, name: "Dr. Alice Smith", specialty: "Cardiologist" },
  { id: 2, name: "Dr. Bob Lee", specialty: "Neurologist" },
];

const nurses = [
  { id: 1, name: "Nurse Carol White", specialty: "ICU" },
  { id: 2, name: "Nurse David Kim", specialty: "Pediatrics" },
];

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
        message: "Interested in this position.",
      },
      {
        id: 2,
        name: "Dr. Bob Lee",
        date: "2024-06-03",
        message: "Please consider my application.",
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
        message: "I have ICU experience.",
      },
    ],
  },
];

const incomingMessages = [
  {
    id: 1,
    from: "Dr. Alice Smith",
    date: "2024-06-04",
    content: "Is the Cardiology Consultant position still open?",
  },
  {
    id: 2,
    from: "Nurse David Kim",
    date: "2024-06-05",
    content: "Can you tell me more about the ICU Nurse role?",
  },
];

// Dummy message history for each sender
const messageHistories: Record<
  string,
  {
    from: string;
    date: string;
    content: string;
    sender: "recruiter" | "candidate";
  }[]
> = {
  "Dr. Alice Smith": [
    {
      from: "Dr. Alice Smith",
      date: "2024-06-03",
      content: "Hello, I am interested in the Cardiology Consultant position.",
      sender: "candidate",
    },
    {
      from: "Recruiter",
      date: "2024-06-03",
      content: "Thank you for your interest, Dr. Smith! Please send your CV.",
      sender: "recruiter",
    },
    {
      from: "Dr. Alice Smith",
      date: "2024-06-04",
      content: "Is the Cardiology Consultant position still open?",
      sender: "candidate",
    },
  ],
  "Nurse David Kim": [
    {
      from: "Nurse David Kim",
      date: "2024-06-05",
      content: "Can you tell me more about the ICU Nurse role?",
      sender: "candidate",
    },
  ],
};

const sidebarItems = [
  { key: "dashboard", label: "Dashboard" },
  { key: "jobs", label: "Jobs" },
  { key: "messages", label: "Messages" },
  { key: "profile", label: "Profile" },
];

const RecruiterDashboardPage = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [messageTarget, setMessageTarget] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [messagesSent, setMessagesSent] = useState(0);
  const [expandedJob, setExpandedJob] = useState<number | null>(null);
  const [appMessageTarget, setAppMessageTarget] = useState<{
    name: string;
    type: "message" | "email";
  } | null>(null);
  const [appMessage, setAppMessage] = useState("");
  const [openMessage, setOpenMessage] = useState<{
    id: number;
    from: string;
    date: string;
    content: string;
  } | null>(null);
  const [reply, setReply] = useState("");

  const handleSendMessage = (name: string) => {
    setMessagesSent((prev) => prev + 1);
    setMessageTarget(null);
    setMessage("");
    alert(`Message sent to ${name}`);
  };

  const handleSendAppMessage = (name: string, type: "message" | "email") => {
    setAppMessageTarget(null);
    setAppMessage("");
    alert(`${type === "email" ? "Email" : "Message"} sent to ${name}`);
  };

  const handleSendReply = () => {
    setReply("");
    setOpenMessage(null);
    alert("Reply sent!");
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
          {activeTab === "dashboard" && (
            <>
              <h1 className="text-2xl font-bold mb-6">Recruiter Dashboard</h1>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-blue-50 border rounded p-4 text-center">
                  <div className="text-2xl font-bold text-blue-700">
                    {jobs.length}
                  </div>
                  <div className="text-xs text-gray-600">Jobs Posted</div>
                </div>
                <div className="bg-green-50 border rounded p-4 text-center">
                  <div className="text-2xl font-bold text-green-700">
                    {messagesSent}
                  </div>
                  <div className="text-xs text-gray-600">Messages Sent</div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                <div>
                  <h2 className="text-lg font-semibold mb-3">Doctors</h2>
                  <ul className="space-y-3">
                    {doctors.map((doc) => (
                      <li
                        key={doc.id}
                        className="flex items-center bg-white border rounded p-3 gap-3"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-gray-800">
                            {doc.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {doc.specialty}
                          </div>
                        </div>
                        <button
                          className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 rounded"
                          onClick={() => setMessageTarget(doc.name)}
                        >
                          Message
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h2 className="text-lg font-semibold mb-3">Nurses</h2>
                  <ul className="space-y-3">
                    {nurses.map((nurse) => (
                      <li
                        key={nurse.id}
                        className="flex items-center bg-white border rounded p-3 gap-3"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-gray-800">
                            {nurse.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {nurse.specialty}
                          </div>
                        </div>
                        <button
                          className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 rounded"
                          onClick={() => setMessageTarget(nurse.name)}
                        >
                          Message
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          )}

          {activeTab === "jobs" && (
            <>
              <h2 className="text-xl font-bold mb-4">Jobs Posted</h2>
              <div className="bg-white border rounded mb-6">
                <div className="flex px-4 py-2 bg-gray-100 text-xs font-semibold text-gray-700 rounded-t">
                  <div className="flex-1">Title</div>
                  <div className="w-24">Status</div>
                  <div className="w-32">Date</div>
                  <div className="w-24">Applications</div>
                </div>
                <ul>
                  {jobs.map((job) => (
                    <li
                      key={job.id}
                      className="flex items-center px-4 py-2 border-t text-sm"
                    >
                      <div className="flex-1 truncate">{job.title}</div>
                      <div className="w-24">
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            job.status === "Open"
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-200 text-gray-500"
                          }`}
                        >
                          {job.status}
                        </span>
                      </div>
                      <div className="w-32 text-xs text-gray-500">
                        {job.date}
                      </div>
                      <div className="w-24">
                        <button
                          className="text-xs text-blue-600 hover:underline"
                          onClick={() =>
                            setExpandedJob(
                              expandedJob === job.id ? null : job.id
                            )
                          }
                        >
                          {expandedJob === job.id ? "Hide" : "View"} (
                          {job.applications.length})
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Applications for selected job */}
              {expandedJob && (
                <div className="bg-white border rounded p-4 mb-6">
                  <h3 className="font-semibold mb-2 text-blue-700 text-base">
                    Applications for:{" "}
                    {jobs.find((j) => j.id === expandedJob)?.title}
                  </h3>
                  <ul className="space-y-2">
                    {jobs
                      .find((j) => j.id === expandedJob)
                      ?.applications.map((app) => (
                        <li
                          key={app.id}
                          className="border rounded p-2 flex flex-col md:flex-row md:items-center gap-2"
                        >
                          <div className="flex-1">
                            <div className="font-medium text-gray-800">
                              {app.name}
                            </div>
                            <div className="text-xs text-gray-500 mb-1">
                              {app.date}
                            </div>
                            <div className="text-xs text-gray-700 mb-1">
                              {app.message}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              className="text-xs text-blue-600 border border-blue-100 rounded px-3 py-1 hover:bg-blue-50"
                              onClick={() =>
                                setAppMessageTarget({
                                  name: app.name,
                                  type: "message",
                                })
                              }
                            >
                              Message
                            </button>
                            <button
                              className="text-xs text-green-600 border border-green-100 rounded px-3 py-1 hover:bg-green-50"
                              onClick={() =>
                                setAppMessageTarget({
                                  name: app.name,
                                  type: "email",
                                })
                              }
                            >
                              Email
                            </button>
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>
              )}
              {/* Modal for application message/email */}
              {appMessageTarget && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                  <div className="bg-white rounded shadow-lg p-6 w-full max-w-sm">
                    <h3 className="font-bold mb-2">
                      {appMessageTarget.type === "email" ? "Email" : "Message"}{" "}
                      to {appMessageTarget.name}
                    </h3>
                    <textarea
                      className="w-full border rounded p-2 mb-3 text-xs"
                      rows={4}
                      value={appMessage}
                      onChange={(e) => setAppMessage(e.target.value)}
                      placeholder={`Write your ${appMessageTarget.type}...`}
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        className="text-xs px-3 py-1 rounded border border-gray-200 hover:bg-gray-100"
                        onClick={() => setAppMessageTarget(null)}
                      >
                        Cancel
                      </button>
                      <button
                        className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 rounded"
                        onClick={() =>
                          handleSendAppMessage(
                            appMessageTarget.name,
                            appMessageTarget.type
                          )
                        }
                        disabled={!appMessage.trim()}
                      >
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {activeTab === "messages" && (
            <>
              <h2 className="text-xl font-bold mb-4">Incoming Messages</h2>
              <div className="bg-white border rounded">
                <ul>
                  {incomingMessages.map((msg) => (
                    <li
                      key={msg.id}
                      className="border-b px-4 py-3 cursor-pointer hover:bg-blue-50"
                      onClick={() => setOpenMessage(msg)}
                    >
                      <div className="font-medium text-gray-800">
                        {msg.from}
                      </div>
                      <div className="text-xs text-gray-500 mb-1">
                        {msg.date}
                      </div>
                      <div className="text-sm text-gray-700">{msg.content}</div>
                    </li>
                  ))}
                  {incomingMessages.length === 0 && (
                    <li className="text-center text-gray-400 text-sm py-8">
                      No messages found.
                    </li>
                  )}
                </ul>
              </div>
              {/* Modal for viewing and replying to a message */}
              {openMessage && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                  <div className="bg-white rounded shadow-lg p-6 w-full max-w-md flex flex-col max-h-[80vh]">
                    <h3 className="font-bold mb-2">
                      Conversation with {openMessage.from}
                    </h3>
                    <div className="flex-1 overflow-y-auto mb-3 space-y-3 pr-1">
                      {(
                        messageHistories[openMessage.from] || [openMessage]
                      ).map((msg, idx) => (
                        <div
                          key={idx}
                          className={`flex flex-col ${
                            msg.sender === "recruiter"
                              ? "items-end"
                              : "items-start"
                          }`}
                        >
                          <div
                            className={`rounded px-3 py-2 text-sm max-w-[80%] ${
                              msg.sender === "recruiter"
                                ? "bg-blue-100 text-blue-900"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {msg.content}
                          </div>
                          <div className="text-[10px] text-gray-400 mt-1">
                            {msg.date}
                          </div>
                        </div>
                      ))}
                    </div>
                    <textarea
                      className="w-full border rounded p-2 mb-3 text-xs"
                      rows={3}
                      value={reply}
                      onChange={(e) => setReply(e.target.value)}
                      placeholder="Write your reply..."
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        className="text-xs px-3 py-1 rounded border border-gray-200 hover:bg-gray-100"
                        onClick={() => setOpenMessage(null)}
                      >
                        Close
                      </button>
                      <button
                        className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 rounded"
                        onClick={handleSendReply}
                        disabled={!reply.trim()}
                      >
                        Send Reply
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {activeTab === "profile" && (
            <>
              <h2 className="text-xl font-bold mb-4">Recruiter Profile</h2>
              <div className="bg-white border rounded p-6 max-w-md">
                <div className="font-medium text-gray-800 mb-2">
                  Jane Recruiter
                </div>
                <div className="text-xs text-gray-500 mb-1">
                  jane.recruiter@example.com
                </div>
                <div className="text-xs text-gray-500 mb-4">
                  +1 555-987-6543
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2 px-6 rounded">
                  Edit Profile
                </button>
              </div>
            </>
          )}

          {/* Message Modal (for dashboard tab) */}
          {messageTarget && (
            <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
              <div className="bg-white rounded shadow-lg p-6 w-full max-w-sm">
                <h3 className="font-bold mb-2">Message to {messageTarget}</h3>
                <textarea
                  className="w-full border rounded p-2 mb-3 text-xs"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your message..."
                />
                <div className="flex justify-end gap-2">
                  <button
                    className="text-xs px-3 py-1 rounded border border-gray-200 hover:bg-gray-100"
                    onClick={() => setMessageTarget(null)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 rounded"
                    onClick={() => handleSendMessage(messageTarget)}
                    disabled={!message.trim()}
                  >
                    Send
                  </button>
                </div>
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
