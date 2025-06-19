// import React, { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";
// import {
//   Breadcrumb,
//   BreadcrumbList,
//   BreadcrumbItem,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import { ChevronRight, ChevronLeft } from "lucide-react";

// const MAX_TITLE_LENGTH = 70;

// const MAIN_CATEGORIES = [
//   { label: "Buy & Sell", icon: "🛒" },
//   { label: "Cars & Vehicles", icon: "🚗" },
//   { label: "Real Estate", icon: "🏠" },
//   { label: "Jobs", icon: "💼" },
//   { label: "Services", icon: "🛠️" },
//   { label: "Pets", icon: "🐾" },
//   { label: "Community", icon: "🤝" },
//   { label: "Vacation Rentals", icon: "🏖️" },
// ];

// const SUBCATEGORIES: Record<string, { label: string; children?: string[] }[]> =
//   {
//     "Buy & Sell": [
//       { label: "Arts & Collectibles" },
//       { label: "Audio" },
//       { label: "Baby Items" },
//       { label: "Bikes", children: ["Honda", "Pulsar", "Yamaha"] },
//       { label: "Books" },
//       { label: "Business & Industrial" },
//       { label: "Cameras & Camcorders" },
//       { label: "Clothing" },
//     ],
//     // Add more subcategories for other main categories as needed
//   };

// const PRIMARY_COLOR = "#ffb300"; // Kijiji yellow/orange

// const PostAdPage: React.FC = () => {
//   const [step, setStep] = useState<0 | 1 | 2>(0);
//   const [title, setTitle] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
//   const [categoryStack, setCategoryStack] = useState<string[]>([]);

//   // Helper for subcategory navigation
//   const currentSubcategories =
//     selectedCategory && SUBCATEGORIES[selectedCategory]
//       ? SUBCATEGORIES[selectedCategory]
//       : [];
//   const currentStack = categoryStack.length
//     ? categoryStack[categoryStack.length - 1]
//     : null;
//   const nestedSubcategories = currentStack
//     ? currentSubcategories.find((c) => c.label === currentStack)?.children || []
//     : [];

//   // Step transitions
//   const goToNext = () => setStep((s) => (s < 2 ? ((s + 1) as 0 | 1 | 2) : s));
//   const goToPrev = () => setStep((s) => (s > 0 ? ((s - 1) as 0 | 1 | 2) : s));

//   // Animation helpers
//   const transitionClass =
//     "transition-all duration-300 ease-in-out animate-fade-in";

//   // Step 1: Title Input
//   const renderTitleStep = () => (
//     <div
//       className={`max-w-lg mx-auto bg-white rounded-xl shadow p-6 ${transitionClass}`}
//     >
//       <h1 className="text-3xl font-bold mb-4">Post Ad</h1>
//       <label htmlFor="ad-title" className="block font-semibold mb-2">
//         Ad title
//       </label>
//       <Input
//         id="ad-title"
//         maxLength={MAX_TITLE_LENGTH}
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         placeholder="What are you selling?"
//         className="mb-1 text-lg"
//         autoFocus
//       />
//       <div className="text-xs text-gray-500 mb-2 flex justify-between">
//         <span>{MAX_TITLE_LENGTH - title.length} characters left</span>
//         <span className="text-gray-400">Max {MAX_TITLE_LENGTH}</span>
//       </div>
//       <Separator className="my-4" />
//       <div className="flex items-center justify-end gap-2">
//         <Button
//           onClick={goToNext}
//           disabled={title.trim().length < 5}
//           style={{ background: PRIMARY_COLOR, color: "#222" }}
//         >
//           Next
//         </Button>
//       </div>
//       <div className="text-xs text-gray-600 mt-2">
//         Descriptive titles are the best fuel for high-performing ads!
//       </div>
//       <div className="text-xs text-gray-400 mt-1">
//         Selling a car or truck? Try including make, model, and year.
//       </div>
//     </div>
//   );

//   // Step 2: Category Selection
//   const renderCategoryStep = () => (
//     <div
//       className={`max-w-2xl mx-auto bg-white rounded-xl shadow p-6 ${transitionClass}`}
//     >
//       <h1 className="text-3xl font-bold mb-6">Select a category</h1>
//       <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
//         {MAIN_CATEGORIES.map((cat) => (
//           <Card
//             key={cat.label}
//             onClick={() => {
//               setSelectedCategory(cat.label);
//               setStep(2);
//               setCategoryStack([]);
//             }}
//             className={`flex flex-col items-center justify-center p-6 cursor-pointer border-2 transition-all hover:shadow-md hover:border-[${PRIMARY_COLOR}] ${
//               selectedCategory === cat.label
//                 ? `border-[${PRIMARY_COLOR}] bg-yellow-50`
//                 : "bg-white"
//             }`}
//             style={{
//               borderColor:
//                 selectedCategory === cat.label ? PRIMARY_COLOR : undefined,
//             }}
//           >
//             <span className="text-3xl mb-2">{cat.icon}</span>
//             <span className="font-semibold text-base text-center">
//               {cat.label}
//             </span>
//           </Card>
//         ))}
//       </div>
//       <div className="flex items-center justify-between">
//         <Button
//           variant="ghost"
//           onClick={goToPrev}
//           className="flex items-center gap-1"
//         >
//           <ChevronLeft className="w-4 h-4" /> Back
//         </Button>
//       </div>
//     </div>
//   );

