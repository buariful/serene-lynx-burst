import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, Eye, Calendar, Plus, Search, Filter, MoreVertical, Edit, Pause, Play, MessageSquare } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const initialAds = [
  {
    id: 1,
    title: "Portable Ultrasound Machine - GE Voluson E10",
    status: "Active",
    image:
      "https://www.sgs.com/-/media/sgscorp/images/temporary/tablet-showing-heart-test-result.cdn.en-BD.1.jpg",
    datePosted: "2024-01-01",
    dateAdded: "2024-05-28",
    price: "$12,000",
    views: 45,
    category: "Imaging Devices",
    location: "Toronto, ON",
    inquiries: 8,
  },
  {
    id: 2,
    title: "Digital X-Ray System - Philips DigitalDiagnost C90",
    status: "Paused",
    image:
      "https://res.cloudinary.com/armis/images/f_auto,q_auto/v1706810885/images/operating-room-with-security-alert-icons-1/operating-room-with-security-alert-icons-1.jpg?_i=AA",
    datePosted: "2024-05-15",
    dateAdded: "2024-05-10",
    price: "$25,000",
    views: 23,
    category: "Imaging Devices",
    location: "Montreal, QC",
    inquiries: 3,
  },
  {
    id: 3,
    title: "Patient Monitor - GE CARESCAPE B650",
    status: "Active",
    image:
      "https://www.sgs.com/-/media/sgscorp/images/temporary/tablet-showing-heart-test-result.cdn.en-BD.1.jpg",
    datePosted: "2024-05-20",
    dateAdded: "2024-05-18",
    price: "$8,500",
    views: 67,
    category: "Monitoring Equipment",
    location: "Vancouver, BC",
    inquiries: 12,
  },
  {
    id: 4,
    title: "Surgical Table - Maquet Alphamaquet 1150",
    status: "Active",
    image:
      "https://res.cloudinary.com/armis/images/f_auto,q_auto/v1706810885/images/operating-room-with-security-alert-icons-1/operating-room-with-security-alert-icons-1.jpg?_i=AA",
    datePosted: "2024-06-01",
    dateAdded: "2024-06-01",
    price: "$15,000",
    views: 34,
    category: "Medical Furniture",
    location: "Calgary, AB",
    inquiries: 6,
  },
];

