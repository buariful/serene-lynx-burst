import { BriefcaseBusiness, Heart, Save, Share } from "lucide-react";
import { useRef, useState } from "react";
import { GoBriefcase } from "react-icons/go";
import { CiPhone } from "react-icons/ci";
import { FaRegEye } from "react-icons/fa";
import DashboardHeader from "@/components/DashboardHeader";
import Footer from "@/components/Footer";
import { showSuccess } from "@/utils/toast";
import { useTranslation } from 'react-i18next';

export default function JobListingPage() {
  const [showPhone, setShowPhone] = useState(false);
  const [message, setMessage] = useState("");
  const [resume, setResume] = useState<File | null>(null);
  const resumeRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    setMessage("");
    setResume(null);
    if (resumeRef.current.value) {
      resumeRef.current.value = "";
    }
    showSuccess(t('addViewPage.applicationSubmitted'));
  };

  return (
    <>
      <DashboardHeader />
      <div className="max-w-6xl mx-auto p-4 font-sans">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Column */}
          <div className="md:w-2/3">
            {/* Job Header */}
            <img
              src="https://media.istockphoto.com/id/475352876/photo/man-applying-for-a-job-on-the-internet.jpg?s=612x612&w=0&k=20&c=SQeciz8vqdGWu_KJoGC7yK8xmpBl69UewPtZSyWSrOI="
              alt=""
              className="rounded mb-5"
            />
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-[#3e4153]">
                ECOLOGISTIQUE INC.
              </h1>

              <div className="flex justify-between items-center mt-2">
                <span className="text-gray-500">{t('addViewPage.postedAgo', { time: '9 min' })}</span>
              </div>
            </div>

            <hr className="my-4" />

            <div className="flex gap-4">
              <button className="flex items-center gap-1 px-3 py-1 border border-[#3e4153] text-[#3e4153] hover:text-blue-500 hover:border-blue-500 font-semibold rounded-md text-sm">
                <Heart className="w-4" />
                <span>{t('addViewPage.save')}</span>
              </button>
              <button className="flex items-center gap-1 px-3 py-1 border border-[#3e4153] text-[#3e4153] hover:text-blue-500 hover:border-blue-500 font-semibold rounded-md text-sm">
                <Share className="w-4" />
                <span>{t('addViewPage.share')}</span>
              </button>
            </div>

            <hr className="my-4" />

            {/* Job Details */}
            <div className="mb-6 flex items-center gap-2">
              <span>
                <GoBriefcase className="text-3xl" />
              </span>
              <div>
                <h3 className="text-lg font-semibold mb-2">{t('addViewPage.jobType')}</h3>
                <p>Full-Time</p>
              </div>
            </div>

            <hr className="my-4" />

            {/* Description */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">{t('addViewPage.description')}</h2>
              <p className="whitespace-pre-line">
                Bonjour, Je suis à la recherche de chauffeurs classe 3 pour la
                rive sud de montreal de jour. Dois avoir l'expérience et parler
                français très important. Appeler moi au 5149696919 merci
              </p>
            </div>

            <hr className="my-4" />

            {/* Listed By Section */}
            <div>
              <h2 className="text-xl font-semibold mb-4">{t('addViewPage.listedBy')}</h2>
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
                      {t('addViewPage.professionalEmployer')}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <CiPhone strokeWidth="1" className="text-blue-500 text-xl" />

                  <button
                    onClick={() => setShowPhone(!showPhone)}
                    className="font-[500]  text-blue-600 hover:underline"
                  >
                    {showPhone ? "+1-514-969-6919" : t('addViewPage.revealPhoneNumber')}
                  </button>
                </div>

                <div>
                  <p>Av Trans-Island, Montréal, H3W 386</p>
                </div>

                <div className="pt-4 border-t flex items-center gap-3 ">
                  <p className="text-gray-500 flex items-center gap-2 text-xs border rounded px-2 py-1 font-medium">
                    <FaRegEye /> <span>{t('addViewPage.views', { count: 329 })}</span>
                  </p>
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
                <p className="text-gray-600">On Scrubhub since January 2016</p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold">{t('addViewPage.professionalEmployer')}</h3>
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
                    {t('addViewPage.message')}
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-1 border rounded h-24 text-xs"
                    placeholder={t('addViewPage.writeMessage')}
                  />
                </div>

                <div className="mb-2">
                  <label className="block text-xs font-medium mb-1">
                    {t('addViewPage.attachResume')}
                  </label>
                  <input
                    type="file"
                    ref={resumeRef}
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
                  {t('addViewPage.termsNote')}
                </p>

                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1.5 px-4 rounded w-full text-xs"
                >
                  {t('addViewPage.submit')}
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
