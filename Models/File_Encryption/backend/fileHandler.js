


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


function readFileAsBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      const base64 = event.target.result.split(',')[1];
      resolve(base64);
    };
    
    reader.onerror = (error) => {
      reject(new Error('Failed to read file: ' + error));
    };
    
    reader.readAsDataURL(file);
  });
}


function uint8ArrayToBase64(data) {
  let binary = '';
  const len = data.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(data[i]);
  }
  return btoa(binary);
}


function base64ToUint8Array(base64) {
  const binary = atob(base64);
  const len = binary.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}


function createBlob(data, mimeType = 'application/octet-stream') {
  return new Blob([data], { type: mimeType });
}


function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}


function getFileExtension(filename) {
  const parts = filename.split('.');
  return parts.length > 1 ? parts.pop() : '';
}


function removeFileExtension(filename) {
  const lastDotIndex = filename.lastIndexOf('.');
  return lastDotIndex > 0 ? filename.substring(0, lastDotIndex) : filename;
}


function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}


function validateFileSize(file, maxSizeMB = 100) {
  const maxBytes = maxSizeMB * 1024 * 1024;
  return file.size <= maxBytes;
}


function validatePassword(password) {
  if (!password || password.length === 0) {
    return { isValid: false, message: 'Password is required' };
  }
  
  if (password.length < 8) {
    return { isValid: false, message: 'Password must be at least 8 characters' };
  }
  
  return { isValid: true, message: 'Password is valid' };
}


export {
  readFileAsArrayBuffer,
  readFileAsBase64,
  uint8ArrayToBase64,
  base64ToUint8Array,
  createBlob,
  downloadBlob,
  getFileExtension,
  removeFileExtension,
  formatFileSize,
  validateFileSize,
  validatePassword
};