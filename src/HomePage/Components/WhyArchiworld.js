import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function WhyArchiworld() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const cards = [
    {
      title: "All in One Place",
      description:
        "Browse projects, discover products, connect with experts, and learn all in one place.",
    },
    {
      title: "Curated Design Inspiration",
      description:
        "Discover thoughtfully designed spaces across styles, rooms, and budgets to spark ideas for your own home.",
    },
    {
      title: "Expert Connections",
      description:
        "Find and connect with experienced architects, interior designers, and specialists for guidance and collaboration.",
    },
    {
      title: "Informed Decision-Making",
      description:
        "Learn about finishes, furniture types, layouts, and trends before starting your interior journey.",
    },
  ];

  const maxIndex = cards.length - 1;

  const moveLeft = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const moveRight = () => {
    if (currentIndex === maxIndex) return;
    if (currentIndex < maxIndex) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  return (
    <section className="w-full pb-[8%] lg:pb-[4%] overflow-hidden">
      {/* Header */}
      <div className="lg:flex justify-between items-center px-4 lg:px-10 mb-[6%] lg:mb-[2%]">
        <h2 className="text-[clamp(20px,6vw,120px)] lg:text-[clamp(20px,4.2vw,120px)] py-[1%] text-center capitalize leading-tight font-medium font-[Poppins]">
          Why Archiworld?
        </h2>
      </div>

      {/* Slider */}
      <div className="overflow-hidden px-6">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {cards.map((card, index) => (
            <div key={index} className="w-full lg:w-1/4 flex-shrink-0 px-4">
              <div className="flex flex-col justify-center gap-2 px-6 py-6 text-center">
                <h3
                  style={{ fontFamily: "Playfair Display" }}
                  className="text-[clamp(10px,4vw,40px)] sm:text-[clamp(12px,2.5vw,30px)] lg:text-[clamp(10px,1.5vw,40px)]"
                >
                  {card.title}
                </h3>
                <p className="text-[clamp(10px,2.5vw,40px)] sm:text-[clamp(10px,1.5vw,30px)] lg:text-[clamp(10px,0.9vw,40px)]">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex lg:hidden justify-center px-4 gap-4 mt-6">
        <div
          onClick={moveLeft}
          className="w-10 h-10 sm:w-16 sm:h-16 rounded-full border border-[#B7B7B7] bg-white flex items-center justify-center 
          hover:bg-black hover:text-white transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-5 h-5 sm:w-8 sm:h-8 stroke-1" />
        </div>

        <div
          onClick={moveRight}
          className="w-10 h-10 sm:w-16 sm:h-16 rounded-full border border-[#B7B7B7] bg-white flex items-center justify-center 
          hover:bg-black hover:text-white transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-5 h-5 sm:w-8 sm:h-8 stroke-1" />
        </div>
      </div>
    </section>
  );
}
