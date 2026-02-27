# Cybersecurity Dashboard - ML Models Startup Script
# This script helps start all the ML model servers for the dashboard

Write-Host "Starting Cybersecurity Dashboard ML Models..." -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Yellow

# Function to start a Python Flask app
function Start-FlaskApp {
    param([string]$path, [string]$name, [int]$port, [string]$script="app.py")

    Write-Host "Starting $name on port $port..." -ForegroundColor Green
    if (Test-Path $path) {
        $cmd = "cd '$path'; "
        if (Test-Path "$path\venv") {
            $cmd += ".\venv\Scripts\activate; "
        } elseif (Test-Path "$path\.venv") {
            $cmd += ".\.venv\Scripts\activate; "
        }
        $cmd += "python '$script'"
        
        Start-Process powershell -ArgumentList "-NoProfile", "-Command", "$cmd" -NoNewWindow
        Start-Sleep -Seconds 2
        Write-Host "$name start triggered (http://localhost:$port)" -ForegroundColor Green
    } else {
        Write-Host "Error: Path not found for $name at $path" -ForegroundColor Red
    }
}

# Function to start a Node.js app
function Start-NodeApp {
    param([string]$path, [string]$name, [int]$port, [string]$startCmd="")

    Write-Host "Starting $name on port $port..." -ForegroundColor Green
    if (Test-Path $path) {
        # Decide start command based on available scripts if not provided
        if ($startCmd -eq "") {
            $startCmd = "start"
            try {
                if (Test-Path "$path\package.json") {
                    $pkg = Get-Content "$path\package.json" -Raw | ConvertFrom-Json
                    $scriptNames = @()
                    if ($pkg.scripts) {
                        $scriptNames = $pkg.scripts.PSObject.Properties.Name
                    }
                    if ($scriptNames -contains "start") {
                        $startCmd = "start"
                    } elseif ($scriptNames -contains "dev") {
                        $startCmd = "run dev"
                    }
                }
            } catch {
                $startCmd = "start"
            }
        }
        
        $cmd = "cd '$path'; npm $startCmd"
        Start-Process powershell -ArgumentList "-NoProfile", "-Command", "$cmd" -NoNewWindow
        Start-Sleep -Seconds 2
        Write-Host "$name start triggered (http://localhost:$port)" -ForegroundColor Green
    } else {
        Write-Host "Error: Path not found for $name at $path" -ForegroundColor Red
    }
}

# Start all ML models
$basePath = "D:\Codes\Alegis\Models"

# Python Flask Apps
Start-FlaskApp "$basePath\Email_Detection" "Email Detection" 5000
Start-FlaskApp "$basePath\File_Integrity" "File Integrity" 5001
Start-FlaskApp "$basePath\DARK WEB MONITORING" "Dark Web Monitoring" 5002 "flask_app.py"

# Node.js Apps (servers)
Start-NodeApp "$basePath\File_Encryption" "File Encryption" 3003
Start-NodeApp "$basePath\Fraud_Detection" "Fraud Detection" 3004
Start-NodeApp "$basePath\Password_Generator" "Password Generator" 3005
Start-NodeApp "$basePath\Password_Strength_Checker" "Password Strength Checker" 3006

# React Apps (Vite dev servers with fixed ports)
Start-NodeApp "$basePath\Deep-fake-detection\sentinel-vision-main" "DeepFake Detection" 3008 "run dev -- --port 3008"
Start-NodeApp "$basePath\Steganography\secret-message-hider-main" "Steganography" 3007 "run dev -- --port 3007"

Write-Host "==================================================" -ForegroundColor Yellow
Write-Host "All ML model startup commands have been triggered." -ForegroundColor Cyan
Write-Host "Please allow a few moments for all services to initialize." -ForegroundColor White
Write-Host ""
Write-Host "Available ML Models (Dashboard Ports):" -ForegroundColor Yellow
Write-Host "• Email Detection: http://localhost:5000" -ForegroundColor White
Write-Host "• File Integrity: http://localhost:5001" -ForegroundColor White
Write-Host "• Dark Web Monitoring: http://localhost:5002" -ForegroundColor White
Write-Host "• File Encryption: http://localhost:3003" -ForegroundColor White
Write-Host "• Fraud Detection: http://localhost:3004" -ForegroundColor White
Write-Host "• Password Generator: http://localhost:3005" -ForegroundColor White
Write-Host "• Password Strength Checker: http://localhost:3006" -ForegroundColor White
Write-Host "• Steganography: http://localhost:3007" -ForegroundColor White
Write-Host "• DeepFake Detection: http://localhost:3008" -ForegroundColor White
Write-Host ""
Write-Host "Done." -ForegroundColor Cyan
