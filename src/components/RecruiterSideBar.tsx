import React from "react";
const sidebarItems = [
  { key: "dashboard", label: "Dashboard" },
  { key: "jobs", label: "Jobs" },
  { key: "messages", label: "Messages" },
  { key: "profile", label: "Profile" },
];
export default function RecruiterSideBar() {
  return (
    <aside className="w-56 p-6 bg-white border-r flex flex-col">
      <nav className="flex flex-col gap-2">
        {/* {sidebarItems.map((item) => (
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
            ))} */}
      </nav>
    </aside>
  );
}
