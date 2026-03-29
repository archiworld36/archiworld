import ProductCard from "../../../Components/ProductCard";

export default function MoreProducts({ suggestedProducts, name, loader }) {
  return (
    <div className="w-full pb-[20px] sm:pb-[30px] lg:pb-[40px]">
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-2 items-center justify-between w-full pb-[20px] sm:pb-[30px] lg:pb-[40px]">
        {/* Title */}
        <h2 className="w-full text-[clamp(20px,5vw,120px)] sm:text-[clamp(20px,5.5vw,120px)] lg:text-[clamp(20px,3.8vw,120px)] capitalize leading-tight font-medium font-[Poppins]">
          {name}
        </h2>
      </div>

      {/* Carousel */}
      <div className="overflow-hidden">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 transition-transform duration-500">
          <ProductCard paginatedProducts={suggestedProducts} loader={loader} />
        </div>
      </div>
    </div>
  );
}
