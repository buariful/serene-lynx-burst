import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const posts = [
  {
    title: "How to Find the Perfect Rental Near Hospitals",
    date: "2024-06-01",
    excerpt:
      "Tips for healthcare professionals and students to find the best rentals near major hospitals in Canada.",
  },
  {
    title: "Why Tenant Insurance Matters",
    date: "2024-05-20",
    excerpt:
      "Learn why tenant insurance is important for renters and how to choose the right plan.",
  },
  {
    title: "Landlord Verification: Building Trust",
    date: "2024-05-10",
    excerpt:
      "How verifying your identity as a landlord can help attract more tenants and reduce scams.",
  },
];

const BlogPage = () => (
  <div>
    <Header />
    <div className="bg-gray-50 min-h-screen py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded shadow p-6">
        <h1 className="text-2xl font-bold mb-4 text-blue-700">Blog</h1>
        <p className="mb-6 text-gray-700 text-sm">
          Insights, tips, and news for renters, landlords, and the medical
          community.
        </p>
        <div className="grid gap-6">
          {posts.map((post, idx) => (
            <div key={idx} className="border-b pb-4">
              <h2 className="font-semibold text-lg text-blue-700 mb-1">
                {post.title}
              </h2>
              <p className="text-xs text-gray-400 mb-1">{post.date}</p>
              <p className="text-gray-700 text-sm mb-2">{post.excerpt}</p>
              <a href="#" className="text-blue-700 hover:underline text-sm">
                Read more
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

export default BlogPage;
