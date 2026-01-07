import React from "react";
import Categories from "./Categories.js"; // Import hàm Categories để lấy danh sách thể loại
function CategoryFilter({ selectedCategory, setSelectedCategory, language }) {
  // Lấy danh sách thể loại từ hàm Categories
  const categories = Categories(language);
  return (
    // Section chứa bộ lọc thể loại với background và border
    <section className="py-8 bg-gray-50 border-y border-gray-200">
      <div className="container mx-auto px-4">
        {/* Tiêu đề của bộ lọc */}
        <h3 className="text-center text-lg font-semibold text-gray-700 mb-6">
          {/* Hiển thị tiêu đề theo ngôn ngữ */}
          {language === "vi" ? "CHỌN THỂ LOẠI" : "BROWSE BY CATEGORY"}
        </h3>

        {/* Container cho các nút thể loại */}
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category.id} // Key duy nhất cho mỗi nút
              // Khi click, gọi setSelectedCategory với ID của thể loại
              onClick={() => setSelectedCategory(category.id)}
              // Điều kiện styling: nút được chọn sẽ có màu khác
              className={`px-5 py-2.5 rounded-full font-medium transition-all ${
                selectedCategory === category.id
                  ? "bg-blue-600 text-white shadow-lg" // Style khi được chọn
                  : "bg-white text-gray-700 border border-gray-300 hover:border-blue-600 hover:text-blue-600" // Style mặc định và hover
              }`}
            >
              {/* Hiển thị tên thể loại */}
              {category.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategoryFilter;
