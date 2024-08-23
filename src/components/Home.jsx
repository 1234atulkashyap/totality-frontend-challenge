

import { useState, useEffect } from "react";
import PropertyCard from "./PropertyCard";
import FilterForm from "./FilterForm";
import { useCart } from "../context/CartContext";
import "../index.css";

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const { addToCart } = useCart();
  const [notification, setNotification] = useState("");
  const [filters, setFilters] = useState({
    location: "",
    priceRange: [0, Infinity],
    bedrooms: "",
    amenities: [],
  });
  const [loading, setLoading] = useState(true);
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  useEffect(() => {
    const fetchProperties = async () => {
      const response = await fetch("/properties.json");
      const data = await response.json();
      setProperties(data);
      setFilteredProperties(data);
      setLoading(false);
    };

    fetchProperties();
  }, []);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setIsFilterVisible(false); // Close the filter panel on filter apply
  };

  useEffect(() => {
    const applyFilters = () => {
      const { location, priceRange, bedrooms, amenities } = filters;
      const result = properties.filter((property) => {
        return (
          (!location ||
            property.location.toLowerCase().includes(location.toLowerCase())) &&
          property.price >= priceRange[0] &&
          property.price <= priceRange[1] &&
          (!bedrooms || property.bedrooms === parseInt(bedrooms)) &&
          (amenities.length === 0 ||
            amenities.every((amenity) => property.amenities.includes(amenity)))
        );
      });
      setFilteredProperties(result);
    };
    applyFilters();
  }, [filters, properties]);

  const handleBookNow = (property) => {
    addToCart(property);
    setNotification("Added to cart");
    setTimeout(() => setNotification(""), 3000);
  };

  const handleViewDetails = (property) => {
    setSelectedProperty(property);
  };

  return (
    <div className="flex flex-col md:flex-row w-full max-h-screen">
      {/* Filter button for mobile view */}
      <button
        className="md:hidden bg-blue-500 text-white p-3 fixed bottom-4 right-4 z-50 rounded-full shadow-lg"
        onClick={() => setIsFilterVisible(true)}
      >
        Filter
      </button>

      {/* Slide-in filter panel */}
      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-50 z-40 transform ${
          isFilterVisible ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 md:hidden`}
      >
        <div className="absolute top-0 right-0 w-3/4 bg-white h-full p-4 shadow-lg">
          <button
            className="absolute top-4 right-4 text-gray-700"
            onClick={() => setIsFilterVisible(false)}
          >
            &#10005; {/* Cross icon */}
          </button>
          <FilterForm onFilterChange={handleFilterChange} />
        </div>
      </div>

      {/* Sidebar for Filters on Desktop */}
      <aside className="hidden md:block md:w-1/4 p-4 bg-gray-100 flex-shrink-0 md:sticky md:top-0">
        <FilterForm onFilterChange={handleFilterChange} />
      </aside>

      {/* Main Content Area */}
      <main className="w-full md:w-3/4 p-4 flex-1 md:overflow-y-auto">
        {selectedProperty ? (
          <div className="p-4 max-w-2xl mx-auto bg-white border border-gray-200 rounded-lg shadow-lg">
            <h1 className="text-3xl font-extrabold mb-6 text-gray-900">
              Property Details
            </h1>
            <img
              src={selectedProperty.image}
              alt={selectedProperty.title}
              className="w-full h-64 object-cover rounded-lg mb-6"
            />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {selectedProperty.title}
            </h2>
            <p className="text-gray-700 mb-4">
              {selectedProperty.description}
            </p>
            <p className="text-gray-900 font-semibold text-lg mb-2">
              ${selectedProperty.price} / night
            </p>
            <p className="text-gray-600 mb-2">
              Location:{" "}
              <span className="font-medium">{selectedProperty.location}</span>
            </p>
            <p className="text-gray-600 mb-2">
              Bedrooms:{" "}
              <span className="font-medium">{selectedProperty.bedrooms}</span>
            </p>
            <p className="text-gray-600 mb-4">
              Amenities:{" "}
              <span className="font-medium">
                {selectedProperty.amenities.join(", ")}
              </span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                className="bg-green-500 text-white px-6 py-3 rounded-lg shadow hover:bg-green-600 transition duration-300"
                onClick={() => {
                  handleBookNow(selectedProperty);
                  setSelectedProperty(null);
                }}
              >
                Book Now
              </button>
              <button
                className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-600 transition duration-300"
                onClick={() => setSelectedProperty(null)}
              >
                Back to Properties
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            <h1 className="text-2xl font-bold mb-4">Available Properties</h1>
            {notification && (
              <div className="bg-green-500 text-white p-2 rounded mb-4">
                {notification}
              </div>
            )}
            <div className="flex-1 overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {loading ? (
                  Array.from({ length: 6 }).map((_, index) => (
                    <div
                      key={index}
                      className="bg-white border border-gray-200 p-4 rounded-lg shadow-lg shimmer"
                    >
                      <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
                      <div className="h-6 bg-gray-200 rounded mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded mb-4"></div>
                      <div className="h-6 bg-gray-200 rounded"></div>
                    </div>
                  ))
                ) : filteredProperties.length > 0 ? (
                  filteredProperties.map((property) => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                      onBookNow={handleBookNow}
                      onViewDetails={handleViewDetails}
                    />
                  ))
                ) : (
                  <p>No properties match the filters.</p>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
