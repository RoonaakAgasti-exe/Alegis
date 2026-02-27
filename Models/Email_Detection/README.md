# AI Phishing Email Detection System

A comprehensive machine learning-based phishing email detection system with a modern web interface. This system uses multiple ML algorithms including Random Forest, SVM, Naive Bayes, Neural Networks, and an Ensemble model to accurately detect phishing emails.

## Features

- **Multiple ML Technologies**: Uses Random Forest, SVM, Naive Bayes, Neural Networks, and Ensemble voting
- **Advanced Feature Extraction**: Analyzes email content, links, urgency indicators, and suspicious patterns
- **Modern Web Interface**: Beautiful dark-themed UI matching the design specifications
- **Real-time Detection**: Instant analysis of email subject and body content
- **Detailed Results**: Shows probability scores from all models with breakdown

## Technologies Used

- **Backend**: Flask (Python)
- **Machine Learning**: 
  - scikit-learn (Random Forest, SVM, Naive Bayes)
  - TensorFlow/Keras (Neural Network)
  - Ensemble Voting Classifier
- **Frontend**: HTML5, CSS3, JavaScript
- **Feature Engineering**: TF-IDF vectorization + handcrafted features

## Installation

1. **Clone or download this repository**

2. **Install Python dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Train the model** (optional - model will auto-train on first run):
   ```bash
   python phishing_detector.py
   ```

## Usage

1. **Start the Flask server**:
   ```bash
   python app.py
   ```

2. **Open your browser** and navigate to:
   ```
   http://localhost:5000
   ```

3. **Enter email content**:
   - Enter the email subject/sender line
   - Optionally paste the email body content for better accuracy
   - Click "Execute Scan"

4. **View results**:
   - The system will display whether the email is phishing or safe
   - See probability scores from all ML models
   - View detailed breakdown of each model's prediction

## How It Works

### Feature Extraction
The system extracts multiple features from email text:
- Text length and word count
- Number of links and email addresses
- Urgency indicators (urgent, immediately, ASAP, etc.)
- Suspicious keywords (verify, confirm, account, suspended, etc.)
- Money-related terms
- Action words (click, download, update, etc.)
- TF-IDF vectorization of text content

### Machine Learning Models
1. **Random Forest**: Ensemble of decision trees
2. **SVM (Support Vector Machine)**: RBF kernel for non-linear classification
3. **Naive Bayes**: Probabilistic classifier
4. **Neural Network**: Deep learning model with multiple layers
5. **Ensemble Model**: Voting classifier combining all models

### Prediction
The system uses soft voting to combine predictions from all models, providing a robust and accurate phishing detection result.

## API Endpoints

### POST `/api/scan`
Scan an email for phishing detection.

**Request Body**:
```json
{
  "subject": "Urgent password reset required",
  "body": "Click here to reset your password..."
}
```

**Response**:
```json
{
  "is_phishing": true,
  "phishing_probability": 85.5,
  "safe_probability": 14.5,
  "model_breakdown": {
    "random_forest": 82.3,
    "svm": 88.1,
    "naive_bayes": 86.2,
    "ensemble": 85.5,
    "neural_network": 84.7
  }
}
```

### GET `/api/health`
Health check endpoint to verify the API is running and model is loaded.

## Model Training

The model is trained on synthetic data that includes:
- Phishing emails with suspicious links, urgency tactics, and common phishing patterns
- Safe emails with normal communication patterns

For production use, you should train the model on a larger, real-world dataset.

## File Structure

```
Email_Detection/
├── app.py                 # Flask web application
├── phishing_detector.py   # ML model implementation
├── requirements.txt       # Python dependencies
├── README.md             # This file
├── templates/
│   └── index.html        # Web interface HTML
├── static/
│   ├── style.css         # Styling
│   └── script.js         # Frontend JavaScript
└── phishing_model.pkl    # Trained model (generated after training)
```

## Customization

You can customize the model by:
- Modifying feature extraction in `PhishingEmailDetector.extract_features()`
- Adjusting model parameters in `PhishingEmailDetector.train()`
- Adding more training data in `generate_training_data()`
- Changing the ensemble voting strategy

## Notes

- The model will automatically train on first run if no saved model exists
- Training may take a few minutes depending on your system
- TensorFlow is optional - the system will work without it using traditional ML only
- For best results, provide both subject and body content

## License

This project is open source and available for educational and research purposes.

## Contributing

Feel free to submit issues, fork the repository, and create pull requests for any improvements.

