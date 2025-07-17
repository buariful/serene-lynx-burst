import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useTranslation } from 'react-i18next';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, Tag } from "lucide-react";

interface BlogPost {
  id: string;
  titleKey: string;
  date: string;
  excerptKey: string;
  contentKey: string;
  author: string;
  readTime: string;
  category: string;
  tags: string[];
  imageUrl?: string;
}

const posts: BlogPost[] = [
  {
    id: "how-to-find-perfect-rental",
    titleKey: "blogPage.posts.howToFind.title",
    date: "2024-06-01",
    excerptKey: "blogPage.posts.howToFind.excerpt",
    contentKey: "blogPage.posts.howToFind.content",
    author: "Sarah Johnson",
    readTime: "5 min read",
    category: "Rental Guide",
    tags: ["rental", "tips", "guide"],
    imageUrl: "/building.png"
  },
  {
    id: "tenant-insurance-guide",
    titleKey: "blogPage.posts.tenantInsurance.title",
    date: "2024-05-20",
    excerptKey: "blogPage.posts.tenantInsurance.excerpt",
    contentKey: "blogPage.posts.tenantInsurance.content",
    author: "Michael Chen",
    readTime: "7 min read",
    category: "Insurance",
    tags: ["insurance", "protection", "tenant"],
    imageUrl: "/building 2.png"
  },
  {
    id: "landlord-verification-process",
    titleKey: "blogPage.posts.landlordVerification.title",
    date: "2024-05-10",
    excerptKey: "blogPage.posts.landlordVerification.excerpt",
    contentKey: "blogPage.posts.landlordVerification.content",
    author: "Emily Rodriguez",
    readTime: "4 min read",
    category: "Verification",
    tags: ["verification", "landlord", "process"],
    imageUrl: "/building 3.png"
  },
  {
    id: "medical-device-rental-trends",
    titleKey: "blogPage.posts.medicalDevices.title",
    date: "2024-04-28",
    excerptKey: "blogPage.posts.medicalDevices.excerpt",
    contentKey: "blogPage.posts.medicalDevices.content",
    author: "Dr. James Wilson",
    readTime: "8 min read",
    category: "Medical",
    tags: ["medical", "devices", "healthcare", "trends"],
    imageUrl: "/building.png"
  },
  {
    id: "property-management-tips",
    titleKey: "blogPage.posts.propertyManagement.title",
    date: "2024-04-15",
    excerptKey: "blogPage.posts.propertyManagement.excerpt",
    contentKey: "blogPage.posts.propertyManagement.content",
    author: "Lisa Thompson",
    readTime: "6 min read",
    category: "Management",
    tags: ["property", "management", "tips"],
    imageUrl: "/building 2.png"
  }
];

const BlogPage = () => {
  const { t } = useTranslation();
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handlePostClick = (post: BlogPost) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <div className="min-h-screen py-10 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-blue-700 dark:text-blue-400">
              {t('blogPage.title')}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {t('blogPage.description')}
            </p>
          </div>
          
          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article 
                key={post.id} 
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 group cursor-pointer"
                onClick={() => handlePostClick(post)}
              >
                {/* Post Image */}
                {post.imageUrl && (
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={post.imageUrl} 
                      alt={t(post.titleKey)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge variant="secondary" className="bg-white/90 dark:bg-gray-800/90">
                        {post.category}
                      </Badge>
                    </div>
                  </div>
                )}
                
                {/* Post Content */}
                <div className="p-6">
                  {/* Meta Information */}
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(post.date)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  
                  {/* Title */}
                  <h2 className="font-bold text-xl text-gray-900 dark:text-white mb-3 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                    {t(post.titleKey)}
                  </h2>
                  
                  {/* Excerpt */}
                  <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed mb-4 line-clamp-3">
                    {t(post.excerptKey)}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        <Tag className="w-3 h-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  {/* Read More Button */}
                  <Button 
                    variant="ghost" 
                    className="w-full text-blue-700 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                  >
                    {t('blogPage.readMore')}
                    <svg 
                      className="ml-2 w-4 h-4" 
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
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* Blog Post Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedPost && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="secondary">
                    {selectedPost.category}
                  </Badge>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(selectedPost.date)}
                  </span>
                </div>
                <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                  {t(selectedPost.titleKey)}
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6">
                {/* Post Image */}
                {selectedPost.imageUrl && (
                  <div className="relative h-64 overflow-hidden rounded-lg">
                    <img 
                      src={selectedPost.imageUrl} 
                      alt={t(selectedPost.titleKey)}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                {/* Author and Meta Info */}
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <User className="w-5 h-5 text-gray-500" />
                      <span className="font-medium">{selectedPost.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-gray-500" />
                      <span>{selectedPost.readTime}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-gray-500" />
                    <span>{formatDate(selectedPost.date)}</span>
                  </div>
                </div>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {selectedPost.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                {/* Content */}
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <div className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
                    {t(selectedPost.contentKey).split('\n').map((paragraph, index) => (
                      <p key={index} className="text-base leading-7">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      // Share functionality
                      if (navigator.share) {
                        navigator.share({
                          title: t(selectedPost.titleKey),
                          text: t(selectedPost.excerptKey),
                          url: window.location.href
                        });
                      } else {
                        navigator.clipboard.writeText(window.location.href);
                      }
                    }}
                  >
                    Share
                  </Button>
                  <Button 
                    variant="default"
                    onClick={handleCloseModal}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default BlogPage;