//   // Step 3: Subcategory Selection
//   const renderSubcategoryStep = () => (
//     <div
//       className={`max-w-2xl mx-auto bg-white rounded-xl shadow p-6 ${transitionClass}`}
//     >
//       <div className="flex items-center mb-4">
//         <Button
//           variant="ghost"
//           onClick={() => {
//             if (categoryStack.length > 0) {
//               setCategoryStack((stack) => stack.slice(0, -1));
//             } else {
//               setStep(1);
//               setSelectedCategory(null);
//             }
//           }}
//           className="mr-2"
//         >
//           <ChevronLeft className="w-4 h-4" />
//         </Button>
//         <Breadcrumb>
//           <BreadcrumbList>
//             <BreadcrumbItem>
//               <span className="font-semibold">{selectedCategory}</span>
//             </BreadcrumbItem>
//             {categoryStack.map((crumb, idx) => (
//               <React.Fragment key={crumb}>
//                 <BreadcrumbSeparator />
//                 <BreadcrumbItem>
//                   <span className="font-semibold">{crumb}</span>
//                 </BreadcrumbItem>
//               </React.Fragment>
//             ))}
//           </BreadcrumbList>
//         </Breadcrumb>
//       </div>
//       <h1 className="text-2xl font-bold mb-4">Select a category</h1>
//       <div className="max-h-72 overflow-y-auto divide-y divide-gray-100 rounded-lg border border-gray-100 bg-gray-50">
//         {categoryStack.length === 0
//           ? currentSubcategories.map((sub) => (
//               <div
//                 key={sub.label}
//                 className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-yellow-50 transition group"
//                 onClick={() => {
//                   if (sub.children && sub.children.length > 0) {
//                     setCategoryStack((stack) => [...stack, sub.label]);
//                   } else {
//                     // Final subcategory selected
//                     // TODO: handle selection
//                   }
//                 }}
//               >
//                 <span className="text-base font-medium">{sub.label}</span>
//                 {sub.children && (
//                   <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-yellow-600 transition" />
//                 )}
//               </div>
//             ))
//           : nestedSubcategories.map((sub) => (
//               <div
//                 key={sub}
//                 className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-yellow-50 transition group"
//                 onClick={() => {
//                   // Final subcategory selected
//                   // TODO: handle selection
//                 }}
//               >
//                 <span className="text-base font-medium">{sub}</span>
//               </div>
//             ))}
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 py-8 px-2">
//       {step === 0 && renderTitleStep()}
//       {step === 1 && renderCategoryStep()}
//       {step === 2 && selectedCategory && renderSubcategoryStep()}
//     </div>
//   );
// };

// export default PostAdPage;
import LocationSelector from "@/components/LocationSelector";
import { useState } from "react";

// Types
type Category = {
  id: string;
  name: string;
  hasSubcategories?: boolean;
  subcategories?: Category[];
};

type AdData = {
  title: string;
  category?: string;
  subcategory?: string;
  brand?: string;
};

// Mock data (now with full sub-subcategories)
const CATEGORIES: Category[] = [
  {
    id: "buy-sell",
    name: "Buy & Sell",
    hasSubcategories: true,
    subcategories: [
      {
        id: "arts",
        name: "Arts & Collectibles",
        hasSubcategories: true,
        subcategories: [
          { id: "paintings", name: "Paintings" },
          { id: "sculptures", name: "Sculptures" },
        ],
      },
      { id: "audio", name: "Audio" },
      { id: "baby", name: "Baby Items" },
      {
        id: "bikes",
        name: "Bikes",
        hasSubcategories: true,
        subcategories: [
          { id: "honda", name: "Honda" },
          { id: "pulsar", name: "Pulsar" },
        ],
      },
    ],
  },
  { id: "cars", name: "Cars & Vehicles" },
  { id: "real-estate", name: "Real Estate" },
];

const MAX_TITLE_LENGTH = 50;

