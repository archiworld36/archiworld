import React, { useEffect, useState } from "react";
import { FilterSection } from "./FilterSection";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubCategory, fetchSubSubCategory } from "../masterDataAPI";
import { ChevronDown, ChevronRight } from "lucide-react";

function CategoriesFilter({
  selectedSubCategories,
  setSelectedSubCategories,
  selectedSubSubCategories,
  setSelectedSubSubCategories,
}) {
  const {
    categories = [],
    loadingCategories = false,
    loadingSubCategories = false,
    subSubCategories = {},
    loadingSubSubCategories = false,
  } = useSelector((state) => state.masterData);
  const dispatch = useDispatch();
  const [openCategoryIds, setOpenCategoryIds] = useState([]);
  const [subCategoriesByCategory, setSubCategoriesByCategory] = useState({});
  const [openSubCategoryIds, setOpenSubCategoryIds] = useState([]);

  const handleCategoryClick = async (id) => {
    const isOpen = openCategoryIds.includes(id);

    if (isOpen) {
      setOpenCategoryIds((prev) => prev.filter((item) => item !== id));
      return;
    }

    setOpenCategoryIds((prev) => [...prev, id]);

    if (!subCategoriesByCategory[id]) {
      const res = await dispatch(fetchSubCategory(id));
      const subs = res.payload || [];

      setSubCategoriesByCategory((prev) => ({
        ...prev,
        [id]: subs,
      }));

      subs.forEach((sub) => {
        dispatch(fetchSubSubCategory(sub._id));
      });
    }
  };

  const handleSubCategoryClick = (id) => {
    setOpenSubCategoryIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleSubCategoryChange = (id) => {
    setSelectedSubCategories(
      (prev) =>
        prev.includes(id)
          ? prev.filter((item) => item !== id) // remove
          : [...prev, id], // add
    );
  };
  const handleSubSubCategoryChange = (id) => {
    setSelectedSubSubCategories(
      (prev) =>
        prev.includes(id)
          ? prev.filter((item) => item !== id) // remove
          : [...prev, id], // add
    );
  };

  useEffect(() => {
    if (!categories.length) return;

    categories.forEach(async (category) => {
      const res = await dispatch(fetchSubCategory(category._id));
      const subs = res.payload || [];

      setSubCategoriesByCategory((prev) => ({
        ...prev,
        [category._id]: subs,
      }));

      const hasSelectedSub = subs.some((sub) =>
        selectedSubCategories.includes(sub._id),
      );

      if (hasSelectedSub) {
        setOpenCategoryIds((prev) =>
          prev.includes(category._id) ? prev : [...prev, category._id],
        );

        subs.forEach((sub) => {
          dispatch(fetchSubSubCategory(sub._id));
        });
      }
    });
  }, [categories, selectedSubCategories, dispatch]);

  useEffect(() => {
    Object.entries(subSubCategories).forEach(([subId, subSubs]) => {
      const hasSelectedSubSub = subSubs.some((subsub) =>
        selectedSubSubCategories.includes(subsub._id),
      );

      if (hasSelectedSubSub) {
        setOpenSubCategoryIds((prev) =>
          prev.includes(subId) ? prev : [...prev, subId],
        );
      }
    });
  }, [subSubCategories, selectedSubSubCategories]);

  return (
    <FilterSection
      title="Categories"
      sectionKey="categories"
      defaultOpen={true}
    >
      <ul className="space-y-5 pt-5">
        {loadingCategories ? (
          <li className="text-[var(--secondary)] pt-5">
            Loading categories...
          </li>
        ) : categories.length === 0 ? (
          <li className="text-[var(--secondary)] pt-5">No categories found</li>
        ) : (
          categories.map((item) => (
            <li key={item._id}>
              {/* Category Row */}
              <div
                onClick={() => handleCategoryClick(item._id)}
                className="text-[clamp(10px,3vw,40px)] sm:text-[clamp(12px,1.9vw,30px)] lg:text-[clamp(10px,1vw,40px)] flex justify-between items-center cursor-pointer"
              >
                <span
                  className={`${selectedSubCategories.includes(item._id) ? "font-darker" : ""}`}
                >
                  {item.name}
                </span>

                {openCategoryIds.includes(item._id) ? (
                  <ChevronDown className="w-5 h-5" />
                ) : (
                  <ChevronRight className="w-5 h-5" />
                )}
              </div>
              {/* SubCategories */}
              {openCategoryIds.includes(item._id) && (
                <ul className="pl-3 text-[clamp(8px,2.5vw,40px)] sm:text-[clamp(10px,1.8vw,30px)] lg:text-[clamp(10px,0.9vw,40px)]">
                  {loadingSubCategories ? (
                    <li className="text-[var(--secondary)] pt-5">
                      Loading sub-categories...
                    </li>
                  ) : (subCategoriesByCategory[item._id] || []).length === 0 ? (
                    <li className="text-[var(--secondary)] pt-5">
                      No sub-categories found
                    </li>
                  ) : (
                    (subCategoriesByCategory[item._id] || []).map((sub) => {
                      const subSubs = subSubCategories[sub._id] || [];
                      const hasSubSub = subSubs.length > 0;

                      return (
                        <li key={sub._id} className="flex flex-col pt-5">
                          <div
                            onClick={() => {
                              if (hasSubSub) {
                                handleSubCategoryClick(sub._id);
                              }
                              handleSubCategoryChange(sub._id); // ALWAYS select on row click
                            }}
                            className="flex justify-between items-center cursor-pointer"
                          >
                            <span>{sub.name}</span>

                            {hasSubSub ? (
                              openSubCategoryIds.includes(sub._id) ? (
                                <ChevronDown className="w-5 h-5" />
                              ) : (
                                <ChevronRight className="w-5 h-5" />
                              )
                            ) : (
                              <input
                                type="checkbox"
                                checked={selectedSubCategories.includes(
                                  sub._id,
                                )}
                                className="w-5 h-5"
                              />
                            )}
                          </div>

                          {/* SubSubCategories */}
                          {hasSubSub &&
                            openSubCategoryIds.includes(sub._id) && (
                              <ul className="pl-5 pt-3">
                                {loadingSubSubCategories &&
                                subSubs.length === 0 ? (
                                  <li className="text-[var(--secondary)] pt-3">
                                    Loading sub-sub-categories...
                                  </li>
                                ) : subSubs.length === 0 ? (
                                  <li className="text-[var(--secondary)] pt-3">
                                    No sub-sub-categories found
                                  </li>
                                ) : (
                                  subSubs.map((subsub) => (
                                    <li
                                      key={subsub._id}
                                      onClick={() =>
                                        handleSubSubCategoryChange(subsub._id)
                                      }
                                      className="flex justify-between items-center pt-3 cursor-pointer"
                                    >
                                      <span>{subsub.name}</span>

                                      <input
                                        type="checkbox"
                                        checked={selectedSubSubCategories.includes(
                                          subsub._id,
                                        )}
                                        className="w-5 h-5"
                                      />
                                    </li>
                                  ))
                                )}
                              </ul>
                            )}
                        </li>
                      );
                    })
                  )}
                </ul>
              )}
            </li>
          ))
        )}
      </ul>
    </FilterSection>
  );
}

export default CategoriesFilter;
