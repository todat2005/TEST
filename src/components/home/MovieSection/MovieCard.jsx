import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import StarIcon from "./icons/StarIcon.jsx";
import ClockIcon from "./icons/ClockIcon.jsx";
import PlayIcon from "./icons/PlayIcon.jsx";
import CalendarIcon from "./icons/CalendarIcon.jsx";
import SpinnerIcon from "./icons/SpinnerIcon.jsx";
import TicketIcon from "./icons/TicketIcon.jsx"; // Giả sử bạn có icon vé
import NewBadgeIcon from "./icons/NewBadgeIcon.jsx"; // Giả sử bạn có icon NEW
import formatDate from "../../../utils/FormatDate.js";
import { getTitle, getGenreText } from "./utils.js";

function MovieCard({
  movie,
  t,
  type = "nowShowing",
  language,
  hasTrailer = false,
  isTrailerLoading,
  onTrailerClick,
  showRating = true,
  showDuration = true,
  showGenres = true,
  showActionButtons = true,
  showDetailsButton = true,
  showRanking = true,
  isNewRelease = false,
  showTicketSales = true,
}) {
  // Memoized các giá trị để tránh tính toán lại
  const movieTitle = useMemo(() => getTitle(movie), [movie]);

  // Xác định ranking color
  const rankingColor = useMemo(() => {
    if (!movie.ranking) return "";
    switch (movie.ranking) {
      case 1:
        return "text-red-600";
      case 2:
        return "text-yellow-600";
      case 3:
        return "text-blue-600";
      default:
        return "text-blue-700";
    }
  }, [movie.ranking]);

  // Danh sách thể loại đã được xử lý
  const genres = useMemo(() => {
    if (!movie.genre || !showGenres) return [];
    const genreArray = Array.isArray(movie.genre) ? movie.genre : [movie.genre];
    return genreArray.slice(0, 2).map((genre) => getGenreText(genre, language));
  }, [movie.genre, showGenres, language]);

  // Format ngày phát hành
  const formattedReleaseDate = useMemo(() => {
    if (!movie.releaseDate) return "";
    return formatDate(movie.releaseDate, language);
  }, [movie.releaseDate, language]);

  // Kiểm tra có phải là phim đang chiếu không
  const isNowShowing = type === "nowShowing";

  // Kiểm tra xem có hiển thị ranking badge không
  const shouldShowRankingBadge = useMemo(() => {
    return isNowShowing && movie.ranking && movie.ranking < 4 && showRanking;
  }, [isNowShowing, movie.ranking, showRanking]);

  // Kiểm tra xem có hiển thị badge "NEW" không
  // Có thể kiểm tra từ prop hoặc từ dữ liệu movie
  const shouldShowNewBadge = useMemo(() => {
    return movie.isNew;
  }, [movie.isNew]);

  // Format số lượng vé đã bán
  const formattedTicketSales = useMemo(() => {
    if (!movie.ticketSales) return "0";

    if (typeof movie.ticketSales === "number") {
      // Format số: 1000 -> 1K, 1000000 -> 1M
      if (movie.ticketSales >= 1000000) {
        return `${(movie.ticketSales / 1000000).toFixed(1)}M`;
      } else if (movie.ticketSales >= 1000) {
        return `${(movie.ticketSales / 1000).toFixed(1)}K`;
      }
      return movie.ticketSales.toString();
    }
    return movie.ticketSales.toString();
  }, [movie.ticketSales]);

  // Xử lý lỗi hình ảnh
  const handleImageError = (e) => {
    e.target.src = "/images/default-movie.jpg";
    e.target.onerror = null; // Ngăn vòng lặp vô hạn
  };

  // Xử lý click trailer
  const handleTrailerClick = (e) => {
    e.stopPropagation();
    if (onTrailerClick && !isTrailerLoading) {
      onTrailerClick(movie);
    }
  };

  return (
    <div
      className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 group relative"
      role="article"
      aria-label={`Movie: ${movieTitle}`}
    >
      {/* PHẦN 1: POSTER PHIM VÀ OVERLAY */}
      <div className="relative h-64 overflow-hidden">
        {/* Badge NEW */}
        {shouldShowNewBadge && (
          <div className="absolute bottom-0 left-0 z-20">
            <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-3 py-1 rounded-br-lg rounded-tl-xl shadow-lg">
              <div className="flex items-center">
                <NewBadgeIcon className="h-4 w-4 mr-1" aria-hidden="true" />
                <span className="text-xs font-bold">
                  {language === "vi" ? "MỚI" : "NEW"}
                </span>
              </div>
            </div>
          </div>
        )}
        {/* Hình ảnh poster */}
        <img
          src={movie.poster || "/images/default-movie.jpg"}
          alt={movieTitle}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          onError={handleImageError}
        />

        {/* Container cho các badge ở góc trái trên */}
        <div className="absolute top-3 left-3 flex gap-2">
          {/* Badge ranking cho top 3 phim đang chiếu */}
          {shouldShowRankingBadge && (
            <div className="z-20">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg bg-white/20 backdrop-blur-sm border border-white/30"
                aria-label={`Ranking: #${movie.ranking}`}
              >
                <span className={`font-bold text-xl ${rankingColor}`}>
                  #{movie.ranking}
                </span>
              </div>
            </div>
          )}

          {/* Badge trailer */}
          {hasTrailer && (
            <span
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-xs font-bold self-center"
              aria-label="Has trailer"
            >
              {language === "vi" ? "ĐOẠN PHIM GIỚI THIỆU" : "TRAILER"}
            </span>
          )}
        </div>

        {/* Container cho các badge ở góc phải trên */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          {/* Rating badge */}
          {movie.rating && showRating && (
            <div
              className="bg-black/80 rounded-full px-3 py-1 flex items-center justify-center"
              aria-label={`Rating: ${movie.rating}`}
            >
              <StarIcon
                className="h-4 w-4 text-yellow-500 mr-1"
                aria-hidden="true"
              />
              <span className="font-bold text-white text-sm">
                {movie.rating}
              </span>
            </div>
          )}

          {/* Ticket sales badge */}
          {showTicketSales && movie.ticketSales && movie.ticketSales > 0 && (
            <div
              className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-full px-3 py-1 flex items-center justify-center shadow-md"
              aria-label={`Ticket sales: ${formattedTicketSales}`}
            >
              <TicketIcon
                className="h-4 w-4 text-white mr-1"
                aria-hidden="true"
              />
              <span className="font-bold text-white text-sm">
                {formattedTicketSales}
              </span>
            </div>
          )}
        </div>

        {/* Overlay nút Play trailer */}
        {hasTrailer && (
          <div
            className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
            aria-hidden="true"
          >
            <button
              onClick={handleTrailerClick}
              className="bg-white/20 backdrop-blur-sm rounded-full p-4 hover:scale-110 transition-transform duration-300 border-2 border-white/50 hover:border-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
              aria-label={
                isTrailerLoading
                  ? "Loading trailer"
                  : `Play trailer for ${movieTitle}`
              }
              disabled={isTrailerLoading}
            >
              {isTrailerLoading ? (
                <SpinnerIcon
                  className="h-8 w-8 text-white animate-spin"
                  aria-hidden="true"
                />
              ) : (
                <PlayIcon className="h-8 w-8 text-white" aria-hidden="true" />
              )}
            </button>
          </div>
        )}
      </div>

      {/* PHẦN 2: THÔNG TIN CHI TIẾT PHIM */}
      <div className="p-6">
        {/* Tiêu đề phim và ranking nhỏ (nếu có) */}
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-bold text-gray-900 line-clamp-1 flex-1 mr-2">
            {movieTitle}
          </h3>
        </div>

        {/* Thông tin ranking chi tiết (chỉ cho phim đang chiếu) */}
        {isNowShowing && movie.ranking && showRanking && (
          <div className="mb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-700">
                  {language === "vi"
                    ? `Xếp hạng: #${movie.ranking}`
                    : `Ranking: #${movie.ranking}`}
                </span>
                {/* Hiển thị xu hướng ranking nếu có */}
                {movie.trend && (
                  <span
                    className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                      movie.trend === "up"
                        ? "bg-green-100 text-green-800"
                        : movie.trend === "down"
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                    aria-label={`Trend: ${movie.trend}`}
                  >
                    {movie.trend === "up" && "↑"}
                    {movie.trend === "down" && "↓"}
                    {movie.trend === "stable" && "→"}
                    {movie.positionChange &&
                      ` ${Math.abs(movie.positionChange)}`}
                  </span>
                )}
              </div>

              {/* Hiển thị số vé đã bán (nếu có) */}
              {showTicketSales && movie.ticketSales && (
                <div className="flex items-center text-green-600">
                  <TicketIcon className="h-4 w-4 mr-1" aria-hidden="true" />
                  <span className="text-sm font-semibold">
                    {language === "vi" ? "Đã bán: " : "Sold: "}
                    {formattedTicketSales}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Badge "Sắp chiếu" */}
        {!isNowShowing && (
          <div className="mb-3 flex items-center justify-between">
            <span
              className="inline-block bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold"
              aria-label="Coming Soon"
            >
              {language === "vi" ? "SẮP CHIẾU" : "COMING SOON"}
            </span>

            {/* Hiển thị số vé đặt trước cho phim sắp chiếu (nếu có) */}
            {showTicketSales && movie.preSales && movie.preSales > 0 && (
              <div className="flex items-center text-purple-600">
                <TicketIcon className="h-4 w-4 mr-1" aria-hidden="true" />
                <span className="text-sm font-semibold">
                  {language === "vi" ? "Đặt trước: " : "Pre-sales: "}
                  {movie.preSales}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Thời lượng phim và số rạp */}
        {showDuration && (
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center text-gray-600">
              <ClockIcon className="h-4 w-4 mr-2" aria-hidden="true" />
              <span className="text-sm">
                {movie.duration || "NULL"} {t.minutes}
              </span>
            </div>
            {movie.theaters > 0 && (
              <div className="text-sm text-blue-600 font-medium">
                {movie.theaters} {language === "vi" ? "rạp" : "theaters"}
              </div>
            )}
          </div>
        )}

        {/* Danh sách thể loại */}
        {genres.length > 0 && showGenres && (
          <div className="flex flex-wrap gap-2 mb-4" aria-label="Genres">
            {genres.map((genre, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
              >
                {genre}
              </span>
            ))}
          </div>
        )}

        {/* Lịch chiếu hoặc ngày phát hành */}
        {isNowShowing && movie.showtimes ? (
          <div className="mb-6">
            <h4 className="text-sm text-gray-500 mb-2">{t.showtimes}:</h4>
            <div className="flex flex-wrap gap-2">
              {movie.showtimes.slice(0, 3).map((time, index) => (
                <button
                  key={index}
                  className="px-3 py-1 bg-gray-100 hover:bg-blue-600 hover:text-white text-gray-700 rounded-md text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label={`Showtime: ${time}`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        ) : (
          !isNowShowing &&
          movie.releaseDate && (
            <div className="mb-6">
              <h4 className="text-sm text-gray-500 mb-2">
                {language === "vi" ? "Ngày công chiếu" : "Release Date"}:
              </h4>
              <div className="flex items-center text-blue-600">
                <CalendarIcon className="h-4 w-4 mr-2" aria-hidden="true" />
                <span className="font-medium">{formattedReleaseDate}</span>
              </div>
            </div>
          )
        )}

        {/* PHẦN 3: NÚT HÀNH ĐỘNG */}
        {showActionButtons || showDetailsButton ? (
          <div className="flex gap-3">
            {showActionButtons && (
              <Link
                to={`/booking/${movie.id}`}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg text-center transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label={`Book ticket for ${movieTitle}`}
              >
                <span className="hidden sm:inline">{t.bookTicket}</span>
                <span className="sm:hidden">
                  {language === "vi" ? "Đặt vé" : "Book"}
                </span>
              </Link>
            )}

            {showDetailsButton && (
              <Link
                to={`/movie/${movie.id}`}
                className={`py-3 border-2 border-purple-600 text-purple-600 hover:bg-purple-50 rounded-lg font-semibold text-center transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
                  showActionButtons ? "flex-1" : "w-full"
                }`}
                aria-label={`View details for ${movieTitle}`}
              >
                <span className="hidden sm:inline">
                  {language === "vi" ? "Xem chi tiết" : "View Details"}
                </span>
                <span className="sm:hidden">
                  {language === "vi" ? "Chi tiết" : "Details"}
                </span>
              </Link>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default MovieCard;
