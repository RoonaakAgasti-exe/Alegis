"""
Phishing Email Detection Model using Multiple ML Technologies
Includes: Random Forest, SVM, Naive Bayes, Neural Network, and Ensemble
"""

import numpy as np
import pandas as pd
import pickle
import re
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestClassifier, VotingClassifier
from sklearn.svm import SVC
from sklearn.naive_bayes import MultinomialNB, GaussianNB
from sklearn.preprocessing import MinMaxScaler
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
import warnings
warnings.filterwarnings('ignore')

try:
    from tensorflow import keras
    from tensorflow.keras.models import Sequential
    from tensorflow.keras.layers import Dense, Dropout
    TENSORFLOW_AVAILABLE = True
except ImportError:
    TENSORFLOW_AVAILABLE = False
    print("TensorFlow not available, using traditional ML only")


class PhishingEmailDetector:
    def __init__(self):
        self.tfidf_vectorizer = TfidfVectorizer(max_features=5000, ngram_range=(1, 2))
        self.rf_model = RandomForestClassifier(n_estimators=100, random_state=42)
        self.svm_model = SVC(kernel='rbf', probability=True, random_state=42)
        self.nb_model = MultinomialNB()
        self.feature_scaler = MinMaxScaler()
        self.nn_model = None
        self.ensemble_model = None
        self.is_trained = False
        
    def extract_features(self, text):
        """Extract additional features from email text"""
        if not text:
            text = ""
        text_lower = text.lower()
        
        features = {
            'length': len(text),
            'num_words': len(text.split()),
            'num_links': len(re.findall(r'http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\\(\\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+', text)),
            'num_emails': len(re.findall(r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b', text)),
            'num_exclamation': text.count('!'),
            'num_question': text.count('?'),
            'num_uppercase': sum(1 for c in text if c.isupper()),
            'has_urgent': 1 if any(word in text_lower for word in ['urgent', 'immediately', 'asap', 'critical']) else 0,
            'has_suspicious': 1 if any(word in text_lower for word in ['verify', 'confirm', 'account', 'suspended', 'locked']) else 0,
            'has_money': 1 if any(word in text_lower for word in ['money', 'payment', 'invoice', 'refund', 'prize']) else 0,
            'has_action': 1 if any(word in text_lower for word in ['click', 'download', 'update', 'reset', 'verify']) else 0,
        }
        return np.array(list(features.values()))
    
    def prepare_data(self, emails, labels=None):
        """Prepare data for training or prediction"""
        
        combined_texts = []
        feature_vectors = []
        
        for email in emails:
            if isinstance(email, dict):
                subject = email.get('subject', '')
                body = email.get('body', '')
                combined = f"{subject} {body}"
            else:
                combined = str(email)
            
            combined_texts.append(combined)
            feature_vectors.append(self.extract_features(combined))
        
        
        if labels is not None:
            
            tfidf_features = self.tfidf_vectorizer.fit_transform(combined_texts)
        else:
            
            tfidf_features = self.tfidf_vectorizer.transform(combined_texts)
        
        
        feature_vectors = np.array(feature_vectors)
        tfidf_dense = tfidf_features.toarray()
        
        
        if labels is not None:
            feature_vectors_scaled = self.feature_scaler.fit_transform(feature_vectors)
        else:
            feature_vectors_scaled = self.feature_scaler.transform(feature_vectors)
        
        
        combined_features = np.hstack([tfidf_dense, feature_vectors_scaled])
        
        return combined_features
    
    def train(self, emails, labels):
        """Train all models"""
        print("Preparing data...")
        X = self.prepare_data(emails, labels)
        y = np.array(labels)
        
        print("Training Random Forest...")
        self.rf_model.fit(X, y)
        
        print("Training SVM...")
        self.svm_model.fit(X, y)
        
        print("Training Naive Bayes...")
        self.nb_model.fit(X, y)
        
        
        if TENSORFLOW_AVAILABLE:
            print("Training Neural Network...")
            self.nn_model = Sequential([
                Dense(256, activation='relu', input_shape=(X.shape[1],)),
                Dropout(0.3),
                Dense(128, activation='relu'),
                Dropout(0.3),
                Dense(64, activation='relu'),
                Dense(1, activation='sigmoid')
            ])
            self.nn_model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])
            self.nn_model.fit(X, y, epochs=20, batch_size=32, verbose=0)
        
        
        print("Creating ensemble model...")
        estimators = [
            ('rf', self.rf_model),
            ('svm', self.svm_model),
            ('nb', self.nb_model)
        ]
        self.ensemble_model = VotingClassifier(estimators=estimators, voting='soft')
        self.ensemble_model.fit(X, y)
        
        self.is_trained = True
        print("Training completed!")
        
        
        y_pred = self.ensemble_model.predict(X)
        accuracy = accuracy_score(y, y_pred)
        print(f"Training Accuracy: {accuracy:.4f}")
    
    def predict(self, email):
        """Predict if email is phishing"""
        if not self.is_trained:
            raise ValueError("Model not trained. Please train the model first.")
        
        X = self.prepare_data([email])
        
        
        rf_pred = self.rf_model.predict_proba(X)[0]
        svm_pred = self.svm_model.predict_proba(X)[0]
        nb_pred = self.nb_model.predict_proba(X)[0]
        ensemble_pred = self.ensemble_model.predict_proba(X)[0]
        
        results = {
            'is_phishing': bool(ensemble_pred[1] > 0.5),  
            'phishing_probability': float(ensemble_pred[1]),
            'safe_probability': float(ensemble_pred[0]),
            'model_breakdown': {
                'random_forest': float(rf_pred[1]),
                'svm': float(svm_pred[1]),
                'naive_bayes': float(nb_pred[1]),
                'ensemble': float(ensemble_pred[1])
            }
        }
        
        
        if TENSORFLOW_AVAILABLE and self.nn_model:
            nn_pred = self.nn_model.predict(X, verbose=0)[0][0]
            results['model_breakdown']['neural_network'] = float(nn_pred)
        
        return results
    
    def save(self, filepath='phishing_model.pkl'):
        """Save the trained model"""
        model_data = {
            'tfidf_vectorizer': self.tfidf_vectorizer,
            'rf_model': self.rf_model,
            'svm_model': self.svm_model,
            'nb_model': self.nb_model,
            'ensemble_model': self.ensemble_model,
            'feature_scaler': self.feature_scaler,
            'is_trained': self.is_trained
        }
        with open(filepath, 'wb') as f:
            pickle.dump(model_data, f)
        print(f"Model saved to {filepath}")
    
    def load(self, filepath='phishing_model.pkl'):
        """Load a trained model"""
        with open(filepath, 'rb') as f:
            model_data = pickle.load(f)
        
        self.tfidf_vectorizer = model_data['tfidf_vectorizer']
        self.rf_model = model_data['rf_model']
        self.svm_model = model_data['svm_model']
        self.nb_model = model_data['nb_model']
        self.ensemble_model = model_data['ensemble_model']
        self.feature_scaler = model_data.get('feature_scaler', MinMaxScaler())
        self.is_trained = model_data['is_trained']
        print(f"Model loaded from {filepath}")


