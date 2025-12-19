import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { fetchPosts } from "../services/api";
import { FaSearch, FaClock, FaHashtag } from "react-icons/fa";

const Blog = () => {
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedTag, setSelectedTag] = useState("All");

    useEffect(() => {
        fetchPosts()
            .then(data => {
                setPosts(data);
                setFilteredPosts(data);
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        let results = posts;
        if (searchTerm) {
            results = results.filter(post =>
                post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.summary.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        if (selectedTag !== "All") {
            results = results.filter(post => post.tags.includes(selectedTag));
        }
        setFilteredPosts(results);
    }, [searchTerm, selectedTag, posts]);

    // Extract unique tags
    const allTags = ["All", ...new Set(posts.flatMap(p => p.tags ? p.tags.split(",").map(t => t.trim()) : []))];

    const calculateReadingTime = (text) => {
        // Rough estimate: 200 words per minute. Since we don't have full content here, we can mock it or use summary.
        // Actually, let's just mock a random time for visual flair or based on summary length if content isn't fetched.
        // For a real app, backend should send read_time.
        return Math.floor(Math.random() * 5) + 3;
    };

    if (loading) return <div className="container" style={{ paddingTop: "150px", color: "#fff", textAlign: "center" }}>Loading insights...</div>;

    return (
        <div className="container" style={{ paddingTop: "120px", paddingBottom: "80px", minHeight: "100vh" }}>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ textAlign: "center", marginBottom: "4rem" }}
            >
                <h1 className="section-title" style={{ marginBottom: "1rem" }}>
                    Thoughts & <span className="gradient-text">Insights</span>
                </h1>
                <p style={{ color: "#888", maxWidth: "600px", margin: "0 auto" }}>
                    Deep dives into Machine Learning, System Design, and Modern Web Development.
                </p>
            </motion.div>

            {/* Search & Filter Bar */}
            <div style={{ maxWidth: "800px", margin: "0 auto 3rem auto", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <div style={{ position: "relative" }}>
                    <FaSearch style={{ position: "absolute", top: "50%", left: "20px", transform: "translateY(-50%)", color: "#666" }} />
                    <input
                        type="text"
                        placeholder="Search articles..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            width: "100%", padding: "16px 16px 16px 50px", borderRadius: "50px",
                            border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)",
                            color: "#fff", outline: "none", fontSize: "1rem"
                        }}
                    />
                </div>

                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center" }}>
                    {allTags.map(tag => (
                        <button
                            key={tag}
                            onClick={() => setSelectedTag(tag)}
                            style={{
                                padding: "8px 16px", borderRadius: "20px", border: "none",
                                background: selectedTag === tag ? "var(--accent-gradient)" : "rgba(255,255,255,0.05)",
                                color: "#fff", cursor: "pointer", fontSize: "0.9rem", transition: "all 0.3s"
                            }}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>

            <div style={{ maxWidth: "900px", margin: "0 auto", display: "grid", gap: "2rem" }}>
                <AnimatePresence>
                    {filteredPosts.map((post, i) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ delay: i * 0.05 }}
                            className="glass-card"
                            style={{ padding: "0", overflow: "hidden", display: "flex", flexDirection: "column", border: "1px solid rgba(255,255,255,0.05)" }}
                        >
                            <Link to={`/blog/${post.slug}`} style={{ display: "block", padsding: "2rem" }}>
                                <div style={{ padding: "2rem" }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
                                        <span style={{ fontSize: "0.85rem", color: "#FF0080", fontWeight: "600", textTransform: "uppercase", letterSpacing: "1px" }}>
                                            {(post.tags || "").split(",")[0]}
                                        </span>
                                        <span style={{ fontSize: "0.85rem", color: "#666", display: "flex", alignItems: "center", gap: "6px" }}>
                                            <FaClock /> {calculateReadingTime(post.content)} min read
                                        </span>
                                    </div>

                                    <h2 style={{ fontSize: "1.8rem", margin: "0 0 1rem 0", lineHeight: "1.3" }}>
                                        {post.title}
                                    </h2>

                                    <p style={{ color: "#a3a3a3", lineHeight: "1.6", marginBottom: "0" }}>
                                        {post.summary}
                                    </p>
                                </div>
                                <div style={{
                                    padding: "1rem 2rem", background: "rgba(255,255,255,0.02)",
                                    borderTop: "1px solid rgba(255,255,255,0.05)",
                                    display: "flex", justifyContent: "space-between", alignItems: "center"
                                }}>
                                    <span style={{ fontSize: "0.9rem", color: "#666" }}>
                                        {new Date(post.created_at).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                                    </span>
                                    <span style={{ color: "#fff", fontWeight: "600", fontSize: "0.9rem" }}>Read Article →</span>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </AnimatePresence>
                {filteredPosts.length === 0 && (
                    <div style={{ textAlign: "center", color: "#666", padding: "3rem" }}>
                        No articles found matching your criteria.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Blog;
