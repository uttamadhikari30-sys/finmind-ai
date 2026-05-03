const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || 'finmind_secret_2025';

app.use(cors({ origin: '*' }));
app.use(express.json());

// ── In-memory DB (replace with real DB in production) ──────────────────────
const USERS = [
  { id: 1, name: 'Praveen Ladia',        email: 'cfo@edme.in',     password: bcrypt.hashSync('edme2024', 10), role: 'cfo',     vertical: null },
  { id: 2, name: 'Sanjay Radhakrishnan', email: 'ceo@edme.in',     password: bcrypt.hashSync('edme2024', 10), role: 'ceo',     vertical: null },
  { id: 3, name: 'Finance Team',         email: 'finance@edme.in', password: bcrypt.hashSync('edme2024', 10), role: 'finance', vertical: null },
  { id: 4, name: 'Anurag Mishra',        email: 'anurag@edme.in',  password: bcrypt.hashSync('edme2024', 10), role: 'bh',      vertical: 'v_anurag' },
  { id: 5, name: 'Asheesh Handa',        email: 'asheesh@edme.in', password: bcrypt.hashSync('edme2024', 10), role: 'bh',      vertical: 'v_asheesh' },
  { id: 6, name: 'Jigar Parikh',         email: 'jigar@edme.in',   password: bcrypt.hashSync('edme2024', 10), role: 'bh',      vertical: 'v_jigar' },
  { id: 7, name: 'Neha Yadav',           email: 'neha@edme.in',    password: bcrypt.hashSync('edme2024', 10), role: 'bh',      vertical: 'v_neha' },
  { id: 8, name: 'Nikhil Mhatre',        email: 'nikhil@edme.in',  password: bcrypt.hashSync('edme2024', 10), role: 'bh',      vertical: 'v_nikhil' },
  { id: 9, name: 'Saurabh Sharma',       email: 'saurabh@edme.in', password: bcrypt.hashSync('edme2024', 10), role: 'bh',      vertical: 'v_saurabh' },
];

// Invite codes
const INVITE_CODES = {
  'EDME-EXEC-2025': { role: 'cfo',     label: 'CFO Access'           },
  'EDME-CEO-2025':  { role: 'ceo',     label: 'CEO Access'           },
  'EDME-BH-2025':   { role: 'bh',      label: 'Business Head Access' },
  'EDME-FIN-2025':  { role: 'finance', label: 'Finance Team Access'  },
  'FINMIND-DEMO':   { role: 'cfo',     label: 'Demo Access'          },
};

// Middleware: verify JWT
function auth(req, res, next) {
  const token = (req.headers.authorization || '').replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'No token' });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch { res.status(401).json({ error: 'Invalid token' }); }
}

// ── Routes ──────────────────────────────────────────────────────────────────

app.get('/', (req, res) => res.json({ status: 'FINMIND AI API running', version: '1.0.0' }));

// Validate invite code
app.post('/api/auth/validate-invite', (req, res) => {
  const { code } = req.body;
  const entry = INVITE_CODES[(code || '').toUpperCase()];
  if (!entry) return res.status(400).json({ error: 'Invalid invite code' });
  res.json({ valid: true, role: entry.role, label: entry.label });
});

// Login
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = USERS.find(u => u.email === email);
  if (!user || !bcrypt.compareSync(password, user.password))
    return res.status(401).json({ error: 'Invalid credentials' });
  const token = jwt.sign(
    { id: user.id, name: user.name, email: user.email, role: user.role, vertical: user.vertical },
    JWT_SECRET, { expiresIn: '8h' }
  );
  res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role, vertical: user.vertical } });
});

// Login with invite + name (no email needed)
app.post('/api/auth/invite-login', (req, res) => {
  const { inviteCode, name, vertical } = req.body;
  const entry = INVITE_CODES[(inviteCode || '').toUpperCase()];
  if (!entry) return res.status(400).json({ error: 'Invalid invite code' });
  const payload = { id: Date.now(), name: name || entry.label, role: entry.role, vertical: vertical || null };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '8h' });
  res.json({ token, user: payload });
});

// Get current user
app.get('/api/auth/me', auth, (req, res) => res.json({ user: req.user }));

