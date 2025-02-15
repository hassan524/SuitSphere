import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import MensPants from "@/products/MenPants";
import MenShirts from "@/products/MenShirts";
import MensShoes from "@/products/MenShoes";
import MensSweaters from "@/products/MenSweaters";
import WomensPants from "@/products/WomenPants";
import WomensShirts from "@/products/WomenShirts";
import WomensShoes from "@/products/WomenShoes";
import WomensSweaters from "@/products/WomenSweater";
import { Button } from "@/components/ui/button";
import AppContext from "@/context/context";

const Product = () => {
  const { id, Category, Gender } = useParams();
  const { user, SetCarts, Carts } = useContext(AppContext);
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  console.log(product)

  const collections = {
    men: { pants: MensPants, shirt: MenShirts, shoes: MensShoes, sweater: MensSweaters },
    women: { pants: WomensPants, shirt: WomensShirts, shoes: WomensShoes, sweater: WomensSweaters },
  };

  useEffect(() => {
    const collection = collections[Gender]?.[Category] || [];
    const finalProduct = collection.find((item) => item.id === id);
    setProduct(finalProduct);
    setSelectedImage(finalProduct?.image || "/images/noimage.png");
  }, [id, Category, Gender]);

  if (!product)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-center py-20 text-xl">Product not found</p>
      </div>
    );

  const thumbnails = [{ image: product.image }].concat(product.multiple || []);

  const handleAddToCart = async () => {
    if (!user) {
      alert("You need to log in to add items to the cart.");
      return;
    }
    if (!selectedSize) {
      alert("Please select a size before adding to the cart.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5200/api/cart/addProduct",
        {
          userID: user.id,
          productID: product.id,
          quantity,
          size: selectedSize,
          price: Math.round(product.price),
          image: product.image,
          name: product.name
        },
        { withCredentials: true }
      );

      const newCartItem = response.data.product;
      alert('successfuly get')

      const existingCartItem = Carts.find((cart) => cart.productId === newCartItem.productId);

      if (!existingCartItem) {
        SetCarts([...Carts, newCartItem]);
      } else {
        console.log("Product already exists in the cart.");
      }
    } catch (error) {
      console.error("Error adding to cart:", error.response || error.message);
      alert(error.response?.data?.message || "An error occurred while adding to cart.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row lg:gap-8 gap-10">
          <div className="lg:w-1/2 flex flex-col gap-6">
            <img className="w-full h-auto object-cover rounded-md shadow-lg" src={selectedImage} alt={product.name} />
            <div className="flex flex-wrap justify-center gap-4">
              {thumbnails.map((thumb, i) => (
                <img
                  key={i}
                  className="w-14 h-14 sm:w-16 sm:h-16 object-cover cursor-pointer rounded-md border hover:shadow-md transition-all"
                  src={thumb?.image || "/images/noimage.png"}
                  alt={`${product.name} thumbnail ${i + 1}`}
                  onClick={() => setSelectedImage(thumb?.image)}
                />
              ))}
            </div>
          </div>
          <div className="lg:w-1/2 garamond flex flex-col px-3 gap-6">
            <div className="flex lg:flex-col flex-row justify-between">
              <h1 className="text-3xl sm:text-4xl text-gray-800">{product.name}</h1>
              <p className="text-2xl sm:text-3xl text-gray-600">${Math.round(product.price * quantity)}</p>
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

            {/* SIZE SELECTOR */}
            <div className="flex flex-col gap-2">
              <p className="text-gray-600 font-semibold text-lg">Sizes:</p>
              <div className="flex flex-wrap gap-4">
                {product.sizes.map((size) => (
                  <span
                    key={size}
                    className={`px-4 py-2 border rounded-md text-sm sm:text-base cursor-pointer hover:bg-gray-100 transition-colors ${selectedSize === size ? "bg-gray-200 border-gray-600" : ""
                      }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>

            {/* QUANTITY SELECTOR */}
            <div className="flex items-center gap-3 mt-4">
              <p className="text-gray-600 font-semibold text-lg">Quantity:</p>
              <div className="flex items-center bg-slate-100 rounded-md px-4 py-2">
                <button
                  className="text-lg px-3 font-semibold hover:text-gray-700"
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                >
                  -
                </button>
                <span className="text-lg font-semibold mx-4">{quantity}</span>
                <button
                  className="text-lg px-3 font-semibold hover:text-gray-700"
                  onClick={() => setQuantity((prev) => prev + 1)}
                >
                  +
                </button>
              </div>
            </div>

            <Button
              className="mt-6 w-full sm:w-[14rem] flex items-center justify-center gap-2 py-5 text-lg"
              onClick={handleAddToCart}
              disabled={loading}
            >
              {loading ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin"></i>
                  <span>Adding...</span>
                </>
              ) : (
                <>
                  <i className="fa-solid fa-cart-shopping"></i>
                  <span>Add To Cart</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
