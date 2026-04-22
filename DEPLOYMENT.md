# 🚀 AI Stockfolio Deployment Guide

This guide explains how to take your project from your local computer to a public URL that anyone can use.

## 🏗️ Option 1: Quick Network Share (Local)
Use this if you want to show someone in the same building.

1. Find your Local IP: `ipconfig` (Windows) or `ifconfig` (Mac/Linux). Look for `IPv4`.
2. Start Frontend: `npm run dev -- --host`
3. Share the link: `http://<your-ip>:5173`

---

## 🌐 Option 2: Professional Cloud Launch (Internet)

### 1. Backend (Python/FastAPI)
Host your logic and API.
- **Recommended**: [Render.com](https://render.com) or [Railway.app](https://railway.app)
- **Steps**:
    1. Push your code to a GitHub repository.
    2. Create a "Web Service" on the hosting site.
    3. Choose current repository.
    4. Set **Environment Variables**:
        - `GEMINI_API_KEY`: (Your Key)
        - `ALPHA_VANTAGE_API_KEY`: (Your Key)
    5. The hosting service will automatically detect the `Dockerfile` and build your server.

### 2. Frontend (React/Vite)
Host your UI.
- **Recommended**: [Vercel](https://vercel.com) (Best for Vite)
- **Steps**:
    1. Connect GitHub to Vercel.
    2. Set **Environment Variable**:
        - `VITE_API_URL`: (The URL of your Backend from step 1, e.g., `https://my-api.onrender.com`)
    3. Deploy.

---

## 🐳 Option 3: Docker Deployment
If you have a private server (VPS).

```bash
docker-compose up -d --build
```
This starts the entire stack (Backend + Frontend) in isolated containers.

---

## 🔒 Security Reminders
- Never commit your `.env` file to GitHub.
- Use HTTPS for the production backend.
- Set `CORS` origins in `main.py` specifically to your frontend URL instead of `["*"]`.
