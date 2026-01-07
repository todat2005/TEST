import React from "react";

function ResultsHeader({
  t,
  isMobile,
  viewType,
  setViewType,
  filteredMovies,
  searchTerm,
  selectedCategory,
  advancedFilters,
  categories,
  resetAllFilters,
}) {
  return (
    <>
      {/* Results Count and Filter Status */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <p className="text-gray-600 text-sm md:text-base">
            <span className="font-semibold">{filteredMovies.length}</span>{" "}
            {t.resultsFound}
            {(searchTerm ||
              selectedCategory !== "all" ||
              advancedFilters.status !== "all" ||
              advancedFilters.formats.length > 0) && (
              <button
                onClick={resetAllFilters}
                className="ml-3 text-blue-600 hover:text-blue-800 font-medium text-sm md:text-base"
              >
                {t.clearFilters}
              </button>
            )}
          </p>

          {/* Active filters pills - Mobile */}
          {isMobile &&
            (searchTerm ||
              selectedCategory !== "all" ||
              advancedFilters.status !== "all" ||
              advancedFilters.formats.length > 0) && (
              <div className="flex flex-wrap gap-2">
                {searchTerm && (
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                    {t.searchPlaceholder.split("...")[0]}: {searchTerm}
                  </span>
                )}
                {advancedFilters.status !== "all" && (
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                    {advancedFilters.status === "nowShowing"
                      ? t.showingNow
                      : t.upcoming}
                  </span>
                )}
                {selectedCategory !== "all" && (
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                    {categories.find((c) => c.id === selectedCategory)?.label}
                  </span>
                )}
                {advancedFilters.formats.map((format) => (
                  <span
                    key={format}
                    className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs"
                  >
                    {format}
                  </span>
                ))}
              </div>
            )}
        </div>
      </div>

      {/* View Type Toggle */}
      <div className="mb-6 flex justify-end">
        <div className="bg-white rounded-lg shadow-sm p-1 inline-flex">
          <button
            onClick={() => setViewType("grid")}
            className={`px-4 py-2 rounded-md transition-colors ${
              viewType === "grid"
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              />
            </svg>
          </button>
          <button
            onClick={() => setViewType("list")}
            className={`px-4 py-2 rounded-md transition-colors ${
              viewType === "list"
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}

export default ResultsHeader;
