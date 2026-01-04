// const API_BASE = "http://localhost:5000/api";

// export const fetchProjects = async () => {
//   try {
//     const res = await fetch(`${API_BASE}/projects/`);
//     if (!res.ok) {
//       throw new Error(`HTTP error! status: ${res.status}`);
//     }
//     return res.json();
//   } catch (error) {
//     console.error("API Fetch Error:", error);
//     throw error;
//   }
// };

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

// Simple in-memory cache
const CACHE = {};
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

const getFromCache = (key) => {
  const item = CACHE[key];
  if (item && Date.now() - item.timestamp < CACHE_DURATION) {
    return item.data;
  }
  return null;
};

const setCache = (key, data) => {
  CACHE[key] = {
    data,
    timestamp: Date.now(),
  };
};

export const fetchProjects = async () => {
  const cached = getFromCache("projects");
  if (cached) return cached;

  const res = await fetch(`${API_BASE}/projects/`);
  if (!res.ok) throw new Error("Failed to fetch projects");
  
  const data = await res.json();
  setCache("projects", data);
  return data;
};

export const sendMessage = async (formData) => {
  const res = await fetch(`${API_BASE}/contact/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  if (!res.ok) throw new Error("Failed to send message");
  return res.json();
};

export const fetchPosts = async () => {
  const cached = getFromCache("blog_posts");
  if (cached) return cached;

  const res = await fetch(`${API_BASE}/blog/`);
  if (!res.ok) throw new Error("Failed to fetch posts");
  
  const data = await res.json();
  setCache("blog_posts", data);
  return data;
};

export const fetchPostBySlug = async (slug) => {
  const key = `post_${slug}`;
  const cached = getFromCache(key);
  if (cached) return cached;

  const res = await fetch(`${API_BASE}/blog/${slug}`);
  if (!res.ok) throw new Error("Failed to fetch post");
  
  const data = await res.json();
  setCache(key, data);
  return data;
};
