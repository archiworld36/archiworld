import React from "react";
import CircularWheel from "./CircleCrousel";
function BrowseCategories() {
  return (
    <div>
      <div className="w-full h-full flex flex-col gap-3 items-center justify-center">
        <button className="relative border bg-[var(--primary)] mt-[10%] lg:mt-[4%] cursor-default">
          31000+{"  "}
          <span style={{ fontFamily: "Playfair Display" }}>Products</span>
        </button>
        <h2 className="text-[clamp(20px,6vw,120px)] lg:text-[clamp(20px,4.2vw,120px)] py-[1%] text-center capitalize leading-tight font-medium font-[Poppins]">
          Browse Categories
        </h2>
        <h3 className="text-[clamp(12px,4vw,40px)] sm:text-[clamp(12px,2.3vw,30px)] lg:text-[clamp(10px,1.2vw,40px)] capitalize text-center font-light pb-[3%]">
          From small design updates to complete home interiors, explore a wide
          range of curated
          <br /> styles, room ideas, and design categories.
        </h3>
      </div>
      <div className="relative">
        <CircularWheel />
      </div>
    </div>
  );
}

export default BrowseCategories;
