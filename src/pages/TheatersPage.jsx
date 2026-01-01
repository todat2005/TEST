import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import LoadingSpinner from "../components/LoadingSpinner";

function TheatersPage() {
  const [theaters, setTheaters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState("all");
  const [isMobile, setIsMobile] = useState(false);
  const [expandedTheater, setExpandedTheater] = useState(null);

  // Lấy ngôn ngữ từ localStorage
  const language = localStorage.getItem("language") || "en";

  // Dữ liệu đa ngôn ngữ
  const translations = {
    en: {
      title: "Our Theaters",
      subtitle: "Find the perfect cinema experience near you",
      filterByCity: "Filter by City",
      allCities: "All Cities",
      viewShowtimes: "View Showtimes",
      contact: "Contact",
      hours: "Hours",
      loading: "Loading theaters...",
      noTheaters: "No theaters found",
      selectCity: "Select a city",
      findTheater: "Find a Theater",
      location: "Location",
      screens: "Screens",
      capacity: "Capacity",
      seats: "seats",
      openingHours: "Opening Hours",
      mondayToFriday: "Mon - Fri",
      saturday: "Saturday",
      sunday: "Sunday",
      holiday: "Holiday",
      directions: "Directions",
      phone: "Phone",
      email: "Email",
      bookNow: "Book Now",
      clearFilters: "Clear filters",
      theatersFound: "theaters found",
      address: "Address",
      city: "City",
      viewDetails: "View Details",
      hideDetails: "Hide Details",
      callNow: "Call Now",
      emailUs: "Email Us",
      theaterInfo: "Theater Information",
      quickActions: "Quick Actions",
    },
    vi: {
      title: "Hệ Thống Rạp",
      subtitle: "Tìm trải nghiệm điện ảnh hoàn hảo gần bạn",
      filterByCity: "Lọc theo thành phố",
      allCities: "Tất cả thành phố",
      viewShowtimes: "Xem lịch chiếu",
      contact: "Liên hệ",
      hours: "Giờ mở cửa",
      loading: "Đang tải rạp...",
      noTheaters: "Không tìm thấy rạp",
      selectCity: "Chọn thành phố",
      findTheater: "Tìm rạp",
      location: "Địa điểm",
      screens: "Phòng chiếu",
      capacity: "Sức chứa",
      seats: "ghế",
      openingHours: "Giờ mở cửa",
      mondayToFriday: "Thứ 2 - Thứ 6",
      saturday: "Thứ 7",
      sunday: "Chủ nhật",
      holiday: "Ngày lễ",
      directions: "Chỉ đường",
      phone: "Điện thoại",
      email: "Email",
      bookNow: "Đặt vé ngay",
      clearFilters: "Xóa bộ lọc",
      theatersFound: "rạp được tìm thấy",
      address: "Địa chỉ",
      city: "Thành phố",
      viewDetails: "Xem chi tiết",
      hideDetails: "Ẩn chi tiết",
      callNow: "Gọi ngay",
      emailUs: "Gửi email",
      theaterInfo: "Thông tin rạp",
      quickActions: "Thao tác nhanh",
    },
  };

  const t = translations[language];

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

  // Giả lập API call
  useEffect(() => {
    const fetchTheaters = async () => {
      setLoading(true);
      try {
        const mockTheaters = [
          {
            id: 1,
            name: "Cinema City Center",
            city: "Hanoi",
            address: "123 Trần Hưng Đạo, Hoàn Kiếm, Hà Nội",
            description:
              language === "vi"
                ? "Rạp chiếu phim cao cấp tại trung tâm thành phố với 12 phòng chiếu hiện đại"
                : "Premium cinema in city center with 12 modern screening rooms",
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
          },
          {
            id: 2,
            name: "Royal Cinema District 1",
            city: "Ho Chi Minh City",
            address: "456 Lê Lợi, Quận 1, TP.HCM",
            description:
              language === "vi"
                ? "Rạp chiếu phim sang trọng với công nghệ IMAX và 4DX tiên tiến"
                : "Luxury cinema with advanced IMAX and 4DX technology",
            screens: 10,
            capacity: 1200,
            openingHours: {
              weekday: "9:00 - 00:00",
              saturday: "9:00 - 01:00",
              sunday: "9:00 - 00:00",
              holiday: "9:00 - 01:00",
            },
            phone: "028 9876 5432",
            email: "hcm@cinema.com",
            coordinates: { lat: 10.7769, lng: 106.7009 },
          },
          {
            id: 3,
            name: "Ocean View Cinema",
            city: "Da Nang",
            address: "789 Bạch Đằng, Hải Châu, Đà Nẵng",
            description:
              language === "vi"
                ? "Rạp chiếu phim view biển với ghế nằm thoải mái và âm thanh Dolby Atmos"
                : "Ocean view cinema with comfortable recliner seats and Dolby Atmos sound",
            screens: 8,
            capacity: 800,
            openingHours: {
              weekday: "10:00 - 23:00",
              saturday: "10:00 - 00:00",
              sunday: "10:00 - 23:00",
              holiday: "10:00 - 00:00",
            },
            phone: "0236 2468 1357",
            email: "danang@cinema.com",
            coordinates: { lat: 16.0544, lng: 108.2022 },
          },
          {
            id: 4,
            name: "Mountain Peak Cinema",
            city: "Da Lat",
            address: "321 Hùng Vương, Đà Lạt, Lâm Đồng",
            description:
              language === "vi"
                ? "Rạp chiếu phim trên núi với view thành phố Đà Lạt, không gian ấm cúng"
                : "Mountain cinema with Da Lat city view, cozy atmosphere",
            screens: 6,
            capacity: 500,
            openingHours: {
              weekday: "9:00 - 22:00",
              saturday: "9:00 - 23:00",
              sunday: "9:00 - 22:00",
              holiday: "9:00 - 23:00",
            },
            phone: "0263 3698 1472",
            email: "dalat@cinema.com",
            coordinates: { lat: 11.9404, lng: 108.4587 },
          },
          {
            id: 5,
            name: "Harbor Cinema",
            city: "Hai Phong",
            address: "555 Lạch Tray, Ngô Quyền, Hải Phòng",
            description:
              language === "vi"
                ? "Rạp chiếu phim cảng biển với công nghệ 3D và phòng chiếu VIP"
                : "Harbor cinema with 3D technology and VIP screening rooms",
            screens: 7,
            capacity: 600,
            openingHours: {
              weekday: "9:30 - 22:30",
              saturday: "9:30 - 23:30",
              sunday: "9:30 - 22:30",
              holiday: "9:30 - 23:30",
            },
            phone: "0225 2580 3691",
            email: "haiphong@cinema.com",
            coordinates: { lat: 20.8449, lng: 106.6881 },
          },
          {
            id: 6,
            name: "River Side Cinema",
            city: "Can Tho",
            address: "888 Nguyễn Văn Cừ, Ninh Kiều, Cần Thơ",
            description:
              language === "vi"
                ? "Rạp chiếu phim bên sông với view cầu đi bộ và sông Hậu"
                : "Riverside cinema with walking bridge and Hau River view",
            screens: 5,
            capacity: 400,
            openingHours: {
              weekday: "10:00 - 22:00",
              saturday: "10:00 - 23:00",
              sunday: "10:00 - 22:00",
              holiday: "10:00 - 23:00",
            },
            phone: "0292 3819 4726",
            email: "cantho@cinema.com",
            coordinates: { lat: 10.0452, lng: 105.7469 },
          },
        ];

        await new Promise((resolve) => setTimeout(resolve, 800));
        setTheaters(mockTheaters);
      } catch (err) {
        console.error("Error fetching theaters:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTheaters();
  }, [language]);

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

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white text-gray-800">
      <Navbar />

      <main className="flex-grow py-20 px-4 sm:px-6 lg:px-8 lg:py-30">
        <div className="container mx-auto px-3 sm:px-4 ">
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
                        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1 md:mb-2">
                          {theater.name}
                        </h3>

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
                        <div className="flex gap-4 md:gap-6 mt-2 md:mt-3">
                          <div className="flex items-center">
                            <div className="text-sm md:text-base font-bold text-blue-600 mr-1 md:mr-2">
                              {theater.screens}
                            </div>
                            <div className="text-xs md:text-sm text-gray-600">
                              {t.screens}
                            </div>
                          </div>
                          <div className="flex items-center">
                            <div className="text-sm md:text-base font-bold text-gray-900 mr-1 md:mr-2">
                              {theater.capacity}
                            </div>
                            <div className="text-xs md:text-sm text-gray-600">
                              {t.seats}
                            </div>
                          </div>
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
                                  {theater.openingHours.weekday}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">
                                  {t.saturday}:
                                </span>
                                <span className="font-medium text-gray-900">
                                  {theater.openingHours.saturday}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">
                                  {t.sunday}:
                                </span>
                                <span className="font-medium text-gray-900">
                                  {theater.openingHours.sunday}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">
                                  {t.holiday}:
                                </span>
                                <span className="font-medium text-gray-900">
                                  {theater.openingHours.holiday}
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
                                  {theater.phone}
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