// Định dạng ngày tháng theo ngôn ngữ
const formatDate = (dateString, language) => {
  if (!dateString) return "";

  const date = new Date(dateString);
  const options =
    language === "vi"
      ? { day: "numeric", month: "long", year: "numeric" } // Ví dụ: "1 tháng 1, 2024"
      : { day: "numeric", month: "short", year: "numeric" }; // Ví dụ: "Jan 1, 2024"

  return date.toLocaleDateString(
    language === "vi" ? "vi-VN" : "en-US",
    options
  );
};

export default formatDate;
