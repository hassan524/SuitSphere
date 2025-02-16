import { useContext } from "react";
import AppContext from "../context/context";

const Hero = () => {
  const { IsSelectWomens } = useContext(AppContext);

  const img1 = IsSelectWomens ? "/images/banner/b1.jpg" : "/images/banner/b4.jpg";
  const img2 = IsSelectWomens ? "/images/banner/b2.jpg" : "/images/banner/b3.jpg";

  return (
    <>
      <div className="w-full flex justify-center items-center h-[90vh] relative">
        <div className="w-1/2 h-full relative hidden sm:block">
          <img
            className={`object-cover w-full h-full ${IsSelectWomens ? 'object-top' : 'object-center'}`}
            src={img1}
            alt="Category Banner 1"
          />
        </div>
        <div className="w-1/2 h-full relative hidden sm:block">
          <img
            className={`object-cover w-full h-full ${IsSelectWomens ? 'object-top' : 'object-bottom'}`}
            src={img2}
            alt="Category Banner 2"
          />
        </div>

        <div className="w-full h-full relative sm:hidden">
          <img
            className="object-cover w-full h-full object-center"
            src={img1} 
            alt="Mobile Hero Banner"
          />
        </div>

        <div className="absolute mb-10 inset-0 flex flex-col gap-5 justify-center items-center text-center text-white px-6">
          <h1 className="text-[4rem] leading-[3.4rem] font-semibold">
            Shop By Look
          </h1>
          <div className="text-xl">
            <p>Don't look any further.</p>
            <p>The must-have styles are right here.</p>
          </div>
          <button className="relative text-white font-bold py-4 px-6 rounded-lg border border-white bg-opacity-40 backdrop-blur-sm hover:backdrop-blur-xs hover:scale-105 transition-all">
            DISCOVER
          </button>
        </div>
      </div>
    </>
  );
};

export default Hero;
