import React, { useCallback, useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import ProductData from "./Components/ProductDetails";
import { useParams } from "wouter";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById, fetchSuggestedProducts } from "../ProductsAPI";
import CatalogueCarousel from "./Components/Catelogues";
import MoreProducts from "./Components/MoreProducts";
import ShareModal from "../../Components/Share";

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    productById = {},
    loadingProductDetailsFetch,
    suggestedProduct = [],
    loadingSuggestedProductFetch,
  } = useSelector((state) => state.product);
  const [shareOpen, setShareOpen] = useState(false);

  const fetchProductDetails = useCallback(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  const fetchSuggested = useCallback(() => {
    dispatch(fetchSuggestedProducts(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (id) {
      fetchProductDetails();
      fetchSuggested();
    }
  }, [fetchProductDetails, id, fetchSuggested]);

  if (loadingProductDetailsFetch) {
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
      <div className="px-[3vw] lg:px-[2.34375vw]">
        <ProductData productById={productById} setShareOpen={setShareOpen} />
        {productById?.catalogues?.length > 0 && (
          <CatalogueCarousel catalogues={productById?.catalogues} />
        )}
        {suggestedProduct.length > 1 && (
          <MoreProducts
            suggestedProducts={suggestedProduct}
            loader={loadingSuggestedProductFetch}
            name={`More from ${productById?.user?.name}`}
          />
        )}
        <ShareModal
          isOpen={shareOpen}
          onClose={() => setShareOpen(false)}
          url={window.location.href}
          title={productById.title}
        />
      </div>
      <Footer />
    </div>
  );
}

export default ProductDetails;