export default function PostAdFlow() {
  const [stepHistory, setStepHistory] = useState<
    Array<"title" | "category" | "subcategory" | "brand" | "location">
  >(["title"]);
  const [adData, setAdData] = useState<AdData>({ title: "" });
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [selectedSubcategory, setSelectedSubcategory] =
    useState<Category | null>(null);

  const currentStep = stepHistory[stepHistory.length - 1];

  const goToStep = (newStep: typeof currentStep) => {
    setStepHistory([...stepHistory, newStep]);
  };

  const goBack = () => {
    if (stepHistory.length > 1) {
      setStepHistory(stepHistory.slice(0, -1));
    }
  };

  const handleTitleSubmit = () => {
    if (adData.title.trim().length > 0) {
      goToStep("category");
    }
  };

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
    if (category.hasSubcategories && category.subcategories) {
      goToStep("subcategory");
    } else {
      setAdData({ ...adData, category: category.id });
      // goToStep('details');
    }
  };

  const handleSubcategorySelect = (subcategory: Category) => {
    setSelectedSubcategory(subcategory);
    if (subcategory.hasSubcategories && subcategory.subcategories) {
      goToStep("brand");
    } else {
      setAdData({ ...adData, subcategory: subcategory.id });
      // goToStep('details');
    }
  };

  const handleBrandSelect = (brand: Category) => {
    setAdData({ ...adData, brand: brand.id });

    goToStep("location");
  };

  // Renders the back button (except on the first step)
  const renderBackButton = () =>
    stepHistory.length > 1 && (
      <button
        onClick={goBack}
        className="text-blue-500 hover:text-blue-700 mb-4 flex items-center"
      >
        ← Back
      </button>
    );

  const renderTitleStep = () => (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Post Ad</h1>

      <div className="mb-4">
        <label htmlFor="ad-title" className="block font-medium mb-2">
          Ad title
        </label>
        <input
          id="ad-title"
          type="text"
          className="w-full p-2 border rounded"
          value={adData.title}
          onChange={(e) => setAdData({ ...adData, title: e.target.value })}
          maxLength={MAX_TITLE_LENGTH}
          placeholder="What are you selling?"
        />
        <div className="text-right text-sm text-gray-500">
          {MAX_TITLE_LENGTH - adData.title.length}
        </div>
      </div>

      <hr className="my-4" />

      <button
        onClick={handleTitleSubmit}
        disabled={!adData.title.trim()}
        className="bg-blue-500 text-white px-4 py-2 rounded float-right disabled:bg-gray-300"
      >
        Next
      </button>

      <p className="text-sm text-gray-500 mt-12">
        Descriptive titles are the best fuel for high performing ads!
      </p>
      <p className="text-sm text-gray-500 mt-1">Selling a car or truck?</p>
    </div>
  );

  const renderCategoryStep = () => (
    <div className="max-w-md mx-auto p-4">
      {renderBackButton()}
      <h1 className="text-2xl font-bold mb-6">Select a category</h1>

      <div className="grid grid-cols-2 gap-4">
        {CATEGORIES.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategorySelect(category)}
            className="p-4 border rounded-lg hover:bg-gray-50 text-left"
          >
            {category.name}
            {category.hasSubcategories && (
              <span className="float-right">›</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );

  const renderSubcategoryStep = () => (
    <div className="max-w-md mx-auto p-4">
      {renderBackButton()}
      <h1 className="text-2xl font-bold mb-6">Select a subcategory</h1>
      <h2 className="text-lg font-medium mb-4">{selectedCategory?.name}</h2>

      <div className="space-y-2">
        {selectedCategory?.subcategories?.map((subcategory) => (
          <button
            key={subcategory.id}
            onClick={() => handleSubcategorySelect(subcategory)}
            className="w-full p-3 border-b flex justify-between items-center hover:bg-gray-50"
          >
            {subcategory.name}
            {subcategory.hasSubcategories && <span>›</span>}
          </button>
        ))}
      </div>
    </div>
  );

  const renderBrandStep = () => (
    <div className="max-w-md mx-auto p-4">
      {renderBackButton()}
      <h1 className="text-2xl font-bold mb-6">Select a brand</h1>
      <h2 className="text-lg font-medium mb-4">
        {selectedCategory?.name} › {selectedSubcategory?.name}
      </h2>

      <div className="space-y-2">
        {selectedSubcategory?.subcategories?.map((brand) => (
          <button
            key={brand.id}
            onClick={() => handleBrandSelect(brand)}
            className="w-full p-3 border-b flex justify-between items-center hover:bg-gray-50"
          >
            {brand.name}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {currentStep === "title" && renderTitleStep()}
      {currentStep === "category" && renderCategoryStep()}
      {currentStep === "subcategory" && renderSubcategoryStep()}
      {currentStep === "brand" && renderBrandStep()}
      {currentStep === "location" && (
        <div className="mt-8">
          <LocationSelector />
        </div>
      )}
    </div>
  );
}
