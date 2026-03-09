import { Globe, MapPin, Phone, Share2 } from "lucide-react";
import React, { useState } from "react";
import { useLocation } from "wouter";
import ShareModal from "../../Components/Share";

function TopNavigation({ vendor }) {
  const [, navigate] = useLocation();
  const [shareOpen, setShareOpen] = useState(false);
  const phoneNumber = vendor.mobile.replace(/\D/g, ""); // remove spaces etc

  const callNumber = () => {
    window.location.href = `tel:+91${phoneNumber}`;
  };

  return (
    <div className="px-[3vw] lg:px-[2.34375vw]">
      {/* Top Navigation*/}
      <div className="pt-[20px] sm:pt-[30px] lg:pt-[40px]">
        <p className="text-[var(--secondary)] text-[clamp(10px,3.5vw,40px)] sm:text-[clamp(10px,2vw,30px)] lg:text-[clamp(10px,0.9vw,40px)]">
          <span
            onClick={() => navigate("/")}
            className="cursor-pointer hover:underline"
          >
            Home
          </span>{" "}
          {">"} <span>{vendor.name}</span>
        </p>
      </div>
      {/* Top Heading*/}
      <div className="py-[20px] sm:py-[30px] lg:py-[40px] flex flex-col md:flex-row justify-between gap-6 items-center">
        <div className="flex gap-3 items-center w-full">
          <img
            src={vendor.profileLogo}
            alt=""
            className="w-16 lg:w-20 h-16 lg:h-20 aspect-square object-cover"
          />
          <div>
            <div className="flex gap-8 items-center">
              <h3 className="text-[clamp(12px,3vw,40px)] sm:text-[clamp(12px,2.3vw,30px)] lg:text-[clamp(10px,1.2vw,40px)]">
                {vendor.name}
              </h3>
              <h2 className="flex items-center text-[clamp(12px,2.5vw,40px)] sm:text-[clamp(12px,2vw,30px)] lg:text-[clamp(10px,1vw,40px)] font-light">
                <MapPin size={16} />
                {vendor.city}, {vendor.state}
              </h2>
            </div>
            <p className="text-[clamp(12px,2.5vw,40px)] sm:text-[clamp(12px,2vw,30px)] lg:text-[clamp(10px,1vw,40px)]">
              <span className="font-light text-[var(--secondary)]">
                Service Area -{" "}
              </span>
              {vendor.serviceState.join(", ")}
            </p>
          </div>
        </div>
        <div className="gap-2 w-full flex flex-wrap md:justify-end items-center">
          <button
            onClick={callNumber}
            className="flex gap-2 text-sm px-3 py-2 justify-center items-center bg-black text-white rounded-full"
          >
            <Phone size={16} />
            Contact
          </button>
          <button className="flex gap-2 text-sm px-3 py-2 justify-center items-center text-black bg-[var(--primary)] rounded-full">
            <Globe size={16} />
            Visit Website
          </button>
          <button
            onClick={() => setShareOpen(true)}
            className="flex gap-2 text-sm px-3 py-2 justify-center items-center text-black bg-[var(--primary)] rounded-full"
          >
            <Share2 size={16} />
            Share Profile
          </button>
        </div>
      </div>
      <ShareModal
        isOpen={shareOpen}
        onClose={() => setShareOpen(false)}
        url={window.location.href}
      />
    </div>
  );
}

export default TopNavigation;
