import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart } =
    useCart();
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handleProceedToCheckout = () => {
    navigate("/checkout");
  };

  const handleViewDetails = (item) => {
    setSelectedItem(item);
  };

  const handleBackToCart = () => {
    setSelectedItem(null);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-extrabold mb-6 text-gray-900">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-lg text-gray-700">Your cart is empty</p>
      ) : selectedItem ? (
        // Detailed view of the selected item
        <div className="border border-gray-200 rounded-lg p-4 md:p-6 shadow-sm">
          <img
            src={selectedItem.image}
            alt={selectedItem.title}
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            {selectedItem.title}
          </h2>
          <p className="text-gray-600 mb-2">{selectedItem.description}</p>
          <p className="text-lg font-semibold text-gray-900 mb-2">
            ${selectedItem.price} per night
          </p>
          <p className="text-gray-600 mb-2">
            Location: {selectedItem.location}
          </p>
          <p className="text-gray-600 mb-2">
            Bedrooms: {selectedItem.bedrooms}
          </p>
          <p className="text-gray-600 mb-2">
            Amenities: {selectedItem.amenities.join(", ")}
          </p>
          <button
            onClick={handleBackToCart}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-600 transition"
          >
            Back to Cart
          </button>
        </div>
      ) : (
        // Cart items view
        <div>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="border border-gray-200 rounded-lg p-4 md:p-6 mb-6 shadow-sm flex flex-col md:flex-row items-center"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full md:w-32 h-32 object-cover rounded-lg mb-4 md:mb-0 md:mr-6"
              />
              <div className="flex-grow text-center md:text-left">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {item.title}
                </h2>
                <p className="text-gray-600 mb-2">{item.description}</p>
                <p className="text-lg font-semibold text-gray-900">
                  ${item.price} per night
                </p>
                <div className="flex justify-center md:justify-start items-center mt-4">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="bg-gray-300 p-2 rounded-lg hover:bg-gray-400 transition"
                  >
                    -
                  </button>
                  <span className="mx-4 text-lg font-medium">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className="bg-gray-300 p-2 rounded-lg hover:bg-gray-400 transition"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="bg-red-500 text-white p-2 rounded-lg ml-4 md:ml-6 hover:bg-red-600 transition"
                  >
                    Remove
                  </button>
                </div>
                <button
                  onClick={() => handleViewDetails(item)}
                  className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-600 transition"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
          <div className="text-xl font-bold mt-8 text-center md:text-left">
            Total: ${getTotalPrice()}
          </div>
          <div className="flex justify-center md:justify-end">
            <button
              onClick={handleProceedToCheckout}
              className="mt-6 bg-blue-500 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-blue-600 transition"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
