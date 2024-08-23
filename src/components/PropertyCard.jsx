/* eslint-disable react/prop-types */

// import React from "react";

const PropertyCard = ({ property, onBookNow, onViewDetails }) => {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <img
        src={property.image}
        alt={property.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-bold text-gray-800 mb-2">
          {property.title}
        </h2>
        <p className="text-gray-600 mb-4">{property.description}</p>
        <p className="text-gray-900 font-semibold text-lg">
          ${property.price} / night
        </p>
        <div className="mt-4 flex justify-between">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
            onClick={() => onViewDetails(property)}
          >
            View Details
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-200"
            onClick={() => onBookNow(property)}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
