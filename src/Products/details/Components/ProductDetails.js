import React, { useState } from "react";
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
import { useLocation, useParams } from "wouter";
import CatalogueCarousel from "./Catelogues";
import MoreProducts from "./MoreProducts";
import ShareModal from "../../../Components/Share";
function ProductData() {
  const [, navigate] = useLocation();
  const { id } = useParams();
  const [shareOpen, setShareOpen] = useState(false);
  const product = {
    id: 1,
    title: "Civita Castellana / Italy",
    description:
      "Perfect for everyday use, the standard height of the Claremont Basin Tap features an uncomplicated design and works beautifully with all basins and baths",
    location: "New York, NY",
    category: "Bathroom",
    subcategory: "Sink",
    material: "Premium Brass",
    brand: "Polished Chrome",
    size: {
      length: "20",
      width: "5",
      height: "30",
    },
    colors: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    image: `https://picsum.photos/500/500?random=${id}`,
    user: {
      id: 1,
      name: "Domus Falerii",
      profileLogo: "https://picsum.photos/800/600?random=10",
      city: "New Delhi",
      state: "Delhi",
      mobile: "8928929901",
      email: "pranav.singh@archiworld.in",
      serviceState: ["Pan India"],
      workingSchedule: {
        days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], // ["Monday", "Tuesday"]
        from: "09: 00", // "09:00"
        to: "18:30", // "18:30"
      },
    },
    catalogues: [
      {
        type: "Documentation",
        bannerImage: "https://picsum.photos/500/500?random=23",
        pdfFile: "https://picsum.pdf/500/500?random=20",
      },
      {
        type: "Documentation",
        bannerImage: "https://picsum.photos/500/500?random=25",
        pdfFile: "https://picsum.pdf/500/500?random=25",
      },
      {
        type: "Documentation",
        bannerImage: "https://picsum.photos/500/500?random=26",
        pdfFile: "https://picsum.pdf/500/500?random=22",
      },
      {
        type: "Documentation",
        bannerImage: "https://picsum.photos/500/500?random=28",
        pdfFile: "https://picsum.pdf/500/500?random=21",
      },
      {
        type: "CAD Files",
        bannerImage: "https://picsum.photos/500/500?random=36",
        pdfFile: "https://picsum.pdf/500/500?random=36",
      },
      {
        type: "CAD Files",
        bannerImage: "https://picsum.photos/500/500?random=30",
        pdfFile: "https://picsum.pdf/500/500?random=32",
      },
      {
        type: "CAD Files",
        bannerImage: "https://picsum.photos/500/500?random=31",
        pdfFile: "https://picsum.pdf/500/500?random=33",
      },
      {
        type: "BIM Objects",
        bannerImage: "https://picsum.photos/500/500?random=38",
        pdfFile: "https://picsum.pdf/500/500?random=39",
      },
      {
        type: "3D Models",
        bannerImage: "https://picsum.photos/500/500?random=399",
        pdfFile: "https://picsum.pdf/500/500?random=80",
      },
    ],
    features: [
      "Ceramic disc valves",
      "WaterSense certified",
      "ADA compliant",
      "Limited lifetime warranty",
      "Easy installation",
    ],
    images: [
      `https://picsum.photos/800/600?random=1`,
      `https://picsum.photos/800/600?random=2`,
      `https://picsum.photos/800/600?random=3`,
      `https://picsum.photos/800/600?random=4`,
    ],
    price: {
      min: 1000,
      max: 20000,
    },
  };

  const suggestedProducts = Array.from({ length: 4 }).map((_, i) => ({
    id: i + 1,
    title: "Kohler Memoirs Pedestal Sink",
    price: "₹4,000",
    location: "New York, NY",
    category: "Bathroom",
    image: `https://picsum.photos/500/500?random=${i + 1}`,
  }));

  const [activeImage, setActiveImage] = useState(product.images[0]);

  const handleNext = () => {
    const currentIndex = product.images.indexOf(activeImage);
    const nextIndex = (currentIndex + 1) % product.images.length;
    setActiveImage(product.images[nextIndex]);
  };

  const handlePrev = () => {
    const currentIndex = product.images.indexOf(activeImage);
    const prevIndex =
      (currentIndex - 1 + product.images.length) % product.images.length;
    setActiveImage(product.images[prevIndex]);
  };

  const formatDays = (days) => {
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

    // sort according to week order
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
    const [h, m] = time.replace(/\s/g, "").split(":");
    const hour = parseInt(h);
    const suffix = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;

    return `${formattedHour}:${m} ${suffix}`;
  };

  const phoneNumber = product.user.mobile.replace(/\D/g, ""); // remove spaces etc

  const openWhatsApp = () => {
    const url = `https://wa.me/91${phoneNumber}`;
    window.open(url, "_blank");
  };

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
          {">"}{" "}
          <span
            onClick={() => navigate("/products")}
            className="cursor-pointer hover:underline"
          >
            Products
          </span>{" "}
          {">"} <span>{product.title}</span>
        </p>
      </div>
      {/* Top Heading*/}
      <div className="py-[20px] sm:py-[30px] lg:py-[40px]">
        <h1 className="text-[clamp(20px,7vw,120px)] sm:text-[clamp(20px,5.6vw,120px)] lg:text-[clamp(20px,4.5vw,120px)] capitalize leading-tight font-medium font-[Poppins]">
          {product.title}
        </h1>
        <h3
          onClick={() => navigate(`/vendor/${product.user.id}`)}
          className="w-fit cursor-pointer mt-2 flex gap-3 items-center text-[clamp(12px,3vw,40px)] sm:text-[clamp(12px,2.3vw,30px)] lg:text-[clamp(10px,1.2vw,40px)]"
        >
          <img
            src={product.user.profileLogo}
            alt=""
            className="w-16 lg:w-20 h-16 lg:h-20 aspect-square object-cover"
          />
          {product.user.name}
        </h3>
      </div>
      {/*Product */}
      <div className="pb-[20px] sm:pb-[30px] lg:pb-[40px]">
        <div className="flex flex-col lg:flex-row gap-[3vw] lg:gap-[2.34375vw]">
          {/* LEFT IMAGE SECTION */}
          <div className="w-full">
            <div className="relative rounded-xl overflow-hidden border">
              <img
                src={activeImage}
                alt=""
                className="w-full aspect-[1.4/1] object-cover"
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
                {product.images.indexOf(activeImage) + 1}/
                {product.images.length}
              </div>
            </div>

            {/* thumbnails */}
            <div className="flex flex-wrap gap-2 mt-3">
              {product.images.map((img, i) => (
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

          {/* RIGHT SECTION */}
          <div className="w-full lg:w-[80%] space-y-4 lg:space-y-6">
            {/* Product Info */}
            <div>
              <h2 className="text-[clamp(12px,3vw,40px)] sm:text-[clamp(12px,2.3vw,30px)] lg:text-[clamp(10px,1.2vw,40px)] font-semibold">
                Details
              </h2>

              <p className="text-[clamp(12px,2.5vw,40px)] sm:text-[clamp(12px,2vw,30px)] lg:text-[clamp(10px,1vw,40px)] mt-2 text-gray-600">
                {product.description}
              </p>
              <p className="text-[clamp(12px,2.5vw,40px)] sm:text-[clamp(12px,2vw,30px)] lg:text-[clamp(10px,1vw,40px)] mt-2 text-gray-600">
                {product.category} - {product.subcategory}
              </p>

              <p className="text-[clamp(12px,3vw,40px)] sm:text-[clamp(12px,2.3vw,30px)] lg:text-[clamp(10px,1.2vw,40px)] font-semibold mt-2">
                <span className="text-[var(--secondary)] font-light">
                  Price Range{" "}
                </span>
                ₹{product.price.min.toLocaleString("en-IN")} - ₹
                {product.price.max.toLocaleString("en-IN")}
              </p>
            </div>

            {/* CONTACT CARD */}
            <div className="bg-[var(--primary)] rounded-xl p-6 space-y-4 text-[clamp(12px,2vw,40px)] sm:text-[clamp(12px,1.5vw,30px)] lg:text-[clamp(10px,0.8vw,40px)]">
              <div className="flex items-center gap-2 border-b border-[var(--stroke)] pb-3">
                <MapPin size={16} />
                {product.user.city}, {product.user.state}
              </div>

              <div className="flex items-center gap-2 border-b border-[var(--stroke)] pb-3">
                <Phone size={16} />
                {product.user.mobile}
              </div>

              <div className="flex items-center gap-2 border-b border-[var(--stroke)] pb-3">
                <Mail size={16} />
                {product.user.email}
              </div>

              <div className="flex items-center gap-2 pb-3">
                <Clock size={16} />
                {formatDays(product.user.workingSchedule.days)}:{" "}
                {formatTime(product.user.workingSchedule.from)} –{" "}
                {formatTime(product.user.workingSchedule.to)}
              </div>
            </div>

            {/* SERVES IN */}
            <div className="bg-[var(--primary)] rounded-xl p-6 space-y-4 text-[clamp(12px,2vw,40px)] sm:text-[clamp(12px,1.5vw,30px)] lg:text-[clamp(10px,0.8vw,40px)]">
              <h2 className="border-b border-[var(--stroke)] pb-3">
                Serves in:
              </h2>

              <div className="flex gap-6">
                {product.user.serviceState.map((item, index) => (
                  <span key={index} className="flex items-center gap-2">
                    <MapPin size={16} /> {item}
                  </span>
                ))}
              </div>
            </div>

            {/* BUTTONS */}
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
            {/* Features */}
            <div>
              <h2 className="text-[clamp(12px,3vw,40px)] sm:text-[clamp(12px,2.3vw,30px)] lg:text-[clamp(10px,1.2vw,40px)] font-semibold">
                Features
              </h2>
              <ul className="py-6 space-y-4 text-[clamp(12px,2.3vw,40px)] sm:text-[clamp(12px,1.8vw,30px)] lg:text-[clamp(10px,1vw,40px)]">
                {product.features.map((item, index) => (
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
                    {product.material}
                  </span>
                </h2>
                <h2 className="border-b border-[var(--stroke)] pb-3 flex gap-2 justify-between items-center">
                  <span className="flex justify-start items-center">
                    <Dot />
                    Brand
                  </span>
                  <span className="flex justify-start items-center">
                    {product.brand}
                  </span>
                </h2>
                <h2 className="border-b border-[var(--stroke)] pb-3 flex gap-2 justify-between items-center">
                  <span className="flex justify-start items-center">
                    <Dot />
                    Size (L X W X H)
                  </span>
                  <span className="flex justify-start items-center">
                    {product.size.length} X {product.size.width} X{" "}
                    {product.size.height} cm
                  </span>
                </h2>
                <h2 className="border-b border-[var(--stroke)] pb-3 flex gap-2 justify-between items-center">
                  <span className="flex justify-start items-center">
                    <Dot />
                    Colors
                  </span>
                  <p className="flex justify-start items-center">
                    {product.colors.join(", ")}
                  </p>
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CatalogueCarousel catalogues={product.catalogues} />
      <MoreProducts
        suggestedProducts={suggestedProducts}
        name={"More from Bath Co"}
      />
      <ShareModal
        isOpen={shareOpen}
        onClose={() => setShareOpen(false)}
        url={window.location.href}
        title={product.title}
      />
    </div>
  );
}

export default ProductData;
