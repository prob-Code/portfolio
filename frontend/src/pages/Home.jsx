import Hero from "../components/Hero";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCode, FaServer, FaMobileAlt, FaDatabase, FaBrain, FaTimes, FaCheck } from "react-icons/fa";
import me from "../assets/me.jpg";
import ParallaxText from "../components/ParallaxText";
import TechPlayground from "../components/TechPlayground";
import VelocityScroll from "../components/VelocityScroll";

const skills = [
    {
        id: "frontend",
        title: "Frontend Development",
        icon: <FaCode />,
        shortDesc: "React, Vue, Tailwind, Framer Motion. Crisp & responsive.",
        fullDesc: "I craft pixel-perfect, accessible, and highly performant user interfaces. My expertise goes beyond just 'making it look good'—I focus on micro-interactions, state management (Redux, Zustand), and optimizing for Core Web Vitals.",
        tech: ["React.js", "Vue.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Next.js"]
    },
    {
        id: "backend",
        title: "Backend Engineering",
        icon: <FaServer />,
        shortDesc: "Node.js, Python, Flask, Go. Robust & scalable.",
        fullDesc: "Building the backbone of applications is my forte. I design scalable API architectures (REST & GraphQL), handle authentication (OAuth, JWT), and ensure security best practices are met from day one.",
        tech: ["Node.js", "Python", "Flask", "GoLang", "Docker", "Microservices"]
    },
    {
        id: "database",
        title: "Database Management",
        icon: <FaDatabase />,
        shortDesc: "SQL, Postgres, Mongo, Redis. Optimized storage.",
        fullDesc: "Data is the new oil. I engineer optimized database schemas that scale. Whether it's complex relational queries in PostgreSQL or high-speed caching with Redis, I ensure your data is safe and instantly accessible.",
        tech: ["PostgreSQL", "MongoDB", "Redis", "Supabase", "Prisma", "SQL Optimization"]
    },
    {
        id: "ml",
        title: "Machine Learning",
        icon: <FaBrain />,
        shortDesc: "TensorFlow, PyTorch, AI Models. Smart predictions.",
        fullDesc: "Bridge the gap between software and AI. I build and deploy machine learning models that solve real-world problems, from Natural Language Processing (NLP) chatbots to Computer Vision systems.",
        tech: ["TensorFlow", "PyTorch", "Scikit-Learn", "OpenCV", "Pandas", "Start-of-the-art Models"]
    },
    {
        id: "mobile",
        title: "Mobile Development",
        icon: <FaMobileAlt />,
        shortDesc: "React Native, Flutter. Native-like experiences.",
        fullDesc: "I bring web capabilities to mobile. Using React Native and Flutter, I build cross-platform applications that feel truly native, with smooth 60fps animations and offline-first capabilities.",
        tech: ["React Native", "Expo", "Flutter", "iOS & Android", "Native Modules"]
    }
];

