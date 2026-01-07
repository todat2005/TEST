function MovieFilters({
  t,
  isMobile,
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy,
  selectedCategory,
  setSelectedCategory,
  advancedFilters,
  setAdvancedFilters,
  showAdvancedFilters,
  setShowAdvancedFilters,
  categories,
  resetAdvancedFilters,
}) {
  const handleFormatToggle = (format) => {
    setAdvancedFilters((prev) => ({
      ...prev,
      formats: prev.formats.includes(format)
        ? prev.formats.filter((f) => f !== format)
        : [...prev.formats, format],
    }));
  };

  const handleStatusToggle = (status) => {
    setAdvancedFilters((prev) => ({
      ...prev,
      status: prev.status === status ? "all" : status,
    }));
  };

  const formatOptions = ["IMAX", "3D", "4DX"];

  return (
    <div className="mb-6 md:mb-8 bg-white rounded-xl shadow-lg p-4 md:p-6">
      {/* Search Bar and Sort */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {/* Search Bar */}
        <div className="md:col-span-2">
          <div className="relative">
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors text-sm md:text-base"
            />
            <svg
              className="absolute left-4 top-3.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Sort By */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <span className="font-medium text-gray-700 text-sm md:text-base">
              {t.sortBy}
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors bg-white text-sm md:text-base"
            >
              <option value="ticketSales">{t.ticketSales}</option>
              <option value="rating">{t.rating}</option>
              <option value="name">{t.name}</option>
              <option value="latest">{t.latest}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Status Filter */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <h3 className="font-medium text-gray-700 mb-3 text-sm md:text-base">
          {t.filterBy} {t.nowShowing.toLowerCase()}:
        </h3>
        <div className="flex flex-wrap gap-2 md:gap-3">
          <button
            onClick={() => handleStatusToggle("all")}
            className={`px-3 py-1.5 md:px-4 md:py-2 rounded-full font-medium transition-all text-sm md:text-base ${
              advancedFilters.status === "all"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {t.viewAllMovies}
          </button>
          <button
            onClick={() => handleStatusToggle("nowShowing")}
            className={`px-3 py-1.5 md:px-4 md:py-2 rounded-full font-medium transition-all text-sm md:text-base ${
              advancedFilters.status === "nowShowing"
                ? "bg-green-600 text-white shadow-lg"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {t.showingNow}
          </button>
          <button
            onClick={() => handleStatusToggle("comingSoon")}
            className={`px-3 py-1.5 md:px-4 md:py-2 rounded-full font-medium transition-all text-sm md:text-base ${
              advancedFilters.status === "comingSoon"
                ? "bg-blue-500 text-white shadow-lg"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {t.upcoming}
          </button>
        </div>
      </div>

      {/* Category Filters */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <h3 className="font-medium text-gray-700 mb-3 text-sm md:text-base">
          {t.categories}:
        </h3>
        <div className="flex flex-wrap gap-2 md:gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-3 py-1.5 md:px-4 md:py-2 rounded-full font-medium transition-all text-sm md:text-base ${
                selectedCategory === category.id
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Advanced Filters Toggle - Mobile only */}
      {isMobile && (
        <div className="mt-4">
          <button
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className="flex items-center justify-center w-full py-2 text-blue-600 hover:text-blue-800 font-medium"
          >
            <svg
              className={`h-5 w-5 mr-2 transition-transform ${
                showAdvancedFilters ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
            {showAdvancedFilters ? t.showLessFilters : t.showMoreFilters}
          </button>
        </div>
      )}

      {/* Format Filter */}
      {(showAdvancedFilters || !isMobile) && (
        <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-gray-700 text-sm md:text-base">
              {t.advancedFilters}:
            </h3>
            {advancedFilters.formats.length > 0 && (
              <button
                onClick={resetAdvancedFilters}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                {t.resetFilters}
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {formatOptions.map((format) => (
              <button
                key={format}
                onClick={() => handleFormatToggle(format)}
                className={`px-3 py-1.5 md:px-4 md:py-2 rounded-full font-medium transition-colors text-sm md:text-base ${
                  advancedFilters.formats.includes(format)
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {t[format.toLowerCase()] || format}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieFilters;
