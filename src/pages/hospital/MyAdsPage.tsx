import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, Eye, Calendar, Plus } from "lucide-react";

const initialAds = [
  {
    id: 1,
    title: "Portable Ultrasound Machine",
    status: "Active",
    image:
      "https://www.sgs.com/-/media/sgscorp/images/temporary/tablet-showing-heart-test-result.cdn.en-BD.1.jpg",
    datePosted: "2024-06-01",
    dateAdded: "2024-05-28",
    price: "$12,000",
    views: 45,
  },
  {
    id: 2,
    title: "Digital X-Ray System",
    status: "Inactive",
    image:
      "https://res.cloudinary.com/armis/images/f_auto,q_auto/v1706810885/images/operating-room-with-security-alert-icons-1/operating-room-with-security-alert-icons-1.jpg?_i=AA",
    datePosted: "2024-05-15",
    dateAdded: "2024-05-10",
    price: "$25,000",
    views: 23,
  },
  {
    id: 3,
    title: "Patient Monitor",
    status: "Active",
    image:
      "https://www.sgs.com/-/media/sgscorp/images/temporary/tablet-showing-heart-test-result.cdn.en-BD.1.jpg",
    datePosted: "2024-05-20",
    dateAdded: "2024-05-18",
    price: "$8,500",
    views: 67,
  },
];

const MyAdsPage = () => {
  const [ads, setAds] = useState(initialAds);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleDelete = (id: number) => {
    setAds((prev) => prev.filter((ad) => ad.id !== id));
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300';
      case 'inactive':
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
      case 'pending':
        return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                {t('myAds.title')}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Manage your medical device advertisements
              </p>
            </div>
            <Button 
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
              onClick={() => navigate('/hospital/post-ad')}
            >
              <Plus className="w-4 h-4 mr-2" />
              Post New Ad
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Ads</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{ads.length}</p>
                </div>
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Active Ads</p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {ads.filter(ad => ad.status === 'Active').length}
                  </p>
                </div>
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                  <Eye className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Views</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {ads.reduce((sum, ad) => sum + ad.views, 0)}
                  </p>
                </div>
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                  <Eye className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Inactive Ads</p>
                  <p className="text-2xl font-bold text-gray-600 dark:text-gray-400">
                    {ads.filter(ad => ad.status === 'Inactive').length}
                  </p>
                </div>
                <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Ads List */}
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg text-gray-900 dark:text-white">
              Your Advertisements
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {/* Desktop Table */}
            <div className="hidden lg:block">
              <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-600 text-sm font-semibold text-gray-700 dark:text-gray-300">
                <div className="col-span-2">{t('myAds.image')}</div>
                <div className="col-span-3">{t('myAds.title')}</div>
                <div className="col-span-2">{t('myAds.datePosted')}</div>
                <div className="col-span-2">{t('myAds.status')}</div>
                <div className="col-span-2">Views</div>
                <div className="col-span-1">{t('myAds.action')}</div>
              </div>
              
              {ads.map((ad) => (
                <div
                  key={ad.id}
                  className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors"
                  onClick={() => navigate(`/hospital/device-details/${ad.id}`, { state: { hideBuy: true } })}
                >
                  <div className="col-span-2">
                    <img
                      src={ad.image}
                      alt={ad.title}
                      className="w-20 h-16 object-cover rounded-lg border border-gray-200 dark:border-gray-600"
                    />
                  </div>
                  <div className="col-span-3">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-1">{ad.title}</h4>
                    <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">{ad.price}</p>
                  </div>
                  <div className="col-span-2 text-sm text-gray-600 dark:text-gray-400">
                    {ad.datePosted}
                  </div>
                  <div className="col-span-2">
                    <Badge className={getStatusColor(ad.status)}>
                      {ad.status}
                    </Badge>
                  </div>
                  <div className="col-span-2 text-sm text-gray-600 dark:text-gray-400">
                    {ad.views} views
                  </div>
                  <div className="col-span-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(ad.id);
                      }}
                      className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden space-y-4 p-4">
              {ads.map((ad) => (
                <Card 
                  key={ad.id}
                  className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => navigate(`/hospital/device-details/${ad.id}`, { state: { hideBuy: true } })}
                >
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <img
                        src={ad.image}
                        alt={ad.title}
                        className="w-20 h-16 object-cover rounded-lg border border-gray-200 dark:border-gray-600 flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-gray-900 dark:text-white text-sm leading-tight">
                            {ad.title}
                          </h4>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(ad.id);
                            }}
                            className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 p-1 h-auto"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-2">{ad.price}</p>
                        <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
                          <span>Posted: {ad.datePosted}</span>
                          <span>{ad.views} views</span>
                        </div>
                        <div className="mt-2">
                          <Badge className={getStatusColor(ad.status)}>
                            {ad.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Empty State */}
            {ads.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No advertisements yet
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Start by posting your first medical device advertisement
                </p>
                <Button 
                  className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                  onClick={() => navigate('/hospital/post-ad')}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Post Your First Ad
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MyAdsPage;
