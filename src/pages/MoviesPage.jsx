import React, { useState, useEffect } from "react";
import Navbar from "../components/common/NavBar";
import Footer from "../components/common/Footer";
import LoadingSpinner from "../components/common/LoadingSpinner";
import MovieSection from "../components/home/MovieSection";
import useFilter from "../hooks/useFilter";
// Import các component mới
import MovieFilters from "../components/movies/MovieFilters";
import ResultsHeader from "../components/movies/ResultsHeader";
import MovieListView from "../components/movies/MovieListView";
import NoMoviesFound from "../components/movies/NoMoviesFound";
import LoadMoreButton from "../components/movies/LoadMoreButton";
import translationsMoviePage from "../translations/MoviePage.js";
import Categories from "../components/home/CategoryFilter/Categories.js";
import { API_URL } from "../config/config.js";
function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(true);
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
  // Lấy ngôn ngữ từ localStorage
  const language = localStorage.getItem("language") || "vi";
  // Dữ liệu đa ngôn ngữ cho toàn bộ trang
  const t =
    language === "vi" ? translationsMoviePage.vi : translationsMoviePage.en;
  const categories = Categories(language);
  // Kiểm tra responsive
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Gọi API
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const [showingResponse, upcomingResponse] = await Promise.all([
          fetch(`${API_URL}/movies/showing`),
          fetch(`${API_URL}/movies/upcoming`),
        ]);

        if (!showingResponse.ok || !upcomingResponse.ok) {
          throw new Error("Failed to fetch movies");
        }

        const showingData = await showingResponse.json();
        const upcomingData = await upcomingResponse.json();
        const combinedMovies = [
          ...(showingData.movies || []).map((movie) => ({
            ...movie,
            status: "nowShowing",
          })),
          ...(upcomingData.movies || []).map((movie) => ({
            ...movie,
            status: "comingSoon",
          })),
        ];

        const rankedMovies = combinedMovies.map((movie, index) => ({
          ...movie,
          rank: index + 1,
          isTrending: index < 3,
          isNew:
            new Date() - new Date(movie.releaseDate) <= 7 * 24 * 60 * 60 * 1000, // 7 days
        }));

        setMovies(rankedMovies);
        setFilteredMovies(rankedMovies);
      } catch (err) {
        console.error("Error fetching movies:", err);
        setMovies([]);
        setFilteredMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [language]);

  // Apply filters
  useFilter({
    movies,
    searchTerm,
    selectedCategory,
    sortBy,
    advancedFilters,
    setFilteredMovies,
  });

  const resetAdvancedFilters = () => {
    setAdvancedFilters({
      formats: [],
      status: "all",
    });
  };

  const resetAllFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    resetAdvancedFilters();
    setShowAdvancedFilters(false);
  };

  const formatNumber = (num) => {
    if (!num) return "0";
    return num.toLocaleString(language === "vi" ? "vi-VN" : "en-US");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      <Navbar />

      <main className="flex-grow py-20 px-4 sm:px-6 lg:px-8 lg:py-30">
        <div className="container mx-auto px-3 sm:px-4">
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
          />

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
          />

          {/* Movies Content */}
          {loading ? (
            <div className="py-12 md:py-20">
              <LoadingSpinner text={t.loading} />
            </div>
          ) : filteredMovies.length === 0 ? (
            <NoMoviesFound
              t={t}
              language={language}
              resetAllFilters={resetAllFilters}
            />
          ) : viewType === "grid" ? (
            <MovieSection
              movies={filteredMovies}
              t={t}
              type={
                advancedFilters.status === "all"
                  ? "mixed"
                  : advancedFilters.status
              }
            />
          ) : (
            <MovieListView
              movies={filteredMovies}
              t={t}
              formatNumber={formatNumber}
            />
          )}

          <LoadMoreButton
            t={t}
            language={language}
            filteredMovies={filteredMovies}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default MoviesPage;
