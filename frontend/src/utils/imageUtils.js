const API_BASE_URL = "http://localhost:8080";

export const resolveImageUrl = (path) => {
  if (!path) return null;

  // already full URL
  if (path.startsWith("http")) return path;

  // relative path from DB
  return API_BASE_URL + path;
};
