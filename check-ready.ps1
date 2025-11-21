# Script para verificar que todo está listo para Vercel
# Ejecuta: .\check-ready.ps1

Write-Host "🔍 Verificando que todo está listo para Vercel..." -ForegroundColor Cyan
Write-Host ""

$errors = @()
$warnings = @()

# Verificar archivos importantes
$requiredFiles = @(
    "package.json",
    "vercel.json",
    "prisma/schema.prisma",
    "app/shopify.server.ts",
    "extensions/delivery-date-picker/blocks/delivery_date.liquid"
)

Write-Host "📁 Verificando archivos..." -ForegroundColor Yellow
foreach ($file in $requiredFiles) {
    if (Test-Path $file) {
        Write-Host "   ✅ $file" -ForegroundColor Green
    } else {
        Write-Host "   ❌ $file - FALTANTE" -ForegroundColor Red
        $errors += $file
    }
}

# Verificar que schema.prisma usa PostgreSQL
Write-Host ""
Write-Host "🗄️ Verificando configuración de base de datos..." -ForegroundColor Yellow
$schemaContent = Get-Content "prisma/schema.prisma" -Raw
if ($schemaContent -match 'provider = "postgresql"') {
    Write-Host "   ✅ Schema configurado para PostgreSQL" -ForegroundColor Green
} else {
    Write-Host "   ⚠️ Schema aún usa SQLite - Necesitas cambiarlo a PostgreSQL" -ForegroundColor Yellow
    $warnings += "Schema debe usar PostgreSQL para Vercel"
}

# Verificar que vercel.json existe y está bien formado
Write-Host ""
Write-Host "⚙️ Verificando configuración de Vercel..." -ForegroundColor Yellow
if (Test-Path "vercel.json") {
    try {
        $vercelConfig = Get-Content "vercel.json" | ConvertFrom-Json
        Write-Host "   ✅ vercel.json válido" -ForegroundColor Green
    } catch {
        Write-Host "   ❌ vercel.json tiene errores de formato" -ForegroundColor Red
        $errors += "vercel.json inválido"
    }
} else {
    Write-Host "   ❌ vercel.json no existe" -ForegroundColor Red
    $errors += "vercel.json faltante"
}

# Verificar .gitignore
Write-Host ""
Write-Host "🚫 Verificando .gitignore..." -ForegroundColor Yellow
if (Test-Path ".gitignore") {
    $gitignore = Get-Content ".gitignore" -Raw
    if ($gitignore -match "node_modules" -and $gitignore -match "\.env") {
        Write-Host "   ✅ .gitignore configurado correctamente" -ForegroundColor Green
    } else {
        Write-Host "   ⚠️ .gitignore podría necesitar más entradas" -ForegroundColor Yellow
    }
} else {
    Write-Host "   ⚠️ .gitignore no existe (recomendado crearlo)" -ForegroundColor Yellow
    $warnings += ".gitignore faltante"
}

# Resumen
Write-Host ""
Write-Host "═══════════════════════════════════════" -ForegroundColor Cyan
if ($errors.Count -eq 0 -and $warnings.Count -eq 0) {
    Write-Host "✅ ¡Todo está listo para desplegar en Vercel!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📋 Próximos pasos:" -ForegroundColor Cyan
    Write-Host "   1. Sube el código a GitHub (usa setup-github.ps1)" -ForegroundColor White
    Write-Host "   2. Crea cuenta en Vercel (vercel.com)" -ForegroundColor White
    Write-Host "   3. Conecta Vercel con tu repositorio de GitHub" -ForegroundColor White
    Write-Host "   4. Configura las variables de entorno en Vercel" -ForegroundColor White
} elseif ($errors.Count -eq 0) {
    Write-Host "⚠️ Listo con advertencias:" -ForegroundColor Yellow
    foreach ($warning in $warnings) {
        Write-Host "   - $warning" -ForegroundColor Yellow
    }
} else {
    Write-Host "❌ Hay errores que corregir:" -ForegroundColor Red
    foreach ($error in $errors) {
        Write-Host "   - $error" -ForegroundColor Red
    }
    Write-Host ""
    Write-Host "Corrige estos errores antes de desplegar." -ForegroundColor Yellow
}
Write-Host "═══════════════════════════════════════" -ForegroundColor Cyan


