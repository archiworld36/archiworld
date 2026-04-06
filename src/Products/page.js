import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import ProductsBanner from "./Components/ProductsBanner";
import ProductsPage from "./Components/Products";
import { useSearchParams } from "wouter";

function Products() {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("searchTerm") || "";
  return (
    <div>
      <Navbar color={"black"} searchKey={searchTerm} />
      <ProductsBanner />
      <ProductsPage searchTerm={searchTerm} />
      <Footer />
    </div>
  );
}

export default Products;
