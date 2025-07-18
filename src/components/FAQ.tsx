import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQItem } from '@/types/property'; // Re-using property.ts for FAQItem type
import { useTranslation } from 'react-i18next';

const FAQ = () => {
  const { t } = useTranslation();
  const faqData = [
    {
      question: t('faq.q1'),
      answer: t('faq.a1'),
    },
    {
      question: t('faq.q2'),
      answer: t('faq.a2'),
    },
    {
      question: t('faq.q3'),
      answer: t('faq.a3'),
    },
    {
      question: t('faq.q4'),
      answer: t('faq.a4'),
    },
  ];
  return (
    <section className="pb-12 bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
      <div className="container mx-auto px-4 ">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-[hsl(var(--foreground))] mb-8 text-center">
          {t('faq.title')}
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {faqData.map((item, index) => (
            <AccordionItem value={`item-${index}`} key={index} className="border-[hsl(var(--border))]">
              <AccordionTrigger className="text-left text-base md:text-lg hover:no-underline text-[hsl(var(--foreground))]">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 dark:text-[hsl(var(--muted-foreground))] text-sm md:text-base">
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