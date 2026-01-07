import React from "react";

function ResultsHeader({
  t, // Translation object chứa các chuỗi ngôn ngữ
  isMobile, // Boolean - xác định thiết bị mobile
  viewType, // String - loại view hiện tại: "grid" hoặc "list"
  setViewType, // Function - hàm thay đổi viewType
  filteredMovies, // Array - danh sách phim đã lọc
  searchTerm, // String - từ khóa tìm kiếm
  selectedCategory, // String - danh mục đã chọn
  advancedFilters, // Object - chứa các bộ lọc nâng cao
  categories, // Array - danh sách danh mục
  resetAllFilters, // Function - hàm reset tất cả bộ lọc
}) {
  return (
    <>
      {/* ========== PHẦN 1: THỐNG KÊ KẾT QUẢ VÀ TRẠNG THÁI BỘ LỌC ========== */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Hiển thị số lượng kết quả và nút xóa bộ lọc */}
          <p className="text-gray-600 text-sm md:text-base">
            {/* Số lượng phim tìm thấy */}
            <span className="font-semibold">{filteredMovies.length}</span>{" "}
            {t.resultsFound}
            {/* Nút xóa bộ lọc - chỉ hiển thị khi có bộ lọc đang active */}
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

          {/* ========== PILLS HIỂN THỊ BỘ LỌC ACTIVE (CHỈ TRÊN MOBILE) ========== */}
          {isMobile &&
            (searchTerm ||
              selectedCategory !== "all" ||
              advancedFilters.status !== "all" ||
              advancedFilters.formats.length > 0) && (
              <div className="flex flex-wrap gap-2">
                {/* Pills cho từ khóa tìm kiếm */}
                {searchTerm && (
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                    {t.searchPlaceholder.split("...")[0]}: {searchTerm}
                  </span>
                )}

                {/* Pills cho trạng thái phim (đang chiếu/sắp chiếu) */}
                {advancedFilters.status !== "all" && (
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                    {advancedFilters.status === "nowShowing"
                      ? t.showingNow
                      : t.upcoming}
                  </span>
                )}

                {/* Pills cho danh mục đã chọn */}
                {selectedCategory !== "all" && (
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                    {categories.find((c) => c.id === selectedCategory)?.label}
                  </span>
                )}

                {/* Pills cho các định dạng phim (2D, 3D, IMAX...) */}
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
    </>
  );
}
export default ResultsHeader;
