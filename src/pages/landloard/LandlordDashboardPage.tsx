import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Building2,
  Bell,
  Pencil,
  AlertCircle,
  Heart,
  User2,
  Search,
  ChevronDown,
  Plus,
  X,
  Home,
  MapPin,
  DollarSign,
  Bed,
  Bath,
  Square,
} from "lucide-react";
import LandlordDashboardWrapper from "@/components/LandlordDashboardWrapper";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { showSuccess, showError } from "@/utils/toast";

const sidebarItems = [
  { label: "Listings", icon: Building2, path: "/landlord/dashboard" },
  { label: "Notifications", icon: Bell, path: "/landlord/notifications" },
  { label: "Drafts", icon: Pencil, path: "/landlord/drafts" },
  { label: "Alerts", icon: AlertCircle, path: "/landlord/alerts" },
  { label: "Favourites", icon: Heart, path: "/landlord/favourites" },
  { label: "Account", icon: User2, path: "/landlord/account" },
];

const dummyListings = [
  {
    id: 1,
    address: "123 Main St, Toronto",
    price: "$2,200/mo · 2 Bed · 2 Bath",
    priceValue: 2200,
    status: "Active",
    statusColor: "text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 2,
    address: "456 King St, Vancouver",
    price: "$1,800/mo · 1 Bed · 1 Bath",
    priceValue: 1800,
    status: "Pending",
    statusColor: "text-yellow-700 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQX8C0PluoP1nO_bq6S5p5T3ffe_aKvmODJxAIRtiabxZiAW6XqltaBgkB-JPmgMSzh3jI&usqp=CAU",
  },
  {
    id: 3,
    address: "789 Queen St, Montreal",
    price: "$2,500/mo · 3 Bed · 2 Bath",
    priceValue: 2500,
    status: "Disabled",
    statusColor: "text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQX8C0PluoP1nO_bq6S5p5T3ffe_aKvmODJxAIRtiabxZiAW6XqltaBgkB-JPmgMSzh3jI&usqp=CAU",
  },
];

