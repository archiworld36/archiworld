import { useState, useEffect } from "react";

export default function CircularWheel() {
  const images = [
    "https://assets.codepen.io/756881/amys-1.jpg",
    "https://assets.codepen.io/756881/amys-2.jpg",
    "https://assets.codepen.io/756881/amys-3.jpg",
    "https://assets.codepen.io/756881/amys-4.jpg",
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
              {images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt=""
                  className={`absolute inset-0 w-full h-full cursor-pointer object-cover transition-opacity duration-300 ease-in-out ${
                    i === imgIndex ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
