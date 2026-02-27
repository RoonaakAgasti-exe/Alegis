document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('scanForm');
    const scanButton = document.getElementById('scanButton');
    const resultsPanel = document.getElementById('results');
    const errorMessage = document.getElementById('error');
    const loading = document.getElementById('loading');
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        
        resultsPanel.style.display = 'none';
        errorMessage.style.display = 'none';
        
        
        const subject = document.getElementById('subject').value.trim();
        const body = document.getElementById('body').value.trim();
        
        if (!subject && !body) {
            showError('Please enter at least a subject or body content.');
            return;
        }
        
        
        loading.style.display = 'block';
        scanButton.disabled = true;
        
        try {
            
            const response = await fetch('/api/scan', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    subject: subject,
                    body: body
                })
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || 'An error occurred');
            }
            
            
            displayResults(data);
            
        } catch (error) {
            showError(error.message || 'Failed to scan email. Please try again.');
        } finally {
            loading.style.display = 'none';
            scanButton.disabled = false;
        }
    });
    
    function displayResults(data) {
        const resultStatus = document.getElementById('resultStatus');
        const phishingPercent = document.getElementById('phishingPercent');
        const phishingProgress = document.getElementById('phishingProgress');
        const modelScores = document.getElementById('modelScores');
        
        
        if (data.is_phishing) {
            resultStatus.textContent = '⚠️ PHISHING DETECTED';
            resultStatus.className = 'result-status phishing';
        } else {
            resultStatus.textContent = '✓ EMAIL IS SAFE';
            resultStatus.className = 'result-status safe';
        }
        
        
        phishingPercent.textContent = `${data.phishing_probability}%`;
        phishingProgress.style.width = `${data.phishing_probability}%`;
        
        
        if (data.phishing_probability > 70) {
            phishingProgress.style.background = 'linear-gradient(90deg, #e74c3c 0%, #c0392b 100%)';
        } else if (data.phishing_probability > 40) {
            phishingProgress.style.background = 'linear-gradient(90deg, #f39c12 0%, #e67e22 100%)';
        } else {
            phishingProgress.style.background = 'linear-gradient(90deg, #2ecc71 0%, #27ae60 100%)';
        }
        
        
        modelScores.innerHTML = '';
        for (const [modelName, score] of Object.entries(data.model_breakdown)) {
            const modelItem = document.createElement('div');
            modelItem.className = 'model-score-item';
            
            const modelNameDiv = document.createElement('div');
            modelNameDiv.className = 'model-name';
            modelNameDiv.textContent = formatModelName(modelName);
            
            const modelValueDiv = document.createElement('div');
            modelValueDiv.className = 'model-value';
            modelValueDiv.textContent = `${score}%`;
            
            modelItem.appendChild(modelNameDiv);
            modelItem.appendChild(modelValueDiv);
            modelScores.appendChild(modelItem);
        }
        
        
        resultsPanel.style.display = 'block';
        resultsPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    
    function formatModelName(name) {
        return name
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }
    
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
        errorMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
});

