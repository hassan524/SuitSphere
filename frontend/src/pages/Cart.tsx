import { useContext, useState, useEffect } from "react";
import axios from "axios";
import AppContext from "@/context/context";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const { Carts, settingCarts } = useContext(AppContext);
    const [Total, SetTotal] = useState<number>(0);
    const [ShippingFee] = useState(5);
    const [SubTotal, SetSubTotal] = useState<number>(0);
    console.log(Carts)

    const navigate = useNavigate();

    useEffect(() => {
        if (Array.isArray(Carts) && Carts.length > 0) {
            const totalPrice = Carts.reduce((acc, cart) => acc + (cart.price || 0) * (cart.quantity || 1), 0);
            SetSubTotal(totalPrice);
            SetTotal(totalPrice + ShippingFee);
        } else {
            SetSubTotal(0);
            SetTotal(0);
        }
    }, [Carts, ShippingFee]);

    const fetchUpdatedCart = async () => {
        try {
            const response = await axios.get("http://localhost:5200/api/cart/getProduct", { withCredentials: true });
            settingCarts(response.data.products);
        } catch (error) {
            console.error("Error fetching updated cart:", error);
        }
    };

    const handleQuantityChange = async (productId: number, action: "increase" | "decrease") => {
        const endpoint =
            action === "increase" ? "http://localhost:5200/api/cart/increaseCart" : "http://localhost:5200/api/cart/decreaseCart";
        try {
            await axios.post(endpoint, { productId }, { withCredentials: true });
            fetchUpdatedCart();
        } catch (error) {
            console.error(`Error ${action} quantity:, error`);
        }
    };

    const handleRemoveItem = async (productId: number) => {
        try {
            await axios.post("http://localhost:5200/api/cart/removeCart", { productId }, { withCredentials: true });
            fetchUpdatedCart();
        } catch (error) {
            console.error("Error removing item:", error);
        }
    };

    const handleOrder = () => {
        if (Carts.length === 0) {
            alert("Your cart is empty!");
            return;
        }
        navigate("/place-order");
    };

    const handleNavigate = () => {

    }


    if (!Carts || Carts.length === 0) {
      return (
        <div className="flex flex-col justify-center items-center py-10">
          <h2 className="md:text-[3rem] text-[2rem] uppercase text-center px-1">- YOU HAVEN'T ADDED CARTS YET -</h2>
          <img src="/logos/nofound.jpg" alt="No Orders Found" className="w-60 mt-4" />
        </div>
      );
    }

    return (
        <div className="flex flex-col gap-[3.5rem] py-10 px-8 md:px-20 lg:px-32">
            <h2 className="md:text-[3rem] text-[2rem] uppercase text-center">- YOUR CART -</h2>
            <div className="flex flex-col gap-16">
                {Carts?.length > 0 ? (
                    Carts.map((cartItem, index) => (
                        <div key={index} className="flex flex-col gap-8 border-b border-gray-200 py-6">
                            <div className="flex md:flex-row gap-10 flex-col w-full items-center justify-between">
                                <div className="flex gap-5 items-center md:w-[300px] w-full">
                                    <img className="w-16 md:w-28 rounded-md cursor-pointer" onClick={handleNavigate} src={cartItem.image} alt={cartItem.name} />
                                    <div className="flex flex-col gap-2">
                                        <span className="text-lg font-medium">{cartItem.name}</span>
                                        <div className="flex items-center gap-4">
                                            <span className="text-gray-700 font-semibold">${cartItem.price.toFixed(2)}</span>
                                            <div className="border px-3 py-1 rounded-md text-sm font-medium text-gray-800">{cartItem.size}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="md:flex hidden items-center border rounded-md px-4 py-2 gap-4 w-[120px] justify-between">
                                    <button onClick={() => handleQuantityChange(cartItem.productId, "decrease")}>-</button>
                                    <span className="text-md font-semibold">{cartItem.quantity}</span>
                                    <button onClick={() => handleQuantityChange(cartItem.productId, "increase")}>+</button>
                                </div>
                                <button onClick={() => handleRemoveItem(cartItem.productId)} className="md:block hidden text-gray-600 text-2xl">
                                    <i className="fa-solid fa-trash"></i>
                                </button>

                                <div className="flex w-full justify-between md:hidden items-center gap-4">
                                    <div className="flex items-center rounded-md px-4 py-2 gap-4 w-[100px] justify-between">
                                        <button onClick={() => handleQuantityChange(cartItem.productId, "decrease")}>-</button>
                                        <span className="text-md font-semibold">{cartItem.quantity}</span>
                                        <button onClick={() => handleQuantityChange(cartItem.productId, "increase")}>+</button>
                                    </div>
                                    <button onClick={() => handleRemoveItem(cartItem.productId)} className="text-gray-600 text-2xl">
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex flex-col items-center gap-4">
                        <h2 className="text-2xl font-semibold">You haven't added any carts yet</h2>
                        <img className="w-64" src="/images/empty-cart.png" alt="Empty Cart" />
                    </div>
                )}
            </div>

            <div className="w-full text-xl mx-auto items-center justify-center max-w-2xl flex flex-col gap-8">
                <div className="flex w-full justify-between border-b border-gray-200 py-3">
                    <span>Subtotal</span>
                    <span>${SubTotal.toFixed(2)}</span>
                </div>
                <div className="flex w-full justify-between border-b border-gray-200 py-3">
                    <span>Shipping Fee</span>
                    <span>${ShippingFee.toFixed(2)}</span>
                </div>
                <div className="flex w-full justify-between font-bold border-b border-gray-300 py-3 text-lg">
                    <span>Total</span>
                    <span>${Total.toFixed(2)}</span>
                </div>
                <Button className="uppercase mt-4 px-8 py-6 text-lg text-white" onClick={handleOrder}>
                    Proceed to Checkout
                </Button>
            </div>
        </div>
    );
};

export default Cart;
