// Hàm extractYouTubeId - Trích xuất ID video từ URL YouTube
const extractYouTubeId = (url) => {
  if (!url) return null;

  try {
    const patterns = [
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/i, // youtube.com/watch?v=ID
      /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([a-zA-Z0-9_-]{11})/i, // youtu.be/ID
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/i, // youtube.com/embed/ID
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/v\/([a-zA-Z0-9_-]{11})/i, // youtube.com/v/ID
      /^([a-zA-Z0-9_-]{11})$/i, // Chỉ ID
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return match[1]; // Trả về ID nếu tìm thấy
      }
    }

    return null; // Không tìm thấy ID
  } catch (error) {
    console.error("Error extracting YouTube ID:", error);
    return null;
  }
};

export default extractYouTubeId;
