import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useContext } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Navigation icons
import { useNavigate } from "react-router-dom";
import AppContext from "@/context/context";

import MensTopSellers from "@/products/HomeProducts/MTopSellers";
import WomensTopSellers from "@/products/HomeProducts/FTopSellers";
import m2 from "@/products/HomeProducts/m2";
import f2 from "@/products/HomeProducts/f2";

const TopSellers = () => {
  const { IsSelectWomens } = useContext(AppContext);
  const navigate = useNavigate();

  const getProduct = (gender, category, id) => {
    navigate(`/${gender}/${category}/${id}`);
  };

  return (
    <div className="w-full flex flex-col gap-[4rem]">
      {/* First Swiper Container */}
      <div className="relative w-full">
        <button className="swiper-button-prev-1 absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 text-white rounded-full shadow-lg">
          <ChevronLeft size={24} />
        </button>
        <button className="swiper-button-next-1 absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 text-white rounded-full shadow-lg">
          <ChevronRight size={24} />
        </button>

        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          navigation={{
            nextEl: ".swiper-button-next-1",
            prevEl: ".swiper-button-prev-1",
          }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          className="w-full"
        >
          {(IsSelectWomens ? f2 : m2).map((product) => (
            <SwiperSlide key={product.id}>
              <div 
                className="bg-white border-2 border-slate-200 rounded-lg cursor-pointer overflow-hidden" 
                onClick={() => getProduct(product.gender, product.category, product.id)}
              >
                <div className="relative w-full overflow-hidden rounded-lg">
                  <img
                    src={product.multiple[0].image}
                    alt={product.name}
                    className="w-full brightness-75 h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center justify-between">
                      <h2 className="text-sm uppercase garamond">{product.name}</h2>
                      <span className="garamond text-sm">${product.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Second Swiper Container */}
      <div className="relative w-full">
        <button className="swiper-button-prev-2 absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 text-white rounded-full shadow-lg">
          <ChevronLeft size={24} />
        </button>
        <button className="swiper-button-next-2 absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 text-white rounded-full shadow-lg">
          <ChevronRight size={24} />
        </button>

        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          navigation={{
            nextEl: ".swiper-button-next-2",
            prevEl: ".swiper-button-prev-2",
          }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          className="w-full"
        >
          {(IsSelectWomens ? WomensTopSellers : MensTopSellers).map((product) => (
            <SwiperSlide key={product.id}>
              <div 
                className="bg-white border-2 border-slate-200 rounded-lg cursor-pointer overflow-hidden" 
                onClick={() => getProduct(product.gender, product.category, product.id)}
              >
                <div className="relative w-full overflow-hidden rounded-lg">
                  <img
                    src={product.multiple[0].image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center justify-between">
                      <h2 className="text-sm uppercase garamond">{product.name}</h2>
                      <span className="garamond text-sm">${product.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TopSellers;
