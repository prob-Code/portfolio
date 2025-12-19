import json
import urllib.request
import urllib.error

BASE_URL = "http://127.0.0.1:5000/api/projects/"

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
    }
]

def seed_projects():
    print("🌱 Seeding projects...")
    for project in projects:
        try:
            req = urllib.request.Request(
                BASE_URL,
                data=json.dumps(project).encode('utf-8'),
                headers={'Content-Type': 'application/json'},
                method='POST'
            )
            with urllib.request.urlopen(req) as response:
                if response.status == 201:
                    print(f"✅ Added: {project['title']}")
                else:
                    print(f"❌ Failed to add: {project['title']} (Status: {response.status})")
        except urllib.error.URLError as e:
            print(f"❌ Error adding {project['title']}: {e}")
            if hasattr(e, 'read'):
                print(e.read().decode())

def verify_projects():
    print("\n🧐 Verifying projects via GET API...")
    try:
        req = urllib.request.Request(BASE_URL, method='GET')
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode())
            print(f"✨ Found {len(data)} projects in database:")
            for p in data:
                print(f" - [{p['id']}] {p['title']} ({p['tech_stack']})")
    except urllib.error.URLError as e:
        print(f"❌ Error verifying projects: {e}")

if __name__ == "__main__":
    seed_projects()
    verify_projects()
