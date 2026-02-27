

class PasswordStrengthChecker {
    constructor() {
        
        this.commonPasswords = [
            'password', '12345678', '123456789', '1234567890', 'qwerty',
            'abc123', 'password1', 'welcome', 'monkey', '1234567',
            'letmein', 'trustno1', 'dragon', 'baseball', 'iloveyou',
            'master', 'sunshine', 'ashley', 'bailey', 'passw0rd',
            'shadow', '123123', '654321', 'superman', 'qazwsx',
            'michael', 'football', 'welcome', 'jesus', 'ninja',
            'mustang', 'password123', 'admin', '1234', 'root'
        ];
    }

    
    calculateStrength(password) {
        if (!password || password.length === 0) {
            return {
                score: 0,
                strength: 'empty',
                label: 'Enter a password',
                color: '#9e9e9e',
                requirements: this.getRequirements(password),
                details: this.getDetails(password),
                suggestions: []
            };
        }

        let score = 0;
        const checks = this.performChecks(password);
        
        
        if (password.length >= 8) score += 10;
        if (password.length >= 12) score += 10;
        if (password.length >= 16) score += 5;
        
        
        if (checks.hasLowercase) score += 5;
        if (checks.hasUppercase) score += 5;
        if (checks.hasNumbers) score += 5;
        if (checks.hasSpecial) score += 10;
        if (checks.characterVariety >= 4) score += 5;
        
        
        if (!checks.isCommon) score += 10;
        if (!checks.hasRepetition) score += 8;
        if (!checks.hasSequences) score += 7;
        
        
        const entropy = this.calculateEntropy(password);
        score += Math.min(20, Math.floor(entropy / 2));
        
        
        if (checks.isCommon) score -= 20;
        if (checks.hasRepetition) score -= 10;
        if (checks.hasSequences) score -= 10;
        
        score = Math.max(0, Math.min(100, score));
        
        const strength = this.getStrengthLevel(score);
        
        return {
            score: Math.round(score),
            strength: strength.level,
            label: strength.label,
            color: strength.color,
            requirements: this.getRequirements(password, checks),
            details: this.getDetails(password, checks, entropy),
            suggestions: this.getSuggestions(password, checks, score)
        };
    }

    
    performChecks(password) {
        const hasLowercase = /[a-z]/.test(password);
        const hasUppercase = /[A-Z]/.test(password);
        const hasNumbers = /[0-9]/.test(password);
        const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
        
        // Character variety count
        let varietyCount = 0;
        if (hasLowercase) varietyCount++;
        if (hasUppercase) varietyCount++;
        if (hasNumbers) varietyCount++;
        if (hasSpecial) varietyCount++;
        
        // Check for common passwords (case-insensitive)
        const isCommon = this.commonPasswords.some(
            common => password.toLowerCase() === common.toLowerCase()
        );
        
        // Check for excessive repetition (same char 3+ times in a row)
        const hasRepetition = /(.)\1{2,}/.test(password);
        
        // Check for obvious sequences
        const hasSequences = this.hasObviousSequences(password);
        
        return {
            hasLowercase,
            hasUppercase,
            hasNumbers,
            hasSpecial,
            characterVariety: varietyCount,
            isCommon,
            hasRepetition,
            hasSequences
        };
    }

    /**
     * Check for obvious sequences
     */
    hasObviousSequences(password) {
        const sequences = [
            '0123456789', '9876543210', 'abcdefghijklmnopqrstuvwxyz',
            'zyxwvutsrqponmlkjihgfedcba', 'qwertyuiop', 'asdfghjkl',
            'zxcvbnm', '123456', '654321', 'abc', 'cba'
        ];
        
        const lowerPassword = password.toLowerCase();
        
        for (const seq of sequences) {
            if (lowerPassword.includes(seq) || lowerPassword.includes(this.reverseString(seq))) {
                return true;
            }
        }
        
        // Check for keyboard patterns
        const keyboardRows = [
            'qwertyuiop', 'asdfghjkl', 'zxcvbnm',
            '1234567890'
        ];
        
        for (const row of keyboardRows) {
            for (let i = 0; i <= row.length - 3; i++) {
                const pattern = row.substring(i, i + 3);
                if (lowerPassword.includes(pattern) || 
                    lowerPassword.includes(this.reverseString(pattern))) {
                    return true;
                }
            }
        }
        
        return false;
    }

    /**
     * Reverse a string
     */
    reverseString(str) {
        return str.split('').reverse().join('');
    }

