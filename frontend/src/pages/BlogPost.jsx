import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchPostBySlug } from "../services/api";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown"; // We might need to install this, or just display raw text for now
// To keep it simple without installing new deps yet, I'll render simple line breaks or html.
// Better: let's stick to simple text rendering for this iteration or install react-markdown. 
// I'll assume we can install it.

const BlogPost = () => {
    const { slug } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPostBySlug(slug)
            .then(data => setPost(data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, [slug]);

    if (loading) return <div className="container" style={{ paddingTop: "120px", color: "#fff", textAlign: "center" }}>Loading article...</div>;
    if (!post) return <div className="container" style={{ paddingTop: "120px", color: "#fff" }}>Post not found.</div>;

    return (
        <div className="container" style={{ paddingTop: "120px", paddingBottom: "80px", minHeight: "100vh" }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ maxWidth: "800px", margin: "0 auto" }}
            >
                <Link to="/blog" style={{ color: "#888", marginBottom: "2rem", display: "inline-block" }}>← Back to Blog</Link>

                <h1 style={{ fontSize: "3rem", lineHeight: "1.2", marginBottom: "1rem" }}>{post.title}</h1>

                <div style={{ display: "flex", gap: "1rem", color: "#666", marginBottom: "3rem", fontSize: "0.9rem" }}>
                    <span>{new Date(post.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    <span>•</span>
                    <span>{post.tags}</span>
                </div>

                <div className="blog-content" style={{ color: "#d4d4d4", lineHeight: "1.8", fontSize: "1.1rem" }}>
                    <ReactMarkdown
                        components={{
                            h1: ({ node, ...props }) => <h1 style={{ marginTop: "2rem", marginBottom: "1rem", color: "#fff" }} {...props} />,
                            h2: ({ node, ...props }) => <h2 style={{ marginTop: "2rem", marginBottom: "1rem", color: "#e5e5e5" }} {...props} />,
                            li: ({ node, ...props }) => <li style={{ marginLeft: "1.5rem" }} {...props} />,
                            p: ({ node, ...props }) => <p style={{ marginBottom: "1rem" }} {...props} />
                        }}
                    >
                        {post.content}
                    </ReactMarkdown>
                </div>
            </motion.div>
        </div>
    );
};

export default BlogPost;