def generate_training_data():
    """Generate synthetic training data for demonstration"""
    
    phishing_emails = [
        
        {"subject": "Urgent: Your account will be suspended", "body": "Click here immediately to verify your account or it will be locked. http://fake-bank.com/verify"},
        {"subject": "URGENT ACTION REQUIRED", "body": "Your account will be closed in 24 hours unless you verify your identity now. Click here: http://verify-now.com/urgent"},
        {"subject": "Immediate attention needed", "body": "We detected suspicious login attempts. Verify your account immediately: http://secure-verify.com/login"},
        {"subject": "Account suspension notice", "body": "Your account has been flagged for suspicious activity. Click here to prevent suspension: http://account-verify.com/secure"},
        
        
        {"subject": "You won $1,000,000!", "body": "Congratulations! You have won a prize. Click this link to claim your money: http://scam.com/claim"},
        {"subject": "Congratulations! You're a winner!", "body": "You've been selected to receive $50,000! Claim your prize now: http://prize-winner.com/claim"},
        {"subject": "Free gift card - Claim now!", "body": "You've been selected for a free $500 gift card! Claim it here: http://scam-gift.com/claim"},
        {"subject": "You've won an iPhone!", "body": "Congratulations! You won our latest iPhone. Click here to claim: http://free-phone.com/win"},
        
        
        {"subject": "Password reset required", "body": "Your password needs to be reset. Please click here to update: http://phishing-site.com/reset"},
        {"subject": "Reset your password immediately", "body": "We noticed unusual activity. Reset your password now: http://reset-password.com/urgent"},
        {"subject": "Password change notification", "body": "Your password was changed. If this wasn't you, click here: http://secure-account.com/verify"},
        {"subject": "Account verification needed", "body": "Verify your account to continue using our services. Click here: http://verify-account.com/now"},
        
        
        {"subject": "Payment confirmation needed", "body": "Your payment is pending. Please confirm your account details by clicking here: http://fake-payment.com"},
        {"subject": "Your invoice is ready", "body": "Download your invoice here: http://malicious-link.com/invoice. Please pay immediately."},
        {"subject": "Payment failed - Update required", "body": "Your payment method failed. Update your billing information here: http://update-payment.com/billing"},
        {"subject": "Invoice #INV-12345", "body": "Please review and pay your invoice. Click here to view: http://invoice-pay.com/view"},
        {"subject": "Update your payment information", "body": "Your payment method expired. Update it here: http://fake-update.com/payment"},
        
        
        {"subject": "Security alert: Unusual activity detected", "body": "We detected suspicious activity on your account. Verify your identity immediately: http://scam-site.com/verify"},
        {"subject": "Security breach detected", "body": "We detected unauthorized access to your account. Secure it now: http://secure-now.com/breach"},
        {"subject": "Login from new device", "body": "We noticed a login from a new device. Verify it's you: http://verify-device.com/login"},
        {"subject": "Account security warning", "body": "Your account security is compromised. Click here to secure: http://secure-account.com/warning"},
        
        
        {"subject": "Account locked - Action required", "body": "Your account has been locked for security. Unlock it now: http://phishing.com/unlock"},
        {"subject": "Your account has been temporarily locked", "body": "Click here to unlock your account: http://unlock-account.com/now"},
        {"subject": "Account access restricted", "body": "Your account access has been restricted. Restore access here: http://restore-access.com/account"},
        
        
        {"subject": "Verify your email address", "body": "We need to verify your email. Click this link now: http://suspicious-link.com/verify"},
        {"subject": "Email verification required", "body": "Please verify your email address to continue. Click here: http://verify-email.com/confirm"},
        
        
        {"subject": "Tax refund available", "body": "You are eligible for a tax refund. Claim it here: http://tax-refund.com/claim"},
        {"subject": "IRS notification - Refund pending", "body": "Your tax refund is ready. Click here to claim: http://irs-refund.com/claim"},
        
        
        {"subject": "Package delivery failed", "body": "We couldn't deliver your package. Click here to reschedule: http://delivery-reschedule.com/package"},
        {"subject": "Your delivery is waiting", "body": "Click here to track and confirm your delivery: http://track-delivery.com/confirm"},
        
        
        {"subject": "Someone tagged you in a photo", "body": "View the photo here: http://social-media.com/view-photo"},
        {"subject": "Your account needs verification", "body": "Verify your social media account to continue: http://verify-social.com/account"},
    ]
    
    
    safe_emails = [
        
        {"subject": "Meeting reminder for tomorrow", "body": "Hi, just a reminder about our meeting tomorrow at 2 PM. See you there!"},
        {"subject": "Team lunch invitation", "body": "Would you like to join us for lunch this Friday? Let me know if you're interested."},
        {"subject": "Schedule for next week", "body": "Here's the schedule for next week. Please let me know if you need any changes."},
        {"subject": "Conference call details", "body": "The conference call is scheduled for Thursday at 10 AM. Dial-in details are attached."},
        
        
        {"subject": "Weekly newsletter", "body": "Here's your weekly newsletter with updates on our latest products and services."},
        {"subject": "Monthly company update", "body": "Here's our monthly update with news about company initiatives and achievements."},
        {"subject": "Product launch announcement", "body": "We're excited to announce our new product line. Check out the details in the attached brochure."},
        
        
        {"subject": "Thank you for your order", "body": "Thank you for your recent purchase. Your order #12345 has been confirmed and will ship soon."},
        {"subject": "Order confirmation #ORD-789", "body": "Your order has been received and is being processed. You'll receive a shipping notification soon."},
        {"subject": "Your order has shipped", "body": "Good news! Your order has shipped. Track your package using the link in your account."},
        
        
        {"subject": "Project update", "body": "Here's an update on the project status. We're making good progress and should meet the deadline."},
        {"subject": "Quarterly report available", "body": "The quarterly report is now available. You can access it through the company portal."},
        {"subject": "Status update on Q4 initiatives", "body": "Here's a status update on our Q4 initiatives. We're on track with most deliverables."},
        
        
        {"subject": "Document review request", "body": "Could you please review the attached document and provide your feedback by end of week?"},
        {"subject": "Please review the proposal", "body": "I've attached the proposal for your review. Let me know if you have any questions."},
        {"subject": "Contract for signature", "body": "Please review and sign the attached contract. Return it by Friday if possible."},
        
        
        {"subject": "Holiday schedule", "body": "Here's the holiday schedule for the upcoming months. Please mark your calendars."},
        {"subject": "Training session announcement", "body": "We're organizing a training session next week. Please register if you're interested."},
        {"subject": "Budget approval", "body": "Your budget request has been approved. You can proceed with the purchase."},
        {"subject": "Policy update notification", "body": "We've updated our company policies. Please review the changes in the attached document."},
        
        
        {"subject": "Welcome to the team", "body": "Welcome to our team! We're excited to have you on board. Here's some information to get you started."},
        {"subject": "Onboarding information", "body": "Here's your onboarding packet with all the information you need to get started."},
        
        
        {"subject": "Follow-up on our conversation", "body": "Following up on our conversation yesterday. I've attached the documents we discussed."},
        {"subject": "Thank you for your time", "body": "Thank you for taking the time to meet with me today. I look forward to our next steps."},
        {"subject": "Request for information", "body": "Could you please provide some additional information about the project? I've listed my questions below."},
        
        
        {"subject": "You're invited to our event", "body": "You're invited to our annual company event. RSVP by next Friday if you'd like to attend."},
        {"subject": "Webinar invitation", "body": "Join us for an informative webinar next week. Register using the link in this email."},
        
        
        {"subject": "We value your feedback", "body": "We'd love to hear your feedback about our service. Please take a moment to complete our survey."},
        {"subject": "Customer satisfaction survey", "body": "Help us improve by sharing your experience. The survey takes just 2 minutes to complete."},
        
        
        {"subject": "Password changed successfully", "body": "Your password has been changed successfully. If you didn't make this change, please contact support."},
        {"subject": "Account activity summary", "body": "Here's a summary of your account activity for the past month. Review it for any unauthorized access."},
        
        
        {"subject": "Shared document with you", "body": "I've shared a document with you. You can access it through the link provided."},
        {"subject": "Team collaboration update", "body": "Here's an update on our team collaboration project. We're making great progress."},
    ]
    
    
    emails = phishing_emails * 30 + safe_emails * 30
    labels = [1] * (len(phishing_emails) * 30) + [0] * (len(safe_emails) * 30)
    
    return emails, labels


if __name__ == "__main__":
    
    print("Generating training data...")
    emails, labels = generate_training_data()
    
    
    detector = PhishingEmailDetector()
    detector.train(emails, labels)
    
    
    detector.save('phishing_model.pkl')
    
    
    test_email = {"subject": "Urgent password reset required", "body": "Click here to reset your password immediately: http://suspicious-link.com/reset"}
    result = detector.predict(test_email)
    print("\nTest Prediction:")
    print(f"Is Phishing: {result['is_phishing']}")
    print(f"Phishing Probability: {result['phishing_probability']:.4f}")
    print(f"Model Breakdown: {result['model_breakdown']}")

