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

    # Send Notification Email
    try:
        send_email_notification(contact)
    except Exception as e:
        print(f"Failed to send email: {e}")
        # We don't fail the request because the message is saved in DB
        # But in a real app you might want to alert the user.

    return jsonify({"message": "Message sent successfully"}), 201

def send_email_notification(contact):
    import smtplib
    from email.mime.text import MIMEText
    from email.mime.multipart import MIMEMultipart
    from flask import current_app

    smtp_server = current_app.config['MAIL_SERVER']
    smtp_port = current_app.config['MAIL_PORT']
    smtp_username = current_app.config['MAIL_USERNAME']
    smtp_password = current_app.config['MAIL_PASSWORD']
    admin_email = current_app.config['ADMIN_EMAIL']
    sender_email = current_app.config['MAIL_DEFAULT_SENDER'] or smtp_username

    if not smtp_username or not smtp_password:
        print("Email credentials not set. Skipping email.")
        return

    # Create the email
    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = admin_email
    msg['Subject'] = f"New Contact Message from {contact.name}"

    body = f"""
    You have received a new message from your portfolio website.
    
    Name: {contact.name}
    Email: {contact.email}
    
    Message:
    {contact.message}
    """
    msg.attach(MIMEText(body, 'plain'))

    # Connect to SMTP server
    try:
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()
        server.login(smtp_username, smtp_password)
        text = msg.as_string()
        server.sendmail(sender_email, admin_email, text)
        server.quit()
        print("Email sent successfully")
    except Exception as e:
        raise e
