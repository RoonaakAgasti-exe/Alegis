const express = require('express');
const path = require('path');

const app = express();
const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3003;
const FRONTEND_DIR = path.join(__dirname, 'frontend');

app.use(express.static(FRONTEND_DIR));

app.get('*', (req, res) => {
  res.sendFile(path.join(FRONTEND_DIR, 'index.html'));
});

function start(port) {
  const server = app.listen(port, () => {
    console.log(`File Encryption server running at http://localhost:${port}`);
  });
  server.on('error', (err) => {
    if (err && err.code === 'EADDRINUSE') {
      start(port + 1);
    } else {
      throw err;
    }
  });
}

start(DEFAULT_PORT);
