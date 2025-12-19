import { useState } from "react";
import { sendMessage } from "../services/api";
import { motion, AnimatePresence } from "framer-motion";
import { FaPaperPlane, FaCheckCircle, FaExclamationCircle, FaEnvelope, FaMapMarkerAlt, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

function Contact() {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [status, setStatus] = useState("idle");

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("sending");
        try {
            await sendMessage(form);
            setStatus("success");
            setForm({ name: "", email: "", message: "" });
            setTimeout(() => setStatus("idle"), 4000);
        } catch (error) {
            console.error(error);
            setStatus("error");
        }
    };

    return (
        <div className="container" style={{
            paddingTop: "120px",
            paddingBottom: "80px",
            minHeight: "100vh",
        }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ textAlign: "center", marginBottom: "4rem" }}
            >
                <h1 className="section-title">Get in <span className="gradient-text">Touch</span></h1>
                <p style={{ color: "#888", fontSize: "1.1rem" }}>
                    I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
                </p>
            </motion.div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "4rem", maxWidth: "1000px", margin: "0 auto" }}>

                {/* Contact Info Side */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    style={{ flex: "1", minWidth: "300px" }}
                >
                    <div style={{ marginBottom: "3rem" }}>
                        <h3 style={{ fontSize: "1.5rem", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "10px" }}>
                            <FaEnvelope style={{ color: "#FF0080" }} /> Contact Info
                        </h3>
                        <p style={{ color: "#a3a3a3", lineHeight: "1.6", marginBottom: "0.5rem" }}>
                            Feel free to reach out directly via email or use the form.
                        </p>
                        <a href="mailto:ojas@example.com" style={{
                            fontSize: "1.2rem", fontWeight: "600", color: "#fff", display: "inline-block", borderBottom: "1px solid #FF0080"
                        }}>
                            ojassatdeve@gmail.com
                        </a>
                    </div>

                    <div style={{ marginBottom: "3rem" }}>
                        <h3 style={{ fontSize: "1.5rem", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "10px" }}>
                            <FaMapMarkerAlt style={{ color: "#7928CA" }} /> Location
                        </h3>
                        <p style={{ color: "#a3a3a3" }}>
                            Nagpur, India <br />Available for Remote Work Worldwide.
                        </p>
                    </div>

                    <div>
                        <h3 style={{ fontSize: "1.5rem", marginBottom: "1.5rem" }}>Socials</h3>
                        <div style={{ display: "flex", gap: "1.5rem" }}>
                            {[
                                { icon: <FaGithub />, link: "https://github.com/prob-Code", color: "#fff" },
                                { icon: <FaLinkedin />, link: "https://www.linkedin.com/in/ojas-satdeve-a424a6289/", color: "#0077B5" },
                                { icon: <FaTwitter />, link: "https://x.com/OjasS89508", color: "#1DA1F2" }
                            ].map((s, i) => (
                                <a
                                    key={i} href={s.link}
                                    style={{
                                        fontSize: "1.8rem", color: "#888", transition: "all 0.3s",
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.color = s.color}
                                    onMouseLeave={(e) => e.currentTarget.style.color = "#888"}
                                >
                                    {s.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Form Side */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="glass-card"
                    style={{ flex: "1.5", minWidth: "350px", padding: "3rem" }}
                >
                    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                        <div style={{ display: "flex", gap: "1.5rem" }}>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.9rem", color: "#aaa" }}>Your Name</label>
                                <input
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                    style={{
                                        width: "100%", padding: "16px", borderRadius: "12px",
                                        border: "1px solid rgba(255,255,255,0.1)", background: "rgba(0,0,0,0.2)",
                                        color: "#fff", outline: "none", transition: "border 0.3s"
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = "#FF0080"}
                                    onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                                />
                            </div>
                        </div>

                        <div>
                            <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.9rem", color: "#aaa" }}>Your Email</label>
                            <input
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                                style={{
                                    width: "100%", padding: "16px", borderRadius: "12px",
                                    border: "1px solid rgba(255,255,255,0.1)", background: "rgba(0,0,0,0.2)",
                                    color: "#fff", outline: "none", transition: "border 0.3s"
                                }}
                                onFocus={(e) => e.target.style.borderColor = "#FF0080"}
                                onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                            />
                        </div>

                        <div>
                            <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.9rem", color: "#aaa" }}>Message</label>
                            <textarea
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                required
                                rows={6}
                                style={{
                                    width: "100%", padding: "16px", borderRadius: "12px",
                                    border: "1px solid rgba(255,255,255,0.1)", background: "rgba(0,0,0,0.2)",
                                    color: "#fff", outline: "none", resize: "none", fontFamily: "inherit", transition: "border 0.3s"
                                }}
                                onFocus={(e) => e.target.style.borderColor = "#FF0080"}
                                onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={status === "sending"}
                            style={{
                                padding: "16px", borderRadius: "12px", border: "none",
                                background: "var(--accent-gradient)", color: "#fff",
                                fontSize: "1rem", fontWeight: "700", cursor: "pointer",
                                marginTop: "1rem", display: "flex", justifyContent: "center", alignItems: "center", gap: "10px",
                                opacity: status === "sending" ? 0.7 : 1, transition: "transform 0.2s"
                            }}
                        >
                            {status === "sending" ? "Sending..." : <>Send Message <FaPaperPlane /></>}
                        </button>

                        <AnimatePresence>
                            {status === "success" && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                                    style={{ marginTop: "1rem", color: "#10b981", display: "flex", alignItems: "center", gap: "8px", fontSize: "0.9rem" }}
                                >
                                    <FaCheckCircle /> Sent! Thank you.
                                </motion.div>
                            )}
                            {status === "error" && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                                    style={{ marginTop: "1rem", color: "#ef4444", display: "flex", alignItems: "center", gap: "8px", fontSize: "0.9rem" }}
                                >
                                    <FaExclamationCircle /> Something went wrong.
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}

export default Contact;
