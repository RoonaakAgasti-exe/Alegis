# Alegis — AI-Powered Cybersecurity Ecosystem

> *Empowering digital safety with intelligence.*

Alegis is a comprehensive, multi-layered cybersecurity platform that combines a suite of specialized AI/ML models with a unified real-time dashboard for threat detection, digital forensics, credential monitoring, and proactive security management. Designed for security analysts, developers, and enterprises, Alegis brings together 9 independent ML services under one command center.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Core Components](#core-components)
  - [Homepage](#1-homepage)
  - [Dashboard](#2-unified-security-dashboard)
  - [ML Models](#3-ml-model-suite)
- [ML Model Reference](#ml-model-reference)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Ecosystem](#running-the-ecosystem)
- [Port Reference](#port-reference)
- [Configuration & Environment](#configuration--environment)
- [Security Considerations](#security-considerations)
- [Contributing](#contributing)
- [License](#license)

---

<img width="1893" height="889" alt="Screenshot 2026-02-28 010128" src="https://github.com/user-attachments/assets/7369ed10-da43-4ecc-8f6d-f7e596c3e22e" />
<img width="1895" height="868" alt="Screenshot 2026-02-28 011809" src="https://github.com/user-attachments/assets/5db5257e-b397-4cfa-b6bd-b12f77ea1f3b" />
<img width="987" height="872" alt="Screenshot 2026-02-28 011830" src="https://github.com/user-attachments/assets/d90908da-ade1-4105-9793-169549bcd70b" />

---

## Overview

The Alegis ecosystem is built around three pillars:

| Pillar | Technology | Purpose |
|---|---|---|
| **Homepage** | Next.js | Public-facing landing page and product showcase |
| **Dashboard** | React + Vite + Node.js/Express | Centralized security command center |
| **ML Models** | Python (Flask) & Node.js (Vite/Express) | 9 specialized AI/ML security services |

All services are designed to run locally and communicate over a shared internal network, with CORS policies pre-configured for seamless cross-service communication.

---

## Architecture

```
                         ┌─────────────────────────────┐
                         │      Alegis Ecosystem        │
                         └─────────────────────────────┘
                                       │
          ┌────────────────────────────┼────────────────────────────┐
          │                            │                            │
  ┌───────▼───────┐          ┌─────────▼─────────┐      ┌──────────▼──────────┐
  │   Homepage    │          │     Dashboard      │      │      ML Models       │
  │  (Next.js)    │          │  React + Express   │      │   9 Flask/Node.js   │
  │  Port 3000    │          │  Ports 5173 + 5007 │      │   Services          │
  └───────────────┘          └─────────────────── ┘      └─────────────────────┘
                                       │                            │
                             ┌─────────▼──────────────────────────┐│
                             │   Embedded via iFrame / REST API   ││
                             └────────────────────────────────────┘│
                                                         ┌──────────▼──────────┐
                                                         │  Ports 3003–3008,   │
                                                         │  5000, 5001, 5002   │
                                                         └─────────────────────┘
```

---

## Project Structure

```text
Alegis/
├── Homepage/                    # Public-facing Next.js website
│   ├── app/                     # Next.js App Router pages
│   ├── components/              # Shared UI components
│   ├── public/                  # Static assets
│   └── package.json
│
├── Dashboard/                   # Unified security command center
│   ├── frontend/                # React + Vite UI (Port 5173)
│   │   ├── src/
│   │   │   ├── components/      # Dashboard UI components
│   │   │   ├── Dashboard.jsx    # Main dashboard view (register new models here)
│   │   │   └── main.jsx
│   │   └── package.json
│   └── backend/                 # Node.js + Express API (Port 5007)
│       ├── routes/              # API route handlers
│       ├── server.js            # Express entry point
│       └── package.json
│
├── Models/                      # Specialized ML/AI services
│   ├── Deep-fake-detection/     # Sentinel Vision AI        (Port 3008)
│   ├── Email_Detection/         # Phishing Scanner          (Port 5000)
│   ├── DARK WEB MONITORING/     # Credential Exposure Check (Port 5002)
│   ├── File_Encryption/         # Cryptography Tool         (Port 3003)
│   ├── Fraud_Detection/         # Transaction Analyzer      (Port 3004)
│   ├── File_Integrity/          # SHA-256 Fingerprinting    (Port 5001)
│   ├── Password_Generator/      # Secure Key Generator      (Port 3005)
│   ├── Password_Strength/       # Complexity Analyzer       (Port 3006)
│   └── Steganography/           # Hidden Data Detection     (Port 3007)
│
├── start_all.ps1                # Master startup script (all services)
├── start_ml_models.ps1          # ML-only startup script
└── README.md
```

---

## Core Components

### 1. Homepage

**Technology:** Next.js (App Router) | **Port:** `3000` (dev) / `3001` (fallback)

The public-facing marketing and documentation site for the Alegis platform. It introduces the platform's capabilities, showcases each ML model, and provides onboarding guidance for new users.

**Key responsibilities:**
- Product landing page with feature highlights
- Navigation to the Dashboard and individual ML tools
- Documentation and usage guides

---

### 2. Unified Security Dashboard

**Technology:** React + Vite (frontend) | Node.js + Express (backend)
**Ports:** `5173` (UI) | `5007` (API)

The Dashboard is the operational heart of Alegis — a real-time command center that aggregates all security services into a single interface.

**Features:**

| Feature | Description |
|---|---|
| **Service Health Monitor** | Live status indicators for all 9 ML services |
| **Embedded Model Interface** | Load any ML tool directly in the dashboard via iframe — no tab switching |
| **Panic / Alert System** | One-click "Alert Security" button for immediate incident escalation |
| **Alegis AI Assistant** | OpenAI-powered chatbot for cybersecurity Q&A and triage guidance |
| **Unified Log View** | Aggregated activity feed from connected ML services |

**Alegis AI Assistant:**
The integrated chatbot is powered by the OpenAI API. Users provide their own API key, which is stored exclusively in browser `localStorage` and is never transmitted to any Alegis backend server.

---

### 3. ML Model Suite

All 9 models are independently deployable microservices. They expose REST APIs consumed by the Dashboard and can also be accessed directly via browser on their respective ports.

---

## ML Model Reference

### 🎭 Sentinel Vision — DeepFake Detection
**Port:** `3008` | **Stack:** Node.js / Vite

Detects AI-generated or manipulated media (images and video) using computer vision techniques. Provides a confidence score and highlighted anomaly regions to help analysts assess media authenticity.

- Upload images or video frames for analysis
- Returns a manipulation probability score (0–100%)
- Flags suspicious regions using visual overlays
- Use cases: verifying media in incident reports, social engineering investigations

---

### 📧 Phishing Guardian — Email Detection
**Port:** `5000` | **Stack:** Python / Flask

Analyzes email content, headers, and embedded URLs for phishing indicators using an ensemble ML model. Returns a per-signal breakdown and an overall threat score.

- Paste raw email content or upload `.eml` files
- Ensemble scoring across URL reputation, header anomalies, and language patterns
- Outputs: threat label (Safe / Suspicious / Malicious), confidence %, per-signal breakdown
- Use cases: SOC triage, user-reported phishing investigation

---

### 🌑 Dark Web Monitor — Credential Exposure Checker
**Port:** `5002` | **Stack:** Python / Flask

Cross-references email addresses, usernames, and passwords against known underground leak databases to identify compromised credentials before attackers exploit them.

- Input: email address, username, or credential pair
- Returns: number of known breach appearances, breach source names, exposure dates
- All queries are hashed locally before lookup (plaintext credentials never transmitted)
- Use cases: employee credential audits, post-breach impact assessment

---

### 🔐 File Encryption — Cryptography Tool
**Port:** `3003` | **Stack:** Node.js / Vite

A client-side file encryption and decryption tool using industry-standard cryptographic algorithms. Suitable for protecting sensitive files at rest or before transmission.

- Drag-and-drop file encryption and decryption
- Supports AES-256 and other configurable cipher suites
- Key management: passphrase-based key derivation (PBKDF2)
- Encrypted output as downloadable file
- Use cases: securing sensitive documents, pre-transmission file protection

---

### 💳 Fraud Detection — Transaction Analyzer
**Port:** `3004` | **Stack:** Node.js / Vite

Analyzes financial transaction patterns to identify anomalies and potential fraud using behavioral ML models trained on transactional data.

- Input: transaction details (amount, merchant category, location, time)
- Returns: fraud probability score, risk tier (Low / Medium / High / Critical)
- Highlights specific anomaly signals contributing to the score
- Use cases: real-time payment screening, post-incident transaction review

---

### 🔍 File Integrity — SHA-256 Fingerprinting
**Port:** `5001` | **Stack:** Python / Flask

Generates and verifies cryptographic checksums for files to ensure they have not been tampered with. Essential for verifying software downloads, log files, and evidence in digital forensics.

- Generate SHA-256, SHA-512, or MD5 hashes for any uploaded file
- Compare two files or a file against a known-good hash baseline
- Bulk hash generation for directories (via API)
- Use cases: malware verification, forensic evidence integrity, software supply chain checks

---

### 🔑 Password Generator — Secure Key Generator
**Port:** `3005` | **Stack:** Node.js / Vite

Generates cryptographically secure passwords and passphrases to NIST and OWASP standards, with configurable length, character sets, and entropy requirements.

- Configure: length, uppercase, lowercase, numbers, symbols, ambiguous character exclusion
- Passphrase mode: generates memorable word-based passwords (e.g., Diceware-style)
- Entropy meter shows bits of security for each generated password
- One-click copy to clipboard
- Use cases: IT provisioning, secure account creation, key generation for encryption

---

### 🛡 Password Strength — Complexity Analyzer
**Port:** `3006` | **Stack:** Node.js / Vite

Evaluates passwords against multiple complexity models including NIST SP 800-63B guidelines, zxcvbn pattern analysis, and brute-force time estimation.

- Real-time strength feedback as you type (no passwords are logged or stored)
- Checks against common password lists, keyboard patterns, and dictionary words
- Outputs: strength score (0–4), estimated crack time, specific weakness reasons
- Actionable suggestions for improvement
- Use cases: password policy enforcement UI, user training, security audits

---

### 🕵️ Steganography — Hidden Data Detection
**Port:** `3007` | **Stack:** Node.js / Vite

Encodes secret messages within image files and decodes them, using steganographic techniques. Also supports steganalysis to detect whether a given image contains hidden content.

- Encode: embed a plaintext or encrypted message into a PNG/BMP image
- Decode: extract hidden data from a suspect image
- Detection mode: analyze images for statistical anomalies indicating hidden payloads
- Use cases: covert communications research, digital forensics, insider threat investigation

---

## Getting Started

### Prerequisites

Ensure the following are installed before running Alegis:

| Dependency | Minimum Version | Purpose |
|---|---|---|
| Node.js | v18+ | Homepage, Dashboard frontend, Node-based ML models |
| npm | v9+ | Package management |
| Python | 3.9+ | Flask-based ML models |
| pip | Latest | Python package management |
| PowerShell | 5.1+ (Windows) | Startup automation scripts |

> **Note:** On macOS/Linux, the `.ps1` startup scripts can be run with PowerShell Core (`pwsh`), or you can start each service manually (see [Manual Startup](#manual-startup)).

---

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/your-repo/alegis.git
cd Alegis
```

**2. Install Homepage dependencies**
```bash
cd Homepage
npm install
cd ..
```

**3. Install Dashboard dependencies**
```bash
cd Dashboard/frontend
npm install
cd ../backend
npm install
cd ../..
```

**4. Install ML model dependencies**

For each Node.js-based model (`Deep-fake-detection`, `File_Encryption`, `Fraud_Detection`, `Password_Generator`, `Password_Strength`, `Steganography`):
```bash
cd Models/<model-folder>
npm install
cd ../..
```

For each Python/Flask-based model (`Email_Detection`, `DARK WEB MONITORING`, `File_Integrity`):
```bash
cd Models/<model-folder>
pip install -r requirements.txt
cd ../..
```

---

### Running the Ecosystem

#### Option A: Single Command (Recommended)

Run everything (Homepage, Signup, Dashboard UI/API, all Node-based models) with one command from the project root:

```bash
npm run dev
```

This will automatically install required sub-project dependencies (Node-based) and start all services. Python-based models require Python and pip installed (see Prerequisites). Ports may auto-fallback if the defaults are busy; watch the terminal for the exact URLs.

#### Option B: Master Startup Script (Windows PowerShell)

Run all 12+ services in one command from the project root:

```powershell
powershell -ExecutionPolicy Bypass -File .\start_all.ps1
```

This will start:

| Service | URL |
|---|---|
| Homepage | http://localhost:3000 |
| Dashboard UI | http://localhost:5173 |
| Dashboard API | http://localhost:5007 |
| All 9 ML Models | (see Port Reference below) |

#### Option C: ML Models Only

To start only the ML services without the Homepage or Dashboard:

```powershell
powershell -ExecutionPolicy Bypass -File .\start_ml_models.ps1
```

#### Option D: Manual Startup

Start each service individually in separate terminals:

```bash
# Homepage
cd Homepage && npm run dev

# Dashboard frontend
cd Dashboard/frontend && npm run dev

# Dashboard backend
cd Dashboard/backend && node server.js

# Python ML models (example)
cd Models/Email_Detection && python app.py

# Node.js ML models (example)
cd Models/Deep-fake-detection && npm run dev
```

---

## Port Reference

| Service | Type | Port | URL |
|---|---|---|---|
| Homepage | Next.js | 3000 | http://localhost:3000 |
| Dashboard UI | Vite/React | 5173 | http://localhost:5173 |
| Dashboard API | Express | 5007 | http://localhost:5007 |
| File Encryption | Node.js | 3003 | http://localhost:3003 |
| Fraud Detection | Node.js | 3004 | http://localhost:3004 |
| Password Generator | Node.js | 3005 | http://localhost:3005 |
| Password Strength | Node.js | 3006 | http://localhost:3006 |
| Steganography | Node.js | 3007 | http://localhost:3007 |
| DeepFake Detection | Node.js | 3008 | http://localhost:3008 |
| Email / Phishing Detection | Flask | 5000 | http://localhost:5000 |
| File Integrity | Flask | 5001 | http://localhost:5001 |
| Dark Web Monitoring | Flask | 5002 | http://localhost:5002 |

---

## Configuration & Environment

### OpenAI API Key (Dashboard Chatbot)

The Alegis AI Assistant requires an OpenAI API key to function.

1. Open the Dashboard at http://localhost:5173
2. Navigate to the AI Assistant panel
3. Enter your OpenAI API key when prompted
4. The key is stored in your browser's `localStorage` only — it is never sent to any Alegis server

### CORS & Network Binding

All services are pre-configured to:
- Bind on `0.0.0.0` for LAN accessibility (useful in team/lab environments)
- Allow cross-origin requests from the Dashboard origin

To restrict access to localhost only, update the `host` binding in each service's configuration:
- Node.js: modify `server.js` or `vite.config.js` (`host: 'localhost'`)
- Python Flask: change `app.run(host='0.0.0.0')` to `app.run(host='127.0.0.1')`

---

## Security Considerations

- **Local-only by default:** All services are intended for local or internal network use. Do not expose ports publicly without authentication and TLS.
- **API Keys:** Never hardcode API keys. The OpenAI key is handled via `localStorage` and is scoped to the user's browser session.
- **Credentials:** The Dark Web Monitor hashes all input credentials client-side before lookup. Raw credential data is never logged.
- **Encryption:** The File Encryption tool processes files entirely in the browser. No file content is sent to any backend.
- **Startup scripts:** The `.ps1` scripts use `-ExecutionPolicy Bypass` for convenience. Review all scripts before running in production or shared environments.

---

## Contributing

Alegis is built with modularity in mind. Each ML model is a self-contained service and can be developed, tested, and deployed independently.

### Adding a New ML Model

1. Create a new folder under `Models/` (e.g., `Models/My_New_Model/`)
2. Add your service with a `package.json` (Node.js) or `requirements.txt` + `app.py` (Python/Flask)
3. Choose an unused port and document it in the Port Reference table above
4. Register the model in `Dashboard/frontend/src/Dashboard.jsx` to surface it in the UI
5. Add the startup command to `start_ml_models.ps1`
6. Submit a pull request with a description of the model's purpose, inputs, and outputs

### Code Style

- **JavaScript/React:** Follow the existing ESLint config per service
- **Python:** PEP 8 with type hints where appropriate
- **Commits:** Use conventional commits format (`feat:`, `fix:`, `docs:`, etc.)

---

## License

© 2026 Alegis Security. All rights reserved.

---

*Built with care for defenders everywhere. If you find a bug or have a feature idea, open an issue — security tools should be sharp.*
