import { useEffect, useState } from "react";
import { fetchProjects } from "../services/api";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaCode, FaServer, FaBrain, FaLayerGroup } from "react-icons/fa";

const categories = [
    { id: "all", label: "All", icon: <FaLayerGroup /> },
    { id: "frontend", label: "Frontend", icon: <FaCode /> },
    { id: "backend", label: "Backend", icon: <FaServer /> },
    { id: "ai", label: "AI & ML", icon: <FaBrain /> }
];

function Projects() {
    const [projects, setProjects] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState("all");

    useEffect(() => {
        fetchProjects()
            .then((data) => {
                setProjects(data);
                setFilteredProjects(data);
            })
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        if (activeCategory === "all") {
            setFilteredProjects(projects);
            return;
        }

        const filtered = projects.filter(p => {
            const stack = p.tech_stack.toLowerCase();
            if (activeCategory === "frontend") return stack.includes("react") || stack.includes("vue") || stack.includes("tailwind") || stack.includes("css");
            if (activeCategory === "backend") return stack.includes("node") || stack.includes("flask") || stack.includes("python") || stack.includes("mongo") || stack.includes("database");
            if (activeCategory === "ai") return stack.includes("ai") || stack.includes("ml") || stack.includes("python") || stack.includes("openai");
            return false;
        });
        setFilteredProjects(filtered);
    }, [activeCategory, projects]);

    return (
        <div className="container page-container">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ textAlign: "center", marginBottom: "4rem" }}
            >
                <h1 className="section-title" style={{ marginBottom: "1rem" }}>
                    Featured <span className="gradient-text">Projects</span>
                </h1>
                <p style={{ color: "#a3a3a3", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto" }}>
                    A collection of my recent work, spanning from full-stack web applications to machine learning models.
                </p>
            </motion.div>

            {/* Category Filter */}
            <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginBottom: "3rem", flexWrap: "wrap" }}>
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={activeCategory === cat.id ? "glass-card" : ""}
                        style={{
                            padding: "10px 24px",
                            borderRadius: "50px",
                            border: activeCategory === cat.id ? "1px solid #FF0080" : "1px solid transparent",
                            background: activeCategory === cat.id ? "rgba(255, 0, 128, 0.1)" : "transparent",
                            color: activeCategory === cat.id ? "#fff" : "#a3a3a3",
                            cursor: "pointer",
                            fontSize: "1rem",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            transition: "all 0.3s ease",
                            fontWeight: activeCategory === cat.id ? "600" : "400"
                        }}
                    >
                        {cat.icon} {cat.label}
                    </button>
                ))}
            </div>

            {loading ? (
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "200px" }}>
                    <div style={{ width: "40px", height: "40px", border: "3px solid rgba(255,255,255,0.1)", borderTopColor: "#FF0080", borderRadius: "50%", animation: "spin 1s linear infinite" }}></div>
                    <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
                </div>
            ) : (
                <motion.div
                    layout
                    className="projects-grid"
                >
                    <AnimatePresence>
                        {filteredProjects.map((p) => (
                            <motion.div
                                layout
                                key={p.id}
                                className="glass-card"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                style={{ padding: "0", overflow: "hidden", display: "flex", flexDirection: "column", height: "100%" }}
                            >
                                {/* Decorative Header Gradient */}
                                <div style={{
                                    height: "8px",
                                    background: "linear-gradient(90deg, #FF0080 0%, #7928CA 100%)"
                                }}></div>

                                <div style={{ padding: "2.5rem 2rem", flex: "1" }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                                        <h3 style={{ fontSize: "1.75rem", fontWeight: "700", lineHeight: "1.3" }}>{p.title}</h3>
                                        {/* Optional: Add an icon or type indicator here */}
                                    </div>

                                    <p style={{ color: "#a3a3a3", marginBottom: "2rem", lineHeight: "1.7", fontSize: "1.05rem" }}>
                                        {p.description}
                                    </p>

                                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
                                        {p.tech_stack.split(",").map((tech, i) => (
                                            <span key={i} style={{
                                                fontSize: "0.8rem",
                                                padding: "6px 14px",
                                                borderRadius: "20px",
                                                background: "rgba(121, 40, 202, 0.15)",
                                                border: "1px solid rgba(121, 40, 202, 0.3)",
                                                color: "#e0e0e0",
                                                fontWeight: "500"
                                            }}>
                                                {tech.trim()}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div style={{
                                    padding: "1.5rem 2rem",
                                    borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                                    background: "rgba(0,0,0,0.2)",
                                    display: "flex",
                                    gap: "1.5rem",
                                    marginTop: "auto"
                                }}>
                                    <a
                                        href={p.github_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.95rem", fontWeight: "600", color: "#fff", transition: "color 0.2s" }}
                                        onMouseEnter={(e) => e.target.style.color = "#FF0080"}
                                        onMouseLeave={(e) => e.target.style.color = "#fff"}
                                    >
                                        <FaGithub size={18} /> Source Code
                                    </a>
                                    {p.live_link && (
                                        <a
                                            href={p.live_link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.95rem", fontWeight: "600", color: "#FF0080", transition: "opacity 0.2s" }}
                                            onMouseEnter={(e) => e.target.style.opacity = "0.8"}
                                            onMouseLeave={(e) => e.target.style.opacity = "1"}
                                        >
                                            <FaExternalLinkAlt size={16} /> Live Demo
                                        </a>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            )}

            {!loading && filteredProjects.length === 0 && (
                <div style={{ textAlign: "center", padding: "4rem", color: "#666" }}>
                    <p>No projects found in this category yet.</p>
                </div>
            )}
        </div>
    );
}

export default Projects;
