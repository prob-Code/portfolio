from app.extensions import db
from datetime import datetime

class BlogPost(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    slug = db.Column(db.String(200), unique=True, nullable=False)
    summary = db.Column(db.String(500), nullable=False)
    content = db.Column(db.Text, nullable=False) # Markdown content
    tags = db.Column(db.String(200)) # Comma separated
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
