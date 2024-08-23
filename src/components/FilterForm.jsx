import { useState } from "react";

// eslint-disable-next-line react/prop-types
const FilterForm = ({ onFilterChange }) => {
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState([0, Infinity]);
  const [bedrooms, setBedrooms] = useState("");
  const [amenities, setAmenities] = useState([]);

  const handleApplyFilters = () => {
    onFilterChange({
      location,
      priceRange,
      bedrooms,
      amenities,
    });
  };

  const handleResetFilters = () => {
    setLocation("");
    setPriceRange([0, Infinity]);
    setBedrooms("");
    setAmenities([]);
    onFilterChange({
      location: "",
      priceRange: [0, Infinity],
      bedrooms: "",
      amenities: [],
    });
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Filter Properties
      </h2>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Location:
        </label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter a location"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Price Range:
        </label>
        <div className="flex space-x-4">
          <input
            type="number"
            placeholder="Min Price"
            onChange={(e) =>
              setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])
            }
            value={priceRange[0] === 0 ? "" : priceRange[0]} // Clear input when value is 0
            className="w-1/2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Max Price"
            onChange={(e) =>
              setPriceRange([
                priceRange[0],
                parseInt(e.target.value) || Infinity,
              ])
            }
            value={priceRange[1] === Infinity ? "" : priceRange[1]} // Clear input when value is Infinity
            className="w-1/2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Bedrooms:
        </label>
        <input
          type="number"
          value={bedrooms}
          onChange={(e) => setBedrooms(e.target.value)}
          placeholder="Number of bedrooms"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Amenities:
        </label>
        <div className="flex flex-wrap gap-3">
          {["wifi", "parking", "pool"].map((amenity) => (
            <label
              key={amenity}
              className="inline-flex items-center text-gray-700"
            >
              <input
                type="checkbox"
                value={amenity}
                checked={amenities.includes(amenity)}
                onChange={(e) =>
                  setAmenities((prev) =>
                    e.target.checked
                      ? [...prev, e.target.value]
                      : prev.filter((a) => a !== e.target.value)
                  )
                }
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-2 capitalize">{amenity}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={handleApplyFilters}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Apply Filters
        </button>
        <button
          onClick={handleResetFilters}
          className="w-full bg-gray-400 text-white py-3 rounded-lg font-semibold hover:bg-gray-500 transition-colors"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default FilterForm;