// ── Dashboard KPIs ──────────────────────────────────────────────────────────
app.get('/api/dashboard/kpis', auth, (req, res) => {
  res.json({
    revenue:     { value: 48.7,  unit: 'Cr', change: +12.4, label: 'Total Revenue' },
    commission:  { value: 6.82,  unit: 'Cr', change: +8.1,  label: 'Net Commission' },
    clients:     { value: 1247,  unit: '',    change: +94,   label: 'Active Clients' },
    policies:    { value: 3891,  unit: '',    change: +213,  label: 'Active Policies' },
    loss_ratio:  { value: 62.4,  unit: '%',   change: -2.1,  label: 'Loss Ratio' },
    growth:      { value: 18.7,  unit: '%',   change: +3.2,  label: 'YoY Growth' },
  });
});

// Monthly P&L
app.get('/api/reports/pl', auth, (req, res) => {
  const months = ['Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar'];
  res.json({
    months,
    revenue:    [3.2,3.8,4.1,4.6,4.2,4.9,5.1,4.7,5.3,4.8,4.2,3.8],
    commission: [0.44,0.53,0.57,0.64,0.59,0.68,0.71,0.66,0.74,0.67,0.59,0.53],
    expenses:   [0.28,0.31,0.33,0.38,0.35,0.41,0.43,0.39,0.45,0.40,0.35,0.31],
    net_profit: [0.16,0.22,0.24,0.26,0.24,0.27,0.28,0.27,0.29,0.27,0.24,0.22],
  });
});

// Vertical performance
app.get('/api/reports/verticals', auth, (req, res) => {
  res.json([
    { id:'v_anurag',   name:'Anurag Mishra',    segment:'Corporate', revenue:8.4,  target:9.0,  achievement:93.3, clients:187 },
    { id:'v_asheesh',  name:'Asheesh Handa',    segment:'SME',       revenue:5.2,  target:5.5,  achievement:94.5, clients:312 },
    { id:'v_jigar',    name:'Jigar Parikh',      segment:'Corporate', revenue:7.1,  target:7.0,  achievement:101.4,clients:143 },
    { id:'v_neha',     name:'Neha Yadav',        segment:'Health',    revenue:4.8,  target:5.2,  achievement:92.3, clients:221 },
    { id:'v_nikhil',   name:'Nikhil Mhatre',     segment:'Retail',    revenue:3.6,  target:4.0,  achievement:90.0, clients:489 },
    { id:'v_saurabh',  name:'Saurabh Sharma',    segment:'Corporate', revenue:6.3,  target:6.5,  achievement:96.9, clients:167 },
    { id:'v_kanishka', name:'Kanishka Gadi',      segment:'Retail',    revenue:2.9,  target:3.2,  achievement:90.6, clients:356 },
    { id:'v_kunal',    name:'Kunal Khanna',       segment:'Corporate', revenue:5.8,  target:6.0,  achievement:96.7, clients:129 },
    { id:'v_mohan',    name:'Mohan Agarwal',      segment:'SME',       revenue:3.4,  target:3.8,  achievement:89.5, clients:278 },
    { id:'v_nitin',    name:'Nitin Firke',        segment:'Marine',    revenue:1.9,  target:2.1,  achievement:90.5, clients:94  },
    { id:'v_rajkumar', name:'Rajkumar ABG',       segment:'Corporate', revenue:4.2,  target:4.5,  achievement:93.3, clients:118 },
    { id:'v_rushik',   name:'Rushik Patel',       segment:'SME',       revenue:2.7,  target:3.0,  achievement:90.0, clients:203 },
    { id:'v_saurav',   name:'Saurav Maulik',      segment:'Health',    revenue:3.1,  target:3.4,  achievement:91.2, clients:186 },
    { id:'v_sonal',    name:'Sonal Gulati',        segment:'Retail',    revenue:2.4,  target:2.7,  achievement:88.9, clients:267 },
    { id:'v_vishwajeet',name:'Vishwajeet Kadam',  segment:'Marine',    revenue:1.6,  target:1.8,  achievement:88.9, clients:77  },
  ]);
});

// BH personal performance
app.get('/api/bh/performance', auth, (req, res) => {
  const { vertical } = req.user;
  const verticals = {
    v_anurag:   { name:'Anurag Mishra',    revenue:8.4,  target:9.0,  ytd:72.1, pipeline:24.3, clients:187, renewal_rate:89 },
    v_asheesh:  { name:'Asheesh Handa',    revenue:5.2,  target:5.5,  ytd:44.8, pipeline:15.1, clients:312, renewal_rate:91 },
    v_jigar:    { name:'Jigar Parikh',      revenue:7.1,  target:7.0,  ytd:61.2, pipeline:19.8, clients:143, renewal_rate:87 },
    v_neha:     { name:'Neha Yadav',        revenue:4.8,  target:5.2,  ytd:41.3, pipeline:12.6, clients:221, renewal_rate:92 },
    v_nikhil:   { name:'Nikhil Mhatre',     revenue:3.6,  target:4.0,  ytd:31.1, pipeline:9.4,  clients:489, renewal_rate:85 },
    v_saurabh:  { name:'Saurabh Sharma',    revenue:6.3,  target:6.5,  ytd:54.2, pipeline:17.9, clients:167, renewal_rate:90 },
  };
  const data = verticals[vertical] || { name:'Business Head', revenue:4.0, target:4.5, ytd:34.5, pipeline:11.2, clients:150, renewal_rate:88 };
  res.json(data);
});

