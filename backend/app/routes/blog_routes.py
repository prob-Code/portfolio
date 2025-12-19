from flask import Blueprint, jsonify, request
from app.models.blog_model import BlogPost
from app.extensions import db

blog_bp = Blueprint("blog", __name__)

@blog_bp.route("/", methods=["GET"])
def get_posts():
    posts = BlogPost.query.order_by(BlogPost.created_at.desc()).all()
    data = []
    for p in posts:
        data.append({
            "id": p.id,
            "title": p.title,
            "slug": p.slug,
            "summary": p.summary,
            "tags": p.tags,
            "created_at": p.created_at.isoformat()
        })
    return jsonify(data)

@blog_bp.route("/<slug>", methods=["GET"])
def get_post(slug):
    post = BlogPost.query.filter_by(slug=slug).first_or_404()
    return jsonify({
        "id": post.id,
        "title": post.title,
        "slug": post.slug,
        "summary": post.summary,
        "content": post.content,
        "tags": post.tags,
        "created_at": post.created_at.isoformat()
    })

@blog_bp.route("/", methods=["POST"])
def create_post():
    data = request.json
    # Basic validation skipped for speed, assume admin usage
    post = BlogPost(
        title=data["title"],
        slug=data["slug"],
        summary=data["summary"],
        content=data["content"],
        tags=data.get("tags", "")
    )
    db.session.add(post)
    db.session.commit()
    return jsonify({"message": "Post created"}), 201
