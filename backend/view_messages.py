import sqlite3
import os

# Define path to database
base_dir = os.path.dirname(os.path.abspath(__file__))
db_path = os.path.join(base_dir, "instance", "database.db")

def view_messages():
    if not os.path.exists(db_path):
        print(f"❌ Database not found at: {db_path}")
        return

    print(f"📂 Reading database from: {db_path}\n")
    
    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        
        # Check if table exists
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='contact';")
        if not cursor.fetchone():
            print("❌ 'contact' table does not exist yet. Send a message locally first!")
            return

        # Fetch messages
        cursor.execute("SELECT id, name, email, message, created_at FROM contact ORDER BY created_at DESC")
        rows = cursor.fetchall()
        
        if not rows:
            print("📭 No messages found.")
        else:
            print(f"📬 Found {len(rows)} messages:\n")
            print(f"{'ID':<4} | {'Name':<20} | {'Email':<25} | {'Date':<20} | {'Message'}")
            print("-" * 100)
            for row in rows:
                _id, name, email, message, created_at = row
                # Truncate message for display
                msg_display = (message[:30] + '..') if len(message) > 30 else message
                print(f"{_id:<4} | {name:<20} | {email:<25} | {created_at:<20} | {msg_display}")

        conn.close()
    
    except Exception as e:
        print(f"❌ Error reading database: {e}")

if __name__ == "__main__":
    view_messages()
