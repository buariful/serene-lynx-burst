import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQItem } from '@/types/property'; // Re-using property.ts for FAQItem type

const faqData: FAQItem[] = [
  {
    question: "How do I list my rental property on Rentals.ca?",
    answer: "Sign up or log in as a landlord. You can then easily create and publish your rental listing in minutes through our user-friendly dashboard.",
  },
  {
    question: "Are there any fees for tenants to use Rentals.ca?",
    answer: "No! Searching for properties, viewing listings, and applying for rentals are completely free for tenants.",
  },
  {
    question: "What is RentReport™?",
    answer: "RentReport™ is a service offered by Rentals.ca that allows tenants to report their rent payments to credit bureaus, helping them build their credit history.",
  },
  {
    question: "How can I find rentals near a specific hospitalsor schools?",
    answer: "Use our advanced search filters or browse our dedicated sections for rentals near medical institutions and schools. You can also search by address or landmark.",
  }
];

const FAQ = () => {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
          Need Help? Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {faqData.map((item, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger className="text-left text-base md:text-lg hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 text-sm md:text-base">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;