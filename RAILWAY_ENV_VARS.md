# Variables de Entorno para Railway

## Variables Requeridas

Configura estas variables en el Dashboard de Railway:

### 1. Base de Datos
| Variable | Valor |
|----------|-------|
| `DATABASE_URL` | **IMPORTANTE**: Usa la variable `DATABASE_PRIVATE_URL` de Railway (sin SSL externo) o configura correctamente. Railway la provee automáticamente si agregas un servicio PostgreSQL. |

> ⚠️ **Nota sobre conexión**: Si usas el proxy interno de Railway (`proxy.rlwy.net`), la conexión SSL es manejada automáticamente.

### 2. Shopify API
| Variable | Valor |
|----------|-------|
| `SHOPIFY_API_KEY` | `82e6be274dc432d17f3989fc7dc49637` |
| `SHOPIFY_API_SECRET` | Tu API Secret (obtener de partners.shopify.com) |

### 3. URLs de la Aplicación
| Variable | Valor |
|----------|-------|
| `SHOPIFY_APP_URL` | `https://simple-date-picker-production.up.railway.app` |

### 4. Configuración General
| Variable | Valor |
|----------|-------|
| `SCOPES` | `write_products` |
| `NODE_ENV` | `production` |

---

## Pasos para Configurar en Railway

1. **Crear servicio PostgreSQL:**
   - En tu proyecto de Railway, click en "New" > "Database" > "PostgreSQL"
   - Railway creará automáticamente las variables:
     - `DATABASE_URL` (conexión pública)
     - `DATABASE_PRIVATE_URL` (conexión interna - **RECOMENDADA**)

2. **Configurar referencia de variable:**
   - En tu servicio de la app > "Variables"
   - Crea `DATABASE_URL` y usa referencia: `${{Postgres.DATABASE_PRIVATE_URL}}`
   - Esto usa la conexión interna de Railway (más rápida y estable)

3. **Agregar variables de entorno:**
   - Agrega cada variable de la tabla de arriba
   - Asegúrate de que `SHOPIFY_API_SECRET` esté configurado

4. **Actualizar URLs en Shopify Partners:**
   - Ve a partners.shopify.com > Tu App > "App Setup"
   - Actualiza "App URL": `https://simple-date-picker-production.up.railway.app`
   - Actualiza "Allowed redirection URL(s)" con:
     - `https://simple-date-picker-production.up.railway.app/auth/callback`
     - `https://simple-date-picker-production.up.railway.app/auth/login`

5. **Verificar healthcheck:**
   - Railway verificará `/healthcheck` para confirmar que la app está corriendo
   - Puedes probar manualmente: `https://simple-date-picker-production.up.railway.app/healthcheck`

---

## Troubleshooting

### Error: "could not accept SSL connection"
- Usa `DATABASE_PRIVATE_URL` en vez de `DATABASE_URL` pública
- La conexión interna de Railway no requiere SSL

### Error: "relation already exists"
- Esto es normal si la migración ya se ejecutó antes
- El nuevo script usa `prisma migrate deploy` que maneja esto correctamente

### Healthcheck falla
- Verifica que la variable `DATABASE_URL` esté configurada correctamente
- Revisa los logs de deploy en Railway para ver errores específicos

