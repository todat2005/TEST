import React from "react";

function CategoryFilter({ selectedCategory, setSelectedCategory, t }) {
  const categories = [
    { id: "all", label: t.all || "All" },
    { id: "action", label: "Action" },
    { id: "comedy", label: "Comedy" },
    { id: "drama", label: "Drama" },
    { id: "animation", label: "Animation" },
    { id: "family", label: "Family" },
    { id: "sci-fi", label: "Sci-Fi" },
    { id: "horror", label: "Horror" }
  ];

  return (
    <section className="py-8 bg-gray-50 border-y border-gray-200">
      <div className="container mx-auto px-4">
        <h3 className="text-center text-lg font-semibold text-gray-700 mb-6">
          {localStorage.getItem("language") === "vi" ? "CHỌN THỂ LOẠI" : "BROWSE BY CATEGORY"}
        </h3>
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-5 py-2.5 rounded-full font-medium transition-all ${
                selectedCategory === category.id
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white text-gray-700 border border-gray-300 hover:border-blue-600 hover:text-blue-600"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategoryFilter;