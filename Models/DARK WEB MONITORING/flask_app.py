"""
Flask Web Application for Dark Web Security Monitoring
"""

from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import time
import os

app = Flask(__name__)
CORS(app)


class MockXposedOrNot:
    def check_email(self, email):
        
        time.sleep(1)

        
        import random
        is_breached = random.choice([True, False])

        if is_breached:
            
            breach_scenarios = [
                {
                    'breaches': [
                        {
                            'site': 'LinkedIn.com',
                            'date': '2023-08-15',
                            'breach_type': 'Social Network',
                            'data_leaked': ['Email', 'Password Hash', 'Profile Data'],
                            'severity': 'Medium'
                        }
                    ]
                },
                {
                    'breaches': [
                        {
                            'site': 'Adobe.com',
                            'date': '2013-10-04',
                            'breach_type': 'Software Company',
                            'data_leaked': ['Email', 'Password Hash', 'Usernames'],
                            'severity': 'High'
                        },
                        {
                            'site': 'Dropbox.com',
                            'date': '2012-07-01',
                            'breach_type': 'Cloud Storage',
                            'data_leaked': ['Email', 'Password Hash'],
                            'severity': 'Medium'
                        }
                    ]
                },
                {
                    'breaches': [
                        {
                            'site': 'Yahoo.com',
                            'date': '2013-08-28',
                            'breach_type': 'Email Provider',
                            'data_leaked': ['Email', 'Password Hash', 'Security Questions'],
                            'severity': 'Critical'
                        }
                    ]
                }
            ]
            return random.choice(breach_scenarios)
        else:
            return {'breaches': []}

xon = MockXposedOrNot()

@app.route('/')
def index():
    """Serve the main page"""
    return render_template('index.html')

@app.route('/api/scan', methods=['POST'])
def scan_email():
    """API endpoint to scan email for dark web exposure"""
    try:
        data = request.get_json()
        email = data.get('email', '')

        if not email:
            return jsonify({
                'error': 'Please provide an email address'
            }), 400

        
        result = xon.check_email(email)

        
        is_actually_breached = len(result.get('breaches', [])) > 0

        response = {
            'email': email,
            'is_exposed': is_actually_breached,
            'breaches': result.get('breaches', []),
            'scan_time': time.time()
        }

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
        'service': 'dark-web-monitoring'
    })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5002)