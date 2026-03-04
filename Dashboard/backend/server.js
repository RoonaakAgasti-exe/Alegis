const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


app.use('/api/auth', authRoutes);


app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date() });
});


const alerts = [];


app.post('/api/alert', (req, res) => {
  const { message, severity = 'high', actorEmail, context } = req.body || {};
  const alert = {
    id: Date.now().toString(),
    message: message || 'Security breach reported',
    severity,
    actorEmail: actorEmail || 'unknown',
    context: context || {},
    createdAt: new Date().toISOString(),
  };
  alerts.push(alert);
  console.log('⚠ SECURITY ALERT', alert);
  res.status(201).json({ ok: true, alert });
});


app.get('/api/alerts', (req, res) => {
  res.json({ ok: true, alerts });
});

const PORT = process.env.PORT || 5007;
function start(port) {
  const server = app.listen(port, () => {
    console.log(`✓ Server running on http://localhost:${port}`);
  });
  server.on('error', (err) => {
    if (err && err.code === 'EADDRINUSE') {
      start(port + 1);
    } else {
      throw err;
    }
  });
}

start(parseInt(PORT, 10));
