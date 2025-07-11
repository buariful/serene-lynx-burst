import React, { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./button";
import { ChevronDown } from "lucide-react";
import * as Slider from "@radix-ui/react-slider";
import { LuBuilding } from "react-icons/lu";
import { BiBuildings } from "react-icons/bi";
import { TbBuildingBank, TbBed } from "react-icons/tb";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { toast } from "sonner";
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

const NavSearchFilter: React.FC = () => {
  const [isPriceRangeOpen, setPriceRangeOpen] = useState(false);
  const [isAptTypeOpen, setAptTypeOpen] = useState(false);
  const [isBedTypeOpen, setBedTypeOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 3900]);
  const [selectedAptType, setSelectedAptType] = useState<number>();
  const [selectedBedType, setSelectedBedType] = useState<number | string>();
  const [searchTerm, setSearchTerm] = useState("");
  const { t } = useTranslation();
  const location = useLocation();

  // Pre-populate search term from URL state
  useEffect(() => {
    if (location.state && location.state.searchTerm) {
      setSearchTerm(location.state.searchTerm);
    }
  }, [location.state]);

  const apartmentTypes = [
    { id: 1, name: t('navSearchFilter.allApartments'), icon: LuBuilding },
    { id: 2, name: t('navSearchFilter.allCondos'), icon: BiBuildings },
    { id: 3, name: t('navSearchFilter.allHouses'), icon: TbBuildingBank },
    { id: 4, name: t('navSearchFilter.rooms'), icon: TbBed },
  ];

  const renderBedFilter = () => (
    <div className="w-full space-y-4 p-4">
      <p className="mb-1 text-blue-500 font-semibold">{t('navSearchFilter.bedrooms')}</p>
      <div className="flex items-center flex-wrap gap-3">
        {[0, 1, 2, 3, "4+"]?.map((item) => (
          <div key={item}>
            <button
              onClick={() => setSelectedBedType(item)}
              className={`flex text-sm px-2 py-1 rounded-full border items-center gap-1 ${
                selectedBedType === item ? "bg-blue-500 text-white" : ""
              }`}
            >
              <span>{item}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAptTypeFilter = () => (
    <div className="w-full space-y-4 p-4">
      <p className="mb-1 text-blue-500 font-semibold">{t('navSearchFilter.propertyType')}</p>
      <div className="flex items-center flex-wrap gap-3">
        {apartmentTypes?.map((item) => (
          <div key={item?.id}>
            <button
              onClick={() => setSelectedAptType(item.id)}
              className={`flex text-sm px-2 py-1 rounded-full border items-center gap-1 ${
                selectedAptType === item.id ? "bg-blue-500 text-white" : ""
              }`}
            >
              <item.icon />
              <span>{item.name}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPriceFilter = () => (
    <div className="w-full space-y-4 p-4">
      <p>{t('navSearchFilter.rentPrice')}</p>
      <div className="flex justify-between items-center text-sm font-medium">
        <span>${priceRange[0]}</span>
        <span>${priceRange[1]}</span>
      </div>
      <Slider.Root
        className="relative flex h-5 w-full touch-none select-none items-center"
        defaultValue={priceRange}
        onValueCommit={(value) => setPriceRange(value as [number, number])}
        max={5000}
        step={100}
      >
        <Slider.Track className="relative h-1 w-full grow rounded-full bg-gray-200">
          <Slider.Range className="absolute h-full rounded-full bg-blue-500" />
        </Slider.Track>
        <Slider.Thumb className="block h-4 w-4 rounded-full border-2 border-blue-500 bg-white shadow-md" />
        <Slider.Thumb className="block h-4 w-4 rounded-full border-2 border-blue-500 bg-white shadow-md" />
      </Slider.Root>
    </div>
  );

  return (
    <div className="px-10 mx-auto p-4 rounded-lg shadow-sm">
      <div className="flex items-center gap-5 justify-between">
        <div className="flex items-center gap-3">
          {/* Search input with icon */}
          <div className="flex items-center border rounded-full border-gray-300 w-72 bg-gray-200">
            <span className="px-2">
              <CiSearch strokeWidth={2} className="text-blue-500" />
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t('navSearchFilter.searchPlaceholder')}
              className="flex-1 text-sm outline-none bg-gray-200 text-gray-700 placeholder-gray-400 py-2 h-full rounded-full pl-1"
            />
          </div>

          {/* Individual Popovers */}
          <Popover open={isPriceRangeOpen} onOpenChange={setPriceRangeOpen}>
            <PopoverTrigger asChild>
              <Button variant="ghost">
                {t('navSearchFilter.rent')} <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
            </PopoverTrigger>
            <PopoverContent sideOffset={8} align="center" className="w-80">
              {renderPriceFilter()}
            </PopoverContent>
          </Popover>

          <Popover open={isAptTypeOpen} onOpenChange={setAptTypeOpen}>
            <PopoverTrigger asChild>
              <Button variant="ghost">
                {t('navSearchFilter.type')} <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
            </PopoverTrigger>
            <PopoverContent sideOffset={8} align="center" className="w-80">
              {renderAptTypeFilter()}
            </PopoverContent>
          </Popover>

          <Popover open={isBedTypeOpen} onOpenChange={setBedTypeOpen}>
            <PopoverTrigger asChild>
              <Button variant="ghost">
                {t('navSearchFilter.beds')} <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
            </PopoverTrigger>
            <PopoverContent sideOffset={8} align="center" className="w-72">
              {renderBedFilter()}
            </PopoverContent>
          </Popover>

          {/* All Filters Drawer */}
          <Drawer direction="right">
            <DrawerTrigger asChild>
              <Button variant="outline">{t('navSearchFilter.allFilters')}</Button>
            </DrawerTrigger>
            <DrawerContent className="h-full w-96">
              <DrawerHeader>
                <DrawerTitle>{t('navSearchFilter.allFilters')}</DrawerTitle>
              </DrawerHeader>
              <div className="p-4 space-y-8">
                {renderPriceFilter()}
                {renderAptTypeFilter()}
                {renderBedFilter()}
              </div>
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button>{t('navSearchFilter.viewResults')}</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>

          {/* Save Alert Button */}
          <Button
            variant="default"
            onClick={() => toast.success("Alert saved successfully!")}
          >
            {t('navSearchFilter.saveAlert')}
          </Button>
        </div>

        <Drawer direction="right">
          <DrawerTrigger asChild>
            <Button variant="outline" className="bg-gray-200">
              {t('navSearchFilter.alerts')}
            </Button>
          </DrawerTrigger>
          <DrawerContent className="h-full w-96">
            <DrawerHeader>
              <DrawerTitle>{t('navSearchFilter.myAlerts')}</DrawerTitle>
            </DrawerHeader>
            <div className="p-4">
              <p className="text-gray-500 text-center text-lg">
                {t('navSearchFilter.noAlertsFound')}
              </p>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
};

export default NavSearchFilter;
