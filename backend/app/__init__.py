from flask import Flask
from app.config import Config
from app.extensions import db, cors
from app.routes.project_routes import project_bp
from app.routes.contact_routes import contact_bp
from app.routes.blog_routes import blog_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    cors.init_app(app)

    app.register_blueprint(project_bp, url_prefix="/api/projects")
    app.register_blueprint(contact_bp, url_prefix="/api/contact")
    app.register_blueprint(blog_bp, url_prefix="/api/blog")

    @app.route("/")
    def health():
        return {"status": "Backend running successfully"}

    with app.app_context():
        db.create_all()

    return app
