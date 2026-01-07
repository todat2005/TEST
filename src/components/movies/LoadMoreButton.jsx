import React from "react";

function LoadMoreButton({ t, language, filteredMovies }) {
  if (!filteredMovies.length > 0 || filteredMovies.length % 8 !== 0) {
    return null;
  }

  return (
    <div className="text-center mt-8 md:mt-12">
      <button className="px-8 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold transition-colors text-sm md:text-base">
        {language === "vi" ? "Tải thêm phim" : "Load More Movies"}
      </button>
    </div>
  );
}

export default LoadMoreButton;