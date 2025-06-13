import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FeaturedRentals from '@/components/FeaturedRentals';
import DynamicCityGrid from '@/components/DynamicCityGrid';
import ActionCards from '@/components/ActionCards';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import { MadeWithDyad } from "@/components/made-with-dyad";

const hospitalCities = [
  { name: "Ajax", href: "/rentals/ajax/near-hospitals" },
  { name: "Edmonton", href: "/rentals/edmonton/near-hospitals" },
  { name: "Niagara Falls", href: "/rentals/niagara-falls/near-hospitals" },
  { name: "Quebec City", href: "/rentals/quebec-city/near-hospitals" },
];

const medicalSchoolCities = [
  { name: "Toronto", href: "/rentals/toronto/near-medical-schools" },
  { name: "Vancouver", href: "/rentals/vancouver/near-medical-schools" },
  { name: "London", href: "/rentals/london/near-medical-schools" },
  { name: "Montreal", href: "/rentals/montreal/near-medical-schools" },
];

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <FeaturedRentals city="Canada" /> {/* Or a dynamically chosen city */}
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
      <div className="bg-slate-900"> {/* Ensure MadeWithDyad is visible on dark footer */}
        <MadeWithDyad />
      </div>
    </div>
  );
};

export default Index;