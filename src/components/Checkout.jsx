import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    bookingDate: "",
    paymentMethod: "credit-card",
  });
  const [error, setError] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.address ||
      !formData.bookingDate
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    setShowConfirmation(true);

    setTimeout(() => {
      clearCart();
      navigate("/home");
    }, 4000);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Checkout</h1>
      {cartItems.length === 0 ? (
        <p className="text-lg text-gray-600 text-center">Your cart is empty</p>
      ) : (
        <div>
          {/* Cart Summary */}
          <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-semibold mb-4">Cart Summary</h2>
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="border border-gray-200 rounded-lg mb-4 p-4 flex flex-col md:flex-row items-center"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-24 h-24 object-cover rounded-md mr-4"
                />
                <div className="flex-grow text-center md:text-left mt-4 md:mt-0">
                  <h3 className="text-xl font-medium">{item.title}</h3>
                  <p className="text-lg text-gray-700">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
                <div className="text-lg font-semibold text-blue-600 mt-4 md:mt-0">
                  ${item.price.toFixed(2)}
                </div>
              </div>
            ))}
            <div className="border-t border-gray-200 pt-4 mt-4 text-lg font-bold text-center md:text-right">
              Total: ${getTotalPrice().toFixed(2)}
            </div>
          </div>

          {/* Checkout Form */}
          {!showConfirmation ? (
            <form
              onSubmit={handleSubmit}
              className="bg-white shadow-lg rounded-lg p-6"
            >
              <h2 className="text-2xl font-semibold mb-4">
                Billing Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="border rounded-lg p-3 w-full"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="border rounded-lg p-3 w-full"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Phone:</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="border rounded-lg p-3 w-full"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">
                    Booking Date:
                  </label>
                  <input
                    type="date"
                    name="bookingDate"
                    value={formData.bookingDate}
                    onChange={handleChange}
                    className="border rounded-lg p-3 w-full"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Address:</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="border rounded-lg p-3 w-full"
                  placeholder="Enter your address"
                />
              </div>
              <div className="mb-4 w-full">
                <label className="block text-gray-700 mb-2">
                  Payment Method:
                </label>
                <div className="relative w-full">
                  <select
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleChange}
                    className="block w-full border border-gray-300 rounded-lg p-3 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                  >
                    <option value="credit-card">Credit Card</option>
                    <option value="paypal">PayPal</option>
                    <option value="bank-transfer">Bank Transfer</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M7 10l5 5 5-5H7z" />
                    </svg>
                  </div>
                </div>
              </div>

              {error && <p className="text-red-500 mb-4">{error}</p>}
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-600 transition"
              >
                Complete Booking
              </button>
            </form>
          ) : (
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
              <h2 className="text-2xl font-semibold mb-4 text-green-600">
                Booking Confirmed
              </h2>
              <p className="text-lg mb-4">Thank you, {formData.name}!</p>
              <p className="text-lg">
                Total Price: ${getTotalPrice().toFixed(2)}
              </p>
              <p className="text-lg">Booking Date: {formData.bookingDate}</p>
              <p className="text-gray-600 mt-4">Redirecting to home page...</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Checkout;

