import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/common/NavBar.jsx";
import Footer from "../components/common/Footer.jsx";
import MovieSection from "../components/home/MovieSection/index.jsx";
import CategoryFilter from "../components/home/CategoryFilter/index.jsx";
import LoadingSpinner from "../components/common/LoadingSpinner.jsx";
import translationsHomePage from "../translations/HomePage.js";
import { API_URL } from "../config/config.js";
import NoMoviesFound from "../components/movies/NoMoviesFound.jsx";

function HomePage() {
  // State quản lý dữ liệu phim và trạng thái loading
  const [nowShowing, setNowShowing] = useState([]);
  const [comingSoon, setComingSoon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Lấy ngôn ngữ từ localStorage, mặc định là tiếng Việt
  const language = useMemo(() => localStorage.getItem("language") || "vi", []);

  // Lấy bản dịch theo ngôn ngữ hiện tại
  const t = useMemo(
    () =>
      language === "vi" ? translationsHomePage.vi : translationsHomePage.en,
    [language]
  );

  // Hàm fetch dữ liệu phim
  const fetchMovies = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Sử dụng Promise.all để fetch đồng thời cả 2 API
      const [nowShowingResponse, comingSoonResponse] = await Promise.all([
        fetch(`${API_URL}/movies/showing`),
        fetch(`${API_URL}/movies/upcoming`),
      ]);

      // Kiểm tra response status
      if (!nowShowingResponse.ok || !comingSoonResponse.ok) {
        throw new Error("Failed to fetch movies");
      }

      const nowShowingData = await nowShowingResponse.json();
      const comingSoonData = await comingSoonResponse.json();

      // Xử lý dữ liệu phim đang chiếu: thêm ranking và badge
      const processedNowShowing = (nowShowingData.movies || []).map(
        (movie, index) => ({
          ...movie,
          isNew: isMovieNew(movie.releaseDate),
        })
      );

      setNowShowing(processedNowShowing);
      setComingSoon(comingSoonData.movies || []);
    } catch (err) {
      setError(err.message);
      setNowShowing([]);
      setComingSoon([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Hàm kiểm tra phim mới (ra mắt trong 7 ngày)
  const isMovieNew = (releaseDate) => {
    if (!releaseDate) return false;
    const release = new Date(releaseDate);
    const now = new Date();
    const diffTime = Math.abs(now - release);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
  };

  // Effect để fetch dữ liệu phim khi component mount
  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  // Lọc phim theo thể loại được chọn
  const filteredMovies = useMemo(() => {
    if (selectedCategory === "all") {
      return nowShowing;
    }

    return nowShowing.filter((movie) => {
      if (!movie.genre) return false;

      // Xử lý cả trường hợp genre là string hoặc array
      const genres = Array.isArray(movie.genre) ? movie.genre : [movie.genre];
      return genres.some((genre) =>
        genre.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    });
  }, [nowShowing, selectedCategory]);

  // Handle reset filters
  const resetAllFilters = useCallback(() => {
    setSelectedCategory("all");
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white text-gray-800">
      <Navbar />

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
                className="text-blue-600 hover:text-blue-800 font-semibold flex items-center transition-colors hover:underline"
                aria-label={t.viewAll}
              >
                {t.viewAll}
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
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
              <div className="py-20">
                <LoadingSpinner text={t.loading} />
              </div>
            ) : error ? (
              <div className="text-center py-20">
                <div className="text-red-600 font-semibold mb-4">
                  {t.errorLoading || "Có lỗi xảy ra khi tải dữ liệu"}
                </div>
                <button
                  onClick={fetchMovies}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {t.retry || "Thử lại"}
                </button>
              </div>
            ) : filteredMovies.length === 0 ? (
              <NoMoviesFound
                t={t}
                language={language}
                resetAllFilters={resetAllFilters}
              />
            ) : (
              <MovieSection
                movies={filteredMovies}
                t={t}
                type="nowShowing"
                language={language}
              />
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
                <p className="text-gray-600">
                  {language === "vi"
                    ? "Sắp ra mắt trong tháng tới"
                    : "Coming next month"}
                </p>
              </div>

              {/* Link đến trang xem tất cả phim sắp chiếu nếu có */}
              {comingSoon.length > 0 && (
                <Link
                  to="/movies?type=coming-soon"
                  className="text-blue-600 hover:text-blue-800 font-semibold flex items-center transition-colors hover:underline"
                  aria-label={
                    language === "vi"
                      ? "Xem tất cả phim sắp chiếu"
                      : "View all coming soon"
                  }
                >
                  {language === "vi" ? "Xem tất cả" : "View All"}
                  <svg
                    className="w-5 h-5 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </Link>
              )}
            </div>

            {/* Hiển thị danh sách phim sắp chiếu */}
            {loading ? (
              <div className="py-20">
                <LoadingSpinner text={t.loading} />
              </div>
            ) : error ? (
              <div className="text-center py-20">
                <div className="text-gray-500">
                  {language === "vi"
                    ? "Không thể tải phim sắp chiếu"
                    : "Unable to load coming soon movies"}
                </div>
              </div>
            ) : comingSoon.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-500 mb-4">
                  {language === "vi"
                    ? "Hiện chưa có phim sắp chiếu"
                    : "No upcoming movies at the moment"}
                </div>
                <p className="text-gray-400 text-sm">
                  {language === "vi"
                    ? "Quay lại sau để cập nhật phim mới!"
                    : "Check back later for new releases!"}
                </p>
              </div>
            ) : (
              <MovieSection
                movies={comingSoon}
                t={t}
                type="comingSoon"
                language={language}
              />
            )}
          </div>
        </section>

        {!loading &&
          !error &&
          (nowShowing.length > 0 || comingSoon.length > 0) && (
            <section className="relative py-16 md:py-20 overflow-hidden">
              {/* Background với gradient và pattern */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                {/* Pattern overlay - Đã fix lỗi syntax */}
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  }}
                ></div>

                {/* Glowing orbs */}
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
              </div>

              {/* Content */}
              <div className="relative container mx-auto px-4 text-center">
                {/* Icon decorative */}
                <div className="mb-6 md:mb-8 flex justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-white/20 rounded-full blur-lg animate-ping"></div>
                    <div className="relative bg-white/10 backdrop-blur-sm rounded-full p-4 md:p-5 border border-white/30">
                      <svg
                        className="w-10 h-10 md:w-12 md:h-12 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 5v2m0 4v2m0 4v2m5-11a2 2 0 012 2v3a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h14z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Tiêu đề với animation */}
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 leading-tight">
                  <span className="block text-white drop-shadow-lg">
                    {language === "vi"
                      ? "Đặt vé ngay để không bỏ lỡ!"
                      : "Book your tickets now!"}
                  </span>
                  <span className="block text-white/90 text-xl md:text-2xl font-normal mt-2">
                    {language === "vi"
                      ? "Trải nghiệm điện ảnh tuyệt vời"
                      : "Experience the magic of cinema"}
                  </span>
                </h2>

                {/* Mô tả */}
                <p className="text-white/80 text-lg md:text-xl mb-8 md:mb-10 max-w-3xl mx-auto leading-relaxed">
                  {language === "vi"
                    ? "Hàng ngàn suất chiếu đang chờ bạn. Đặt vé trực tuyến dễ dàng, nhanh chóng và an toàn. Chọn phim, chọn rạp, chọn ghế - tất cả chỉ trong vài phút!"
                    : "Thousands of screenings waiting for you. Book online easily, quickly and securely. Choose movies, theaters, seats - all in just minutes!"}
                </p>

                {/* Thống kê nổi bật */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-10 md:mb-12 max-w-4xl mx-auto">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-5 border border-white/20">
                    <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                      {nowShowing.length}+
                    </div>
                    <div className="text-white/80 text-sm md:text-base">
                      {language === "vi" ? "Phim đang chiếu" : "Now Showing"}
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-5 border border-white/20">
                    <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                      {comingSoon.length}+
                    </div>
                    <div className="text-white/80 text-sm md:text-base">
                      {language === "vi" ? "Phim sắp chiếu" : "Coming Soon"}
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-5 border border-white/20 col-span-2 md:col-span-1">
                    <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                      24/7
                    </div>
                    <div className="text-white/80 text-sm md:text-base">
                      {language === "vi" ? "Hỗ trợ đặt vé" : "Booking Support"}
                    </div>
                  </div>
                </div>

                {/* CTA Buttons với hiệu ứng */}
                <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center">
                  <Link
                    to="/movies"
                    className="group relative inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-bold text-lg md:text-xl rounded-xl transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-3xl min-w-[200px]"
                  >
                    <span className="relative z-10">
                      {language === "vi"
                        ? "XEM TẤT CẢ PHIM"
                        : "VIEW ALL MOVIES"}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white to-blue-50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                    <svg
                      className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300"
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

                  <Link
                    to="/theaters"
                    className="group relative inline-flex items-center justify-center px-8 py-4 bg-transparent text-white font-bold text-lg md:text-xl rounded-xl transition-all duration-300 hover:scale-105 border-2 border-white/30 hover:border-white min-w-[200px] backdrop-blur-sm"
                  >
                    <span className="relative z-10">
                      {language === "vi" ? "TÌM RẠP CHIẾU" : "FIND THEATERS"}
                    </span>
                    <div className="absolute inset-0 bg-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <svg
                      className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300"
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
                  </Link>
                </div>

                {/* Trust badges */}
                <div className="mt-12 md:mt-16 flex flex-wrap justify-center items-center gap-6 md:gap-8 text-white/60 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span>
                      {language === "vi" ? "Đặt vé an toàn" : "Secure Booking"}
                    </span>
                  </div>
                  <div className="hidden md:block">•</div>
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>
                      {language === "vi"
                        ? "Xác nhận tức thì"
                        : "Instant Confirmation"}
                    </span>
                  </div>
                  <div className="hidden md:block">•</div>
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>
                      {language === "vi" ? "Hoàn tiền dễ dàng" : "Easy Refunds"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/10 to-transparent"></div>
            </section>
          )}
      </main>

      <Footer />
    </div>
  );
}

export default HomePage;
