# Delivery Date Picker - Documentación Completa

**Versión:** 1.0.0  
**Desarrollado por:** SinergIA Digital  
**Fecha:** Noviembre 2025

---

## 📋 Tabla de Contenidos

1. [Descripción General](#descripción-general)
2. [Arquitectura de la App](#arquitectura-de-la-app)
3. [Componentes Principales](#componentes-principales)
4. [Configuración](#configuración)
5. [Despliegue](#despliegue)
6. [Funcionalidades](#funcionalidades)
7. [Troubleshooting](#troubleshooting)

---

## 🎯 Descripción General

**Delivery Date Picker** es una aplicación Shopify que permite a los clientes seleccionar una fecha de entrega directamente en la página del carrito. La fecha seleccionada se guarda como atributo del carrito y aparece en el panel de pedidos del comerciante.

### Características Principales

- ✅ Selector de fecha nativo e intuitivo
- ✅ Validación de fechas (bloqueo de pasados, días de preparación)
- ✅ Bloqueo de días específicos (fines de semana, festivos)
- ✅ Selector de intervalos de tiempo (Time Slots)
- ✅ Personalización completa de estilos
- ✅ Traducción de mensajes de error
- ✅ Dashboard profesional de administración

---

## 🏗️ Arquitectura de la App

### Estructura del Proyecto

```
simple-date-picker/
├── app/                          # Backend (Remix/React Router)
│   ├── routes/
│   │   └── app._index.tsx        # Dashboard principal
│   └── shopify.server.ts        # Configuración de Shopify
├── extensions/
│   └── delivery-date-picker/     # Theme App Extension
│       ├── blocks/
│       │   └── delivery_date.liquid  # Bloque del calendario
│       └── shopify.extension.toml
├── prisma/                       # Base de datos (SQLite)
├── public/                       # Assets estáticos
└── package.json
```

### Componentes Técnicos

1. **Theme App Extension** (`extensions/delivery-date-picker/`)
   - Bloque Liquid que se agrega al tema
   - JavaScript para validación y AJAX
   - CSS personalizable
   - **NO requiere servidor** - Funciona 100% en el storefront

2. **App Backend** (`app/`)
   - Dashboard de administración (Remix)
   - Autenticación OAuth con Shopify
   - Manejo de webhooks
   - **SÍ requiere servidor** (Vercel, VPS, etc.)

3. **Base de Datos** (Prisma + SQLite)
   - Almacena sesiones de autenticación
   - No almacena datos de clientes (solo sesiones de admin)

---

## 📦 Componentes Principales

### 1. Bloque Liquid (`delivery_date.liquid`)

**Ubicación:** `extensions/delivery-date-picker/blocks/delivery_date.liquid`

**Funcionalidad:**
- Renderiza el input de fecha HTML5
- Valida fechas según reglas configuradas
- Guarda la fecha en atributos del carrito via AJAX
- Soporta selector de intervalos de tiempo opcional

**Configuración Disponible:**
- Título del campo
- Mensaje de ayuda
- Días de preparación (Lead Time)
- Hora de corte diaria (Cut-off Time)
- Días máximos futuros
- Bloqueo de días de la semana (Lunes-Domingo)
- Fechas específicas bloqueadas
- Intervalos de tiempo
- Mensajes de error personalizables
- Estilos (colores, bordes, padding, etc.)

### 2. Dashboard (`app._index.tsx`)

**Ubicación:** `app/routes/app._index.tsx`

**Funcionalidad:**
- Interfaz de administración profesional
- Instrucciones de instalación
- Estado de la app
- Enlaces de soporte

**Diseño:**
- Paleta de colores: Negro (#1a1a1a) y Verde Aguamarina (#008080)
- Logo de SinergIA Digital integrado
- Responsive y moderno

### 3. Configuración de Shopify (`shopify.server.ts`)

**Ubicación:** `app/shopify.server.ts`

**Variables de Entorno Requeridas:**
- `SHOPIFY_API_KEY`: Client ID de la app
- `SHOPIFY_API_SECRET`: Client Secret de la app
- `SHOPIFY_APP_URL`: URL pública de la app (ej: https://datepicker.sinergiadigital.net)
- `SCOPES`: Permisos de la API (write_products, write_orders)

---

## ⚙️ Configuración

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```bash
SHOPIFY_API_KEY=tu_client_id
SHOPIFY_API_SECRET=tu_client_secret
SHOPIFY_APP_URL=https://tu-dominio.com
SCOPES=write_products,write_orders
DATABASE_URL=file:./prisma/dev.sqlite
```

### Obtener Credenciales de Shopify

1. Ve a [Shopify Partner Dashboard](https://partners.shopify.com)
2. Selecciona tu app "simple-date-picker"
3. Ve a **App setup** > **Client credentials**
4. Copia **Client ID** y **Client secret**

### Configurar URLs en Partner Dashboard

1. En **App setup** > **App URL**, pon: `https://tu-dominio.com`
2. En **Allowed redirection URLs**, agrega:
   - `https://tu-dominio.com/auth/callback`
   - `https://tu-dominio.com/auth/shopify/callback`
   - `https://tu-dominio.com/api/auth/callback`

---

## 🚀 Despliegue

### Opción 1: Vercel (Recomendado - Gratis)

**Ventajas:**
- ✅ Gratis para empezar
- ✅ HTTPS automático
- ✅ Despliegue automático desde GitHub
- ✅ Sin mantenimiento de servidor

**Pasos:**
1. Sube el código a GitHub
2. Conecta el repositorio a Vercel
3. Configura las variables de entorno en Vercel
4. Despliega

### Opción 2: VPS (Hostinger)

**Ventajas:**
- ✅ Control total
- ✅ Puedes alojar múltiples apps
- ✅ Más económico a largo plazo

**Requisitos:**
- Docker y Docker Compose instalados
- Dominio configurado con DNS
- Certificado SSL (Traefik lo maneja automáticamente)

### Opción 3: Desarrollo Local

Para desarrollo y pruebas:

```bash
npm run dev
```

Esto inicia el servidor local y permite probar la app en una tienda de desarrollo.

---

## 🎨 Funcionalidades Detalladas

### 1. Selector de Fecha

- Input HTML5 nativo (`<input type="date">`)
- Persistencia: La fecha se mantiene al recargar la página
- Guardado automático via AJAX a `/cart/update.js`

### 2. Validación de Fechas

**Bloqueo de Pasado:**
- No se pueden seleccionar fechas anteriores a hoy

**Días de Preparación (Lead Time):**
- Configurable: Bloquea los próximos X días
- Ejemplo: Si hoy es Lunes y Lead Time = 2, el calendario empieza en Miércoles

**Hora de Corte (Cut-off Time):**
- Si el pedido se hace después de la hora configurada, se suma +1 día al Lead Time
- Ejemplo: Cut-off = 14:00, si ordenan a las 14:05, Lead Time +1

**Días Máximos Futuros:**
- Límite de cuántos días en el futuro se puede reservar (default: 90 días)

### 3. Bloqueo de Días

**Días de la Semana:**
- Checkboxes individuales para cada día (Lunes-Domingo)
- Permite escenarios como "Cerrado los Martes" o "Solo fines de semana"

**Fechas Específicas:**
- Lista de fechas bloqueadas (formato: YYYY-MM-DD, separadas por comas)
- Ejemplo: `2025-12-25, 2026-01-01`

### 4. Intervalos de Tiempo (Time Slots)

- Opcional: Se puede habilitar/deshabilitar
- Campo de texto para definir los slots (separados por comas)
- Ejemplo: `09:00 - 12:00, 14:00 - 18:00`
- Se guarda como atributo separado: `Delivery Time`

### 5. Personalización Visual

**Colores:**
- Fondo del input
- Color del texto
- Color del borde
- Color del anillo de enfoque (focus)
- Color de la etiqueta
- Color del texto de ayuda
- Color de los mensajes de error

**Dimensiones:**
- Ancho del contenedor (20% - 100%)
- Padding interno (5px - 20px)
- Radio de borde (0px - 20px)
- Tamaño de fuente de la etiqueta (12px - 24px)

### 6. Traducción

Todos los mensajes de error son configurables:
- Error de fin de semana/día deshabilitado
- Error de fecha bloqueada
- Error de fecha no disponible

---

## 🔧 Troubleshooting

### Error: "getaddrinfo ENOTFOUND"

**Causa:** El contenedor no puede resolver el DNS o Shopify está parseando mal la URL.

**Solución:**
1. Verifica que el DNS esté configurado: `nslookup tu-dominio.com`
2. Agrega DNS explícitos en `docker-compose.yml`:
   ```yaml
   dns:
     - 8.8.8.8
     - 8.8.4.4
   ```

### Error: "Invalid appUrl configuration"

**Causa:** La variable `SHOPIFY_APP_URL` no tiene el formato correcto.

**Solución:**
- Debe ser una URL completa: `https://tu-dominio.com` (no solo el dominio)

### El calendario no aparece en el carrito

**Causa:** El bloque no está agregado al tema.

**Solución:**
1. Ve al Editor de Temas
2. Navega a la página del Carrito
3. Haz clic en "Add Block"
4. Selecciona "Delivery Date Picker"

### La fecha no se guarda

**Causa:** Error en la petición AJAX o conflicto de JavaScript.

**Solución:**
1. Abre la consola del navegador (F12)
2. Busca errores en la pestaña "Console"
3. Verifica que `/cart/update.js` esté accesible

---

## 📊 Flujo de Datos

### Cuando un Cliente Selecciona una Fecha:

1. **Frontend (Liquid/JS):**
   - Usuario selecciona fecha en el input
   - JavaScript valida la fecha según reglas
   - Si es válida, envía POST a `/cart/update.js`

2. **Shopify Cart API:**
   - Recibe: `{ attributes: { "Delivery Date": "2025-12-25" } }`
   - Guarda el atributo en el carrito
   - Responde con el carrito actualizado

3. **Checkout:**
   - Cuando el cliente va a pagar, el atributo "viaja" con el pedido
   - Aparece en el Admin de Shopify en la sección de atributos del pedido

### Cuando un Comerciante Configura la App:

1. **Dashboard (Backend):**
   - Comerciante entra a la app desde el Admin de Shopify
   - Ve el Dashboard con instrucciones
   - Puede abrir el Editor de Temas directamente

2. **Editor de Temas:**
   - Agrega el bloque "Delivery Date Picker"
   - Configura todas las opciones (colores, reglas, etc.)
   - Guarda el tema

---

## 🔐 Seguridad

- ✅ Las fechas se validan en el frontend (UX) y se pueden validar en el backend (seguridad adicional)
- ✅ No se almacenan datos sensibles de clientes
- ✅ Solo se guardan atributos del carrito (públicos)
- ✅ Autenticación OAuth para el Dashboard (solo comerciantes autorizados)

---

## 📝 Notas Técnicas

### Tecnologías Utilizadas

- **Frontend (Theme Extension):** Liquid, JavaScript (Vanilla), CSS
- **Backend (Dashboard):** Remix/React Router, TypeScript
- **Base de Datos:** Prisma ORM + SQLite
- **Hosting:** Vercel (recomendado) o VPS con Docker

### Versiones

- Node.js: >=20.19 <22 || >=22.12
- Shopify API: 2024-10
- React Router: 7.9.3
- Prisma: 6.16.3

### Archivos Importantes

- `extensions/delivery-date-picker/blocks/delivery_date.liquid` - Bloque principal
- `app/routes/app._index.tsx` - Dashboard
- `app/shopify.server.ts` - Configuración de Shopify
- `shopify.app.toml` - Configuración de la app
- `docker-compose.yml` - Configuración de Docker (si usas VPS)

---

## 📞 Soporte

**Desarrollado por:** SinergIA Digital  
**Contacto:** support@sinergiadigital.net  
**Documentación:** Este archivo

---

## 🗺️ Roadmap Futuro (V2 Pro)

Funcionalidades planificadas para versión premium:

- [ ] Blackout Dates avanzado (calendario visual)
- [ ] Límites diarios de pedidos
- [ ] Integración con Google Calendar
- [ ] Exportación CSV de entregas
- [ ] Notificaciones por email
- [ ] Analytics de fechas más populares

---

**Última actualización:** Noviembre 2025  
**Versión del documento:** 1.0

