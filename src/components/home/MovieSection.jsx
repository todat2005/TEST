import React from "react";
import { Link } from "react-router-dom";

function MovieSection({ movies, t, type = "nowShowing" }) {
  // SVG Icons as components
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

  const PlayIcon = ({ className }) => (
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
        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );

  const CalendarIcon = ({ className }) => (
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
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const language = localStorage.getItem("language") || "en";

    if (language === "vi") {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return `${day} Th ${month}, ${year}`;
    }

    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Get language for responsive text
  const language = localStorage.getItem("language") || "en";

  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
      {movies.map((movie) => (
        <div
          key={movie.id}
          className="group relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 md:hover:-translate-y-2 border border-gray-200 active:scale-95"
        >
          {/* Badges */}
          <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
            {movie.isNew && (
              <span className="bg-green-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs font-bold shadow-lg whitespace-nowrap">
                {language === "vi" ? "MỚI" : "NEW"}
              </span>
            )}
            {movie.isHot && (
              <span className="bg-red-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs font-bold shadow-lg whitespace-nowrap">
                {language === "vi" ? "HOT" : "HOT"}
              </span>
            )}
          </div>

          {/* Movie Poster */}
          <div className="relative h-48 sm:h-56 md:h-64 lg:h-72 overflow-hidden">
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>

            {type === "comingSoon" && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl mb-1 sm:mb-2 text-white">
                    🎬
                  </div>
                  <span className="bg-blue-600 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-lg text-xs sm:text-sm font-bold">
                    {language === "vi" ? "SẮP CHIẾU" : "COMING SOON"}
                  </span>
                </div>
              </div>
            )}

            {/* Rating Badge */}
            {movie.rating && (
              <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm rounded-full px-2 sm:px-3 py-1 flex items-center shadow-lg">
                <StarIcon className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500 mr-1" />
                <span className="font-bold text-white text-sm sm:text-base">
                  {movie.rating}
                </span>
              </div>
            )}
          </div>

          {/* Movie Info */}
          <div className="p-4 sm:p-6">
            {/* Movie Title */}
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 line-clamp-1 md:line-clamp-2 leading-tight">
              {movie.title}
            </h3>

            {/* Duration & Theaters */}
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="flex items-center text-gray-600 text-sm sm:text-base">
                <ClockIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span>
                  {movie.duration} {t.minutes}
                </span>
              </div>
              {movie.theaters > 0 && (
                <div className="text-xs sm:text-sm text-blue-600 font-medium bg-blue-50 px-2 sm:px-3 py-1 rounded-full">
                  {movie.theaters}{" "}
                  {language === "vi" ? "rạp" : t.theaters.toLowerCase()}
                </div>
              )}
            </div>

            {/* Genres - Hidden on small mobile, shown on tablet+ */}
            {movie.genre && (
              <div className="hidden sm:flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
                {movie.genre.slice(0, 3).map((genre, index) => (
                  <span
                    key={index}
                    className="px-2 sm:px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs sm:text-sm"
                  >
                    {genre.charAt(0).toUpperCase() + genre.slice(1)}
                  </span>
                ))}
              </div>
            )}

            {/* Showtimes for Now Showing */}
            {type === "nowShowing" && movie.showtimes && (
              <div className="mb-4 sm:mb-6">
                <h4 className="text-xs sm:text-sm text-gray-500 mb-2">
                  {t.showtimes}:
                </h4>
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  {movie.showtimes.slice(0, 3).map((time, index) => (
                    <button
                      key={index}
                      className="px-2 sm:px-3 py-1 sm:py-1.5 bg-gray-100 hover:bg-blue-600 hover:text-white text-gray-700 rounded-md text-xs sm:text-sm transition-colors active:scale-95"
                      aria-label={`Select showtime ${time}`}
                    >
                      {time}
                    </button>
                  ))}
                  {movie.showtimes.length > 3 && (
                    <button
                      className="px-2 sm:px-3 py-1 sm:py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-md text-xs sm:text-sm transition-colors"
                      aria-label="More showtimes"
                    >
                      +{movie.showtimes.length - 3}
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Release Date for Coming Soon */}
            {type === "comingSoon" && movie.releaseDate && (
              <div className="mb-4 sm:mb-6">
                <h4 className="text-xs sm:text-sm text-gray-500 mb-2">
                  {language === "vi" ? "Ngày công chiếu" : "Release Date"}:
                </h4>
                <div className="flex items-center text-blue-600 text-sm sm:text-base">
                  <CalendarIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  <span className="font-medium">
                    {formatDate(movie.releaseDate)}
                  </span>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2 sm:gap-3">
              {type === "nowShowing" ? (
                <>
                  <Link
                    to={`/booking/${movie.id}`}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2 sm:py-3 px-3 sm:px-4 rounded-lg text-sm sm:text-base text-center transition-all duration-300 active:scale-95 shadow-md hover:shadow-lg"
                    aria-label={`Book tickets for ${movie.title}`}
                  >
                    <span className="hidden sm:inline">{t.bookTicket}</span>
                    <span className="sm:hidden">
                      {language === "vi" ? "Đặt vé" : "Book"}
                    </span>
                  </Link>
                  <Link
                    to={`/trailer/${movie.id}`}
                    className="flex items-center justify-center w-10 sm:w-auto sm:px-4 sm:py-3 border border-gray-300 hover:border-blue-600 hover:bg-blue-50 rounded-lg transition-colors group/trailer active:scale-95"
                    aria-label={`Watch trailer for ${movie.title}`}
                  >
                    <PlayIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 group-hover/trailer:text-blue-600" />
                    <span className="hidden sm:inline ml-2 text-sm font-medium text-gray-600 group-hover/trailer:text-blue-600">
                      {t.watchTrailer}
                    </span>
                  </Link>
                </>
              ) : (
                <Link
                  to={`/trailer/${movie.id}`}
                  className="w-full py-2 sm:py-3 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 rounded-lg font-semibold text-sm sm:text-base text-center transition-colors active:scale-95"
                  aria-label={`Watch trailer for ${movie.title}`}
                >
                  {t.watchTrailer}
                </Link>
              )}
            </div>

            {/* Mobile-only quick info */}
            <div className="sm:hidden mt-3 pt-3 border-t border-gray-100">
              <div className="flex items-center justify-between text-xs text-gray-500">
                {movie.genre && movie.genre[0] && (
                  <span>
                    {movie.genre[0].charAt(0).toUpperCase() +
                      movie.genre[0].slice(1)}
                  </span>
                )}
                {movie.releaseDate && (
                  <span>{formatDate(movie.releaseDate)}</span>
                )}
              </div>
            </div>
          </div>

          {/* Hover card effect */}
          <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500 rounded-xl pointer-events-none transition-all duration-300 z-0"></div>
        </div>
      ))}
    </div>
  );
}

export default MovieSection;
