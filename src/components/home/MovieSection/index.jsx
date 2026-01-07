import React, { useState } from "react";
import MovieCard from "./MovieCard.jsx";
import TrailerModal from "./TrailerModal.jsx";
import extractYouTubeId from "../../../utils/extractYoutube.js";

function MovieSection({ movies, t, type = "nowShowing" }) {
  const language = localStorage.getItem("language") || "en";
  const [selectedTrailer, setSelectedTrailer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [videoError, setVideoError] = useState(false);

  // Xử lý khi click vào nút xem trailer
  const handleTrailerClick = async (movie) => {
    if (!movie.trailer) {
      console.warn("No trailer URL available for this movie");
      return;
    }

    setIsLoading(true);
    setVideoError(false);

    try {
      const youtubeId = extractYouTubeId(movie.trailer);

      if (!youtubeId) {
        throw new Error("Invalid YouTube URL");
      }

      setSelectedTrailer({
        ...movie,
        youtubeId: youtubeId,
      });

      setTimeout(() => {
        setIsLoading(false);
      }, 300);

      document.body.style.overflow = "hidden";
    } catch (error) {
      console.error("Error processing trailer:", error);
      setVideoError(true);
      setIsLoading(false);
    }
  };

  // Xử lý đóng modal trailer
  const handleCloseTrailer = () => {
    setSelectedTrailer(null);
    setVideoError(false);
    setIsLoading(false);
    document.body.style.overflow = "auto";
  };

  // Xử lý retry khi có lỗi video
  const handleRetryTrailer = (trailerData) => {
    setSelectedTrailer(trailerData);
    setVideoError(false);
  };

  return (
    <>
      {/* Grid hiển thị danh sách phim */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {movies.map((movie) => {
          const hasTrailer = !!movie.trailer;
          const isTrailerLoading =
            isLoading && selectedTrailer?.id === movie.id;

          return (
            <MovieCard
              key={movie.id}
              movie={movie}
              t={t}
              type={type}
              language={language}
              hasTrailer={hasTrailer}
              isTrailerLoading={isTrailerLoading}
              onTrailerClick={handleTrailerClick}
            />
          );
        })}
      </div>

      {/* MODAL XEM TRAILER */}
      <TrailerModal
        selectedTrailer={selectedTrailer}
        language={language}
        videoError={videoError}
        isLoading={isLoading}
        onClose={handleCloseTrailer}
        onRetry={handleRetryTrailer}
      />
    </>
  );
}

export default MovieSection;
