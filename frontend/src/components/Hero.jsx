import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import avatar from "../assets/avatar.png";

const Hero = () => {
    return (
        <section className="hero-section">
            {/* Background Animated Gradient */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3]
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                style={{
                    position: "absolute",
                    top: "20%",
                    right: "10%",
                    width: "500px",
                    height: "500px",
                    background: "radial-gradient(circle, rgba(121,40,202,0.2) 0%, rgba(0,0,0,0) 70%)",
                    zIndex: -1,
                    borderRadius: "50%"
                }}
            />
            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.2, 0.4, 0.2]
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                }}
                style={{
                    position: "absolute",
                    bottom: "10%",
                    left: "10%",
                    width: "600px",
                    height: "600px",
                    background: "radial-gradient(circle, rgba(255, 0, 128, 0.15) 0%, rgba(0,0,0,0) 70%)",
                    zIndex: -1,
                    borderRadius: "50%"
                }}
            />

            <div className="container hero-container">

                {/* Left Side: Text */}
                <div className="hero-text-content" style={{ flex: "1", minWidth: "300px" }}>
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h2 style={{
                            fontSize: "1.2rem",
                            color: "#aaa",
                            marginBottom: "1rem",
                            textTransform: "uppercase",
                            letterSpacing: "3px",
                            display: "flex",
                            alignItems: "center",
                            gap: "10px"
                        }}>
                            Full Stack Dev & ML Enthusiast
                        </h2>

                        <h1 style={{
                            fontSize: "clamp(3rem, 5vw, 5rem)",
                            lineHeight: "1.1",
                            marginBottom: "1.5rem",
                            fontWeight: "800"
                        }}>
                            Hi, I'm <span className="gradient-text">Ojas Satdeve</span><br />
                            <span style={{ fontSize: "0.5em", color: "#fff" }}>Turning Ideas Into Reality.</span>
                        </h1>

                        <p style={{
                            fontSize: "1.1rem",
                            color: "#a3a3a3",
                            maxWidth: "500px",
                            marginBottom: "2.5rem",
                            lineHeight: "1.8"
                        }}>
                            I build accessible, pixel-perfect, and performant web experiences.
                            Specialized in the MERN stack and Machine Learning integrations.
                        </p>

                        <div className="cta-buttons" style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
                            <Link to="/projects" className="btn-primary">View Projects</Link>
                            <Link to="/contact" style={{
                                fontWeight: "600",
                                color: "#fff",
                                position: "relative",
                                padding: "5px 0"
                            }}>
                                Contact Me
                                <motion.div
                                    style={{
                                        position: "absolute", bottom: 0, left: 0, right: 0, height: "1px", background: "#fff"
                                    }}
                                    whileHover={{ width: "100%" }}
                                    initial={{ width: "100%" }}
                                />
                            </Link>
                        </div>

                        <div className="social-links" style={{ marginTop: "4rem", display: "flex", gap: "2rem", fontSize: "1.5rem", color: "#fff" }}>
                            {[
                                { icon: <FaGithub />, color: "#fff", href: "https://github.com/prob-Code" },
                                { icon: <FaLinkedin />, color: "#0077B5", href: "https://www.linkedin.com/in/ojas-satdeve-a424a6289/" },
                                { icon: <FaTwitter />, color: "#1DA1F2", href: "https://x.com/OjasS89508" }
                            ].map((social, idx) => (
                                <motion.a
                                    key={idx}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ y: -5, color: social.color }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                    style={{ color: "#888", transition: "color 0.3s" }}
                                >
                                    {social.icon}
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Right Side: Image */}
                <div style={{ flex: "1", display: "flex", justifyContent: "center", minWidth: "300px" }}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        style={{ position: "relative" }}
                    >
                        {/* Floating Animation Wrapper */}
                        <motion.div
                            animate={{ y: [-10, 10, -10] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <div style={{
                                position: "absolute",
                                inset: "-20px",
                                background: "var(--accent-gradient)",
                                borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
                                filter: "blur(40px)",
                                opacity: 0.4,
                                zIndex: -1,
                                animation: "morph 8s ease-in-out infinite"
                            }}></div>

                            <img
                                src={avatar}
                                alt="Developer Avatar"
                                style={{
                                    width: "100%",
                                    maxWidth: "450px",
                                    borderRadius: "24px",
                                    border: "1px solid rgba(255,255,255,0.1)",
                                    boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
                                    background: "rgba(255,255,255,0.01)" // subtle backing
                                }}
                            />
                        </motion.div>
                    </motion.div>
                </div>

            </div>

            {/* CSS for Morph Animation */}
            <style>{`
        @keyframes morph {
          0% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
          100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
        }
      `}</style>
        </section>
    );
};

export default Hero;
