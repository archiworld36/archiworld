import { ArrowUpRight } from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import logo from "../assets/Homepage/Banner/logo.png";
import { useLocation } from "wouter";
function MenuItem({ label, location }) {
  const [, navigate] = useLocation();
  return (
    <div
      onClick={() => navigate(location)}
      className="flex justify-between group border-b border-[var(--stroke)] px-4 py-4 cursor-pointer transition hover:bg-[#5E5E5E]"
    >
      <span>{label}</span>
      <ArrowUpRight
        size={18}
        className="opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in"
      />
    </div>
  );
}
export default function Footer({ topStat = false }) {
  const [, navigate] = useLocation();
  return (
    <footer className="bg-black px-6 lg:px-10 text-white w-full">
      {/* ===== Top Stats Section ===== */}
      {topStat && (
        <div className="mx-auto py-14">
          <div className="flex flex-wrap border-b border-[var(--stroke)] text-center md:text-left">
            <div className="border-r border-b lg:border-b-0 border-[var(--stroke)] w-1/2 lg:w-1/4 py-5">
              <p className="text-[var(--primary)] text-center text-[clamp(10px,3vw,40px)] sm:text-[clamp(10px,1.5vw,30px)] lg:text-[clamp(10px,0.9vw,40px)]">
                Total Users
              </p>
              <h2 className="text-center text-[clamp(12px,6vw,120px)] sm:text-[clamp(15px,4.5vw,120px)] lg:text-[clamp(12px,3.5vw,120px)] font-semibold">
                10K +
              </h2>
            </div>
            <div className="lg:border-r border-b lg:border-b-0 lg:border-[var(--stroke)] w-1/2 lg:w-1/4 py-5">
              <p className="text-[var(--primary)] text-center text-[clamp(10px,3vw,40px)] sm:text-[clamp(10px,1.5vw,30px)] lg:text-[clamp(10px,0.9vw,40px)]">
                Total Brands
              </p>
              <h2 className="text-center text-[clamp(12px,6vw,120px)] sm:text-[clamp(15px,4.5vw,120px)] lg:text-[clamp(12px,3.5vw,120px)] font-semibold">
                200 +
              </h2>
            </div>
            <div className="border-r border-[var(--stroke)] w-1/2 lg:w-1/4 py-5">
              <p className="text-[var(--primary)] text-center text-[clamp(10px,3vw,40px)] sm:text-[clamp(10px,1.5vw,30px)] lg:text-[clamp(10px,0.9vw,40px)]">
                Total Products
              </p>
              <h2 className="text-center text-[clamp(12px,6vw,120px)] sm:text-[clamp(15px,4.5vw,120px)] lg:text-[clamp(12px,3.5vw,120px)] font-semibold">
                35K +
              </h2>
            </div>
            <div className="w-1/2 lg:w-1/4 py-5">
              <p className="text-[var(--primary)] text-center text-[clamp(10px,3vw,40px)] sm:text-[clamp(10px,1.5vw,30px)] lg:text-[clamp(10px,0.9vw,40px)]">
                Daily Users
              </p>
              <h2 className="text-center text-[clamp(12px,6vw,120px)] sm:text-[clamp(15px,4.5vw,120px)] lg:text-[clamp(12px,3.5vw,120px)] font-semibold">
                200 +
              </h2>
            </div>
          </div>
        </div>
      )}

      {/* ===== Main Footer Content ===== */}
      <div
        className={`mx-auto pb-6 ${topStat ? "" : "pt-8"} lg:pb-14 flex justify-between items-center gap-16`}
      >
        {/* Left Section */}
        <div className="w-full">
          <img
            src={logo}
            alt=""
            className="w-1/2 lg:w-fit cursor-pointer"
            onClick={() => navigate("/")}
          />

          <p className="mt-6 text-[clamp(10px,3.5vw,40px)] sm:text-[clamp(10px,2vw,30px)] lg:text-[clamp(10px,0.9vw,40px)]">
            A Design Discovery Platform Trusted By Homeowners, Architects, And
            Interior Professionals
          </p>

          <div className="text-[clamp(10px,3.5vw,40px)] sm:text-[clamp(10px,2vw,30px)] lg:text-[clamp(10px,0.9vw,40px)]">
            <p className="my-6 text-[clamp(10px,4vw,40px)] sm:text-[clamp(10px,2.5vw,30px)] lg:text-[clamp(10px,1.3vw,40px)] font-medium">
              Social Media
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 items-center">
              <div className="flex items-center gap-2 cursor-pointer transition">
                <FaFacebook size={20} />
                <span>Facebook</span>
              </div>
              <div className="flex items-center gap-2 cursor-pointer transition">
                <FaInstagram size={20} />
                <span>Instagram</span>
              </div>
              <div className="flex items-center gap-2 cursor-pointer transition">
                <FaLinkedinIn size={20} />
                <span>LinkedIn</span>
              </div>
              <div className="flex items-center gap-2 cursor-pointer transition">
                <FaXTwitter size={20} />
                <span>Twitter</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="hidden lg:flex flex-col w-[75%]">
          <MenuItem label="Advertise with us" location="/contact-us" />
          <MenuItem label="Help" location="/" />
          <MenuItem label="About Us" location="/about-us" />
          <MenuItem label="Complaints" location="/contact-us" />
          <MenuItem label="Jobs & Careers" location="/contact-us" />
        </div>
      </div>

      {/* Bottom Divider */}
      <div className="border-t border-[var(--stroke)]" />

      {/* ===== Bottom Footer Row ===== */}
      <div className="mx-auto sm:px-6 py-6 flex flex-col md:flex-row justify-between sm:items-center text-[clamp(10px,3.5vw,40px)] sm:text-[clamp(10px,2vw,30px)] lg:text-[clamp(10px,0.9vw,40px)]">
        <p>© 2026 Archiworld. All Rights Reserved.</p>

        <div className="flex gap-[20%] sm:gap-6 mt-4 md:mt-0">
          <span className="cursor-pointer transition">Privacy Policy</span>
          <span className="cursor-pointer transition">Terms Of Use</span>
        </div>
      </div>
    </footer>
  );
}
