import hashlib
import os
from flask import Flask, render_template, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)



known_hashes = {}

def calculate_hash(file_path):
    sha256_hash = hashlib.sha256()
    with open(file_path, "rb") as f:
        for byte_block in iter(lambda: f.read(4096), b""):
            sha256_hash.update(byte_block)
    return sha256_hash.hexdigest()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/generate-hash', methods=['POST'])
def generate_hash():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400
    
    file = request.files['file']
    file_path = os.path.join("uploads", file.filename)
    if not os.path.exists("uploads"):
        os.makedirs("uploads")
    
    file.save(file_path)
    file_hash = calculate_hash(file_path)
    
    
    known_hashes[file.filename] = file_hash
    
    return jsonify({
        "success": True,
        "filename": file.filename,
        "hash": file_hash,
        "message": "File fingerprint generated successfully."
    })

@app.route('/api/verify-integrity', methods=['POST'])
def verify_integrity():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400
    
    file = request.files['file']
    file_path = os.path.join("uploads", file.filename)
    file.save(file_path)
    
    current_hash = calculate_hash(file_path)
    original_hash = request.form.get('original_hash')
    
    if not original_hash:
        return jsonify({"error": "Original hash required for verification"}), 400
    
    is_intact = (current_hash == original_hash)
    
    
    
    anomaly_score = 0 if is_intact else 0.85
    
    return jsonify({
        "success": True,
        "filename": file.filename,
        "is_intact": is_intact,
        "current_hash": current_hash,
        "original_hash": original_hash,
        "anomaly_score": anomaly_score,
        "message": "Integrity check completed." if is_intact else "File tampering detected!"
    })

if __name__ == '__main__':
    app.run(port=5001, debug=True)
