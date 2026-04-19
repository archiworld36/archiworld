import React from "react";
function Features() {
  const cards = [
    {
      title: "All in One Place",
      description:
        "Browse projects, discover products, connect with experts, and learn all in one place.",
    },
    {
      title: "Curated Design Inspiration",
      description:
        "Discover thoughtfully designed spaces across styles, rooms, and budgets to spark ideas for your own home.",
    },
    {
      title: "Expert Connections",
      description:
        "Find and connect with experienced architects, interior designers, and specialists for guidance and collaboration.",
    },
    {
      title: "Informed Decision-Making",
      description:
        "Learn about finishes, furniture types, layouts, and trends before starting your interior journey.",
    },
  ];
  return (
    <div className="w-full h-full relative">
      <img
        className="w-full h-full absolute lg:relative object-cover"
        src={
          "https://archiworld-files.s3.ap-south-1.amazonaws.com/Website+Images/AboutUsBackground.png"
        }
        alt=""
      />

      <div className="flex flex-col lg:flex-row h-full z-20 lg:absolute top-0">
        {cards.map((card, index) => (
          <div
            key={index}
            className="w-full h-full lg:w-1/4 lg:border-r lg:border-white last:border-r-0 flex-shrink-0 py-10 lg:hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.25)_10%,rgba(255,255,255,0.25)_100%)] transition-all ease-linear duration-500"
          >
            <div className="h-full flex flex-col justify-end relative gap-4 px-6 py-6 text-center text-white">
              <h3
                style={{ fontFamily: "Playfair Display" }}
                className="text-[clamp(20px,5vw,120px)] sm:text-[clamp(20px,2vw,120px)] lg:text-[clamp(20px,1.5vw,120px)] "
              >
                {card.title}
              </h3>
              <p className="text-[clamp(12px,3vw,40px)] sm:text-[clamp(12px,1.3vw,30px)] lg:text-[clamp(10px,0.9vw,40px)]">
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Features;
