import React, { useEffect, useState, useRef } from "react";
import CloseIcon from "./icons/CloseIcon.jsx";
import SpinnerIcon from "./icons/SpinnerIcon.jsx";
import { getYouTubeEmbedUrl } from "./utils.js";

function TrailerModal({
  selectedTrailer,
  language,
  videoError,
  onClose,
  onRetry,
}) {
  // State để theo dõi khi iframe đã tải xong
  const [iframeLoaded, setIframeLoaded] = useState(false);

  // Ref để truy cập vào phần tử modal
  const modalRef = useRef(null);

  // useEffect xử lý sự kiện bàn phím và quản lý focus
  useEffect(() => {
    // Chỉ chạy khi có trailer được chọn
    if (!selectedTrailer) return;

    // Hàm xử lý phím ESC
    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    // Thêm event listener cho phím ESC
    document.addEventListener("keydown", handleEscKey);

    // Vô hiệu hóa scroll của body khi modal mở
    document.body.style.overflow = "hidden";

    // Focus vào nút đóng modal sau 100ms
    const closeButton = modalRef.current?.querySelector(
      'button[aria-label="Close Trailer"]'
    );
    setTimeout(() => closeButton?.focus(), 100);

    // Cleanup function
    return () => {
      // Xóa event listener
      document.removeEventListener("keydown", handleEscKey);
      // Khôi phục scroll của body
      document.body.style.overflow = "unset";
    };
  }, [selectedTrailer, onClose]);

  // Nếu không có trailer được chọn, không render gì
  if (!selectedTrailer) return null;

  // Xử lý click vào overlay (click outside)
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Xử lý thử lại tải video
  const handleRetry = () => {
    setIframeLoaded(false); // Reset trạng thái loading
    onRetry(selectedTrailer); // Gọi hàm retry
  };

  return (
    // Overlay layer bao phủ toàn màn hình
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="trailer-title"
      ref={modalRef}
    >
      {/* Background overlay với hiệu ứng mờ */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" />

      {/* Container chính của modal */}
      <div className="relative w-full max-w-4xl mx-auto z-10">
        {/* Nút đóng modal */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors p-2 bg-black/50 rounded-full hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
          aria-label="Close Trailer"
        >
          <CloseIcon className="h-6 w-6" />
        </button>

        {/* Card chứa nội dung modal */}
        <div className="bg-black rounded-xl overflow-hidden shadow-2xl animate-modalIn">
          {/* Conditional rendering cho 3 trạng thái */}
          {videoError ? (
            // Trạng thái lỗi
            <div className="aspect-video flex flex-col items-center justify-center bg-gray-900 p-6">
              <div className="text-center mb-4">
                <p className="text-white text-xl font-medium mb-2">
                  {language === "vi"
                    ? "Không thể tải video"
                    : "Failed to load video"}
                </p>
              </div>

              {/* Các nút hành động */}
              <div className="flex gap-3">
                {/* Nút thử lại */}
                <button
                  onClick={handleRetry}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  {language === "vi" ? "Thử lại" : "Retry"}
                </button>

                {/* Nút đóng */}
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  {language === "vi" ? "Đóng" : "Close"}
                </button>
              </div>
            </div>
          ) : selectedTrailer.youtubeId ? (
            // Trạng thái hiển thị video
            <div className="aspect-video relative">
              {/* Loading overlay khi iframe chưa tải xong */}
              {!iframeLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                  <SpinnerIcon className="h-8 w-8 text-white animate-spin" />
                </div>
              )}

              {/* Iframe YouTube */}
              <iframe
                src={getYouTubeEmbedUrl(selectedTrailer.youtubeId)}
                title={`${selectedTrailer.title} Trailer`}
                className="w-full h-full transition-opacity duration-300"
                style={{ opacity: iframeLoaded ? 1 : 0 }}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
                onLoad={() => setIframeLoaded(true)}
                loading="lazy"
              />
            </div>
          ) : (
            // Trạng thái loading khi chưa có youtubeId
            <div className="aspect-video flex items-center justify-center bg-gray-900">
              <SpinnerIcon className="h-12 w-12 text-white animate-spin" />
            </div>
          )}

          {/* Thông tin video */}
          <div className="p-4 md:p-6 bg-gray-900/90">
            <h3 className="text-lg md:text-2xl font-bold text-white mb-1">
              {selectedTrailer.title}
            </h3>
            <p className="text-gray-300 text-sm md:text-base">
              {language === "vi" ? "Đang phát trailer" : "Now playing trailer"}
            </p>
          </div>
        </div>

        {/* Hướng dẫn cho người dùng */}
        <div className="mt-4 text-center">
          <p className="text-white/70 text-sm">
            {language === "vi"
              ? "Nhấn ESC hoặc click ra ngoài để đóng"
              : "Press ESC or click outside to close"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default TrailerModal;
