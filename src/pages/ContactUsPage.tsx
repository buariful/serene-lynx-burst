import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ContactUsPage = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Here you would handle sending the form data to your backend or email service
  };

  return (
    <div>
      <Header />
      <div className="bg-gray-50 min-h-screen py-6 px-2">
        <div className="max-w-md mx-auto bg-white rounded shadow p-3">
          <h1 className="text-xl font-bold mb-3 text-blue-700">Contact Us</h1>
          <p className="mb-4 text-gray-600 text-sm">
            Have a question or need support? Fill out the form below and our
            team will get back to you as soon as possible.
          </p>
          {submitted ? (
            <div className="text-green-600 font-semibold text-center py-4 text-sm">
              Thank you for contacting us! We'll be in touch soon.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label
                  className="block text-gray-700 mb-0.5 text-xs"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full px-2 py-1 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>
              <div>
                <label
                  className="block text-gray-700 mb-0.5 text-xs"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full px-2 py-1 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>
              <div>
                <label
                  className="block text-gray-700 mb-0.5 text-xs"
                  htmlFor="message"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-2 py-1 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-700 text-white px-4 py-1.5 rounded text-sm hover:bg-blue-800 transition"
              >
                Send Message
              </button>
            </form>
          )}
          <div className="mt-6 border-t pt-3 text-gray-700 text-xs">
            <h2 className="text-base font-semibold mb-1">
              Contact Information
            </h2>
            <p>
              Email:{" "}
              <a
                href="mailto:support@yourdomain.com"
                className="text-blue-700 hover:underline"
              >
                support@yourdomain.com
              </a>
            </p>
            <p>
              Phone:{" "}
              <a
                href="tel:+1234567890"
                className="text-blue-700 hover:underline"
              >
                +1 (234) 567-890
              </a>
            </p>
            <p>Address: 123 Main Street, Toronto, ON, Canada</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUsPage;
