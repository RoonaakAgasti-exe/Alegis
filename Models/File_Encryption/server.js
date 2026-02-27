const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3003;
const FRONTEND_DIR = path.join(__dirname, 'frontend');

app.use(express.static(FRONTEND_DIR));

app.get('*', (req, res) => {
  res.sendFile(path.join(FRONTEND_DIR, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`File Encryption server running at http://localhost:${PORT}`);
});
