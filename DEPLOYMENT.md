# Portfolio Deployment Guide

## 1. Deploy the Backend (Render)

Render is great for Python/Flask apps.

1.  **Push your code to GitHub**.
    *   Make sure `backend/requirements.txt` is up to date (`pip freeze > backend/requirements.txt`).
    *   Ensure `backend/run.py` exists (this is your entry point).

2.  **Create a New Web Service on Render**:
    *   Sign up at [render.com](https://render.com).
    *   Click "New +", select **Web Service**.
    *   Connect your GitHub repository.

3.  **Configure Settings**:
    *   **Root Directory**: `backend`
    *   **Runtime**: Python 3
    *   **Build Command**: `pip install -r requirements.txt`
    *   **Start Command**: `gunicorn run:app` (You may need to add `gunicorn` to your requirements.txt first!)
    *   **Environment Variables**:
        *   `FLASK_ENV`: production
        *   `SECRET_KEY`: (Generate a random string)

4.  **Deploy**: Click "Create Web Service". Render will give you a URL (e.g., `https://my-portfolio-api.onrender.com`).

---

## 2. Deploy the Frontend (Vercel)

Vercel is optimizing for Vite/React.

1.  **Update API URL**:
    *   In `frontend/src/services/api.js`, change `http://localhost:5000/api` to your new Render URL (e.g., `https://my-portfolio-api.onrender.com/api`).
    *   *Better approach*: Use environment variables (`import.meta.env.VITE_API_URL`).

2.  **Create Project on Vercel**:
    *   Sign up at [vercel.com](https://vercel.com).
    *   "Add New Project" -> Import from GitHub.

3.  **Configure Settings**:
    *   **Framework Preset**: Vite
    *   **Root Directory**: `frontend`
    *   **Environment Variables**:
        *   `VITE_API_URL`: `https://your-backend-app.onrender.com/api`

4.  **Deploy**: Click "Deploy". Vercel will build your site and give you a live URL (e.g., `https://ojas-portfolio.vercel.app`).

## 3. Final Polish
*   Once deployed, go to your live site.
*   Test the Contact Form (ensure the backend receives it).
*   Test the Blog (ensure it fetches from the backend).
