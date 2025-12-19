from app import create_app
from app.extensions import db
from app.models.project_model import Project
from app.models.blog_model import BlogPost
import os

app = create_app()

print(f"Database Path: {app.config['SQLALCHEMY_DATABASE_URI']}")

with app.app_context():
    try:
        project_count = Project.query.count()
        blog_count = BlogPost.query.count()
        print(f"Projects count: {project_count}")
        print(f"Blogs count: {blog_count}")
    except Exception as e:
        print(f"Error reading database: {e}")
