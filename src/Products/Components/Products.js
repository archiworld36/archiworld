import { ChevronLeft, ChevronRight, Settings2, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import Filters from "./Filters";
import { useLocation } from "wouter";
import logoBlack from "../../assets/Homepage/Banner/logoBlack.png";
import ProductCard from "../../Components/ProductCard";
import { MultiSelect } from "primereact/multiselect";
import { State } from "country-state-city";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../ProductsAPI";
import { useSearchParams } from "wouter";

const PRODUCTS_PER_PAGE = 24;

export default function ProductsPage({ searchTerm }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [, navigate] = useLocation();
  const [locationArea, setLocationArea] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [selectedSubSubCategories, setSelectedSubSubCategories] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState([]);
  const [lengthRange, setLengthRange] = useState([0, 200]);
  const [widthRange, setWidthRange] = useState([0, 200]);
  const [heightRange, setHeightRange] = useState([0, 200]);
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const dispatch = useDispatch();
  const { products, total, loading } = useSelector((state) => state.product);

  const totalPages = Math.ceil(total / PRODUCTS_PER_PAGE);
  const [searchParams] = useSearchParams();
  const searchParamsString = searchParams.toString();
  const currentCategory = searchParams.get("category") || "";
  const currentSubCategory = searchParams.get("subCategory") || "";
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const paramsObj = new URLSearchParams(searchParamsString);
    const hasCategory =
      paramsObj.get("category") || paramsObj.get("subCategory");
    if (!hasCategory) return;
    paramsObj.delete("category");
    paramsObj.delete("subCategory");
    navigate(`/products${paramsObj.toString()}`);
  }, [
    selectedLocations,
    selectedSubCategories,
    selectedSubSubCategories,
    selectedBrand,
    selectedMaterial,
    selectedColors,
    priceRange,
    lengthRange,
    widthRange,
    heightRange,
    navigate,
    searchParamsString, // ✅ SAFE
  ]);
  useEffect(() => {
    const payload = {
      page: currentPage,
      limit: 24,
      sortBy,
      search: searchTerm,
      locations: selectedLocations,
      category: currentCategory,
      subCategory: currentSubCategory,
      subCategories: selectedSubCategories,
      subSubCategories: selectedSubSubCategories,
      brands: selectedBrand,
      materials: selectedMaterial,
      colors: selectedColors,
    };

    if (priceRange[0] !== 0) payload.minPrice = priceRange[0];
    if (priceRange[1] !== 1000000) payload.maxPrice = priceRange[1];

    if (lengthRange[0] !== 0) payload.minLength = lengthRange[0];
    if (lengthRange[1] !== 200) payload.maxLength = lengthRange[1];

    if (widthRange[0] !== 0) payload.minWidth = widthRange[0];
    if (widthRange[1] !== 200) payload.maxWidth = widthRange[1];

    if (heightRange[0] !== 0) payload.minHeight = heightRange[0];
    if (heightRange[1] !== 200) payload.maxHeight = heightRange[1];

    dispatch(fetchProducts(payload));
  }, [
    dispatch,
    currentPage,
    sortBy,
    selectedLocations,
    currentCategory,
    currentSubCategory,
    selectedSubCategories,
    selectedSubSubCategories,
    selectedBrand,
    selectedMaterial,
    selectedColors,
    priceRange,
    lengthRange,
    widthRange,
    heightRange,
    searchTerm,
  ]);

  useEffect(() => {
    setCurrentPage(1);
  }, [
    selectedLocations,
    selectedSubCategories,
    selectedSubSubCategories,
    selectedBrand,
    selectedMaterial,
    selectedColors,
    priceRange,
    lengthRange,
    widthRange,
    heightRange,
    searchTerm,
  ]);

  useEffect(() => {
    // Load Indian states on mount
    const indianStates = State.getStatesOfCountry("IN").map((s) => ({
      label: s.name,
      value: s.name,
    }));
    setLocationArea([
      { label: "Pan India", value: "Pan India" }, // ✅ extra option
      ...indianStates,
    ]);
  }, []);

  const handleLocationChange = (value) => {
    if (value.includes("Pan India")) {
      setSelectedLocations(["Pan India"]);
    } else {
      setSelectedLocations(value);
    }
  };

  useEffect(() => {
    if (showMobileFilters) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showMobileFilters]);

  const getPages = () => {
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...");
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1, "...");
        pages.push(currentPage - 1, currentPage, currentPage + 1);
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const sortOptions = [
    { name: "Select", value: "" },
    { name: "Price: Low to High", value: "Price: Low to High" },
    { name: "Price: High to Low", value: "Price: High to Low" },
    { name: "Newest First", value: "Newest First" },
  ];

  return (
    <div className="text-black">
      {/* Main Layout */}
      <div className="flex flex-1 relative lg:px-[2vw] pb-10 gap-[2.8vw] lg:gap-[2.2vw]">
        {/* ================= LEFT FILTERS ================= */}
        {showFilters && (
          <div className="hidden lg:block lg:w-1/4 px-4 sticky h-full max-h-[calc(100vh-0.5rem)] top-2 overscroll-contain overflow-scroll">
            <Filters
              locationArea={locationArea}
              selectedLocations={selectedLocations}
              setSelectedLocations={setSelectedLocations}
              selectedSubCategories={selectedSubCategories}
              setSelectedSubCategories={setSelectedSubCategories}
              selectedSubSubCategories={selectedSubSubCategories}
              setSelectedSubSubCategories={setSelectedSubSubCategories}
              selectedColors={selectedColors}
              setSelectedColors={setSelectedColors}
              selectedMaterial={selectedMaterial}
              setSelectedMaterial={setSelectedMaterial}
              selectedBrand={selectedBrand}
              setSelectedBrand={setSelectedBrand}
              lengthRange={lengthRange}
              setLengthRange={setLengthRange}
              widthRange={widthRange}
              setWidthRange={setWidthRange}
              heightRange={heightRange}
              setHeightRange={setHeightRange}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
            />
          </div>
        )}
        {showMobileFilters && (
          <div className="block bg-white lg:hidden w-full fixed z-50 h-screen top-0 overflow-scroll">
            <div
              className={`w-full h-[70px] px-[3vw] pt-[20px] flex gap-[1.5625vw]`}
            >
              <img
                src={logoBlack}
                alt=""
                onClick={() => navigate("/")}
                className={`w-fit h-full z-50 relative cursor-pointer`}
              />

              <div className={`w-full h-full flex justify-end lg:hidden gap-4`}>
                <div
                  onClick={() => {
                    setShowMobileFilters(false);
                  }}
                  className={`flex w-fit z-50 h-full !aspect-square rounded-full p-4 text-black border border-[#9A9A9A] bg-white/10 backdrop-blur-sm shadow-[0_20px_50px_rgba(0,0,0,0.25)]`}
                >
                  <X className="w-full h-full" />
                </div>
              </div>
            </div>
            <div className="pt-5 bg-white w-full px-6">
              <Filters
                locationArea={locationArea}
                selectedLocations={selectedLocations}
                setSelectedLocations={setSelectedLocations}
                selectedSubCategories={selectedSubCategories}
                setSelectedSubCategories={setSelectedSubCategories}
                selectedSubSubCategories={selectedSubSubCategories}
                setSelectedSubSubCategories={setSelectedSubSubCategories}
                selectedColors={selectedColors}
                setSelectedColors={setSelectedColors}
                selectedMaterial={selectedMaterial}
                setSelectedMaterial={setSelectedMaterial}
                selectedBrand={selectedBrand}
                setSelectedBrand={setSelectedBrand}
                lengthRange={lengthRange}
                setLengthRange={setLengthRange}
                widthRange={widthRange}
                setWidthRange={setWidthRange}
                heightRange={heightRange}
                setHeightRange={setHeightRange}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
              />
            </div>
          </div>
        )}

        {/* ================= RIGHT PRODUCTS ================= */}
        <div className="px-[2.8vw] lg:px-0 flex-1 overflow-y-auto">
          {/* Top Filter Bar */}
          <div className="flex flex-wrap-reverse lg:flex-nowrap gap-3 lg:justify-between items-center mb-6">
            <div className="flex flex-wrap lg:flex-nowrap w-full justify-between lg:justify-start gap-2 lg:gap-4">
              <button
                onClick={() => {
                  setShowFilters(!showFilters);
                }}
                className="hidden lg:flex flex-nowrap px-4 py-2 bg-black text-white rounded-full text-sm gap-1 items-center"
              >
                <Settings2 className="w-5 h-5" />
                {showFilters ? "Hide Filters" : "Filters"}
              </button>
              <button
                onClick={() => {
                  setShowMobileFilters(!showMobileFilters);
                }}
                className="flex lg:hidden flex-nowrap px-3 py-2 bg-black text-white rounded-full text-sm  gap-1 items-center"
              >
                <Settings2 className="w-5 h-5" />
                Filters
              </button>
              <MultiSelect
                placeholder="All Locations"
                options={locationArea}
                value={selectedLocations}
                onChange={(e) => handleLocationChange(e.value)}
                maxSelectedLabels={3}
                showSelectAll
                selectAllLabel="Select All"
                className="flex-nowrap max-w-52 shadow-none bg-[var(--primary)] rounded-full px-3 placeholder:text-black"
              />
            </div>

            <div className="flex flex-nowrap w-full lg:w-1/2 justify-between lg:justify-end items-center lg:gap-2">
              <label className="w-full lg:w-fit">Sort By</label>
              <Dropdown
                value={sortBy}
                options={sortOptions}
                optionLabel="name"
                optionValue="value"
                onChange={(e) => setSortBy(e.value)}
                placeholder="Select"
                checkmark
                className="w-full lg:w-fit shadow-none bg-[var(--primary)] rounded-full px-4 placeholder:text-black"
              />
            </div>
          </div>

          {/* Products Grid */}
          {products?.length === 0 && !loading ? (
            <div className="w-full text-center py-10 text-gray-500 text-lg">
              No products found.
            </div>
          ) : (
            <div
              className={`grid grid-cols-2 ${showFilters ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-3 lg:grid-cols-4"} gap-6`}
            >
              <ProductCard paginatedProducts={products} loader={loading} />
            </div>
          )}

          {/* ================= PAGINATION ================= */}
          {totalPages > 1 && (
            <div
              className="flex justify-center items-center gap-2 mt-10 pb-10"
              style={{
                fontFamily: "DM Sans",
              }}
            >
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className="px-1 lg:px-3 py-1 bg-white text-black flex items-center gap-2 rounded disabled:opacity-40 font-light"
              >
                <ChevronLeft className="[var(--stroke)]-1" />{" "}
                <span className="hidden lg:block">Previous</span>
              </button>

              {getPages().map((page, index) =>
                page === "..." ? (
                  <span key={index} className="px-2">
                    ...
                  </span>
                ) : (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1.5 lg:px-5 lg:py-2 rounded-lg text-black ${
                      currentPage === page
                        ? "bg-[var(--primary)] border border-[var(--stroke)]"
                        : "bg-white"
                    }`}
                  >
                    {page}
                  </button>
                ),
              )}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="px-1 lg:px-3 py-1 bg-white text-black flex items-center gap-2 rounded disabled:opacity-40 font-light"
              >
                <span className="hidden lg:block">Next</span>{" "}
                <ChevronRight className="[var(--stroke)]-1" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
