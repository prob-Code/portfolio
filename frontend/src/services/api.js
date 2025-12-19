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

export const fetchProjects = async () => {
  const res = await fetch(`${API_BASE}/projects/`);
  return res.json();
};

export const sendMessage = async (formData) => {
  const res = await fetch(`${API_BASE}/contact/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  return res.json();
};

export const fetchPosts = async () => {
  const res = await fetch(`${API_BASE}/blog/`);
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
};

export const fetchPostBySlug = async (slug) => {
  const res = await fetch(`${API_BASE}/blog/${slug}`);
  if (!res.ok) throw new Error("Failed to fetch post");
  return res.json();
};
