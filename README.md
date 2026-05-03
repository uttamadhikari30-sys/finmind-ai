# FINMIND AI — Full Stack SaaS

## Structure
```
finmind-saas/
├── backend/          ← Express.js REST API
│   ├── server.js     ← All API routes
│   ├── package.json
│   └── vercel.json   ← Serverless config
├── frontend/         ← Next.js 14 App
│   ├── src/app/
│   │   ├── page.tsx  ← Full SaaS UI
│   │   └── globals.css
│   ├── src/lib/api.ts
│   └── package.json
└── deploy.sh         ← One-command deploy
```

## Deploy in 30 Seconds
```bash
# Login to Vercel
vercel login

# Deploy both
bash deploy.sh
```

## Invite Codes
| Code              | Role          |
|-------------------|---------------|
| EDME-EXEC-2025    | CFO           |
| EDME-CEO-2025     | CEO           |
| EDME-BH-2025      | Business Head |
| EDME-FIN-2025     | Finance Team  |
| FINMIND-DEMO      | Demo (CFO)    |

## API Endpoints
| Method | Path                        | Auth | Description          |
|--------|-----------------------------|------|----------------------|
| POST   | /api/auth/validate-invite   | No   | Validate invite code |
| POST   | /api/auth/invite-login      | No   | Login with invite    |
| GET    | /api/dashboard/kpis         | JWT  | KPI metrics          |
| GET    | /api/reports/pl             | JWT  | P&L statement        |
| GET    | /api/reports/forecast       | JWT  | LE & forecast        |
| GET    | /api/reports/verticals      | JWT  | Vertical performance |
| GET    | /api/bh/performance         | JWT  | BH personal data     |
| POST   | /api/analytics/vpb          | JWT  | VPB calculation      |
| GET    | /api/planning/aop           | JWT  | AOP budget data      |
| POST   | /api/ai/maya                | JWT  | MAYA AI chat         |
| GET    | /api/market/indices         | JWT  | Market indices       |
