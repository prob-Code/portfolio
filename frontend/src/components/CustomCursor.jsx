import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const [isHidden, setIsHidden] = useState(false);

    useEffect(() => {
        const updateMousePosition = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const onMouseEnter = () => setIsHidden(false);
        const onMouseLeave = () => setIsHidden(true);

        document.addEventListener("mousemove", updateMousePosition);
        document.addEventListener("mouseenter", onMouseEnter);
        document.addEventListener("mouseleave", onMouseLeave);

        // Add hover listeners to clickable elements
        const handleLinkHoverEvents = () => {
            const linkHoverStart = () => setIsHovered(true);
            const linkHoverEnd = () => setIsHovered(false);

            document.querySelectorAll("a, button, .clickable").forEach((el) => {
                el.addEventListener("mouseenter", linkHoverStart);
                el.addEventListener("mouseleave", linkHoverEnd);
            });

            // Cleanup function for these specific listeners would be complex dynamically, 
            // so we rely on the MutationObserver approach or just global event delegation below.
        };

        // Better approach: Global delegation for hover detection
        const handleMouseOver = (e) => {
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('a') || e.target.closest('button')) {
                setIsHovered(true);
            } else {
                setIsHovered(false);
            }
        };

        document.addEventListener("mouseover", handleMouseOver);

        return () => {
            document.removeEventListener("mousemove", updateMousePosition);
            document.removeEventListener("mouseenter", onMouseEnter);
            document.removeEventListener("mouseleave", onMouseLeave);
            document.removeEventListener("mouseover", handleMouseOver);
        };
    }, []);

    const variants = {
        default: {
            x: mousePosition.x - 16,
            y: mousePosition.y - 16,
            height: 32,
            width: 32,
            backgroundColor: "transparent",
            border: "2px solid #FF0080",
            transition: {
                type: "spring",
                mass: 0.6
            }
        },
        hover: {
            x: mousePosition.x - 32,
            y: mousePosition.y - 32,
            height: 64,
            width: 64,
            backgroundColor: "rgba(255, 0, 128, 0.2)",
            border: "2px solid #7928CA",
            transition: {
                type: "spring",
                mass: 0.6
            }
        }
    };

    if (isHidden) return null;

    return (
        <motion.div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                zIndex: 9999,
                borderRadius: "50%",
                pointerEvents: "none",
                mixBlendMode: "screen"
            }}
            variants={variants}
            animate={isHovered ? "hover" : "default"}
        >
            {/* Center dot */}
            <div style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "4px",
                height: "4px",
                backgroundColor: "#fff",
                borderRadius: "50%"
            }} />
        </motion.div>
    );
};

export default CustomCursor;
