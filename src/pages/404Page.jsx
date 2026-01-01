import React from "react";
import { Link } from "react-router-dom";

function NotFoundPage() {
  // Lấy ngôn ngữ từ localStorage
  const language = localStorage.getItem("language") || "en";

  // Dữ liệu đa ngôn ngữ
  const translations = {
    en: {
      title: "Page not found",
      description: "Sorry, we couldn't find the page you're looking for.",
      button: "Go back home",
    },
    vi: {
      title: "Không tìm thấy trang",
      description:
        "Xin lỗi, chúng tôi không thể tìm thấy trang bạn đang tìm kiếm.",
      button: "Quay về trang chủ",
    },
  };

  const t = translations[language];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="mb-8">
          {/* 404 màu đỏ */}
          <h2 className="mt-6 text-6xl font-extrabold text-red-600">404</h2>

          <p className="mt-2 text-3xl font-bold text-gray-900">{t.title}</p>

          <p className="mt-2 text-sm text-gray-600">{t.description}</p>
        </div>
        <div className="mt-8">
          <Link
            to="/"
            className="
              inline-flex items-center
              px-5 py-2.5
              text-white
              bg-blue-600
              rounded-md
              hover:bg-blue-700
              transition
            "
          >
            {t.button}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
