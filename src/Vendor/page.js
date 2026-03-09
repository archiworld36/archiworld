import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import TopNavigation from "./Components/TopNavigation";
import About from "./Components/About";
import MoreProducts from "../Products/details/Components/MoreProducts";
// import { useParams } from "wouter";

function VendorDetails() {
  //   const { id } = useParams();
  const user = {
    parent: null,
    _id: "6961475eea205eb6dcb85565",
    name: "Pranav Singh",
    email: "harshrattewal@gmail.com",
    username: "pranav.singh",
    password: "$2b$10$EaPz1WaNaET4DsxOd4gt3eWJwOaxPGXfpDsWx6uvXu0WBDWRr5IvW",
    createdBy: "system",
    modifiedBy: "Pranav Singh",
    isActive: true,
    createdAt: "2026-01-09T18:22:22.186Z",
    modifiedAt: "2026-02-08T17:49:26.652Z",
    __v: 0,
    mobile: "9871309793",
    address: "Delhi NCR",
    contactPerson: "Pranav S",
    city: "Amguri",
    state: "Assam",
    serviceState: ["Pan India"],
    workingSchedule: {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      from: "10:00",
      to: "18:30",
    },
    emailVerified: true,
    subscription: {
      _id: "697f44de48fb2d892a4c8299",
      name: "Diamond",
      amount: 9999,
      priority: 1,
      createdBy: "6961475eea205eb6dcb85565",
      isActive: true,
      createdAt: "2026-02-01T12:19:42.119Z",
      updatedAt: "2026-02-01T12:19:42.119Z",
      __v: 0,
    },
    about:
      '<p>Domus Falerii is an Italian manufacturer specializing in sanitaryware, washbasins, shower systems, and bathroom furnishing accessories. Based in Civita Castellana, Lazio, the company is built on a distinct vision: to create products that interact with architecture, reflect personal style, and bring balance, comfort, and elegance to everyday living.</p><p><br></p><p>Inspired by the heritage of the “Domus”—the home—and the ancient city of Falerii, the brand is more than a manufacturing company; it embodies a philosophy. Every product is designed to elevate interiors through thoughtful aesthetics, refined forms, and purposeful function.</p><p><br></p><h2><strong>A Philosophy of Total Quality</strong></h2><p><br></p><p>Domus Falerii follows a “Total Quality” approach, where every piece is the result of:</p><p><br></p><ol><li data-list="bullet"><span class="ql-ui" contenteditable="false"></span>In-depth research and material exploration</li><li data-list="bullet"><span class="ql-ui" contenteditable="false"></span>Original and expressive design</li><li data-list="bullet"><span class="ql-ui" contenteditable="false"></span>Innovative shapes and finishes</li><li data-list="bullet"><span class="ql-ui" contenteditable="false"></span>Precision craftsmanship and continuous quality control</li></ol>',
    bannerImage:
      "https://archiworld-files.s3.ap-south-1.amazonaws.com/banners/2e820509-5990-432a-a5f0-7903035d08aa-image 15.png",
    catalogues: [
      {
        pdf: "https://archiworld-files.s3.ap-south-1.amazonaws.com/catalogues/8f9d0939-542c-490a-b846-e49c2ce8cf8b-Architecture.pdf",
        banner:
          "https://archiworld-files.s3.ap-south-1.amazonaws.com/catalogues/4b211a2b-4fbe-4b56-8386-d01ac69bf89d-image 15.png",
      },
    ],
    profileLogo:
      "https://archiworld-files.s3.ap-south-1.amazonaws.com/profiles/310b8eb3-c514-45f5-a838-c9d927ed33b0-image 15.png",
    parentName: null,
  };

  const suggestedProducts = Array.from({ length: 4 }).map((_, i) => ({
    id: i + 1,
    title: "Kohler Memoirs Pedestal Sink",
    price: "₹4,000",
    location: "New York, NY",
    category: "Bathroom",
    image: `https://picsum.photos/500/500?random=${i + 1}`,
  }));

  return (
    <div>
      <Navbar color={"black"} />
      <TopNavigation vendor={user} />
      <img
        src={user.bannerImage}
        alt=""
        className="w-full aspect-[3.959/1] object-cover"
      />
      <About about={user.about} />
      <div className="flex flex-1 relative px-[3vw] lg:px-[2.34375vw] pb-10 gap-[2.8vw] lg:gap-[2.2vw]">
        <MoreProducts
          suggestedProducts={suggestedProducts}
          name={`Products ${user.name}`}
        />
      </div>
      <Footer />
    </div>
  );
}

export default VendorDetails;
