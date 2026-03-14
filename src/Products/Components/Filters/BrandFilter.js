import React, { useState } from "react";
import { FilterSection } from "./FilterSection";
import { InputText } from "primereact/inputtext";
import { useSelector } from "react-redux";
import { Search } from "lucide-react";

function BrandFilter() {
  const { brandOptions = [] } = useSelector((state) => state.masterData);
  const [searchTermBrand, setSearchTermBrand] = useState("");
  const filteredBrands = brandOptions.filter((item) =>
    item.name.toLowerCase().includes(searchTermBrand.toLowerCase()),
  );
  return (
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
  );
}

export default BrandFilter;
