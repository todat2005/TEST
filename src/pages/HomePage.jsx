import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/common/NavBar.jsx";
import Footer from "../components/common/Footer.jsx";
import MovieSection from "../components/home/MovieSection/index.jsx";
import CategoryFilter from "../components/home/CategoryFilter/index.jsx";
import LoadingSpinner from "../components/common/LoadingSpinner.jsx";
import translationsHomePage from "../translations/HomePage.js";
import { API_URL } from "../config/config.js";
function HomePage() {
  // State quản lý dữ liệu phim và trạng thái loading
  const [nowShowing, setNowShowing] = useState([]); // Danh sách phim đang chiếu
  const [comingSoon, setComingSoon] = useState([]); // Danh sách phim sắp chiếu
  const [loading, setLoading] = useState(true); // Trạng thái loading khi fetch dữ liệu
  const [selectedCategory, setSelectedCategory] = useState("all"); // Thể loại phim được chọn để lọc

  // Lấy ngôn ngữ từ localStorage, mặc định là tiếng Anh nếu không có
  const language = localStorage.getItem("language") || "vi";
  // Lấy bản dịch theo ngôn ngữ hiện tại
  const t =
    language === "vi" ? translationsHomePage.vi : translationsHomePage.en;

  // Effect để fetch dữ liệu phim từ API
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true); // Bắt đầu loading
      try {
        // Fetch danh sách phim đang chiếu
        const resNowShowing = await fetch(`${API_URL}/movies/showing`);
        const dataNowShowing = await resNowShowing.json();
        setNowShowing(dataNowShowing.movies || []); // Cập nhật state với dữ liệu phim đang chiếu

        // Fetch danh sách phim sắp chiếu
        const resComingSoon = await fetch(`${API_URL}/movies/upcoming`);
        const dataComingSoon = await resComingSoon.json();
        setComingSoon(dataComingSoon.movies || []); // Cập nhật state với dữ liệu phim sắp chiếu
      } catch (error) {
        // Xử lý lỗi nếu fetch thất bại
        console.error("Lỗi fetch movies", error);
      } finally {
        // Dừng loading dù thành công hay thất bại
        setLoading(false);
      }
    };
    fetchMovies(); // Gọi hàm fetchMovies
  }, [language]); // Chạy lại effect khi ngôn ngữ thay đổi

  // Lọc phim theo thể loại được chọn
  const filteredMovies =
    selectedCategory === "all"
      ? nowShowing // Nếu chọn "all", hiển thị tất cả phim đang chiếu
      : nowShowing.filter((movie) => movie.genre.includes(selectedCategory)); // Lọc phim theo thể loại

  return (
    // Container chính của trang với gradient background
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white text-gray-800 ">
      {/* Thanh điều hướng */}
      <Navbar />

      {/* Nội dung chính của trang */}
      <main className="flex-grow">
        {/* Component lọc thể loại phim */}
        <CategoryFilter
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          language={language}
        />

        {/* Phần hiển thị phim đang chiếu */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {/* Tiêu đề phần phim đang chiếu */}
            <div className="flex justify-between items-center mb-10">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {t.nowShowing}
                </h2>
                <p className="text-gray-600">
                  {t.today} • {t.thisWeek}
                </p>
              </div>
              {/* Link đến trang xem tất cả phim */}
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

            {/* Hiển thị trạng thái loading, lỗi hoặc danh sách phim */}
            {loading ? (
              // Hiển thị spinner khi đang loading
              <div className="py-20">
                <LoadingSpinner text={t.loading} />
              </div>
            ) : filteredMovies.length === 0 ? (
              // Hiển thị thông báo khi không có phim
              <div className="text-center py-20">
                <div className="text-gray-400 text-6xl mb-4">🎥</div>
                <h3 className="text-2xl font-bold mb-2 text-gray-600">
                  {t.noMovies}
                </h3>
              </div>
            ) : (
              // Hiển thị danh sách phim đã lọc
              <MovieSection movies={filteredMovies} t={t} type="nowShowing" />
            )}
          </div>
        </section>

        {/* Phần hiển thị phim sắp chiếu */}
        <section className="py-16 bg-gradient-to-b from-white to-blue-50">
          <div className="container mx-auto px-4">
            {/* Tiêu đề phần phim sắp chiếu */}
            <div className="flex justify-between items-center mb-10">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {t.comingSoon}
                </h2>
                <p className="text-gray-600">Coming next month</p>
              </div>
            </div>

            {/* Hiển thị danh sách phim sắp chiếu */}
            {!loading && (
              <MovieSection movies={comingSoon} t={t} type="comingSoon" />
            )}
          </div>
        </section>
      </main>

      {/* Footer của trang */}
      <Footer />
    </div>
  );
}

export default HomePage;
