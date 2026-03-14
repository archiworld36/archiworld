import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "wouter";

export default function CircularWheel() {
  const { categories = [] } = useSelector((state) => state.masterData);
  const [, navigate] = useLocation();
  const images = [
    "https://assets.codepen.io/756881/amys-1.jpg",
    "https://assets.codepen.io/756881/amys-2.jpg",
    "https://assets.codepen.io/756881/amys-3.jpg",
    "https://archiworld-files.s3.ap-south-1.amazonaws.com/categories/banner/0ec07c75-5765-4ae4-93b4-7bb05e24ebc1-360_F_126394058_6VKelLGUvMBzvKC9WbgHabZ5eLrNssup.jpg",
    "https://assets.codepen.io/756881/amys-5.jpg",
    "https://assets.codepen.io/756881/amys-6.jpg",
    "https://assets.codepen.io/756881/amys-7.jpg",
  ];

  // fixed layout (source of truth)
  const rotations = [-45, -30, -15, 0, 15, 30, 45];
  const translateY = [20, 9.5, 2.5, 0, 2.5, 9.5, 20];
  const translateX = [-10, -3, 0, 0, 0, 3, 10];

  const [index, setIndex] = useState(0);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (hover) return;

    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 2500);

    return () => clearInterval(id);
  }, [hover, images.length]);

  return (
    <div className="w-full pt-4 pb-[20vw] overflow-hidden flex justify-center">
      <div className="relative flex gap-[10vw] sm:gap-[7vw] lg:gap-[4vw] pt-6">
        {rotations.map((_, slotIndex) => {
          const imgIndex = (index + slotIndex) % images.length;

          return (
            <div
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              key={slotIndex}
              className="relative min-w-[45vw] h-[55vw] sm:min-w-[25vw] sm:h-[35vw] lg:min-w-[15vw] lg:h-[20vw] rounded-2xl overflow-hidden will-change-transform transition-transform duration-300
                [--hoverY:0]
                lg:hover:[--hoverY:-2]
                [--rScale:0.6]
                [--xScale:20]
                [--yScale:1.4]
                sm:[--rScale:0.8]
                sm:[--xScale:1]
                sm:[--yScale:1.3]
                lg:[--rScale:1]
                lg:[--xScale:1]
                lg:[--yScale:1]"
              style={{
                transform: `
                  rotate(calc(${rotations[slotIndex]}deg * var(--rScale)))
                  translateX(calc(${translateX[slotIndex]}vw * var(--xScale)))
                  translateY(calc((${translateY[slotIndex]} + var(--hoverY)) * 1vw * var(--yScale)))
                `,
              }}
            >
              {categories
                .filter((item) => item.bannerImage) // keep only items having bannerImage
                .map((img, i) => (
                  <div
                    key={i}
                    onClick={() => navigate(`/products?category=${img._id}`)}
                    className={`absolute inset-0 w-full h-full cursor-pointer transition-opacity duration-300 ease-in-out ${
                      i === imgIndex ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {/* Card Image */}
                    <div className="overflow-hidden w-full h-full relative rounded-3xl">
                      <img
                        src={img.bannerImage}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 w-full px-6 py-6 h-1/3 flex flex-col justify-end gap-1 text-white transition-all bg-gradient-to-t from-black/80 via-black/20 to-transparent backdrop-blur-[1px]">
                        <h3
                          style={{ fontFamily: "Playfair Display" }}
                          className="text-[clamp(10px,1.5vw,40px)] line-clamp-1"
                        >
                          {img.name}
                        </h3>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