export default function LandlordDashboardPage() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("price-asc");
  const [isPostRentalModalOpen, setIsPostRentalModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state for post rental
  const [rentalForm, setRentalForm] = useState({
    title: "",
    address: "",
    city: "",
    province: "",
    postalCode: "",
    rent: "",
    bedrooms: "",
    bathrooms: "",
    squareFootage: "",
    description: "",
    propertyType: "",
    availableDate: "",
  });

  const tabs = [
    t('landlord.dashboard.tabs.all'),
    t('landlord.dashboard.tabs.active'),
    t('landlord.dashboard.tabs.pending'),
    t('landlord.dashboard.tabs.disabled')
  ];

  const sortOptions = [
    { value: "price-asc", label: t('landlord.dashboard.sortOptions.priceAsc') },
    { value: "price-desc", label: t('landlord.dashboard.sortOptions.priceDesc') },
    { value: "address-asc", label: t('landlord.dashboard.sortOptions.addressAsc') },
    { value: "address-desc", label: t('landlord.dashboard.sortOptions.addressDesc') },
  ];

  let filteredListings = dummyListings;
  if (activeTab !== t('landlord.dashboard.tabs.all')) {
    filteredListings = filteredListings.filter((l) => l.status === activeTab);
  }
  if (searchTerm.trim() !== "") {
    filteredListings = filteredListings.filter((l) =>
      l.address.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  if (sortBy === "price-asc") {
    filteredListings = [...filteredListings].sort(
      (a, b) => a.priceValue - b.priceValue
    );
  } else if (sortBy === "price-desc") {
    filteredListings = [...filteredListings].sort(
      (a, b) => b.priceValue - a.priceValue
    );
  } else if (sortBy === "address-asc") {
    filteredListings = [...filteredListings].sort((a, b) =>
      a.address.localeCompare(b.address)
    );
  } else if (sortBy === "address-desc") {
    filteredListings = [...filteredListings].sort((a, b) =>
      b.address.localeCompare(a.address)
    );
  }

  const handleInputChange = (field: string, value: string) => {
    setRentalForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmitRental = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      showSuccess('Rental posted successfully!');
      setIsPostRentalModalOpen(false);
      setRentalForm({
        title: "",
        address: "",
        city: "",
        province: "",
        postalCode: "",
        rent: "",
        bedrooms: "",
        bathrooms: "",
        squareFootage: "",
        description: "",
        propertyType: "",
        availableDate: "",
      });
    } catch (error) {
      showError('Failed to post rental. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <LandlordDashboardWrapper>
      <div className="flex min-h-screen">
        {/* Main Content */}
        <main className="flex-1 p-4 md:p-4">
          {/* Title and Tabs */}
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <h1 className="text-xl md:text-2xl font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">
              <Building2 className="w-5 h-5 md:w-6 md:h-6" />
              {t('landlord.dashboard.title')}
            </h1>
            <div className="flex gap-4 p-6 border-b border-gray-200 dark:border-gray-700 flex-1 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  className={`pb-1.5 text-sm md:text-base font-medium transition border-b-2 whitespace-nowrap ${
                    activeTab === tab
                      ? "border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400"
                      : "border-transparent text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Search and Sort */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder={t('landlord.dashboard.searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 md:pl-10 pr-3 py-2.5 md:py-3 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-sm md:text-base"
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 md:px-5 py-2.5 md:py-3 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium text-sm md:text-base border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Dummy Listing Items */}
          <div className="mt-6 md:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredListings.map((listing) => (
              <div
                key={listing.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-4 flex flex-col"
              >
                <img
                  src={listing.image}
                  alt={listing.address}
                  className="w-full h-32 md:h-40 object-cover rounded mb-3"
                />
                <div className="font-semibold text-base md:text-lg text-blue-600 dark:text-blue-400 mb-1">
                  {listing.address}
                </div>
                <div className="text-sm md:text-base text-gray-500 dark:text-gray-400 mb-1">{listing.price}</div>
                <div
                  className={`text-xs md:text-sm font-medium rounded px-2 py-1 w-max mb-2 ${listing.statusColor}`}
                >
                  {listing.status}
                </div>
                <Link
                  to={`/landlord/property/${listing.id}`}
                  className="mt-auto text-blue-600 dark:text-blue-400 hover:underline text-sm md:text-base font-medium"
                >
                  {t('landlord.dashboard.viewDetails')}
                </Link>
              </div>
            ))}
          </div>

          {/* Post a Rental */}
          <div className="mt-6 bg-white dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex flex-col items-center justify-center py-6 md:py-8">
          
            <Button
              onClick={() => setIsPostRentalModalOpen(true)}
              className="mt-3 flex items-center gap-1.5 px-4 md:px-6 py-2.5 md:py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-full font-semibold text-sm md:text-base shadow hover:bg-blue-700 dark:hover:bg-blue-600 transition"
            >
              <Plus className="w-4 h-4" />
              {t('landlord.dashboard.postRental')}
            </Button>
          </div>
        </main>
      </div>

      {/* Post Rental Modal */}
      {isPostRentalModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <Home className="w-5 h-5" />
                Post a New Rental
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsPostRentalModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <form onSubmit={handleSubmitRental} className="p-6 space-y-6">
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="title">Rental Title *</Label>
                    <Input
                      id="title"
                      value={rentalForm.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      placeholder="e.g., Cozy 2-Bedroom Apartment in Downtown"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="propertyType">Property Type *</Label>
                      <Select value={rentalForm.propertyType} onValueChange={(value) => handleInputChange('propertyType', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select property type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="apartment">Apartment</SelectItem>
                          <SelectItem value="house">House</SelectItem>
                          <SelectItem value="condo">Condo</SelectItem>
                          <SelectItem value="townhouse">Townhouse</SelectItem>
                          <SelectItem value="basement">Basement</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="rent">Monthly Rent *</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                        <Input
                          id="rent"
                          type="number"
                          value={rentalForm.rent}
                          onChange={(e) => handleInputChange('rent', e.target.value)}
                          placeholder="2000"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Location */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Location
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="address">Street Address *</Label>
                    <Input
                      id="address"
                      value={rentalForm.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="123 Main Street"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        value={rentalForm.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        placeholder="Toronto"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="province">Province *</Label>
                      <Select value={rentalForm.province} onValueChange={(value) => handleInputChange('province', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select province" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ON">Ontario</SelectItem>
                          <SelectItem value="BC">British Columbia</SelectItem>
                          <SelectItem value="AB">Alberta</SelectItem>
                          <SelectItem value="QC">Quebec</SelectItem>
                          <SelectItem value="NS">Nova Scotia</SelectItem>
                          <SelectItem value="NB">New Brunswick</SelectItem>
                          <SelectItem value="MB">Manitoba</SelectItem>
                          <SelectItem value="SK">Saskatchewan</SelectItem>
                          <SelectItem value="PE">Prince Edward Island</SelectItem>
                          <SelectItem value="NL">Newfoundland and Labrador</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="postalCode">Postal Code *</Label>
                      <Input
                        id="postalCode"
                        value={rentalForm.postalCode}
                        onChange={(e) => handleInputChange('postalCode', e.target.value)}
                        placeholder="M5V 2H1"
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Property Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Property Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="bedrooms">Bedrooms *</Label>
                      <div className="relative">
                        <Bed className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                        <Input
                          id="bedrooms"
                          type="number"
                          value={rentalForm.bedrooms}
                          onChange={(e) => handleInputChange('bedrooms', e.target.value)}
                          placeholder="2"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="bathrooms">Bathrooms *</Label>
                      <div className="relative">
                        <Bath className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                        <Input
                          id="bathrooms"
                          type="number"
                          value={rentalForm.bathrooms}
                          onChange={(e) => handleInputChange('bathrooms', e.target.value)}
                          placeholder="1"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="squareFootage">Square Footage</Label>
                      <div className="relative">
                        <Square className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                        <Input
                          id="squareFootage"
                          type="number"
                          value={rentalForm.squareFootage}
                          onChange={(e) => handleInputChange('squareFootage', e.target.value)}
                          placeholder="800"
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="availableDate">Available Date *</Label>
                    <Input
                      id="availableDate"
                      type="date"
                      value={rentalForm.availableDate}
                      onChange={(e) => handleInputChange('availableDate', e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={rentalForm.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder="Describe your rental property, amenities, and any special features..."
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsPostRentalModalOpen(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  {isSubmitting ? 'Posting...' : 'Post Rental'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </LandlordDashboardWrapper>
  );
}