const Home = () => {
    const [selectedId, setSelectedId] = useState(null);

    return (
        <div>
            <Hero />

            {/* About / Personal Photo Section */}
            <section className="container" style={{ padding: "4rem 20px", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "3rem" }}>
                <div style={{ flex: 1, minWidth: "300px" }}>
                    <ParallaxText offset={30}>
                        <h2 className="section-title" style={{ textAlign: "left", marginBottom: "1.5rem" }}>About <span className="gradient-text">Me</span></h2>
                    </ParallaxText>

                    <ParallaxText offset={10}>
                        <p style={{ fontSize: "1.1rem", color: "#a3a3a3", lineHeight: "1.8", marginBottom: "1.5rem" }}>
                            Hello! I'm <strong>Ojas Satdeve</strong>, a passionate developer who loves building things that live on the internet.
                            My interest in web development started back when I decided to try editing custom Tumblr themes — turns out hacking together HTML & CSS is fun!
                        </p>
                    </ParallaxText>

                    <ParallaxText offset={-10}>
                        <p style={{ fontSize: "1.1rem", color: "#a3a3a3", lineHeight: "1.8" }}>
                            Fast-forward to today, and I've had the privilege of working on various projects, from <strong>AI-driven applications</strong> to <strong>immersive web experiences</strong>.
                            My main focus these days is building accessible, inclusive products and digital experiences for a variety of clients.
                        </p>
                    </ParallaxText>
                </div>

                {/* Personal Photo Holder */}
                <div style={{ flex: 1, display: "flex", justifyContent: "center", minWidth: "300px" }}>
                    <motion.div
                        initial={{ rotate: 5, opacity: 0 }}
                        whileInView={{ rotate: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        style={{
                            position: "relative",
                            width: "300px",
                            height: "300px",
                        }}
                    >
                        <div style={{
                            position: "absolute", inset: 0, border: "2px solid #FF0080", borderRadius: "20px", transform: "translate(20px, 20px)", zIndex: 0
                        }}></div>
                        <div style={{
                            position: "relative", width: "100%", height: "100%", backgroundColor: "#222", borderRadius: "20px", overflow: "hidden", zIndex: 1
                        }}>
                            <img
                                src={me}
                                alt="Ojas Satdeve"
                                style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.9 }}
                            />
                        </div>
                    </motion.div>
                </div>
            </section>



            {/* Interactive Tech Playground */}
            <TechPlayground />

            {/* Velocity Scroll Text */}
            <div style={{ padding: "4rem 0", background: "transparent", overflow: "hidden" }}>
                <VelocityScroll baseVelocity={-0.5}>SELECTED WORKS WEB DEVELOPMENT AI SOLUTIONS</VelocityScroll>
                <div style={{ height: "20px" }}></div>
                <VelocityScroll baseVelocity={0.5}>CREATIVE CODING INTERACTIVE DESIGN FULL STACK</VelocityScroll>
            </div>

            <section className="container" style={{ padding: "4rem 20px" }}>
                <h2 className="section-title">My Expertise</h2>
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                    gap: "2rem"
                }}>
                    {skills.map((skill) => (
                        <motion.div
                            layoutId={skill.id}
                            key={skill.id}
                            className="glass-card"
                            onClick={() => setSelectedId(skill.id)}
                            whileHover={{ y: -8, cursor: "pointer", borderColor: "rgba(255, 0, 128, 0.5)" }}
                            style={{ textAlign: "center" }}
                        >
                            <motion.div
                                layoutId={`icon-${skill.id}`}
                                style={{ fontSize: "2.5rem", marginBottom: "1rem", color: "#fff" }}
                            >
                                {skill.icon}
                            </motion.div>
                            <motion.h3
                                layoutId={`title-${skill.id}`}
                                style={{ marginBottom: "0.5rem" }}
                            >
                                {skill.title}
                            </motion.h3>
                            <p style={{ color: "#888", fontSize: "0.9rem" }}>{skill.shortDesc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Expanded Modal Overlay */}
            <AnimatePresence>
                {selectedId && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedId(null)}
                        style={{
                            position: "fixed",
                            inset: 0,
                            background: "rgba(0,0,0,0.6)",
                            backdropFilter: "blur(8px)",
                            zIndex: 999,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "20px"
                        }}
                    >
                        {skills.map(skill => (
                            skill.id === selectedId && (
                                <motion.div
                                    layoutId={selectedId}
                                    key={skill.id}
                                    className="glass-card"
                                    onClick={(e) => e.stopPropagation()} // Prevent click from closing
                                    style={{
                                        width: "100%",
                                        maxWidth: "600px",
                                        background: "#0f0f0f",
                                        border: "1px solid rgba(255, 255, 255, 0.1)",
                                        position: "relative",
                                        overflow: "hidden"
                                    }}
                                >
                                    {/* Decorative Gradient Blob */}
                                    <div style={{
                                        position: "absolute", top: "-50px", right: "-50px", width: "150px", height: "150px",
                                        background: "var(--accent-gradient)", filter: "blur(50px)", opacity: 0.3, borderRadius: "50%"
                                    }} />

                                    <button
                                        onClick={() => setSelectedId(null)}
                                        style={{
                                            position: "absolute", top: "20px", right: "20px",
                                            background: "rgba(255,255,255,0.1)", border: "none",
                                            color: "#fff", padding: "8px", borderRadius: "50%",
                                            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center"
                                        }}
                                    >
                                        <FaTimes />
                                    </button>

                                    <div style={{ padding: "2rem" }}>
                                        <motion.div
                                            layoutId={`icon-${skill.id}`}
                                            style={{ fontSize: "3rem", marginBottom: "1rem", color: "#FF0080" }}
                                        >
                                            {skill.icon}
                                        </motion.div>

                                        <motion.h3
                                            layoutId={`title-${skill.id}`}
                                            style={{ fontSize: "2rem", marginBottom: "1rem" }}
                                        >
                                            {skill.title}
                                        </motion.h3>

                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.2 }}
                                            style={{ color: "#a3a3a3", lineHeight: "1.7", fontSize: "1.1rem", marginBottom: "2rem" }}
                                        >
                                            {skill.fullDesc}
                                        </motion.p>

                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 }}
                                        >
                                            <h4 style={{ fontSize: "0.9rem", color: "#666", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "1rem" }}>
                                                Technologies
                                            </h4>
                                            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                                                {skill.tech.map((t, i) => (
                                                    <span key={i} style={{
                                                        display: "flex", alignItems: "center", gap: "8px",
                                                        background: "rgba(255,255,255,0.05)",
                                                        padding: "8px 16px", borderRadius: "20px",
                                                        fontSize: "0.9rem", border: "1px solid rgba(255,255,255,0.05)"
                                                    }}>
                                                        <FaCheck size={10} color="#FF0080" /> {t}
                                                    </span>
                                                ))}
                                            </div>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            )
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Home;
