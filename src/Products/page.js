import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import ProductsBanner from "./Components/ProductsBanner";
import ProductsPage from "./Components/Products";

function Products() {
  return (
    <div>
      <Navbar  color={"black"}/>
      <ProductsBanner />
      <ProductsPage />
      <Footer/>
    </div>
  );
}

export default Products;
