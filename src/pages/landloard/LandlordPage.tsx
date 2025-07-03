import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import { Button } from "@/components/ui/button";
import React from "react";
import { FaCheck, FaStar, FaRocket, FaCrown } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

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
              It's Time To List Your Property
            </h1>
            <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
              Thousands of apartments, houses, and condos for rent across
              Canada.
            </p>
            <div className="mt-10">
              <Link
                // to="/landlord/post-rental"
                to="/login"
                className="bg-white text-blue-700 font-semibold px-6 py-3 rounded shadow hover:bg-blue-100 transition"
              >
                Post a Rental
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/*  */}
      <div className="mx-10 bg-blue-100 px-16 rounded-lg py-12 mb-20">
        <div className="flex justify-between items-center gap-5 flex-col md:flex-row mb-16">
          <h3 className="text-4xl font-bold">
            Thousands of renters visit{" "}
            <span className="text-blue-500">ScrubHub</span> every day to find
            their new home.
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
            We help them find Yours
          </h2>
          <p className="text-center text-base font-medium">
            With over 20 years of expertise, Rentals.ca is dedicated to serving
            landlords, property managers, and renters nationwide. Join Canada's
            favourite platform for renters to discover your property
            effortlessly.
          </p>

          <Button variant="default">List your property</Button>
        </div>
      </div>

      {/* Plans and Pricing Section */}
      <section className="mb-20 px-10">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#3e4153] mb-1">
            Plans and Pricing
          </h2>
          <p className="text-gray-500 mb-6">
            Upgrade Your Listing to Move Faster
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-10 max-w-5xl mx-auto">
          {/* Limited Plan */}
          <div className="border border-blue-500 rounded-lg p-6 flex flex-col items-center shadow-sm bg-white">
            <span className="text-lg font-semibold mb-1">Limited</span>
            <span className="text-3xl font-bold text-blue-600 mb-1">$0</span>
            <span className="text-xs text-gray-400 mb-3">30 days</span>
            <div className="mb-3 text-blue-500">
              {/* <FaStar className="h-8 w-8 mx-auto" /> */}
              <img src="/public/building.png" alt="" className="w-16 mb-5" />
            </div>
            <ul className="w-full mb-4">
              <li className=" rounded px-3 py-1 text-sm mb-2 flex items-center gap-2">
                <FaCheck className="text-blue-500" /> Basic Listing
              </li>
              <li className=" rounded px-3 py-1 text-sm mb-2 flex items-center gap-2">
                <FaCheck className="text-blue-500" /> Visible in Search
              </li>
              <li className=" rounded px-3 py-1 text-sm flex items-center gap-2">
                <FaCheck className="text-blue-500" /> Standard Support
              </li>
            </ul>
            <button className="mt-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded transition-colors">
              Select Plan
            </button>
          </div>
          {/* Promoted Plan */}
          <div className="border border-blue-500 rounded-lg p-6 flex flex-col items-center shadow-md bg-white">
            <span className="text-lg font-semibold mb-1">Promoted</span>
            <span className="text-3xl font-bold text-blue-600 mb-1">$95</span>
            <span className="text-xs text-gray-400 mb-3">7 days</span>
            <div className="mb-3 text-yellow-500">
              <img src="/public/building 2.png" alt="" className="w-16 mb-5" />
            </div>
            <ul className="w-full mb-4">
              <li className=" rounded px-3 py-1 text-sm mb-2 flex items-center gap-2">
                <FaCheck className="text-blue-500" /> Highlighted Listing
              </li>
              <li className=" rounded px-3 py-1 text-sm mb-2 flex items-center gap-2">
                <FaCheck className="text-blue-500" /> Top of Search Results
              </li>
              <li className=" rounded px-3 py-1 text-sm mb-2 flex items-center gap-2">
                <FaCheck className="text-blue-500" /> Priority Support
              </li>
              <li className=" rounded px-3 py-1 text-sm mb-2 flex items-center gap-2">
                <FaCheck className="text-blue-500" /> Promoted Badge on Listing
              </li>
              <li className=" rounded px-3 py-1 text-sm flex items-center gap-2">
                <FaCheck className="text-blue-500" /> Increased Inquiries
              </li>
            </ul>
            <button className="mt-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded transition-colors">
              Select Plan
            </button>
          </div>
          {/* Featured Plan */}
          <div className="border border-blue-500 rounded-lg p-6 flex flex-col items-center shadow-lg bg-white">
            <span className="text-lg font-semibold mb-1">Featured</span>
            <span className="text-3xl font-bold text-blue-600 mb-1">$199</span>
            <span className="text-xs text-gray-400 mb-3">3 days</span>
            <div className="mb-3 text-pink-500">
              <img src="/public/building 3.png" alt="" className="w-16 mb-5" />
            </div>
            <ul className="w-full mb-4">
              <li className=" rounded px-3  text-sm mb-2 flex items-center gap-2">
                <FaCheck className="text-blue-500" /> Premium Placement
              </li>
              <li className=" rounded px-3  text-sm mb-2 flex items-center gap-2">
                <FaCheck className="text-blue-500" /> Maximum Visibility
              </li>
              <li className=" rounded px-3  text-sm mb-2 flex items-center gap-2">
                <FaCheck className="text-blue-500" /> 24/7 Dedicated Support
              </li>
              <li className=" rounded px-3  text-sm mb-2 flex items-center gap-2">
                <FaCheck className="text-blue-500" /> Featured Badge on Listing
              </li>
              <li className=" rounded px-3  text-sm flex items-center gap-2">
                <FaCheck className="text-blue-500" /> Highest Priority in Search
              </li>
            </ul>
            <button className="mt-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded transition-colors">
              Select Plan
            </button>
          </div>
        </div>
      </section>

      {/* Clients */}
      <section className="mb-24 px-10 text-center">
        <div className="text-center mb-16">
          <h2 className="text-2xl font-bold text-[#3e4153] mb-1">
            Our Customers
          </h2>
          <p className="text-gray-500">
            What other landlords like you have to say
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
                    Great rental site. Got lots of leads. I like that you can
                    pause an advert. It saves a lot of time with a rental that
                    gets re-listed every year. Information about the
                    neighbourhood is a smart feature for prospective tenants.
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
                    The platform is easy to use and helped me find reliable
                    tenants quickly. The support team was responsive and helpful
                    throughout the process.
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
                    I appreciate the detailed analytics and the ability to
                    manage multiple listings in one place. Highly recommended
                    for busy landlords!
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
