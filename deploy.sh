#!/bin/bash
# ═══════════════════════════════════════════════════════
# FINMIND AI — Full Stack Auto Deploy Script
# Deploys Backend (API) + Frontend (Next.js) to Vercel
# ═══════════════════════════════════════════════════════
set -e

BOLD='\033[1m'; GREEN='\033[0;32m'; BLUE='\033[0;34m'; YELLOW='\033[1;33m'; NC='\033[0m'

echo -e "${BOLD}${BLUE}"
echo "╔══════════════════════════════════════════════════════╗"
echo "║     FINMIND AI — Full Stack Deployment               ║"
echo "║     Backend (Express API) + Frontend (Next.js)       ║"
echo "╚══════════════════════════════════════════════════════╝"
echo -e "${NC}"

# Check Vercel CLI
if ! command -v vercel &>/dev/null; then
  echo "Installing Vercel CLI..."
  npm install -g vercel
fi

# ── 1. Deploy Backend ────────────────────────────────────
echo -e "\n${BOLD}Step 1: Deploying Backend API...${NC}"
cd backend
vercel --prod --yes --name finmind-ai-api
BACKEND_URL=$(vercel --prod --yes --name finmind-ai-api 2>/dev/null | grep "https://" | tail -1 || echo "")
echo -e "${GREEN}✓ Backend deployed!${NC}"
cd ..

# ── 2. Set backend URL in frontend env ──────────────────
echo -e "\n${BOLD}Step 2: Configuring Frontend...${NC}"
if [ -n "$BACKEND_URL" ]; then
  echo "NEXT_PUBLIC_API_URL=$BACKEND_URL" > frontend/.env.production
  echo -e "${GREEN}✓ API URL configured: $BACKEND_URL${NC}"
else
  echo -e "${YELLOW}⚠ Could not auto-detect backend URL. Using default.${NC}"
  echo "NEXT_PUBLIC_API_URL=https://finmind-ai-api.vercel.app" > frontend/.env.production
fi

# ── 3. Deploy Frontend ───────────────────────────────────
echo -e "\n${BOLD}Step 3: Deploying Frontend...${NC}"
cd frontend
vercel --prod --yes --name finmind-ai
FRONTEND_URL=$(vercel --prod --yes --name finmind-ai 2>/dev/null | grep "https://" | tail -1 || echo "https://finmind-ai.vercel.app")
cd ..

echo -e "\n${BOLD}${GREEN}"
echo "╔══════════════════════════════════════════════════════╗"
echo "║     🎉 DEPLOYMENT COMPLETE!                          ║"
echo "╚══════════════════════════════════════════════════════╝"
echo -e "${NC}"
echo -e "${BOLD}🌐 Frontend (App):${NC}  $FRONTEND_URL"
echo -e "${BOLD}⚡ Backend (API):${NC}   https://finmind-ai-api.vercel.app"
echo ""
echo -e "${BOLD}🔑 Invite Codes:${NC}"
echo "  EDME-EXEC-2025   → CFO Access"
echo "  EDME-CEO-2025    → CEO Access"
echo "  EDME-BH-2025     → Business Head"
echo "  EDME-FIN-2025    → Finance Team"
echo "  FINMIND-DEMO     → Demo (CFO view)"
echo ""
echo -e "${BOLD}📡 API Endpoints:${NC}"
echo "  POST /api/auth/validate-invite"
echo "  POST /api/auth/invite-login"
echo "  GET  /api/dashboard/kpis"
echo "  GET  /api/reports/pl"
echo "  GET  /api/reports/forecast"
echo "  GET  /api/reports/verticals"
echo "  GET  /api/bh/performance"
echo "  POST /api/analytics/vpb"
echo "  GET  /api/planning/aop"
echo "  POST /api/ai/maya"
echo ""
