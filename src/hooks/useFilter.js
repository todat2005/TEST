import { useEffect } from "react";

// Apply filters
const useFilter = ({
  movies,
  searchTerm,
  selectedCategory,
  sortBy,
  advancedFilters,
  setFilteredMovies,
}) => {
  useEffect(() => {
    let result = [...movies];

    // Search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();

      result = result.filter((movie) => {
        // Safe string conversion before calling toLowerCase
        const title = String(movie.title || "").toLowerCase();
        const director = String(movie.director || "").toLowerCase();

        const titleMatch = title.includes(searchLower);
        const directorMatch = director.includes(searchLower);
        const genreMatch = Array.isArray(movie.genre)
          ? movie.genre.some((g) =>
              String(g || "")
                .toLowerCase()
                .includes(searchLower)
            )
          : false;
        return titleMatch || directorMatch || genreMatch;
      });
    }

    // Category filter
    if (selectedCategory !== "all") {
      result = result.filter((movie) =>
        movie.genre?.includes(selectedCategory)
      );
    }

    // Status filter
    if (advancedFilters.status !== "all") {
      result = result.filter(
        (movie) => movie.status === advancedFilters.status
      );
    }

    // Format filter
    if (advancedFilters.formats.length > 0) {
      result = result.filter((movie) =>
        advancedFilters.formats.every((format) =>
          movie.formats?.includes(format)
        )
      );
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case "ticketSales":
          return (b.ticketSales || 0) - (a.ticketSales || 0);
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        case "name":
          return (a.title || "").localeCompare(b.title || "");
        case "latest":
          return new Date(b.releaseDate || 0) - new Date(a.releaseDate || 0);
        default:
          return (b.ticketSales || 0) - (a.ticketSales || 0);
      }
    });

    result = result.map((movie, index) => ({
      ...movie,
      rank: index + 1,
    }));

    setFilteredMovies(result);
  }, [
    searchTerm,
    selectedCategory,
    sortBy,
    advancedFilters,
    movies,
    setFilteredMovies,
  ]);
};
export default useFilter;
