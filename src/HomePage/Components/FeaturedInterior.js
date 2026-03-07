import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const cards = [
  {
    image: "https://images.unsplash.com/photo-1618220179428-22790b461013",
    heading: "Greenapple",
    cardText: "Blake – Modular Fabric Sofa Baryon – Handmade Blown Glass",
    logo: "https://images.unsplash.com/photo-1615874959474-d609969a20ed",
    bottomText: "Premium Living Collection",
  },
  {
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    heading: "Luceplan",
    cardText:
      "Dix Bougies – LED Aluminium Pendant Baryon – Handmade Blown Glass",
    logo: "https://images.unsplash.com/photo-1618220179428-22790b461013",
    bottomText: "Luxury Lighting Series",
  },
  {
    image: "https://images.unsplash.com/photo-1615874959474-d609969a20ed",
    heading: "Calligaris",
    cardText: "Annex – Rectangular Table Baryon – Handmade Blown Glass",
    logo: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0",
    bottomText: "Italian Furniture Design",
  },
  {
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0",
    heading: "Olev",
    cardText: "Baryon – Handmade Blown Glass Baryon – Handmade Blown Glass",
    logo: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    bottomText: "Modern Glass Lighting",
  },
  {
    image: "https://images.unsplash.com/photo-1615874959474-d609969a20ed",
    heading: "Calligaris",
    cardText: "Annex – Rectangular Table Baryon – Handmade Blown Glass",
    logo: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0",
    bottomText: "Italian Furniture Design",
  },
  {
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0",
    heading: "Olev",
    cardText: "Baryon – Handmade Blown Glass Baryon – Handmade Blown Glass",
    logo: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    bottomText: "Modern Glass Lighting",
  },
  {
    image: "https://images.unsplash.com/photo-1615874959474-d609969a20ed",
    heading: "Calligaris",
    cardText: "Annex – Rectangular Table Baryon – Handmade Blown Glass",
    logo: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0",
    bottomText: "Italian Furniture Design",
  },
  {
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0",
    heading: "Olev",
    cardText: "Baryon – Handmade Blown Glass Baryon – Handmade Blown Glass",
    logo: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    bottomText: "Modern Glass Lighting",
  },
  {
    image: "https://images.unsplash.com/photo-1615874959474-d609969a20ed",
    heading: "Calligaris",
    cardText: "Annex – Rectangular Table Baryon – Handmade Blown Glass",
    logo: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0",
    bottomText: "Italian Furniture Design",
  },
  {
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0",
    heading: "Olev",
    cardText: "Baryon – Handmade Blown Glass Baryon – Handmade Blown Glass",
    logo: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    bottomText: "Modern Glass Lighting",
  },
  {
    image: "https://images.unsplash.com/photo-1615874959474-d609969a20ed",
    heading: "Calligaris",
    cardText: "Annex – Rectangular Table Baryon – Handmade Blown Glass",
    logo: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0",
    bottomText: "Italian Furniture Design",
  },
  {
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0",
    heading: "Olev",
    cardText: "Baryon – Handmade Blown Glass Baryon – Handmade Blown Glass",
    logo: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    bottomText: "Modern Glass Lighting",
  },
];

