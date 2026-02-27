

document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('passwordInput');
    const toggleVisibility = document.getElementById('toggleVisibility');
    const strengthBar = document.getElementById('strengthBar');
    const strengthLabel = document.getElementById('strengthLabel');
    const scoreValue = document.getElementById('scoreValue');
    const requirementList = document.getElementById('requirementList');
    const suggestions = document.getElementById('suggestions');
    
    
    const detailLength = document.getElementById('detailLength');
    const detailVariety = document.getElementById('detailVariety');
    const detailEntropy = document.getElementById('detailEntropy');
    const detailCrackTime = document.getElementById('detailCrackTime');
    
    const checker = new PasswordStrengthChecker();
    let isPasswordVisible = false;
    
    
    toggleVisibility.addEventListener('click', () => {
        isPasswordVisible = !isPasswordVisible;
        passwordInput.type = isPasswordVisible ? 'text' : 'password';
        toggleVisibility.textContent = isPasswordVisible ? '🙈' : '👁️';
    });
    
    
    passwordInput.addEventListener('input', (e) => {
        const password = e.target.value;
        const result = checker.calculateStrength(password);
        
        updateUI(result);
    });
    
    
    function updateUI(result) {
        
        strengthBar.style.width = `${result.score}%`;
        strengthBar.style.backgroundColor = result.color;
        
        
        strengthLabel.textContent = result.label;
        strengthLabel.style.color = result.color;
        
        
        scoreValue.textContent = result.score;
        scoreValue.style.color = result.color;
        
        
        updateRequirements(result.requirements);
        
        
        updateDetails(result.details);
        
        
        updateSuggestions(result.suggestions);
    }
    
    
    function updateRequirements(requirements) {
        const requirementItems = requirementList.querySelectorAll('li');
        
        requirementItems.forEach(item => {
            const requirement = item.dataset.requirement;
            const icon = item.querySelector('.icon');
            const isMet = requirements[requirement];
            
            if (isMet) {
                icon.textContent = '✅';
                item.classList.add('met');
                item.classList.remove('not-met');
            } else {
                icon.textContent = '❌';
                item.classList.add('not-met');
                item.classList.remove('met');
            }
        });
    }
    
    
    function updateDetails(details) {
        detailLength.textContent = details.length;
        detailVariety.textContent = `${details.variety}/4`;
        detailEntropy.textContent = details.entropy;
        detailCrackTime.textContent = details.crackTime;
    }
    
    
    function updateSuggestions(suggestionList) {
        if (suggestionList.length === 0) {
            suggestions.innerHTML = '<div class="suggestion-item success">✓ Your password looks strong!</div>';
            suggestions.style.display = 'block';
            return;
        }
        
        suggestions.innerHTML = suggestionList
            .map(suggestion => `<div class="suggestion-item">💡 ${suggestion}</div>`)
            .join('');
        suggestions.style.display = 'block';
    }
    
    
    updateUI(checker.calculateStrength(''));
});

