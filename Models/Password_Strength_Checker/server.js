const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3006;


app.use('/static', express.static(path.join(__dirname, 'static')));


app.get('/', (req, res) => {
    const htmlPath = path.join(__dirname, 'templates', 'index.html');
    res.sendFile(htmlPath);
});

app.listen(PORT, () => {
    console.log(`🚀 Password Strength Checker is running on http://localhost:${PORT}`);
    console.log(`📝 Open your browser and navigate to the URL above to test it!`);
});

