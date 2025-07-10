import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import { Button } from "@/components/ui/button";
import React from "react";
import { FaCheck, FaStar, FaRocket, FaCrown } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { toast } from "@/hooks/use-toast";
import { useTranslation } from 'react-i18next';

const featuredListings = [
  {
    id: 1,
    title: "Modern 2BR Condo in Downtown Toronto",
    location: "Toronto, ON",
    price: "$2,400/mo",
  },
  {
    id: 2,
    title: "Spacious 1BR Apartment near UBC",
    location: "Vancouver, BC",
    price: "$1,900/mo",
  },
  {
    id: 3,
    title: "Family Home in Ottawa South",
    location: "Ottawa, ON",
    price: "$2,800/mo",
  },
];

const LandlordPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div className="">
      <Header />
      <div className="bg-gray-50 mb-20">
        {/* Hero Section */}
        <div
          className="relative bg-cover bg-center py-32 md:py-48"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop')",
          }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative container mx-auto px-4 text-center z-10">
            <h1 className="text-4xl md:text-6xl font-bold text-white">
              {t('landlordPage.heroTitle')}
            </h1>
            <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
              {t('landlordPage.heroSubtitle')}
            </p>
            <div className="mt-10">
              <Link
                // to="/landlord/post-rental"
                to="/login"
                className="bg-white text-blue-700 font-semibold px-6 py-3 rounded shadow hover:bg-blue-100 transition"
              >
                {t('landlordPage.postRental')}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/*  */}
      <div className="mx-10 bg-blue-100 px-16 rounded-lg py-12 mb-20">
        <div className="flex justify-between items-center gap-5 flex-col md:flex-row mb-16">
          <h3 className="text-4xl font-bold">
            {t('landlordPage.visitorsTitle')}{" "}
            <span className="text-blue-500">ScrubHub</span> {t('landlordPage.visitorsSubtitle')}
          </h3>

          <div>
            <img
              src="https://www.moderngardenrooms.com/wp-content/uploads/2022/03/garden-room-bedroom-3-scaled.jpg"
              alt=""
              className="w-80 lg:w-[500px] h-auto rounded"
            />
          </div>
        </div>

        <div className="max-w-[700px] mx-auto flex flex-col items-center space-y-10">
          <h2 className="text-blue-500 font-bold text-5xl">
            {t('landlordPage.helpTitle')}
          </h2>
          <p className="text-center text-base font-medium">
            {t('landlordPage.helpDescription')}
          </p>

          <Button variant="default" onClick={() => navigate("/login")}>
            {t('landlordPage.listProperty')}
          </Button>
        </div>
      </div>

      {/* Plans and Pricing Section */}
      <section className="mb-20 px-10">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#3e4153] mb-1">
            {t('landlordPage.plansTitle')}
          </h2>
          <p className="text-gray-500 mb-6">
            {t('landlordPage.plansSubtitle')}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-10 max-w-5xl mx-auto">
          {/* Limited Plan */}
          <div className="border border-blue-500 rounded-lg p-6 flex flex-col items-center shadow-sm bg-white">
            <span className="text-lg font-semibold mb-1">{t('landlordPage.limited')}</span>
            <span className="text-3xl font-bold text-blue-600 mb-1">$0</span>
            <span className="text-xs text-gray-400 mb-3">30 {t('landlordPage.days')}</span>
            <div className="mb-3 text-blue-500">
              {/* <FaStar className="h-8 w-8 mx-auto" /> */}
              <img src="/public/building.png" alt="" className="w-16 mb-5" />
            </div>
            <ul className="w-full mb-4">
              <li className=" rounded px-3 py-1 text-sm mb-2 flex items-center gap-2">
                <FaCheck className="text-blue-500" /> {t('landlordPage.basicListing')}
              </li>
              <li className=" rounded px-3 py-1 text-sm mb-2 flex items-center gap-2">
                <FaCheck className="text-blue-500" /> {t('landlordPage.visibleInSearch')}
              </li>
              <li className=" rounded px-3 py-1 text-sm flex items-center gap-2">
                <FaCheck className="text-blue-500" /> {t('landlordPage.standardSupport')}
              </li>
            </ul>
            <button
              className="mt-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded transition-colors"
              onClick={() =>
                toast({
                  title: "Success",
                  description: "Limited plan selected!",
                })
              }
            >
              {t('landlordPage.selectPlan')}
            </button>
          </div>
          {/* Promoted Plan */}
          <div className="border border-blue-500 rounded-lg p-6 flex flex-col items-center shadow-md bg-white">
            <span className="text-lg font-semibold mb-1">{t('landlordPage.promoted')}</span>
            <span className="text-3xl font-bold text-blue-600 mb-1">$95</span>
            <span className="text-xs text-gray-400 mb-3">7 {t('landlordPage.days')}</span>
            <div className="mb-3 text-yellow-500">
              <img src="/public/building 2.png" alt="" className="w-16 mb-5" />
            </div>
            <ul className="w-full mb-4">
              <li className=" rounded px-3 py-1 text-sm mb-2 flex items-center gap-2">
                <FaCheck className="text-blue-500" /> {t('landlordPage.highlightedListing')}
              </li>
              <li className=" rounded px-3 py-1 text-sm mb-2 flex items-center gap-2">
                <FaCheck className="text-blue-500" /> {t('landlordPage.topOfSearch')}
              </li>
              <li className=" rounded px-3 py-1 text-sm mb-2 flex items-center gap-2">
                <FaCheck className="text-blue-500" /> {t('landlordPage.prioritySupport')}
              </li>
              <li className=" rounded px-3 py-1 text-sm mb-2 flex items-center gap-2">
                <FaCheck className="text-blue-500" /> {t('landlordPage.promotedBadge')}
              </li>
              <li className=" rounded px-3 py-1 text-sm flex items-center gap-2">
                <FaCheck className="text-blue-500" /> {t('landlordPage.increasedInquiries')}
              </li>
            </ul>
            <button
              className="mt-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded transition-colors"
              onClick={() =>
                toast({
                  title: "Success",
                  description: "Promoted plan selected!",
                })
              }
            >
              {t('landlordPage.selectPlan')}
            </button>
          </div>
          {/* Featured Plan */}
          <div className="border border-blue-500 rounded-lg p-6 flex flex-col items-center shadow-lg bg-white">
            <span className="text-lg font-semibold mb-1">{t('landlordPage.featured')}</span>
            <span className="text-3xl font-bold text-blue-600 mb-1">$199</span>
            <span className="text-xs text-gray-400 mb-3">3 {t('landlordPage.days')}</span>
            <div className="mb-3 text-pink-500">
              <img src="/public/building 3.png" alt="" className="w-16 mb-5" />
            </div>
            <ul className="w-full mb-4">
              <li className=" rounded px-3  text-sm mb-2 flex items-center gap-2">
                <FaCheck className="text-blue-500" /> {t('landlordPage.premiumPlacement')}
              </li>
              <li className=" rounded px-3  text-sm mb-2 flex items-center gap-2">
                <FaCheck className="text-blue-500" /> {t('landlordPage.maximumVisibility')}
              </li>
              <li className=" rounded px-3  text-sm mb-2 flex items-center gap-2">
                <FaCheck className="text-blue-500" /> {t('landlordPage.dedicatedSupport')}
              </li>
              <li className=" rounded px-3  text-sm mb-2 flex items-center gap-2">
                <FaCheck className="text-blue-500" /> {t('landlordPage.featuredBadge')}
              </li>
              <li className=" rounded px-3  text-sm flex items-center gap-2">
                <FaCheck className="text-blue-500" /> {t('landlordPage.highestPriority')}
              </li>
            </ul>
            <button
              className="mt-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded transition-colors"
              onClick={() =>
                toast({
                  title: "Success",
                  description: "Featured plan selected!",
                })
              }
            >
              {t('landlordPage.selectPlan')}
            </button>
          </div>
        </div>
      </section>

      {/* Clients */}
      <section className="mb-24 px-10 text-center">
        <div className="text-center mb-16">
          <h2 className="text-2xl font-bold text-[#3e4153] mb-1">
            {t('landlordPage.customersTitle')}
          </h2>
          <p className="text-gray-500">
            {t('landlordPage.customersSubtitle')}
          </p>
        </div>
        <div className="max-w-2xl mx-auto relative">
          <Carousel>
            <CarouselContent>
              <CarouselItem>
                <div className="">
                  <div className="flex items-center justify-center gap-3 mb-10">
                    <p className="w-16 h-16 rounded-full text-white text-3xl bg-blue-500 font-bold grid place-content-center">
                      R
                    </p>
                    <div className="">
                      <h2 className="text-3xl font-semibold mb-2">
                        Robert Judge
                      </h2>
                      <div className="flex text-blue-500 items-center gap-1">
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                      </div>
                    </div>
                  </div>
                  <p className="text-lg mx-auto max-w-2xl">
                    {t('landlordPage.testimonial1')}
                  </p>
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="">
                  <div className="flex items-center justify-center gap-3 mb-10">
                    <p className="w-16 h-16 rounded-full text-white text-3xl bg-green-500 font-bold grid place-content-center">
                      S
                    </p>
                    <div className="">
                      <h2 className="text-3xl font-semibold mb-2">
                        Samantha Lee
                      </h2>
                      <div className="flex text-blue-500 items-center gap-1">
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                      </div>
                    </div>
                  </div>
                  <p className="text-lg mx-auto max-w-2xl">
                    {t('landlordPage.testimonial2')}
                  </p>
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="">
                  <div className="flex items-center justify-center gap-3 mb-10">
                    <p className="w-16 h-16 rounded-full text-white text-3xl bg-purple-500 font-bold grid place-content-center">
                      M
                    </p>
                    <div className="">
                      <h2 className="text-3xl font-semibold mb-2">
                        Michael Chen
                      </h2>
                      <div className="flex text-blue-500 items-center gap-1">
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                      </div>
                    </div>
                  </div>
                  <p className="text-lg mx-auto max-w-2xl">
                    {t('landlordPage.testimonial3')}
                  </p>
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandlordPage;
