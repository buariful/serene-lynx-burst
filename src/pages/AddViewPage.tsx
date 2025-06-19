import { BriefcaseBusiness, Heart, Save, Share } from "lucide-react";
import { useState } from "react";
import { GoBriefcase } from "react-icons/go";
import { CiPhone } from "react-icons/ci";
import { FaRegEye } from "react-icons/fa";
import DashboardHeader from "@/components/DashboardHeader";
import Footer from "@/components/Footer";

export default function JobListingPage() {
  const [showPhone, setShowPhone] = useState(false);
  const [message, setMessage] = useState("");
  const [resume, setResume] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log({ message, resume });
  };

  return (
    <>
      <DashboardHeader />
      <div className="max-w-6xl mx-auto p-4 font-sans">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Column */}
          <div className="md:w-2/3">
            {/* Job Header */}
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-[#3e4153]">
                ECOLOGISTIQUE INC.
              </h1>

              <div className="flex justify-between items-center mt-2">
                <span className="text-gray-500">Posted 9 min ago</span>
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
                <p>Full-Time</p>
              </div>
            </div>

            <hr className="my-4" />

            {/* Description */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Description</h2>
              <p className="whitespace-pre-line">
                Bonjour, Je suis à la recherche de chauffeurs classe 3 pour la
                rive sud de montreal de jour. Dois avoir l'expérience et parler
                français très important. Appeler moi au 5149696919 merci
              </p>
            </div>

            <hr className="my-4" />

            {/* Listed By Section */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Listed By</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <p className="text-xl w-12 h-12 grid place-content-center rounded-full bg-green-200">
                    M
                  </p>
                  <div>
                    <p className="font-medium">Eco-Logistique Inc.</p>

                    <div className="flex items-center gap-1 mb-1">
                      <span className="text-yellow-400 text-2xl">★★★★★</span>
                      <span className="text-xs text-gray-500">5.0 (44)</span>
                    </div>

                    <p className="text-sm text-gray-600">
                      Professional Employer
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <CiPhone strokeWidth="1" className="text-blue-500 text-xl" />

                  <button
                    onClick={() => setShowPhone(!showPhone)}
                    className="font-[500]  text-blue-600 hover:underline"
                  >
                    {showPhone ? "+1-514-969-6919" : "Reveal phone number"}
                  </button>
                </div>

                {/* <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                View all listings (2)
              </label> */}

                <div>
                  <p>Av Trans-Island, Montréal, H3W 386</p>
                </div>

                <div className="pt-4 border-t flex items-center gap-3 ">
                  <p className="text-gray-500 flex items-center gap-2 text-xs border rounded px-2 py-1 font-medium">
                    <FaRegEye /> <span>329 views</span>
                  </p>
                  {/* <button className="text-blue-600 hover:underline">
                  Report Listing
                </button> */}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="md:w-1/3 border-l pl-6">
            <div className="sticky top-4">
              {/* Company Info */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold">Eco-Logistique Inc.</h3>
                <p className="text-gray-600">On Kijiji since January 2016</p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold">Professional Employer</h3>
                <p>Av Trans-Island, Montreal, H3W 3B6</p>
                <div className="mt-2">
                  {showPhone ? (
                    <p>+1-514-969-6919</p>
                  ) : (
                    <button
                      onClick={() => setShowPhone(true)}
                      className="text-blue-600 hover:underline"
                    >
                      Reveal
                    </button>
                  )}
                </div>
              </div>

              {/* Contact Form */}
              <form onSubmit={handleSubmit} className="border-t pt-3">
                <div className="mb-2">
                  <label className="block text-xs font-medium mb-1">
                    Message
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-1 border rounded h-24 text-xs"
                    placeholder="Write your message here..."
                  />
                </div>

                <div className="mb-2">
                  <label className="block text-xs font-medium mb-1">
                    Attach resume (5 MB max)
                  </label>
                  <input
                    type="file"
                    onChange={(e) => setResume(e.target.files?.[0] || null)}
                    className="block w-full text-xs text-gray-500
                    file:mr-2 file:py-1 file:px-2
                    file:rounded file:border-0
                    file:text-xs file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
                  />
                </div>

                <p className="text-[10px] text-gray-500 mb-2">
                  To date and identify potential fraud, spam or suspicious
                  behaviour, we reserve the right to monitor conversations. By
                  sending the message you agree to our Terms of Use and Privacy
                  Policy.
                </p>

                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1.5 px-4 rounded w-full text-xs"
                >
                  Send message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
