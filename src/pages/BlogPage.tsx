import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useTranslation } from 'react-i18next';

const posts = [
  {
    titleKey: "blogPage.posts.howToFind.title",
    date: "2024-06-01",
    excerptKey: "blogPage.posts.howToFind.excerpt",
  },
  {
    titleKey: "blogPage.posts.tenantInsurance.title",
    date: "2024-05-20",
    excerptKey: "blogPage.posts.tenantInsurance.excerpt",
  },
  {
    titleKey: "blogPage.posts.landlordVerification.title",
    date: "2024-05-10",
    excerptKey: "blogPage.posts.landlordVerification.excerpt",
  },
];

const BlogPage = () => {
  const { t } = useTranslation();
  
  return (
    <div>
      <Header />
      <div className="bg-gray-50 min-h-screen py-10 px-4">
        <div className="max-w-3xl mx-auto bg-white rounded shadow p-6">
          <h1 className="text-2xl font-bold mb-4 text-blue-700">{t('blogPage.title')}</h1>
          <p className="mb-6 text-gray-700 text-sm">
            {t('blogPage.description')}
          </p>
          <div className="grid gap-6">
            {posts.map((post, idx) => (
              <div key={idx} className="border-b pb-4">
                <h2 className="font-semibold text-lg text-blue-700 mb-1">
                  {t(post.titleKey)}
                </h2>
                <p className="text-xs text-gray-400 mb-1">{post.date}</p>
                <p className="text-gray-700 text-sm mb-2">{t(post.excerptKey)}</p>
                <a href="#" className="text-blue-700 hover:underline text-sm">
                  {t('blogPage.readMore')}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogPage;
