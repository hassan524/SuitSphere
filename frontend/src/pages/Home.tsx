import Hero from "../components/Hero";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate
import AppContext from "@/context/context";
import useCategories from "@/utils/categories";
import TopSellers from "@/components/TopSellers";

const Home = () => {
    const { IsSelectWomens } = useContext(AppContext);
    const categories = useCategories();
    const navigate = useNavigate();  // Initialize useNavigate

    // Dummy testimonials data
    const testimonials = [
        { name: "Sarah M.", review: "Love the quality and styles! My go-to clothing store.", src: '/images/t1.jpg' },
        { name: "John D.", review: "Fast shipping & great customer service. Highly recommended!", src: '/images/t2.jpg' },
        { name: "Emily R.", review: "Affordable yet trendy fashion. 10/10 experience!", src: '/images/t3.jpg' },
    ];

    const handleCategoryClick = (gender: string, type: string) => {
        // Navigate to the specific route based on gender and type
        navigate(`/${gender}/Collection/${type}`);
    };

    return (
        <>
            <Hero />

            {/* Main Content */}
            <div className="sm:px-8 p-6 flex flex-col items-center gap-14 w-full mt-8">

                {/* Dynamic Collection Title */}
                <h2 className="garamond text-[3rem] lecker text-center w-full">
                    Shop {IsSelectWomens ? "Women's" : "Men's"} Collection
                </h2>

                {/* Categories Grid */}
                <div className="grid w-full lg:gap-8 gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[150px]">
                    {categories.map((item, index) => (
                        <div
                            key={index}
                            className={`${item.span || ""} cursor-pointer flex items-center justify-center 
                            overflow-hidden rounded-lg relative group transition-all shadow-md`}
                            tabIndex={0}
                            onClick={() => handleCategoryClick(IsSelectWomens ? "women" : "men", item.type)} // Handle click to navigate
                        >
                            {/* Category Image */}
                            
                            <img
                                className="object-cover w-full h-full brightness-90 transition-all duration-300"
                                src={item.img}
                                alt={item.label}
                            />

                            {/* Overlay: Visible on Hover */}
                            <div
                                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 
                                sm:hidden group-hover:flex focus-within:flex"
                            >
                                <span className="text-white text-lg">Explore {item.label}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Top Sellers Section */}
                <h2 className="garamond text-[3rem] lecker text-center w-full mt-16">
                    Top Sellers
                </h2>
                <TopSellers />

                {/* Customer Testimonials Section */}
                <h2 className="garamond text-[3rem] lecker text-center w-full mt-16">
                    What Our Customers Say
                </h2>
                <div className="flex flex-wrap gap-6 justify-center w-full">
                    {testimonials.map((item, index) => (
                        <div
                            key={index}
                            className="bg-gray-100 hover:scale-105 transition-all ease-out flex flex-col items-center gap-5 p-6 rounded-lg shadow-md max-w-sm text-center"
                        >
                            {/* Centered Testimonial Image */}
                            <img
                                className="h-36 w-36 rounded-full object-cover mx-auto"
                                src={item.src}
                                alt={item.name}
                            />

                            {/* Review Text */}
                            <p className="text-lg italic">"{item.review}"</p>

                            {/* Reviewer Name */}
                            <span className="block mt-2 font-semibold">- {item.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Home;
