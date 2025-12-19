import requests
import json

BASE_URL = "http://127.0.0.1:5000/api/blog/"

posts = [
    {
        "title": "Why I Switched from PyTorch to JAX",
        "slug": "pytorch-to-jax",
        "summary": "Exploring the benefits of Just-In-Time compilation and automatic differentiation in JAX for high-performance ML research.",
        "content": """
# Introduction
PyTorch has been the gold standard for deep learning research, but JAX is changing the game.

## What is JAX?
JAX is Autograd and XLA, brought together for high-performance machine learning research.

## Why Switch?
1. **Speed**: XLA compilation makes it incredibly fast.
2. **Functional Purity**: Easy to parallelize across TPUs.
3. **Ecosystem**: Flax and Haiku are maturing rapidly.

## Conclusion
While PyTorch is still easier for debugging, JAX offers performance benefits that are hard to ignore for large-scale model training.
        """,
        "tags": "Machine Learning, JAX, Python, AI"
    },
    {
        "title": "Optimizing React for Performance",
        "slug": "optimizing-react",
        "summary": "Deep dive into useMemo, useCallback, and React Server Components to build lightning fast web apps.",
        "content": """
# React Performance 101
React is fast by default, but complex apps can suffer from re-render hell.

## Key Techniques
* **Memoization**: Use `React.memo` for expensive components.
* **Code Splitting**: Lazy load routes.
* **Virtualization**: Use `react-window` for long lists.

## The Future: React Server Components
RSC allows us to move heavy dependencies to the server, reducing bundle size significantly.
        """,
        "tags": "React, Frontend, Web Dev, Performance"
    },
    {
        "title": "Understanding Transformers in NLP",
        "slug": "understanding-transformers",
        "summary": "A beginner-friendly guide to Self-Attention mechanisms and the architecture behind GPT-4.",
        "content": """
# Attention is All You Need
The Transformer architecture revolutionized NLP.

## The Encoder-Decoder Structure
Original transformers had both, but models like GPT use only the Decoder stack.

## Self-Attention
This mechanism allows the model to weigh the importance of different words in a sentence relative to each other, handling long-range dependencies better than RNNs.
        """,
        "tags": "NLP, AI, Deep Learning, Transformers"
    }
]

def seed_blog():
    print("✍️ Seeding blog posts...")
    for post in posts:
        try:
            res = requests.post(BASE_URL, json=post)
            if res.status_code == 201:
                print(f"✅ Created: {post['title']}")
            else:
                print(f"❌ Failed ({res.status_code}): {post['title']}")
        except Exception as e:
            print(f"❌ Error: {e}")

if __name__ == "__main__":
    seed_blog()
