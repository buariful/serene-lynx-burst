import DashboardHeader from "@/components/DashboardHeader";
import Card2 from "@/components/ui/Card2";
import { useState, useRef, useEffect } from "react";
import React from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { Filter, MapPin, DollarSign, Tag, Eye, Heart, Star } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { FilterNav } from "@/components/ui/filterNav";
import { useTranslation } from 'react-i18next';
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";

type Product = {
  id: string;
  title: string;
  description: string;
  location: string;
  price: string;
  isForSale: 0 | 1;
  category: string;
  image?: string;
  type: string;
  status: string;
  condition?: string;
  seller?: string;
  rating?: number;
  reviews?: number;
};

const LOCATIONS = [
  "Canada",
  "Alberta",
  "British Columbia",
  "Manitoba",
  "New Brunswick",
  "Newfoundland",
  "Nova Scotia",
  "Ontario",
  "Prince Edward Island",
  "Quebec",
  "Saskatchewan",
  "Territories",
];

const CATEGORIES = [
  "Diagnostic Devices",
  "Surgical Instruments",
  "Monitoring Equipment",
  "Imaging Devices",
  "Therapeutic Devices",
  "Laboratory Equipment",
  "Mobility Aids",
  "Consumables & Disposables",
  "Medical Furniture",
  "IT & Software",
  "Other",
];

const SAMPLE_PRODUCTS: Product[] = [
  {
    id: "1",
    title: "Portable Ultrasound Machine",
    description: "High-resolution imaging for bedside diagnostics with advanced features.",
    location: "Canada",
    price: "$1,200",
    isForSale: 0,
    category: "Imaging Devices",
    image: "https://images.unsplash.com/photo-15597571485c3500d3c56?w=400&h=300&it=crop",
    type: "Imaging",
    status: "available",
    condition: "Excellent",
    seller: "Medical Equipment Plus",
    rating: 4.8,
    reviews: 24,
  },
  {
    id: "2",
    title: "ECG Monitor",
    description: "12-lead ECG with wireless connectivity and advanced monitoring.",
    location: "Canada",
    price: "$300",
    isForSale: 0,
    category: "Monitoring Equipment",
    image: "https://www.sgs.com/-/media/sgscorp/images/temporary/tablet-showing-heart-test-result.cdn.en-BD.1.jpg",
    type: "Monitoring",
    status: "rented",
    condition: "Like New",
    seller: "CardioTech Solutions",
    rating: 4.6,
    reviews: 18,
  },
  {
    id: "3",
    title: "Infusion Pump",
    description: "Accurate fluid delivery for patient care with safety features.",
    location: "Canada",
    price: "$150",
    isForSale: 1,
    category: "Therapeutic Devices",
    image: "https://images.unsplash.com/photo-15597571485c3500d3c56?w=400&h=300&it=crop",
    type: "Therapeutic",
    status: "available",
    condition: "Good",
    seller: "Infusion Systems Inc",
    rating: 4.4,
    reviews: 12,
  },
  {
    id: "4",
    title: "Infusion Pump",
    description: "Accurate fluid delivery for patient care with safety features.",
    location: "Canada",
    price: "$150",
    isForSale: 0,
    category: "Therapeutic Devices",
    image: "https://images.unsplash.com/photo-15597571485c3500d3c56?w=400&h=300&it=crop",
    type: "Therapeutic",
    status: "available",
    condition: "Excellent",
    seller: "Medical Supplies Co",
    rating: 4.9,
    reviews: 31,
  },
  {
    id: "5",
    title: "Surgical Table",
    description: "Adjustable, stainless steel surgical table with advanced positioning.",
    location: "Canada",
    price: "$2,000",
    isForSale: 1,
    category: "Medical Furniture",
    image: "https://res.cloudinary.com/armis/images/f_auto,q_auto/v1706810885/images/operating-room-with-security-alert-icons-1/operating-room-with-security-alert-icons-1.jpg?_i=AA",
    type: "Furniture",
    status: "available",
    condition: "Like New",
    seller: "Surgical Equipment Ltd",
    rating: 4.7,
    reviews: 15,
  },
  {
    id: "6",
    title: "Wheelchair",
    description: "Lightweight, foldable wheelchair for mobility with comfort features.",
    location: "Canada",
    price: "$50",
    isForSale: 1,
    category: "Mobility Aids",
    image: "https://images.unsplash.com/photo-15597571485c3500d3c56?w=400&h=300&it=crop",
    type: "Mobility",
    status: "available",
    condition: "Good",
    seller: "Mobility Solutions",
    rating: 4.3,
    reviews: 8,
  },
  {
    id: "7",
    title: "Wheelchair",
    description: "Lightweight, foldable wheelchair for mobility with comfort features.",
    location: "Canada",
    price: "$50",
    isForSale: 0,
    category: "Mobility Aids",
    image: "https://m.media-amazon.com/images/I/71bIKgWuwSL._SS1000_.jpg",
    type: "Mobility",
    status: "unavailable",
    condition: "Fair",
    seller: "Accessibility Plus",
    rating: 4.1,
    reviews: 6,
  },
  {
    id: "8",
    title: "Wheelchair",
    description: "Lightweight, foldable wheelchair for mobility with comfort features.",
    location: "Canada",
    price: "$50",
    isForSale: 1,
    category: "Mobility Aids",
    image: "https://images.unsplash.com/photo-15597571485c3500d3c56?w=400&h=300&it=crop",
    type: "Mobility",
    status: "unavailable",
    condition: "Excellent",
    seller: "Medical Mobility",
    rating: 4.8,
    reviews: 22,
  },
];

