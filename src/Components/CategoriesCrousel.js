import React from "react";
import { useLocation } from "wouter";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
function CategoriesCrousel({ item, name, navi = false }) {
  const [, navigate] = useLocation();

  return (
    <div className="flex flex-1 relative px-[3vw] lg:px-[2.34375vw] gap-[2.8vw] lg:gap-[2.2vw]">
      <div className="w-full pb-[20px] sm:pb-[30px] lg:pb-[40px]">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-2 items-center justify-between w-full pb-[20px] sm:pb-[30px] lg:pb-[40px]">
          {/* Title */}
          <h2 className="w-full text-[clamp(20px,5vw,120px)] sm:text-[clamp(20px,5.5vw,120px)] lg:text-[clamp(20px,3.8vw,120px)] capitalize leading-tight font-medium font-[Poppins]">
            {name}
          </h2>
        </div>
        {/* Carousel */}
        <div className="overflow-hidden">
          <Swiper
            modules={[Pagination]}
            spaceBetween={16}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              0: {
                slidesPerView: 2, // mobile
              },
              640: {
                slidesPerView: 3, // sm+
              },
              1024: {
                slidesPerView: 4, // lg+
              },
            }}
          >
            {item?.map((product) => (
              <SwiperSlide
                key={product._id}
                onClick={() => {
                  if (navi) {
                    navigate(`/products?category=${product._id}`);
                  } else {
                    navigate(`/products?subCategory=${product._id}`);
                  }
                }}
              >
                <div className="text-black overflow-hidden cursor-pointer shadow-lg rounded-2xl lg:rounded-3xl">
                  <div className="overflow-hidden relative rounded-2xl lg:rounded-3xl">
                    <img
                      src={product?.bannerImage}
                      alt={product?.name}
                      className="aspect-square w-full object-cover"
                    />

                    <div className="absolute bottom-0 left-0 w-full px-2 lg:px-4 py-2 lg:py-4 h-1/3 flex flex-col justify-end gap-1 text-black bg-gradient-to-t from-black/80 via-black/20 to-transparent backdrop-blur-[1px]">
                      <h3
                        style={{ fontFamily: "Playfair Display" }}
                        className="text-[clamp(10px,2.5vw,40px)] sm:text-[clamp(10px,1.5vw,30px)] lg:text-[clamp(10px,0.9vw,40px)] bg-white w-fit rounded-full px-4 py-1"
                      >
                        {product?.name}
                      </h3>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default CategoriesCrousel;
