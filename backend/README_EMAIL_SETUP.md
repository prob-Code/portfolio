# Email System Setup

To enable the "real Gmail system" functionality, you need to configure your email credentials.

1.  **Create a `.env` file** in the `backend/` directory.
2.  **Copy the contents** from `.env.sample` into `.env`.
3.  **Update the values**:

    ```env
    MAIL_USERNAME=your-email@gmail.com
    MAIL_PASSWORD=your-google-app-password
    MAIL_DEFAULT_SENDER=your-email@gmail.com
    ADMIN_EMAIL=ojassatdeve@gmail.com
    ```

    *   **MAIL_USERNAME**: Your full Gmail address.
    *   **MAIL_PASSWORD**: Your Google App Password.
        *   Go to [Google Account Security](https://myaccount.google.com/security).
        *   Enable 2-Step Verification if not already enabled.
        *   Search for "App passwords".
        *   Create a new app password (name it "Portfolio Website") and copy the 16-character code.
    *   **ADMIN_EMAIL**: The email where you want to receive contact form messages (e.g., `ojassatdeve@gmail.com`).

4.  **Restart the Backend**:
    Stop the current backend process (Ctrl+C) and start it again:
    ```bash
    cd backend
    python run.py
    ```

## Checking Messages

You can check messages in two ways:
1.  **Email**: You will receive an email for every new submission.
2.  **Database**: Run the view script:
    ```bash
    python view_messages.py
    ```
