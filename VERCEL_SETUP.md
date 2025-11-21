# Guía de Despliegue en Vercel

Esta guía te ayudará a desplegar el Dashboard de la app en Vercel de forma gratuita y sin necesidad de mantener un servidor.

---

## 📋 Prerrequisitos

1. ✅ Cuenta en [Vercel](https://vercel.com) (gratis)
2. ✅ Cuenta en [GitHub](https://github.com) (gratis)
3. ✅ Código de la app subido a un repositorio de GitHub

---

## 🚀 Paso 1: Subir el Código a GitHub

### Si aún no tienes el código en GitHub:

1. **Crea un repositorio nuevo en GitHub:**
   - Ve a [github.com/new](https://github.com/new)
   - Nombre: `simple-date-picker` (o el que prefieras)
   - Público o Privado (tu elección)
   - **NO** inicialices con README (ya tienes código)

2. **Sube tu código:**
   ```bash
   cd simple-date-picker
   git init
   git add .
   git commit -m "Initial commit: Delivery Date Picker app"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/simple-date-picker.git
   git push -u origin main
   ```

   *(Reemplaza `TU_USUARIO` con tu usuario de GitHub)*

---

## 🚀 Paso 2: Conectar con Vercel

1. **Ve a [vercel.com](https://vercel.com) y haz login** (puedes usar tu cuenta de GitHub)

2. **Clic en "Add New Project"**

3. **Importa tu repositorio:**
   - Busca `simple-date-picker` en la lista
   - Haz clic en "Import"

4. **Configuración del Proyecto:**
   - **Framework Preset:** Deja en blanco o selecciona "Other"
   - **Root Directory:** `./` (raíz)
   - **Build Command:** `npm run build && npm run setup`
   - **Output Directory:** `build/client`
   - **Install Command:** `npm install`

5. **Variables de Entorno:**
   Haz clic en "Environment Variables" y agrega:

   ```
   SHOPIFY_API_KEY = tu_client_id_aqui
   SHOPIFY_API_SECRET = tu_client_secret_aqui
   SHOPIFY_APP_URL = https://tu-proyecto.vercel.app
   SCOPES = write_products,write_orders
   DATABASE_URL = file:./prisma/prod.sqlite
   NODE_ENV = production
   ```

   **⚠️ IMPORTANTE:** 
   - Primero despliega sin `SHOPIFY_APP_URL` o con una URL temporal
   - Después de que Vercel te dé la URL (ej: `simple-date-picker.vercel.app`), actualiza `SHOPIFY_APP_URL` con esa URL
   - Luego actualiza también en el Partner Dashboard de Shopify

6. **Clic en "Deploy"**

---

## 🚀 Paso 3: Configurar Shopify Partner Dashboard

Una vez que Vercel te dé la URL de tu app (ej: `https://simple-date-picker.vercel.app`):

1. **Ve a [partners.shopify.com](https://partners.shopify.com)**
2. **Selecciona tu app "simple-date-picker"**
3. **Ve a App setup:**
   - **App URL:** `https://simple-date-picker.vercel.app`
   - **Allowed redirection URLs:** Agrega:
     - `https://simple-date-picker.vercel.app/auth/callback`
     - `https://simple-date-picker.vercel.app/auth/shopify/callback`
     - `https://simple-date-picker.vercel.app/api/auth/callback`

4. **Guarda los cambios**

5. **Actualiza las variables de entorno en Vercel:**
   - Ve a tu proyecto en Vercel
   - Settings > Environment Variables
   - Edita `SHOPIFY_APP_URL` y pon la URL real de Vercel
   - Guarda y haz "Redeploy"

---

## 🔄 Paso 4: Despliegues Automáticos

Vercel está configurado para desplegar automáticamente cada vez que hagas `git push` a la rama `main`.

**Flujo de trabajo:**
1. Haces cambios en tu código local
2. `git add .`
3. `git commit -m "Descripción"`
4. `git push`
5. Vercel detecta el cambio y despliega automáticamente
6. En 1-2 minutos, tu app está actualizada

---

## 📝 Notas Importantes

### Base de Datos en Vercel

**⚠️ PROBLEMA IMPORTANTE:** Vercel usa un sistema de archivos **read-only** en producción, por lo que SQLite (archivo local) **NO funcionará** en Vercel.

**SOLUCIÓN RECOMENDADA: Usar PostgreSQL Gratuito**

1. **Crea una cuenta en [Neon](https://neon.tech) (gratis):**
   - Ve a [neon.tech](https://neon.tech)
   - Crea una cuenta (gratis)
   - Crea un nuevo proyecto
   - Copia la **Connection String** (URL de conexión)

2. **Actualiza el schema de Prisma:**
   ```bash
   nano prisma/schema.prisma
   ```
   
   Cambia la línea `datasource db`:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```

3. **Actualiza la variable en Vercel:**
   - Ve a Settings > Environment Variables
   - Cambia `DATABASE_URL` a la URL de Neon (formato: `postgresql://user:pass@host/dbname?sslmode=require`)

4. **Ejecuta las migraciones:**
   ```bash
   # Localmente, para crear las tablas en Neon
   npx prisma migrate deploy
   ```

**Alternativa Rápida (Solo para Testing):**
Si solo quieres probar el Dashboard sin base de datos real, puedes usar un mock temporal, pero **NO funcionará la autenticación real de Shopify**.

### Para Desarrollo Rápido (Sin Base de Datos)

Si solo quieres que el Dashboard funcione para mostrar instrucciones (sin autenticación real), puedes:

1. Comentar temporalmente las partes de autenticación
2. O usar un mock de sesión

---

## 🧪 Probar el Despliegue

1. **Espera a que termine el build en Vercel** (verás un log en tiempo real)

2. **Visita la URL que te dio Vercel:**
   ```
   https://simple-date-picker.vercel.app
   ```

3. **Deberías ver:**
   - El Dashboard de SinergIA Digital
   - Sin errores en la consola

4. **Prueba instalar la app en una tienda de desarrollo:**
   - Ve al Partner Dashboard
   - Clic en "Install on development store"
   - Debería redirigirte a Vercel para autenticación

---

## 🐛 Troubleshooting

### Error: "Cannot find module"

**Solución:** Asegúrate de que `package.json` tenga todas las dependencias listadas.

### Error: "Database connection failed"

**Solución:** 
- Si usas SQLite, cambia a PostgreSQL (Vercel no soporta archivos locales)
- O usa una solución serverless como Upstash

### Error: "Invalid appUrl"

**Solución:** 
- Verifica que `SHOPIFY_APP_URL` en Vercel sea exactamente la URL que te dio Vercel
- Debe empezar con `https://`
- Sin barra al final

### El build falla

**Solución:**
- Revisa los logs de build en Vercel
- Verifica que todas las dependencias estén en `package.json`
- Asegúrate de que el Node.js version sea compatible (20.x)

---

## 📊 Monitoreo

Vercel te da:
- ✅ Logs en tiempo real
- ✅ Analytics de tráfico (en plan Pro)
- ✅ Alertas de errores
- ✅ Historial de despliegues

---

## 💰 Costos

**Plan Gratis de Vercel incluye:**
- 100 GB de bandwidth/mes
- Despliegues ilimitados
- HTTPS automático
- Dominios personalizados (1 gratis)

**Para esta app:** El plan gratis es más que suficiente.

---

## 🎯 Siguiente Paso

Una vez desplegado en Vercel:

1. ✅ Actualiza las URLs en Shopify Partner Dashboard
2. ✅ Prueba instalar la app en una tienda de desarrollo
3. ✅ Verifica que el Dashboard cargue correctamente
4. ✅ El calendario (Theme Extension) ya funciona sin servidor

**¡Tu app está lista para producción!** 🚀

---

**Última actualización:** Noviembre 2025

