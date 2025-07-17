import React, { useState } from "react";
import LandlordDashboardWrapper from "@/components/LandlordDashboardWrapper";
import { Pencil, Trash2, Eye, Plus, Search, Filter, Calendar, MapPin, DollarSign, Bed, Bath, Square, Clock, Home, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { showSuccess, showError } from "@/utils/toast";

interface Draft {
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
  lastModified: string;
  completionPercentage: number;
  hasPhotos: boolean;
  hasDescription: boolean;
  hasAmenities: boolean;
  status: 'draft' | 'incomplete' | 'ready';
  description: string;
}

const DraftsPage: React.FC = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("modified");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingDraft, setEditingDraft] = useState<Draft | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state for create/edit
  const [draftForm, setDraftForm] = useState({
    title: "",
    address: "",
    city: "",
    province: "",
    rent: "",
    bedrooms: "",
    bathrooms: "",
    squareFootage: "",
    description: "",
    propertyType: "",
    availableDate: "",
  });

  const [drafts, setDrafts] = useState<Draft[]>([
    {
      id: "1",
      title: "Modern 2-Bedroom Apartment",
      address: "123 Main St",
      city: "Toronto",
      province: "ON",
      rent: 2200,
      bedrooms: 2,
      bathrooms: 2,
      squareFootage: 950,
      propertyType: "Apartment",
      lastModified: "2024-01-15T10:30:00Z",
      completionPercentage: 85,
      hasPhotos: true,
      hasDescription: true,
      hasAmenities: false,
      status: "ready",
      description: "Spacious and modern 2-bedroom apartment in downtown Toronto."
    },
    {
      id: "2",
      title: "Cozy Studio Near Hospital",
      address: "456 Oak Ave",
      city: "Vancouver",
      province: "BC",
      rent: 1800,
      bedrooms: 0,
      bathrooms: 1,
      squareFootage: 550,
      propertyType: "Studio",
      lastModified: "2024-01-14T16:20:00Z",
      completionPercentage: 45,
      hasPhotos: false,
      hasDescription: true,
      hasAmenities: false,
      status: "incomplete",
      description: "Studio apartment perfect for students or healthcare professionals."
    },
    {
      id: "3",
      title: "Family Home with Garden",
      address: "789 Pine St",
      city: "Calgary",
      province: "AB",
      rent: 3200,
      bedrooms: 3,
      bathrooms: 2,
      squareFootage: 1400,
      propertyType: "House",
      lastModified: "2024-01-13T09:15:00Z",
      completionPercentage: 25,
      hasPhotos: false,
      hasDescription: false,
      hasAmenities: false,
      status: "draft",
      description: "Large family home with a beautiful garden and spacious rooms."
    },
    {
      id: "4",
      title: "Luxury Condo Downtown",
      address: "321 Elm St",
      city: "Montreal",
      province: "QC",
      rent: 2800,
      bedrooms: 1,
      bathrooms: 1,
      squareFootage: 750,
      propertyType: "Condo",
      lastModified: "2024-01-12T14:45:00Z",
      completionPercentage: 95,
      hasPhotos: true,
      hasDescription: true,
      hasAmenities: true,
      status: "ready",
      description: "Luxury condo in the heart of downtown Montreal with premium amenities."
    },
    {
      id: "5",
      title: "Student-Friendly Basement Suite",
      address: "654 Maple Dr",
      city: "Edmonton",
      province: "AB",
      rent: 1200,
      bedrooms: 1,
      bathrooms: 1,
      squareFootage: 600,
      propertyType: "Basement Suite",
      lastModified: "2024-01-11T11:30:00Z",
      completionPercentage: 60,
      hasPhotos: true,
      hasDescription: false,
      hasAmenities: true,
      status: "incomplete",
      description: "Affordable basement suite ideal for students."
    }
  ]);

  const getStatusColor = (status: Draft['status']) => {
    switch (status) {
      case 'ready':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'incomplete':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'draft':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getStatusLabel = (status: Draft['status']) => {
    switch (status) {
      case 'ready':
        return 'Ready to Publish';
      case 'incomplete':
        return 'Incomplete';
      case 'draft':
        return 'Draft';
      default:
        return 'Draft';
    }
  };

  const getCompletionColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 50) return 'bg-orange-500';
    return 'bg-red-500';
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

  const handleInputChange = (field: string, value: string) => {
    setDraftForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleEdit = (draft: Draft) => {
    setEditingDraft(draft);
    setDraftForm({
      title: draft.title,
      address: draft.address,
      city: draft.city,
      province: draft.province,
      rent: draft.rent.toString(),
      bedrooms: draft.bedrooms.toString(),
      bathrooms: draft.bathrooms.toString(),
      squareFootage: draft.squareFootage.toString(),
      description: draft.hasDescription ? draft.description : "",
      propertyType: draft.propertyType,
      availableDate: draft.lastModified, // Use lastModified as availableDate for editing
    });
    setIsEditModalOpen(true);
  };

  const handlePreview = (draft: Draft) => {
    showSuccess(`Previewing draft: ${draft.title}`);
  };

  const handlePublish = (draft: Draft) => {
    setDrafts(prev => prev.filter(d => d.id !== draft.id));
    showSuccess(`Published: ${draft.title}`);
  };

  const handleDelete = (draft: Draft) => {
    setDrafts(prev => prev.filter(d => d.id !== draft.id));
    showSuccess(`Deleted draft: ${draft.title}`);
  };

  const handleCreateNew = () => {
    setDraftForm({
      title: "",
      address: "",
      city: "",
      province: "",
      rent: "",
      bedrooms: "",
      bathrooms: "",
      squareFootage: "",
      description: "",
      propertyType: "",
      availableDate: "",
    });
    setIsCreateModalOpen(true);
  };

  const handleSubmitDraft = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 150));
      
      if (isEditModalOpen && editingDraft) {
        // Update existing draft
        setDrafts(prev => prev.map(d => 
          d.id === editingDraft.id 
            ? { ...d, title: draftForm.title, address: draftForm.address, lastModified: new Date().toISOString() }
            : d
        ));
        showSuccess(`Draft updated: ${draftForm.title}`);
        setIsEditModalOpen(false);
        setEditingDraft(null);
      } else {
        // Create new draft
        const newDraft: Draft = {
          id: Date.now().toString(),
          title: draftForm.title,
          address: draftForm.address,
          city: draftForm.city,
          province: draftForm.province,
          rent: parseInt(draftForm.rent) || 0,
          bedrooms: parseInt(draftForm.bedrooms) || 0,
          bathrooms: parseInt(draftForm.bathrooms) || 0,
          squareFootage: parseInt(draftForm.squareFootage) || 0,
          propertyType: draftForm.propertyType,
          lastModified: new Date().toISOString(),
          completionPercentage: 25, // Default for new drafts
          hasPhotos: false,
          hasDescription: !!draftForm.description,
          hasAmenities: false,
          status: 'draft',
          description: draftForm.description
        };
        setDrafts(prev => [newDraft, ...prev]);
        showSuccess(`Draft created: ${draftForm.title}`);
        setIsCreateModalOpen(false);
      }
      
      setDraftForm({
        title: "",
        address: "",
        city: "",
        province: "",
        rent: "",
        bedrooms: "",
        bathrooms: "",
        squareFootage: "",
        description: "",
        propertyType: "",
        availableDate: "",
      });
    } catch (error) {
      showError('Failed to save draft. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filter and sort drafts
  const filteredDrafts = drafts
    .filter(draft => {
      const matchesSearch = draft.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           draft.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           draft.city.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'all' || draft.status === filterStatus;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'modified':
          return new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime();
        case 'title':
          return a.title.localeCompare(b.title);
        case 'rent':
          return b.rent - a.rent;
        case 'completion':
          return b.completionPercentage - a.completionPercentage;
        default:
          return 0;
      }
    });

  const readyToPublish = drafts.filter(d => d.status === 'ready').length;
  const incompleteDrafts = drafts.filter(d => d.status === 'incomplete').length;

  return (
    <LandlordDashboardWrapper>
      <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <Pencil className="w-5 h-5 md:w-6 md:h-6 text-blue-600 dark:text-blue-400" />
              Drafts
            </h1>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mt-1">
              Continue editing your property listings or publish when ready
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <Button 
              className="flex items-center gap-2 text-sm md:text-base"
              onClick={handleCreateNew}
            >
              <Plus className="w-4 h-4" />
              Create New Listing
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-3 md:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">Total Drafts</p>
                  <p className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">{drafts.length}</p>
                </div>
                <Pencil className="w-6 h-6 md:w-8 md:h-8 text-blue-600 dark:text-blue-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-3 md:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">Ready to Publish</p>
                  <p className="text-xl md:text-2xl font-bold text-green-600 dark:text-green-400">{readyToPublish}</p>
                </div>
                <div className="w-6 h-6 md:h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                  <span className="text-green-600 dark:text-green-400 text-xs md:text-sm font-bold">✓</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-3 md:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">Incomplete</p>
                  <p className="text-xl md:text-2xl font-bold text-orange-600 dark:text-orange-400">{incompleteDrafts}</p>
                </div>
                <Clock className="w-6 h-6 md:w-8 md:h-8 text-orange-600 dark:text-orange-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-4 mb-6">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search drafts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 text-sm md:text-base"
              />
            </div>
          </div>
          
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="text-sm md:text-base">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="ready">Ready to Publish</SelectItem>
              <SelectItem value="incomplete">Incomplete</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="text-sm md:text-base">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="modified">Last Modified</SelectItem>
              <SelectItem value="title">Title</SelectItem>
              <SelectItem value="rent">Rent</SelectItem>
              <SelectItem value="completion">Completion</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Drafts List */}
        <div className="space-y-3 md:space-y-4">
          {filteredDrafts.length === 0 ? (
            <Card className="text-center py-8 md:py-12">
              <CardContent>
                <Pencil className="w-12 h-12 md:w-16 md:h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  No drafts found
                </h3>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-4">
                  {searchTerm || filterStatus !== 'all' 
                    ? 'Try adjusting your search or filters'
                    : 'You don\'t have any draft listings yet.'}
                </p>
                <Button 
                  className="flex items-center gap-2 mx-auto text-sm md:text-base"
                  onClick={handleCreateNew}
                >
                  <Plus className="w-4 h-4" />
                  Create Your First Listing
                </Button>
              </CardContent>
            </Card>
          ) : (
            filteredDrafts.map((draft) => (
              <Card key={draft.id} className="transition-all duration-200 hover:shadow-md">
                <CardContent className="p-3 md:p-4">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    {/* Main Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-semibold text-base md:text-lg text-gray-900 dark:text-gray-100">
                            {draft.title}
                          </h3>
                          <Badge className={`text-xs ${getStatusColor(draft.status)}`}>
                            {getStatusLabel(draft.status)}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                          <span>Modified {formatTimestamp(draft.lastModified)}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-3 md:gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{draft.address}, {draft.city}, {draft.province}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          <span>${draft.rent.toLocaleString()}/month</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Bed className="w-4 h-4" />
                          <span>{draft.bedrooms} bed{draft.bedrooms !== 1 ? 's' : ''}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Bath className="w-4 h-4" />
                          <span>{draft.bathrooms} bath{draft.bathrooms !== 1 ? 's' : ''}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Square className="w-4 h-4" />
                          <span>{draft.squareFootage} sq ft</span>
                        </div>
                      </div>
                      
                      {/* Completion Progress */}
                      <div className="mb-3">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-gray-600 dark:text-gray-400">Completion</span>
                          <span className="font-medium">{draft.completionPercentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${getCompletionColor(draft.completionPercentage)}`}
                            style={{ width: `${draft.completionPercentage}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      {/* Requirements Checklist */}
                      <div className="flex flex-wrap gap-3 text-xs">
                        <div className={`flex items-center gap-1 ${draft.hasPhotos ? 'text-green-600 dark:text-green-400' : 'text-gray-400'}`}>
                          <span className={`w-2 h-2 rounded-full ${draft.hasPhotos ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                          Photos
                        </div>
                        <div className={`flex items-center gap-1 ${draft.hasDescription ? 'text-green-600 dark:text-green-400' : 'text-gray-400'}`}>
                          <span className={`w-2 h-2 rounded-full ${draft.hasDescription ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                          Description
                        </div>
                        <div className={`flex items-center gap-1 ${draft.hasAmenities ? 'text-green-600 dark:text-green-400' : 'text-gray-400'}`}>
                          <span className={`w-2 h-2 rounded-full ${draft.hasAmenities ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                          Amenities
                        </div>
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-2 lg:flex-col">
                      <Button 
                        size="sm" 
                        className="flex items-center gap-2 text-xs md:text-sm"
                        onClick={() => handleEdit(draft)}
                      >
                        <Pencil className="w-4 h-4" />
                        Edit
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex items-center gap-2 text-xs md:text-sm"
                        onClick={() => handlePreview(draft)}
                      >
                        <Eye className="w-4 h-4" />
                        Preview
                      </Button>
                      {draft.status === 'ready' && (
                        <Button 
                          size="sm" 
                          variant="default" 
                          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-xs md:text-sm"
                          onClick={() => handlePublish(draft)}
                        >
                          Publish
                        </Button>
                      )}
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20 text-xs md:text-sm"
                        onClick={() => handleDelete(draft)}
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>

      {/* Create/Edit Draft Modal */}
      {(isCreateModalOpen || isEditModalOpen) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <Home className="w-5 h-5" />
                {isEditModalOpen ? 'Edit Draft' : 'Create New Listing'}
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setIsCreateModalOpen(false);
                  setIsEditModalOpen(false);
                  setEditingDraft(null);
                }}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <form onSubmit={handleSubmitDraft} className="p-6 space-y-6">
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
                      value={draftForm.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      placeholder="e.g., Cozy 2-Bedroom Apartment in Downtown"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="propertyType">Property Type *</Label>
                      <Select value={draftForm.propertyType} onValueChange={(value) => handleInputChange('propertyType', value)}>
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
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                        <Input
                          id="rent"
                          type="number"
                          value={draftForm.rent}
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
                      value={draftForm.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="123 Main Street"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        value={draftForm.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        placeholder="Toronto"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="province">Province *</Label>
                      <Select value={draftForm.province} onValueChange={(value) => handleInputChange('province', value)}>
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
                        <Bed className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                        <Input
                          id="bedrooms"
                          type="number"
                          value={draftForm.bedrooms}
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
                        <Bath className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                        <Input
                          id="bathrooms"
                          type="number"
                          value={draftForm.bathrooms}
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
                        <Square className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                        <Input
                          id="squareFootage"
                          type="number"
                          value={draftForm.squareFootage}
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
                      value={draftForm.availableDate}
                      onChange={(e) => handleInputChange('availableDate', e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={draftForm.description}
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
                  onClick={() => {
                    setIsCreateModalOpen(false);
                    setIsEditModalOpen(false);
                    setEditingDraft(null);
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  {isSubmitting ? 'Saving...' : (isEditModalOpen ? 'Update Draft' : 'Save Draft')}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </LandlordDashboardWrapper>
  );
};

export default DraftsPage;
