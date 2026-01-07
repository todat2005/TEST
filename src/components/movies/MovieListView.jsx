import React from "react";
import { Link } from "react-router-dom";

// Component hiển thị danh sách phim dạng list (list view)
function MovieListView({
  movies,
  t,
  formatNumber,
  // Thêm các props mới để kiểm soát hiển thị
  showPoster = true,
  showStatusBadge = true,
  showDuration = true,
  showRating = true,
  showGenres = true,
  showSynopsis = true,
  showTicketSales = true,
  showActionButtons = true,
  compactMode = false,
}) {
  // Nhận props:
  // - movies: mảng chứa thông tin các bộ phim
  // - t: object chứa các chuỗi dịch (translation)
  // - formatNumber: hàm định dạng số (ticket sales)

  return (
    <div className={`space-y-4 ${compactMode ? "compact-mode" : ""}`}>
      {movies.map((movie) => (
        <div
          key={movie.id}
          className={`bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 ${
            compactMode ? "py-2 px-3" : ""
          }`}
        >
          <div className="flex flex-col md:flex-row">
            {/* Movie Poster - Chỉ hiển thị nếu showPoster là true */}
            {showPoster && (
              <div className="md:w-48 lg:w-56 h-48 md:h-auto relative flex-shrink-0">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = "/images/default-movie.jpg";
                  }}
                />

                {/* Status Badge - Chỉ hiển thị nếu showStatusBadge là true */}
                {showStatusBadge && (
                  <div className="absolute top-2 left-2">
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
                  </div>
                )}
              </div>
            )}

            {/* Movie Details */}
            <div className={`flex-1 p-4 md:p-6 ${!showPoster ? "w-full" : ""}`}>
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3">
                <div>
                  <h3
                    className={`font-bold text-gray-900 mb-1 ${
                      compactMode ? "text-base" : "text-lg md:text-xl"
                    }`}
                  >
                    {movie.title}
                  </h3>

                  {/* Duration and Rating - Chỉ hiển thị nếu được bật */}
                  {(showDuration || showRating) && (
                    <div className="flex items-center text-gray-600 text-sm mb-2">
                      {showDuration && (
                        <>
                          <svg
                            className="h-4 w-4 mr-1"
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
                          <span>
                            {movie.duration || "NULL"} {t.minutes}
                          </span>
                        </>
                      )}

                      {showRating && movie.rating && (
                        <>
                          {showDuration && movie.duration && (
                            <span className="mx-2">•</span>
                          )}
                          <svg
                            className="h-4 w-4 text-yellow-500 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span>{movie.rating}</span>
                        </>
                      )}
                    </div>
                  )}
                </div>

                {/* Ticket Sales - Chỉ hiển thị nếu showTicketSales là true */}
                {showTicketSales && (
                  <div className="mt-2 md:mt-0">
                    <div className="text-right">
                      <p className="text-sm text-gray-500">{t.ticketsSold}:</p>
                      <p className="text-lg font-bold text-blue-600">
                        {formatNumber(movie.ticketSales || 0)}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Genres - Chỉ hiển thị nếu showGenres là true */}
              {showGenres && movie.genre && movie.genre.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {movie.genre
                    .slice(0, compactMode ? 2 : 3)
                    .map((genre, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs"
                      >
                        {genre}
                      </span>
                    ))}
                </div>
              )}

              {/* Synopsis - Chỉ hiển thị nếu showSynopsis là true */}
              {showSynopsis && (
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {movie.synopsis || t.noSynopsis || "No synopsis available."}
                </p>
              )}

              {/* Action Buttons - Chỉ hiển thị nếu showActionButtons là true */}
              {showActionButtons && (
                <div className="flex gap-3">
                  {movie.status === "nowShowing" ? (
                    <>
                      <Link
                        to={`/booking/${movie.id}`}
                        className={`${
                          compactMode
                            ? "py-1 px-3 text-xs"
                            : "py-2 px-4 text-sm"
                        } flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg text-center transition-colors`}
                      >
                        {t.bookTicket}
                      </Link>
                      <Link
                        to={`/movies/${movie.id}`}
                        className={`${
                          compactMode
                            ? "py-1 px-3 text-xs"
                            : "py-2 px-4 text-sm"
                        } flex-1 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold rounded-lg text-center transition-colors`}
                      >
                        {t.viewDetails}
                      </Link>
                    </>
                  ) : (
                    <Link
                      to={`/movies/${movie.id}`}
                      className={`${
                        compactMode ? "py-1 px-3 text-xs" : "py-2 px-4 text-sm"
                      } w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 rounded-lg font-semibold text-center transition-colors`}
                    >
                      {t.watchTrailer}
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MovieListView;
