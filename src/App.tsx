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

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;