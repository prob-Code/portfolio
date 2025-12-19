from flask import Blueprint, request, jsonify
from app.models.contact_model import Contact
from app.extensions import db


contact_bp = Blueprint("contact", __name__)

@contact_bp.route("/", methods=["POST"])
def save_contact():
    data = request.json

    contact = Contact(
        name=data["name"],
        email=data["email"],
        message=data["message"]
    )

    db.session.add(contact)
    db.session.commit()

    return jsonify({"message": "Message sent successfully"}), 201
