import React, { useRef, useState } from "react";
import * as Select from "@radix-ui/react-select";
import { FaAngleDown, FaTimes } from "react-icons/fa";
import { showSuccess } from "../../utils/toast";
import { useTranslation } from 'react-i18next';
import RecruiterDashboardWrapper from '@/components/RecruiterDashboardWrapper';

interface RecruiterPostJobProps {
  setJobPosting: (val: boolean) => void;
  jobToEdit?: {
    title: string;
    company: string;
    type: string;
    description: string;
    image?: (File | string)[];
  };
  mode?: "post" | "edit";
}

const RecruiterPostJob: React.FC<RecruiterPostJobProps> = ({
  setJobPosting,
  jobToEdit,
  mode = "post",
}) => {
  const [job, setJob] = useState({
    title: jobToEdit?.title || "",
    company: jobToEdit?.company || "",
    type: jobToEdit?.type || "",
    description: jobToEdit?.description || "",
    image: jobToEdit?.image || [],
  } as {
    title: string;
    company: string;
    type: string;
    description: string;
    image: (File | string)[];
  });

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { t } = useTranslation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSelect = (value: string) => {
    setJob({ ...job, type: value });
  };

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setJob((prev) => ({ ...prev, image: filesArray }));
    }
  };

  const handleRemoveImage = (index: number) => {
    setJob((prev) => ({
      ...prev,
      image: prev.image.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting job:", job);
    if (mode === "edit") {
      showSuccess(t('recruiter.postJob.jobUpdatedSuccessfully'));
    } else {
      showSuccess(t('recruiter.postJob.jobPostedSuccessfully'));
    }
    setTimeout(() => {
      setJobPosting(false);
    }, 2000);
    // Handle API call or saving logic here
  };

  return (
    <RecruiterDashboardWrapper>
      <div className=" mx-auto p-6 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm bg-white dark:bg-gray-800">
        <button
          type="button"
          onClick={() => setJobPosting(false)}
          className="mb-4 flex items-center text-blue-600 dark:text-blue-400 hover:underline focus:outline-none"
        >
          <span className="mr-2">←</span> {t('common.back')}
        </button>
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
          {mode === "edit" ? t('recruiter.postJob.editJob') : t('recruiter.postJobPage.title')}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block font-medium mb-1 text-gray-700 dark:text-gray-300">
              {t('recruiter.postJob.jobTitle')}
            </label>
            <input
              type="text"
              name="title"
              value={job.title}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="e.g. Frontend Developer"
            />
          </div>

          {/* Company */}
          <div>
            <label htmlFor="company" className="block font-medium mb-1 text-gray-700 dark:text-gray-300">
              {t('recruiter.postJob.companyName')}
            </label>
            <input
              type="text"
              name="company"
              value={job.company}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="e.g. Acme Corp"
            />
          </div>

          {/* Job Type */}
          <div>
            <label className="block font-medium mb-1 text-gray-700 dark:text-gray-300">{t('recruiter.postJob.jobType')}</label>
            <Select.Root value={job.type} onValueChange={handleSelect}>
              <Select.Trigger className="w-full inline-flex items-center justify-between rounded-md border border-gray-300 dark:border-gray-600 p-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400">
                <Select.Value placeholder={t('recruiter.postJob.selectJobType')} />
                <Select.Icon>
                  <FaAngleDown />
                </Select.Icon>
              </Select.Trigger>
              <Select.Portal>
                <Select.Content className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg">
                  <Select.Viewport className="p-2">
                    {["Contract", "Part-time", "Full-time"].map((type) => (
                      <Select.Item
                        key={type}
                        value={type.toLowerCase()}
                        className="px-4 py-2 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900 focus:bg-blue-100 dark:focus:bg-blue-900 cursor-pointer text-gray-700 dark:text-gray-300"
                      >
                        <Select.ItemText>{type}</Select.ItemText>
                      </Select.Item>
                    ))}
                  </Select.Viewport>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          </div>

          {/* Image Upload */}
          <div>
            <label htmlFor="image" className="block font-medium mb-1 text-gray-700 dark:text-gray-300">
              {t('recruiter.postJob.uploadImages')}
            </label>
            <input
              ref={fileInputRef}
              id="image"
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              type="button"
              onClick={handleFileButtonClick}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {t('recruiter.postJob.chooseImages')}
            </button>

            {/* Preview */}
            {Array.isArray(job.image) && job.image.length > 0 && (
              <div className="mt-3 grid grid-cols-3 gap-3">
                {job.image.map((file, index) => {
                  let previewUrl = "";
                  if (typeof file === "string") {
                    previewUrl = file;
                  } else {
                    previewUrl = URL.createObjectURL(file);
                  }
                  return (
                    <div
                      key={index}
                      className="relative w-full aspect-square overflow-hidden rounded-md border border-gray-200 dark:border-gray-600"
                    >
                      <img
                        src={previewUrl}
                        alt={`Preview ${index}`}
                        className="object-cover w-full h-full"
                        onLoad={() => {
                          if (typeof file !== "string")
                            URL.revokeObjectURL(previewUrl);
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-1 right-1 bg-blue-600 text-white rounded-full p-1 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 z-10"
                        aria-label="Remove image"
                      >
                        <FaTimes size={14} />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          {/* Description */}
          <div>
            <label htmlFor="description" className="block font-medium mb-1 text-gray-700 dark:text-gray-300">
              {t('recruiter.postJob.jobDescription')}
            </label>
            <textarea
              name="description"
              rows={5}
              value={job.description}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Describe the role, requirements, and perks..."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            {mode === "edit" ? t('recruiter.postJob.saveChanges') : t('recruiter.postJob.postJob')}
          </button>
        </form>
      </div>
    </RecruiterDashboardWrapper>
  );
};

export default RecruiterPostJob;
