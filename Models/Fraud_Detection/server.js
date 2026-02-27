const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3004;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Fraud Detection server running at http://localhost:${PORT}`);
});
