# FINMIND AI — Edme MIS Platform

A comprehensive financial intelligence and MIS (Management Information System) platform for business heads, CFOs, and executive leadership.

---

## 🚀 Features

- **Executive Dashboard** — Live KPI ticker, revenue charts, AI-powered insights
- **Business Head Portal** — Per-BH P&L, pipeline, hiring, AOP management
- **CFO Console** — Multi-BH pipeline review, edits, approval workflow
- **Revenue Intelligence** — Client-wise breakdown, deal probability, weighted forecasts
- **AOP Planning** — Annual operating plan with costs, hiring, and LE comparisons
- **Market Intelligence** — Live indices, sector performance heatmaps
- **MAYA AI Assistant** — Contextual AI chat embedded across all modules
- **Role-Based Access** — CEO, CFO, Business Head, Investor views

---

## 🏗️ Project Structure

```
finmind-ai/
├── public/
│   └── index.html        ← Full single-page application
├── package.json
├── vercel.json           ← Vercel deployment config
├── .gitignore
└── README.md
```

---

## 💻 Local Development

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Run Locally

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/finmind-ai.git
cd finmind-ai

# Install dependencies
npm install

# Start dev server on http://localhost:3000
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🐙 GitHub Setup

### Step 1: Create a new GitHub repository

1. Go to [github.com/new](https://github.com/new)
2. Name it `finmind-ai`
3. Keep it **Public** (required for free Vercel deployments) or **Private**
4. Do **NOT** initialize with README (you already have one)
5. Click **Create repository**

### Step 2: Push your code

```bash
cd finmind-ai

# Initialize git
git init

# Add all files
git add .

# First commit
git commit -m "🚀 Initial commit: FINMIND AI MIS Platform"

# Add GitHub remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/finmind-ai.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## ▲ Vercel Deployment

### Option A: Deploy via Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com) and sign in (use GitHub account)
2. Click **"Add New Project"**
3. Click **"Import"** next to your `finmind-ai` repository
4. Vercel auto-detects settings from `vercel.json`:
   - **Framework**: Other (static)
   - **Output Directory**: `public`
   - **Build Command**: *(leave empty)*
5. Click **"Deploy"**
6. Your app goes live at `https://finmind-ai.vercel.app` 🎉

### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy from project root
cd finmind-ai
vercel

# Follow prompts:
# ✔ Set up and deploy? Yes
# ✔ Which scope? (your account)
# ✔ Link to existing project? No
# ✔ Project name: finmind-ai
# ✔ Directory: ./
# ✔ Override settings? No

# For production deployment:
vercel --prod
```

---

## 🔄 Continuous Deployment

Once GitHub is connected to Vercel:
- Every push to `main` branch → **auto-deploys to production**
- Every pull request → **preview deployment** with unique URL
- Zero downtime deployments out of the box

---

## 🌐 Custom Domain (Optional)

1. In Vercel dashboard → your project → **Settings → Domains**
2. Add your domain (e.g., `finmind.yourcompany.com`)
3. Follow DNS configuration instructions
4. SSL certificate is automatically provisioned

---

## 🔐 Default Login Credentials

| Role | Username | Password |
|------|----------|----------|
| CEO | Any name | `edme2024` |
| CFO | Any name | `edme2024` |
| Business Head | Select from dropdown | `edme2024` |
| Investor | Any name | `edme2024` |

> ⚠️ Change credentials before production use — this is a demo/prototype platform.

---

## 🛠️ Customization

### Update Branding
- Edit `public/index.html`
- Search for `FINMIND AI` to update the product name
- Search for `Edme` to update the company name
- Update logo in `.sb-logo img`

### Update Financial Data
- All data is in JavaScript objects at the top of `public/index.html`
- Search for `const VD = [` for Vertical/BH data
- Search for `BH_AOP` for AOP planning data

### Environment-Specific Config
Create a `.env.local` file for local overrides (never committed to Git):
```env
# Add any environment variables here
# VITE_API_URL=https://your-api.com
```

---

## 📦 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Vanilla HTML5, CSS3, JavaScript (ES6+) |
| Charts | HTML5 Canvas (custom implementation) |
| Fonts | Google Fonts (Cormorant Garamond, DM Sans, JetBrains Mono) |
| Hosting | Vercel Edge Network |
| CI/CD | Vercel + GitHub Actions (auto) |

---

## 📄 License

Proprietary — Edme Technologies. All rights reserved.
