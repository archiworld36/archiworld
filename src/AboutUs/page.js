import React from "react";
import AboutUsBanner from "./Components/Banner";
import Footer from "../Components/Footer";
import AccessLogo from "../HomePage/Components/AccessLogo";
import Mission from "./Components/Mission";
import Features from "./Components/Features";

function AboutUs() {
  return (
    <div>
      <AboutUsBanner />
      <Mission />
      <Features />
      <AccessLogo />
      <Footer />
    </div>
  );
}

export default AboutUs;
