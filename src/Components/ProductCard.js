import { MapPin } from "lucide-react";
import React from "react";
import { useLocation } from "wouter";

function ProductCard({ paginatedProducts }) {
  const [, navigate] = useLocation();
  return (
    <>
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
            <div className="absolute bottom-0 left-0 w-full px-3 lg:px-6 py-3 lg:py-6 h-1/3 flex flex-col justify-end gap-1 text-black transition-all bg-gradient-to-t from-black/80 via-black/20 to-transparent backdrop-blur-[1px]">
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
            <p className="text-[var(--secondary)] flex gap-1 items-center">
              <MapPin className="w-4 h-4" />
              {product.location}
            </p>
          </div>
        </div>
      ))}
    </>
  );
}

export default ProductCard;
