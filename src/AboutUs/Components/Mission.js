import React from "react";
function Mission() {
  return (
    <div className="px-[5vw] lg:px-[2.34375vw] py-[10vw] sm:py-[7vw] lg:py-[5vw] flex flex-col gap-[5vw] lg:gap-[1vw] lg:flex-row justify-between items-center bg-black">
      <img
        src={
          "https://archiworld-files.s3.ap-south-1.amazonaws.com/Website+Images/AboutUsMission.png"
        }
        alt=""
        className="w-full lg:w-2/5 rounded-2xl"
      />
      <div className="lg:px-[8vw] text-white">
        <h3
          style={{ fontFamily: "Playfair Display" }}
          className="text-[clamp(20px,5vw,120px)] sm:text-[clamp(20px,4.5vw,120px)] lg:text-[clamp(20px,3vw,120px)]"
        >
          - Our Mission
        </h3>
        <h3 className="text-[clamp(12px,3vw,40px)] sm:text-[clamp(12px,2.2vw,30px)] lg:text-[clamp(10px,1.1vw,40px)] capitalize font-[Poppins] py-5">
          To revolutionize the building materials industry by creating a
          seamless, transparent, and efficient marketplace that empowers
          contractors, builders, and suppliers to connect, collaborate, and grow
          their businesses. We're committed to making quality construction
          materials accessible to everyone, everywhere.
        </h3>
        <h3
          style={{ fontFamily: "Playfair Display" }}
          className="text-[clamp(20px,5vw,120px)] sm:text-[clamp(20px,4.5vw,120px)] lg:text-[clamp(20px,3vw,120px)] py-5"
        >
          - Our Vision
        </h3>
        <h3 className="text-[clamp(12px,3vw,40px)] sm:text-[clamp(12px,2.2vw,30px)] lg:text-[clamp(10px,1.1vw,40px)] capitalize font-[Poppins]">
          To become the world's most trusted B2B marketplace for construction
          and building materials, where innovation meets sustainability. We
          envision a future where every construction project, from residential
          homes to commercial developments, has instant access to the best
          materials, competitive pricing, and reliable delivery.
        </h3>
      </div>
    </div>
  );
}

export default Mission;
