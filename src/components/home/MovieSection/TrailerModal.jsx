import React, { useEffect } from "react";
import CloseIcon from "./icons/CloseIcon.jsx";
import SpinnerIcon from "./icons/SpinnerIcon.jsx";
import extractYouTubeId from "../../../utils/extractYoutube.js";
import { getYouTubeEmbedUrl } from "./utils.js";

function TrailerModal({
  selectedTrailer,
  language,
  videoError,
  isLoading,
  onClose,
  onRetry,
}) {
  // Xử lý phím ESC
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape" && selectedTrailer) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscKey);
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [selectedTrailer, onClose]);

  if (!selectedTrailer) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleRetry = async () => {
    try {
      const youtubeId = extractYouTubeId(selectedTrailer.trailer);
      if (youtubeId) {
        onRetry({ ...selectedTrailer, youtubeId });
      }
    } catch (error) {
      console.error("Error retrying:", error);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={handleOverlayClick}
    >
      {/* Overlay mờ phía sau modal */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md transition-opacity duration-300" />

      {/* Container modal */}
      <div className="relative w-full max-w-4xl mx-auto z-10">
        {/* Nút đóng modal */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors p-2 bg-black/50 rounded-full hover:bg-black/70"
          aria-label="Close Trailer"
        >
          <CloseIcon className="h-6 w-6" />
        </button>

        {/* Container video */}
        <div className="bg-black rounded-xl overflow-hidden shadow-2xl animate-modalIn">
          {videoError ? (
            <div className="aspect-video flex flex-col items-center justify-center bg-gray-900">
              <p className="text-white text-xl mb-4">
                {language === "vi"
                  ? "Không thể tải video"
                  : "Failed to load video"}
              </p>
              <button
                onClick={handleRetry}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {language === "vi" ? "Thử lại" : "Retry"}
              </button>
            </div>
          ) : selectedTrailer.youtubeId ? (
            <div className="aspect-video">
              <iframe
                src={getYouTubeEmbedUrl(selectedTrailer.youtubeId)}
                title={`${selectedTrailer.title} Trailer`}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          ) : (
            <div className="aspect-video flex items-center justify-center bg-gray-900">
              <SpinnerIcon className="h-12 w-12 text-white animate-spin" />
            </div>
          )}

          {/* Thông tin video phía dưới */}
          <div className="p-4 md:p-6 bg-gray-900/90">
            <h3 className="text-lg md:text-2xl font-bold text-white mb-1">
              {selectedTrailer.title}
            </h3>
            <p className="text-gray-300 text-sm md:text-base">
              {language === "vi" ? "Đang phát trailer" : "Now playing trailer"}
            </p>
          </div>
        </div>

        {/* Hướng dẫn đóng modal */}
        <div className="mt-4 text-center">
          <p className="text-white/70 text-sm">
            {language === "vi"
              ? "Nhấn ESC hoặc click ra ngoài để đóng"
              : "Press ESC or click outside to close"}
          </p>
        </div>
      </div>

      {/* CSS animation cho modal */}
      <style jsx>{`
        @keyframes modalIn {
          from {
            opacity: 0;
            transform: translateY(-20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-modalIn {
          animation: modalIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

export default TrailerModal;