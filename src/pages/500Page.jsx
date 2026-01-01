import React from "react";

function ErrorServerPage() {
  // Lấy ngôn ngữ từ localStorage
  const language = localStorage.getItem("language") || "en";
  
  // Dữ liệu đa ngôn ngữ
  const translations = {
    en: {
      title: "500 - Internal Server Error",
      description: "We apologize for the inconvenience. Please try again later."
    },
    vi: {
      title: "500 - Lỗi Máy Chủ",
      description: "Chúng tôi xin lỗi vì sự bất tiện này. Vui lòng thử lại sau."
    }
  };
  
  const t = translations[language];

  return (
    <>
      <div className="bg-gray-100 px-2 text-center">
        <div className="h-screen flex flex-col justify-center items-center">
          <h1 className="text-8xl font-extrabold text-red-500">500</h1>
          <p className="text-xl text-gray-800 mt-4">
            {t.description}
          </p>
        </div>
      </div>
    </>
  );
}
export default ErrorServerPage;