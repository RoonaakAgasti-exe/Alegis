"""
Export training data to CSV file for easy viewing
"""

from phishing_detector import generate_training_data
import pandas as pd
import csv

def export_training_data_to_csv():
    print("Generating training data...")
    emails, labels = generate_training_data()
    
    data = []
    for email, label in zip(emails, labels):
        data.append({
            'label': 'Phishing' if label == 1 else 'Safe',
            'label_numeric': label,
            'subject': email['subject'],
            'body': email['body'],
            'combined_text': f"{email['subject']} {email['body']}"
        })
    
    df = pd.DataFrame(data)
    
    csv_filename = 'training_data.csv'
    df.to_csv(csv_filename, index=False, encoding='utf-8')
    
    print(f"\nTraining data exported to '{csv_filename}'")
    print(f"Total rows: {len(df)}")
    print(f"  - Phishing: {len(df[df['label'] == 'Phishing'])}")
    print(f"  - Safe: {len(df[df['label'] == 'Safe'])}")
    
    print("\nFirst 5 rows:")
    print(df.head().to_string())
    
    return csv_filename


if __name__ == "__main__":
    export_training_data_to_csv()