export default function FeaturedMarquee() {
  const marqueeRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [position, setPosition] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);
  const [cardsPerRow, setCardsPerRow] = useState(2);

  const speed = 1; // adjust speed here

  useEffect(() => {
    let animationFrame;

    const animate = () => {
      if (!isPaused) {
        setPosition((prev) => {
          const newPos = prev - speed;

          const width = marqueeRef.current?.scrollWidth / 2;
          if (Math.abs(newPos) >= width) {
            return 0; // seamless reset
          }

          return newPos;
        });
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isPaused]);

  const moveLeft = () => {
    setPosition((prev) => prev + 300);
  };

  const moveRight = () => {
    setPosition((prev) => prev - 300);
  };

  // Detect screen size
  useEffect(() => {
    const updateLayout = () => {
      if (window.innerWidth >= 640) {
        setCardsPerRow(3); // sm:
        setVisibleCount(6); // 2 rows × 3 cols
      } else {
        setCardsPerRow(2); // mobile
        setVisibleCount(4); // 2 rows × 2 cols
      }
    };

    updateLayout();
    window.addEventListener("resize", updateLayout);

    return () => window.removeEventListener("resize", updateLayout);
  }, []);

  const handleMore = () => {
    setVisibleCount((prev) => prev + cardsPerRow * 2);
  };

  const visibleCards = cards.slice(0, visibleCount);
  const allVisible = visibleCount >= cards.length;

  return (
    <section className="w-full py-[8%] lg:py-[4%] bg-[#F6F6F6] overflow-hidden">
      {/* Header */}
      <div className="lg:flex justify-between items-center px-4 lg:px-10 mb-[8%] lg:mb-[2.5%]">
        <h2 className="text-[clamp(20px,6vw,120px)] lg:text-[clamp(20px,4.2vw,120px)] py-[1%] text-center capitalize leading-tight font-medium font-[Poppins]">
          Featured Interior Inspiration
        </h2>

        <div className="hidden lg:flex gap-4">
          <div
            onClick={moveLeft}
            className="w-10 h-10 sm:w-16 sm:h-16 rounded-full border border-[#B7B7B7] bg-white flex items-center justify-center hover:bg-black hover:text-white transition-all ease-in duration-300 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 sm:w-8 sm:h-8 stroke-1" />
          </div>
          <div
            onClick={moveRight}
            className="w-10 h-10 sm:w-16 sm:h-16 rounded-full border border-[#B7B7B7] bg-white flex items-center justify-center hover:bg-black hover:text-white transition-all ease-in duration-300 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5 sm:w-8 sm:h-8 stroke-1" />
          </div>
        </div>
      </div>

      {/* Marquee */}
      <div
        className="hidden lg:block"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          ref={marqueeRef}
          className="flex gap-8"
          style={{
            transform: `translateX(${position}px)`,
            transition: isPaused ? "transform 0.3s ease" : "none",
          }}
        >
          {[...cards, ...cards].map((card, index) => (
            <div
              key={index}
              className="group min-w-[320px] pt-16 transition-all duration-500 relative hover:-translate-y-24"
            >
              {/* Card Image */}
              <div className="overflow-hidden relative rounded-3xl">
                <img
                  src={card.image}
                  alt=""
                  className="w-full h-[420px] object-cover"
                />
                <div className="absolute bottom-0 left-0 w-full px-6 py-6 h-1/3 flex flex-col justify-end gap-1 text-white transition-all bg-gradient-to-t from-black/80 via-black/20 to-transparent backdrop-blur-[1px]">
                  <h3
                    style={{ fontFamily: "Playfair Display" }}
                    className="text-[clamp(10px,1.5vw,40px)] line-clamp-1"
                  >
                    {card.heading}
                  </h3>
                  <p className="text-[clamp(10px,0.9vw,40px)] line-clamp-1 text-[#F6F6F6]">
                    {card.cardText}
                  </p>
                </div>
              </div>

              {/* Bottom Info */}
              <div className="px-1 py-6 absolute opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                <img src={card.logo} alt="logo" className="h-16 w-16 mb-2" />
                <p className="text-[clamp(10px,0.9vw,40px)] text-black">
                  {card.bottomText}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:hidden px-8 gap-4">
        {visibleCards.map((card, index) => (
          <div key={index} className="group w-full relative">
            {/* Card Image */}
            <div className="overflow-hidden relative rounded-xl">
              <img
                src={card.image}
                alt=""
                className="w-full h-[280px] object-cover"
              />

              {/* Gradient Overlay */}
              <div className="absolute bottom-0 left-0 w-full px-3 py-3 h-1/3 flex flex-col justify-end text-white bg-gradient-to-t from-black/80 via-black/20 to-transparent backdrop-blur-[2px]">
                <h3
                  style={{ fontFamily: "Playfair Display" }}
                  className="text-[clamp(10px,4vw,40px)] sm:text-[clamp(12px,2.5vw,30px)] line-clamp-1"
                >
                  {card.heading}
                </h3>
                <p className="text-[clamp(10px,2.5vw,40px)] sm:text-[clamp(10px,1.5vw,30px)] line-clamp-1 text-[#F6F6F6]">
                  {card.cardText}
                </p>
              </div>
            </div>

            {/* Bottom Info */}
            <div className="px-1 py-6">
              <img src={card.logo} alt="logo" className="h-16 w-16 mb-2" />
              <p className="text-[clamp(10px,2.5vw,40px)] sm:text-[clamp(10px,1.5vw,30px)] text-black">
                {card.bottomText}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* More Button */}
      {!allVisible && (
        <button
          onClick={handleMore}
          className="relative border bg-black text-white w-fit mx-auto flex justify-center items-center lg:hidden"
        >
          More
        </button>
      )}
    </section>
  );
}
