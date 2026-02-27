
class PasswordGenerator {
    constructor() {
        this.uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        this.lowercase = 'abcdefghijklmnopqrstuvwxyz';
        this.numbers = '0123456789';
        this.symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
        this.similarChars = 'il1Lo0O';
        this.ambiguousChars = '{}[]()/\\\'"~,;:.';
        
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        const lengthSlider = document.getElementById('length');
        const lengthValue = document.getElementById('length-value');
        const generateBtn = document.getElementById('generate-btn');
        const generateMultipleBtn = document.getElementById('generate-multiple-btn');
        const copyBtn = document.getElementById('copy-btn');

        
        lengthSlider.addEventListener('input', (e) => {
            lengthValue.textContent = e.target.value;
        });

        
        generateBtn.addEventListener('click', () => {
            this.generatePassword();
        });

        
        generateMultipleBtn.addEventListener('click', () => {
            this.generateMultiplePasswords();
        });

        
        copyBtn.addEventListener('click', () => {
            this.copyToClipboard();
        });

        
        document.getElementById('custom-chars').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.generatePassword();
            }
        });
    }

    getCharacterSet() {
        let charset = '';
        const customChars = document.getElementById('custom-chars').value;

        if (document.getElementById('uppercase').checked) {
            charset += this.uppercase;
        }
        if (document.getElementById('lowercase').checked) {
            charset += this.lowercase;
        }
        if (document.getElementById('numbers').checked) {
            charset += this.numbers;
        }
        if (document.getElementById('symbols').checked) {
            charset += this.symbols;
        }
        if (customChars) {
            charset += customChars;
        }

        
        if (document.getElementById('exclude-similar').checked) {
            for (let char of this.similarChars) {
                charset = charset.replace(new RegExp(char, 'g'), '');
            }
        }

        
        if (document.getElementById('exclude-ambiguous').checked) {
            for (let char of this.ambiguousChars) {
                charset = charset.replace(new RegExp('\\' + char, 'g'), '');
            }
        }

        return charset;
    }

    getFilteredCharset(baseCharset, excludeSimilar, excludeAmbiguous) {
        let filtered = baseCharset;
        
        if (excludeSimilar) {
            for (let char of this.similarChars) {
                filtered = filtered.replace(new RegExp(char, 'g'), '');
            }
        }
        
        if (excludeAmbiguous) {
            for (let char of this.ambiguousChars) {
                filtered = filtered.replace(new RegExp('\\' + char, 'g'), '');
            }
        }
        
        return filtered;
    }

    generatePassword() {
        const length = parseInt(document.getElementById('length').value);
        const excludeSimilar = document.getElementById('exclude-similar').checked;
        const excludeAmbiguous = document.getElementById('exclude-ambiguous').checked;
        const customChars = document.getElementById('custom-chars').value;
        
        let charset = this.getCharacterSet();

        if (charset.length === 0) {
            alert('Please select at least one character type!');
            return;
        }

        
        let password = '';
        const options = {
            uppercase: document.getElementById('uppercase').checked,
            lowercase: document.getElementById('lowercase').checked,
            numbers: document.getElementById('numbers').checked,
            symbols: document.getElementById('symbols').checked
        };

        
        if (options.uppercase) {
            let chars = this.getFilteredCharset(this.uppercase, excludeSimilar, false);
            if (chars.length > 0) {
                password += chars[Math.floor(Math.random() * chars.length)];
            }
        }
        if (options.lowercase) {
            let chars = this.getFilteredCharset(this.lowercase, excludeSimilar, false);
            if (chars.length > 0) {
                password += chars[Math.floor(Math.random() * chars.length)];
            }
        }
        if (options.numbers) {
            let chars = this.getFilteredCharset(this.numbers, excludeSimilar, false);
            if (chars.length > 0) {
                password += chars[Math.floor(Math.random() * chars.length)];
            }
        }
        if (options.symbols) {
            let chars = this.getFilteredCharset(this.symbols, false, excludeAmbiguous);
            if (chars.length > 0) {
                password += chars[Math.floor(Math.random() * chars.length)];
            }
        }

        
        for (let i = password.length; i < length; i++) {
            password += charset[Math.floor(Math.random() * charset.length)];
        }

        
        password = this.shuffleString(password);

        
        document.getElementById('password-output').value = password;
        document.getElementById('multiple-passwords').innerHTML = '';
        
        
        this.updatePasswordInfo(password);
    }

    generateMultiplePasswords() {
        const container = document.getElementById('multiple-passwords');
        container.innerHTML = '<h3>Generated Passwords:</h3>';
        
        for (let i = 0; i < 5; i++) {
            const length = parseInt(document.getElementById('length').value);
            let charset = this.getCharacterSet();

            if (charset.length === 0) {
                alert('Please select at least one character type!');
                return;
            }

            let password = '';
            for (let j = 0; j < length; j++) {
                password += charset[Math.floor(Math.random() * charset.length)];
            }

            password = this.shuffleString(password);

            const passwordDiv = document.createElement('div');
            passwordDiv.className = 'password-item';
            passwordDiv.innerHTML = `
                <input type="text" value="${password}" readonly>
                <button class="copy-item-btn" onclick="this.previousElementSibling.select(); document.execCommand('copy'); this.textContent='✓'; setTimeout(() => this.textContent='📋', 1000);">📋</button>
            `;
            container.appendChild(passwordDiv);
        }

        document.getElementById('password-output').value = '';
        this.updatePasswordInfo('');
    }

    shuffleString(str) {
        const arr = str.split('');
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr.join('');
    }

    calculateEntropy(password) {
        if (!password) return 0;
        
        let charset = this.getCharacterSet();
        if (charset.length === 0) return 0;
        
        
        let uniqueChars = new Set(password);
        let effectiveCharset = '';
        
        for (let char of uniqueChars) {
            if (charset.includes(char)) {
                effectiveCharset += char;
            }
        }
        
        const charsetSize = effectiveCharset.length || charset.length;
        return Math.log2(Math.pow(charsetSize, password.length));
    }

    calculateStrength(password) {
        if (!password || password.length === 0) {
            return { level: 0, text: '-', color: '#ccc' };
        }

        let score = 0;
        const length = password.length;

        
        if (length >= 4) score += 1;
        if (length >= 8) score += 1;
        if (length >= 12) score += 1;
        if (length >= 16) score += 1;
        if (length >= 20) score += 1;

        
        if (/[a-z]/.test(password)) score += 1;
        if (/[A-Z]/.test(password)) score += 1;
        if (/[0-9]/.test(password)) score += 1;
        if (/[^a-zA-Z0-9]/.test(password)) score += 1;

        
        if (length >= 24) score += 1;
        if (length >= 32) score += 1;

        
        let level, text, color;
        if (score <= 2) {
            level = 1;
            text = 'Very Weak';
            color = '#ff4444';
        } else if (score <= 4) {
            level = 2;
            text = 'Weak';
            color = '#ff8800';
        } else if (score <= 6) {
            level = 3;
            text = 'Fair';
            color = '#ffbb00';
        } else if (score <= 8) {
            level = 4;
            text = 'Good';
            color = '#88cc00';
        } else {
            level = 5;
            text = 'Strong';
            color = '#00aa00';
        }

        return { level, text, color };
    }

    updatePasswordInfo(password) {
        const strength = this.calculateStrength(password);
        const entropy = this.calculateEntropy(password);

        
        const strengthFill = document.getElementById('strength-fill');
        const strengthText = document.getElementById('strength-text');
        
        strengthFill.style.width = `${(strength.level / 5) * 100}%`;
        strengthFill.style.backgroundColor = strength.color;
        strengthText.textContent = strength.text;
        strengthText.style.color = strength.color;

        
        document.getElementById('entropy').textContent = entropy.toFixed(2);
    }

    async copyToClipboard() {
        const passwordOutput = document.getElementById('password-output');
        const password = passwordOutput.value;

        if (!password) {
            alert('No password to copy! Generate a password first.');
            return;
        }

        try {
            await navigator.clipboard.writeText(password);
            const copyBtn = document.getElementById('copy-btn');
            const originalText = copyBtn.textContent;
            copyBtn.textContent = '✓';
            copyBtn.style.backgroundColor = '#00aa00';
            
            setTimeout(() => {
                copyBtn.textContent = originalText;
                copyBtn.style.backgroundColor = '';
            }, 2000);
        } catch (err) {
            
            passwordOutput.select();
            document.execCommand('copy');
            alert('Password copied to clipboard!');
        }
    }
}


document.addEventListener('DOMContentLoaded', () => {
    new PasswordGenerator();
});

