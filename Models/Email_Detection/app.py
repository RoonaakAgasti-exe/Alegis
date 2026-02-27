"""
Flask Web Application for Phishing Email Detection
"""

from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import os
from phishing_detector import PhishingEmailDetector, generate_training_data

app = Flask(__name__)
CORS(app)


detector = PhishingEmailDetector()


MODEL_PATH = 'phishing_model.pkl'
if os.path.exists(MODEL_PATH):
    print("Loading existing model...")
    detector.load(MODEL_PATH)
else:
    print("No existing model found. Training new model...")
    emails, labels = generate_training_data()
    detector.train(emails, labels)
    detector.save(MODEL_PATH)
    print("Model trained and saved!")


@app.route('/')
def index():
    """Serve the main page"""
    return render_template('index.html')


@app.route('/api/scan', methods=['POST'])
def scan_email():
    """API endpoint to scan email for phishing"""
    try:
        data = request.get_json()
        subject = data.get('subject', '')
        body = data.get('body', '')
        
        if not subject and not body:
            return jsonify({
                'error': 'Please provide at least a subject or body content'
            }), 400
        
        
        email_data = {
            'subject': subject,
            'body': body
        }
        
        
        result = detector.predict(email_data)
        
        
        response = {
            'is_phishing': bool(result['is_phishing']),  
            'phishing_probability': float(round(result['phishing_probability'] * 100, 2)),
            'safe_probability': float(round(result['safe_probability'] * 100, 2)),
            'model_breakdown': {
                'random_forest': float(round(result['model_breakdown']['random_forest'] * 100, 2)),
                'svm': float(round(result['model_breakdown']['svm'] * 100, 2)),
                'naive_bayes': float(round(result['model_breakdown']['naive_bayes'] * 100, 2)),
                'ensemble': float(round(result['model_breakdown']['ensemble'] * 100, 2))
            }
        }
        
        
        if 'neural_network' in result['model_breakdown']:
            response['model_breakdown']['neural_network'] = float(round(
                result['model_breakdown']['neural_network'] * 100, 2
            ))
        
        return jsonify(response)
    
    except Exception as e:
        return jsonify({
            'error': f'An error occurred: {str(e)}'
        }), 500


@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'model_loaded': bool(detector.is_trained)  
    })


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)

