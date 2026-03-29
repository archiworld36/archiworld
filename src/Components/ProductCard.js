import { MapPin } from "lucide-react";
import React from "react";
import { useLocation } from "wouter";
import { SkeletonCard } from "./Skeleton";

function ProductCard({ paginatedProducts, loader = false }) {
  const [, navigate] = useLocation();

  return (
    <>
      {loader
        ? Array.from({ length: 4 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))
        : paginatedProducts.map((product) => (
            <div
              onClick={() => navigate(`/products/${product._id}`)}
              key={product._id}
              className="text-black overflow-hidden cursor-pointer shadow-lg rounded-2xl lg:rounded-3xl"
            >
              <div className="overflow-hidden relative rounded-2xl lg:rounded-3xl">
                <img
                  src={product?.bannerImage}
                  alt={product?.name}
                  className="aspect-square w-full object-cover"
                />
                <div className="absolute bottom-0 left-0 w-full px-3 lg:px-6 py-3 lg:py-6 h-1/3 flex flex-col justify-end gap-1 text-black transition-all bg-gradient-to-t from-black/80 via-black/20 to-transparent backdrop-blur-[1px]">
                  <h3
                    style={{ fontFamily: "Playfair Display" }}
                    className="text-[clamp(10px,2.5vw,40px)] sm:text-[clamp(10px,1.5vw,30px)] lg:text-[clamp(10px,0.9vw,40px)] bg-white w-fit rounded-full px-4 py-1"
                  >
                    {product?.category?.name}
                  </h3>
                </div>
              </div>

              <div className="text-[clamp(10px,2.5vw,40px)] sm:text-[clamp(10px,1.5vw,30px)] lg:text-[clamp(10px,0.9vw,40px)] p-4">
                <p className="mb-1">
                  <span className="font-light">Price Range</span>{" "}
                  <span className="font-bold">
                    ₹{product.price?.min?.toLocaleString("en-IN")} - ₹
                    {product.price?.max?.toLocaleString("en-IN")}
                  </span>
                </p>
                <h3 className="font-semibold mb-1">{product?.name}</h3>
                <p className="text-[var(--secondary)] flex gap-1 items-center">
                  <MapPin className="w-4 h-4" />
                  {product?.user?.city}, {product?.user?.state}
                </p>
              </div>
            </div>
          ))}
    </>
  );
}

export default ProductCard;
