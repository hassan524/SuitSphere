import { useContext, useState } from "react";
import AppContext from "@/context/context";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const PlaceOrder = () => {
  const { user, Carts, SetOrders } = useContext(AppContext);
  const [PaymentMethod, setPaymentMethod] = useState(null);
  const [address, setAddress] = useState("");
  const [selectedMethod, setSelectedMethod] = useState(null);
  console.log(Carts)

  const navigate = useNavigate()

  const usernameParts = user?.username?.split(" ") || [];
  const firstName = usernameParts[0] || "";
  const lastName = usernameParts[1] || "";

  const subtotal = (Carts || []).reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 1), 0);
  const shippingFee = 5;
  const total = subtotal + shippingFee;

  const handlePaymentSelect = (method, label) => {
    setSelectedMethod(method);
    setPaymentMethod(label);
  };

  const handleOrder = async () => {
    if (!address || !PaymentMethod) {
      toast.error("Please complete all required information.");
      return;
    }

    const filteredCarts = Carts.map(({ _id, ...rest }) => rest);

    try {
      const response = await axios.post(
        "http://localhost:5200/api/order/place-order",
        { carts: filteredCarts, address, PaymentMethod },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      SetOrders((prevOrders) => [...prevOrders, response.data.order]);
      navigate('/orders')

      toast.success(response.data.message);
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order. Please try again.");
    }
  };
  return (
    <div className="flex lg:h-[calc(100vh-18vh)] lg:flex-row flex-col items-center justify-center px-4 md:px-16 gap-[5rem] py-10">
      {/* Left Side - Form Section */}

      <div className="lg:w-1/2 w-full flex flex-col gap-12 items-center lg:items-start">
      <h2 className="lg:text-3xl text-4xl uppercase text-center lg:text-start relative">
          Delivery Information
        </h2>
        <form className="w-full max-w-lg flex flex-col gap-8">
          <div className="w-full flex flex-col gap-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                className="flex-1 py-3 px-4 border-b border-gray-300 focus:outline-none"
                type="text"
                placeholder="First Name"
                value={firstName}
                readOnly
              />
              <input
                className="flex-1 py-3 px-4 border-b border-gray-300 focus:outline-none"
                type="text"
                placeholder="Last Name"
                value={lastName}
                readOnly
              />
            </div>
            <input
              className="py-3 px-4 border-b border-gray-300 focus:outline-none"
              type="email"
              placeholder="Email Address"
              value={user?.email || ""}
              readOnly
            />
            <input
              className="py-3 px-4 border-b border-gray-300 focus:outline-none"
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </form>
      </div>

      {/* Right Side - Summary Section */}
      <div className="lg:w-1/2 w-full flex flex-col lg:items-end items-center px-5">
        <div className="w-full max-w-lg flex flex-col gap-8 text-center sm:text-left">
          <div className="flex justify-between border-b pb-2">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span>Shipping Fee</span>
            <span>${shippingFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-xl">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          {/* Payment Methods */}
          <div className="flex gap-4 justify-center items-center mt-4">
            {[
              { key: "Razorpay", label: "Razorpay" },
              { key: "Stripe", label: "Stripe" },
              { key: "Cash on Delivery", label: "Cash on Delivery" },
            ].map(({ key, label }) => (
              <div
                key={key}
                className={`h-12 w-1/3 flex items-center justify-center px-4 cursor-pointer rounded-md transition-all duration-300 ${selectedMethod === key ? "border-2 border-green-500 bg-green-100" : "bg-gray-100"
                  }`}
                onClick={() => handlePaymentSelect(key, label)}
              >
                {selectedMethod === key && <CheckCircle className="text-green-500 mr-2" size={18} />}
                <span className="text-xs uppercase">{label}</span>
              </div>
            ))}
          </div>

          <Button onClick={handleOrder} className="uppercase px-6 py-4 text-lg text-white w-full sm:w-auto mt-5">
            Place Order
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
