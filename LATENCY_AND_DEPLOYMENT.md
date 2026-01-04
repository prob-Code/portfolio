# Portfolio Optimization and Deployment Guide

## 1. Latency Optimization (Solved & Next Steps)

### What We Implemented
To address the slow loading times, we have implemented **Client-Side Caching** in the frontend.
- **Before:** Every time you visited the Projects or Blog page, the browser made a network request to the backend. This was slow if the backend was "sleeping" (Cold Start) or if the network was laggy.
- **Now:** The website stores the Projects and Blog Posts in your browser's memory for **1 hour**.
  - If you visit "Projects", go to "Home", and come back to "Projects", it loads **instantly** without hitting the backend.
  - This significantly improves the internal navigation experience.

### The "Cold Start" Issue (Render Free Tier)
Your backend is hosted on Render's Free Tier.
- **Problem:** Render spins down servers after 15 minutes of inactivity. The first request after this sleep takes 30-60 seconds to "wake up" the server.
- **Solution 1 (Free):** Use a "Keep-Alive" service.
  - Register your backend URL (`https://your-app-name.onrender.com/`) with a free cron job service (like `cron-job.org`).
  - Set it to ping your URL every **14 minutes**.
  - We have verified a `/` health check route exists on your backend for this purpose.
- **Solution 2 (Paid):** Upgrade to Render's "Starter" plan (approx. $7/month), which keeps services active 24/7.

---

## 2. Manual Redeployment Guide

Sometimes you need to manually rebuild your site if updates don't reflect automatically.

### Frontend (Vercel)
1.  Go to your **Vercel Dashboard**.
2.  Select your **Portfolio Project**.
3.  Go to the **Deployments** tab.
4.  Find the verified/latest deployment (or the one you want to redeploy).
5.  Click the **three dots (...)** menu next to it.
6.  Select **Redeploy**.
7.  Check "Redeploy existing build cache" (faster) or uncheck it (clean build) and confirm.

### Backend (Render)
1.  Go to your **Render Dashboard**.
2.  Select your **Web Service** (the Flask backend).
3.  Click the **Manual Deploy** button (usually top right).
4.  Select **Deploy latest commit**.
    - This forces Render to pull the latest code from GitHub and restart the server.
    - Reference this if you update `seeder.py` or change environment variables.

---

## 3. Custom Domain Configuration (Vercel)

To link a custom domain (e.g., `www.yourname.com`) to your portfolio:

1.  **Buy a Domain**: Purchase from Namecheap, GoDaddy, Google Domains, etc.
2.  **Vercel Settings**:
    - Go to your Project on Vercel -> **Settings** -> **Domains**.
    - Enter your domain (e.g., `yourname.com`) and click **Add**.
3.  **DNS Configuration**:
    - Vercel will show you **DNS Records** to add to your domain provider (usually an A record and a CNAME record).
    - Log in to your Domain Registrar (Namecheap/GoDaddy).
    - Go to **DNS Management**.
    - Add the records exactly as Vercel shows.
    - **A Record**: Host `@`, Value `76.76.21.21` (Vercel IP).
    - **CNAME**: Host `www`, Value `cname.vercel-dns.com`.
4.  **Verification**: Wait (can take minutes to hours). Vercel will eventually show two green checks, meaning SSL is active and the site is live.
