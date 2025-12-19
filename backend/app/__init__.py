from flask import Flask
from app.config import Config
from app.extensions import db, cors
from app.routes.project_routes import project_bp
from app.routes.contact_routes import contact_bp
from app.routes.blog_routes import blog_bp

import os

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Ensure instance directory exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass
    
    # Also ensure the specific folder for our config path if different (backend/instance)
    # Config uses: os.path.join(BASE_DIR, "../instance/database.db")
    # BASE_DIR is app/, so ../instance is backend/instance.
    instance_path = os.path.join(os.path.abspath(os.path.dirname(__file__)), "../instance")
    if not os.path.exists(instance_path):
        os.makedirs(instance_path)

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
