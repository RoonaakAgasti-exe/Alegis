# Alegis - Comprehensive Startup Script
# This script starts all components: Homepage, Dashboard, and ML Models

Write-Host "🚀 Starting Alegis Ecosystem..." -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Yellow

$RootPath = "D:\Codes\Alegis"

# 1. Start ML Models
Write-Host "Step 1: Launching ML Models..." -ForegroundColor Green
& "$RootPath\start_ml_models.ps1"

# 2. Start Dashboard Backend
Write-Host "`nStep 2: Launching Dashboard Backend..." -ForegroundColor Green
$cmd2 = "cd '$RootPath\Dashboard\backend'; npm run dev"
Start-Process powershell -ArgumentList "-NoProfile", "-Command", "$cmd2" -NoNewWindow
Start-Sleep -Seconds 2

# 3. Start Dashboard Frontend
Write-Host "`nStep 3: Launching Dashboard Frontend..." -ForegroundColor Green
$cmd3 = "cd '$RootPath\Dashboard\frontend'; npm run dev"
Start-Process powershell -ArgumentList "-NoProfile", "-Command", "$cmd3" -NoNewWindow
Start-Sleep -Seconds 2

# 4. Start Homepage
Write-Host "`nStep 4: Launching Homepage..." -ForegroundColor Green
$cmd4 = "cd '$RootPath\Homepage\frontend'; npm run dev"
Start-Process powershell -ArgumentList "-NoProfile", "-Command", "$cmd4" -NoNewWindow
Start-Sleep -Seconds 2

Write-Host "`n==================================================" -ForegroundColor Yellow
Write-Host "✅ All systems are starting up!" -ForegroundColor Cyan
Write-Host "Main Website: http://localhost:3000" -ForegroundColor White
Write-Host "Dashboard: http://localhost:5173" -ForegroundColor White
Write-Host "API Server: http://localhost:5007" -ForegroundColor White
Write-Host "`nPlease wait a few seconds for all services to initialize." -ForegroundColor Gray
