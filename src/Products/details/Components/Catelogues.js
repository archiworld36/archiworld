import { ChevronLeft, ChevronRight, FileDown } from "lucide-react";
import { useEffect, useState } from "react";

export default function CatalogueCarousel({ catalogues }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);

  // responsive cards
  useEffect(() => {
    const handleResize = () => {
      setItemsPerView(window.innerWidth < 768 ? 2 : 4);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // unique categories from backend
  const categories = ["All", ...new Set(catalogues?.map((item) => item.type))];

  const filtered =
    activeCategory === "All"
      ? catalogues
      : catalogues.filter((item) => item.type === activeCategory);

  const maxIndex = filtered?.length - itemsPerView;

  const next = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + itemsPerView);
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - itemsPerView);
    }
  };

  return (
    <div className="w-full pb-[20px] sm:pb-[30px] lg:pb-[40px]">
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-2 items-center justify-between w-full pb-[20px] sm:pb-[30px] lg:pb-[40px]">
        {/* Title */}
        <h2 className="w-full text-[clamp(20px,5vw,120px)] sm:text-[clamp(20px,5.5vw,120px)] lg:text-[clamp(20px,3.8vw,120px)] capitalize leading-tight font-medium font-[Poppins]">
          Catalogues
        </h2>

        {/* Category Buttons */}
        <div className="w-full flex flex-wrap lg:justify-end gap-3">
          {categories.map((cat) => {
            const count =
              cat === "All"
                ? ""
                : `(${catalogues.filter((item) => item.type === cat).length})`;

            return (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setCurrentIndex(0);
                }}
                className={`px-4 py-2 rounded-full text-sm ${activeCategory === cat ? "bg-black text-white" : "bg-[var(--primary)] text-[var(--secondary)]"}`}
              >
                {cat} {count}
              </button>
            );
          })}
        </div>
      </div>

      {/* Carousel */}
      <div className="overflow-hidden">
        <div
          className="flex gap-4 md:gap-6 transition-transform duration-500"
          style={{
            transform: `translateX(-${(currentIndex / itemsPerView) * 100}%)`,
          }}
        >
          {filtered?.map((item, index) => (
            <div
              key={index}
              className="min-w-[calc(50%-1rem)] max-w-[calc(50%-1rem)] md:min-w-[calc(25%-1.5rem)] md:max-w-[calc(25%-1.5rem)]"
            >
              <div className="rounded-xl overflow-hidden relative border shadow-md">
                {/* Banner */}
                <img
                  src={item.bannerImage}
                  alt=""
                  className="w-full aspect-[1/1] object-cover"
                />
                {/* Download Button */}
                <button
                  onClick={() =>
                    window.open(item.pdfFile, "_blank", "noopener,noreferrer")
                  }
                  className="absolute bottom-4 right-4 bg-white rounded-full p-3 shadow-xl"
                >
                  <FileDown />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      {filtered?.length > itemsPerView && (
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={prev}
            disabled={currentIndex === 0}
            className="g-white rounded-full p-3 border border-[var(--stroke)] disabled:opacity-40"
          >
            <ChevronLeft />
          </button>

          <button
            onClick={next}
            disabled={currentIndex >= maxIndex}
            className="g-white rounded-full p-3 border border-[var(--stroke)] disabled:opacity-40"
          >
            <ChevronRight />
          </button>
        </div>
      )}
    </div>
  );
}
