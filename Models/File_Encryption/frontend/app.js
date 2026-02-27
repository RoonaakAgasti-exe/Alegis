let currentMode = 'encrypt';
let selectedFile = null;
let processedData = null;
let resultFileName = '';
function setMode(mode) {
    currentMode = mode;
    const encryptBtn = document.getElementById('encryptBtn');
    const decryptBtn = document.getElementById('decryptBtn');
    const btnText = document.getElementById('btnText');
    if (mode === 'encrypt') {
        encryptBtn.classList.add('active');
        decryptBtn.classList.remove('active');
        btnText.textContent = '🔒 Encrypt File';
    } else {
        decryptBtn.classList.add('active');
        encryptBtn.classList.remove('active');
        btnText.textContent = '🔓 Decrypt File';
    }
    resetState();
}
function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        selectedFile = file;
        const fileInfo = document.getElementById('fileInfo');
        const fileSizeKB = (file.size / 1024).toFixed(2);
        fileInfo.textContent = `📄 Selected: ${file.name} (${fileSizeKB} KB)`;
        fileInfo.style.display = 'block';
        hideAlert();
        hideResult();
    }
}
async function processFile() {
    if (!selectedFile) {
        showError('Please select a file first');
        return;
    }
    const password = document.getElementById('passwordInput').value;
    if (!password) {
        showError('Please enter a password');
        return;
    }
    if (password.length < 8) {
        showError('Password must be at least 8 characters long');
        return;
    }
    const processBtn = document.getElementById('processBtn');
    const btnText = document.getElementById('btnText');
    const originalText = btnText.textContent;
    processBtn.disabled = true;
    btnText.innerHTML = '<span class="loading"></span> Processing...';
    hideAlert();
    hideResult();
    try {
        const fileData = await readFileAsArrayBuffer(selectedFile);
        if (currentMode === 'encrypt') {
            processedData = await encryptFile(new Uint8Array(fileData), password);
            resultFileName = selectedFile.name + '.encrypted';
            showSuccess('Encryption successful!', resultFileName, processedData.length);
        } else {
            processedData = await decryptFile(new Uint8Array(fileData), password);
            resultFileName = selectedFile.name.replace('.encrypted', '');
            showSuccess('Decryption successful!', resultFileName, processedData.length);
        }
    } catch (error) {
        showError(error.message || 'An error occurred during processing');
    } finally {
        processBtn.disabled = false;
        btnText.textContent = originalText;
    }
}
function downloadResult() {
    if (!processedData) {
        showError('No file to download');
        return;
    }
    const blob = new Blob([processedData], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = resultFileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
function showError(message) {
    const errorAlert = document.getElementById('errorAlert');
    errorAlert.textContent = '⚠️ ' + message;
    errorAlert.classList.add('show');
}
function showSuccess(message, fileName, fileSize) {
    const resultBox = document.getElementById('resultBox');
    const resultInfo = document.getElementById('resultInfo');
    const fileSizeKB = (fileSize / 1024).toFixed(2);
    resultInfo.innerHTML = `
        <strong>✅ ${message}</strong><br>
        📄 File: ${fileName}<br>
        📊 Size: ${fileSizeKB} KB
    `;
    resultBox.classList.add('show');
}
function hideAlert() {
    const errorAlert = document.getElementById('errorAlert');
    errorAlert.classList.remove('show');
}
function hideResult() {
    const resultBox = document.getElementById('resultBox');
    resultBox.classList.remove('show');
}
function downloadResult() {
    if (!processedData || !processedData.length) {
        showError('No processed file available');
        return;
    }
    const blob = new Blob([processedData], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = resultFileName || 'result.bin';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
}
function resetState() {
    selectedFile = null;
    processedData = null;
    resultFileName = '';
    document.getElementById('fileInput').value = '';
    document.getElementById('passwordInput').value = '';
    document.getElementById('fileInfo').style.display = 'none';
    hideAlert();
    hideResult();
}
function readFileAsArrayBuffer(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            resolve(event.target.result);
        };
        reader.onerror = (error) => {
            reject(new Error('Failed to read file: ' + error));
        };
        reader.readAsArrayBuffer(file);
    });
}
async function encryptFile(fileData, password) {
    try {
        
        const encoder = new TextEncoder();
        const passwordBuffer = encoder.encode(password);
        
        
        const keyMaterial = await crypto.subtle.importKey(
            'raw',
            passwordBuffer,
            'PBKDF2',
            false,
            ['deriveBits', 'deriveKey']
        );

        
        const salt = crypto.getRandomValues(new Uint8Array(16));
        
        
        const key = await crypto.subtle.deriveKey(
            {
                name: 'PBKDF2',
                salt: salt,
                iterations: 100000,
                hash: 'SHA-256'
            },
            keyMaterial,
            { name: 'AES-GCM', length: 256 },
            false,
            ['encrypt']
        );

        
        const iv = crypto.getRandomValues(new Uint8Array(12));

        
        const encryptedContent = await crypto.subtle.encrypt(
            {
                name: 'AES-GCM',
                iv: iv
            },
            key,
            fileData
        );

        
        const combined = new Uint8Array(
            salt.length + iv.length + encryptedContent.byteLength
        );
        combined.set(salt, 0);
        combined.set(iv, salt.length);
        combined.set(new Uint8Array(encryptedContent), salt.length + iv.length);

        return combined;
    } catch (err) {
        throw new Error('Encryption failed: ' + err.message);
    }
}


async function decryptFile(encryptedData, password) {
    try {
        
        const encoder = new TextEncoder();
        const passwordBuffer = encoder.encode(password);

        
        const salt = encryptedData.slice(0, 16);
        const iv = encryptedData.slice(16, 28);
        const encryptedContent = encryptedData.slice(28);

        
        const keyMaterial = await crypto.subtle.importKey(
            'raw',
            passwordBuffer,
            'PBKDF2',
            false,
            ['deriveBits', 'deriveKey']
        );

        
        const key = await crypto.subtle.deriveKey(
            {
                name: 'PBKDF2',
                salt: salt,
                iterations: 100000,
                hash: 'SHA-256'
            },
            keyMaterial,
            { name: 'AES-GCM', length: 256 },
            false,
            ['decrypt']
        );

        
        const decryptedContent = await crypto.subtle.decrypt(
            {
                name: 'AES-GCM',
                iv: iv
            },
            key,
            encryptedContent
        );

        return new Uint8Array(decryptedContent);
    } catch (err) {
        throw new Error('Decryption failed: Wrong password or corrupted file');
    }
}


document.addEventListener('DOMContentLoaded', function() {
    console.log('File Encryption Tool loaded successfully');
    console.log('Mode:', currentMode);
});
