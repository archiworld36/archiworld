import React, { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  fetchBrandOptions,
  fetchCategory,
  fetchMaterialOptions,
} from "./masterDataAPI";
import BrandFilter from "./Filters/BrandFilter";
import CategoriesFilter from "./Filters/CategoriesFilter";
import ColorFilters from "./Filters/ColorFilters";
import MaterialFilter from "./Filters/MaterialFilter";
import SizeFilter from "./Filters/SizeFilter";
import PriceFilter from "./Filters/PriceFilter";
import LocationFilter from "./Filters/LocationFilter";

function Filters({
  locationArea,
  selectedLocations,
  setSelectedLocations,
  selectedSubCategories,
  setSelectedSubCategories,
  selectedSubSubCategories,
  setSelectedSubSubCategories,
  selectedColors,
  setSelectedColors,
  selectedMaterial,
  setSelectedMaterial,
  selectedBrand,
  setSelectedBrand,
  lengthRange,
  setLengthRange,
  widthRange,
  setWidthRange,
  heightRange,
  setHeightRange,
  priceRange,
  setPriceRange,
}) {
  const dispatch = useDispatch();

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

  return (
    <div className="pb-20 relative">
      {/* Categories */}
      <CategoriesFilter
        selectedSubCategories={selectedSubCategories}
        setSelectedSubCategories={setSelectedSubCategories}
        selectedSubSubCategories={selectedSubSubCategories}
        setSelectedSubSubCategories={setSelectedSubSubCategories}
      />
      {/* Color */}
      <ColorFilters
        selectedColors={selectedColors}
        setSelectedColors={setSelectedColors}
      />
      {/* Material */}
      <MaterialFilter
        selectedMaterial={selectedMaterial}
        setSelectedMaterial={setSelectedMaterial}
      />
      {/* Brand */}
      <BrandFilter
        selectedBrand={selectedBrand}
        setSelectedBrand={setSelectedBrand}
      />
      {/* Size */}
      <SizeFilter
        lengthRange={lengthRange}
        setLengthRange={setLengthRange}
        widthRange={widthRange}
        setWidthRange={setWidthRange}
        heightRange={heightRange}
        setHeightRange={setHeightRange}
      />
      {/* Pricing */}
      <PriceFilter priceRange={priceRange} setPriceRange={setPriceRange} />
      {/* Location */}
      <LocationFilter
        locationArea={locationArea}
        selectedLocations={selectedLocations}
        setSelectedLocations={setSelectedLocations}
      />
    </div>
  );
}

export default Filters;
