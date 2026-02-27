


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


export { encryptFile, decryptFile };