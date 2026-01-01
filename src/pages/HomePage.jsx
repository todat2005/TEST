import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import HeroCarousel from "../components/home/HeroCarousel";
import MovieSection from "../components/home/MovieSection";
import CategoryFilter from "../components/home/CategoryFilter";
import LoadingSpinner from "../components/LoadingSpinner";

function HomePage() {
  const [nowShowing, setNowShowing] = useState([]);
  const [comingSoon, setComingSoon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Lấy ngôn ngữ từ localStorage
  const language = localStorage.getItem("language") || "en";

  // Dữ liệu đa ngôn ngữ
  const translations = {
    en: {
      heroTitle: "Experience Cinema Like Never Before",
      heroSubtitle: "Book tickets for the latest movies in premium theaters",
      ctaButton: "Book Now",
      nowShowing: "Now Showing",
      comingSoon: "Coming Soon",
      viewAll: "View All",
      showtimes: "Showtimes",
      duration: "Duration",
      minutes: "min",
      rating: "Rating",
      bookTicket: "Book Ticket",
      watchTrailer: "Watch Trailer",
      noMovies: "No movies available",
      loading: "Loading movies...",
      today: "Today",
      thisWeek: "This Week",
      theaters: "Theaters",
      premiumExperience: "Premium Experience",
      imaxExperience: "IMAX Experience",
      premiumSound: "Dolby Atmos Sound",
      comfortableSeats: "Luxury Seats",
      getTickets: "Get Tickets",
      exploreMovies: "Explore Movies",
      specialOffers: "Special Offers",
      studentDiscount: "Student Discount",
      familyPackage: "Family Package",
      morningSpecial: "Morning Special",
    },
    vi: {
      heroTitle: "Trải nghiệm điện ảnh đỉnh cao",
      heroSubtitle:
        "Đặt vé cho những bộ phim mới nhất tại rạp chiếu phim cao cấp",
      ctaButton: "Đặt Vé Ngay",
      nowShowing: "Đang Chiếu",
      comingSoon: "Sắp Chiếu",
      viewAll: "Xem tất cả",
      showtimes: "Lịch chiếu",
      duration: "Thời lượng",
      minutes: "phút",
      rating: "Đánh giá",
      bookTicket: "Đặt vé",
      watchTrailer: "Xem trailer",
      noMovies: "Không có phim",
      loading: "Đang tải phim...",
      today: "Hôm nay",
      thisWeek: "Tuần này",
      theaters: "Rạp",
      premiumExperience: "Trải nghiệm cao cấp",
      imaxExperience: "IMAX Experience",
      premiumSound: "Âm thanh Dolby Atmos",
      comfortableSeats: "Ghế cao cấp",
      getTickets: "Mua Vé",
      exploreMovies: "Khám phá phim",
      specialOffers: "Ưu đãi đặc biệt",
      studentDiscount: "Giảm giá sinh viên",
      familyPackage: "Gói gia đình",
      morningSpecial: "Ưu đãi buổi sáng",
    },
  };

  const t = translations[language];

  // Giả lập API call
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        // Phim đang chiếu
        const mockNowShowing = [
          {
            id: 1,
            title: language === "vi" ? "Dune: Hành tinh cát" : "Dune: Part Two",
            poster:
              "https://upload.wikimedia.org/wikipedia/vi/e/e9/Dune_H%C3%A0nh_tinh_c%C3%A1t_poster.jpg",
            rating: 8.8,
            duration: 166,
            genre: ["sci-fi", "action"],
            showtimes: ["14:00", "17:30", "20:45"],
            theaters: 8,
            releaseDate: "2024-03-01",
            isNew: true,
          },
          {
            id: 2,
            title:
              language === "vi"
                ? "Người Nhện: Xa Nhà"
                : "Spider-Man: Far From Home",
            poster:
              "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=600&fit=crop",
            rating: 7.5,
            duration: 129,
            genre: ["action", "adventure"],
            showtimes: ["14:30", "17:15", "20:00"],
            theaters: 10,
            releaseDate: "2024-05-15",
          },
          {
            id: 3,
            title:
              language === "vi" ? "Gia Đình Siêu Nhân" : "The Incredibles 3",
            poster:
              "https://images.unsplash.com/photo-1489599809516-9827b6d1cf13?w=400&h=600&fit=crop",
            rating: 7.2,
            duration: 95,
            genre: ["animation", "family"],
            showtimes: ["13:15", "16:00", "18:30"],
            theaters: 12,
            releaseDate: "2024-12-20",
            isHot: true,
          },
          {
            id: 4,
            title: language === "vi" ? "Vùng Đất Quỷ Dữ" : "The Devil's Own",
            poster:
              "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=400&h=600&fit=crop",
            rating: 6.9,
            duration: 112,
            genre: ["horror", "thriller"],
            showtimes: ["15:45", "19:00", "22:15"],
            theaters: 6,
            releaseDate: "2024-04-20",
          },
        ];

        // Phim sắp chiếu
        const mockComingSoon = [
          {
            id: 5,
            title:
              language === "vi" ? "Biệt Đội Cảm Tử 3" : "Deadpool & Wolverine",
            poster:
              "https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=400&h=600&fit=crop",
            duration: 138,
            genre: ["action", "comedy"],
            releaseDate: "2025-01-15",
            theaters: 0,
          },
          {
            id: 6,
            title: language === "vi" ? "Rồng Vàng 2025" : "Golden Dragon 2025",
            poster:
              "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop",
            duration: 125,
            genre: ["action", "fantasy"],
            releaseDate: "2025-01-20",
            theaters: 0,
          },
          {
            id: 7,
            title: language === "vi" ? "Mùa Xuân Vĩnh Cửu" : "Eternal Spring",
            poster:
              "https://images.unsplash.com/photo-1489599809516-9827b6d1cf13?w=400&h=600&fit=crop",
            duration: 102,
            genre: ["drama", "romance"],
            releaseDate: "2025-01-25",
            theaters: 0,
          },
          {
            id: 8,
            title:
              language === "vi"
                ? "Câu Chuyện Giao Thừa"
                : "New Year's Eve Tale",
            poster:
              "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=400&h=600&fit=crop",
            duration: 118,
            genre: ["drama", "family"],
            releaseDate: "2025-01-10",
            theaters: 0,
          },
        ];

        // Thêm độ trễ giả lập
        await new Promise((resolve) => setTimeout(resolve, 800));

        setNowShowing(mockNowShowing);
        setComingSoon(mockComingSoon);
      } catch (err) {
        console.error("Error fetching movies:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [language]);

  // Lọc phim theo thể loại
  const filteredMovies =
    selectedCategory === "all"
      ? nowShowing
      : nowShowing.filter((movie) => movie.genre.includes(selectedCategory));

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white text-gray-800 ">
      <Navbar />

      {/* Hero Carousel */}
      <HeroCarousel t={t} language={language} />

      <main className="flex-grow">
        {/* Categories Filter */}
        <CategoryFilter
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          t={t}
        />

        {/* Now Showing Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-10">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {t.nowShowing}
                </h2>
                <p className="text-gray-600">
                  {t.today} • {t.thisWeek}
                </p>
              </div>
              <Link
                to="/movies"
                className="text-blue-600 hover:text-blue-800 font-semibold flex items-center transition-colors"
              >
                {t.viewAll}
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>
            </div>

            {loading ? (
              <div className="py-20">
                <LoadingSpinner text={t.loading} />
              </div>
            ) : filteredMovies.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-gray-400 text-6xl mb-4">🎥</div>
                <h3 className="text-2xl font-bold mb-2 text-gray-600">
                  {t.noMovies}
                </h3>
              </div>
            ) : (
              <MovieSection movies={filteredMovies} t={t} type="nowShowing" />
            )}
          </div>
        </section>

        {/* Coming Soon Section */}
        <section className="py-16 bg-gradient-to-b from-white to-blue-50">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-10">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {t.comingSoon}
                </h2>
                <p className="text-gray-600">Coming next month</p>
              </div>
            </div>

            {!loading && (
              <MovieSection movies={comingSoon} t={t} type="comingSoon" />
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default HomePage;
