import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { Search, Heart, Eye, Calendar, Clock, Trash2, Filter } from 'lucide-react';

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
      category: "Ultrasound"
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
      category: "MRI"
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
      category: "X-Ray"
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
      category: "CT Scanner"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();
  const { t } = useTranslation();

  const filteredFavourites = favourites.filter(fav => {
    const matchesSearch = fav.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         fav.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         fav.location?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filter === 'all' || fav.status.toLowerCase() === filter.toLowerCase();
    
    return matchesSearch && matchesFilter;
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
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'sold':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {t('myFavourites.title')}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {filteredFavourites.length} {t('myFavourites.favourites')}
            </p>
          </div>
          
          {/* Stats */}
          <div className="hidden sm:flex space-x-4">
            <div className="text-center">
              <div className="text-lg font-semibold text-red-600 dark:text-red-400">
                {favourites.filter(f => f.status === 'Active').length}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{t('myFavourites.active')}</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-600 dark:text-gray-400">
                {favourites.filter(f => f.status === 'Sold').length}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{t('myFavourites.sold')}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder={t('myFavourites.searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-2">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">{t('myFavourites.allStatus')}</option>
              <option value="active">{t('myFavourites.active')}</option>
              <option value="sold">{t('myFavourites.sold')}</option>
              <option value="pending">{t('myFavourites.pending')}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        {filteredFavourites.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 dark:text-gray-500 mb-4">
              <Heart className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {t('myFavourites.noFavouritesFound')}
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {searchTerm ? t('myFavourites.noSearchResults') : t('myFavourites.emptyFavourites')}
            </p>
          </div>
        ) : (
          <>
            {/* Mobile Cards View */}
            <div className="lg:hidden space-y-4">
              {filteredFavourites.map((fav) => (
                <div
                  key={fav.id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="flex">
                    <img
                      src={fav.image}
                      alt={fav.title}
                      className="w-24 h-24 object-cover flex-shrink-0"
                    />
                    <div className="flex-1 p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-medium text-gray-900 dark:text-white text-sm line-clamp-2">
                          {fav.title}
                        </h3>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemove(fav.id);
                          }}
                          className="text-red-500 hover:text-red-700 dark:hover:text-red-400 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-2">
                        <span className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {formatDate(fav.datePosted)}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {formatDate(fav.dateAdded)}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(fav.status)}`}>
                          {fav.status}
                        </span>
                        <button
                          onClick={() => navigate(`/hospital/device-details/${fav.id}`)}
                          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-xs font-medium"
                        >
                          {t('myFavourites.view')}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden lg:block">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-600 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  <div className="col-span-2">{t('myFavourites.image')}</div>
                  <div className="col-span-3">{t('myFavourites.title')}</div>
                  <div className="col-span-2">{t('myFavourites.datePosted')}</div>
                  <div className="col-span-2">{t('myFavourites.dateAdded')}</div>
                  <div className="col-span-2">{t('myFavourites.status')}</div>
                  <div className="col-span-1">{t('myFavourites.action')}</div>
                </div>
                
                {/* Table Body */}
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredFavourites.map((fav) => (
                    <div
                      key={fav.id}
                      className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer"
                      onClick={() => navigate(`/hospital/device-details/${fav.id}`)}
                    >
                      <div className="col-span-2">
                        <img
                          src={fav.image}
                          alt={fav.title}
                          className="w-20 h-16 object-cover rounded border border-gray-200 dark:border-gray-600"
                        />
                      </div>
                      <div className="col-span-3">
                        <h4 className="font-medium text-gray-900 dark:text-white text-sm mb-1 line-clamp-2">
                          {fav.title}
                        </h4>
                        {fav.category && (
                          <p className="text-xs text-gray-500 dark:text-gray-400">{fav.category}</p>
                        )}
                      </div>
                      <div className="col-span-2 text-sm text-gray-600 dark:text-gray-400">
                        {formatDate(fav.datePosted)}
                      </div>
                      <div className="col-span-2 text-sm text-gray-600 dark:text-gray-400">
                        {formatDate(fav.dateAdded)}
                      </div>
                      <div className="col-span-2">
                        <span className={`text-xs px-3 py-1 rounded-full ${getStatusColor(fav.status)}`}>
                          {fav.status}
                        </span>
                      </div>
                      <div className="col-span-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemove(fav.id);
                          }}
                          className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyFavouritesPage;
