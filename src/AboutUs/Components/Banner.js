import React from "react";
import Navbar from "../../Components/Navbar";

function AboutUsBanner() {
  return (
    <div className="relative inset-0 w-full h-full">
      <img
        src={
          "https://archiworld-files.s3.ap-south-1.amazonaws.com/Website+Images/AboutUsBanner.png"
        }
        alt=""
        className="relative inset-0 w-full min-h-[55vh] sm:min-h-[75vh] h-fit object-cover -z-10"
      />
      <div className="w-full h-full absolute top-0 z-20 flex flex-col justify-between">
        <Navbar color="white" />
        <div className="w-full h-full flex px-7 lg:px-3 flex-col gap-3 items-center justify-center text-white">
          <h1 className="text-[clamp(20px,7vw,120px)] sm:text-[clamp(20px,5.6vw,120px)] lg:text-[clamp(20px,4.5vw,120px)] text-center capitalize leading-tight font-medium font-[Poppins]">
            About Archiworld
          </h1>
          <h3 className="lg:w-1/2 text-[clamp(12px,3.5vw,40px)] sm:text-[clamp(12px,2.3vw,30px)] lg:text-[clamp(10px,1.2vw,40px)] text-center">
            Designing the future of the architectural landscape through modern
            digital lines. Connecting millions of homeowners with the world’s
            finest professionals.
          </h3>
        </div>
      </div>
    </div>
  );
}

export default AboutUsBanner;
