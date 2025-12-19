import { useRef } from "react";
import { motion } from "framer-motion";
import { FaReact, FaNodeJs, FaPython, FaDatabase, FaJs, FaGitAlt } from "react-icons/fa";
import { SiFramer, SiMysql, SiExpo } from "react-icons/si";

const icons = [
    { icon: <FaReact />, color: "#61DAFB", label: "React" },
    { icon: <FaNodeJs />, color: "#339933", label: "Node" },
    { icon: <FaPython />, color: "#3776AB", label: "Python" },
    { icon: <FaDatabase />, color: "#FFF", label: "SQL" },
    { icon: <FaJs />, color: "#F7DF1E", label: "JS" },
    { icon: <SiFramer />, color: "#0055FF", label: "Motion" },
    { icon: <SiMysql />, color: "#4479A1", label: "MySQL" },
    { icon: <SiExpo />, color: "#FFF", label: "Expo" }
];

const TechPlayground = () => {
    const containerRef = useRef(null);

    return (
        <div
            ref={containerRef}
            className="container"
            style={{
                position: "relative",
                height: "200px",
                margin: "4rem auto",
                overflow: "hidden",
                border: "1px dashed rgba(255,255,255,0.1)",
                borderRadius: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}
        >
            <p style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: "rgba(255,255,255,0.1)",
                fontSize: "4rem",
                fontWeight: "800",
                pointerEvents: "none",
                textTransform: "uppercase"
            }}>
                Playground
            </p>

            {icons.map((item, i) => {
                const angle = (i / icons.length) * 2 * Math.PI;
                const radiusX = 300; // Wider spread horizontally
                const radiusY = 80;  // Elliptical shape

                return (
                    <motion.div
                        key={i}
                        drag
                        dragConstraints={containerRef}
                        dragElastic={0.2}
                        whileHover={{ scale: 1.2, cursor: "grab", zIndex: 100 }}
                        whileDrag={{ scale: 1.1, cursor: "grabbing", zIndex: 100 }}
                        initial={{
                            x: Math.cos(angle) * radiusX,
                            y: Math.sin(angle) * radiusY
                        }}
                        animate={{
                            x: [
                                Math.cos(angle) * radiusX,
                                Math.cos(angle + Math.PI / 2) * radiusX,
                                Math.cos(angle + Math.PI) * radiusX,
                                Math.cos(angle + 1.5 * Math.PI) * radiusX,
                                Math.cos(angle + 2 * Math.PI) * radiusX
                            ],
                            y: [
                                Math.sin(angle) * radiusY,
                                Math.sin(angle + Math.PI / 2) * radiusY,
                                Math.sin(angle + Math.PI) * radiusY,
                                Math.sin(angle + 1.5 * Math.PI) * radiusY,
                                Math.sin(angle + 2 * Math.PI) * radiusY
                            ],
                            rotate: [0, 10, -10, 0] // Subtle tilt variance
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear",
                            times: [0, 0.25, 0.5, 0.75, 1]
                        }}
                        style={{
                            position: "absolute",
                            fontSize: "2.5rem",
                            color: item.color,
                            padding: "1rem",
                            background: "rgba(255,255,255,0.03)",
                            borderRadius: "50%",
                            border: "1px solid rgba(255,255,255,0.05)",
                            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                            backdropFilter: "blur(5px)",
                            zIndex: 10
                        }}
                    >
                        {item.icon}
                    </motion.div>
                );
            })}
        </div>
    );
};

export default TechPlayground;
