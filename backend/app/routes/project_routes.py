from flask import Blueprint, request, jsonify
from app.models.project_model import Project
from app.extensions import db

project_bp = Blueprint("projects", __name__)

@project_bp.route("/", methods=["GET"])
def get_projects():
    projects = Project.query.all()
    data = []

    for p in projects:
        data.append({
            "id": p.id,
            "title": p.title,
            "description": p.description,
            "tech_stack": p.tech_stack,
            "github_link": p.github_link,
            "live_link": p.live_link
        })

    return jsonify(data), 200, {'Cache-Control': 'public, max-age=3600'}

@project_bp.route("/", methods=["POST"])
def add_project():
    data = request.json

    project = Project(
        title=data["title"],
        description=data["description"],
        tech_stack=data.get("tech_stack"),
        github_link=data.get("github_link"),
        live_link=data.get("live_link")
    )

    db.session.add(project)
    db.session.commit()

    return jsonify({"message": "Project added successfully"}), 201
