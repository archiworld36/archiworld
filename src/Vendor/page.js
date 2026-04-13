import React, { useCallback, useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import TopNavigation from "./Components/TopNavigation";
import About from "./Components/About";
import MoreProducts from "../Products/details/Components/MoreProducts";
import { useParams } from "wouter";
import { useDispatch, useSelector } from "react-redux";
import { fetchVendorById } from "./VendorAPI";
import { fetchSuggestedUserProducts } from "../Products/ProductsAPI";
import CategoriesCrousel from "../Components/CategoriesCrousel";
import { ChevronLeft, ChevronRight, FileDown } from "lucide-react";

function VendorDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { vendorById = {}, loadingVendorDetailsFetch } = useSelector(
    (state) => state.vendor,
  );

  const { suggestedProduct = [], loadingSuggestedProductFetch } = useSelector(
    (state) => state.product,
  );
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

  const fetchVendorDetails = useCallback(() => {
    dispatch(fetchVendorById(id));
  }, [dispatch, id]);

  const fetchSuggested = useCallback(() => {
    dispatch(fetchSuggestedUserProducts(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (id) {
      fetchVendorDetails();
      fetchSuggested();
    }
  }, [fetchVendorDetails, id, fetchSuggested]);

  if (loadingVendorDetailsFetch) {
    return (
      <div>
        <Navbar color={"black"} />
        <div className="p-10 flex items-center justify-center w-screen h-screen">
          Loading...
        </div>
      </div>
    );
  }

  const maxIndex = vendorById.catalogues?.length - itemsPerView;

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
    <div>
      <Navbar color={"black"} />
      <TopNavigation vendor={vendorById} />
      <img
        src={vendorById.bannerImage}
        alt=""
        className="w-full aspect-[3.959/1] object-cover"
      />
      <About about={vendorById.about} />
      {vendorById?.category?.length > 0 && (
        <CategoriesCrousel
          name={`Solutions ${vendorById?.name}`}
          item={vendorById?.category}
          navi={true}
        />
      )}
      {vendorById?.subCategories?.length > 0 && (
        <CategoriesCrousel
          name={`Collections ${vendorById?.name}`}
          item={vendorById?.subCategories}
        />
      )}
      {suggestedProduct?.length > 1 && (
        <div className="flex flex-1 relative px-[3vw] lg:px-[2.34375vw] pb-10 gap-[2.8vw] lg:gap-[2.2vw]">
          <MoreProducts
            suggestedProducts={suggestedProduct}
            loader={loadingSuggestedProductFetch}
            name={`Products by ${vendorById?.name}`}
          />
        </div>
      )}
      {vendorById?.catalogues?.length > 0 && (
        <div className="flex flex-col relative px-[3vw] lg:px-[2.34375vw] pb-10">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-2 items-center justify-between w-full pb-[20px] sm:pb-[30px] lg:pb-[40px]">
            {/* Title */}
            <h2 className="w-full text-[clamp(20px,5vw,120px)] sm:text-[clamp(20px,5.5vw,120px)] lg:text-[clamp(20px,3.8vw,120px)] capitalize leading-tight font-medium font-[Poppins]">
              Catalogues
            </h2>
          </div>

          {/* Carousel */}
          <div className="overflow-hidden">
            <div
              className="flex gap-4 md:gap-6 transition-transform duration-500"
              style={{
                transform: `translateX(-${(currentIndex / itemsPerView) * 100}%)`,
              }}
            >
              {vendorById.catalogues?.map((item, index) => (
                <div
                  key={index}
                  className="min-w-[calc(50%-1rem)] max-w-[calc(50%-1rem)] md:min-w-[calc(25%-1.5rem)] md:max-w-[calc(25%-1.5rem)]"
                >
                  <div className="rounded-xl overflow-hidden relative border shadow-md">
                    {/* Banner */}
                    <img
                      src={item.banner}
                      alt=""
                      className="w-full aspect-[1/1] object-cover"
                    />
                    {/* Download Button */}
                    <button
                      onClick={() =>
                        window.open(item.pdf, "_blank", "noopener,noreferrer")
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
          {vendorById.catalogues?.length > itemsPerView && (
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
      )}
      <Footer />
    </div>
  );
}

export default VendorDetails;
