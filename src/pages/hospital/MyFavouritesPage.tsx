import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { Search, Heart, Eye, Calendar, Clock, Trash2, MapPin, DollarSign, Tag, Grid3X3, Star, User, Shield, Award, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Favourite {
  id: number;
  title: string;
  status: string;
  image: string;
  datePosted: string;
  dateAdded: string;
  price?: string;
  location?: string;
  category?: string;
  description?: string;
  seller?: string;
  condition?: string;
  rating?: number;
  reviews?: number;
  warranty?: string;
  year?: string;
}

const MyFavouritesPage: React.FC = () => {
  const [favourites, setFavourites] = useState<Favourite[]>([
    {
      id: 1,
      title: "Advanced Ultrasound Machine - GE Voluson E10",
      status: "Active",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
      datePosted: "2024-06-02",
      dateAdded: "2024-05-29",
      price: "$45,000",
      location: "Toronto, ON",
      category: "Ultrasound",
      description: "High-resolution imaging system with advanced diagnostic capabilities, seller: Medical Equipment Plus, condition: Excellent",
      rating: 4.8,
      reviews: 24,
      warranty: "2 years",
      year: "2022"
    },
    {
      id: 2,
      title: "MRI Scanner - Siemens Magnetom Aera",
      status: "Active",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop",
      datePosted: "2024-05-28",
      dateAdded: "2024-05-25",
      price: "$850,000",
      location: "Montreal, QC",
      category: "MRI",
      description: "1.5 stem with advanced imaging protocols, seller: Siemens Healthcare, condition: Like New",
      rating: 4.9,
      reviews: 31,
      warranty: "3 years",
      year: "2023"
    },
    {
      id: 3,
      title: "X-Ray Machine - Philips DigitalDiagnost C90",
      status: "Sold",
      image: "https://images.unsplash.com/photo-1581595219315-a187dd40c322?w=400&h=300&fit=crop",
      datePosted: "2024-05-15",
      dateAdded: "2024-05-10",
      price: "$125,000",
      location: "Vancouver, BC",
      category: "X-Ray",
      description: "Digital radiography system with wireless detector, seller: Philips Medical, condition: Good",
      rating: 4.6,
      reviews: 18,
      warranty: "1 year",
      year: "2021"
    },
    {
      id: 4,
      title: "CT Scanner - GE Revolution CT",
      status: "Active",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
      datePosted: "2024-06-01",
      dateAdded: "2024-05-28",
      price: "$650,000",
      location: "Calgary, AB",
      category: "CT Scanner",
      description: "Revolutionary CT technology with ultra-low dose imaging, seller: GEHealthcare, condition: Excellent",
      rating: 4.7,
      reviews: 15,
      warranty: "2 years",
      year: "2023"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('dateAdded');
  const navigate = useNavigate();
  const { t } = useTranslation();

  const filteredFavourites = favourites.filter(fav => {
    const matchesSearch = fav.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         fav.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         fav.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         fav.seller?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filter === 'all' || fav.status.toLowerCase() === filter.toLowerCase();
    
    return matchesSearch && matchesFilter;
  });

  const sortedFavourites = [...filteredFavourites].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        const priceA = parseFloat(a.price?.replace(/[$,]/g, '') || '0');
        const priceB = parseFloat(b.price?.replace(/[$,]/g, '') || '0');
        return priceA - priceB;
      case 'datePosted':
        return new Date(b.datePosted).getTime() - new Date(a.datePosted).getTime();
      case 'dateAdded':
        return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      default:
        return 0;
    }
  });

  const handleRemove = (id: number) => {
    setFavourites((prev) => prev.filter((ad) => ad.id !== id));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 border-green-200 dark:border-green-800';
      case 'sold':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600';
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition?.toLowerCase()) {
      case 'excellent':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 border-blue-200 dark:border-blue-800';
      case 'like new':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 border-green-200 dark:border-green-800';
      case 'good':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600';
    }
  };

  const renderStars = (rating: number = 0) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-8 shadow-sm">
        <div className="mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {t('myFavourites.title')}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Your saved medical equipment and devices
              </p>
            </div>
            
            {/* Stats */}
            <div className="flex space-x-8">
              <div className="text-center">
                <div className="text-3xl font-semibold text-green-600 dark:text-green-400">
                  {favourites.filter(f => f.status === 'Active').length}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">{t('myFavourites.active')}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-semibold text-gray-600 dark:text-gray-400">
                  {favourites.filter(f => f.status === 'Sold').length}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">{t('myFavourites.sold')}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-semibold text-blue-600 dark:text-blue-400">
                  {favourites.length}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">Total</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder={t('myFavourites.searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 text-base"
              />
            </div>

            {/* Filters and Controls */}
            <div className="flex gap-3">
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-40 h-12">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('myFavourites.allStatus')}</SelectItem>
                  <SelectItem value="active">{t('myFavourites.active')}</SelectItem>
                  <SelectItem value="sold">{t('myFavourites.sold')}</SelectItem>
                  <SelectItem value="pending">{t('myFavourites.pending')}</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40 h-12">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dateAdded">{t('myFavourites.dateAdded')}</SelectItem>
                  <SelectItem value="datePosted">{t('myFavourites.datePosted')}</SelectItem>
                  <SelectItem value="price">{t('myFavourites.price')}</SelectItem>
                  <SelectItem value="rating">{t('myFavourites.rating')}</SelectItem>
                </SelectContent>
              </Select>
              
              {/* View Toggle */}
              <div className="flex border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    viewMode === 'grid' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
                  }`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    viewMode === 'list' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {sortedFavourites.length === 0 ? (
          <Card className="text-center py-16">
            <CardContent>
              <div className="text-gray-400 dark:text-gray-500 mb-6">
                <Heart className="w-20 h-20 mx-auto" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                {t('myFavourites.noFavouritesFound')}
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                {searchTerm ? t('myFavourites.noSearchResults') : t('myFavourites.emptyFavourites')}
              </p>
              <Button 
                onClick={() => navigate('/hospital/marketplace')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-medium"
                size="lg"
              >
                Browse Marketplace
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Grid View */}
            {viewMode === 'grid' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sortedFavourites.map((fav) => (
                  <Card key={fav.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-0 shadow-lg">
                    <div className="relative">
                      <img
                        src={fav.image}
                        alt={fav.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 right-3 flex space-x-2">
                        <Badge className={`${getStatusColor(fav.status)} font-medium`}>
                          {fav.status}
                        </Badge>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 shadow-sm">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleRemove(fav.id)} className="text-red-600">
                              <Trash2 className="w-4 h-4 mr-2" /> {t('myFavourites.removeFromFavourites')}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      {fav.rating && (
                        <div className="absolute bottom-3 left-3 bg-black/70 text-white px-2 py-1 rounded-lg text-sm">
                          <div className="flex items-center space-x-1">
                            {renderStars(fav.rating)}
                            <span className="ml-1">({fav.reviews})</span>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-bold text-gray-900 dark:text-white text-lg line-clamp-2 mb-2">
                            {fav.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 leading-relaxed">
                            {fav.description}
                          </p>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" /> {fav.location}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" /> {formatDate(fav.datePosted)}
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className={`${getConditionColor(fav.condition)} font-medium`}>
                              {fav.condition}
                            </Badge>
                            <Badge variant="outline" className="text-xs font-medium">
                              <Tag className="w-3 h-3 mr-1" /> {fav.category}
                            </Badge>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-green-600 dark:text-green-400 text-xl">
                              {fav.price}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                          <div className="flex items-center">
                            <User className="w-4 h-4 mr-1" /> {fav.seller}
                          </div>
                          {fav.warranty && (
                            <div className="flex items-center">
                              <Shield className="w-4 h-4 mr-1" /> {fav.warranty}
                            </div>
                          )}
                        </div>
                        
                        <div className="flex space-x-2 pt-2">
                          <Button
                            onClick={() => navigate(`/hospital/device-details/${fav.id}`)}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium"
                          >
                            <Eye className="w-4 h-4 mr-2" /> {t('myFavourites.viewDetails')}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* List View */}
            {viewMode === 'list' && (
              <div className="space-y-6">
                {sortedFavourites.map((fav) => (
                  <Card key={fav.id} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                    <CardContent className="p-0">
                      <div className="flex flex-col lg:flex-row">
                        <div className="relative lg:w-64 h-48 lg:h-auto">
                          <img
                            src={fav.image}
                            alt={fav.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-3 right-3">
                            <Badge className={`${getStatusColor(fav.status)} font-medium`}>
                              {fav.status}
                            </Badge>
                          </div>
                          {fav.rating && (
                            <div className="absolute bottom-3 left-3 bg-black/70 text-white px-2 py-1 rounded-lg text-sm">
                              <div className="flex items-center space-x-1">
                                {renderStars(fav.rating)}
                                <span className="ml-1">({fav.reviews})</span>
                              </div>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-1 p-6">
                          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between h-full">
                            <div className="flex-1 space-y-4">
                              <div>
                                <h3 className="font-bold text-gray-900 dark:text-white text-xl mb-2">
                                  {fav.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                  {fav.description}
                                </p>
                              </div>
                              
                              <div className="flex flex-wrap gap-2">
                                <Badge variant="outline" className={`${getConditionColor(fav.condition)} font-medium`}>
                                  {fav.condition}
                                </Badge>
                                <Badge variant="outline" className="font-medium">
                                  <Tag className="w-3 h-3 mr-1" /> {fav.category}
                                </Badge>
                                <Badge variant="outline" className="font-medium">
                                  <MapPin className="w-3 h-3 mr-1" /> {fav.location}
                                </Badge>
                                {fav.warranty && (
                                  <Badge variant="outline" className="font-medium">
                                    <Shield className="w-3 h-3 mr-1" /> {fav.warranty}
                                  </Badge>
                                )}
                              </div>
                              
                              <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                                <div className="flex items-center">
                                  <Calendar className="w-4 h-4 mr-1" /> {t('myFavourites.posted')}: {formatDate(fav.datePosted)}
                                </div>
                                <div className="flex items-center">
                                  <Clock className="w-4 h-4 mr-1" /> {t('myFavourites.added')}: {formatDate(fav.dateAdded)}
                                </div>
                                <div className="flex items-center">
                                  <User className="w-4 h-4 mr-1" /> {fav.seller}
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex flex-col items-end space-y-4">
                              <div className="text-right">
                                <div className="font-bold text-green-600 dark:text-green-400 text-2xl">
                                  {fav.price}
                                </div>
                                {fav.year && (
                                  <div className="text-sm text-gray-500 dark:text-gray-400">
                                    Year: {fav.year}
                                  </div>
                                )}
                              </div>
                              
                              <div className="flex space-x-2">
                                <Button
                                  onClick={() => navigate(`/hospital/device-details/${fav.id}`)}
                                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium"
                                >
                                  <Eye className="w-4 h-4 mr-2" /> {t('myFavourites.view')}
                                </Button>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="sm" className="h-10 w-10 p-0">
                                      <Trash2 className="w-4 h-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => handleRemove(fav.id)} className="text-red-600">
                                      <Trash2 className="w-4 h-4 mr-2" /> {t('myFavourites.removeFromFavourites')}
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MyFavouritesPage;
