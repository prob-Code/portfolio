import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor = () => {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
    const springX = useSpring(cursorX, springConfig);
    const springY = useSpring(cursorY, springConfig);

    const [isHovered, setIsHovered] = useState(false);
    const [isHidden, setIsHidden] = useState(false);

    useEffect(() => {
        const moveCursor = (e) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleMouseEnter = () => setIsHidden(false);
        const handleMouseLeave = () => setIsHidden(true);

        const handleMouseOver = (e) => {
            if (
                e.target.tagName === "A" ||
                e.target.tagName === "BUTTON" ||
                e.target.closest("a") ||
                e.target.closest("button") ||
                e.target.classList.contains("clickable")
            ) {
                setIsHovered(true);
            } else {
                setIsHovered(false);
            }
        };

        window.addEventListener("mousemove", moveCursor);
        document.addEventListener("mouseenter", handleMouseEnter);
        document.addEventListener("mouseleave", handleMouseLeave);
        document.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            document.removeEventListener("mouseenter", handleMouseEnter);
            document.removeEventListener("mouseleave", handleMouseLeave);
            document.removeEventListener("mouseover", handleMouseOver);
        };
    }, [cursorX, cursorY]);

    // We only animate the scale/size via variants, typically much cheaper than position
    const variants = {
        default: {
            height: 32,
            width: 32,
            backgroundColor: "transparent",
            border: "2px solid #FF0080",
        },
        hover: {
            height: 64,
            width: 64,
            backgroundColor: "rgba(255, 0, 128, 0.2)",
            border: "2px solid #7928CA",
        },
    };

    if (isHidden) return null;

    return (
        <>
            <motion.div
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    x: springX,
                    y: springY,
                    translateX: "-50%",
                    translateY: "-50%",
                    zIndex: 9999,
                    borderRadius: "50%",
                    pointerEvents: "none",
                    mixBlendMode: "screen",
                }}
                variants={variants}
                animate={isHovered ? "hover" : "default"}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
                {/* Center dot remains static relative to the ring */}
                <div
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "4px",
                        height: "4px",
                        backgroundColor: "#fff",
                        borderRadius: "50%",
                    }}
                />
            </motion.div>
        </>
    );
};

export default CustomCursor;
