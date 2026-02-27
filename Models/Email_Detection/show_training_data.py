"""
Script to display examples of training data
"""

from phishing_detector import generate_training_data
import json

def show_training_data_examples():
    """Display examples of training data"""
    print("=" * 80)
    print("PHISHING EMAIL DETECTION - TRAINING DATA EXAMPLES")
    print("=" * 80)
    
    emails, labels = generate_training_data()
    
    
    phishing_count = sum(labels)
    safe_count = len(labels) - phishing_count
    
    print(f"\nTotal training examples: {len(emails)}")
    print(f"  - Phishing emails: {phishing_count}")
    print(f"  - Safe emails: {safe_count}")
    print(f"\nUnique phishing templates: {phishing_count // 30}")
    print(f"Unique safe templates: {safe_count // 30}")
    
    
    print("\n" + "=" * 80)
    print("PHISHING EMAIL EXAMPLES (Label: 1)")
    print("=" * 80)
    
    phishing_examples = [email for email, label in zip(emails, labels) if label == 1]
    for i, email in enumerate(phishing_examples[:10], 1):
        print(f"\nExample {i}:")
        print(f"  Subject: {email['subject']}")
        print(f"  Body: {email['body']}")
    
    
    print("\n" + "=" * 80)
    print("SAFE EMAIL EXAMPLES (Label: 0)")
    print("=" * 80)
    
    safe_examples = [email for email, label in zip(emails, labels) if label == 0]
    for i, email in enumerate(safe_examples[:10], 1):
        print(f"\nExample {i}:")
        print(f"  Subject: {email['subject']}")
        print(f"  Body: {email['body']}")
    
    
    print("\n" + "=" * 80)
    print("TRAINING DATA STATISTICS")
    print("=" * 80)
    
    
    phishing_subject_lengths = [len(e['subject']) for e in phishing_examples]
    phishing_body_lengths = [len(e['body']) for e in phishing_examples]
    safe_subject_lengths = [len(e['subject']) for e in safe_examples]
    safe_body_lengths = [len(e['body']) for e in safe_examples]
    
    print(f"\nPhishing Emails:")
    print(f"  Average subject length: {sum(phishing_subject_lengths) / len(phishing_subject_lengths):.1f} characters")
    print(f"  Average body length: {sum(phishing_body_lengths) / len(phishing_body_lengths):.1f} characters")
    
    print(f"\nSafe Emails:")
    print(f"  Average subject length: {sum(safe_subject_lengths) / len(safe_subject_lengths):.1f} characters")
    print(f"  Average body length: {sum(safe_body_lengths) / len(safe_body_lengths):.1f} characters")
    
    
    import re
    phishing_urls = sum(len(re.findall(r'http[s]?://[^\s]+', e['body'])) for e in phishing_examples)
    safe_urls = sum(len(re.findall(r'http[s]?://[^\s]+', e['body'])) for e in safe_examples)
    
    print(f"\nURL Count:")
    print(f"  Phishing emails contain {phishing_urls} URLs")
    print(f"  Safe emails contain {safe_urls} URLs")
    
    print("\n" + "=" * 80)
    print("Training data is ready for model training!")
    print("=" * 80)


if __name__ == "__main__":
    show_training_data_examples()

