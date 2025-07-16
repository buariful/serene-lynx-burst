import React, { useState } from "react";
import LandlordDashboardWrapper from "@/components/LandlordDashboardWrapper";
import { Heart, Trash2, Eye, MapPin, DollarSign, Bed, Bath, Square, TrendingUp, TrendingDown, Star, Calendar, Users } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FavoriteProperty {
  id: string;
  title: string;
  address: string;
  city: string;
  province: string;
  rent: number;
  bedrooms: number;
  bathrooms: number;
  squareFootage: number;
  propertyType: string;
  addedDate: string;
  imageUrl: string;
  marketTrend: 'up' | 'down' | 'stable';
  priceChange: number;
  views: number;
  daysOnMarket: number;
  rating: number;
  amenities: string[];
  description: string;
}

const FavouritesPage: React.FC = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [sortBy, setSortBy] = useState("added");

  // Mock data for favorite properties
  const favorites: FavoriteProperty[] = [
    {
      id: "1",
      title: "Modern Downtown Condo",
      address: "123 Queen St",
      city: "Toronto",
      province: "ON",
      rent: 2800,
      bedrooms: 1,
      bathrooms: 1,
      squareFootage: 750,
      propertyType: "Condo",
      addedDate: "2024-01-15T10:30:00Z",
      imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
      marketTrend: "up",
      priceChange: 5.2,
      views: 1247,
      daysOnMarket: 8,
      rating: 4.8,
      amenities: ["Gym", "Pool", "Parking", "Balcony"],
      description: "Luxurious condo in the heart of downtown with stunning city views and premium amenities."
    },
    {
      id: "2",
      title: "Cozy Family Home",
      address: "456 Oak Ave",
      city: "Vancouver",
      province: "BC",
      rent: 3200,
      bedrooms: 3,
      bathrooms: 2,
      squareFootage: 1400,
      propertyType: "House",
      addedDate: "2024-01-14T16:20:00Z",
      imageUrl: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
      marketTrend: "stable",
      priceChange: 0,
      views: 892,
      daysOnMarket: 15,
      rating: 4.6,
      amenities: ["Garden", "Garage", "Fireplace", "Basement"],
      description: "Beautiful family home with a large backyard and modern kitchen in a quiet neighborhood."
    },
    {
      id: "3",
      title: "Student-Friendly Studio",
      address: "789 Pine St",
      city: "Montreal",
      province: "QC",
      rent: 1200,
      bedrooms: 0,
      bathrooms: 1,
      squareFootage: 450,
      propertyType: "Studio",
      addedDate: "2024-01-13T09:15:00Z",
      imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
      marketTrend: "down",
      priceChange: -2.1,
      views: 567,
      daysOnMarket: 22,
      rating: 4.2,
      amenities: ["Furnished", "Utilities Included", "Laundry"],
      description: "Perfect studio apartment for students, fully furnished with all utilities included."
    },
    {
      id: "4",
      title: "Luxury Penthouse",
      address: "321 Elm St",
      city: "Calgary",
      province: "AB",
      rent: 4500,
      bedrooms: 2,
      bathrooms: 2,
      squareFootage: 1200,
      propertyType: "Penthouse",
      addedDate: "2024-01-12T14:45:00Z",
      imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
      marketTrend: "up",
      priceChange: 8.5,
      views: 2034,
      daysOnMarket: 5,
      rating: 4.9,
      amenities: ["Rooftop Terrace", "Concierge", "Gym", "Pool", "Parking"],
      description: "Exclusive penthouse with panoramic city views and luxury amenities including rooftop terrace."
    },
    {
      id: "5",
      title: "Medical District Apartment",
      address: "654 Maple Dr",
      city: "Edmonton",
      province: "AB",
      rent: 1800,
      bedrooms: 1,
      bathrooms: 1,
      squareFootage: 650,
      propertyType: "Apartment",
      addedDate: "2024-01-11T11:30:00Z",
      imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
      marketTrend: "up",
      priceChange: 3.7,
      views: 756,
      daysOnMarket: 12,
      rating: 4.5,
      amenities: ["Near Hospital", "Public Transit", "Grocery Store"],
      description: "Convenient apartment located near the medical district, perfect for healthcare professionals."
    }
  ];

  const getTrendIcon = (trend: FavoriteProperty['marketTrend']) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      case 'stable':
        return <div className="w-4 h-4 text-gray-500">—</div>;
      default:
        return null;
    }
  };

  const getTrendColor = (trend: FavoriteProperty['marketTrend']) => {
    switch (trend) {
      case 'up':
        return 'text-green-600 dark:text-green-400';
      case 'down':
        return 'text-red-600 dark:text-red-400';
      case 'stable':
        return 'text-gray-600 dark:text-gray-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date.toLocaleDateString();
  };

  // Filter and sort favorites
  const filteredFavorites = favorites
    .filter(favorite => {
      const matchesSearch = favorite.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           favorite.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           favorite.city.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'all' || favorite.propertyType.toLowerCase() === filterType;
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'added':
          return new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime();
        case 'rent':
          return b.rent - a.rent;
        case 'views':
          return b.views - a.views;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

  const totalValue = favorites.reduce((sum, fav) => sum + fav.rent, 0);
  const averageRating = favorites.reduce((sum, fav) => sum + fav.rating, 0) / favorites.length;

  return (
    <LandlordDashboardWrapper>
      <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <Heart className="w-6 h-6 text-red-600 dark:text-red-400" />
              Favourites
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Your saved properties and market insights
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Market Report
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Share List
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Favourites</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{favorites.length}</p>
                </div>
                <Heart className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Value</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    ${totalValue.toLocaleString()}
                  </p>
                </div>
                <DollarSign className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg. Rating</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {averageRating.toFixed(1)}
                  </p>
                </div>
                <Star className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg. Views</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {Math.round(favorites.reduce((sum, fav) => sum + fav.views, 0) / favorites.length).toLocaleString()}
                  </p>
                </div>
                <Eye className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="md:col-span-2">
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search favourites..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="condo">Condo</SelectItem>
              <SelectItem value="house">House</SelectItem>
              <SelectItem value="apartment">Apartment</SelectItem>
              <SelectItem value="studio">Studio</SelectItem>
              <SelectItem value="penthouse">Penthouse</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="added">Recently Added</SelectItem>
              <SelectItem value="rent">Rent (High to Low)</SelectItem>
              <SelectItem value="views">Most Viewed</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Favourites Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFavorites.length === 0 ? (
            <div className="col-span-full">
              <Card className="text-center py-12">
                <CardContent>
                  <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    No favourites found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {searchTerm || filterType !== 'all' 
                      ? 'Try adjusting your search or filters'
                      : 'You haven\'t added any properties to your favourites yet.'}
                  </p>
                  <Button className="flex items-center gap-2 mx-auto">
                    <MapPin className="w-4 h-4" />
                    Browse Properties
                  </Button>
                </CardContent>
              </Card>
            </div>
          ) : (
            filteredFavorites.map((favorite) => (
              <Card key={favorite.id} className="group hover:shadow-lg transition-all duration-200">
                <div className="relative">
                  <img
                    src={favorite.imageUrl}
                    alt={favorite.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-3 right-3 flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0 bg-white/90 hover:bg-white text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <Badge variant="secondary" className="bg-white/90 text-gray-900">
                      {favorite.propertyType}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <div className="mb-3">
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-1 line-clamp-1">
                      {favorite.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {favorite.address}, {favorite.city}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      <span className="font-bold text-lg text-gray-900 dark:text-gray-100">
                        ${favorite.rent.toLocaleString()}
                      </span>
                      <span className="text-sm text-gray-500">/month</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{favorite.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                    <div className="flex items-center gap-1">
                      <Bed className="w-4 h-4" />
                      <span>{favorite.bedrooms}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Bath className="w-4 h-4" />
                      <span>{favorite.bathrooms}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Square className="w-4 h-4" />
                      <span>{favorite.squareFootage} sq ft</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-3">
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      <span>{favorite.views.toLocaleString()} views</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{favorite.daysOnMarket} days</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {getTrendIcon(favorite.marketTrend)}
                      <span className={`text-xs font-medium ${getTrendColor(favorite.marketTrend)}`}>
                        {favorite.priceChange > 0 ? '+' : ''}{favorite.priceChange}%
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">
                      Added {formatTimestamp(favorite.addedDate)}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mt-3">
                    {favorite.amenities.slice(0, 3).map((amenity, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                    {favorite.amenities.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{favorite.amenities.length - 3} more
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </LandlordDashboardWrapper>
  );
};

export default FavouritesPage;
