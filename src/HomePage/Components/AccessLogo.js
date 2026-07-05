import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeaturedLogos } from "../../Products/Components/masterDataAPI";

export default function AccessLogo() {
  const dispatch = useDispatch();
  const { logos = [], loading } = useSelector((state) => state.masterData);

  useEffect(() => {
    dispatch(fetchFeaturedLogos());
  }, [dispatch]);

  return (
    <section className="w-full py-[8%] lg:py-[4%]">
      <div className="lg:flex justify-between items-center px-4 lg:px-10 mb-[8%] lg:mb-[2.5%]">
        <h2 className="text-[clamp(20px,6vw,120px)] lg:text-[clamp(20px,4.2vw,120px)] py-[1%] text-center capitalize leading-tight font-medium font-[Poppins]">
          Access 3,000+ Trusted Brands
        </h2>
      </div>

      {loading ? (
        <p className="text-center">Loading logos...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 lg:gap-4">
          {logos?.map((logo) => (
            <img
              src={logo.image}
              key={logo._id}
              alt=""
              className="w-full h-full object-cover"
            />
          ))}
        </div>
      )}
    </section>
  );
}
