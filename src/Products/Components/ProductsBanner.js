import React from "react";
import { useLocation } from "wouter";

function ProductsBanner() {
  const [, navigate] = useLocation();
  return (
    <div className="px-[3vw] lg:px-[2.34375vw]">
      {/* Top Navigation*/}
      <div className="pt-[20px] sm:pt-[30px] lg:pt-[40px]">
        <p className="text-[var(--secondary)] text-[clamp(10px,3.5vw,40px)] sm:text-[clamp(10px,2vw,30px)] lg:text-[clamp(10px,0.9vw,40px)]">
          <span
            onClick={() => navigate("/")}
            className="cursor-pointer hover:underline"
          >
            Home
          </span>{" "}
          {">"} <span>Products</span>
        </p>
      </div>
      {/* Top Heading*/}
      <div className="py-[20px] sm:py-[30px] lg:py-[40px] flex flex-col lg:flex-row justify-between lg:items-center gap-[3vw]">
        <h1 className="text-[clamp(20px,7vw,120px)] sm:text-[clamp(20px,5.6vw,120px)] lg:text-[clamp(20px,4.5vw,120px)] capitalize leading-tight font-medium font-[Poppins]">
          Products.
        </h1>
        <h3 className="lg:w-2/5 text-[clamp(12px,3vw,40px)] sm:text-[clamp(12px,2.3vw,30px)] lg:text-[clamp(10px,1.2vw,40px)]">
          Archiworld offers an extensive range of building, construction,
          interior, and exterior products sourced from some of the most trusted
          brands and suppliers.
        </h3>
      </div>
    </div>
  );
}

export default ProductsBanner;
