import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { LanguageProvider } from "@/components/LanguageProvider";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import OtpVerificationPage from "./pages/OtpVerificationPage";
import SetNewPasswordPage from "./pages/SetNewPasswordPage";
import SearchResultsPage from "./pages/SearchResultsPage";
import TermsPage from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";
import AboutPage from "./pages/AboutPage";
import FAQPage from "./pages/FAQPage";
import BlogPage from "./pages/BlogPage";
import JobBoardPage from "./pages/JobBoardPage";
import MedicalRentalsPage from "./pages/MedicalRentalsPage";
import SearchNearMePage from "./pages/SearchNearMePage";

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
import TenantMarketplacePage from "./pages/tenant/TenantMarketplacePage";
import TenantJobsPage from "./pages/tenant/TenantJobsPage";
import TenantRentalServicesPage from "./pages/tenant/TenantRentalServicesPage";
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
import RecruiterJobsPage from "./pages/recruiter/RecruiterJobsPage";
import RecruiterApplicantsPage from "./pages/recruiter/RecruiterApplicantsPage";
import RecruiterProfilePage from "./pages/recruiter/RecruiterProfilePage";
import RecruiterJobDetailsPage from "./pages/recruiter/RecruiterJobDetailsPage";
import RecruiterApplicantDetailsPage from "./pages/recruiter/RecruiterApplicantDetailsPage";
import LandlordPage from "./pages/landloard/LandlordPage";
import ContactUsPage from "./pages/ContactUsPage";
import HospitalListPage from "./pages/hospital/HospitalListPage";
import LandlordVerifyPage from "./pages/LandlordVerifyPage";
import TenantInsurancePage from "./pages/TenantInsurancePage";
import ApartmentPage from "./pages/ApartmantPage";
import RecruiterPostJob from "./pages/recruiter/RecruiterPostJob";
import PropertyDetailsPublicPage from "./pages/PropertyDetailsPublicPage";
import Layout from "./components/Layout/Layout";
import DeviceDetailsPage from "./pages/hospital/DeviceDetailsPage";
import TenantNoticePage from "./pages/tenant/TenantNoticePage";
import TrustiiDemoPage from "./pages/TrustiiDemoPage";
import TrustiiReportPage from "./pages/TrustiiReportPage";
import TrustiiSharedReportPage from "./pages/TrustiiSharedReportPage";
import CreditCheckReportPage from "./pages/CreditCheckReportPage";
// Placeholder for specific forms/views if they become separate routes
// import PostPropertyFormPage from "./pages/doctor/PostPropertyFormPage";
// import PostDeviceFormPage from "./pages/doctor/PostDeviceFormPage";
// import BrowseDevicesPage from "./pages/doctor/BrowseDevicesPage";
import { ThemeProvider } from "@/hooks/useTheme";
import HospitalDashboardPage from "./pages/hospital/HospitalDashboardPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <ThemeProvider>
        <TooltipProvider>
          <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Public Routes */} 
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/verify-otp" element={<OtpVerificationPage />} />
                <Route path="/reset-password" element={<SetNewPasswordPage />} />
                <Route path="/search-results" element={<SearchResultsPage />} />
                <Route
                  path="/toronto/:address"
                  element={
                    <Layout>
                      <PropertyDetailsPublicPage />
                    </Layout>
                  }
                />

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
                  <Route path="jobs" element={<TenantJobsPage />} />
                  <Route path="rental-services" element={<TenantRentalServicesPage />} />
                  <Route path="account" element={<TenantAccountPage />} />
                  <Route path="marketplace" element={<TenantMarketplacePage />} />
                  <Route path="job-details/:id" element={<AddViewPage />} />
                </Route>

                <Route
                  path="/marketplace-list"
                  element={<HospitalMarketplacePage />}
                />

                <Route path="/landloard/landlord-page" element={<LandlordPage />} />
                <Route path="/landlords" element={<LandlordPage />} />
                <Route path="/contact-us" element={<ContactUsPage />} />
               
                <Route path="/marketplace" element={<HospitalMarketplacePage />} />
                <Route path="/product-details/:id" element={<AddViewPage />} />
                <Route path="/hospital/product/:id" element={<AddViewPage />} />
                <Route path="/post/view" element={<AddViewPage />} />

                <Route path="/hospital" element={<HospitalLayout />}>
                  <Route path="dashboard" element={<HospitalDashboardPage />} />
                  <Route path="my-ads" element={<MyAdsPage />} />
                  <Route path="my-messages" element={<MyMessagesPage />} />
                  <Route path="my-favourites" element={<MyFavouritesPage />} />
                  <Route path="my-profile" element={<MyProfilePage />} />
                  <Route path="post-ad" element={<PostAdPage />} />
                  <Route path="post-ad-details" element={<PostAdDetailsPage />} />
                  <Route path="device-details/:id" element={<DeviceDetailsPage />} />
                  <Route path="marketplace" element={<HospitalMarketplacePage />} />
                  <Route path="product/:id" element={<ProductDetailsPage />} />
                </Route>

                {/* Recruiter Routes */}
                <Route path="/recruiter/dashboard" element={<RecruiterDashboardPage />} />
                <Route path="/recruiter/jobs" element={<RecruiterJobsPage />} />
                <Route path="/recruiter/jobs/:id" element={<RecruiterJobDetailsPage />} />
                <Route path="/recruiter/jobs/:id/edit" element={<RecruiterPostJob setJobPosting={() => {}} mode="edit" />} />
                <Route path="/recruiter/applicants" element={<RecruiterApplicantsPage />} />
                <Route path="/recruiter/applicants/:id" element={<RecruiterApplicantDetailsPage />} />
                <Route path="/recruiter/profile" element={<RecruiterProfilePage />} />
                <Route path="/recruiter/post-job" element={<RecruiterPostJob setJobPosting={() => {}} />} />

                {/* <Route path="/hospitals" element={<HospitalListPage />} /> */}

                <Route path="/terms" element={<TermsPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />

                <Route path="/landlord-verify" element={<LandlordVerifyPage />} />
                <Route path="/tenant-insurance" element={<TenantInsurancePage />} />
                <Route path="/tenant-notice" element={<TenantNoticePage />} />

                <Route path="/about" element={<AboutPage />} />
                <Route path="/faq" element={<FAQPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/job-board" element={<JobBoardPage />} />
                <Route path="/medical-rentals" element={<MedicalRentalsPage />} />
                <Route path="/search-near-me" element={<SearchNearMePage />} />
                <Route path="/apartment" element={<ApartmentPage />} />
                <Route path="/hospital-list" element={<ApartmentPage />} />
                <Route path="/credit-check-report" element={<TrustiiDemoPage />} />
                <Route path="/trustii-demo" element={<TrustiiDemoPage />} />
                <Route path="/trustii-report/:inquiryId" element={<TrustiiReportPage />} />
                <Route path="/trustii-shared-report/:inquiryId" element={<TrustiiSharedReportPage />} />
                <Route path="/credit-check" element={<CreditCheckReportPage />} />

                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
