# SENTINEL | File Integrity Checker

A standalone, AI-powered file integrity verification system. This tool allows users to generate cryptographic fingerprints (SHA-256) for their files and verify them later to detect any unauthorized modifications or tampering.

## Features

- **Cryptographic Fingerprinting**: Generate unique SHA-256 hashes for any file.
- **Integrity Verification**: Compare current file states against original fingerprints.
- **AI Anomaly Detection**: Simulated AI logic to detect malicious tampering patterns.
- **Modern UI**: A high-fidelity, dark-themed dashboard built with Tailwind CSS and Animate.css.

## Installation

1. Ensure you have Python installed.
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## Running the Application

Start the Flask server:
```bash
python app.py
```
The website will be available at `http://localhost:5001`.

## Tech Stack

- **Backend**: Python, Flask
- **Frontend**: HTML5, Tailwind CSS, JavaScript (ES6+)
- **Security**: SHA-256 Hashing
