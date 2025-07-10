import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturedRentals from "@/components/FeaturedRentals";
import DynamicCityGrid from "@/components/DynamicCityGrid";
import ActionCards from "@/components/ActionCards";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import { MadeWithDyad } from "@/components/made-with-dyad";

const hospitalCities = [
  { name: "Toronto General Hospital", href: "/apartment" },
  { name: "Vancouver General Hospital", href: "/apartment" },
  { name: "Montreal General Hospital", href: "/apartment" },
  { name: "St. Michael's Hospital", href: "/apartment" },
  { name: "Sunnybrook Health Sciences Centre", href: "/apartment" },
  { name: "The Ottawa Hospital", href: "/apartment" },
  { name: "Foothills Medical Centre", href: "/apartment" },
  { name: "Royal Alexandra Hospital", href: "/apartment" },
  { name: "Jewish General Hospital", href: "/apartment" },
  { name: "Hamilton General Hospital", href: "/apartment" },
];

const medicalSchoolCities = [
  { name: "University of Toronto Faculty of Medicine", href: "/apartment" },
  {
    name: "McGill University Faculty of Medicine and Health Sciences",
    href: "/apartment",
  },
  {
    name: "University of British Columbia Faculty of Medicine",
    href: "/apartment",
  },
  {
    name: "University of Alberta Faculty of Medicine & Dentistry",
    href: "/apartment",
  },
  { name: "University of Ottawa Faculty of Medicine", href: "/apartment" },
  {
    name: "Western University Schulich Schools of Medicine & Dentistry",
    href: "/apartment",
  },
  { name: "Queen's University Faculty of Health Sciences", href: "/apartment" },
  { name: "Dalhousie University Faculty of Medicine", href: "/apartment" },
  {
    name: "University of Manitoba Max Rady College of Medicine",
    href: "/apartment",
  },
  {
    name: "Northern Ontario Schools of Medicine University (NOSM)",
    href: "/apartment",
  },
];

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <FeaturedRentals /> {/* Or a dynamically chosen city */}
        <div className="my-10"></div>
        <DynamicCityGrid
          title="Apartments for rent near hospitals available now!"
          subtitle="Home to healthcare professionals across Canada."
          cities={hospitalCities}
        />
        <ActionCards />
        <DynamicCityGrid
          title="Apartments for rent near medical schools available now!"
          subtitle="Ideal for students and faculty."
          cities={medicalSchoolCities}
        />
        <FAQ />
      </main>
      <Footer />
      <div className="bg-slate-900">
        {" "}
        {/* Ensure MadeWithDyad is visible on dark footer */}
        {/* <MadeWithDyad /> */}
      </div>
    </div>
  );
};

export default Index;
