import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturedRentals from "@/components/FeaturedRentals";
import DynamicCityGrid from "@/components/DynamicCityGrid";
import ActionCards from "@/components/ActionCards";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import { MadeWithDyad } from "@/components/made-with-dyad";

const hospitalCities = [
  { name: "Ajax", href: "/apartment" },
  { name: "Edmonton", href: "/apartment" },
  { name: "Niagara Falls", href: "/apartment" },
  { name: "Quebec City", href: "/apartment" },
  { name: "Ottawa", href: "/apartment" },
  { name: "Victoria", href: "/apartment" },
  { name: "Hamilton", href: "/apartment" },
  { name: "Toronto", href: "/apartment" },
  { name: "Saint John", href: "/apartment" },
  { name: "Edmonton", href: "/apartment" },
];

const medicalSchoolCities = [
  { name: "Toronto", href: "/search-results" },
  { name: "Vancouver", href: "/search-results" },
  { name: "London", href: "/search-results" },
  { name: "Montreal", href: "/search-results" },
];

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
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
        <MadeWithDyad />
      </div>
    </div>
  );
};

export default Index;
