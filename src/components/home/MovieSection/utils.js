// utils.js
export const getTitle = (movie) => {
  return movie.title || "";
};

export const getGenreText = (genre, language) => {
  if (!genre) return "";

  if (typeof genre === "string") return genre;
  if (typeof genre === "object") {
    return genre[language] || genre["vi"] || genre["en"] || "";
  }
  return genre;
};

export const getYouTubeEmbedUrl = (youtubeId) => {
  if (!youtubeId) return null;

  const params = new URLSearchParams({
    autoplay: "1",
    mute: "0",
    rel: "0",
    modestbranding: "1",
    showinfo: "0",
    controls: "1",
    iv_load_policy: "3",
    origin: window.location.origin,
    playsinline: "1",
    disablekb: "0",
    fs: "1",
  });

  return `https://www.youtube-nocookie.com/embed/${youtubeId}?${params.toString()}`;
};
