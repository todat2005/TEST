import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import LoadingSpinner from "../components/LoadingSpinner";

function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("ticketSales");
  const [isMobile, setIsMobile] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Lấy ngôn ngữ từ localStorage
  const language = localStorage.getItem("language") || "en";

  // Dữ liệu đa ngôn ngữ
  const translations = {
    en: {
      title: "All Movies",
      subtitle: "Browse our complete movie collection",
      searchPlaceholder: "Search movies...",
      sortBy: "Sort by:",
      ticketSales: "Ticket Sales",
      rating: "Rating",
      name: "Name",
      latest: "Latest",
      categories: "Categories",
      all: "All",
      action: "Action",
      comedy: "Comedy",
      drama: "Drama",
      animation: "Animation",
      horror: "Horror",
      sciFi: "Sci-Fi",
      thriller: "Thriller",
      duration: "Duration",
      minutes: "min",
      director: "Director",
      cast: "Cast",
      synopsis: "Synopsis",
      bookTicket: "Book Ticket",
      watchTrailer: "Watch Trailer",
      showtimes: "Showtimes",
      releaseDate: "Release Date",
      loading: "Loading movies...",
      noMovies: "No movies found",
      theaters: "Theaters",
      nowShowing: "Now Showing",
      comingSoon: "Coming Soon",
      filterBy: "Filter by",
      clearFilters: "Clear Filters",
      advancedFilters: "Format",
      imax: "IMAX",
      threeD: "3D",
      fourDx: "4DX",
      applyFilters: "Apply Filters",
      resetFilters: "Reset",
      ticketsSold: "Tickets Sold",
      trendingNow: "Trending Now",
      topMovies: "Top Movies This Week",
      hotMovie: "HOT",
      newMovie: "NEW",
      bestSeller: "BEST SELLER",
      showMoreFilters: "More Filters",
      showLessFilters: "Less Filters",
      viewDetails: "View Details",
      quickBook: "Quick Book",
      gridView: "Grid",
      listView: "List",
      resultsFound: "movies found",
      movie: "movie",
      movies: "movies",
    },
    vi: {
      title: "Tất cả phim",
      subtitle: "Khám phá bộ sưu tập phim đầy đủ",
      searchPlaceholder: "Tìm kiếm phim...",
      sortBy: "Sắp xếp theo:",
      ticketSales: "Vé bán được",
      rating: "Đánh giá",
      name: "Tên",
      latest: "Mới nhất",
      categories: "Thể loại",
      all: "Tất cả",
      action: "Hành động",
      comedy: "Hài",
      drama: "Tâm lý",
      animation: "Hoạt hình",
      horror: "Kinh dị",
      sciFi: "Khoa học viễn tưởng",
      thriller: "Giật gân",
      duration: "Thời lượng",
      minutes: "phút",
      director: "Đạo diễn",
      cast: "Diễn viên",
      synopsis: "Nội dung",
      bookTicket: "Đặt vé",
      watchTrailer: "Xem trailer",
      showtimes: "Lịch chiếu",
      releaseDate: "Ngày chiếu",
      loading: "Đang tải phim...",
      noMovies: "Không tìm thấy phim",
      theaters: "Rạp",
      nowShowing: "Đang chiếu",
      comingSoon: "Sắp chiếu",
      filterBy: "Lọc theo",
      clearFilters: "Xóa bộ lọc",
      advancedFilters: "Định dạng",
      imax: "IMAX",
      threeD: "3D",
      fourDx: "4DX",
      applyFilters: "Áp dụng bộ lọc",
      resetFilters: "Đặt lại",
      ticketsSold: "Vé đã bán",
      trendingNow: "Đang hot",
      topMovies: "Phim bán chạy tuần này",
      hotMovie: "HOT",
      newMovie: "MỚI",
      bestSeller: "BÁN CHẠY",
      showMoreFilters: "Thêm bộ lọc",
      showLessFilters: "Ẩn bộ lọc",
      viewDetails: "Chi tiết",
      quickBook: "Đặt nhanh",
      gridView: "Lưới",
      listView: "Danh sách",
      resultsFound: "phim được tìm thấy",
      movie: "phim",
      movies: "phim",
    },
  };

  const t = translations[language];

  const categories = [
    { id: "all", label: t.all },
    { id: "action", label: t.action },
    { id: "comedy", label: t.comedy },
    { id: "drama", label: t.drama },
    { id: "animation", label: t.animation },
    { id: "horror", label: t.horror },
    { id: "sci-fi", label: t.sciFi },
    { id: "thriller", label: t.thriller },
  ];

  // Advanced filters state
  const [advancedFilters, setAdvancedFilters] = useState({
    formats: [],
  });

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
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const mockMovies = [
          {
            id: 1,
            title: language === "vi" ? "Dune: Hành tinh cát" : "Dune: Part Two",
            poster:
              "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop",
            rating: 8.8,
            duration: 166,
            genre: ["sci-fi", "action", "drama"],
            director: "Denis Villeneuve",
            cast: "Timothée Chalamet, Zendaya, Rebecca Ferguson",
            synopsis:
              language === "vi"
                ? "Paul Atreides đoàn tụ với Chani và người Fremen trên hành trình trả thù những kẻ phản bội đã hủy hoại gia đình anh."
                : "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
            showtimes: ["14:00", "17:30", "20:45", "23:15"],
            theaters: 8,
            releaseDate: "2024-03-01",
            status: "nowShowing",
            formats: ["IMAX", "3D"],
            ticketSales: 12580,
            isTrending: true,
            rank: 1,
          },
          {
            id: 2,
            title:
              language === "vi" ? "Gia Đình Siêu Nhân 3" : "The Incredibles 3",
            poster:
              "https://genk.mediacdn.vn/2018/6/26/2-1530007228364783072192.jpg",
            rating: 7.2,
            duration: 95,
            genre: ["animation", "family", "comedy"],
            director: "Brad Bird",
            cast: "Craig T. Nelson, Holly Hunter, Sarah Vowell",
            synopsis:
              language === "vi"
                ? "Gia đình siêu nhân trở lại với cuộc phiêu lưu mới đầy thử thách."
                : "The Incredibles family returns with new adventures and challenges.",
            showtimes: ["13:15", "16:00", "18:30", "21:00"],
            theaters: 12,
            releaseDate: "2024-12-20",
            status: "nowShowing",
            formats: ["3D"],
            ticketSales: 9820,
            isTrending: true,
            rank: 2,
          },
          {
            id: 3,
            title:
              language === "vi"
                ? "Người Nhện: Xa Nhà"
                : "Spider-Man: Far From Home",
            poster:
              "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=600&fit=crop",
            rating: 7.5,
            duration: 129,
            genre: ["action", "adventure", "sci-fi"],
            director: "Jon Watts",
            cast: "Tom Holland, Samuel L. Jackson, Zendaya",
            synopsis:
              language === "vi"
                ? "Peter Parker đi du lịch châu Âu với bạn bè, nhưng kế hoạch nghỉ ngơi của anh bị gián đoạn bởi những sinh vật nguyên tố."
                : "Peter Parker travels to Europe with his friends, but his vacation is interrupted by elemental creatures.",
            showtimes: ["14:30", "17:15", "20:00", "22:45"],
            theaters: 10,
            releaseDate: "2024-05-15",
            status: "nowShowing",
            formats: ["IMAX"],
            ticketSales: 7560,
            isTrending: true,
            rank: 3,
          },
          {
            id: 4,
            title: language === "vi" ? "Vùng Đất Quỷ Dữ" : "The Devil's Own",
            poster:
              "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=400&h=600&fit=crop",
            rating: 6.9,
            duration: 112,
            genre: ["horror", "thriller"],
            director: "James Wan",
            cast: "Patrick Wilson, Vera Farmiga, Ruairi O'Connor",
            synopsis:
              language === "vi"
                ? "Một gia đình chuyển đến ngôi nhà mới và phát hiện ra những bí mật đáng sợ về quá khứ của nó."
                : "A family moves into a new home and discovers terrifying secrets about its past.",
            showtimes: ["15:45", "19:00", "22:15"],
            theaters: 6,
            releaseDate: "2024-04-20",
            status: "nowShowing",
            formats: [],
            ticketSales: 4320,
          },
          {
            id: 5,
            title: language === "vi" ? "Biệt Đội Cảm Tử 3" : "Deadpool 3",
            poster:
              "https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=400&h=600&fit=crop",
            rating: null,
            duration: 138,
            genre: ["action", "comedy", "sci-fi"],
            director: "Shawn Levy",
            cast: "Ryan Reynolds, Hugh Jackman, Emma Corrin",
            synopsis:
              language === "vi"
                ? "Deadpool thay đổi dòng thời gian và tham gia MCU cùng Wolverine trong cuộc phiêu lưu đa vũ trụ."
                : "Deadpool changes the timeline and joins the MCU with Wolverine in a multiverse adventure.",
            releaseDate: "2025-01-15",
            theaters: 0,
            status: "comingSoon",
            formats: ["IMAX", "3D", "4DX"],
            ticketSales: 2100,
            isNew: true,
          },
          {
            id: 6,
            title: language === "vi" ? "Rồng Vàng 2025" : "Golden Dragon 2025",
            poster:
              "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop",
            rating: null,
            duration: 125,
            genre: ["action", "fantasy", "adventure"],
            director: "Vietnamese Director",
            cast: "Vietnamese Stars",
            synopsis:
              "Câu chuyện về Rồng Vàng - biểu tượng may mắn và sức mạnh trong năm mới 2025.",
            releaseDate: "2025-01-20",
            theaters: 0,
            status: "comingSoon",
            formats: ["3D"],
            ticketSales: 1800,
          },
          {
            id: 7,
            title: language === "vi" ? "Mùa Xuân Vĩnh Cửu" : "Eternal Spring",
            poster:
              "https://images.unsplash.com/photo-1489599809516-9827b6d1cf13?w=400&h=600&fit=crop",
            rating: null,
            duration: 102,
            genre: ["drama", "romance"],
            director: "Vietnamese Director",
            cast: "Vietnamese Actors",
            synopsis:
              "Tình yêu và hy vọng trong mùa xuân mới, bắt đầu từ những điều nhỏ bé.",
            releaseDate: "2025-01-25",
            theaters: 0,
            status: "comingSoon",
            formats: [],
            ticketSales: 950,
          },
          {
            id: 8,
            title:
              language === "vi"
                ? "Câu Chuyện Giao Thừa"
                : "New Year's Eve Tale",
            poster:
              "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=400&h=600&fit=crop",
            rating: null,
            duration: 118,
            genre: ["drama", "family"],
            director: "Vietnamese Director",
            cast: "Drama Cast",
            synopsis:
              "Những câu chuyện cảm động trong đêm giao thừa của nhiều gia đình khác nhau.",
            releaseDate: "2025-01-10",
            theaters: 0,
            status: "comingSoon",
            formats: [],
            ticketSales: 1200,
          },
        ];

        await new Promise((resolve) => setTimeout(resolve, 800));
        setMovies(mockMovies);
        setFilteredMovies(mockMovies);
      } catch (err) {
        console.error("Error fetching movies:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [language]);

  // Apply filters
  useEffect(() => {
    let result = [...movies];

    // Search filter
    if (searchTerm) {
      result = result.filter(
        (movie) =>
          movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          movie.director.toLowerCase().includes(searchTerm.toLowerCase()) ||
          movie.genre.some((g) =>
            g.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    // Category filter
    if (selectedCategory !== "all") {
      result = result.filter((movie) => movie.genre.includes(selectedCategory));
    }

    // Format filter
    if (advancedFilters.formats.length > 0) {
      result = result.filter((movie) =>
        advancedFilters.formats.every((format) =>
          movie.formats.includes(format)
        )
      );
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case "ticketSales":
          return b.ticketSales - a.ticketSales;
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        case "name":
          return a.title.localeCompare(b.title);
        case "latest":
          return new Date(b.releaseDate) - new Date(a.releaseDate);
        default:
          return b.ticketSales - a.ticketSales;
      }
    });

    // Add rank based on sorted order
    result = result.map((movie, index) => ({
      ...movie,
      rank: index + 1,
    }));

    setFilteredMovies(result);
  }, [searchTerm, selectedCategory, sortBy, advancedFilters, movies]);

  const handleFormatToggle = (format) => {
    setAdvancedFilters((prev) => ({
      ...prev,
      formats: prev.formats.includes(format)
        ? prev.formats.filter((f) => f !== format)
        : [...prev.formats, format],
    }));
  };

  const resetAdvancedFilters = () => {
    setAdvancedFilters({
      formats: [],
    });
  };

  const resetAllFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    resetAdvancedFilters();
    setShowAdvancedFilters(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === "vi" ? "vi-VN" : "en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatNumber = (num) => {
    return num.toLocaleString(language === "vi" ? "vi-VN" : "en-US");
  };

  const StarIcon = ({ className }) => (
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
        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
      />
    </svg>
  );

  const ClockIcon = ({ className }) => (
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
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );

  const TicketIcon = ({ className }) => (
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
        d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
      />
    </svg>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      <Navbar />

      <main className="flex-grow py-20 px-4 sm:px-6 lg:px-8 lg:py-30">
        <div className="container mx-auto px-3 sm:px-4">
          {/* Search and Filters */}
          <div className="mb-6 md:mb-8 bg-white rounded-xl shadow-lg p-4 md:p-6">
            {/* Search Bar and Sort - Mobile Stacked, Desktop Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {/* Search Bar */}
              <div className="md:col-span-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder={t.searchPlaceholder}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors text-sm md:text-base"
                  />
                  <svg
                    className="absolute left-4 top-3.5 h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>

              {/* Sort By */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <span className="font-medium text-gray-700 text-sm md:text-base">
                    {t.sortBy}
                  </span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors bg-white text-sm md:text-base"
                  >
                    <option value="ticketSales">{t.ticketSales}</option>
                    <option value="rating">{t.rating}</option>
                    <option value="name">{t.name}</option>
                    <option value="latest">{t.latest}</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Category Filters */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="font-medium text-gray-700 mb-4 text-sm md:text-base">
                {t.categories}:
              </h3>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-3 py-1.5 md:px-4 md:py-2 rounded-full font-medium transition-all text-sm md:text-base ${
                      selectedCategory === category.id
                        ? "bg-blue-600 text-white shadow-lg"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Advanced Filters Toggle - Mobile only */}
            {isMobile && (
              <div className="mt-4">
                <button
                  onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                  className="flex items-center justify-center w-full py-2 text-blue-600 hover:text-blue-800 font-medium"
                >
                  <svg
                    className={`h-5 w-5 mr-2 transition-transform ${
                      showAdvancedFilters ? "rotate-180" : ""
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
                  {showAdvancedFilters ? t.showLessFilters : t.showMoreFilters}
                </button>
              </div>
            )}

            {/* Format Filter - Always visible on desktop, toggle on mobile */}
            {(showAdvancedFilters || !isMobile) && (
              <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium text-gray-700 text-sm md:text-base">
                    {t.advancedFilters}:
                  </h3>
                  {advancedFilters.formats.length > 0 && (
                    <button
                      onClick={resetAdvancedFilters}
                      className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                    >
                      {t.resetFilters}
                    </button>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  {["IMAX", "3D", "4DX"].map((format) => (
                    <button
                      key={format}
                      onClick={() => handleFormatToggle(format)}
                      className={`px-3 py-1.5 md:px-4 md:py-2 rounded-full font-medium transition-colors text-sm md:text-base ${
                        advancedFilters.formats.includes(format)
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {t[format.toLowerCase()] || format}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Results Count and Filter Status */}
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <p className="text-gray-600 text-sm md:text-base">
                <span className="font-semibold">{filteredMovies.length}</span>{" "}
                {t.resultsFound}
                {(searchTerm ||
                  selectedCategory !== "all" ||
                  advancedFilters.formats.length > 0) && (
                  <button
                    onClick={resetAllFilters}
                    className="ml-3 text-blue-600 hover:text-blue-800 font-medium text-sm md:text-base"
                  >
                    {t.clearFilters}
                  </button>
                )}
              </p>

              {/* Active filters pills - Mobile */}
              {isMobile &&
                (searchTerm ||
                  selectedCategory !== "all" ||
                  advancedFilters.formats.length > 0) && (
                  <div className="flex flex-wrap gap-2">
                    {searchTerm && (
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                        {language === "vi" ? "Tìm: " : "Search: "}
                        {searchTerm}
                      </span>
                    )}
                    {selectedCategory !== "all" && (
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                        {
                          categories.find((c) => c.id === selectedCategory)
                            ?.label
                        }
                      </span>
                    )}
                    {advancedFilters.formats.map((format) => (
                      <span
                        key={format}
                        className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs"
                      >
                        {format}
                      </span>
                    ))}
                  </div>
                )}
            </div>
          </div>

          {/* Movies Grid */}
          {loading ? (
            <div className="py-12 md:py-20">
              <LoadingSpinner text={t.loading} />
            </div>
          ) : filteredMovies.length === 0 ? (
            <div className="text-center py-12 md:py-20 bg-white rounded-xl shadow-lg">
              <div className="text-gray-400 text-5xl md:text-6xl mb-4">🎥</div>
              <h3 className="text-xl md:text-2xl font-bold mb-2 text-gray-600">
                {t.noMovies}
              </h3>
              <p className="text-gray-500 mb-6 text-sm md:text-base">
                {language === "vi"
                  ? "Hãy thử tìm kiếm với từ khóa khác"
                  : "Try searching with different keywords"}
              </p>
              <button
                onClick={resetAllFilters}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm md:text-base"
              >
                {t.clearFilters}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
              {filteredMovies.map((movie) => (
                <div
                  key={movie.id}
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 group"
                >
                  {/* Movie Poster */}
                  <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />

                    {/* Status Badge */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-bold ${
                          movie.status === "nowShowing"
                            ? "bg-green-500 text-white"
                            : "bg-blue-500 text-white"
                        }`}
                      >
                        {movie.status === "nowShowing"
                          ? t.nowShowing
                          : t.comingSoon}
                      </span>

                      {/* Special Badges */}
                      {movie.isTrending && movie.rank <= 3 && (
                        <span className="px-2 py-1 bg-yellow-500 text-white rounded-full text-xs font-bold">
                          #{movie.rank} {t.trendingNow}
                        </span>
                      )}
                      {movie.isNew && (
                        <span className="px-2 py-1 bg-red-500 text-white rounded-full text-xs font-bold">
                          {t.newMovie}
                        </span>
                      )}
                    </div>

                    {/* Rating Badge */}
                    {movie.rating && (
                      <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm rounded-full px-2 py-1 flex items-center">
                        <StarIcon className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500 mr-1" />
                        <span className="font-bold text-white text-sm">
                          {movie.rating}
                        </span>
                      </div>
                    )}

                    {/* Format Badges */}
                    {movie.formats && movie.formats.length > 0 && (
                      <div className="absolute bottom-3 left-3 flex gap-1">
                        {movie.formats.map((format, index) => (
                          <span
                            key={index}
                            className="bg-blue-600/90 text-white px-1.5 py-1 rounded text-xs font-medium"
                          >
                            {format}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Ticket Sales - Mobile only */}
                    {isMobile && (
                      <div className="absolute bottom-3 right-3 bg-black/60 text-white px-2 py-1 rounded text-xs">
                        <TicketIcon className="h-3 w-3 inline mr-1" />
                        {formatNumber(movie.ticketSales)}
                      </div>
                    )}
                  </div>

                  {/* Movie Info */}
                  <div className="p-4 md:p-6">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 line-clamp-1">
                      {movie.title}
                    </h3>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 md:mb-4">
                      <div className="flex items-center text-gray-600 text-sm md:text-base">
                        <ClockIcon className="h-4 w-4 mr-1" />
                        <span>
                          {movie.duration} {t.minutes}
                        </span>
                      </div>

                      {/* Ticket Sales - Desktop only */}
                      {!isMobile && (
                        <div className="flex items-center text-gray-600">
                          <TicketIcon className="h-4 w-4 mr-1" />
                          <span className="text-sm font-medium">
                            {formatNumber(movie.ticketSales)}{" "}
                            {t.ticketsSold.toLowerCase()}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Genres - Hidden on small mobile, shown on tablet+ */}
                    <div className="hidden sm:flex flex-wrap gap-1 md:gap-2 mb-3 md:mb-4">
                      {movie.genre.slice(0, 2).map((genre, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs md:text-sm"
                        >
                          {genre.charAt(0).toUpperCase() + genre.slice(1)}
                        </span>
                      ))}
                      {movie.genre.length > 2 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs md:text-sm">
                          +{movie.genre.length - 2}
                        </span>
                      )}
                    </div>

                    {/* Release Date */}
                    <div className="mb-4 md:mb-6">
                      <p className="text-xs md:text-sm text-gray-500">
                        {t.releaseDate}:
                      </p>
                      <p className="text-gray-700 text-sm md:text-base">
                        {formatDate(movie.releaseDate)}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                      {movie.status === "nowShowing" ? (
                        <>
                          <Link
                            to={`/booking/${movie.id}`}
                            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2 md:py-3 px-4 rounded-lg text-center transition-colors text-sm md:text-base active:scale-95"
                          >
                            {isMobile ? t.quickBook : t.bookTicket}
                          </Link>
                          <Link
                            to={`/movies/${movie.id}`}
                            className="flex-1 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-2 md:py-3 px-4 rounded-lg text-center transition-colors text-sm md:text-base active:scale-95"
                          >
                            {isMobile ? t.viewDetails : t.watchTrailer}
                          </Link>
                        </>
                      ) : (
                        <Link
                          to={`/movies/${movie.id}`}
                          className="w-full py-2 md:py-3 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 rounded-lg font-semibold text-center transition-colors text-sm md:text-base active:scale-95"
                        >
                          {t.watchTrailer}
                        </Link>
                      )}
                    </div>

                    {/* Mobile-only quick info */}
                    <div className="sm:hidden mt-3 pt-3 border-t border-gray-100">
                      <div className="text-xs text-gray-500">
                        {movie.genre[0] && (
                          <span className="mr-3">
                            {movie.genre[0].charAt(0).toUpperCase() +
                              movie.genre[0].slice(1)}
                          </span>
                        )}
                        {movie.director && (
                          <span className="truncate block mt-1">
                            {movie.director}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Load More Button for pagination */}
          {filteredMovies.length > 0 && filteredMovies.length % 8 === 0 && (
            <div className="text-center mt-8 md:mt-12">
              <button className="px-8 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold transition-colors text-sm md:text-base">
                {language === "vi" ? "Tải thêm phim" : "Load More Movies"}
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default MoviesPage;
