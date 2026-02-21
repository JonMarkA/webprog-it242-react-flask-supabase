# Individual Task — Personal Profile / Portfolio

**Course:** IT242 — Web Programming  
**Repository:** [webprog-it242-react-flask-supabase](https://github.com/JonMarkA/webprog-it242-react-flask-supabase)  
**Folder:** `individual-task/`

---

## Overview

This project is a personal profile and portfolio web application developed as an individual task for IT242. It presents the developer's background, skills, and projects in a clean, interactive interface. The application is built using a modern full-stack architecture with a React/Vue.js frontend, a Flask backend hosted on Render, a Supabase database for dynamic data, and deployed via Vercel.

---

## Tech Stack

| Layer       | Technology              |
|-------------|-------------------------|
| Frontend    | React, Vue.js           |
| Backend     | Flask (Python)          |
| Database    | Supabase (PostgreSQL)   |
| Deployment  | Vercel (frontend), Render (backend) |

---

## Project Structure

```
individual-task/
├── frontend/         # React / Vue.js frontend application
│   ├── src/
│   ├── public/
│   └── package.json
├── backend/          # Flask backend API
│   ├── app.py
│   └── requirements.txt
└── README.md
```

> **Note:** Adjust the structure above to match your actual folder layout if it differs.

---

## Prerequisites

Before setting up the project locally, make sure the following are installed on your machine:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [Python](https://www.python.org/) (v3.10 or higher)
- [Git](https://git-scm.com/)
- A [Supabase](https://supabase.com/) account and project

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/JonMarkA/webprog-it242-react-flask-supabase.git
cd webprog-it242-react-flask-supabase/individual-task
```

---

### 2. Supabase Configuration

1. Log in to [https://supabase.com](https://supabase.com) and open your project.
2. Navigate to **Project Settings → API** and copy your:
   - **Project URL**
   - **Anon/Public Key**
3. These will be used as environment variables in both the frontend and backend.

---

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend/` directory:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_API_URL=http://localhost:5000
```

Start the development server:

```bash
npm run dev
```

The frontend will be available at `http://localhost:5173` by default.

---

### 4. Backend Setup

```bash
cd ../backend
python -m venv venv
```

Activate the virtual environment:

- **Windows:** `venv\Scripts\activate`
- **macOS/Linux:** `source venv/bin/activate`

Install dependencies:

```bash
pip install -r requirements.txt
```

Create a `.env` file in the `backend/` directory:

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_key
```

Run the Flask server:

```bash
flask run
```

The backend API will be available at `http://localhost:5000`.

---

## Deployment

### Frontend — Vercel

1. Push your code to GitHub.
2. Go to [https://vercel.com](https://vercel.com) and import the repository.
3. Set the **Root Directory** to `individual-task/frontend`.
4. Add your environment variables (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_API_URL`) in the Vercel project settings.
5. Deploy.

### Backend — Render

1. Go to [https://render.com](https://render.com) and create a new **Web Service**.
2. Connect your GitHub repository and set the **Root Directory** to `individual-task/backend`.
3. Set the **Build Command** to `pip install -r requirements.txt`.
4. Set the **Start Command** to `flask run --host=0.0.0.0`.
5. Add your environment variables (`SUPABASE_URL`, `SUPABASE_KEY`) in the Render dashboard.
6. Deploy.

---

## Environment Variables Summary

| Variable                  | Used In   | Description                        |
|---------------------------|-----------|------------------------------------|
| `VITE_SUPABASE_URL`       | Frontend  | Supabase project URL               |
| `VITE_SUPABASE_ANON_KEY`  | Frontend  | Supabase public/anon key           |
| `VITE_API_URL`            | Frontend  | URL of the Flask backend           |
| `SUPABASE_URL`            | Backend   | Supabase project URL               |
| `SUPABASE_KEY`            | Backend   | Supabase public/anon key           |

> ⚠️ Never commit `.env` files to your repository. Add them to `.gitignore`.

---

## Author

**JonMarkA**  
IT242 — Web Programming  
[GitHub Profile](https://github.com/JonMarkA)
