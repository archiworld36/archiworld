import React, { useState } from "react";
import logo from "../assets/Homepage/Banner/logo.png";
import logoBlack from "../assets/Homepage/Banner/logoBlack.png";
import { ArrowUpRight, Menu, Search, X } from "lucide-react";
import { InputText } from "primereact/inputtext";
import { useLocation } from "wouter";

function MenuItem({ label, location }) {
  const [, navigate] = useLocation();
  return (
    <div
      onClick={() => navigate(location)}
      className={`py-6 border-b last:border-b-0 cursor-pointer transition-colors text-[clamp(12px,4vw,40px)] sm:text-[clamp(12px,2.3vw,30px)] lg:text-[clamp(10px,1.2vw,40px)] capitalize flex justify-between w-full text-white`}
    >
      {label}
      <ArrowUpRight />
    </div>
  );
}

function Navbar({ color }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState(false);
  const [, navigate] = useLocation();
  return (
    <div
      className={`w-full h-[70px] ${open || search ? "fixed z-20" : "relative"} lg:h-[6vw] px-[3vw] lg:px-[2.34375vw] pt-[20px] flex gap-[1.5625vw]`}
    >
      <img
        src={
          color === "black"
            ? open
              ? logo
              : logoBlack
            : search
              ? logoBlack
              : logo
        }
        alt=""
        onClick={() => navigate("/")}
        className={`w-fit h-full z-50 relative cursor-pointer`}
      />
      <div
        className={`w-full h-full bg-gray-400 bg-opacity-15 rounded-[43px] p-[0.6vw] border border-white hidden lg:flex gap-[1vw] backdrop-blur-md`}
      >
        <div
          className={`flex w-full relative justify-center items-center rounded-[33px] text-[clamp(10px,1.2vw,40px)] text-${color} border border-[#9A9A9A]`}
        >
          <div className="inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="w-[clamp(10px,1.5vw,40px)] h-[clamp(10px,1.5vw,40px)] [var(--stroke)]-1" />
          </div>
          <InputText
            type="search"
            placeholder="What are you looking for?"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`pl-4 w-full shadow-none bg-transparent ${color === "white" ? "placeholder:text-[var(--primary)]" : "placeholder:text-black"}`}
          />
        </div>
        <button className={`text-white w-fit h-full bg-black`}>Search</button>
      </div>
      <div className={`w-full h-full flex justify-end lg:hidden gap-4`}>
        {!search && (
          <div
            onClick={() => setSearch(true)}
            className={`flex w-fit h-full !aspect-square rounded-full p-4 text-${color} border border-[#9A9A9A] bg-white/10 backdrop-blur-sm shadow-[0_20px_50px_rgba(0,0,0,0.25)]`}
          >
            <Search className="w-full h-full [var(--stroke)]-1" />
          </div>
        )}
        {!open && (
          <div
            onClick={() => setOpen(true)}
            className={`flex w-fit h-full !aspect-square rounded-full p-4 text-${color} border border-[#9A9A9A] bg-white/10 backdrop-blur-sm shadow-[0_20px_50px_rgba(0,0,0,0.25)]`}
          >
            <Menu className="w-full h-full" />
          </div>
        )}
        {(open || search) && (
          <div
            onClick={() => {
              setOpen(false);
              setSearch(false);
            }}
            className={`flex w-fit z-50 h-full !aspect-square rounded-full p-4 ${open ? "text-white" : "text-black"} border border-[#9A9A9A] bg-white/10 backdrop-blur-sm shadow-[0_20px_50px_rgba(0,0,0,0.25)]`}
          >
            <X className="w-full h-full" />
          </div>
        )}
      </div>
      <div
        className={`
          absolute top-0 left-0
          w-full pt-[90px] bg-black
          overflow-hidden lg:hidden
          transform transition-all duration-300 ease-out z-40 px-8 py-6
          ${
            open
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 -translate-y-1/2 scale-95 pointer-events-none"
          }
        `}
      >
        <MenuItem label="Advertise with us" location="/contact-us" />
        <MenuItem label="Help" location="/" />
        <MenuItem label="About Us" location="/about-us" />
        <MenuItem label="Complaints" location="/contact-us" />
        <MenuItem label="Jobs & Careers" location="/contact-us" />
      </div>
      <div
        className={`
          absolute top-0 left-0
          w-full h-screen pt-[90px] bg-white
          overflow-hidden lg:hidden
          transform transition-all duration-300 ease-out z-40 px-6 py-6
          ${
            search
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 -translate-y-1/2 scale-95 pointer-events-none"
          }
        `}
      >
        <div
          className={`w-full h-[50px] rounded-[43px] border border-black flex gap-[1vw]`}
        >
          <div
            className={`flex w-full relative justify-center items-center text-[clamp(12px,4vw,40px)] sm:text-[clamp(12px,2.3vw,30px)] text-black`}
          >
            <div className="inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="w-6 h-6 [var(--stroke)]-1" />
            </div>
            <InputText
              type="search"
              placeholder="What are you looking for?"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`pl-4 w-full shadow-none bg-transparent placeholder:text-black`}
            />
          </div>
          <button className={`text-white w-fit h-full bg-black`}>Search</button>
        </div>
      </div>
      {(open || search) && (
        <div
          onClick={() => {
            setOpen(false);
            setSearch(false);
          }}
          className="bg-black bg-opacity-25 w-full h-screen fixed top-0 left-0 lg:hidden"
        ></div>
      )}
    </div>
  );
}

export default Navbar;
