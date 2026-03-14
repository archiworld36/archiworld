import React, { useState } from "react";
import { FilterSection } from "./FilterSection";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubCategory, fetchSubSubCategory } from "../masterDataAPI";
import { ChevronDown, ChevronRight } from "lucide-react";

function CategoriesFilter() {
  const {
    categories = [],
    loadingCategories = false,
    subCategories = [],
    loadingSubCategories = false,
    subSubCategories = {},
    loadingSubSubCategories = false,
  } = useSelector((state) => state.masterData);
  const dispatch = useDispatch();
  const [openCategoryId, setOpenCategoryId] = useState(null);
  const [openSubCategoryId, setOpenSubCategoryId] = useState(null);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [selectedSubSubCategories, setSelectedSubSubCategories] = useState([]);

  const handleCategoryClick = async (id) => {
    if (openCategoryId === id) {
      setOpenCategoryId(null);
      return;
    }

    setOpenCategoryId(id);

    const res = await dispatch(fetchSubCategory(id));

    if (res.payload) {
      res.payload.forEach((sub) => {
        dispatch(fetchSubSubCategory(sub._id));
      });
    }
  };

  const handleSubCategoryClick = (id) => {
    if (openSubCategoryId === id) {
      setOpenSubCategoryId(null);
    } else {
      setOpenSubCategoryId(id);
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
  const handleSubSubCategoryChange = (id) => {
    setSelectedSubSubCategories(
      (prev) =>
        prev.includes(id)
          ? prev.filter((item) => item !== id) // remove
          : [...prev, id], // add
    );
  };

  return (
    <FilterSection title="Categories" sectionKey="categories">
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
                    subCategories.map((sub) => {
                      const subSubs = subSubCategories[sub._id] || [];
                      const hasSubSub = subSubs.length > 0;

                      return (
                        <li key={sub._id} className="flex flex-col pt-5">
                          <div
                            onClick={() =>
                              hasSubSub && handleSubCategoryClick(sub._id)
                            }
                            className="flex justify-between items-center cursor-pointer"
                          >
                            <span>{sub.name}</span>

                            {hasSubSub ? (
                              openSubCategoryId === sub._id ? (
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
                                onChange={() =>
                                  handleSubCategoryChange(sub._id)
                                }
                                className="w-5 h-5"
                              />
                            )}
                          </div>

                          {/* SubSubCategories */}
                          {hasSubSub && openSubCategoryId === sub._id && (
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
                                    className="flex justify-between items-center pt-3"
                                  >
                                    <span>{subsub.name}</span>

                                    <input
                                      type="checkbox"
                                      checked={selectedSubSubCategories.includes(
                                        subsub._id,
                                      )}
                                      onChange={() =>
                                        handleSubSubCategoryChange(subsub._id)
                                      }
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
