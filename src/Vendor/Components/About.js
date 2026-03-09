import React from "react";

function About({ about }) {
  return (
    <div
      className="prose max-w-none px-[3vw] lg:px-[2.34375vw] py-[20px] sm:py-[30px] lg:py-[40px]"
      dangerouslySetInnerHTML={{ __html: about }}
    />
  );
}

export default About;
