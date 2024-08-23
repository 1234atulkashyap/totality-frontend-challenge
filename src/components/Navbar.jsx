import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { FaHotel } from "react-icons/fa";


const Navbar = () => {
  const { getCartItemCount } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-800 text-white shadow-2xl">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo or Home Link */}
        <Link to="/" className="text-2xl font-semibold">
          <span className="text-white">Home</span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          <Link
            to="/home"
            className="hover:text-blue-300 transition-colors duration-300"
          >
             <span className="flex items-center">
              {" "}
              Booking <FaHotel size={20} />{" "}
            </span>
          </Link>
          <Link
            to="/cart"
            className="relative hover:text-blue-300 transition-colors duration-300"
          >
            <span className="flex items-center">
              {" "}
              Cart <FaShoppingCart size={20} />{" "}
            </span>

            <span className="absolute -top-4 -right-4 bg-red-600 text-white text-xs rounded-full px-2 py-1">
              {getCartItemCount()}
            </span>
          </Link>
          <Link
            to="/checkout"
            className="hover:text-blue-300 transition-colors duration-300"
          >
            {" "}
            <span className="flex items-center">
              Checkout <MdOutlineShoppingCartCheckout size={20} />{" "}
            </span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-3xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Navigation Links */}
      <div
        className={`md:hidden ${
          isOpen ? "block" : "hidden"
        } bg-blue-700 text-white p-4 rounded-b-lg`}
      >
        <Link
          to="/home"
          className="block py-4 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300"
        >
           <span className="flex items-center gap-2">
              {" "}
              Booking <FaHotel size={20} />{" "}
            </span>
        </Link>
        <Link
          to="/cart"
          className="relative block py-4 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300"
        >
           <span className="flex items-center gap-2">
              {" "}
              Cart <FaShoppingCart size={20} />{" "}
            </span>
            <span className="absolute -top-1 left-16 bg-red-600 text-white text-xs rounded-full px-2 py-1">
              {getCartItemCount()}
            </span>
        </Link>
        <Link
          to="/checkout"
          className="block py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300"
        >
          <span className="flex items-center gap-2">
              Checkout <MdOutlineShoppingCartCheckout size={20} />{" "}
            </span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
