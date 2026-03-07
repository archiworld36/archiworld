import React from "react";
import Banner from "./Components/Banner";
import BrowseCategories from "./Components/BrowseCategories";
import FeaturedMarquee from "./Components/FeaturedInterior";
import AccessLogo from "./Components/AccessLogo";
import WhyArchiworld from "./Components/WhyArchiworld";
import Footer from "../Components/Footer";

function Homepage() {
  return (
    <div>
      <Banner />
      <BrowseCategories />
      <FeaturedMarquee />
      <AccessLogo />
      <WhyArchiworld />
      <Footer topStat={true} />
    </div>
  );
}

export default Homepage;
