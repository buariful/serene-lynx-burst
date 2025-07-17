import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LandlordDashboardWrapper from "@/components/LandlordDashboardWrapper";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Building2, MapPin, DollarSign, Bed, Bath, Square, Calendar, Eye, EyeOff, Trash2, Share2, Download, Printer, Star, Users, Car, Camera, ArrowLeft, Phone, Mail, MessageCircle, Heart, AlertCircle, CheckCircle } from "lucide-react";
import { showSuccess, showError, showLoading, dismissToast } from "@/utils/toast";

interface PropertyDetails {
  id: string;
  title: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  squareFootage: number;
  propertyType: string;
  status: 'active' | 'pending' | 'disabled' | 'rented';
  availableDate: string;
  description: string;
  amenities: string[];
  images: string[];
  views: number;
  applications: number;
  lastUpdated: string;
  rating: number;
  reviews: number;
  parking: boolean;
  furnished: boolean;
  petFriendly: boolean;
  utilities: string[];
}

const PropertyDetailsPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [property, setProperty] = useState<PropertyDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Real property data with high-quality images
  const mockProperty: PropertyDetails = {
    id: id || "1",
    title: "Modern 2-Bedroom Apartment in Downtown Toronto",
    address: "123 Queen Street West",
    city: "Toronto",
    province: "Ontario",
    postalCode: "M5V21",
    price: 2200,
    bedrooms: 2,
    bathrooms: 2,
    squareFootage: 950,
    propertyType: "Apartment",
    status: "active",
    availableDate: "2024-02-01",
    description: "Beautiful modern apartment located in the heart of downtown Toronto. This spacious 2-bedroom unit features hardwood floors, stainless steel appliances, in-suite laundry, and stunning city views. Perfect for young professionals or small families. Walking distance to restaurants, shopping, and public transit.",
    amenities: ["In-suite Laundry", "Balcony", "Gym", "Pool", "Concierge", "King"],
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQX8C0PluoP1nO_bq6S5p5T3ffe_aKvmODJxAIRtiabxZiAW6XqltaBgkB-JPmgMSzh3jI&usqp=CAU",
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvcGVydHl8ZW58MHx8MHx8fDA%3D",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQX8C0PluoP1nO_bq6S5p5T3ffe_aKvmODJxAIRtiabxZiAW6XqltaBgkB-JPmgMSzh3jI&usqp=CAU",
      "https://www.tribecacare.com/wp-content/uploads/2022/07/Edinburgh-Property-management.jpg",
      "https://images.unsplash.com/photo-1605146769289-440113cc3d00?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVhbCUyMGVzdGF0ZXxlbnwwfHwwfHx8MA%3D%3D"
    ],
    views: 1247,
    applications: 8,
    lastUpdated: "2024-01-15",
    rating: 4.8,
    reviews: 23,
    parking: true,
    furnished: false,
    petFriendly: true,
    utilities: ["Heat/Water", "Electricity", "Internet"]
  };

  useEffect(() => {
    // Simulate API call
    const fetchProperty = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setProperty(mockProperty);
      } catch (error) {
        showError("Failed to load property details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const handleToggleVisibility = () => {
    setIsVisible(!isVisible);
    const status = !isVisible ? "published" : "unpublished";
    showSuccess(`Property ${status} successfully`);
  };

  const handleDelete = async () => {
    const loadingToast = showLoading("Deleting property...");
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      showSuccess("Property deleted successfully");
      navigate("/landlord/dashboard");
    } catch (error) {
      showError("Failed to delete property");
    } finally {
      dismissToast(loadingToast);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    showSuccess("Property link copied to clipboard");
  };

  const handleDownload = () => {
    showSuccess("Property details downloaded");
  };

  const handlePrint = () => {
    window.print();
    showSuccess("Print dialog opened");
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    showSuccess(isFavorite ? "Removed from favorites" : "Added to favorites");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "pending": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "disabled": return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
      case "rented": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  if (isLoading) {
    return (
      <LandlordDashboardWrapper>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 border-b-2 border-blue-600"></div>
        </div>
      </LandlordDashboardWrapper>
    );
  }

  if (!property) {
    return (
      <LandlordDashboardWrapper>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-90 dark:text-white">Property not found</h2>
            <p className="text-gray-60 dark:text-gray-400 mt-2">The property you're looking for doesn't exist.</p>
          </div>
        </div>
      </LandlordDashboardWrapper>
    );
  }

  return (
    <LandlordDashboardWrapper>
      <div className="max-w-7xl mx-auto p-4 md:p-4 space-y-4 md:space-y-6">
        {/* Header - Mobile Responsive */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex flex-col space-y-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/landlord/dashboard")}
              className="self-start flex items-center space-x-2 text-sm md:text-base"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Dashboard</span>
            </Button>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-90 dark:text-white leading-tight">{property.title}</h1>
              <p className="text-sm md:text-base text-gray-60 dark:text-gray-400 flex items-center space-x-1 mt-1">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span>{property.address}, {property.city}, {property.province}</span>
              </p>
            </div>
          </div>
          
          <div className="flex items-center justify-between md:justify-end space-x-2">
            <Badge className={`${getStatusColor(property.status)} text-xs md:text-sm`}>
              {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
            </Badge>
            <div className="flex space-x-1">
              <Button
                variant="outline"
                size="sm"
                onClick={handleToggleFavorite}
                className={`h-8 w-8 p-0 ${isFavorite ? "text-red-60 border-red-600" : ""}`}
              >
                <Heart className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
              </Button>
              <Button variant="outline" size="sm" onClick={handleShare} className="h-8 w-8 p-0">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownload} className="h-8 w-8 p-0">
                <Download className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={handlePrint} className="h-8 w-8 p-0">
                <Printer className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6"> {/* Main Content */}
          <div className="lg:col-span-2 space-y-4 md:space-y-6">         {/* Image Gallery - Mobile Responsive */}
            <Card>
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src={property.images[activeImageIndex]}
                    alt={property.title}
                    className="w-full h-48 md:h-80 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-2 md:top-4 right-2 md:right-4 flex space-x-1">
                    <Button size="sm" variant="secondary" className="h-8 w-8 bg-white/90 hover:bg-white">
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex space-x-2 p-3 md:p-4 overflow-x-auto">
                  {property.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImageIndex(index)}
                      className={`flex-shrink-0 w-16 h-12 md:h-15 rounded-lg overflow-hidden border-2 ${
                        activeImageIndex === index ? "border-blue-500" : "border-gray-200"
                      }`}
                    >
                      <img src={image} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Property Details - Mobile Responsive */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-lg md:text-xl">
                  <Building2 className="h-5 w-5" />
                  <span>Property Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                  <div className="text-center p-3 md:p-4 bg-gray-50 dark:bg-gray-800">
                    <DollarSign className="h-5 w-5 md:h-6 md:w-6 text-green-600 mx-auto mb-2" />
                    <div className="text-lg md:text-2xl font-bold text-gray-90 dark:text-white">${property.price}</div>
                    <div className="text-xs md:text-sm text-gray-60 dark:text-gray-400">Monthly Rent</div>
                  </div>
                  <div className="text-center p-3 md:p-4 bg-gray-50 dark:bg-gray-800">
                    <Bed className="h-5 w-5 md:h-6 md:w-6 text-blue-600 mx-auto mb-2" />
                    <div className="text-lg md:text-2xl font-bold text-gray-90 dark:text-white">{property.bedrooms}</div>
                    <div className="text-xs md:text-sm text-gray-60 dark:text-gray-400">Bedrooms</div>
                  </div>
                  <div className="text-center p-3 md:p-4 bg-gray-50 dark:bg-gray-800">
                    <Bath className="h-5 w-5 md:h-6 md:w-6 text-purple-600 mx-auto mb-2" />
                    <div className="text-lg md:text-2xl font-bold text-gray-90 dark:text-white">{property.bathrooms}</div>
                    <div className="text-xs md:text-sm text-gray-60 dark:text-gray-400">Bathrooms</div>
                  </div>
                  <div className="text-center p-3 md:p-4 bg-gray-50 dark:bg-gray-800">
                    <Square className="h-5 w-5 md:h-6 md:w-6 text-orange-600 mx-auto mb-2" />
                    <div className="text-lg md:text-2xl font-bold text-gray-90 dark:text-white">{property.squareFootage}</div>
                    <div className="text-xs md:text-sm text-gray-60 dark:text-gray-400">Square Footage</div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold text-gray-90 dark:text-white mb-2 md:mb-3 text-base md:text-lg">Description</h3>
                  <p className="text-sm md:text-base text-gray-60 dark:text-gray-400 leading-relaxed">{property.description}</p>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold text-gray-90 dark:text-white mb-2 md:mb-3 text-base md:text-lg">Amenities</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
                    {property.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm md:text-base text-gray-60 dark:text-gray-400">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold text-gray-90 dark:text-white mb-2 md:mb-3 text-base md:text-lg">Utilities Included</h3>
                  <div className="flex flex-wrap gap-2">
                    {property.utilities.map((utility, index) => (
                      <Badge key={index} variant="secondary" className="text-xs md:text-sm">{utility}</Badge>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                  <div className="flex items-center space-x-2">
                    <Car className="h-4 w-4 text-gray-500 flex-shrink-0" />
                    <span className="text-xs md:text-sm text-gray-60 dark:text-gray-400">
                      {property.parking ? "Parking Available" : "No Parking"}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-gray-500 flex-shrink-0" />
                    <span className="text-xs md:text-sm text-gray-60 dark:text-gray-400">
                      {property.furnished ? "Furnished" : "Unfurnished"}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Heart className="h-4 w-4 text-gray-500 flex-shrink-0" />
                    <span className="text-xs md:text-sm text-gray-60 dark:text-gray-400">
                      {property.petFriendly ? "Pet Friendly" : "No Pets"}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-500 flex-shrink-0" />
                    <span className="text-xs md:text-sm text-gray-60 dark:text-gray-400">
                      Available: {new Date(property.availableDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Mobile Responsive */}
          <div className="space-y-4 md:space-y-6">         {/* Quick Actions - Simplified */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base md:text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button onClick={handleToggleVisibility} className="w-full" variant="outline">
                  {isVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4 mr-2" />}
                  {isVisible ? "Hide Property" : "Show Property"}
                </Button>
                <Button onClick={handleDelete} className="w-full" variant="destructive">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Property
                </Button>
              </CardContent>
            </Card>

            {/* Property Stats - Mobile Responsive */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base md:text-lg">Property Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs md:text-sm text-gray-60 dark:text-gray-400">Total Views</span>
                  <span className="font-semibold text-gray-90 dark:text-white text-sm md:text-base">{property.views.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs md:text-sm text-gray-60 dark:text-gray-400">Applications</span>
                  <span className="font-semibold text-gray-90 dark:text-white text-sm md:text-base">{property.applications}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs md:text-sm text-gray-60 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="font-semibold text-gray-90 dark:text-white text-sm md:text-base">{property.rating}</span>
                      <span className="text-xs md:text-sm text-gray-60 dark:text-gray-400">({property.reviews})</span>
                    </div>
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs md:text-sm text-gray-60 dark:text-gray-400">Last Updated</span>
                  <span className="font-semibold text-gray-90 dark:text-white text-sm md:text-base">
                    {new Date(property.lastUpdated).toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information - Mobile Responsive */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base md:text-lg">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2 text-sm md:text-base text-gray-60 dark:text-gray-400">
                  <Phone className="h-4 w-4 flex-shrink-0" />
                  <span>+1 (604) 555-0123</span>
                </div>
                <div className="flex items-center space-x-2 text-sm md:text-base text-gray-60 dark:text-gray-400">
                  <Mail className="h-4 w-4 flex-shrink-0" />
                  <span>landlord@example.com</span>
                </div>
                <Button className="w-full text-sm md:text-base">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </LandlordDashboardWrapper>
  );
};

export default PropertyDetailsPage;
