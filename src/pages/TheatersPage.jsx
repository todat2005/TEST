import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/common/NavBar";
import Footer from "../components/common/Footer";
import LoadingSpinner from "../components/common/LoadingSpinner";
import translationsTheaterPage from "../translations/TheaterPage.js";
import { API_URL } from "../config/config.js";
function TheatersPage() {
  const [theaters, setTheaters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState("all");
  const [isMobile, setIsMobile] = useState(false);
  const [expandedTheater, setExpandedTheater] = useState(null);
  const [error, setError] = useState(null);

  // Lấy ngôn ngữ từ localStorage
  const language = localStorage.getItem("language") || "vi";

  // Dữ liệu đa ngôn ngữ
  const t =
    language === "vi" ? translationsTheaterPage.vi : translationsTheaterPage.en;
  const vietnamCities = [
    {
      value: "all",
      label: language === "vi" ? "Tất cả tỉnh/thành" : "All Cities",
    },
    { value: "Hanoi", label: "Hà Nội" },
    { value: "Ho Chi Minh City", label: "TP Hồ Chí Minh" },
    { value: "Da Nang", label: "Đà Nẵng" },
    { value: "Hai Phong", label: "Hải Phòng" },
    { value: "Can Tho", label: "Cần Thơ" },
    { value: "Da Lat", label: "Đà Lạt" },
  ];

  // Kiểm tra responsive
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Gọi API thật
  useEffect(() => {
    fetchTheaters();
  }, []);
  const fetchTheaters = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/theaters/all`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        setTheaters(data.theaters);
      } else {
        throw new Error(data.message || "Failed to fetch theaters");
      }
    } catch (err) {
      console.error("Error fetching theaters:", err);
      setError(err.message);
      // Fallback data nếu API fail
      setTheaters(getFallbackTheaters());
    } finally {
      setLoading(false);
    }
  };

  // Fallback data cho demo
  const getFallbackTheaters = () => {
    return [
      {
        id: "RAP00001",
        name: "CGV Vincom Center Bà Triệu",
        city: "Hanoi",
        address: "191 Bà Triệu, Hai Bà Trưng, Hà Nội",
        description:
          "Premium cinema in city center with modern screening rooms",
        screens: 12,
        capacity: 1500,
        openingHours: {
          weekday: "8:00 - 23:00",
          saturday: "8:00 - 00:00",
          sunday: "8:00 - 23:00",
          holiday: "8:00 - 00:00",
        },
        phone: "024 1234 5678",
        email: "hanoi@cinema.com",
        coordinates: { lat: 21.0285, lng: 105.8542 },
        stats: {
          showsToday: 15,
          moviesShowing: 8,
          totalSeats: 1500,
          totalRooms: 12,
        },
      },
      // ... thêm các rạp khác
    ];
  };

  // Filter theaters
  const filteredTheaters = theaters.filter((theater) => {
    if (selectedCity !== "all" && theater.city !== selectedCity) {
      return false;
    }
    return true;
  });

  const toggleTheaterDetails = (theaterId) => {
    if (expandedTheater === theaterId) {
      setExpandedTheater(null);
    } else {
      setExpandedTheater(theaterId);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      case "renovating":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status) => {
    return t[status] || status;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white text-gray-800">
      <Navbar />

      <main className="flex-grow py-20 px-4 sm:px-6 lg:px-8 lg:py-30">
        <div className="container mx-auto px-3 sm:px-4 ">
          {/* Header */}
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {t.title}
            </h1>
            <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
              {t.subtitle}
            </p>
          </div>

          {/* Filter Section */}
          <div className="mb-4 md:mb-6 bg-white rounded-lg shadow-md p-3 md:p-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-4">
              <div className="flex-1">
                <h3 className="text-xs md:text-sm font-semibold text-gray-700 mb-1 md:mb-2">
                  {t.filterByCity}:
                </h3>
                <div className="relative">
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full px-3 md:px-4 py-2 md:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-sm md:text-base appearance-none bg-white"
                  >
                    {vietnamCities.map((city) => (
                      <option key={city.value} value={city.value}>
                        {city.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Results Count and Clear Filter */}
              <div className="flex items-center justify-between md:justify-end gap-3 md:gap-4 mt-2 md:mt-0">
                <div className="text-xs md:text-sm text-gray-600 font-medium">
                  <span className="text-blue-600 font-bold">
                    {filteredTheaters.length}
                  </span>{" "}
                  {t.theatersFound}
                </div>
                {selectedCity !== "all" && (
                  <button
                    onClick={() => setSelectedCity("all")}
                    className="text-xs md:text-sm text-blue-600 hover:text-blue-800 font-medium px-2 py-1 hover:bg-blue-50 rounded transition-colors"
                  >
                    {t.clearFilters}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <svg
                    className="h-5 w-5 text-red-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.346 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                  <span className="text-red-700 text-sm md:text-base">
                    {t.error}
                  </span>
                </div>
                <button
                  onClick={fetchTheaters}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  {t.retry}
                </button>
              </div>
            </div>
          )}

          {/* Theaters List */}
          {loading ? (
            <div className="py-8 md:py-12">
              <LoadingSpinner text={t.loading} />
            </div>
          ) : filteredTheaters.length === 0 ? (
            <div className="text-center py-8 md:py-12 bg-white rounded-lg shadow-md">
              <div className="text-gray-400 text-4xl md:text-5xl mb-3 md:mb-4">
                🎬
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-2 text-gray-600">
                {t.noTheaters}
              </h3>
              <p className="text-gray-500 text-sm md:text-base px-4">
                {language === "vi"
                  ? "Hãy thử chọn thành phố khác"
                  : "Try selecting a different city"}
              </p>
              <button
                onClick={() => setSelectedCity("all")}
                className="mt-4 px-4 md:px-6 py-2 md:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm md:text-base"
              >
                {t.clearFilters}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3 md:gap-4">
              {filteredTheaters.map((theater) => (
                <div
                  key={theater.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 overflow-hidden"
                >
                  {/* Theater Header - Compact on Mobile */}
                  <div className="p-3 md:p-5">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-4 mb-3 md:mb-4">
                      {/* Theater Info */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-1 md:mb-2">
                          <h3 className="text-lg md:text-xl font-bold text-gray-900">
                            {theater.name}
                          </h3>
                          {theater.status && (
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                theater.status
                              )}`}
                            >
                              {getStatusText(theater.status)}
                            </span>
                          )}
                        </div>

                        {/* Address - Compact on Mobile */}
                        <div className="flex items-start text-gray-600 mb-1">
                          <svg
                            className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          <div>
                            <span className="text-xs md:text-sm block">
                              {theater.address}
                            </span>
                            <div className="flex items-center text-blue-600 font-medium text-xs md:text-sm mt-1">
                              <svg
                                className="w-4 h-4 mr-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                />
                              </svg>
                              <span>{theater.city}</span>
                            </div>
                          </div>
                        </div>

                        {/* Stats - Row on Mobile, Separate on Desktop */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mt-2 md:mt-3">
                          <div className="bg-blue-50 p-2 md:p-3 rounded-lg">
                            <div className="text-sm md:text-base font-bold text-blue-600 text-center">
                              {theater.screens}
                            </div>
                            <div className="text-xs md:text-sm text-gray-600 text-center">
                              {t.screens}
                            </div>
                          </div>
                          <div className="bg-gray-50 p-2 md:p-3 rounded-lg">
                            <div className="text-sm md:text-base font-bold text-gray-900 text-center">
                              {theater.capacity.toLocaleString()}
                            </div>
                            <div className="text-xs md:text-sm text-gray-600 text-center">
                              {t.seats}
                            </div>
                          </div>
                          {theater.stats && (
                            <>
                              <div className="bg-green-50 p-2 md:p-3 rounded-lg">
                                <div className="text-sm md:text-base font-bold text-green-600 text-center">
                                  {theater.stats.showsToday || 0}
                                </div>
                                <div className="text-xs md:text-sm text-gray-600 text-center">
                                  {t.showsToday}
                                </div>
                              </div>
                              <div className="bg-purple-50 p-2 md:p-3 rounded-lg">
                                <div className="text-sm md:text-base font-bold text-purple-600 text-center">
                                  {theater.stats.moviesShowing || 0}
                                </div>
                                <div className="text-xs md:text-sm text-gray-600 text-center">
                                  {t.moviesShowing}
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Action Button - Desktop only */}
                      {!isMobile && (
                        <div className="flex flex-col gap-2">
                          <Link
                            to={`/theater/${theater.id}/showtimes`}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-3 md:px-4 rounded-lg text-center text-sm transition-colors whitespace-nowrap"
                          >
                            {t.viewShowtimes}
                          </Link>
                          <button
                            onClick={() => toggleTheaterDetails(theater.id)}
                            className="border border-gray-300 hover:border-blue-600 hover:text-blue-600 py-2 px-3 md:px-4 rounded-lg text-center text-sm transition-colors whitespace-nowrap"
                          >
                            {expandedTheater === theater.id
                              ? t.hideDetails
                              : t.viewDetails}
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Description - Truncated on Mobile */}
                    <p className="text-gray-600 text-xs md:text-sm mb-3 md:mb-4 line-clamp-2 md:line-clamp-none">
                      {theater.description}
                    </p>

                    {/* Expand/Collapse Toggle - Mobile Only */}
                    {isMobile && (
                      <button
                        onClick={() => toggleTheaterDetails(theater.id)}
                        className="w-full flex items-center justify-center py-2 text-blue-600 hover:text-blue-800 font-medium text-sm"
                      >
                        {expandedTheater === theater.id
                          ? t.hideDetails
                          : t.viewDetails}
                        <svg
                          className={`h-4 w-4 ml-1 transition-transform ${
                            expandedTheater === theater.id ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                    )}

                    {/* Expanded Details */}
                    {(expandedTheater === theater.id || !isMobile) && (
                      <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-gray-200">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                          {/* Opening Hours */}
                          <div>
                            <h4 className="font-semibold text-gray-700 text-sm mb-2 md:mb-3">
                              {t.openingHours}:
                            </h4>
                            <div className="space-y-1 md:space-y-2 text-xs md:text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-600">
                                  {t.mondayToFriday}:
                                </span>
                                <span className="font-medium text-gray-900">
                                  {theater.openingHours?.weekday ||
                                    "08:00 - 23:00"}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">
                                  {t.saturday}:
                                </span>
                                <span className="font-medium text-gray-900">
                                  {theater.openingHours?.saturday ||
                                    "08:00 - 00:00"}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">
                                  {t.sunday}:
                                </span>
                                <span className="font-medium text-gray-900">
                                  {theater.openingHours?.sunday ||
                                    "08:00 - 23:00"}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">
                                  {t.holiday}:
                                </span>
                                <span className="font-medium text-gray-900">
                                  {theater.openingHours?.holiday ||
                                    "08:00 - 00:00"}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Contact Info */}
                          <div>
                            <h4 className="font-semibold text-gray-700 text-sm mb-2 md:mb-3">
                              {t.contact}:
                            </h4>
                            <div className="space-y-2 md:space-y-3 text-xs md:text-sm">
                              <div className="flex items-center">
                                <svg
                                  className="w-4 h-4 mr-2 md:mr-3 text-gray-500 flex-shrink-0"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                  />
                                </svg>
                                <a
                                  href={`tel:${theater.phone}`}
                                  className="text-blue-600 hover:text-blue-800 hover:underline"
                                >
                                  {theater.phone || "1800 1234"}
                                </a>
                              </div>
                              <div className="flex items-center">
                                <svg
                                  className="w-4 h-4 mr-2 md:mr-3 text-gray-500 flex-shrink-0"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                  />
                                </svg>
                                <a
                                  href={`mailto:${theater.email}`}
                                  className="text-blue-600 hover:text-blue-800 hover:underline break-all"
                                >
                                  {theater.email}
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-4 md:mt-6 pt-4 border-t border-gray-200">
                          <h4 className="font-semibold text-gray-700 text-sm mb-2 md:mb-3">
                            {t.quickActions}:
                          </h4>
                          <div className="grid grid-cols-2 md:flex md:flex-wrap gap-2">
                            {isMobile && (
                              <Link
                                to={`/theater/${theater.id}/showtimes`}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-3 rounded-lg text-center text-sm transition-colors"
                              >
                                {t.viewShowtimes}
                              </Link>
                            )}
                            <Link
                              to={`/booking?theater=${theater.id}`}
                              className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-3 rounded-lg text-center text-sm transition-colors"
                            >
                              {t.bookNow}
                            </Link>
                            <a
                              href={`https://maps.google.com/?q=${encodeURIComponent(
                                theater.address
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="border border-gray-300 hover:border-blue-600 hover:text-blue-600 py-2 px-3 rounded-lg text-center text-sm transition-colors flex items-center justify-center"
                            >
                              <svg
                                className="w-4 h-4 mr-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 13V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                                />
                              </svg>
                              {t.directions}
                            </a>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default TheatersPage;
