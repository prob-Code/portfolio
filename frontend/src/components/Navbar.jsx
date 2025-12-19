import { Link, useLocation } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { useState } from "react";
import confetti from "canvas-confetti";

const Navbar = () => {
    const location = useLocation();
    const [hoveredPath, setHoveredPath] = useState(null);
    const controls = useAnimation();

    const handleLogoClick = (e) => {
        // Prevent default navigation if on home to avoid refresh if it were an <a> with href, 
        // though Link usually handles this. We just want to ensure the effect is the primary action.
        if (location.pathname === "/") {
            e.preventDefault();
        }

        // Trigger spin animation
        controls.start({
            rotate: 360,
            transition: { duration: 0.8, ease: "easeInOut" }
        }).then(() => {
            controls.set({ rotate: 0 }); // Reset rotation without animation
        });

        // Trigger confetti explosion
        const duration = 2 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 10000 };

        const randomInRange = (min, max) => Math.random() * (max - min) + min;

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            // since particles fall down, start a bit higher than random
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
        }, 250);
    };

    const links = [
        { name: "Home", path: "/" },
        { name: "Projects", path: "/projects" },
        { name: "Blog", path: "/blog" },
        { name: "Contact", path: "/contact" }
    ];

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
            style={{
                position: "fixed",
                top: "20px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "auto",
                zIndex: 1000,
                x: "-50%" // Centering with motion
            }}
        >
            <div style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "8px 8px",
                background: "rgba(15, 15, 15, 0.8)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "50px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
            }}>
                <Link
                    to="/"
                    onClick={handleLogoClick}
                    style={{
                        padding: "10px 20px",
                        fontWeight: "800",
                        letterSpacing: "-1px",
                        color: "#fff",
                        marginRight: "10px",
                        display: "flex",
                        alignItems: "center",
                        textDecoration: "none"
                    }}
                >
                    <motion.div animate={controls} style={{ display: "inline-block" }}>
                        O.<span style={{ color: "#FF0080" }}>S</span>
                    </motion.div>
                </Link>

                <div style={{ display: "flex", position: "relative" }}>
                    {links.map((link) => {
                        const isActive = location.pathname === link.path;
                        const isHovered = hoveredPath === link.path;

                        return (
                            <Link
                                key={link.path}
                                to={link.path}
                                onMouseEnter={() => setHoveredPath(link.path)}
                                onMouseLeave={() => setHoveredPath(null)}
                                style={{
                                    position: "relative",
                                    padding: "10px 20px",
                                    fontSize: "0.95rem",
                                    fontWeight: "500",
                                    color: isActive ? "#fff" : "#a3a3a3",
                                    transition: "color 0.3s",
                                    zIndex: 1,
                                    textDecoration: "none"
                                }}
                            >
                                <span style={{ position: "relative", zIndex: 2 }}>{link.name}</span>

                                {isActive && (
                                    <motion.div
                                        layoutId="navbar-indicator"
                                        style={{
                                            position: "absolute",
                                            inset: 0,
                                            background: "rgba(255, 255, 255, 0.1)",
                                            borderRadius: "50px",
                                            border: "1px solid rgba(255, 255, 255, 0.1)",
                                            zIndex: 0
                                        }}
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}

                                {isHovered && !isActive && (
                                    <motion.div
                                        layoutId="navbar-hover"
                                        style={{
                                            position: "absolute",
                                            inset: 0,
                                            background: "rgba(255, 255, 255, 0.05)",
                                            borderRadius: "50px",
                                            zIndex: 0
                                        }}
                                        transition={{ duration: 0.2 }}
                                    />
                                )}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;
