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
  { name: "Kingston General Hospital", href: "/apartment" },
  { name: "London Health Sciences Centre", href: "/apartment" },
  { name: "St. Joseph's Healthcare Hamilton", href: "/apartment" },
  { name: "Windsor Regional Hospital", href: "/apartment" },
  { name: "Grand River Hospital", href: "/apartment" },
  { name: "Thunder Bay Regional Health Sciences Centre", href: "/apartment" },
  { name: "Trillium Health Partners", href: "/apartment" },
  { name: "Niagara Health", href: "/apartment" },
  { name: "Southlake Regional Health Centre", href: "/apartment" },
  { name: "Halton Healthcare", href: "/apartment" },
  { name: "William Osler Health System", href: "/apartment" },
  { name: "Mackenzie Health", href: "/apartment" },
  { name: "Humber River Hospital", href: "/apartment" },
  { name: "Michael Garron Hospital", href: "/apartment" },
  // Added 11 more for demo
  { name: "Peterborough Regional Health Centre", href: "/apartment" },
  { name: "Cambridge Memorial Hospital", href: "/apartment" },
  { name: "Bluewater Health", href: "/apartment" },
  { name: "Guelph General Hospital", href: "/apartment" },
  { name: "Joseph Brant Hospital", href: "/apartment" },
  { name: "Markham Stouffville Hospital", href: "/apartment" },
  { name: "North York General Hospital", href: "/apartment" },
  { name: "Oakville Trafalgar Memorial Hospital", href: "/apartment" },
  { name: "Sault Area Hospital", href: "/apartment" },
  { name: "St. Catharines Site (Niagara Health)", href: "/apartment" },
  { name: "Stratford General Hospital", href: "/apartment" },
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
  { name: "University of Calgary Cumming School of Medicine", href: "/apartment" },
  { name: "University of Saskatchewan College of Medicine", href: "/apartment" },
  { name: "Memorial University Faculty of Medicine", href: "/apartment" },
  { name: "University of Sherbrooke Faculty of Medicine", href: "/apartment" },
  { name: "Laval University Faculty of Medicine", href: "/apartment" },
  { name: "University of Montreal Faculty of Medicine", href: "/apartment" },
  { name: "McMaster University Michael G. DeGroote School of Medicine", href: "/apartment" },
  { name: "University of Waterloo School of Pharmacy", href: "/apartment" },
  { name: "University of Guelph Ontario Veterinary College", href: "/apartment" },
  { name: "University of Prince Edward Island Atlantic Veterinary College", href: "/apartment" },
  // Added 9 more for demo
  { name: "Saint Mary's University Faculty of Science", href: "/apartment" },
  { name: "Trent/Fleming School of Nursing", href: "/apartment" },
  { name: "Laurentian University School of Medicine", href: "/apartment" },
  { name: "Brock University Department of Health Sciences", href: "/apartment" },
  { name: "Carleton University Health Sciences", href: "/apartment" },
  { name: "Lakehead University Faculty of Health and Behavioural Sciences", href: "/apartment" },
  { name: "Ryerson University School of Medicine", href: "/apartment" },
  { name: "York University School of Nursing", href: "/apartment" },
  { name: "Concordia University Department of Health, Kinesiology, and Applied Physiology", href: "/apartment" },
];

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <FeaturedRentals />
        <div className="my-6 sm:my-8 md:my-10"></div>
        <DynamicCityGrid
          title="Apartments for rent near hospitals available now!"
          subtitle="Showing hospitals in your province. Load more to see all available hospitals."
          cities={hospitalCities}
          showLoadMore={true}
          initialDisplayCount={20}
        />
        <ActionCards />
        <DynamicCityGrid
          title="Apartments near medical schools are available for rent!"
          subtitle="Ideal for students and faculty."
          cities={medicalSchoolCities}
          initialDisplayCount={20}
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
