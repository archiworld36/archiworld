import React, { useCallback, useEffect, useState } from "react";
import bannerBackground from "../../assets/Homepage/Banner/banner.png";
import Navbar from "../../Components/Navbar";
import { useLocation } from "wouter";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategory } from "../../Products/Components/masterDataAPI";

function Banner() {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const dispatch = useDispatch();
  const [, navigate] = useLocation();
  const { categories = [] } = useSelector((state) => state.masterData);
  const fetchCategoriesOnce = useCallback(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  useEffect(() => {
    fetchCategoriesOnce();
  }, [fetchCategoriesOnce]);

  // convert categories to string list
  const words = categories.map((c) => c.name || c);

  useEffect(() => {
    if (!words.length) return;

    const currentWord = words[wordIndex];
    let typingSpeed = isDeleting ? 40 : 90;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        const newText = currentWord.substring(0, displayText.length + 1);
        setDisplayText(newText);

        if (newText === currentWord) {
          setTimeout(() => setIsDeleting(true), 5000);
        }
      } else {
        const newText = currentWord.substring(0, displayText.length - 1);
        setDisplayText(newText);

        if (newText === "") {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, wordIndex, words]);

  return (
    <div className="relative inset-0 w-full h-full">
      <img
        src={bannerBackground}
        alt=""
        className="relative inset-0 w-full min-h-[55vh] sm:min-h-[75vh] h-fit object-cover -z-10"
      />

      <div className="w-full h-full absolute top-0 z-20 flex flex-col justify-between">
        <Navbar color="white" />

        <div className="w-full h-full flex px-3 flex-col gap-3 items-center justify-center text-white">
          <h1 className="text-[clamp(20px,7vw,120px)] sm:text-[clamp(20px,5.6vw,120px)] lg:text-[clamp(20px,4.5vw,120px)] text-center capitalize leading-tight font-medium font-[Poppins]">
            Your beautiful{" "}
            <span className="relative inline-block px-2">
              <span
                style={{ fontFamily: "Playfair Display" }}
                className="relative z-10"
              >
                {displayText}
              </span>
              <span className="absolute inset-0 -z-0 bg-gradient-to-r from-white/30 to-white/0"></span>
            </span>
            <br />
            begins with Archiworld
          </h1>

          <h3 className="text-[clamp(12px,4vw,40px)] sm:text-[clamp(12px,2.3vw,30px)] lg:text-[clamp(10px,1.2vw,40px)] text-center">
            Browse projects, discover products, connect with experts, and learn
            all in one place.
          </h3>

          <button
            onClick={() => navigate("/products")}
            className="relative border bg-white/15 mt-[2%] border-white/30 backdrop-blur-[1px]"
          >
            Explore Products
          </button>
        </div>
      </div>
    </div>
  );
}

export default Banner;
