import { ChevronLeft, ChevronRight, MapPin, Settings2, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import Filters from "./Filters";
import { useLocation } from "wouter";
import logoBlack from "../../assets/Homepage/Banner/logoBlack.png";
const dummyProducts = Array.from({ length: 400 }).map((_, i) => ({
  id: i + 1,
  title: "Kohler Memoirs Pedestal Sink",
  price: "₹4,000",
  location: "New York, NY",
  category: "Bathroom",
  image: `https://picsum.photos/500/500?random=${i + 1}`,
}));

const PRODUCTS_PER_PAGE = 12;

export default function ProductsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const totalPages = Math.ceil(dummyProducts.length / PRODUCTS_PER_PAGE);
  const [, navigate] = useLocation();

  const paginatedProducts = dummyProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE,
  );

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

  return (
    <div className="flex flex-col text-black">
      {/* Main Layout */}
      <div className="flex flex-1 relative lg:px-[2vw] pb-10 gap-[2.8vw] lg:gap-[2.2vw]">
        {/* ================= LEFT FILTERS ================= */}
        {showFilters && (
          <div className="hidden lg:block lg:w-1/4 px-4 sticky h-full max-h-[calc(100vh-0.5rem)] top-2 overscroll-contain overflow-scroll">
            <Filters />
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
              <Filters />
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
              <Dropdown
                placeholder="Specify"
                checkmark
                className="flex-nowrap shadow-none bg-[#F6F6F6] rounded-full px-3 placeholder:text-black"
              />
              <Dropdown
                placeholder="All Locations"
                checkmark
                className="flex-nowrap shadow-none bg-[#F6F6F6] rounded-full px-3 placeholder:text-black"
              />
            </div>

            <div className="flex flex-nowrap w-full lg:w-1/2 justify-between lg:justify-end items-center lg:gap-2">
              <label className="w-full lg:w-fit">Sort By</label>
              <Dropdown
                placeholder="Select"
                checkmark
                className="w-full lg:w-fit shadow-none bg-[#F6F6F6] rounded-full px-4 placeholder:text-black"
              />
            </div>
          </div>

          {/* Products Grid */}
          <div
            className={`grid grid-cols-2 ${showFilters ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-3 lg:grid-cols-4"} gap-6`}
          >
            {paginatedProducts.map((product) => (
              <div
                onClick={() => navigate(`/products/${product.id}`)}
                key={product.id}
                className="text-black overflow-hidden cursor-pointer"
              >
                <div className="overflow-hidden relative rounded-2xl lg:rounded-3xl">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="aspect-square w-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 w-full px-6 py-6 h-1/3 flex flex-col justify-end gap-1 text-black transition-all bg-gradient-to-t from-black/80 via-black/20 to-transparent backdrop-blur-[1px]">
                    <h3
                      style={{ fontFamily: "Playfair Display" }}
                      className="text-[clamp(10px,2.5vw,40px)] sm:text-[clamp(10px,1.5vw,30px)] lg:text-[clamp(10px,0.9vw,40px)] bg-white w-fit rounded-full px-4 py-1"
                    >
                      {product.category}
                    </h3>
                  </div>
                </div>

                <div className="text-[clamp(10px,2.5vw,40px)] sm:text-[clamp(10px,1.5vw,30px)] lg:text-[clamp(10px,0.9vw,40px)] p-4">
                  <p className="mb-1">
                    <span className="font-light">Price</span>{" "}
                    <span className="font-bold">- {product.price}</span>
                  </p>
                  <h3 className="font-semibold mb-1">{product.title}</h3>
                  <p className="text-[#4A4A4A] flex gap-1 items-center">
                    <MapPin className="w-4 h-4" />
                    {product.location}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* ================= PAGINATION ================= */}
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
              <ChevronLeft className="stroke-1" />{" "}
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
                      ? "bg-[#F6F6F6] border border-[#B7B7B7]"
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
              <ChevronRight className="stroke-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
