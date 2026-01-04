from app import create_app
from app.extensions import db
from app.models.project_model import Project

app = create_app()

def add_kwarcs_project():
    with app.app_context():
        # Check if it already exists to avoid duplicates
        existing = Project.query.filter_by(title="Kwarcs.in").first()
        if existing:
            print("Project 'Kwarcs.in' already exists.")
            return

        print("Adding 'Kwarcs.in' project...")
        new_project = Project(
            title="Kwarcs.in",
            description="Contributed to the development and enhancement of the Kwarcs.in platform.",
            tech_stack="Web Development, Team Contribution",
            github_link="#",
            live_link="https://kwarcs.in"
        )
        db.session.add(new_project)
        try:
            db.session.commit()
            print("Successfully added 'Kwarcs.in'.")
        except Exception as e:
            db.session.rollback()
            print(f"Error adding project: {e}")

if __name__ == "__main__":
    add_kwarcs_project()