// Forecast / LE
app.get('/api/reports/forecast', auth, (req, res) => {
  res.json({
    aop_target:   58.5,
    le_current:   54.2,
    achievement:  92.6,
    variance:     -4.3,
    months: ['Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar'],
    actual:   [3.2,3.8,4.1,4.6,4.2,4.9,5.1,4.7,5.3,null,null,null],
    forecast: [null,null,null,null,null,null,null,null,null,4.6,4.3,5.1],
    aop:      [4.5,4.8,5.0,5.1,5.0,5.2,5.3,5.0,5.4,4.9,4.6,4.7],
  });
});

// VPB Calculator
app.post('/api/analytics/vpb', auth, (req, res) => {
  const { revenue, target, collections, net_commission } = req.body;
  const achievement = (revenue / target) * 100;
  let vpb_pct = 0;
  if (achievement >= 110) vpb_pct = 20;
  else if (achievement >= 100) vpb_pct = 15;
  else if (achievement >= 90)  vpb_pct = 10;
  else if (achievement >= 80)  vpb_pct = 5;
  const vpb_amount = (net_commission * vpb_pct) / 100;
  res.json({ achievement: achievement.toFixed(1), vpb_pct, vpb_amount: vpb_amount.toFixed(2) });
});

// Market intelligence
app.get('/api/market/indices', auth, (req, res) => {
  res.json([
    { name:'NIFTY 50',    value:24318.45, change:+0.82, segment:'Equity'    },
    { name:'SENSEX',      value:79943.21, change:+0.74, segment:'Equity'    },
    { name:'NIFTY BANK',  value:52341.80, change:+1.12, segment:'Banking'   },
    { name:'NIFTY FIN SV',value:21876.55, change:+0.91, segment:'Financial' },
    { name:'INDIA VIX',   value:14.23,    change:-3.11, segment:'Volatility'},
    { name:'USD/INR',     value:83.42,    change:-0.12, segment:'Currency'  },
  ]);
});

// MAYA AI chat
app.post('/api/ai/maya', auth, (req, res) => {
  const { message } = req.body;
  const responses = {
    revenue: `📊 Based on current data, total revenue stands at ₹48.7 Cr YTD — 83.2% of AOP target. Corporate segment leads at 43% contribution. Strong momentum in Q3.`,
    forecast: `🎯 LE projection for FY2025-26 is ₹54.2 Cr against AOP of ₹58.5 Cr. Expected shortfall of ₹4.3 Cr. Recommend accelerating pipeline in Health & Marine verticals.`,
    vpb: `💰 VPB eligibility is based on revenue achievement vs AOP target. 100%+ achievement = 15% VPB on net commission. Current company average achievement: 93.3%.`,
    default: `🤖 I'm MAYA, your AI financial intelligence assistant. I can help with P&L analysis, vertical performance, LE forecasting, VPB calculations, and market insights. What would you like to explore?`,
  };
  const key = Object.keys(responses).find(k => message.toLowerCase().includes(k)) || 'default';
  setTimeout(() => res.json({ response: responses[key], timestamp: new Date().toISOString() }), 400);
});

// AOP data
app.get('/api/planning/aop', auth, (req, res) => {
  res.json({
    fy: '2025-26',
    total_aop: 58.5,
    q1: 17.5, q2: 19.2, q3: 20.1, q4: 1.7,
    verticals: [
      { name:'Corporate', aop:24.8, le:23.1, variance:-1.7 },
      { name:'SME & MSME', aop:11.3, le:10.8, variance:-0.5 },
      { name:'Health', aop:8.6, le:7.9, variance:-0.7 },
      { name:'Retail/HNW', aop:7.2, le:6.9, variance:-0.3 },
      { name:'Marine', aop:3.9, le:3.5, variance:-0.4 },
      { name:'Other', aop:2.7, le:2.0, variance:-0.7 },
    ]
  });
});

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok', ts: new Date().toISOString() }));

app.listen(PORT, () => console.log(`✅ FINMIND AI Backend running on port ${PORT}`));
module.exports = app;
