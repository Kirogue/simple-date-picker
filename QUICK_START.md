# ⚡ Inicio Rápido - Despliegue en Vercel

Guía ultra-rápida para tener tu app funcionando en 15 minutos.

---

## ✅ Checklist Pre-Despliegue

Ejecuta este comando para verificar que todo está listo:

```powershell
.\check-ready.ps1
```

Si todo está ✅, continúa. Si hay ❌, corrígelos primero.

---

## 🚀 Pasos Rápidos

### 1️⃣ Subir a GitHub (2 minutos)

**Si ya tienes el repositorio creado en GitHub:**

```powershell
.\setup-github.ps1
```

Luego ejecuta (reemplaza TU_USUARIO):
```powershell
git remote add origin https://github.com/TU_USUARIO/simple-date-picker.git
git push -u origin main
```

**Si NO has creado el repositorio:**
1. Ve a [github.com/new](https://github.com/new)
2. Nombre: `simple-date-picker`
3. **NO marques** "Add README"
4. Crea el repositorio
5. Ejecuta los comandos de arriba

---

### 2️⃣ Crear Cuenta en Vercel (1 minuto)

1. Ve a [vercel.com](https://vercel.com)
2. Clic en **"Sign Up"**
3. Selecciona **"Continue with GitHub"**
4. Autoriza a Vercel

**✅ Listo**

---

### 3️⃣ Conectar Vercel con GitHub (2 minutos)

1. En Vercel, clic en **"Add New Project"**
2. Busca **"simple-date-picker"** en la lista
3. Clic en **"Import"**
4. **NO hagas clic en Deploy todavía**

---

### 4️⃣ Configurar Variables de Entorno (3 minutos)

En la página de configuración de Vercel, busca **"Environment Variables"** y agrega:

| Key | Value | Dónde conseguirlo |
|-----|-------|-------------------|
| `SHOPIFY_API_KEY` | `82e6be274dc432d17f3989fc7dc49637` | De `shopify.app.toml` o Partner Dashboard |
| `SHOPIFY_API_SECRET` | Tu Client Secret | Partner Dashboard > App setup > Client credentials |
| `SCOPES` | `write_products,write_orders` | Fijo |
| `DATABASE_URL` | (Temporal) `file:./prisma/prod.sqlite` | Lo cambiaremos después |
| `NODE_ENV` | `production` | Fijo |
| `SHOPIFY_APP_URL` | `https://simple-date-picker.vercel.app` | Temporal, lo actualizaremos |

**Marca las 3 opciones** (Production, Preview, Development) para cada variable.

---

### 5️⃣ Crear Base de Datos en Neon (3 minutos)

1. Ve a [neon.tech](https://neon.tech)
2. **Sign Up** con GitHub
3. Clic en **"Create Project"**
4. Nombre: `simple-date-picker`
5. **Copia la Connection String** (URL que empieza con `postgresql://`)

**Guarda esa URL, la necesitarás.**

---

### 6️⃣ Configurar Base de Datos Localmente (2 minutos)

1. Abre `.env` en tu editor
2. Cambia `DATABASE_URL` a la URL de Neon que copiaste
3. Ejecuta:
   ```powershell
   npx prisma migrate deploy
   ```
4. Verifica en Neon que se creó la tabla "Session"

---

### 7️⃣ Actualizar Variable en Vercel (1 minuto)

1. En Vercel, ve a **Settings > Environment Variables**
2. Edita `DATABASE_URL`
3. Pega la URL de Neon
4. Guarda

---

### 8️⃣ Desplegar (2 minutos)

1. En la página de configuración de Vercel
2. Clic en **"Deploy"**
3. Espera 2-3 minutos
4. **Copia la URL** que te da (ej: `https://simple-date-picker-abc123.vercel.app`)

---

### 9️⃣ Actualizar URLs (2 minutos)

**En Vercel:**
1. Settings > Environment Variables
2. Edita `SHOPIFY_APP_URL`
3. Pega la URL real de Vercel
4. Guarda y haz **Redeploy**

**En Shopify Partner Dashboard:**
1. Ve a [partners.shopify.com](https://partners.shopify.com)
2. Tu app > App setup
3. **App URL:** Pega la URL de Vercel
4. **Allowed redirection URLs:** Agrega:
   - `https://TU-URL.vercel.app/auth/callback`
   - `https://TU-URL.vercel.app/auth/shopify/callback`
   - `https://TU-URL.vercel.app/api/auth/callback`
5. Guarda

---

## ✅ ¡Listo!

Abre `https://TU-URL.vercel.app` y deberías ver tu Dashboard funcionando.

---

## 🆘 Si algo falla

1. Revisa los logs en Vercel (pestaña "Deployments" > último deployment > "View Function Logs")
2. Verifica que todas las variables de entorno estén correctas
3. Asegúrate de que la base de datos en Neon tenga la tabla "Session"

---

**Tiempo total estimado: 15-20 minutos**


