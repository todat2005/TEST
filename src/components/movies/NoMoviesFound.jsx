import React from "react";

function NoMoviesFound({ t, language, resetAllFilters }) {
  return (
    <div className="text-center py-12 md:py-20 bg-white rounded-xl shadow-lg">
      <div className="text-gray-400 text-5xl md:text-6xl mb-4">🎥</div>
      <h3 className="text-xl md:text-2xl font-bold mb-2 text-gray-600">
        {t.noMovies}
      </h3>
      <p className="text-gray-500 mb-6 text-sm md:text-base">
        {language === "vi"
          ? "Hãy thử tìm kiếm với từ khóa khác"
          : "Try searching with different keywords"}
      </p>
      <button
        onClick={resetAllFilters}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm md:text-base"
      >
        {t.clearFilters}
      </button>
    </div>
  );
}

export default NoMoviesFound;