const Categories = (language = "vi") => {
  return [
    { id: "all", label: language === "vi" ? "Tất cả" : "All" }, // "Tất cả" - mặc định dùng "All" nếu không có bản dịch
    { id: "action", label: language === "vi" ? "Hành động" : "Action" }, // Hành động
    { id: "comedy", label: language === "vi" ? "Hài" : "Comedy" }, // Hài
    { id: "drama", label: language === "vi" ? "Chính kịch" : "Drama" }, // Chính kịch
    { id: "animation", label: language === "vi" ? "Hoạt Hình" : "Animation" }, // Hoạt hình
    { id: "family", label: language === "vi" ? "Gia đình" : "Family" }, // Gia đình
    {
      id: "sci-fi",
      label: language === "vi" ? "Khoa học viễn tượng" : "Sci-Fi",
    }, // Khoa học viễn tưởng
    { id: "horror", label: language === "vi" ? "Kinh dị" : "Horror" }, // Kinh dị
    { id: "romance", label: language === "vi" ? "Lãng mạn" : "Romance" }, // Lãng mạn
    { id: "thriller", label: language === "vi" ? "Giật gân" : "Thriller" }, // Giật gân
    { id: "fantasy", label: language === "vi" ? "Giả tưởng" : "Fantasy" }, // Giả tưởng
    { id: "mystery", label: language === "vi" ? "Bí ẩn" : "Mystery" }, // Bí ẩn
    { id: "adventure", label: language === "vi" ? "Phiêu lưu" : "Adventure" }, // Phiêu lưu
    { id: "musical", label: language === "vi" ? "Nhạc kịch" : "Musical" }, // Nhạc kịch
    { id: "war", label: language === "vi" ? "Chiến tranh" : "War" }, // Chiến tranh
    { id: "history", label: language === "vi" ? "Lịch sử" : "History" }, // Lịch sử
    { id: "sport", label: language === "vi" ? "Thể thao" : "Sport" }, // Thể thao
    {
      id: "superhero",
      label: language === "vi" ? "Siêu anh hùng" : "SuperHero",
    }, // Siêu anh hùng
    { id: "disaster", label: language === "vi" ? "Thảm họa" : "Disaster" }, // Thảm họa
  ];
};

export default Categories;
