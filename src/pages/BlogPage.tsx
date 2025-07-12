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
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <div className="min-h-screen py-10 px-4">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
          <h1 className="text-3xl font-bold mb-4 text-blue-700 dark:text-blue-400">
            {t('blogPage.title')}
          </h1>
          <p className="mb-8 text-gray-700 dark:text-gray-300 text-base leading-relaxed">
            {t('blogPage.description')}
          </p>
          
          <div className="space-y-8">
            {posts.map((post, idx) => (
              <article key={idx} className="border-b border-gray-200 dark:border-gray-700 pb-8 last:border-b-0">
                <div className="mb-3">
                  <h2 className="font-bold text-xl text-blue-700 dark:text-blue-400 mb-2 hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
                    {t(post.titleKey)}
                  </h2>
                  <time className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                    <span>{t('blogPage.publishedOn')}</span>
                    <span>{formatDate(post.date)}</span>
                  </time>
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-4">
                  {t(post.excerptKey)}
                </p>
                
                <a 
                  href="#" 
                  className="inline-flex items-center text-blue-700 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium transition-colors hover:underline"
                >
                  {t('blogPage.readMore')}
                  <svg 
                    className="ml-1 w-4 h-4" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9 5l7 7-7 7" 
                    />
                  </svg>
                </a>
              </article>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogPage;
