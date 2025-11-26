# Variables de Entorno para Railway

## Variables Requeridas

Configura estas variables en el Dashboard de Railway:

### 1. Base de Datos
| Variable | Valor |
|----------|-------|
| `DATABASE_URL` | Railway la provee automáticamente si agregas un servicio PostgreSQL. Formato: `postgresql://user:password@host:port/database` |

### 2. Shopify API
| Variable | Valor |
|----------|-------|
| `SHOPIFY_API_KEY` | `82e6be274dc432d17f3989fc7dc49637` |
| `SHOPIFY_API_SECRET` | Tu API Secret (obtener de partners.shopify.com) |

### 3. URLs de la Aplicación
| Variable | Valor |
|----------|-------|
| `SHOPIFY_APP_URL` | URL de tu app en Railway (ej: `https://simple-date-picker-production.up.railway.app`) |

### 4. Configuración General
| Variable | Valor |
|----------|-------|
| `SCOPES` | `write_products` |
| `NODE_ENV` | `production` |

---

## Pasos para Configurar en Railway

1. **Crear servicio PostgreSQL:**
   - En tu proyecto de Railway, click en "New" > "Database" > "PostgreSQL"
   - Railway creará automáticamente la variable `DATABASE_URL`

2. **Agregar variables de entorno:**
   - Ve a tu servicio de la app > "Variables"
   - Agrega cada variable de la tabla de arriba

3. **Actualizar URLs en Shopify Partners:**
   - Después del primer deploy, copia la URL de Railway
   - Ve a partners.shopify.com > Tu App > "App Setup"
   - Actualiza "App URL" con tu URL de Railway
   - Actualiza "Allowed redirection URL(s)" con:
     - `https://tu-app.up.railway.app/auth/callback`
     - `https://tu-app.up.railway.app/api/auth`

4. **Actualizar shopify.app.toml:**
   - Cambia `application_url` por tu URL de Railway
   - Actualiza los `redirect_urls`