    /**
     * Calculate password entropy
     */
    calculateEntropy(password) {
        let charsetSize = 0;
        
        if (/[a-z]/.test(password)) charsetSize += 26;
        if (/[A-Z]/.test(password)) charsetSize += 26;
        if (/[0-9]/.test(password)) charsetSize += 10;
        if (/[^a-zA-Z0-9]/.test(password)) charsetSize += 32; // Approximate special chars
        
        if (charsetSize === 0) return 0;
        
        return password.length * Math.log2(charsetSize);
    }

    /**
     * Get strength level from score
     */
    getStrengthLevel(score) {
        if (score < 20) {
            return { level: 'very-weak', label: 'Very Weak', color: '#f44336' };
        } else if (score < 40) {
            return { level: 'weak', label: 'Weak', color: '#ff9800' };
        } else if (score < 60) {
            return { level: 'fair', label: 'Fair', color: '#ffc107' };
        } else if (score < 80) {
            return { level: 'good', label: 'Good', color: '#4caf50' };
        } else {
            return { level: 'strong', label: 'Strong', color: '#2196f3' };
        }
    }

    /**
     * Get requirements status
     */
    getRequirements(password, checks = null) {
        if (!password) {
            return {
                length: false,
                uppercase: false,
                lowercase: false,
                numbers: false,
                special: false,
                common: false,
                repetition: false,
                sequences: false
            };
        }
        
        if (!checks) {
            checks = this.performChecks(password);
        }
        
        return {
            length: password.length >= 8,
            uppercase: checks.hasUppercase,
            lowercase: checks.hasLowercase,
            numbers: checks.hasNumbers,
            special: checks.hasSpecial,
            common: !checks.isCommon,
            repetition: !checks.hasRepetition,
            sequences: !checks.hasSequences
        };
    }

    /**
     * Get detailed password information
     */
    getDetails(password, checks = null, entropy = null) {
        if (!password) {
            return {
                length: 0,
                variety: 0,
                entropy: 0,
                crackTime: '-'
            };
        }
        
        if (!checks) {
            checks = this.performChecks(password);
        }
        
        if (entropy === null) {
            entropy = this.calculateEntropy(password);
        }
        
        return {
            length: password.length,
            variety: checks.characterVariety,
            entropy: Math.round(entropy * 10) / 10,
            crackTime: this.estimateCrackTime(entropy, password.length)
        };
    }

    /**
     * Estimate time to crack password
     */
    estimateCrackTime(entropy, length) {
        if (entropy === 0) return 'Instant';
        
        // Rough estimation based on entropy
        // Assuming 10^9 guesses per second (modern GPU)
        const guessesPerSecond = 1e9;
        const totalGuesses = Math.pow(2, entropy);
        const seconds = totalGuesses / guessesPerSecond;
        
        if (seconds < 1) return 'Less than a second';
        if (seconds < 60) return `${Math.round(seconds)} seconds`;
        if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`;
        if (seconds < 86400) return `${Math.round(seconds / 3600)} hours`;
        if (seconds < 31536000) return `${Math.round(seconds / 86400)} days`;
        if (seconds < 31536000000) return `${Math.round(seconds / 31536000)} years`;
        
        return `${Math.round(seconds / 31536000000)} millennia`;
    }

    /**
     * Get suggestions for improving password
     */
    getSuggestions(password, checks, score) {
        const suggestions = [];
        
        if (password.length < 8) {
            suggestions.push('Use at least 8 characters');
        } else if (password.length < 12) {
            suggestions.push('Consider using 12+ characters for better security');
        }
        
        if (!checks.hasUppercase) {
            suggestions.push('Add uppercase letters');
        }
        
        if (!checks.hasLowercase) {
            suggestions.push('Add lowercase letters');
        }
        
        if (!checks.hasNumbers) {
            suggestions.push('Add numbers');
        }
        
        if (!checks.hasSpecial) {
            suggestions.push('Add special characters (!@#$%^&*)');
        }
        
        if (checks.isCommon) {
            suggestions.push('Avoid common passwords');
        }
        
        if (checks.hasRepetition) {
            suggestions.push('Avoid repeating characters');
        }
        
        if (checks.hasSequences) {
            suggestions.push('Avoid obvious sequences (123, abc, qwerty)');
        }
        
        if (score < 60) {
            suggestions.push('Combine multiple character types for stronger password');
        }
        
        return suggestions;
    }
}

