import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  MapPin,
  Search,
  Settings2,
} from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InputText } from "primereact/inputtext";
import {
  fetchBrandOptions,
  fetchCategory,
  fetchMaterialOptions,
  fetchSubCategory,
} from "./masterDataAPI";
import { Dropdown } from "primereact/dropdown";
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
  const totalPages = Math.ceil(dummyProducts.length / PRODUCTS_PER_PAGE);

  const paginatedProducts = dummyProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE,
  );

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
      <div className="flex flex-1 relative px-[3vw] lg:px-[2.34375vw] pb-10 gap-8">
        {/* ================= LEFT FILTERS ================= */}
        {showFilters && (
    <div className="w-0 lg:w-1/4 sticky h-full max-h-[calc(100vh-0.5rem)] top-2 overscroll-contain overflow-scroll">
      <Filters />
    </div>
  )}

        {/* ================= RIGHT PRODUCTS ================= */}
        <div className="flex-1 overflow-y-auto">
          {/* Top Filter Bar */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-4">
              <button onClick={() => setShowFilters(!showFilters)} className="px-4 py-2 bg-black text-white rounded-full text-sm flex gap-1 items-center">
                <Settings2 className="w-5 h-5" />
                {showFilters ? "Hide Filters" : "Filters"}
              </button>
              <Dropdown
                placeholder="Specify"
                checkmark
                className="shadow-none bg-[#F6F6F6] rounded-full px-4 placeholder:text-black"
              />
              <Dropdown
                placeholder="All Locations"
                checkmark
                className="shadow-none bg-[#F6F6F6] rounded-full px-4 placeholder:text-black"
              />
            </div>

            <div className="flex items-center gap-2">
              <label className="block">Sort By</label>
              <Dropdown
                placeholder="Select"
                checkmark
                className="shadow-none bg-[#F6F6F6] rounded-full px-4 placeholder:text-black"
              />
            </div>
          </div>

          {/* Products Grid */}
          <div className={`grid grid-cols-1 sm:grid-cols-2 ${showFilters ? "lg:grid-cols-3" :"lg:grid-cols-4"} gap-6`}>
            {paginatedProducts.map((product) => (
              <div key={product.id} className="text-black overflow-hidden">
                <div className="overflow-hidden relative rounded-3xl">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="aspect-square rounded-3xl w-full object-cover"
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
              className="px-3 py-1 bg-white text-black flex items-center gap-2 rounded disabled:opacity-40 font-light"
            >
              <ChevronLeft className="stroke-1" /> Previous
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
                  className={`px-5 py-2 rounded-lg text-black ${
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
              className="px-3 py-1 bg-white text-black flex items-center gap-2 rounded disabled:opacity-40 font-light"
            >
              Next <ChevronRight className="stroke-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= FILTER COMPONENT ================= */

function Filters() {
  const {
    brandOptions = [],
    materialOptions = [],
    categories = [],
    subCategories = [],
    loadingSubCategories = false,
  } = useSelector((state) => state.masterData);
  const [openCategoryId, setOpenCategoryId] = useState(null);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const dispatch = useDispatch();
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [isColorOpen, setIsColorOpen] = useState(false);
  const [isMaterialOpen, setIsMaterialOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const [searchTermBrand, setSearchTermBrand] = useState("");

  const filteredMaterials = materialOptions.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const filteredBrands = brandOptions.filter((item) =>
    item.name.toLowerCase().includes(searchTermBrand.toLowerCase()),
  );

  const fetchBrandOptionsOnce = useCallback(() => {
    dispatch(fetchBrandOptions());
  }, [dispatch]);
  const fetchCategoriesOnce = useCallback(() => {
    dispatch(fetchCategory());
  }, [dispatch]);
  const fetchMaterialOptionsOnce = useCallback(() => {
    dispatch(fetchMaterialOptions());
  }, [dispatch]);

  // 👇 useEffect will only run once and call the fetch function
  useEffect(() => {
    fetchBrandOptionsOnce();
    fetchCategoriesOnce();
    fetchMaterialOptionsOnce();
  }, [fetchBrandOptionsOnce, fetchCategoriesOnce, fetchMaterialOptionsOnce]);

  const handleCategoryClick = (id) => {
    if (openCategoryId === id) {
      setOpenCategoryId(null); // close if same clicked
    } else {
      setOpenCategoryId(id);
      dispatch(fetchSubCategory(id)); // fetch subcategories
    }
  };

  const handleSubCategoryChange = (id) => {
    setSelectedSubCategories(
      (prev) =>
        prev.includes(id)
          ? prev.filter((item) => item !== id) // remove
          : [...prev, id], // add
    );
  };

  const handleCategoriesToggle = () => {
    setIsCategoryOpen((prev) => !prev);
  };

  const handleColorToggle = () => {
    setIsColorOpen((prev) => !prev);
  };

  const handleMaterialToggle = () => {
    setIsMaterialOpen((prev) => !prev);
  };

  const handleBrandToggle = () => {
    setIsBrandOpen((prev) => !prev);
  };

  const colors = [
    { code: "000000", name: "Black" },
    { code: "1447E6", name: "Blue" },
    { code: "008236", name: "Green" },
    { code: "FF8409", name: "Orange" },
    { code: "FF00AA", name: "Pink" },
    { code: "C0C0C0", name: "Silver" },
    { code: "FFFFFF", name: "White" },
    { code: "FFF70B", name: "Yellow" },
    { code: "808080", name: "Gray" },
    { code: "FF0000", name: "Red" },
  ];
  return (
    <div className="text-sm pb-20">
      {/* Categories */}
      <div className="border-y border-[#B7B7B7] py-5">
        <h4
          onClick={handleCategoriesToggle}
          className="text-[clamp(12px,2.5vw,40px)] sm:text-[clamp(12px,2.1vw,30px)] lg:text-[clamp(10px,1.2vw,40px)] font-medium flex justify-between items-center cursor-pointer"
        >
          Categories{" "}
          {isCategoryOpen ? (
            <ChevronDown className="w-5 h-5" />
          ) : (
            <ChevronUp className="w-5 h-5" />
          )}
        </h4>

        {isCategoryOpen && (
          <ul className="space-y-5 pt-5">
            {categories.map((item) => (
              <li key={item._id}>
                {/* Category Row */}
                <div
                  onClick={() => handleCategoryClick(item._id)}
                  className="text-[clamp(10px,2.2vw,40px)] sm:text-[clamp(12px,1.9vw,30px)] lg:text-[clamp(10px,1vw,40px)] flex justify-between items-center cursor-pointer"
                >
                  <span>{item.name}</span>

                  {openCategoryId === item._id ? (
                    <ChevronDown className="w-5 h-5" />
                  ) : (
                    <ChevronRight className="w-5 h-5" />
                  )}
                </div>

                {/* SubCategories */}
                {openCategoryId === item._id && (
                  <ul className="pl-3 text-[clamp(8px,2vw,40px)] sm:text-[clamp(10px,1.8vw,30px)] lg:text-[clamp(10px,0.9vw,40px)]">
                    {loadingSubCategories ? (
                      <li className="text-gray-500 pt-5">
                        Loading sub-categories...
                      </li>
                    ) : subCategories.length === 0 ? (
                      <li className="text-gray-500 pt-5">
                        No sub-categories found
                      </li>
                    ) : (
                      subCategories.map((sub) => (
                        <li
                          key={sub._id}
                          className="flex justify-between items-center pt-5"
                        >
                          <span>{sub.name}</span>

                          <input
                            type="checkbox"
                            checked={selectedSubCategories.includes(sub._id)}
                            onChange={() => handleSubCategoryChange(sub._id)}
                            className="w-5 h-5"
                          />
                        </li>
                      ))
                    )}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* Color */}
      <div className="border-b border-[#B7B7B7] py-5">
        <h4
          onClick={handleColorToggle}
          className="text-[clamp(12px,2.5vw,40px)] sm:text-[clamp(12px,2.1vw,30px)] lg:text-[clamp(10px,1.2vw,40px)] font-medium flex justify-between items-center cursor-pointer"
        >
          Colors
          {isColorOpen ? (
            <ChevronDown className="w-5 h-5" />
          ) : (
            <ChevronUp className="w-5 h-5" />
          )}
        </h4>

        {isColorOpen && (
          <ul className="space-y-5 pt-5">
            {colors.map((item) => (
              <li key={item._id}>
                {/* Category Row */}
                <div className="text-[clamp(10px,2.2vw,40px)] sm:text-[clamp(12px,1.9vw,30px)] lg:text-[clamp(10px,1vw,40px)] flex justify-between items-center cursor-pointer">
                  <span className="flex gap-2">
                    <div
                      style={{ backgroundColor: `#${item.code}` }}
                      className={`w-5 h-5 p-1 rounded-full overflow-hidden`}
                    ></div>
                    {item.name}
                  </span>
                  <input type="checkbox" className="w-5 h-5" />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* Material */}
      <div className="border-b border-[#B7B7B7] py-5">
        <h4
          onClick={handleMaterialToggle}
          className="text-[clamp(12px,2.5vw,40px)] sm:text-[clamp(12px,2.1vw,30px)] lg:text-[clamp(10px,1.2vw,40px)] font-medium flex justify-between items-center cursor-pointer"
        >
          Material
          {isMaterialOpen ? (
            <ChevronDown className="w-5 h-5" />
          ) : (
            <ChevronUp className="w-5 h-5" />
          )}
        </h4>

        {isMaterialOpen && (
          <>
            <div className="mt-5 relative">
              <InputText
                type="search"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10 pl-5 w-full py-3 border border-black rounded-none text-xl focus:outline-none shadow-none bg-white"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5" />
              </div>
            </div>
            <ul className="space-y-5 pt-5 text-[clamp(10px,2.2vw,40px)] sm:text-[clamp(12px,1.9vw,30px)] lg:text-[clamp(10px,1vw,40px)] ">
              {filteredMaterials.length === 0 ? (
                <li className="text-gray-500">No materials found</li>
              ) : (
                filteredMaterials.map((item) => (
                  <li key={item._id}>
                    <div className="flex justify-between items-center cursor-pointer">
                      <span className="flex gap-2">{item.name}</span>

                      <input type="checkbox" className="w-5 h-5" />
                    </div>
                  </li>
                ))
              )}
            </ul>
          </>
        )}
      </div>
      {/* Brand */}
      <div className="border-b border-[#B7B7B7] py-5">
        <h4
          onClick={handleBrandToggle}
          className="text-[clamp(12px,2.5vw,40px)] sm:text-[clamp(12px,2.1vw,30px)] lg:text-[clamp(10px,1.2vw,40px)] font-medium flex justify-between items-center cursor-pointer"
        >
          Brand
          {isBrandOpen ? (
            <ChevronDown className="w-5 h-5" />
          ) : (
            <ChevronUp className="w-5 h-5" />
          )}
        </h4>

        {isBrandOpen && (
          <>
            <div className="mt-5 relative">
              <InputText
                type="search"
                placeholder="Search..."
                value={searchTermBrand}
                onChange={(e) => setSearchTermBrand(e.target.value)}
                className="pr-10 pl-5 w-full py-3 border border-black rounded-none text-xl focus:outline-none shadow-none bg-white"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5" />
              </div>
            </div>
            <ul className="space-y-5 pt-5 text-[clamp(10px,2.2vw,40px)] sm:text-[clamp(12px,1.9vw,30px)] lg:text-[clamp(10px,1vw,40px)] ">
              {filteredBrands.length === 0 ? (
                <li className="text-gray-500">No brand found</li>
              ) : (
                filteredBrands.map((item) => (
                  <li key={item._id}>
                    <div className="flex justify-between items-center cursor-pointer">
                      <span className="flex gap-2">{item.name}</span>

                      <input type="checkbox" className="w-5 h-5" />
                    </div>
                  </li>
                ))
              )}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
