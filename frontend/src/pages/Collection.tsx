import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import MensPants from '@/products/MenPants';
import MenShirts from '@/products/MenShirts';
import MensShoes from '@/products/MenShoes';
import MensSweaters from '@/products/MenSweaters';
import WomensPants from '@/products/WomenPants';
import WomensShirts from '@/products/WomenShirts';
import WomensShoes from '@/products/WomenShoes';
import WomensSweaters from '@/products/WomenSweater';

const Collection = () => {
    const { Gender, Type } = useParams();
    const [products, setProducts] = useState([]);
    const [sortOption, setSortOption] = useState('Relevance');
    const navigate = useNavigate();

    // Get product array based on Gender & Type
    const getProductArray = () => {
        if (Gender === 'men') {
            switch (Type) {
                case 'pants': return MensPants;
                case 'shirt': return MenShirts;
                case 'shoes': return MensShoes;
                case 'sweater': return MensSweaters;
                default: return [];
            }
        } else if (Gender === 'women') {
            switch (Type) {
                case 'pants': return WomensPants;
                case 'shirt': return WomensShirts;
                case 'shoes': return WomensShoes;
                case 'sweater': return WomensSweaters;
                default: return [];
            }
        }
        return [];
    };

    useEffect(() => {
        setProducts(getProductArray());
    }, [Gender, Type]);

    // Sorting logic
    const sortedProducts = [...products].sort((a, b) => {
        if (sortOption === 'price-low-high') {
            return a.price - b.price;
        } else if (sortOption === 'price-high-low') {
            return b.price - a.price;
        } else if (sortOption === 'top-rated') {
            return b.rating - a.rating;
        }
        return 0; // Default relevance order
    });

    // If "Top Rated" is selected, filter products with rating 4.8 or higher
    const filteredProducts = sortOption === "top-rated"
        ? sortedProducts.filter(product => product.rating >= 4.8)
        : sortedProducts;

    const getProduct = (gender, category, id) => {
        navigate(`/${gender}/${category}/${id}`);
    };

    return (
        <section className="flex flex-col items-center gap-7 w-full py-14 px-7">
            {/* Hero / Top Section */}
            <div className="text-center flex flex-col gap-5">
                <h2 className="lecker leading-[3rem] capitalize text-[4rem] font-bold text-gray-800">
                    {Gender} {Type}
                </h2>

                {/* <div className="">
                    <span className="text-lg font-semibold text-gray-700">
                        Welcome to Our Collection
                    </span>
                </div> */}
            </div>

            {/* Sorting Bar */}
            <div className="w-full flex justify-center items-center mb-6 p-2 rounded">

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button className='opacity-75' variant="outline">
                            Sort by: {sortOption.replace('-', ' ')}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setSortOption('relevance')}>
                            Relevance
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setSortOption('price-low-high')}>
                            Price: Low to High
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setSortOption('price-high-low')}>
                            Price: High to Low
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setSortOption('top-rated')}>
                            Top Rated (4.8+)
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Products Grid */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                {filteredProducts.length === 0 ? (
                    <p className="text-gray-500 text-lg col-span-full text-center">No products available</p>
                ) : (
                    filteredProducts.map((product, index) => (
                        <div
                            key={index}
                            className="product-card cursor-pointer bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform hover:scale-105"
                            onClick={() => getProduct(product.gender, product.category, product.id)}
                        >
                            {/* Full-bleed Image */}
                            <div className="relative h-64">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {/* Product Details */}
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                                <p className="mt-1 text-gray-700 font-medium">${product.price}</p>
                                <p className="mt-1 text-gray-500 text-sm">Brand: {product.brand}</p>
                                {/* Extra descriptive text */}
                                <p className="mt-2 text-gray-600 text-sm">
                                    Experience the elegance and superior craftsmanship with this exclusive product.
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
};

export default Collection;
