import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/common/NavBar";
import Footer from "../components/common/Footer";
import LoadingSpinner from "../components/common/LoadingSpinner";
import translationsTheaterPage from "../translations/TheaterPage.js";
import { API_URL } from "../config/config.js";

// Hàm debounce để tối ưu resize
const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};

function TheatersPage() {
  const [theaters, setTheaters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState("all");
  const [isMobile, setIsMobile] = useState(false);
  const [expandedTheater, setExpandedTheater] = useState(null);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const initialRender = useRef(true);

  // Lấy ngôn ngữ từ localStorage
  const language = useMemo(() => localStorage.getItem("language") || "vi", []);

  // Dữ liệu đa ngôn ngữ - memoized
  const t = useMemo(
    () =>
      language === "vi"
        ? translationsTheaterPage.vi
        : translationsTheaterPage.en,
    [language]
  );

  // Danh sách thành phố Việt Nam - memoized
  const vietnamCities = useMemo(
    () => [
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
    ],
    [language]
  );

  // Kiểm tra responsive với debounce
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();

    const debouncedResize = debounce(checkMobile, 250);
    window.addEventListener("resize", debouncedResize);

    return () => window.removeEventListener("resize", debouncedResize);
  }, []);

  // Hàm fetch theaters
  const fetchTheaters = useCallback(async () => {
    if (initialRender.current) {
      initialRender.current = false;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/theaters/all`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        setTheaters(data.theaters || []);
      } else {
        throw new Error(data.message || "Failed to fetch theaters");
      }
    } catch (err) {
      console.error("Error fetching theaters:", err);
      setError(err.message);

      // Không sử dụng fallback data, chỉ set empty array
      setTheaters([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Gọi API khi component mount hoặc retry
  useEffect(() => {
    fetchTheaters();
  }, [fetchTheaters, retryCount]);

  // Filter theaters với useMemo
  const filteredTheaters = useMemo(() => {
    if (selectedCity === "all") return theaters;

    return theaters.filter((theater) => theater.city === selectedCity);
  }, [theaters, selectedCity]);

  // Hàm toggle theater details
  const toggleTheaterDetails = useCallback((theaterId) => {
    setExpandedTheater((prev) => (prev === theaterId ? null : theaterId));
  }, []);

  // Hàm get status color và text
  const getStatusConfig = useCallback((status) => {
    const statusConfig = {
      active: {
        color: "bg-green-100 text-green-800",
        text: "active",
      },
      inactive: {
        color: "bg-red-100 text-red-800",
        text: "inactive",
      },
      renovating: {
        color: "bg-yellow-100 text-yellow-800",
        text: "renovating",
      },
      default: {
        color: "bg-gray-100 text-gray-800",
        text: "unknown",
      },
    };

    return statusConfig[status] || statusConfig.default;
  }, []);

  // Thống kê rạp
  const theaterStats = useMemo(() => {
    const totalTheaters = theaters.length;
    const totalCities = new Set(theaters.map((t) => t.city)).size;
    const totalScreens = theaters.reduce(
      (sum, theater) => sum + (theater.screens || 0),
      0
    );
    const totalCapacity = theaters.reduce(
      (sum, theater) => sum + (theater.capacity || 0),
      0
    );

    return { totalTheaters, totalCities, totalScreens, totalCapacity };
  }, [theaters]);

  // Clear filters
  const handleClearFilters = useCallback(() => {
    setSelectedCity("all");
  }, []);

  // Retry fetch
  const handleRetry = useCallback(() => {
    setRetryCount((prev) => prev + 1);
  }, []);

  // Nội dung loading/error/no data
  const renderContent = useMemo(() => {
    if (loading) {
      return (
        <div className="py-8 md:py-12">
          <LoadingSpinner text={t.loading} />
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center py-20">
          <div className="text-red-600 font-semibold mb-4">
            {t.errorLoading || "Có lỗi xảy ra khi tải dữ liệu"}
          </div>
          <button
            onClick={handleRetry}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {t.retry || "Thử lại"}
          </button>
        </div>
      );
    }

    if (filteredTheaters.length === 0) {
      // Nếu có lỗi nhưng không có theaters, đã xử lý ở trên
      // Nếu không có lỗi nhưng không có theaters (do filter hoặc API trả về rỗng)
      return (
        <div className="text-center py-8 md:py-12 bg-white rounded-lg shadow-md">
          <div className="text-gray-400 text-4xl md:text-5xl mb-3 md:mb-4">
            🎬
          </div>
          <h3 className="text-lg md:text-xl font-bold mb-2 text-gray-600">
            {t.noTheaters}
          </h3>
          <p className="text-gray-500 text-sm md:text-base px-4 mb-4">
            {language === "vi"
              ? "Hãy thử chọn thành phố khác"
              : "Try selecting a different city"}
          </p>
          {selectedCity !== "all" && (
            <button
              onClick={handleClearFilters}
              className="mt-4 px-4 md:px-6 py-2 md:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm md:text-base"
            >
              {t.clearFilters}
            </button>
          )}
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 gap-3 md:gap-4">
        {filteredTheaters.map((theater) => (
          <TheaterCard
            key={theater.id}
            theater={theater}
            t={t}
            language={language}
            isMobile={isMobile}
            expandedTheater={expandedTheater}
            toggleTheaterDetails={toggleTheaterDetails}
            getStatusConfig={getStatusConfig}
          />
        ))}
      </div>
    );
  }, [
    loading,
    error,
    filteredTheaters,
    t,
    language,
    selectedCity,
    isMobile,
    expandedTheater,
    toggleTheaterDetails,
    getStatusConfig,
    handleRetry,
    handleClearFilters,
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white text-gray-800">
      <Navbar />

      <main className="flex-grow py-20 px-4 sm:px-6 lg:px-8 lg:py-30">
        <div className="container mx-auto px-3 sm:px-4">
          {/* Header */}
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {t.title}
            </h1>
            <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
              {t.subtitle}
            </p>
          </div>

          {/* Stats Cards - Chỉ hiển thị khi có dữ liệu và không có lỗi */}
          {!loading && !error && theaters.length > 0 && (
            <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <div className="text-sm text-blue-600 font-medium">
                  {language === "vi" ? "TỔNG RẠP" : "TOTAL THEATERS"}
                </div>
                <div className="text-2xl font-bold text-blue-800">
                  {theaterStats.totalTheaters}
                </div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                <div className="text-sm text-green-600 font-medium">
                  {language === "vi" ? "THÀNH PHỐ" : "CITIES"}
                </div>
                <div className="text-2xl font-bold text-green-800">
                  {theaterStats.totalCities}
                </div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                <div className="text-sm text-purple-600 font-medium">
                  {language === "vi" ? "MÀN HÌNH" : "SCREENS"}
                </div>
                <div className="text-2xl font-bold text-purple-800">
                  {theaterStats.totalScreens}
                </div>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
                <div className="text-sm text-orange-600 font-medium">
                  {language === "vi" ? "GHẾ NGỒI" : "SEATS"}
                </div>
                <div className="text-2xl font-bold text-orange-800">
                  {theaterStats.totalCapacity.toLocaleString()}
                </div>
              </div>
            </div>
          )}

          {/* Filter Section - Chỉ hiển thị khi không có lỗi hoặc đang loading */}
          {(!error || loading) && (
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
                      className="w-full px-3 md:px-4 py-2 md:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-sm md:text-base appearance-none bg-white cursor-pointer"
                      aria-label={t.filterByCity}
                      disabled={loading}
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
                {!loading && (
                  <div className="flex items-center justify-between md:justify-end gap-3 md:gap-4 mt-2 md:mt-0">
                    <div className="text-xs md:text-sm text-gray-600 font-medium">
                      <span className="text-blue-600 font-bold">
                        {filteredTheaters.length}
                      </span>{" "}
                      {t.theatersFound}
                    </div>
                    {selectedCity !== "all" && (
                      <button
                        onClick={handleClearFilters}
                        className="text-xs md:text-sm text-blue-600 hover:text-blue-800 font-medium px-2 py-1 hover:bg-blue-50 rounded transition-colors"
                      >
                        {t.clearFilters}
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Content */}
          {renderContent}
        </div>
      </main>

      <Footer />
    </div>
  );
}

// Các component con giữ nguyên như trước
const TheaterCard = React.memo(
  ({
    theater,
    t,
    language,
    isMobile,
    expandedTheater,
    toggleTheaterDetails,
    getStatusConfig,
  }) => {
    const statusConfig = getStatusConfig(theater.status);
    const isExpanded = expandedTheater === theater.id;

    return (
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 overflow-hidden">
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
                    className={`px-2 py-1 rounded-full text-xs font-medium ${statusConfig.color}`}
                  >
                    {t[statusConfig.text] || statusConfig.text}
                  </span>
                )}
              </div>

              {/* Address */}
              <div className="flex items-start text-gray-600 mb-1">
                <LocationIcon className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-xs md:text-sm block">
                    {theater.address}
                  </span>
                  <div className="flex items-center text-blue-600 font-medium text-xs md:text-sm mt-1">
                    <BuildingIcon className="w-4 h-4 mr-1" />
                    <span>{theater.city}</span>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <TheaterStats theater={theater} t={t} />
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
                  {isExpanded ? t.hideDetails : t.viewDetails}
                </button>
              </div>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-600 text-xs md:text-sm mb-3 md:mb-4 line-clamp-2 md:line-clamp-none">
            {theater.description}
          </p>

          {/* Expand/Collapse Toggle - Mobile Only */}
          {isMobile && (
            <button
              onClick={() => toggleTheaterDetails(theater.id)}
              className="w-full flex items-center justify-center py-2 text-blue-600 hover:text-blue-800 font-medium text-sm"
            >
              {isExpanded ? t.hideDetails : t.viewDetails}
              <ChevronIcon isExpanded={isExpanded} className="h-4 w-4 ml-1" />
            </button>
          )}

          {/* Expanded Details */}
          {(isExpanded || !isMobile) && (
            <TheaterDetails
              theater={theater}
              t={t}
              language={language}
              isMobile={isMobile}
            />
          )}
        </div>
      </div>
    );
  }
);

// Component con cho stats
const TheaterStats = React.memo(({ theater, t }) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mt-2 md:mt-3">
    <StatCard value={theater.screens} label={t.screens} color="blue" />
    <StatCard
      value={theater.capacity?.toLocaleString() || "0"}
      label={t.seats}
      color="gray"
    />
    {theater.stats && (
      <>
        <StatCard
          value={theater.stats.showsToday || 0}
          label={t.showsToday}
          color="green"
        />
        <StatCard
          value={theater.stats.moviesShowing || 0}
          label={t.moviesShowing}
          color="purple"
        />
      </>
    )}
  </div>
));

// Component con cho stat card
const StatCard = React.memo(({ value, label, color }) => {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600",
    gray: "bg-gray-50 text-gray-900",
    green: "bg-green-50 text-green-600",
    purple: "bg-purple-50 text-purple-600",
    orange: "bg-orange-50 text-orange-600",
  };

  return (
    <div className={`${colorClasses[color]} p-2 md:p-3 rounded-lg`}>
      <div className="text-sm md:text-base font-bold text-center">{value}</div>
      <div className="text-xs md:text-sm text-gray-600 text-center">
        {label}
      </div>
    </div>
  );
});

// Component con cho chi tiết rạp
const TheaterDetails = React.memo(({ theater, t, language, isMobile }) => (
  <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-gray-200">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
      {/* Opening Hours */}
      <OpeningHours theater={theater} t={t} />

      {/* Contact Info */}
      <ContactInfo theater={theater} t={t} />
    </div>

    {/* Action Buttons */}
    <TheaterActions theater={theater} t={t} isMobile={isMobile} />
  </div>
));

// Component con cho giờ mở cửa
const OpeningHours = React.memo(({ theater, t }) => (
  <div>
    <h4 className="font-semibold text-gray-700 text-sm mb-2 md:mb-3">
      {t.openingHours}:
    </h4>
    <div className="space-y-1 md:space-y-2 text-xs md:text-sm">
      <TimeRow
        label={t.mondayToFriday}
        time={theater.openingHours?.weekday || "08:00 - 23:00"}
      />
      <TimeRow
        label={t.saturday}
        time={theater.openingHours?.saturday || "08:00 - 00:00"}
      />
      <TimeRow
        label={t.sunday}
        time={theater.openingHours?.sunday || "08:00 - 23:00"}
      />
      <TimeRow
        label={t.holiday}
        time={theater.openingHours?.holiday || "08:00 - 00:00"}
      />
    </div>
  </div>
));

// Component con cho thời gian
const TimeRow = React.memo(({ label, time }) => (
  <div className="flex justify-between">
    <span className="text-gray-600">{label}:</span>
    <span className="font-medium text-gray-900">{time}</span>
  </div>
));

// Component con cho thông tin liên hệ
const ContactInfo = React.memo(({ theater, t }) => (
  <div>
    <h4 className="font-semibold text-gray-700 text-sm mb-2 md:mb-3">
      {t.contact}:
    </h4>
    <div className="space-y-2 md:space-y-3 text-xs md:text-sm">
      <ContactItem
        icon={<PhoneIcon />}
        content={
          <a
            href={`tel:${theater.phone}`}
            className="text-blue-600 hover:text-blue-800 hover:underline"
          >
            {theater.phone || "1800 1234"}
          </a>
        }
      />
      <ContactItem
        icon={<EmailIcon />}
        content={
          <a
            href={`mailto:${theater.email}`}
            className="text-blue-600 hover:text-blue-800 hover:underline break-all"
          >
            {theater.email}
          </a>
        }
      />
    </div>
  </div>
));

// Component con cho item liên hệ
const ContactItem = React.memo(({ icon, content }) => (
  <div className="flex items-center">
    <div className="w-4 h-4 mr-2 md:mr-3 text-gray-500 flex-shrink-0">
      {icon}
    </div>
    {content}
  </div>
));

// Component con cho hành động
const TheaterActions = React.memo(({ theater, t, isMobile }) => (
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
        <MapIcon className="w-4 h-4 mr-1" />
        {t.directions}
      </a>
    </div>
  </div>
));

// Icons components để tái sử dụng
const LocationIcon = ({ className }) => (
  <svg
    className={className}
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
);

const BuildingIcon = ({ className }) => (
  <svg
    className={className}
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
);

const ChevronIcon = ({ isExpanded, className }) => (
  <svg
    className={`${className} transition-transform ${
      isExpanded ? "rotate-180" : ""
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
);

const PhoneIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    />
  </svg>
);

const EmailIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);

const MapIcon = ({ className }) => (
  <svg
    className={className}
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
);

export default TheatersPage;
