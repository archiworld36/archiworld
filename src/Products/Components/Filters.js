import {
  ChevronDown,
  ChevronRight,
  ChevronUp,
  LocateFixed,
  Search,
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
import { Slider } from "primereact/slider";

const FilterSection = ({ title, sectionKey, children }) => {
  const [openSection, setOpenSection] = useState("categories");
  const toggleSection = (key) => {
    setOpenSection((prev) => (prev === key ? null : key));
  };
  const isOpen = openSection === sectionKey;

  return (
    <div className="border-t border-[var(--stroke)] py-5">
      <h4
        onClick={() => toggleSection(sectionKey)}
        className="text-[clamp(12px,3.5vw,40px)] sm:text-[clamp(12px,2.1vw,30px)] lg:text-[clamp(10px,1.2vw,40px)] font-medium flex justify-between items-center cursor-pointer"
      >
        {title}

        {isOpen ? (
          <ChevronDown className="w-5 h-5" />
        ) : (
          <ChevronUp className="w-5 h-5" />
        )}
      </h4>

      {isOpen && <div>{children}</div>}
    </div>
  );
};

function Filters({ locationArea, selectedLocations, setSelectedLocations }) {
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
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTermBrand, setSearchTermBrand] = useState("");
  const [lengthRange, setLengthRange] = useState([0, 200]);
  const [widthRange, setWidthRange] = useState([0, 200]);
  const [heightRange, setHeightRange] = useState([0, 200]);
  const [weightRange, setWeightRange] = useState([0, 200]);
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [searchTermLocation, setSearchTermLocation] = useState("");

  const handleLocationChange = (value) => {
    if (value === "Pan India") {
      // If Pan India selected → remove others
      if (selectedLocations.includes("Pan India")) {
        setSelectedLocations([]);
      } else {
        setSelectedLocations(["Pan India"]);
      }
    } else {
      let updated = [...selectedLocations];
      // Remove Pan India if selecting states
      updated = updated.filter((loc) => loc !== "Pan India");
      if (updated.includes(value)) {
        updated = updated.filter((loc) => loc !== value);
      } else {
        updated.push(value);
      }
      setSelectedLocations(updated);
    }
  };

  const filteredMaterials = materialOptions.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const filteredBrands = brandOptions.filter((item) =>
    item.name.toLowerCase().includes(searchTermBrand.toLowerCase()),
  );

  const filteredLocations = locationArea.filter((item) =>
    item.label.toLowerCase().includes(searchTermLocation.toLowerCase()),
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

  const handleUseCurrentLocation = async () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;

      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
        );
        const data = await res.json();

        const state = data.address.state;

        if (state) {
          // select state
          setSearchTermLocation(state);

          // optionally store selected state
          setSelectedLocations([state]);
        }
      } catch (error) {
        console.error("Location fetch failed", error);
      }
    });
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
    <div className="pb-20 relative">
      {/* Categories */}
      <FilterSection title="Categories" sectionKey="categories">
        <ul className="space-y-5 pt-5">
          {categories.map((item) => (
            <li key={item._id}>
              {/* Category Row */}
              <div
                onClick={() => handleCategoryClick(item._id)}
                className="text-[clamp(10px,3vw,40px)] sm:text-[clamp(12px,1.9vw,30px)] lg:text-[clamp(10px,1vw,40px)] flex justify-between items-center cursor-pointer"
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
                <ul className="pl-3 text-[clamp(8px,2.5vw,40px)] sm:text-[clamp(10px,1.8vw,30px)] lg:text-[clamp(10px,0.9vw,40px)]">
                  {loadingSubCategories ? (
                    <li className="text-[var(--secondary)] pt-5">
                      Loading sub-categories...
                    </li>
                  ) : subCategories.length === 0 ? (
                    <li className="text-[var(--secondary)] pt-5">
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
      </FilterSection>
      {/* Color */}
      <FilterSection title="Colors" sectionKey="colors">
        <ul className="space-y-5 pt-5">
          {colors.map((item) => (
            <li key={item._id}>
              {/* Category Row */}
              <div className="text-[clamp(10px,3vw,40px)] sm:text-[clamp(12px,1.9vw,30px)] lg:text-[clamp(10px,1vw,40px)] flex justify-between items-center cursor-pointer">
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
      </FilterSection>
      {/* Material */}
      <FilterSection title="Material" sectionKey="material">
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
        <ul className="space-y-5 pt-5 text-[clamp(10px,3vw,40px)] sm:text-[clamp(12px,1.9vw,30px)] lg:text-[clamp(10px,1vw,40px)] ">
          {filteredMaterials.length === 0 ? (
            <li className="text-[var(--secondary)]">No materials found</li>
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
      </FilterSection>
      {/* Brand */}
      <FilterSection title="Brand" sectionKey="brand">
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
        <ul className="space-y-5 pt-5 text-[clamp(10px,3vw,40px)] sm:text-[clamp(12px,1.9vw,30px)] lg:text-[clamp(10px,1vw,40px)]">
          {filteredBrands.length === 0 ? (
            <li className="text-[var(--secondary)]">No brand found</li>
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
      </FilterSection>
      {/* Size */}
      <FilterSection title="Size" sectionKey="size">
        <div className="mt-8 relative">
          <label className="text-[clamp(10px,3vw,40px)] sm:text-[clamp(12px,1.9vw,30px)] lg:text-[clamp(10px,1vw,40px)] font-normal">
            Length
          </label>
          <Slider
            value={lengthRange}
            onChange={(e) => {
              const [min, max] = e.value;
              if (min <= max) {
                setLengthRange([min, max]);
              }
            }}
            range
            min={0}
            max={200}
            className="mt-6"
          />
          <div className="flex gap-3 items-center justify-center mt-8">
            <div className="relative">
              <input
                type="number"
                value={lengthRange[0]}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  if (value <= lengthRange[1]) {
                    setLengthRange([value, lengthRange[1]]);
                  }
                }}
                className="pr-12 pl-5 w-full py-2 border border-[var(--stroke)] rounded-none text-xl focus:outline-none shadow-none bg-white"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-[clamp(10px,3vw,40px)] sm:text-[clamp(12px,1.9vw,30px)] lg:text-[clamp(10px,1vw,40px)]">
                cm
              </div>
            </div>
            <div className="h-0 border border-black w-4"></div>
            <div className="relative">
              <input
                type="number"
                value={lengthRange[1]}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  if (value >= lengthRange[0]) {
                    setLengthRange([lengthRange[0], value]);
                  }
                }}
                className="pr-12 pl-5 w-full py-2 border border-[var(--stroke)] rounded-none text-xl focus:outline-none shadow-none bg-white"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-[clamp(10px,3vw,40px)] sm:text-[clamp(12px,1.9vw,30px)] lg:text-[clamp(10px,1vw,40px)]">
                cm
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 relative">
          <label className="text-[clamp(10px,3vw,40px)] sm:text-[clamp(12px,1.9vw,30px)] lg:text-[clamp(10px,1vw,40px)] font-normal">
            Width
          </label>
          <Slider
            value={widthRange}
            onChange={(e) => {
              const [min, max] = e.value;
              if (min <= max) {
                setWidthRange([min, max]);
              }
            }}
            range
            min={0}
            max={200}
            className="mt-6"
          />

          <div className="flex gap-3 items-center justify-center mt-8">
            <div className="relative">
              <input
                type="number"
                value={widthRange[0]}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  if (value <= widthRange[1]) {
                    setWidthRange([value, widthRange[1]]);
                  }
                }}
                className="pr-12 pl-5 w-full py-2 border border-[var(--stroke)] rounded-none text-xl focus:outline-none shadow-none bg-white"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-[clamp(10px,3vw,40px)] sm:text-[clamp(12px,1.9vw,30px)] lg:text-[clamp(10px,1vw,40px)]">
                cm
              </div>
            </div>
            <div className="h-0 border border-black w-4"></div>
            <div className="relative">
              <input
                type="number"
                value={widthRange[1]}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  if (value >= widthRange[0]) {
                    setWidthRange([widthRange[0], value]);
                  }
                }}
                className="pr-12 pl-5 w-full py-2 border border-[var(--stroke)] rounded-none text-xl focus:outline-none shadow-none bg-white"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-[clamp(10px,3vw,40px)] sm:text-[clamp(12px,1.9vw,30px)] lg:text-[clamp(10px,1vw,40px)]">
                cm
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 relative">
          <label className="text-[clamp(10px,3vw,40px)] sm:text-[clamp(12px,1.9vw,30px)] lg:text-[clamp(10px,1vw,40px)] font-normal">
            Height
          </label>
          <Slider
            value={heightRange}
            onChange={(e) => {
              const [min, max] = e.value;
              if (min <= max) {
                setHeightRange([min, max]);
              }
            }}
            range
            min={0}
            max={200}
            className="mt-6"
          />
          <div className="flex gap-3 items-center justify-center mt-8">
            <div className="relative">
              <input
                type="number"
                value={heightRange[0]}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  if (value <= heightRange[1]) {
                    setHeightRange([value, heightRange[1]]);
                  }
                }}
                className="pr-12 pl-5 w-full py-2 border border-[var(--stroke)] rounded-none text-xl focus:outline-none shadow-none bg-white"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-[clamp(10px,3vw,40px)] sm:text-[clamp(12px,1.9vw,30px)] lg:text-[clamp(10px,1vw,40px)]">
                cm
              </div>
            </div>
            <div className="h-0 border border-black w-4"></div>
            <div className="relative">
              <input
                type="number"
                value={heightRange[1]}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  if (value >= heightRange[0]) {
                    setHeightRange([heightRange[0], value]);
                  }
                }}
                className="pr-12 pl-5 w-full py-2 border border-[var(--stroke)] rounded-none text-xl focus:outline-none shadow-none bg-white"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-[clamp(10px,3vw,40px)] sm:text-[clamp(12px,1.9vw,30px)] lg:text-[clamp(10px,1vw,40px)]">
                cm
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 relative">
          <label className="text-[clamp(10px,3vw,40px)] sm:text-[clamp(12px,1.9vw,30px)] lg:text-[clamp(10px,1vw,40px)] font-normal">
            Weight
          </label>
          <Slider
            value={weightRange}
            onChange={(e) => {
              const [min, max] = e.value;
              if (min <= max) {
                setWeightRange([min, max]);
              }
            }}
            range
            min={0}
            max={200}
            className="mt-6"
          />
          <div className="flex gap-3 items-center justify-center mt-8">
            <div className="relative">
              <input
                type="number"
                value={weightRange[0]}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  if (value <= weightRange[1]) {
                    setWeightRange([weightRange[1], value]);
                  }
                }}
                className="pr-12 pl-5 w-full py-2 border border-[var(--stroke)] rounded-none text-xl focus:outline-none shadow-none bg-white"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-[clamp(10px,3vw,40px)] sm:text-[clamp(12px,1.9vw,30px)] lg:text-[clamp(10px,1vw,40px)]">
                Kg
              </div>
            </div>
            <div className="h-0 border border-black w-4"></div>
            <div className="relative">
              <input
                type="number"
                value={weightRange[1]}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  if (value >= weightRange[0]) {
                    setWeightRange([weightRange[0], value]);
                  }
                }}
                className="pr-12 pl-5 w-full py-2 border border-[var(--stroke)] rounded-none text-xl focus:outline-none shadow-none bg-white"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-[clamp(10px,3vw,40px)] sm:text-[clamp(12px,1.9vw,30px)] lg:text-[clamp(10px,1vw,40px)]">
                Kg
              </div>
            </div>
          </div>
        </div>
      </FilterSection>
      {/* Pricing */}
      <FilterSection title="Pricing" sectionKey="price">
        <div className="mt-8 relative">
          <label className="text-[clamp(10px,3vw,40px)] sm:text-[clamp(12px,1.9vw,30px)] lg:text-[clamp(10px,1vw,40px)] font-normal">
            Price Range
          </label>
          <Slider
            value={priceRange}
            onChange={(e) => {
              const [min, max] = e.value;
              if (min <= max) {
                setPriceRange([min, max]);
              }
            }}
            range
            min={0}
            max={1000000}
            step={1000}
            className="mt-6"
          />

          <div className="flex gap-3 items-center justify-center mt-8">
            <div className="relative">
              <input
                type="number"
                value={priceRange[0]}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  if (value <= priceRange[1]) {
                    setPriceRange([priceRange[1], value]);
                  }
                }}
                className="pr-12 pl-5 w-full py-2 border border-[var(--stroke)] rounded-none text-xl focus:outline-none shadow-none bg-white"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-[clamp(10px,3vw,40px)] sm:text-[clamp(12px,1.9vw,30px)] lg:text-[clamp(10px,1vw,40px)]">
                ₹
              </div>
            </div>
            <div className="h-0 border border-black w-4"></div>
            <div className="relative">
              <input
                type="number"
                value={priceRange[1]}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  if (value >= priceRange[0]) {
                    setPriceRange([priceRange[0], value]);
                  }
                }}
                className="pr-12 pl-5 w-full py-2 border border-[var(--stroke)] rounded-none text-xl focus:outline-none shadow-none bg-white"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-[clamp(10px,3vw,40px)] sm:text-[clamp(12px,1.9vw,30px)] lg:text-[clamp(10px,1vw,40px)]">
                ₹
              </div>
            </div>
          </div>
        </div>
      </FilterSection>
      {/* Location */}
      <FilterSection title="Location" sectionKey="location">
        <div className="mt-5 relative">
          <InputText
            type="search"
            placeholder="Search more states..."
            value={searchTermLocation}
            onChange={(e) => setSearchTermLocation(e.target.value)}
            className="pr-10 pl-5 w-full py-3 border border-black rounded-none text-xl focus:outline-none shadow-none bg-white"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5" />
          </div>
        </div>
        <ul className="space-y-5 pt-5 text-[clamp(10px,3vw,40px)] sm:text-[clamp(12px,1.9vw,30px)] lg:text-[clamp(10px,1vw,40px)]">
          <li>
            <div
              onClick={handleUseCurrentLocation}
              className="flex gap-2 items-center cursor-pointer"
            >
              <LocateFixed className="w-6 h-6" />
              <span className="flex gap-2">Use My Current Location</span>
            </div>
          </li>
          {filteredLocations.slice(0, 10).map((item) => (
            <li key={item._id}>
              <div className="flex justify-between items-center cursor-pointer">
                <span className="flex gap-2">{item.label}</span>
                <input
                  type="checkbox"
                  className="w-5 h-5"
                  checked={selectedLocations.includes(item.value)}
                  disabled={
                    selectedLocations.includes("Pan India") &&
                    item.value !== "Pan India"
                  }
                  onChange={() => handleLocationChange(item.value)}
                />
              </div>
            </li>
          ))}
        </ul>
      </FilterSection>
    </div>
  );
}

export default Filters;
