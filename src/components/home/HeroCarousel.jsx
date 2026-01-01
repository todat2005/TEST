import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";

function HeroCarousel({ t, language = "en" }) {
  // Sử dụng useMemo để tránh tạo mới slides mỗi lần render
  const slides = useMemo(
    () => [
      {
        id: 1,
        image:
          "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&h=1080&fit=crop",
        mobileImage: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&h=1200&fit=crop",
        title: language === "vi" ? "DUNE: HÀNH TINH CÁT" : "DUNE: PART TWO",
        subtitle:
          language === "vi"
            ? "Trải nghiệm điện ảnh đỉnh cao với công nghệ IMAX"
            : "Experience epic cinema with IMAX technology",
        ctaText: t?.ctaButton || "Book Now",
        ctaLink: "/movies/dune-2",
        genre:
          language === "vi"
            ? "Khoa học viễn tưởng · Hành động"
            : "Sci-Fi · Action",
      },
      {
        id: 2,
        image:
          "https://images.unsplash.com/photo-1489599809516-9827b6d1cf13?w=1920&h=1080&fit=crop",
        mobileImage: "https://images.unsplash.com/photo-1489599809516-9827b6d1cf13?w=800&h=1200&fit=crop",
        title:
          language === "vi"
            ? "NGƯỜI NHỆN: XA NHÀ"
            : "SPIDER-MAN: FAR FROM HOME",
        subtitle:
          language === "vi"
            ? "Cuộc phiêu lưu mới của Người Nhện trên toàn cầu"
            : "Spider-Man's new adventure across the globe",
        ctaText: t?.ctaButton || "Book Now",
        ctaLink: "/movies/spiderman",
        genre:
          language === "vi" ? "Hành động · Phiêu lưu" : "Action · Adventure",
      },
      {
        id: 3,
        image:
          "https://images.unsplash.com/photo-1595769812725-4c6564f7528b?w=1920&h=1080&fit=crop",
        mobileImage: "https://images.unsplash.com/photo-1595769812725-4c6564f7528b?w=800&h=1200&fit=crop",
        title: language === "vi" ? "GIA ĐÌNH SIÊU NHÂN 3" : "THE INCREDIBLES 3",
        subtitle:
          language === "vi"
            ? "Gia đình siêu anh hùng trở lại với nhiệm vụ mới"
            : "The superhero family returns with a new mission",
        ctaText: t?.ctaButton || "Book Now",
        ctaLink: "/movies/incredibles-3",
        genre:
          language === "vi" ? "Hoạt hình · Gia đình" : "Animation · Family",
      },
      {
        id: 4,
        image:
          "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=1920&h=1080&fit=crop",
        mobileImage: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=800&h=1200&fit=crop",
        title: language === "vi" ? "VÙNG ĐẤT QUỶ DỮ" : "THE DEVIL'S OWN",
        subtitle:
          language === "vi"
            ? "Kinh dị tâm lý đầy kịch tính và bất ngờ"
            : "Psychological thriller full of drama and surprises",
        ctaText: t?.ctaButton || "Book Now",
        ctaLink: "/movies/devils-own",
        genre: language === "vi" ? "Kinh dị · Giật gân" : "Horror · Thriller",
      },
    ],
    [t, language]
  );

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Kiểm tra responsive
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto slide - chậm hơn trên mobile
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, isMobile ? 5000 : 4000); // 5 giây trên mobile, 4 giây trên desktop

    return () => clearInterval(interval);
  }, [slides.length, isMobile]);

  // Navigation functions với useCallback
  const goToSlide = useCallback((index) => {
    setCurrentSlide(index);
  }, []);

  const goToPrevSlide = useCallback(() => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
    );
  }, [slides.length]);

  const goToNextSlide = useCallback(() => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  }, [slides.length]);

  // Keyboard navigation (chỉ trên desktop)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isMobile) {
        if (e.key === "ArrowLeft") {
          goToPrevSlide();
        } else if (e.key === "ArrowRight") {
          goToNextSlide();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToPrevSlide, goToNextSlide, isMobile]);

  // Preload images
  useEffect(() => {
    slides.forEach((slide) => {
      // Preload cả desktop và mobile images
      const imgDesktop = new Image();
      imgDesktop.src = slide.image;
      
      const imgMobile = new Image();
      imgMobile.src = slide.mobileImage;
    });
  }, [slides]);

  return (
    <div
      className="relative overflow-hidden h-[400px] sm:h-[450px] md:h-[550px] lg:h-[600px] xl:h-[700px]"
      role="region"
      aria-label="Movie carousel"
    >
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 md:duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          aria-hidden={index !== currentSlide}
        >
          {/* Gradient overlay - khác nhau giữa mobile và desktop */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-transparent z-10 md:bg-gradient-to-r md:from-black/90 md:via-black/70 md:to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent z-10"></div>

          {/* Background image - responsive */}
          <img
            src={isMobile ? slide.mobileImage : slide.image}
            alt={slide.title}
            className="w-full h-full object-cover object-center md:object-center md:scale-105"
            loading={index === 0 ? "eager" : "lazy"}
          />

          {/* Slide Content */}
          <div className="absolute inset-0 z-20 flex items-center">
            <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
              <div className="max-w-full sm:max-w-md md:max-w-2xl lg:max-w-3xl">
                {/* Genre badge - ẩn trên mobile nhỏ */}
                <div className="hidden sm:inline-flex items-center px-3 py-1.5 bg-blue-600/90 backdrop-blur-sm rounded-full mb-4 md:mb-6">
                  <span className="text-xs sm:text-sm font-semibold text-white tracking-wide">
                    {slide.genre}
                  </span>
                </div>

                {/* Movie title - responsive font sizes */}
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-3 sm:mb-4 md:mb-6 leading-tight tracking-tight drop-shadow-2xl">
                  {slide.title}
                </h1>

                {/* Movie subtitle - ẩn trên mobile nhỏ */}
                <p className="hidden sm:block text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 mb-6 sm:mb-8 md:mb-10 max-w-full sm:max-w-md md:max-w-xl leading-relaxed drop-shadow-lg">
                  {slide.subtitle}
                </p>

                {/* CTA Buttons - responsive layout và sizes */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Link
                    to={slide.ctaLink}
                    className="inline-flex items-center justify-center px-4 sm:px-6 md:px-8 py-3 sm:py-4 text-sm sm:text-base md:text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    aria-label={`${slide.ctaText} - ${slide.title}`}
                  >
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mr-2 sm:mr-3"
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
                    {slide.ctaText}
                  </Link>

                  <Link
                    to={`${slide.ctaLink}?trailer=true`}
                    className="inline-flex items-center justify-center px-4 sm:px-6 md:px-8 py-3 sm:py-4 text-sm sm:text-base md:text-lg font-semibold text-white bg-gray-800/80 hover:bg-gray-700/90 backdrop-blur-sm rounded-lg transition-all duration-300 border border-gray-600 hover:border-gray-500"
                    aria-label={`Watch trailer - ${slide.title}`}
                  >
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mr-2 sm:mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="hidden sm:inline">
                      {language === "vi" ? "Xem Trailer" : "Watch Trailer"}
                    </span>
                    <span className="sm:hidden">
                      {language === "vi" ? "Trailer" : "Trailer"}
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Dots - responsive size và spacing */}
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex space-x-1 sm:space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-1 sm:focus:ring-2 focus:ring-white ${
              index === currentSlide
                ? "bg-blue-500 w-6 sm:w-8 md:w-10"
                : "bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentSlide ? "true" : "false"}
          />
        ))}
      </div>

      {/* Navigation Buttons - ẩn trên mobile nhỏ */}
      <button
        onClick={goToPrevSlide}
        className="absolute left-2 sm:left-4 md:left-8 top-1/2 transform -translate-y-1/2 z-30 bg-black/20 sm:bg-black/30 hover:bg-black/50 sm:hover:bg-black/60 text-white p-2 sm:p-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-1 sm:focus:ring-2 focus:ring-white"
        aria-label="Previous movie"
      >
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={goToNextSlide}
        className="absolute right-2 sm:right-4 md:right-8 top-1/2 transform -translate-y-1/2 z-30 bg-black/20 sm:bg-black/30 hover:bg-black/50 sm:hover:bg-black/60 text-white p-2 sm:p-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-1 sm:focus:ring-2 focus:ring-white"
        aria-label="Next movie"
      >
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Slide indicator - chỉ hiển thị trên tablet+ */}
      <div className="hidden md:flex absolute top-4 md:top-6 right-4 md:right-6 z-30 bg-black/40 backdrop-blur-sm text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium items-center">
        <span className="text-blue-300">{currentSlide + 1}</span>
        <span className="mx-1.5 md:mx-2 text-gray-400">/</span>
        <span>{slides.length}</span>
      </div>

      {/* Swipe hint for mobile */}
      {isMobile && (
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-20 flex items-center text-white/70 text-xs animate-pulse">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M10 17l5-5-5-5v10z"/>
          </svg>
          <span>Swipe</span>
          <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14 7l-5 5 5 5V7z"/>
          </svg>
        </div>
      )}
    </div>
  );
}

export default HeroCarousel;