import React from "react";
import { Link } from "react-router-dom";
import StarIcon from "./icons/StarIcon.jsx";
import ClockIcon from "./icons/ClockIcon.jsx";
import PlayIcon from "./icons/PlayIcon.jsx";
import CalendarIcon from "./icons/CalendarIcon.jsx";
import SpinnerIcon from "./icons/SpinnerIcon.jsx";
import formatDate from "../../../utils/formatDate.js";
import { getTitle, getGenreText } from "./utils.js";

function MovieCard({
  movie,
  t,
  type = "nowShowing",
  language,
  hasTrailer,
  isTrailerLoading,
  onTrailerClick,
}) {
  const movieTitle = getTitle(movie);

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 group">
      {/* PHẦN 1: POSTER PHIM VÀ OVERLAY */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={movie.poster || "/images/default-movie.jpg"}
          alt={movieTitle}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          onError={(e) => {
            e.target.src = "/images/default-movie.jpg";
          }}
        />

        {/* Badge trailer */}
        <div className="absolute top-3 left-3 flex gap-1">
          {hasTrailer && (
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-xs font-bold">
              {language === "vi" ? "TRAILER" : "TRAILER"}
            </span>
          )}
        </div>

        {/* Hiển thị rating */}
        {movie.rating && (
          <div className="absolute top-3 right-3 bg-black/80 rounded-full px-3 py-1 flex items-center">
            <StarIcon className="h-4 w-4 text-yellow-500 mr-1" />
            <span className="font-bold text-white text-sm">{movie.rating}</span>
          </div>
        )}

        {/* Overlay nút Play */}
        {hasTrailer && (
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onTrailerClick(movie);
              }}
              className="bg-white/20 backdrop-blur-sm rounded-full p-4 hover:scale-110 transition-transform duration-300 border-2 border-white/50 hover:border-white"
              aria-label="Play Trailer"
              disabled={isTrailerLoading}
            >
              {isTrailerLoading ? (
                <SpinnerIcon className="h-8 w-8 text-white animate-spin" />
              ) : (
                <PlayIcon className="h-8 w-8 text-white" />
              )}
            </button>
          </div>
        )}
      </div>

      {/* PHẦN 2: THÔNG TIN CHI TIẾT PHIM */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
          {movieTitle}
        </h3>

        {/* Badge "Sắp chiếu" */}
        {type === "comingSoon" && (
          <div className="mb-3">
            <span className="inline-block bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold">
              {language === "vi" ? "SẮP CHIẾU" : "COMING SOON"}
            </span>
          </div>
        )}

        {/* Thời lượng phim và số rạp */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-gray-600">
            <ClockIcon className="h-4 w-4 mr-2" />
            <span className="text-sm">
              {movie.duration || "120"} {t.minutes}
            </span>
          </div>
          {movie.theaters > 0 && (
            <div className="text-sm text-blue-600 font-medium">
              {movie.theaters} {language === "vi" ? "rạp" : "theaters"}
            </div>
          )}
        </div>

        {/* Danh sách thể loại */}
        {movie.genre && (
          <div className="flex flex-wrap gap-2 mb-4">
            {(Array.isArray(movie.genre) ? movie.genre : [movie.genre])
              .slice(0, 2)
              .map((genre, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                >
                  {getGenreText(genre, language)}
                </span>
              ))}
          </div>
        )}

        {/* Lịch chiếu hoặc ngày phát hành */}
        {type === "nowShowing" && movie.showtimes ? (
          <div className="mb-6">
            <h4 className="text-sm text-gray-500 mb-2">{t.showtimes}:</h4>
            <div className="flex flex-wrap gap-2">
              {movie.showtimes.slice(0, 3).map((time, index) => (
                <button
                  key={index}
                  className="px-3 py-1 bg-gray-100 hover:bg-blue-600 hover:text-white text-gray-700 rounded-md text-sm transition-colors"
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        ) : (
          type === "comingSoon" &&
          movie.releaseDate && (
            <div className="mb-6">
              <h4 className="text-sm text-gray-500 mb-2">
                {language === "vi" ? "Ngày công chiếu" : "Release Date"}:
              </h4>
              <div className="flex items-center text-blue-600">
                <CalendarIcon className="h-4 w-4 mr-2" />
                <span className="font-medium">
                  {formatDate(movie.releaseDate, language)}
                </span>
              </div>
            </div>
          )
        )}

        {/* PHẦN 3: NÚT HÀNH ĐỘNG */}
        <div className="flex gap-3">
          {type === "nowShowing" ? (
            <>
              <Link
                to={`/booking/${movie.id}`}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg text-center transition-colors"
              >
                <span className="hidden sm:inline">{t.bookTicket}</span>
                <span className="sm:hidden">
                  {language === "vi" ? "Đặt vé" : "Book"}
                </span>
              </Link>
              {hasTrailer ? (
                <button
                  onClick={() => onTrailerClick(movie)}
                  className="flex items-center justify-center px-4 border border-gray-300 hover:border-purple-600 hover:bg-purple-50 rounded-lg transition-colors group"
                  aria-label="Watch Trailer"
                  disabled={isTrailerLoading}
                >
                  {isTrailerLoading ? (
                    <SpinnerIcon className="h-5 w-5 text-gray-600 animate-spin" />
                  ) : (
                    <>
                      <PlayIcon className="h-5 w-5 text-gray-600 group-hover:text-purple-600" />
                      <span className="ml-2 hidden sm:inline text-gray-600 group-hover:text-purple-600">
                        {language === "vi" ? "Trailer" : "Trailer"}
                      </span>
                    </>
                  )}
                </button>
              ) : (
                <button
                  className="flex items-center justify-center px-4 border border-gray-300 text-gray-400 rounded-lg cursor-not-allowed"
                  disabled
                  title={
                    language === "vi"
                      ? "Không có trailer"
                      : "No trailer available"
                  }
                >
                  <PlayIcon className="h-5 w-5" />
                </button>
              )}
            </>
          ) : (
            <button
              onClick={() => onTrailerClick(movie)}
              className="w-full py-3 border-2 border-purple-600 text-purple-600 hover:bg-purple-50 rounded-lg font-semibold text-center transition-colors flex items-center justify-center"
              disabled={!hasTrailer || isTrailerLoading}
            >
              {isTrailerLoading ? (
                <>
                  <SpinnerIcon className="h-5 w-5 animate-spin mr-2" />
                  {language === "vi" ? "Đang tải..." : "Loading..."}
                </>
              ) : (
                <>
                  <PlayIcon className="h-5 w-5 mr-2" />
                  {t.watchTrailer}
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
