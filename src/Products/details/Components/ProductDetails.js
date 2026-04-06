import React, { useEffect, useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Share2,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Globe,
  Dot,
} from "lucide-react";
import { useLocation } from "wouter";

function ProductData({ productById, setShareOpen }) {
  const [, navigate] = useLocation();

  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    if (productById) {
      setActiveImage(productById.bannerImage);
    }
  }, [productById]);

  if (!productById) {
    return <div className="p-10">No product found</div>;
  }
  const allImages = [productById.bannerImage, ...(productById.images || [])];

  const handleNext = () => {
    const currentIndex = allImages.indexOf(activeImage);
    const nextIndex = (currentIndex + 1) % allImages.length;
    setActiveImage(allImages[nextIndex]);
  };

  const handlePrev = () => {
    const currentIndex = allImages.indexOf(activeImage);
    const prevIndex = (currentIndex - 1 + allImages.length) % allImages.length;
    setActiveImage(allImages[prevIndex]);
  };

  const formatDays = (days) => {
    if (!Array.isArray(days) || days.length === 0) {
      return "Not available";
    }

    const dayOrder = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];

    const shortDays = {
      Monday: "Mon",
      Tuesday: "Tue",
      Wednesday: "Wed",
      Thursday: "Thu",
      Friday: "Fri",
      Saturday: "Sat",
      Sunday: "Sun",
    };

    const sortedDays = [...days].sort(
      (a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b),
    );

    const ranges = [];
    let start = sortedDays[0];
    let prev = sortedDays[0];

    for (let i = 1; i < sortedDays.length; i++) {
      const current = sortedDays[i];

      if (dayOrder.indexOf(current) === dayOrder.indexOf(prev) + 1) {
        prev = current;
      } else {
        ranges.push(
          start === prev
            ? shortDays[start]
            : `${shortDays[start]} – ${shortDays[prev]}`,
        );
        start = current;
        prev = current;
      }
    }

    ranges.push(
      start === prev
        ? shortDays[start]
        : `${shortDays[start]} – ${shortDays[prev]}`,
    );

    return ranges.join(", ");
  };

  const formatTime = (time) => {
    if (!Array.isArray(time) || time.length === 0) {
      return "Not available";
    }
    const [h, m] = time.replace(/\s/g, "").split(":");
    const hour = parseInt(h);
    const suffix = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;

    return `${formattedHour}:${m} ${suffix}`;
  };

  const phoneNumber = productById.user?.mobile.replace(/\D/g, ""); // remove spaces etc
  const whatsappMobile = productById.user?.whatsappMobile.replace(/\D/g, "");

  const openWhatsApp = () => {
    const url = `https://wa.me/91${whatsappMobile}`;
    window.open(url, "_blank");
  };

  const callNumber = () => {
    window.location.href = `tel:+91${phoneNumber}`;
  };

  return (
    <div>
      {/* Top Navigation*/}
      <div className="pt-[20px] sm:pt-[30px] lg:pt-[40px]">
        <p className="text-[var(--secondary)] text-[clamp(10px,3.5vw,40px)] sm:text-[clamp(10px,2vw,30px)] lg:text-[clamp(10px,0.9vw,40px)]">
          <span
            onClick={() => navigate("/")}
            className="cursor-pointer hover:underline"
          >
            Home
          </span>{" "}
          {">"}{" "}
          <span
            onClick={() => navigate("/products")}
            className="cursor-pointer hover:underline"
          >
            Products
          </span>{" "}
          {">"} <span>{productById.name}</span>
        </p>
      </div>
      {/* Top Heading*/}
      <div className="py-[20px] sm:py-[30px] lg:py-[40px]">
        <h1 className="text-[clamp(20px,7vw,120px)] sm:text-[clamp(20px,5.6vw,120px)] lg:text-[clamp(20px,4.5vw,120px)] capitalize leading-tight font-medium font-[Poppins]">
          {productById.name}
        </h1>
        <h3
          onClick={() => navigate(`/vendor/${productById.user?._id}`)}
          className="w-fit cursor-pointer mt-2 flex gap-3 items-center text-[clamp(12px,3vw,40px)] sm:text-[clamp(12px,2.3vw,30px)] lg:text-[clamp(10px,1.2vw,40px)]"
        >
          <img
            src={productById.user?.profileLogo}
            alt=""
            className="w-16 lg:w-20 h-16 lg:h-20 aspect-square object-cover"
          />
          {productById.user?.name}
        </h3>
      </div>
      {/*Product */}
      <div className="pb-[20px] sm:pb-[30px] lg:pb-[40px]">
        <div className="flex flex-col lg:flex-row gap-[3vw] lg:gap-[2.34375vw]">
          <div className="w-full">
            <div className="relative rounded-xl overflow-hidden border">
              <img
                src={activeImage}
                alt=""
                className="w-full aspect-[1/1] object-cover"
              />
              <button
                onClick={handlePrev}
                className="absolute top-1/2 -translate-y-1/2 left-4 bg-white p-2 rounded-full shadow"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={handleNext}
                className="absolute top-1/2 -translate-y-1/2 right-4 bg-white p-2 rounded-full shadow"
              >
                <ChevronRight size={18} />
              </button>
              <div className="absolute bottom-4 right-4 bg-black text-white px-3 text-sm rounded-full">
                {allImages.indexOf(activeImage) + 1}/{allImages.length}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-3">
              {allImages.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt=""
                  onClick={() => setActiveImage(img)}
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${
                    activeImage === img ? "border-black" : "border-gray-200"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="w-full space-y-4 lg:space-y-6">
            <div>
              <h2 className="text-[clamp(12px,3vw,40px)] sm:text-[clamp(12px,2.3vw,30px)] lg:text-[clamp(10px,1.2vw,40px)] font-semibold">
                Details
              </h2>

              <p className="text-[clamp(12px,2.5vw,40px)] sm:text-[clamp(12px,2vw,30px)] lg:text-[clamp(10px,1vw,40px)] mt-2 text-gray-600">
                {productById.description}
              </p>
              <p className="text-[clamp(12px,2.5vw,40px)] sm:text-[clamp(12px,2vw,30px)] lg:text-[clamp(10px,1vw,40px)] mt-2 text-gray-600">
                {productById?.category?.name} - {productById?.subCategory?.name}{" "}
                {productById?.subSubCategory?.name &&
                  `- ${productById?.subSubCategory?.name}`}
              </p>

              <p className="text-[clamp(12px,3vw,40px)] sm:text-[clamp(12px,2.3vw,30px)] lg:text-[clamp(10px,1.2vw,40px)] font-semibold mt-2">
                <span className="text-[var(--secondary)] font-light">
                  Price Range{" "}
                </span>
                ₹{productById.price?.min.toLocaleString("en-IN")} - ₹
                {productById.price?.max.toLocaleString("en-IN")}
              </p>
            </div>

            <div className="bg-[var(--primary)] rounded-xl p-6 space-y-4 text-[clamp(12px,2vw,40px)] sm:text-[clamp(12px,1.5vw,30px)] lg:text-[clamp(10px,0.8vw,40px)]">
              <div className="flex items-center gap-2 border-b border-[var(--stroke)] pb-3">
                <MapPin size={16} />
                {productById.user?.city}, {productById.user?.state}
              </div>

              <div className="flex items-center gap-2 border-b border-[var(--stroke)] pb-3">
                <Phone size={16} />
                {productById.user?.mobile}
              </div>

              <div className="flex items-center gap-2 border-b border-[var(--stroke)] pb-3">
                <Mail size={16} />
                {productById.user?.email}
              </div>

              <div className="flex items-center gap-2 pb-3">
                <Clock size={16} />
                {formatDays(productById?.user?.workingSchedule?.days)}:{" "}
                {formatTime(productById?.user?.workingSchedule?.from)} –{" "}
                {formatTime(productById?.user?.workingSchedule?.to)}
              </div>
            </div>

            <div className="bg-[var(--primary)] rounded-xl p-6 space-y-4 text-[clamp(12px,2vw,40px)] sm:text-[clamp(12px,1.5vw,30px)] lg:text-[clamp(10px,0.8vw,40px)]">
              <h2 className="border-b border-[var(--stroke)] pb-3">
                Serves in:
              </h2>

              <div className="flex gap-6">
                {productById.user?.serviceState.map((item, index) => (
                  <span key={index} className="flex items-center gap-2">
                    <MapPin size={16} /> {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={openWhatsApp}
                className="w-full flex gap-2 justify-center items-center bg-black text-white rounded-full"
              >
                <MessageCircle className="w-6 h-6 stroke-1.5" />
                Connect on WhatsApp
              </button>
              <button
                onClick={callNumber}
                className="w-full flex gap-2 justify-center items-center text-black box-border border border-[var(--stroke)] rounded-full"
              >
                <Phone className="w-6 h-6 stroke-1.5" />
                Contact
              </button>
              <div className="flex gap-3">
                <button className="w-full flex text-nowrap px-0 gap-2 justify-center items-center text-black box-border border border-[var(--stroke)] rounded-full">
                  <Globe size={16} />
                  Dealers Near You
                </button>

                <button
                  onClick={() => setShareOpen(true)}
                  className="w-full flex text-nowrap px-0 gap-2 justify-center items-center text-black box-border border border-[var(--stroke)] rounded-full"
                >
                  <Share2 size={16} />
                  Share Product
                </button>
              </div>
            </div>
            <div>
              <h2 className="text-[clamp(12px,3vw,40px)] sm:text-[clamp(12px,2.3vw,30px)] lg:text-[clamp(10px,1.2vw,40px)] font-semibold">
                Features
              </h2>
              <ul className="py-6 space-y-4 text-[clamp(12px,2.3vw,40px)] sm:text-[clamp(12px,1.8vw,30px)] lg:text-[clamp(10px,1vw,40px)]">
                {productById?.features?.map((item, index) => (
                  <li
                    key={index}
                    className="border-b border-[var(--stroke)] pb-3 flex justify-start items-center"
                  >
                    <Dot />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-[clamp(12px,3vw,40px)] sm:text-[clamp(12px,2.3vw,30px)] lg:text-[clamp(10px,1.2vw,40px)] font-semibold">
                Specifications
              </h2>
              <div className="py-6 space-y-4 text-[clamp(12px,2.3vw,40px)] sm:text-[clamp(12px,1.8vw,30px)] lg:text-[clamp(10px,1vw,40px)]">
                <h2 className="border-b border-[var(--stroke)] pb-3 flex gap-2 justify-between items-center">
                  <span className="flex justify-start items-center">
                    <Dot />
                    Material
                  </span>
                  <span className="flex justify-start items-center">
                    {productById?.material?.name}
                  </span>
                </h2>
                <h2 className="border-b border-[var(--stroke)] pb-3 flex gap-2 justify-between items-center">
                  <span className="flex justify-start items-center">
                    <Dot />
                    Brand
                  </span>
                  <span className="flex justify-start items-center">
                    {productById?.brand?.name}
                  </span>
                </h2>
                <h2 className="border-b border-[var(--stroke)] pb-3 flex gap-2 justify-between items-center">
                  <span className="flex justify-start items-center">
                    <Dot />
                    Size (L X W X H)
                  </span>
                  <span className="flex justify-start items-center">
                    {productById.size?.length} X {productById.size?.width} X{" "}
                    {productById.size?.height} cm
                  </span>
                </h2>
                <h2 className="border-b border-[var(--stroke)] pb-3 flex gap-2 justify-between items-center">
                  <span className="flex justify-start items-center">
                    <Dot />
                    Colors
                  </span>
                  <p className="flex justify-start items-center">
                    {productById?.color?.join(", ")}
                  </p>
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductData;
