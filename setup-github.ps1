# Script para subir el codigo a GitHub automaticamente
# Ejecuta este script en PowerShell: .\setup-github.ps1

Write-Host "Preparando codigo para GitHub..." -ForegroundColor Green

# Verificar que estamos en la carpeta correcta
if (-not (Test-Path "package.json")) {
    Write-Host "Error: No estas en la carpeta del proyecto" -ForegroundColor Red
    Write-Host "   Ve a: cd 'C:\Users\henry\OneDrive\Documents\shopify apps\first-app\simple-date-picker'" -ForegroundColor Yellow
    exit 1
}

# Verificar que Git esta instalado
try {
    $gitVersion = git --version
    Write-Host "Git encontrado: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "Git no esta instalado. Instalalo desde: https://git-scm.com/download/win" -ForegroundColor Red
    exit 1
}

# Inicializar Git si no esta inicializado
if (-not (Test-Path ".git")) {
    Write-Host "Inicializando Git..." -ForegroundColor Yellow
    git init
    Write-Host "Git inicializado" -ForegroundColor Green
} else {
    Write-Host "Git ya esta inicializado" -ForegroundColor Green
}

# Agregar todos los archivos
Write-Host "Agregando archivos..." -ForegroundColor Yellow
git add .

# Hacer commit
Write-Host "Haciendo commit..." -ForegroundColor Yellow
git commit -m "Initial commit: Delivery Date Picker app with Vercel config"

# Configurar rama main
Write-Host "Configurando rama main..." -ForegroundColor Yellow
git branch -M main

Write-Host ""
Write-Host "Codigo preparado localmente!" -ForegroundColor Green
Write-Host ""
Write-Host "SIGUIENTE PASO:" -ForegroundColor Cyan
Write-Host "   1. Crea un repositorio en GitHub (github.com/new)" -ForegroundColor White
Write-Host "   2. NO marques 'Add README' ni otras opciones" -ForegroundColor White
Write-Host "   3. Copia la URL del repositorio" -ForegroundColor White
Write-Host "   4. Ejecuta estos comandos reemplazando TU_USUARIO:" -ForegroundColor White
Write-Host ""
Write-Host "   git remote add origin https://github.com/TU_USUARIO/simple-date-picker.git" -ForegroundColor Yellow
Write-Host "   git push -u origin main" -ForegroundColor Yellow
Write-Host ""
