from app.extensions import db
from app.models.project_model import Project
from app.models.blog_model import BlogPost

def seed_database():
    print("Checking if database needs seeding...")
    
    # 1. Seed Projects
    if Project.query.count() == 0:
        print("Seeding Projects...")
        projects = [
            {
                "title": "AI-Powered Task Manager",
                "description": "A smart task manager that uses AI to prioritize your daily work.",
                "tech_stack": "Python, Flask, React, OpenAI API",
                "github_link": "https://github.com/username/ai-task-manager",
                "live_link": "https://ai-task-manager.demo.com"
            },
            {
                "title": "E-Commerce Dashboard",
                "description": "A comprehensive dashboard for tracking sales, inventory, and user metrics.",
                "tech_stack": "Node.js, Express, MongoDB, Vue.js",
                "github_link": "https://github.com/username/ecommerce-dashboard",
                "live_link": "https://dashboard.demo.com"
            },
            {
                "title": "Personal Portfolio",
                "description": "A responsive portfolio website to showcase my projects and skills.",
                "tech_stack": "React, Tailwind CSS, Framer Motion",
                "github_link": "https://github.com/username/portfolio",
                "live_link": "https://my-portfolio.com"
            },
            {
                "title": "Kwarcs.in",
                "description": "Contributed to the development and enhancement of the Kwarcs.in platform.",
                "tech_stack": "Web Development, Team Contribution",
                "github_link": "#",
                "live_link": "https://kwarcs.in"
            }
        ]
        
        for p_data in projects:
            new_project = Project(
                title=p_data["title"],
                description=p_data["description"],
                tech_stack=p_data["tech_stack"],
                github_link=p_data["github_link"],
                live_link=p_data["live_link"]
            )
            db.session.add(new_project)
    
    # 2. Seed Blogs
    if BlogPost.query.count() == 0:
        print("Seeding Blogs...")
        blogs = [
            {
                "title": "The Future of Web Development: What to Expect in 2025",
                "slug": "future-web-development-2025",
                "summary": "Explore the upcoming trends in web dev, from AI-driven coding assistants to WebAssembly and Edge Computing.",
                "content": """
# The Future of Web Development

The landscape of web development is changing rapidly. As we approach 2025, several key trends are emerging that every developer should watch.

## 1. AI-Driven Development
Artificial Intelligence is no longer just a buzzword. It's becoming an integral part of the development workflow. Tools like GitHub Copilot and ChatGPT are helping developers write code faster and more accurately.

## 2. WebAssembly (Wasm)
WebAssembly is unlocking new possibilities for high-performance web applications. It allows code written in languages like Rust, C++, and Go to run in the browser at near-native speed.

## 3. Server-Side Rendering (SSR) & Edge Computing
Frameworks like Next.js and Remix are pushing the boundaries of SSR, making websites faster and more SEO-friendly. Deploying to the edge ensures low latency for users worldwide.

## Conclusion
Staying ahead in web development means embracing these new technologies. Keep learning and building!
                """,
                "tags": "Web Dev, Trends, AI, Wasm"
            },
            {
                "title": "Mastering React Hooks: A Comprehensive Guide",
                "slug": "mastering-react-hooks",
                "summary": "Deep dive into useState, useEffect, useContext, and custom hooks to write cleaner and more efficient React code.",
                "content": """
# Mastering React Hooks

Hooks introduced a new way to write React components, allowing you to use state and other React features without writing a class.

## useState
The `useState` hook acts as a state variable manager. It returns a pair: the current state value and a function that lets you update it.

```jsx
const [count, setCount] = useState(0);
```

## useEffect
The `useEffect` hook lets you perform side effects in function components, such as fetching data, directly updating the DOM, and timers.

## Custom Hooks
Building your own hooks lets you extract component logic into reusable functions.

## Final Thoughts
Hooks simplify logic reuse and make your components easier to understand.
                """,
                "tags": "React, Javascript, Frontend"
            }
        ]
        
        for b_data in blogs:
            new_blog = BlogPost(
                title=b_data["title"],
                slug=b_data["slug"],
                summary=b_data["summary"],
                content=b_data["content"],
                tags=b_data["tags"]
            )
            db.session.add(new_blog)
            
    try:
        db.session.commit()
        print("Database seeding completed.")
    except Exception as e:
        db.session.rollback()
        print(f"Error seeding database: {e}")
