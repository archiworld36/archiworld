import React from "react";

import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useLocation } from "wouter";

function NotFound() {
  const [, navigate] = useLocation();
  return (
    <div className="min-h-screen">
      <div className="relative inset-0 w-full h-full">
        <img
          src={
            "https://archiworld-files.s3.ap-south-1.amazonaws.com/Website+Images/ErrorBackground.png"
          }
          alt=""
          className="relative inset-0 w-full h-fit min-h-[58vh] sm:min-h-[75vh] object-cover -z-10"
        />
        <div className="w-full h-full absolute top-0 z-20 flex flex-col justify-between">
          <Navbar color="white" />
          <div className="w-full h-full flex px-7 lg:px-3 flex-col items-center justify-center text-white">
            <h2 className="italic font-semibold">OOOPS!</h2>
            <h1 className="text-[clamp(20px,20vw,120px)] sm:text-[clamp(20px,20vw,200px)] lg:text-[clamp(20px,13vw,500px)] text-center leading-none font-bold font-[Poppins]">
              404
            </h1>
            <h4
              style={{ fontFamily: "Playfair Display" }}
              className="text-[clamp(12px,4.5vw,40px)] sm:text-[clamp(12px,3vw,30px)] lg:text-[clamp(10px,1.5vw,40px)] font-normal text-center"
            >
              Page not found!
            </h4>
            <h3 className="text-[clamp(12px,3.5vw,40px)] sm:text-[clamp(12px,2.3vw,30px)] lg:text-[clamp(10px,1.2vw,40px)] font-normal text-center">
              The resource you are looking for doesn't exist or might have been
              removed.
            </h3>
            <button
              onClick={() => navigate("/")}
              className="relative border bg-white/15 mt-[2%] border-white/30 backdrop-blur-[1px]"
            >
              Back to Home Page
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default NotFound;
