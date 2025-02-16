import { useLocation, useNavigate } from "react-router-dom";
import { useState } from 'react';
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

const Search = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get("query")?.toLowerCase();

    const allProducts = [
        ...MensPants,
        ...MenShirts,
        ...MensShoes,
        ...MensSweaters,
        ...WomensPants,
        ...WomensShirts,
        ...WomensShoes,
        ...WomensSweaters,
    ];

    const [sortOption, setSortOption] = useState('Relevance');

    const filteredProducts = searchQuery
        ? allProducts.filter(product => 
            product.name.toLowerCase().includes(searchQuery) || 
            product.description.toLowerCase().includes(searchQuery)
          )
        : [];

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sortOption === 'price-low-high') {
            return a.price - b.price;
        } else if (sortOption === 'price-high-low') {
            return b.price - a.price;
        } else if (sortOption === 'top-rated') {
            return b.rating - a.rating;
        }
        return 0;
    });

    const getProduct = (gender, category, id) => {
        navigate(`/${gender}/${category}/${id}`);
    };

    return (
        <section className="flex flex-col items-center gap-7 w-full py-14 px-7">
            <div className="text-center flex flex-col gap-5">
                <h2 className="lecker leading-[3rem] capitalize text-[4rem] font-bold text-gray-800">
                    Search Results
                </h2>
                <p>Showing results for: <strong>{searchQuery}</strong></p>
            </div>

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

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-14 sm:gap-y-[5rem] gap-y-[4rem]">
                {sortedProducts.length === 0 ? (
                    <p className="text-gray-500 text-lg col-span-full text-center">No products found matching your query.</p>
                ) : (
                    sortedProducts.map((product, index) => (
                        <div
                            key={index}
                            className="product-card cursor-pointer bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform hover:scale-105"
                            onClick={() => getProduct(product.gender, product.category, product.id)}
                        >
                            <div className="relative h-64">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                                <p className="mt-1 text-gray-700 font-medium">${product.price}</p>
                                <p className="mt-1 text-gray-500 text-sm">Brand: {product.brand}</p>
                                <p className="mt-2 text-gray-600 text-sm">
                                    {product.description}
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
};

export default Search;
