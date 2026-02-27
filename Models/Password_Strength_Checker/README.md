# Advanced Password Strength Checker

A modern, feature-rich password strength checker with real-time feedback and detailed analysis.

## Features

- **Real-time Password Analysis**: Instant feedback as you type
- **Advanced Scoring Algorithm**: Multi-factor strength calculation (0-100 score)
- **Comprehensive Checks**:
  - Length requirements (8+ characters recommended)
  - Character variety (uppercase, lowercase, numbers, special characters)
  - Common password detection
  - Repetition detection
  - Sequence detection (123, abc, qwerty patterns)
  - Entropy calculation
  - Estimated crack time

- **Beautiful UI**: Modern, responsive design with gradient background
- **Detailed Feedback**: 
  - Visual strength meter
  - Requirement checklist
  - Password analysis details
  - Improvement suggestions

## Installation

1. Make sure you have Node.js installed (v14 or higher)

2. Install dependencies:
```bash
npm install
```

## Running the Application

Start the server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

Open your browser and navigate to the URL to start checking passwords!

## How It Works

The password strength checker evaluates passwords based on:

1. **Length** (0-25 points): Longer passwords score higher
2. **Character Variety** (0-30 points): Mix of uppercase, lowercase, numbers, and special characters
3. **Complexity** (0-25 points): Avoids common passwords, repetition, and sequences
4. **Entropy** (0-20 points): Measures password randomness

The final score (0-100) determines the strength level:
- **Very Weak** (0-19): Red
- **Weak** (20-39): Orange
- **Fair** (40-59): Yellow
- **Good** (60-79): Green
- **Strong** (80-100): Blue

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Node.js with Express
- **No external dependencies** for the password checking algorithm (pure JavaScript)

## Browser Support

Works on all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## License

MIT

