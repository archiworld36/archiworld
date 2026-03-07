import FurnitureGallery from "../../assets/Homepage/AccessLogo/FurnitureGallery.png";
import SmartHomes from "../../assets/Homepage/AccessLogo/SmartHomes.png";
import CreativeLogo from "../../assets/Homepage/AccessLogo/Creative.png";

export default function AccessLogo() {
  const logos = [
    FurnitureGallery,
    SmartHomes,
    CreativeLogo,
    FurnitureGallery,
    SmartHomes,
    CreativeLogo,
    FurnitureGallery,
    SmartHomes,
    CreativeLogo,
    SmartHomes
  ];
  return (
    <section className="w-full py-[8%] lg:py-[4%]">
      {/* Header */}
      <div className="lg:flex justify-between items-center px-4 lg:px-10 mb-[8%] lg:mb-[2.5%]">
        <h2 className="text-[clamp(20px,6vw,120px)] lg:text-[clamp(20px,4.2vw,120px)] py-[1%] text-center capitalize leading-tight font-medium font-[Poppins]">
          Access 3,000+ Trusted Brands
        </h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 lg:gap-4">
        {logos.map((logo, index) => (
          <img
            src={logo}
            key={index}
            alt=""
            className="w-full h-full object-cover"
          />
        ))}
      </div>
    </section>
  );
}
