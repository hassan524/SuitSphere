import { useContext } from "react";
import AppContext from "@/context/context";

const Order = () => {
  const { Orders } = useContext(AppContext);

  const calculateDaysLeft = (orderDate: string): string => {
    const expirationTime = new Date(orderDate).getTime() + 24 * 60 * 60 * 1000; 
    const now = new Date().getTime();
    const timeLeft = expirationTime - now;

    if (timeLeft <= 0) {
      return "Expired"; 
    }

    const hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60)); 
    const minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60)); 
    return `${hoursLeft}h ${minutesLeft}m left`;
  };

  if (!Orders || Orders.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center py-10">
        <h2 className="md:text-[3rem] text-[2rem] uppercase text-center">- YOU HAVE NO ORDERS YET -</h2>
        <img src="/logos/nofound.jpg" alt="No Orders Found" className="w-60 mt-4" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-[3.5rem] py-10 px-8 md:px-20 lg:px-32">
      <div className="flex flex-col gap-14">
        <h2 className="md:text-[3rem] text-[2rem] uppercase text-center">- YOUR ORDERS -</h2>
        {Orders.map((order, orderIndex) => (
          <div key={orderIndex} className="pb-6 flex flex-col gap-16">
            {order.carts.map((cartItem, cartIndex) => (
              <div
                key={cartIndex}
                className="flex flex-col garamond gap-8 py-6 border-b border-gray-200 "
              >
                <div className="flex md:flex-row gap-10 flex-col w-full items-center justify-between">
                  <div className="flex gap-5 md:w-[300px] w-full">
                    <img
                      className="w-16 md:w-28 rounded-md"
                      src={cartItem.image || "https://via.placeholder.com/100"}
                      alt={cartItem.name || "Product"}
                    />
                    <div className="flex flex-col gap-2">
                      <span className="text-lg font-medium">{cartItem.name || "Unknown Product"}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-gray-700 text-lg font-semibold">
                          ${cartItem.price?.toFixed(2) || "0.00"}
                        </span>
                        <div className="flex text-lg items-center gap-3">
                          <span>Size:</span>
                          <div className="font-medium text-gray-800">
                            {cartItem.size || "N/A"}
                          </div>
                        </div>
                      </div>
                      <div className="flex text-lg items-center gap-2">
                        <span>Quantity:</span>
                        <div className="font-medium text-gray-800">
                          {cartItem.quantity || "N/A"}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="md:flex hidden uppercase items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <div className="text-lg">Order Placed</div>
                  </div>

                  <div className="md:block uppercase hidden text-gray-600 text-lg">
                    {calculateDaysLeft(order.date)}
                  </div>

                  <div className="flex w-full justify-between md:hidden items-center gap-4">
                    <div className="flex uppercase items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      <div className="text-lg">Order Placed</div>
                    </div>
                    <span className="text-gray-600 text-lg">
                      {calculateDaysLeft(order.date)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Order Summary Section */}
      <div className="flex flex-col gap-6 text-lg p-6">
        {Orders.map((order, orderIndex) => {
          const totalPrice = order.carts.reduce(
            (total, cartItem) => total + cartItem.price * cartItem.quantity,
            0
          ); // Calculate total price

          return (
            <div key={orderIndex} className="flex flex-col gap-10 garamond uppercase text-lg">
              <div className="flex justify-between items-center">
                <span className="text-lg text-gray-700 font-semibold">Total:</span>
                <span className="text-lg font-bold text-gray-800">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-lg text-gray-700 font-semibold">Payment Method:</span>
                <span className="text-lg text-gray-800">{order.PaymentMethod}</span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-lg text-gray-700 font-semibold">Address:</span>
                <span className="text-lg text-gray-800">{order.address}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Order;
