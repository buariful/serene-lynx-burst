import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import SearchResultsPage from "./pages/SearchResultsPage";

// Doctor Dashboard Imports
import DoctorLayout from "./components/doctor/DoctorLayout";
import DoctorDashboardPage from "./pages/doctor/DoctorDashboardPage";
import PropertyManagementPage from "./pages/doctor/PropertyManagementPage";
import MedicalDevicePage from "./pages/doctor/MedicalDevicePage";
import DoctorProfilePage from "./pages/doctor/DoctorProfilePage";
import DoctorSettingsPage from "./pages/doctor/DoctorSettingsPage";
import LandlordDashboardPage from "./pages/landloard/LandlordDashboardPage";
import LandlordPostRentalPage from "./pages/landloard/LandlordPostRental";
import PropertyDetailsFormPage from "./pages/landloard/PropertyDetailsFormPage";
import PropertyListingDetailsPage from "./pages/landloard/PropertyListingDetailsPage";
import ListingSuccessPage from "./pages/landloard/ListingSuccessPage";
import NotificationsPage from "./pages/landloard/NotificationsPage";
import DraftsPage from "./pages/landloard/DraftsPage";
import AlertsPage from "./pages/landloard/AlertsPage";
import FavouritesPage from "./pages/landloard/FavouritesPage";
import LandlordAccountSettingsPage from "./pages/landloard/LandlordAccountSettingPage";
import TenantDashboardPage from "./pages/tenant/TenantDashboardPage";
import TenantAccountPage from "./pages/tenant/TenantAccountPage";
import PropertyDetailsPage from "./pages/landloard/PropertyDetailsPage";
import HospitalLayout from "./pages/hospital/HospitalLayout";
import MyAdsPage from "./pages/hospital/MyAdsPage";
import MyMessagesPage from "./pages/hospital/MyMessagesPage";
import MyFavouritesPage from "./pages/hospital/MyFavouritesPage";
import MyProfilePage from "./pages/hospital/MyProfilePage";
import PostAdPage from "./pages/hospital/PostAdPage";
import PostAdDetailsPage from "./pages/hospital/PostAddDetailsPage";
import HospitalMarketplacePage from "./pages/hospital/HospitalMarketPlace";
import ProductDetailsPage from "./pages/hospital/ProductDetailsPage";
import AddViewPage from "./pages/AddViewPage";
import RecruiterDashboardPage from "./pages/recruiter/RecruiterDashboardPage";
// Placeholder for specific forms/views if they become separate routes
// import PostPropertyFormPage from "./pages/doctor/PostPropertyFormPage";
// import PostDeviceFormPage from "./pages/doctor/PostDeviceFormPage";
// import BrowseDevicesPage from "./pages/doctor/BrowseDevicesPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/search-results" element={<SearchResultsPage />} />

          {/* Doctor Dashboard Routes with Layout */}
          <Route path="/doctor" element={<DoctorLayout />}>
            <Route path="dashboard" element={<DoctorDashboardPage />} />
            <Route path="properties" element={<PropertyManagementPage />} />
            {/* Example for a more specific route if needed: */}
            {/* <Route path="properties/new" element={<PostPropertyFormPage />} />  */}
            <Route path="devices" element={<MedicalDevicePage />} />
            {/* Example for more specific device routes: */}
            {/* <Route path="devices/new" element={<PostDeviceFormPage />} /> */}
            {/* <Route path="devices/browse" element={<BrowseDevicesPage />} /> */}
            <Route path="profile" element={<DoctorProfilePage />} />
            <Route path="settings" element={<DoctorSettingsPage />} />
          </Route>

          <Route path="/landlord">
            <Route path="dashboard" element={<LandlordDashboardPage />} />
            <Route path="property/:id" element={<PropertyDetailsPage />} />
            <Route path="notifications" element={<NotificationsPage />} />
            <Route path="drafts" element={<DraftsPage />} />
            <Route path="alerts" element={<AlertsPage />} />
            <Route path="favourites" element={<FavouritesPage />} />
            <Route path="post-rental" element={<LandlordPostRentalPage />} />
            <Route path="account" element={<LandlordAccountSettingsPage />} />
            <Route
              path="property-details"
              element={<PropertyDetailsFormPage />}
            />
            <Route
              path="listing-details"
              element={<PropertyListingDetailsPage />}
            />
            <Route path="listing-success" element={<ListingSuccessPage />} />
          </Route>

          <Route path="/tenant">
            <Route path="dashboard" element={<TenantDashboardPage />} />
            <Route path="account" element={<TenantAccountPage />} />
          </Route>

          <Route
            path="/hospital/dashboard"
            element={<HospitalMarketplacePage />}
          />
          <Route path="/hospital/product/:id" element={<AddViewPage />} />
          <Route path="/post/view" element={<AddViewPage />} />

          <Route path="/hospital" element={<HospitalLayout />}>
            <Route path="my-ads" element={<MyAdsPage />} />
            <Route path="my-messages" element={<MyMessagesPage />} />
            <Route path="my-favourites" element={<MyFavouritesPage />} />
            <Route path="my-profile" element={<MyProfilePage />} />
            <Route path="post-ad" element={<PostAdPage />} />
            <Route path="post-ad-details" element={<PostAdDetailsPage />} />
          </Route>

          <Route
            path="/recruiter/dashboard"
            element={<RecruiterDashboardPage />}
          />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
