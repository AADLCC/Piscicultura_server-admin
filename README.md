# Server Admin - Automatización de Estanques para Piscicultura

Este proyecto corresponde al servidor de administración backend. 

El proyecto consiste en el diseño e implementación de un sistema de automatización para estanques de piscicultura. Su objetivo principal es facilitar el control y monitoreo de las condiciones del agua necesarias para el adecuado desarrollo de los peces.

El sistema busca mejorar la eficiencia operativa, reducir riesgos de pérdida en la producción y optimizar el uso de recursos[cite: 14].

## Tecnologías Utilizadas
* **Entorno:** Node.js
* **Base de Datos:** MongoDB (Mongoose)
* **Autenticación:** JSON Web Tokens (JWT) & bcryptjs
* **Seguridad:** Helmet, CORS
* **Infraestructura:** Docker & Docker Compose

---

## 🚀 Cómo levantar el servidor

El proyecto está completamente contenerizado, por lo que no es necesario instalar Node.js ni MongoDB localmente para ejecutarlo.

1. Asegúrate de tener **Docker** y **Docker Compose** instalados en tu sistema.
2. En la raíz del proyecto, ejecuta el siguiente comando en tu terminal:
   ```bash
   docker-compose up --build
3. El servidor estará disponible en `http://localhost:3000` y la base de datos MongoDB se levantará internamente en el puerto `27017`.

---

## 🔐 Autenticación y Headers (JWT)

A excepción de las rutas de Autenticación (`/login` y `/register`), **todos los endpoints están protegidos**.

Para acceder a las rutas protegidas, necesitas:

1. Realizar una petición `POST` a `/api/v1/auth/login` con credenciales de un usuario con rol `Admin`.
2. Copiar el `token` devuelto en la respuesta.
3. Incluir este token en los **Headers** de todas tus peticiones subsecuentes bajo la llave `x-token`.

**Ejemplo de Header:**

```json
{
  "x-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## 🪪 Tipos de Identificadores (IDs)

Es importante diferenciar los tipos de IDs que utiliza el sistema para realizar relaciones correctamente en los *bodies* de las peticiones:

* **Usuario (`id` / `usuarioId`):** Utiliza **UUID v4** (Ej. `550e8400-e29b-41d4-a716-446655440000`).
* **Estanque, Lectura y Actividad (`id` / `estanqueId`):** Utilizan **ObjectId** nativo de MongoDB (Ej. `64a7b5d8f1a2c3d4e5f6a7b8`).

---

## 📡 Endpoints de la API

A continuación se detallan las rutas disponibles. El símbolo 🔒 indica que la ruta requiere el header `x-token` y privilegios de Administrador.

### Autenticación (Públicas)

| Método | Endpoint | Descripción | Body Requerido |
| --- | --- | --- | --- |
| `POST` | `/api/v1/auth/register` | Registra un nuevo administrador | `nombre`, `apellido`, `correo`, `telefono`, `contrasena` |
| `POST` | `/api/v1/auth/login` | Inicia sesión y obtiene JWT | `correo`, `contrasena` |

### Usuarios

| Método | Endpoint | Descripción | 🔒 | Body Requerido / Params |
| --- | --- | --- | --- | --- |
| `POST` | `/api/v1/users` | Crea un usuario desde el panel | Sí | `nombre`, `apellido`, `correo`, `telefono`, `contrasena` |
| |  |  |  |  |

### Estanques

| Método | Endpoint | Descripción | 🔒 | Body / Params Requeridos |
| --- | --- | --- | --- | --- |
| `GET` | `/api/v1/estanques` | Obtiene todos los estanques | Sí | N/A |
| `GET` | `/api/v1/estanques/:id` | Obtiene un estanque por su ID | Sí | Params: `id` (ObjectId) |
| `POST` | `/api/v1/estanques` | Crea un nuevo estanque | Sí | `nombre`, `ubicacion`, `capacidad`, `especiePez`, `usuarioId` (UUID) |
| `PUT` | `/api/v1/estanques/:id` | Actualiza datos del estanque | Sí | Params: `id`. Body: campos a actualizar |
| `DELETE` | `/api/v1/estanques/:id` | Elimina un estanque | Sí | Params: `id` (ObjectId) |

### Historial de Sensores (Lecturas)

| Método | Endpoint | Descripción | 🔒 | Body / Params Requeridos |
| --- | --- | --- | --- | --- |
| `GET` | `/api/v1/lecturas` | Obtiene todas las lecturas globales | Sí | N/A |
| `GET` | `/api/v1/lecturas/estanque/:estanqueId` | Lecturas de un estanque específico | Sí | Params: `estanqueId` (ObjectId) |
| `POST` | `/api/v1/lecturas` | Registra una nueva lectura | Sí | `estanqueId`, `temperatura`, `ph`, `nivelOxigeno`, `nivelAgua` |
| `DELETE` | `/api/v1/lecturas/:id` | Elimina un registro de lectura | Sí | Params: `id` (ObjectId) |

### Control de Actuadores (Registro de Actividad)

| Método | Endpoint | Descripción | 🔒 | Body / Params Requeridos |
| --- | --- | --- | --- | --- |
| `GET` | `/api/v1/actividades` | Obtiene todo el historial de control | Sí | N/A |
| `GET` | `/api/v1/actividades/estanque/:estanqueId` | Actividades de un estanque | Sí | Params: `estanqueId` (ObjectId) |
| `POST` | `/api/v1/actividades` | Registra acción en un dispositivo | Sí | `estanqueId`, `dispositivo`, `accion`, `modo` |
| `DELETE` | `/api/v1/actividades/:id` | Elimina un registro de actividad | Sí | Params: `id` (ObjectId) |

---

## 📝 Ejemplo de Body (Crear Estanque)

```json
{
  "nombre": "Estanque Tilapia Norte",
  "ubicacion": "Sector A - Invernadero 1",
  "capacidad": 5000,
  "especiePez": "Tilapia",
  "estado": "activo",
  "usuarioId": "a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d"
}
```