import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface ActionCardItem {
  imageUrl: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

const actionCardData: ActionCardItem[] = [
  {
    imageUrl: "https://placehold.co/600x400/E2E8F0/4A5568?text=Modern+Living",
    title: "Discover Modern Living Spaces",
    description: "Explore a curated selection of contemporary apartments and homes designed for comfort and style. Perfect for your lifestyle.",
    buttonText: "Explore Properties",
    buttonLink: "/search-results?type=modern",
  },
  {
    imageUrl: "https://placehold.co/600x400/D1D5DB/374151?text=Student+Housing",
    title: "Convenient Student Housing",
    description: "Find safe and affordable housing options near medical schools and hospitals. Focus on your studies, we'll handle the rest.",
    buttonText: "Find Student Rentals",
    buttonLink: "/search-results?category=student",
  },
  {
    imageUrl: "https://placehold.co/600x400/9CA3AF/1F2937?text=Easy+Relocation",
    title: "Seamless Relocation Services",
    description: "Relocating for a new role or residency? We offer specialized services to make your move smooth and stress-free.",
    buttonText: "Learn About Relocation",
    buttonLink: "/relocation-services",
  },
];

const ActionCards = () => {
  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Find Your Ideal Rental
          </h2>
          <p className="text-lg text-gray-600 mt-2">
            Tailored solutions for medical professionals, students, and everyone in between.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {actionCardData.map((cardItem, index) => (
            <Card key={index} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-0">
                <img 
                  src={cardItem.imageUrl} 
                  alt={cardItem.title} 
                  className="w-full h-48 object-cover" // Adjust height as needed
                />
              </CardContent>
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800">{cardItem.title}</CardTitle>
                <CardDescription className="text-gray-600 mt-1 h-20 overflow-hidden"> {/* Fixed height for description */}
                  {cardItem.description}
                </CardDescription>
              </CardHeader>
              <CardFooter className="mt-auto pt-0"> {/* mt-auto pushes footer to bottom, pt-0 removes extra padding if CardHeader has enough */}
                <Button asChild variant="primary" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  <Link to={cardItem.buttonLink}>{cardItem.buttonText}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ActionCards;