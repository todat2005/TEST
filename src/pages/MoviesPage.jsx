import React, { useState, useEffect, useCallback, useMemo } from "react";
import Navbar from "../components/common/NavBar";
import Footer from "../components/common/Footer";
import LoadingSpinner from "../components/common/LoadingSpinner";
import MovieSection from "../components/home/MovieSection";
import useFilter from "../hooks/useFilter";
import MovieFilters from "../components/movies/MovieFilters";
import ResultsHeader from "../components/movies/ResultsHeader";
import NoMoviesFound from "../components/movies/NoMoviesFound";
import LoadMoreButton from "../components/movies/LoadMoreButton";
import translationsMoviePage from "../translations/MoviePage.js";
import Categories from "../components/home/CategoryFilter/Categories.js";
import { API_URL } from "../config/config.js";

// Hằng số
const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;

// Hàm debounce tách riêng để tránh tạo lại mỗi lần render
const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};

// Hàm kiểm tra phim mới
const isMovieNew = (releaseDate) => {
  const release = new Date(releaseDate);
  const now = new Date();
  return now - release <= ONE_WEEK_MS;
};

function MoviesPage() {
  // State quản lý dữ liệu phim
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State quản lý bộ lọc
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("ticketSales");
  const [isMobile, setIsMobile] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [viewType, setViewType] = useState("grid");
  const [advancedFilters, setAdvancedFilters] = useState({
    formats: [],
    status: "all",
  });

  // Cấu hình ngôn ngữ - sử dụng useMemo để tránh tính toán lại
  const language = useMemo(() => localStorage.getItem("language") || "vi", []);

  // Dữ liệu đa ngôn ngữ - cache để tối ưu performance
  const t = useMemo(
    () =>
      language === "vi" ? translationsMoviePage.vi : translationsMoviePage.en,
    [language]
  );

  // Danh mục phim theo ngôn ngữ
  const categories = useMemo(() => Categories(language), [language]);

  // Kiểm tra responsive (mobile/desktop)
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Kiểm tra ngay khi component mount
    checkMobile();

    // Thêm debounce để tránh gọi hàm quá nhiều khi resize
    const debouncedResize = debounce(checkMobile, 250);
    window.addEventListener("resize", debouncedResize);

    // Cleanup: gỡ bỏ event listener khi component unmount
    return () => {
      window.removeEventListener("resize", debouncedResize);
    };
  }, []);

  // Hàm fetch dữ liệu phim từ API
  const fetchMovies = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Gọi đồng thời 2 API: phim đang chiếu và sắp chiếu
      const [showingResponse, upcomingResponse] = await Promise.all([
        fetch(`${API_URL}/movies/showing`),
        fetch(`${API_URL}/movies/upcoming`),
      ]);

      // Kiểm tra response
      if (!showingResponse.ok || !upcomingResponse.ok) {
        throw new Error("Failed to fetch movies");
      }

      const showingData = await showingResponse.json();
      const upcomingData = await upcomingResponse.json();

      // Kết hợp dữ liệu từ cả 2 API
      const combinedMovies = [
        ...(showingData.movies || []).map((movie) => ({
          ...movie,
          status: "nowShowing",
          isNew: isMovieNew(movie.releaseDate),
        })),
        ...(upcomingData.movies || []).map((movie) => ({
          ...movie,
          status: "comingSoon",
        })),
      ];

      // Cập nhật state
      setMovies(combinedMovies);
      setFilteredMovies(combinedMovies);
    } catch (err) {
      console.error("Error fetching movies:", err);
      setError(err.message);
      setMovies([]);
      setFilteredMovies([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Gọi API khi component mount
  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  // Sử dụng custom hook để lọc phim
  useFilter({
    movies,
    searchTerm,
    selectedCategory,
    sortBy,
    advancedFilters,
    setFilteredMovies,
  });

  // Reset bộ lọc nâng cao
  const resetAdvancedFilters = useCallback(() => {
    setAdvancedFilters({
      formats: [],
      status: "all",
    });
  }, []);

  // Reset tất cả bộ lọc
  const resetAllFilters = useCallback(() => {
    setSearchTerm("");
    setSelectedCategory("all");
    setAdvancedFilters({
      formats: [],
      status: "all",
    });
    setShowAdvancedFilters(false);
  }, []);

  // Xử lý retry khi có lỗi
  const handleRetry = useCallback(() => {
    fetchMovies();
  }, [fetchMovies]);

  // Nội dung chính - sử dụng useMemo để tránh render lại không cần thiết
  const movieContent = useMemo(() => {
    if (loading) {
      return (
        <div className="py-12 md:py-20">
          <LoadingSpinner text={t.loading} />
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center py-20">
          <div className="text-red-600 font-semibold mb-4">
            {t.error || "Có lỗi xảy ra khi tải dữ liệu"}
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

    if (filteredMovies.length === 0) {
      return (
        <NoMoviesFound
          t={t}
          language={language}
          resetAllFilters={resetAllFilters}
        />
      );
    }

    return <MovieSection movies={filteredMovies} t={t} language={language} />;
  }, [
    loading,
    error,
    filteredMovies,
    t,
    language,
    resetAllFilters,
    handleRetry,
  ]);

  // Tính toán số lượng phim theo trạng thái
  const movieStats = useMemo(() => {
    const nowShowingCount = movies.filter(
      (m) => m.status === "nowShowing"
    ).length;
    const comingSoonCount = movies.filter(
      (m) => m.status === "comingSoon"
    ).length;
    const newMoviesCount = movies.filter((m) => m.isNew).length;

    return { nowShowingCount, comingSoonCount, newMoviesCount };
  }, [movies]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      <Navbar />

      <main className="flex-grow py-20 px-4 sm:px-6 lg:px-8 lg:py-30">
        <div className="container mx-auto px-3 sm:px-4">
          {/* Stats header */}
          {!loading && !error && movies.length > 0 && (
            <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <div className="text-sm text-blue-600 font-medium">
                  {language === "vi" ? "ĐANG CHIẾU" : "NOW SHOWING"}
                </div>
                <div className="text-2xl font-bold text-blue-800">
                  {movieStats.nowShowingCount}
                </div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                <div className="text-sm text-purple-600 font-medium">
                  {language === "vi" ? "SẮP CHIẾU" : "COMING SOON"}
                </div>
                <div className="text-2xl font-bold text-purple-800">
                  {movieStats.comingSoonCount}
                </div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                <div className="text-sm text-green-600 font-medium">
                  {language === "vi" ? "PHIM MỚI" : "NEW RELEASES"}
                </div>
                <div className="text-2xl font-bold text-green-800">
                  {movieStats.newMoviesCount}
                </div>
              </div>
            </div>
          )}

          {/* Component bộ lọc phim */}
          <MovieFilters
            t={t}
            isMobile={isMobile}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            sortBy={sortBy}
            setSortBy={setSortBy}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            advancedFilters={advancedFilters}
            setAdvancedFilters={setAdvancedFilters}
            showAdvancedFilters={showAdvancedFilters}
            setShowAdvancedFilters={setShowAdvancedFilters}
            categories={categories}
            resetAdvancedFilters={resetAdvancedFilters}
            movieStats={movieStats}
          />

          {/* Header hiển thị kết quả */}
          <ResultsHeader
            t={t}
            isMobile={isMobile}
            viewType={viewType}
            setViewType={setViewType}
            filteredMovies={filteredMovies}
            searchTerm={searchTerm}
            selectedCategory={selectedCategory}
            advancedFilters={advancedFilters}
            categories={categories}
            resetAllFilters={resetAllFilters}
            movieStats={movieStats}
          />

          {/* Nội dung phim (loading/không tìm thấy/danh sách) */}
          {movieContent}

          {/* Nút xem thêm (nếu có) */}
          <LoadMoreButton
            t={t}
            language={language}
            filteredMovies={filteredMovies}
            movies={movies}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default MoviesPage;
