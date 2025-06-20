import LocationSelector from "@/components/LocationSelector";
import { useState } from "react";
import { FaRegLightbulb, FaArrowLeft } from "react-icons/fa";

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
      goToStep("location");
    }
  };

  const handleSubcategorySelect = (subcategory: Category) => {
    setSelectedSubcategory(subcategory);
    if (subcategory.hasSubcategories && subcategory.subcategories) {
      goToStep("brand");
    } else {
      setAdData({ ...adData, subcategory: subcategory.id });
      goToStep("location");
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
        className="text-blue-500 font-semibold hover:text-blue-700 mt-10 flex items-center gap-2"
      >
        <FaArrowLeft />
        <span> Back</span>
      </button>
    );

  const renderTitleStep = () => (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Post Ad</h1>

      <div className="mb-4">
        <label htmlFor="ad-title" className="block text-gray-500 mb-2">
          Ad title
        </label>
        <textarea
          id="ad-title"
          className="w-full p-2 border rounded focus-within:outline-blue-500 ring-0 focus:border-blue-200 focus:ring-0 "
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
        className="bg-blue-500 text-white flex w-full justify-center mb-5 px-4 py-2 rounded float-right disabled:bg-gray-300"
      >
        Next
      </button>

      <div className="border border-blue-200 px-6 rounded-md py-4 flex items-center gap-4">
        <FaRegLightbulb className="text-blue-500 text-3xl" />
        <p className="text-sm text-gray-500 ">
          Descriptive titles are the best fuel for high performing ads!
        </p>
      </div>
      <p className="text-sm text-gray-500 mt-3 text-center">
        Selling a car or truck?
      </p>
    </div>
  );

  const renderCategoryStep = () => (
    <div className="max-w-md mx-auto p-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-6 text-gray-600">
          Select a category
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {CATEGORIES.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategorySelect(category)}
            className="p-2.5 border text-sm rounded-lg hover:bg-gray-50 text-left"
          >
            {category.name}
            {category.hasSubcategories && (
              <span className="float-right">›</span>
            )}
          </button>
        ))}
      </div>
      {renderBackButton()}
    </div>
  );

  const renderSubcategoryStep = () => (
    <div className="max-w-md mx-auto p-4">
      <h3 className="text-lg font-semibold mb-6 text-gray-600">
        Select a subcategory
      </h3>
      <h4 className="text-md font-semibold mb-6 text-gray-800">
        {selectedCategory?.name}
      </h4>

      <div className="space-y-2">
        {selectedCategory?.subcategories?.map((subcategory) => (
          <button
            key={subcategory.id}
            onClick={() => handleSubcategorySelect(subcategory)}
            className="w-full p-2.5 border-b flex justify-between items-center text-sm hover:bg-gray-50"
          >
            {subcategory.name}
            {subcategory.hasSubcategories && <span>›</span>}
          </button>
        ))}
      </div>

      {renderBackButton()}
    </div>
  );

  const renderBrandStep = () => (
    <div className="max-w-md mx-auto p-4">
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
      {renderBackButton()}
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
