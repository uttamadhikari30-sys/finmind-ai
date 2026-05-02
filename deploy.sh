#!/bin/bash

# ═══════════════════════════════════════════════════════════════
# FINMIND AI — Automated GitHub + Vercel Deployment Setup
# ═══════════════════════════════════════════════════════════════

set -e

BOLD='\033[1m'
BLUE='\033[0;34m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo ""
echo -e "${BOLD}${BLUE}╔══════════════════════════════════════════╗${NC}"
echo -e "${BOLD}${BLUE}║     FINMIND AI — Deployment Setup        ║${NC}"
echo -e "${BOLD}${BLUE}╚══════════════════════════════════════════╝${NC}"
echo ""

# ── Step 1: Validate prerequisites ──────────────────────────────
echo -e "${BOLD}Step 1: Checking prerequisites...${NC}"

if ! command -v git &> /dev/null; then
  echo -e "${RED}✗ Git not found. Install from https://git-scm.com${NC}"
  exit 1
fi
echo -e "${GREEN}✓ Git found: $(git --version)${NC}"

if ! command -v node &> /dev/null; then
  echo -e "${RED}✗ Node.js not found. Install from https://nodejs.org${NC}"
  exit 1
fi
echo -e "${GREEN}✓ Node.js found: $(node --version)${NC}"

if ! command -v npm &> /dev/null; then
  echo -e "${RED}✗ npm not found.${NC}"
  exit 1
fi
echo -e "${GREEN}✓ npm found: $(npm --version)${NC}"
echo ""

# ── Step 2: Get user inputs ──────────────────────────────────────
echo -e "${BOLD}Step 2: Configuration${NC}"
read -p "  Enter your GitHub username: " GITHUB_USER
read -p "  Enter GitHub repo name [finmind-ai]: " REPO_NAME
REPO_NAME=${REPO_NAME:-finmind-ai}
echo ""

# ── Step 3: Initialize git ───────────────────────────────────────
echo -e "${BOLD}Step 3: Initializing Git repository...${NC}"

if [ ! -d ".git" ]; then
  git init
  echo -e "${GREEN}✓ Git initialized${NC}"
else
  echo -e "${YELLOW}ℹ Git already initialized${NC}"
fi

git add .

if git diff --cached --quiet; then
  echo -e "${YELLOW}ℹ Nothing new to commit${NC}"
else
  git commit -m "🚀 FINMIND AI — Initial deployment"
  echo -e "${GREEN}✓ Changes committed${NC}"
fi

git branch -M main
echo ""

# ── Step 4: GitHub remote ───────────────────────────────────────
echo -e "${BOLD}Step 4: Connecting to GitHub...${NC}"

REMOTE_URL="https://github.com/${GITHUB_USER}/${REPO_NAME}.git"

if git remote get-url origin &> /dev/null; then
  git remote set-url origin "$REMOTE_URL"
  echo -e "${YELLOW}ℹ Updated existing remote: ${REMOTE_URL}${NC}"
else
  git remote add origin "$REMOTE_URL"
  echo -e "${GREEN}✓ Remote added: ${REMOTE_URL}${NC}"
fi

echo ""
echo -e "${YELLOW}⚠  ACTION REQUIRED:${NC}"
echo "   Please create the GitHub repository first:"
echo -e "   → ${BOLD}https://github.com/new${NC}"
echo "   → Repository name: ${BOLD}${REPO_NAME}${NC}"
echo "   → DO NOT initialize with README"
echo ""
read -p "   Press ENTER once the GitHub repo is created..."
echo ""

# ── Step 5: Push to GitHub ──────────────────────────────────────
echo -e "${BOLD}Step 5: Pushing to GitHub...${NC}"
git push -u origin main
echo -e "${GREEN}✓ Code pushed to GitHub!${NC}"
echo ""

# ── Step 6: Vercel setup ────────────────────────────────────────
echo -e "${BOLD}Step 6: Setting up Vercel...${NC}"

if ! command -v vercel &> /dev/null; then
  echo "  Installing Vercel CLI..."
  npm install -g vercel
  echo -e "${GREEN}✓ Vercel CLI installed${NC}"
else
  echo -e "${GREEN}✓ Vercel CLI found: $(vercel --version)${NC}"
fi

echo ""
echo -e "${YELLOW}⚠  ACTION REQUIRED: Vercel Login${NC}"
echo "   Running: vercel login"
echo ""
vercel login

echo ""
echo -e "${BOLD}  Deploying to Vercel...${NC}"
echo "  (Answer the prompts: use defaults, link to new project)"
echo ""
vercel --prod

echo ""
echo -e "${BOLD}${GREEN}╔══════════════════════════════════════════╗${NC}"
echo -e "${BOLD}${GREEN}║     🎉 Deployment Complete!               ║${NC}"
echo -e "${BOLD}${GREEN}╚══════════════════════════════════════════╝${NC}"
echo ""
echo -e "  ${BOLD}GitHub Repository:${NC}"
echo -e "  → https://github.com/${GITHUB_USER}/${REPO_NAME}"
echo ""
echo -e "  ${BOLD}Vercel Dashboard:${NC}"
echo -e "  → https://vercel.com/dashboard"
echo ""
echo -e "  ${BOLD}Next Steps:${NC}"
echo "  1. Your live URL is shown above by Vercel"
echo "  2. Connect GitHub to Vercel for auto-deployments:"
echo "     → vercel.com → Project Settings → Git → Connect"
echo "  3. Every push to main now auto-deploys!"
echo ""
echo -e "${YELLOW}  ⚠  Remember to update default passwords before sharing!${NC}"
echo ""
