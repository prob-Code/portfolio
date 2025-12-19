import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

const ParallaxText = ({ children, offset = 50 }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);

    return (
        <motion.div ref={ref} style={{ y, opacity }}>
            {children}
        </motion.div>
    );
};

export default ParallaxText;