function ProductCard({
  product,
  imageIndex = 0,
}: {
  product: Product;
  imageIndex?: number;
}) {
  const navigate = useNavigate();
  return (
    <Card className="group hover:shadow-lg transition-all duration-200 flow-hidden cursor-pointer">
      <div className="relative">
        <img
          src={product.image || "https://medicalstall.com/wp-content/uploads/2025/01/OXTM-10-Liter-Oxygen-Concentrator-Medical-Stall-600x600.jpg"}
          alt={product.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
        />
        <div className="absolute top-3 right-3 flex space-x-2">
          <Badge variant="secondary" className="text-xs">
            {product.status}
          </Badge>
          <Button variant="ghost" size="sm" className="h-8 bg-white/80 hover:bg-white">
            <Heart className="w-4 h-4" />
          </Button>
        </div>
        {product.rating && (
          <div className="absolute bottom-3 left-3 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center">
            <Star className="w-3 h-3 mr-1 fill-current" />
            {product.rating} ({product.reviews})
          </div>
        )}
      </div>
      
      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-2 mb-1">{product.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-xs line-clamp-2">{product.description}</p>
          </div>
          
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center">
              <MapPin className="w-3 h-3 mr-1" />
              {product.location}
            </div>
            <div className="flex items-center">
              <Tag className="w-3 h-3 mr-1" />
              {product.category}
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-xs">
                {product.condition}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {product.isForSale ? "For Sale" : "For Rent"}
              </Badge>
            </div>
            <div className="text-right">
              <div className="font-bold text-green-600 dark:text-green-400 text-sm">
                {product.price}
                {!product.isForSale ? "/month" : ""}
              </div>
            </div>
          </div>
          
          <div className="flex space-x-2 pt-2">
            <Button
              onClick={() => navigate(`/hospital/device-details/${product.id}`)}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm"
            >
              <Eye className="w-4 h-4 mr-1" />
              View Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function HospitalMarketplacePage() {
  const [selectedLocation, setSelectedLocation] = useState<string>("Canada");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("relevance");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q");
  const { t } = useTranslation();

  // Show sidebar if a category is selected (not 'All') or search is active
  useEffect(() => {
    if (selectedCategory !== "All" || searchQuery.trim() !== "") {
      setShowSidebar(true);
    } else {
      setShowSidebar(false);
    }
  }, [selectedCategory, searchQuery]);

  const isSearchActive = searchQuery.trim() !== "";

  // Close dropdown on outside click
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setShowProfileMenu(false);
      }
    }
    if (showProfileMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showProfileMenu]);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSearchQuery(searchInput);
  };

  const handleBackToMain = () => {
    setSearchQuery("");
    setSearchInput("");
    setSelectedCategory("All");
  };

  const filteredProducts = SAMPLE_PRODUCTS.filter((product) => {
    const matchesLocation =
      selectedLocation === "All" || product.location.includes(selectedLocation);
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch =
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.seller?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = 
      parseFloat(product.price.replace(/[^0-9.]/g, "")) >= priceRange[0] &&
      parseFloat(product.price.replace(/[^0-9.]/g, "")) <= priceRange[1];
    const matchesCondition = 
      selectedConditions.length === 0 || 
      (product.condition && selectedConditions.includes(product.condition));

    return matchesLocation && matchesCategory && matchesSearch && matchesPrice && matchesCondition;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return parseFloat(a.price.replace(/[^0-9.]/g, "")) - parseFloat(b.price.replace(/[^0-9.]/g, ""));
      case "price-high":
        return parseFloat(b.price.replace(/[^0-9.]/g, "")) - parseFloat(a.price.replace(/[^0-9.]/g, ""));
      case "rating":
        return (b.rating || 0) - (a.rating || 0);
      case "newest":
        return parseInt(b.id) - parseInt(a.id);
      default:
        return 0;
    }
  });

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {q ? q : t('hospital.marketplace.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Find the best medical equipment and devices for your facility
          </p>
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar for categories and filters */}
          <aside className="w-full lg:w-80 mb-8 lg:mb-0">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-6">
              <h3 className="font-semibold mb-4 text-gray-800 dark:text-gray-200">
                Filters
              </h3>
              {/* Search */}
              <div className="mb-6">
                <Label className="text-sm font-medium mb-2">Search</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Search devices..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              {/* Categories */}
              <div className="mb-6">
                <Label className="text-sm font-medium mb-2">Categories</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Categories</SelectItem>
                    {CATEGORIES.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {/* Location */}
              <div className="mb-6">
                <Label className="text-sm font-medium mb-2">Location</Label>
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Locations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Locations</SelectItem>
                    {LOCATIONS.map((location) => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {/* Price Range */}
              <div className="mb-6">
                <Label className="text-sm font-medium mb-2">Price Range</Label>
                <div className="space-y-2">
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={10000}
                    step={100}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>
              {/* Condition */}
              <div className="mb-6">
                <Label className="text-sm font-medium mb-2">Condition</Label>
                <div className="space-y-2">
                  {["Excellent", "Like New", "Good", "Fair", "Poor"].map((condition) => (
                    <div key={condition} className="flex items-center space-x-2">
                      <Checkbox
                        id={condition}
                        checked={selectedConditions.includes(condition)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedConditions([...selectedConditions, condition]);
                          } else {
                            setSelectedConditions(selectedConditions.filter(c => c !== condition));
                          }
                        }}
                      />
                      <Label htmlFor={condition} className="text-sm font-normal">
                        {condition}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              {/* Sort By */}
              <div className="mb-6">
                <Label className="text-sm font-medium mb-2">Sort By</Label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="newest">Newest First</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </aside>
          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {sortedProducts.length} results found
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  aria-label="Grid view"
                >
                  Grid
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  aria-label="List view"
                >
                  List
                </Button>
              </div>
            </div>
            {/* Products Grid */}
            {sortedProducts.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <div className="text-gray-400 dark:text-gray-500 mb-4">
                    <Search className="w-16 h-16 mx-auto" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No devices found
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Try adjusting your search criteria or filters
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className={viewMode === "grid" 
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                : "space-y-4"}>
                {sortedProducts.map((product, idx) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    imageIndex={idx}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
