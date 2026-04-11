import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import ProductsBanner from "./Components/ProductsBanner";
import ProductsPage from "./Components/Products";
import { useSearchParams } from "wouter";

function Products() {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("searchTerm") || "";
  const category = searchParams.get("category") || "";
  const subCategory = searchParams.get("subCategory") || "";
  return (
    <div>
      <Navbar color={"black"} searchKey={searchTerm} />
      <ProductsBanner />
      <ProductsPage
        searchTerm={searchTerm}
        category={category}
        subCategory={subCategory}
      />
      <Footer />
    </div>
  );
}

export default Products;