const MyAdsPage = () => {
  const [ads, setAds] = useState(initialAds);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleDelete = (id: number) => {
    setAds((prev) => prev.filter((ad) => ad.id !== id));
  };

  const handleStatusChange = (id: number, newStatus: string) => {
    setAds((prev) => prev.map((ad) => 
      ad.id === id ? { ...ad, status: newStatus } : ad
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 border-green-200 dark:border-green-800';
      case 'paused':
        return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800';
      case 'inactive':
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-600';
      case 'pending':
        return 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-80';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-600';
    }
  };

  const filteredAds = ads.filter(ad => {
    const matchesSearch = ad.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ad.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ad.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || ad.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesCategory = categoryFilter === "all" || ad.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const categories = Array.from(new Set(ads.map(ad => ad.category)));

  const stats = {
    total: ads.length,
    active: ads.filter(ad => ad.status === 'Active').length,
    paused: ads.filter(ad => ad.status === 'Paused').length,
    totalViews: ads.reduce((sum, ad) => sum + ad.views, 0),
    totalInquiries: ads.reduce((sum, ad) => sum + ad.inquiries, 0),
  };

  const isFiltered = !!searchTerm || statusFilter !== "all" || categoryFilter !== "all";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
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
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 shadow-sm"
              onClick={() => navigate('/hospital/post-ad')}
            >
              <Plus className="w-4 h-4 mr-2" />
              Post New Ad
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Ads</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
                </div>
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Active Ads</p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {stats.active}
                  </p>
                </div>
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                  <Play className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Views</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stats.totalViews}
                  </p>
                </div>
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                  <Eye className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Inquiries</p>
                  <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                    {stats.totalInquiries}
                  </p>
                </div>
                <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Inactive Ads</p>
                  <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                    {stats.paused}
                  </p>
                </div>
                <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center">
                  <Pause className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search ads..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Ads List */}
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg text-gray-900 dark:text-white">
              Your Advertisements ({filteredAds.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {/* Desktop Table */}
            <div className="hidden lg:block">
              <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-600 text-sm font-semibold text-gray-700 dark:text-gray-300">
                <div className="col-span-2">Image</div>
                <div className="col-span-3">Title & Details</div>
                <div className="col-span-2">Posted</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-2">Performance</div>
                <div className="col-span-1">Action</div>
              </div>
              
              {filteredAds.map((ad) => (
                <div
                  key={ad.id}
                  className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors"
                >
                  <div className="col-span-2">
                    <img
                      src={ad.image}
                      alt={ad.title}
                      className="w-20 h-16 object-cover rounded-lg border border-gray-200 dark:border-gray-600"
                    />
                  </div>
                  <div className="col-span-3">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-1 line-clamp-2">{ad.title}</h4>
                    <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-1">{ad.price}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{ad.category} • {ad.location}</p>
                  </div>
                  <div className="col-span-2 text-sm text-gray-600 dark:text-gray-400">
                    {new Date(ad.datePosted).toLocaleDateString()}
                  </div>
                  <div className="col-span-2">
                    <Badge className={`${getStatusColor(ad.status)} border`}>
                      {ad.status}
                    </Badge>
                  </div>
                  <div className="col-span-2 text-sm text-gray-600 dark:text-gray-400">
                    <div>{ad.views} views</div>
                    <div>{ad.inquiries} inquiries</div>
                  </div>
                  <div className="col-span-1">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => navigate(`/hospital/device-details/${ad.id}`, { state: { hideBuy: true } })}>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate(`/hospital/post-ad-details`, { state: { editAd: ad } })}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleStatusChange(ad.id, ad.status === 'Active' ? 'Paused' : 'Active')}
                        >
                          {ad.status === 'Active' ? (
                            <>
                              <Pause className="mr-2 h-4 w-4" />
                              Pause
                            </>
                          ) : (
                            <>
                              <Play className="mr-2 h-4 w-4" />
                              Activate
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDelete(ad.id)}
                          className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden space-y-4 p-4">
              {filteredAds.map((ad) => (
                <Card 
                  key={ad.id}
                  className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-md transition-shadow"
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
                          <h4 className="font-medium text-gray-900 dark:text-white text-sm leading-tight line-clamp-2">
                            {ad.title}
                          </h4>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => navigate(`/hospital/device-details/${ad.id}`, { state: { hideBuy: true } })}>
                                <Eye className="mr-2 h-4 w-4" />
                                View
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => navigate(`/hospital/post-ad-details`, { state: { editAd: ad } })}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleStatusChange(ad.id, ad.status === 'Active' ? 'Paused' : 'Active')}
                              >
                                {ad.status === 'Active' ? (
                                  <>
                                    <Pause className="mr-2 h-4 w-4" />
                                    Pause
                                  </>
                                ) : (
                                  <>
                                    <Play className="mr-2 h-4 w-4" />
                                    Activate
                                  </>
                                )}
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleDelete(ad.id)}
                                className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-2">{ad.price}</p>
                        <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 mb-2">
                          <span>{ad.category} • {ad.location}</span>
                          <span>Posted: {new Date(ad.datePosted).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <Badge className={`${getStatusColor(ad.status)} border`}>
                            {ad.status}
                          </Badge>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {ad.views} views • {ad.inquiries} inquiries
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Empty State */}
            {filteredAds.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  {isFiltered
                    ? 'No ads match your filters'
                    : 'No advertisements yet'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {isFiltered
                    ? 'Try adjusting your search or filters'
                    : 'Start by posting your first medical device advertisement'}
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
