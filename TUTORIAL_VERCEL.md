# 🚀 Tutorial Completo: Desplegar en Vercel (Paso a Paso)

Este tutorial te guiará desde cero hasta tener tu app funcionando en Vercel.

---

## 📋 Índice

1. [Preparar el Código](#1-preparar-el-código)
2. [Crear Repositorio en GitHub](#2-crear-repositorio-en-github)
3. [Subir Código a GitHub](#3-subir-código-a-github)
4. [Crear Cuenta en Vercel](#4-crear-cuenta-en-vercel)
5. [Conectar Vercel con GitHub](#5-conectar-vercel-con-github)
6. [Configurar Variables de Entorno](#6-configurar-variables-de-entorno)
7. [Configurar Base de Datos (PostgreSQL)](#7-configurar-base-de-datos-postgresql)
8. [Desplegar](#8-desplegar)
9. [Actualizar Shopify Partner Dashboard](#9-actualizar-shopify-partner-dashboard)
10. [Probar la App](#10-probar-la-app)

---

## 1. Preparar el Código

### Paso 1.1: Verificar que tienes Git instalado

Abre tu terminal (PowerShell en Windows) y ejecuta:

```powershell
git --version
```

Si te dice un número de versión (ej: `git version 2.40.0`), está instalado.  
Si dice "command not found", instálalo desde [git-scm.com](https://git-scm.com/download/win)

### Paso 1.2: Navegar a tu carpeta del proyecto

```powershell
cd "C:\Users\henry\OneDrive\Documents\shopify apps\first-app\simple-date-picker"
```

### Paso 1.3: Inicializar Git (si no lo has hecho)

```powershell
git init
```

---

## 2. Crear Repositorio en GitHub

### Paso 2.1: Ir a GitHub

1. Abre tu navegador
2. Ve a [github.com](https://github.com)
3. **Inicia sesión** (o crea una cuenta si no tienes)

### Paso 2.2: Crear Nuevo Repositorio

1. Haz clic en el **botón "+"** (arriba a la derecha)
2. Selecciona **"New repository"**

3. **Configuración del repositorio:**
   - **Repository name:** `simple-date-picker` (o el nombre que prefieras)
   - **Description:** "Shopify Delivery Date Picker App"
   - **Visibility:** 
     - ✅ **Private** (recomendado si no quieres que otros vean tu código)
     - O **Public** (si quieres que sea público)
   - **⚠️ IMPORTANTE:** NO marques "Add a README file"
   - NO marques "Add .gitignore"
   - NO marques "Choose a license"

4. Haz clic en **"Create repository"**

### Paso 2.3: Copiar la URL del Repositorio

GitHub te mostrará una página con instrucciones. **Copia la URL** que aparece, algo como:

```
https://github.com/TU_USUARIO/simple-date-picker.git
```

*(Guarda esta URL, la necesitarás en el siguiente paso)*

---

## 3. Subir Código a GitHub

### Paso 3.1: Agregar todos los archivos

En tu terminal (PowerShell), ejecuta:

```powershell
git add .
```

Esto prepara todos los archivos para subirlos.

### Paso 3.2: Hacer el primer commit

```powershell
git commit -m "Initial commit: Delivery Date Picker app"
```

### Paso 3.3: Conectar con GitHub

```powershell
git branch -M main
```

```powershell
git remote add origin https://github.com/TU_USUARIO/simple-date-picker.git
```

**⚠️ IMPORTANTE:** Reemplaza `TU_USUARIO` con tu usuario real de GitHub.

### Paso 3.4: Subir el código

```powershell
git push -u origin main
```

**Te pedirá autenticación:**
- Si es la primera vez, te pedirá usuario y contraseña
- O mejor aún, GitHub te pedirá crear un **Personal Access Token**
  - Ve a [github.com/settings/tokens](https://github.com/settings/tokens)
  - Clic en "Generate new token" > "Generate new token (classic)"
  - Nombre: "Vercel Deployment"
  - Marca "repo" (todos los permisos de repositorio)
  - Genera y **copia el token** (solo se muestra una vez)
  - Úsalo como contraseña cuando Git te la pida

### Paso 3.5: Verificar que se subió

1. Refresca la página de tu repositorio en GitHub
2. Deberías ver todos tus archivos listados

**✅ Si ves tus archivos, ¡perfecto! Siguiente paso.**

---

## 4. Crear Cuenta en Vercel

### Paso 4.1: Ir a Vercel

1. Abre [vercel.com](https://vercel.com)
2. Haz clic en **"Sign Up"**

### Paso 4.2: Iniciar Sesión con GitHub

1. Selecciona **"Continue with GitHub"**
2. Autoriza a Vercel a acceder a tu cuenta de GitHub
3. Completa el proceso de registro

**✅ Ya tienes cuenta en Vercel**

---

## 5. Conectar Vercel con GitHub

### Paso 5.1: Crear Nuevo Proyecto

1. En el dashboard de Vercel, haz clic en **"Add New Project"**
2. O ve directamente a [vercel.com/new](https://vercel.com/new)

### Paso 5.2: Importar Repositorio

1. Verás una lista de tus repositorios de GitHub
2. Busca **"simple-date-picker"**
3. Haz clic en **"Import"** al lado del nombre

### Paso 5.3: Configurar el Proyecto

Vercel detectará automáticamente la configuración, pero verifica:

- **Project Name:** `simple-date-picker` (o déjalo como está)
- **Framework Preset:** Deja en blanco o selecciona "Other"
- **Root Directory:** `./` (raíz)
- **Build Command:** `npm run build` (debería aparecer automáticamente)
- **Output Directory:** `build/client` (debería aparecer automáticamente)
- **Install Command:** `npm install` (debería aparecer automáticamente)

**⚠️ NO hagas clic en "Deploy" todavía.** Primero necesitamos configurar las variables de entorno.

---

## 6. Configurar Variables de Entorno

### Paso 6.1: Ir a Environment Variables

En la misma página de configuración, busca la sección **"Environment Variables"** (abajo)

### Paso 6.2: Agregar Variables

Haz clic en **"Add"** y agrega cada variable una por una:

#### Variable 1: SHOPIFY_API_KEY
- **Key:** `SHOPIFY_API_KEY`
- **Value:** Tu Client ID de Shopify (de `shopify.app.toml` o Partner Dashboard)
- **Environment:** Marca las 3 opciones (Production, Preview, Development)

#### Variable 2: SHOPIFY_API_SECRET
- **Key:** `SHOPIFY_API_SECRET`
- **Value:** Tu Client Secret de Shopify
- **Environment:** Marca las 3 opciones

#### Variable 3: SCOPES
- **Key:** `SCOPES`
- **Value:** `write_products,write_orders`
- **Environment:** Marca las 3 opciones

#### Variable 4: DATABASE_URL (Temporal)
- **Key:** `DATABASE_URL`
- **Value:** `file:./prisma/prod.sqlite` (temporal, lo cambiaremos después)
- **Environment:** Marca las 3 opciones

#### Variable 5: NODE_ENV
- **Key:** `NODE_ENV`
- **Value:** `production`
- **Environment:** Solo marca "Production"

#### Variable 6: SHOPIFY_APP_URL (Temporal)
- **Key:** `SHOPIFY_APP_URL`
- **Value:** `https://simple-date-picker.vercel.app` (URL temporal, Vercel te dará la real después)
- **Environment:** Marca las 3 opciones

**⚠️ NOTA:** Actualizaremos `SHOPIFY_APP_URL` después del primer despliegue con la URL real que te dé Vercel.

---

## 7. Configurar Base de Datos (PostgreSQL)

**⚠️ IMPORTANTE:** SQLite no funciona en Vercel. Necesitas PostgreSQL.

### Paso 7.1: Crear Cuenta en Neon (Gratis)

1. Ve a [neon.tech](https://neon.tech)
2. Haz clic en **"Sign Up"** (puedes usar tu cuenta de GitHub)
3. Crea un nuevo proyecto
4. Nombre del proyecto: `simple-date-picker` (o el que prefieras)

### Paso 7.2: Obtener la Connection String

1. En el dashboard de Neon, busca la sección **"Connection Details"**
2. Verás algo como:
   ```
   postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/dbname?sslmode=require
   ```
3. **Copia esa URL completa** (es tu `DATABASE_URL`)

### Paso 7.3: Actualizar el Schema de Prisma

En tu computadora, edita el archivo `prisma/schema.prisma`:

```bash
# En tu terminal local
nano prisma/schema.prisma
```

O ábrelo con tu editor de código.

Busca la línea que dice:
```prisma
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
```

Cámbiala a:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

Guarda el archivo.

### Paso 7.4: Ejecutar Migraciones en Neon

Antes de subir a GitHub, necesitas crear las tablas en Neon:

1. **Actualiza tu `.env` local temporalmente:**
   - Abre `.env` en tu editor
   - Cambia `DATABASE_URL` a la URL de Neon que copiaste
   - Ejemplo: `DATABASE_URL=postgresql://user:pass@host/dbname?sslmode=require`

2. **Ejecuta las migraciones:**
   ```powershell
   npx prisma migrate deploy
   ```
   
   Esto creará las tablas necesarias en Neon.

3. **Verifica que funcionó:**
   - Ve al dashboard de Neon
   - Deberías ver una tabla llamada "Session"

### Paso 7.5: Subir el Cambio a GitHub

```powershell
git add prisma/schema.prisma
git commit -m "Change database to PostgreSQL for Vercel"
git push
```

### Paso 7.6: Actualizar Variable en Vercel

1. Ve a tu proyecto en Vercel
2. Settings > Environment Variables
3. Edita `DATABASE_URL`
4. Cambia el valor a la URL de Neon que copiaste
5. Guarda

---

## 8. Desplegar

### Paso 8.1: Hacer el Primer Despliegue

1. En la página de configuración de Vercel (donde agregaste las variables)
2. Haz clic en **"Deploy"**
3. Espera 2-3 minutos mientras Vercel:
   - Instala dependencias
   - Construye tu app
   - Despliega

### Paso 8.2: Ver el Progreso

Verás un log en tiempo real del proceso. Si hay errores, aparecerán aquí.

### Paso 8.3: Obtener la URL

Cuando termine, Vercel te dará una URL como:
```
https://simple-date-picker.vercel.app
```

**Copia esta URL.** La necesitarás en el siguiente paso.

---

## 9. Actualizar Shopify Partner Dashboard

### Paso 9.1: Actualizar Variable en Vercel

1. Ve a Settings > Environment Variables en Vercel
2. Edita `SHOPIFY_APP_URL`
3. Cambia el valor a la URL real que te dio Vercel (ej: `https://simple-date-picker.vercel.app`)
4. Guarda

### Paso 9.2: Hacer Redeploy

1. Ve a la pestaña **"Deployments"** en Vercel
2. Haz clic en los **3 puntos** del último despliegue
3. Selecciona **"Redeploy"**
4. Espera a que termine

### Paso 9.3: Configurar en Shopify Partner Dashboard

1. Ve a [partners.shopify.com](https://partners.shopify.com)
2. Selecciona tu app **"simple-date-picker"**
3. Ve a **App setup**

4. **App URL:**
   - Pega la URL de Vercel: `https://simple-date-picker.vercel.app`

5. **Allowed redirection URLs:**
   - Haz clic en **"Add URL"** y agrega estas 3 URLs (una por una):
     ```
     https://simple-date-picker.vercel.app/auth/callback
     https://simple-date-picker.vercel.app/auth/shopify/callback
     https://simple-date-picker.vercel.app/api/auth/callback
     ```
   - *(Reemplaza `simple-date-picker.vercel.app` con tu URL real)*

6. **Guarda los cambios**

---

## 10. Probar la App

### Paso 10.1: Verificar el Dashboard

1. Abre en tu navegador la URL de Vercel:
   ```
   https://simple-date-picker.vercel.app
   ```

2. **Deberías ver:**
   - El Dashboard de SinergIA Digital
   - El banner negro con el logo
   - Las instrucciones de instalación
   - Sin errores en la consola (F12)

### Paso 10.2: Probar la Instalación en una Tienda

1. Ve a [partners.shopify.com](https://partners.shopify.com)
2. Selecciona tu app
3. Haz clic en **"Install on development store"**
4. Selecciona una tienda de desarrollo
5. Debería redirigirte a Vercel para autenticación
6. Autoriza la app
7. Deberías ver el Dashboard funcionando

### Paso 10.3: Verificar el Calendario

1. Ve al Editor de Temas de tu tienda
2. Navega a la página del Carrito
3. Agrega el bloque "Delivery Date Picker"
4. El calendario debería aparecer y funcionar

---

## ✅ ¡Listo!

Tu app está desplegada en Vercel y funcionando. 

### Resumen de lo que tienes:

- ✅ **Dashboard:** Funcionando en Vercel (gratis, siempre online)
- ✅ **Calendario:** Funcionando en el storefront (sin servidor necesario)
- ✅ **Base de Datos:** PostgreSQL en Neon (gratis)
- ✅ **Despliegues Automáticos:** Cada `git push` actualiza la app

### Próximos Pasos:

- Cada vez que hagas cambios, solo haz `git push` y Vercel desplegará automáticamente
- Monitorea los logs en Vercel si hay problemas
- El calendario funciona independientemente del Dashboard

---

## 🐛 Problemas Comunes

### Error: "Build failed"

**Solución:**
- Revisa los logs de build en Vercel
- Verifica que todas las dependencias estén en `package.json`
- Asegúrate de que el Node.js version sea 20.x

### Error: "Database connection failed"

**Solución:**
- Verifica que `DATABASE_URL` en Vercel sea la URL completa de Neon
- Debe empezar con `postgresql://`
- Debe incluir `?sslmode=require` al final

### Error: "Invalid appUrl"

**Solución:**
- Verifica que `SHOPIFY_APP_URL` en Vercel sea exactamente la URL de Vercel
- Debe empezar con `https://`
- Sin barra al final

### El Dashboard no carga

**Solución:**
- Verifica que las variables de entorno estén correctas
- Revisa los logs en Vercel (pestaña "Functions")
- Asegúrate de que la base de datos esté configurada

---

**¿Necesitas ayuda?** Revisa `DOCUMENTATION.md` para más detalles técnicos.

**Última actualización:** Noviembre 2025

