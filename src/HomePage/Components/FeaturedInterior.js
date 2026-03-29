import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeaturedProducts } from "../../Products/ProductsAPI";
import { useLocation } from "wouter";
import { SkeletonCard } from "../../Components/Skeleton";

export default function FeaturedMarquee() {
  const marqueeRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [position, setPosition] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);
  const [cardsPerRow, setCardsPerRow] = useState(2);
  const dispatch = useDispatch();
  const { featuredProducts = [], loading } = useSelector(
    (state) => state.product,
  );
  const [, navigate] = useLocation();

  const fetchFeatured = useCallback(() => {
    dispatch(fetchFeaturedProducts());
  }, [dispatch]);

  // 👇 useEffect will only run once and call the fetch function
  useEffect(() => {
    fetchFeatured();
  }, [fetchFeatured]);

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

  const visibleCards = featuredProducts.slice(0, visibleCount);
  const allVisible = visibleCount >= featuredProducts.length;

  const repeatedProducts = Array(20) // jitna long chahiye
    .fill(featuredProducts)
    .flat();

  return (
    <>
      {loading ? (
        Array.from({ length: 4 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))
      ) : (
        <section className="w-full py-[8%] lg:py-[4%] bg-[var(--primary)] overflow-hidden">
          {/* Header */}
          <div className="lg:flex justify-between items-center px-4 lg:px-10 mb-[8%] lg:mb-[2.5%]">
            <h2 className="text-[clamp(20px,6vw,120px)] lg:text-[clamp(20px,4.2vw,120px)] py-[1%] text-center capitalize leading-tight font-medium font-[Poppins]">
              Featured Interior Inspiration
            </h2>
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
              {repeatedProducts.map((card, index) => (
                <div
                  key={index}
                  className="group min-w-[320px] pt-16 transition-all duration-500 relative hover:-translate-y-24"
                >
                  {/* Card Image */}
                  <div
                    onClick={() => navigate(`/products/${card._id}`)}
                    className="overflow-hidden relative rounded-3xl cursor-pointer"
                  >
                    <img
                      src={card.bannerImage}
                      alt=""
                      className="w-full h-[320px] object-cover"
                    />
                    <div className="absolute bottom-0 left-0 w-full px-6 py-6 h-1/3 flex flex-col justify-end gap-1 text-white transition-all bg-gradient-to-t from-black/80 via-black/20 to-transparent backdrop-blur-[1px]">
                      <h3
                        style={{ fontFamily: "Playfair Display" }}
                        className="text-[clamp(10px,1.5vw,40px)] line-clamp-1"
                      >
                        {card.name}
                      </h3>
                      <p className="text-[clamp(10px,0.9vw,40px)] line-clamp-1 text-[var(--primary)]">
                        {card.description}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Info */}
                  <div
                    onClick={() => navigate(`/vendor/${card.user._id}`)}
                    className="px-1 py-6 absolute opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 cursor-pointer"
                  >
                    <img
                      src={card.user.profileLogo}
                      alt="logo"
                      className="h-16 w-16 mb-2"
                    />
                    <p className="text-[clamp(10px,0.9vw,40px)] text-black">
                      {card.user.name}
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
                <div
                  onClick={() => navigate(`/products/${card._id}`)}
                  className="overflow-hidden relative rounded-xl cursor-pointer"
                >
                  <img
                    src={card.bannerImage}
                    alt=""
                    className="w-full h-[280px] object-cover"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute bottom-0 left-0 w-full px-3 py-3 h-1/3 flex flex-col justify-end text-white bg-gradient-to-t from-black/80 via-black/20 to-transparent backdrop-blur-[2px]">
                    <h3
                      style={{ fontFamily: "Playfair Display" }}
                      className="text-[clamp(10px,4vw,40px)] sm:text-[clamp(12px,2.5vw,30px)] line-clamp-1"
                    >
                      {card.name}
                    </h3>
                    <p className="text-[clamp(10px,2.5vw,40px)] sm:text-[clamp(10px,1.5vw,30px)] line-clamp-1 text-[var(--primary)]">
                      {card.description}
                    </p>
                  </div>
                </div>

                {/* Bottom Info */}
                <div
                  onClick={() => navigate(`/vendor/${card.user._id}`)}
                  className="px-1 py-6 cursor-pointer"
                >
                  <img
                    src={card.user.profileLogo}
                    alt="logo"
                    className="h-16 w-16 mb-2"
                  />
                  <p className="text-[clamp(10px,2.5vw,40px)] sm:text-[clamp(10px,1.5vw,30px)] text-black">
                    {card.user.name}
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
      )}
    </>
  );
}
