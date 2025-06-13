import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import HospitalsGrid from '@/components/HospitalsGrid';
import ShareButtons from '@/components/ShareButtons';
import { MadeWithDyad } from "@/components/made-with-dyad";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <ShareButtons />
      <main className="flex-grow">
        <HeroSection />
        <HospitalsGrid />
      </main>
      <footer className="bg-gray-100 p-4 text-center">
        <p className="text-sm text-gray-600">&copy; {new Date().getFullYear()} MEDS Housing. All rights reserved.</p>
        <MadeWithDyad />
      </footer>
    </div>
  );
};

export default Index;