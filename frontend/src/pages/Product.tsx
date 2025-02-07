import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MensPants from '@/products/MenPants';
import MenShirts from '@/products/MenShirts';
import MensShoes from '@/products/MenShoes';
import MensSweaters from '@/products/MenSweaters';
import WomensPants from '@/products/WomenPants';
import WomensShirts from '@/products/WomenShirts';
import WomensShoes from '@/products/WomenShoes';
import WomensSweaters from '@/products/WomenSweater';
import { Button } from '@/components/ui/button';

const Product = () => {
  const { id, Category, Gender } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null); // Track selected size

  const collections = {
    men: {
      pants: MensPants,
      shirt: MenShirts,
      shoes: MensShoes,
      sweater: MensSweaters,
    },
    women: {
      pants: WomensPants,
      shirt: WomensShirts,
      shoes: WomensShoes,
      sweater: WomensSweaters,
    },
  };

  useEffect(() => {
    const collection = collections[Gender]?.[Category] || [];
    const finalProduct = collection.find((item) => item.id === id);
    setProduct(finalProduct);
    setSelectedImage(finalProduct?.image);
  }, [id, Category, Gender]);

  if (!product)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-center py-20 text-xl">Product not found</p>
      </div>
    );

  const thumbnails = [{ image: product.image }].concat(product.multiple || []);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row lg:gap-8 gap-10">
          {/* Left Column: Product Image and Thumbnails */}
          <div className="lg:w-1/2 flex flex-col gap-6">
            <div className="relative">
              <img
                className="w-full h-auto object-cover rounded-md shadow-lg"
                src={selectedImage}
                alt={product.name}
              />
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {[0, 1, 2, 3].map((i) => {
                const thumb = thumbnails[i];
                return (
                  <img
                    key={i}
                    className="w-14 h-14 sm:w-16 sm:h-16 object-cover cursor-pointer rounded-md border hover:shadow-md transition-all"
                    src={thumb ? thumb.image : "/images/noimage.png"}
                    alt={`${product.name} thumbnail ${i + 1}`}
                    onClick={() => thumb && setSelectedImage(thumb.image)}
                  />
                );
              })}
            </div>
          </div>

          {/* Right Column: Product Details */}
          <div className="lg:w-1/2 garamond flex flex-col px-3 gap-6">
            <div className="flex lg:flex-col flex-row justify-between">
              <h1 className="text-3xl sm:text-4xl text-gray-800">{product.name}</h1>
              <p className="text-2xl sm:text-3xl text-gray-600">${product.price}</p>
            </div>
            <p className="text-gray-700 sm:text-xl text-lg leading-relaxed">{product.description}</p>
            <div className="flex flex-col gap-2">
              <p className="text-gray-500 sm:text-xl text-lg">
                <span className="font-semibold mr-2">Brand:</span>
                {product.brand}
              </p>
              <p className="text-gray-500 sm:text-xl text-lg">
                <span className="font-semibold mr-2">Material:</span>
                {product.material}
              </p>
            </div>

            {/* Sizes */}
            <div className="flex flex-col gap-2">
              <p className="text-gray-600 font-semibold text-lg">Sizes:</p>
              <div className="flex flex-wrap gap-4">
                {product.sizes.map((size) => (
                  <span
                    key={size}
                    className={`px-4 py-2 border rounded-md text-sm sm:text-base cursor-pointer hover:bg-gray-100 transition-colors ${selectedSize === size ? 'bg-gray-200 border-gray-600' : ''
                      }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>

            <Button className="mt-6 w-full sm:w-[14rem] flex items-center justify-center gap-2 py-5 text-lg">
              <i className="fa-solid fa-cart-shopping"></i>
              <span>Add To Cart</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
