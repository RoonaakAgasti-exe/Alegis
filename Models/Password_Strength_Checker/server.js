const express = require('express');
const path = require('path');

const app = express();
const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3006;


app.use('/static', express.static(path.join(__dirname, 'static')));


app.get('/', (req, res) => {
    const htmlPath = path.join(__dirname, 'templates', 'index.html');
    res.sendFile(htmlPath);
});

function start(port) {
    const server = app.listen(port, () => {
        console.log(`🚀 Password Strength Checker is running on http://localhost:${port}`);
        console.log(`📝 Open your browser and navigate to the URL above to test it!`);
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

