import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

interface ActionCardItem {
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
}

const actionCardData: ActionCardItem[] = [
  {
    title: "Buy a home",
    description: "Find your place with immersive photo experiences and the most listings, including things you won’t find anywhere else.",
    ctaText: "Browse homes",
    ctaLink: "/buy",
  },
  {
    title: "Sell a home",
    description: "No matter what path you take to sell your home, we can help you navigate a successful sale.",
    ctaText: "See your options",
    ctaLink: "/sell",
  },
  {
    title: "Rent a home",
    description: "We’re creating a seamless online experience – from shopping on the largest rental network, to applying, to paying rent.",
    ctaText: "Find rentals",
    ctaLink: "/rent",
  },
];

const ActionCards = () => {
  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {actionCardData.map((cardItem) => (
            <Card key={cardItem.title} className="flex flex-col">
              <CardHeader>
                <CardTitle className="text-xl">{cardItem.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription>{cardItem.description}</CardDescription>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full border-blue-600 text-blue-600 hover:bg-blue-50 hover:text-blue-700">
                  <a href={cardItem.ctaLink}>
                    {cardItem.ctaText} <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
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