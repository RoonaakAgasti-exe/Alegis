const express = require('express');
const path = require('path');

const app = express();
const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3005;

app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

function start(port) {
  const server = app.listen(port, () => {
    console.log(`Password Generator server running at http://localhost:${port}`);
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
