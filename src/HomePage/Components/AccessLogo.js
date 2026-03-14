export default function AccessLogo() {
  const logos = [
    "https://archiworld-files.s3.ap-south-1.amazonaws.com/featuredLogo/Logo1.png",
    "https://archiworld-files.s3.ap-south-1.amazonaws.com/featuredLogo/Logo2.png",
    "https://archiworld-files.s3.ap-south-1.amazonaws.com/featuredLogo/Logo3.png",
    "https://archiworld-files.s3.ap-south-1.amazonaws.com/featuredLogo/Logo4.png",
    "https://archiworld-files.s3.ap-south-1.amazonaws.com/featuredLogo/Logo5.png",
    "https://archiworld-files.s3.ap-south-1.amazonaws.com/featuredLogo/Logo6.png",
    "https://archiworld-files.s3.ap-south-1.amazonaws.com/featuredLogo/Logo7.png",
    "https://archiworld-files.s3.ap-south-1.amazonaws.com/featuredLogo/Logo8.png",
    "https://archiworld-files.s3.ap-south-1.amazonaws.com/featuredLogo/Logo9.png",
    "https://archiworld-files.s3.ap-south-1.amazonaws.com/featuredLogo/Logo10.png"
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
