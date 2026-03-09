import React from "react";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import ProductData from "./Components/ProductDetails";

function ProductDetails() {
  return (
    <div>
      <Navbar color={"black"} />
      <ProductData />
      <Footer />
    </div>
  );
}

export default ProductDetails;
