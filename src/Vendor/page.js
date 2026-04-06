import React, { useCallback, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import TopNavigation from "./Components/TopNavigation";
import About from "./Components/About";
import MoreProducts from "../Products/details/Components/MoreProducts";
import { useParams } from "wouter";
import { useDispatch, useSelector } from "react-redux";
import { fetchVendorById } from "./VendorAPI";
import { fetchSuggestedUserProducts } from "../Products/ProductsAPI";

function VendorDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { vendorById = {}, loadingVendorDetailsFetch } = useSelector(
    (state) => state.vendor,
  );

  const { suggestedProduct = [], loadingSuggestedProductFetch } = useSelector(
    (state) => state.product,
  );

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
      {suggestedProduct.length > 1 && (
        <div className="flex flex-1 relative px-[3vw] lg:px-[2.34375vw] pb-10 gap-[2.8vw] lg:gap-[2.2vw]">
          <MoreProducts
            suggestedProducts={suggestedProduct}
            loader={loadingSuggestedProductFetch}
            name={`Products by ${vendorById.name}`}
          />
        </div>
      )}
      <Footer />
    </div>
  );
}

export default VendorDetails;
