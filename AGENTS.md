# AGENTS.md - Gestor de Reservas de Pistas de Pádel (Frontend)

Documentación de referencia rápida para el agente de IA sobre el proyecto frontend del gestor de reservas de pádel.

---

## 🎨 Reglas de Diseño CSS

> **IMPORTANTE**: Antes de escribir cualquier JSX con clases de estilos, consultar [`reglas_diseño.md`](./reglas_diseño.md).

Ese archivo contiene el sistema visual completo del proyecto:
- Tokens de color, tipografía y espaciado
- Clases canónicas de cada componente DaisyUI (card, input, btn, alert, badge…)
- Estructura de páginas privadas y públicas
- Estados interactivos (hover, focus, disabled, error, loading)
- Reglas de accesibilidad y responsive
- Lista de prohibiciones (qué NO hacer)

El tema activo es `padel` (definido en `src/index.css`), activado via `data-theme="padel"` en `<html>`.

---

## 🛠 Tecnologías Utilizadas

- **React** 19.2.5 - Librería UI
- **Vite** 8.0.10 - Bundler y servidor de desarrollo
- **React Router DOM** 7.x - Sistema de rutas
- **Tailwind CSS** v4 + **DaisyUI** v5 - Sistema de estilos (tema `padel`)
- **JavaScript** (ES Modules) - Lenguaje principal
- **Fetch API** - Cliente HTTP nativo
- **JWT** - Autenticación (almacenado en localStorage)
- **ESLint** - Linter de código

### Herramientas de Desarrollo

- Node.js (npm)
- ESLint con soporte para React Hooks

---

## 📁 Estructura de Carpetas

```
gestor-reservas-padel-frontend/
├── src/
│   ├── App.jsx                      # Componente principal con Router
│   ├── App.css                      # Estilos globales
│   ├── main.jsx                     # Punto de entrada
│   ├── index.css                    # Estilos base
│   ├── assets/                      # Recursos estáticos (imágenes, etc.)
│   ├── components/                  # Componentes reutilizables
│   │   ├── Navbar.jsx               # Navbar con autenticación
│   │   ├── FormularioPista.jsx      # Formulario para crear/editar pistas
│   │   ├── FormularioReserva.jsx    # Formulario para crear reservas
│   │   ├── ListadoPistas.jsx        # Lista de todas las pistas
│   │   ├── ListadoReservas.jsx      # Lista de todas las reservas
│   │   ├── Pista.jsx                # Componente individual de pista
│   │   ├── Reserva.jsx              # Componente individual de reserva
│   │   └── ProtectedRoute.jsx       # Componente para proteger rutas privadas
│   ├── context/                     # Context API (si aplica)
│   ├── pages/                       # Páginas de la aplicación
│   │   ├── LoginPage.jsx            # Página de login
│   │   ├── RegistroPage.jsx         # Página de registro
│   │   ├── HomePage.jsx             # Página de inicio pública
│   │   ├── PistasPage.jsx           # Página de gestión de pistas (privada)
│   │   ├── ReservasPage.jsx         # Página de gestión de reservas (privada)
│   │   └── NotFoundPage.jsx         # Página 404
│   ├── services/                    # Servicios de API
│   │   ├── api.js                   # Cliente HTTP configurado
│   │   ├── authService.js           # Servicio de autenticación
│   │   ├── pistaService.js          # Servicio de pistas
│   │   └── reservaService.js        # Servicio de reservas
│   └── styles/                      # Estilos CSS modulares
│       ├── Navbar.css               # Estilos del navbar
│       ├── Auth.css                 # Estilos de login y registro
│       ├── HomePage.css             # Estilos de la página de inicio
│       ├── Pages.css                # Estilos generales de páginas
│       └── NotFound.css             # Estilos de página 404
├── public/                          # Archivos estáticos
├── vite.config.js                   # Configuración de Vite
├── eslint.config.js                 # Configuración de ESLint
├── package.json                     # Dependencias del proyecto
├── index.html                       # HTML principal
└── README.md                        # Documentación general
```

---

## � Rutas Implementadas

### Rutas Públicas

| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/` | HomePage | Página de inicio con información del club |
| `/login` | LoginPage | Formulario de autenticación |
| `/registro` | RegistroPage | Formulario de registro de usuario |
| `*` | NotFoundPage | Página 404 para rutas no encontradas |

### Rutas Privadas (Requieren autenticación)

| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/pistas` | PistasPage | Gestión y visualización de pistas |
| `/reservas` | ReservasPage | Gestión de reservas |

**Nota**: Las rutas privadas utilizan el componente `ProtectedRoute` que redirige automáticamente a `/login` si no hay token JWT en `localStorage`.

---

## 🔐 Sistema de Autenticación

### Componentes de Autenticación

1. **ProtectedRoute.jsx**: Componente HOC que protege rutas privadas
   - Verifica si existe token en `localStorage`
   - Redirige a `/login` si no está autenticado
   - Permite el acceso si el token existe

2. **Navbar.jsx**: Componente de navegación inteligente
   - Muestra nombre del usuario cuando está autenticado
   - Botón de logout que limpia `localStorage` y redirige a login
   - Muestra diferentes opciones según estado de autenticación

### Flujo de Autenticación

1. **Registro**: 
   - Usuario completa formulario en `/registro`
   - Se envía POST a `/api/auth/register`
   - Backend retorna token JWT y datos del usuario
   - Se guardan en `localStorage` (claves: `token`, `usuario`)

2. **Login**:
   - Usuario completa formulario en `/login`
   - Se envía POST a `/api/auth/login`
   - Backend retorna token JWT
   - Se guardan en `localStorage`

3. **Logout**:
   - Usuario hace clic en "Salir" del navbar
   - Se limpian `localStorage` (token y usuario)
   - Redirige automáticamente a `/login`

---

## 🔧 Servicios Existentes

### 1. **api.js** - Cliente HTTP Base

**Ubicación**: `src/services/api.js`

**Propósito**: Proporciona una función wrapper para todas las peticiones HTTP a la API.

**Características**:

- Configura la URL base (`http://localhost:8080/api`)
- Inyecta automáticamente el token JWT en el header `Authorization`
- Lee el token desde `localStorage`
- Soporta todos los métodos HTTP (GET, POST, PUT, DELETE)
- Incluye el header `Content-Type: application/json` por defecto

**Función principal**: `api(endpoint, method = "GET", body = null)`

---

### 2. **authService.js** - Autenticación y Usuarios

**Ubicación**: `src/services/authService.js`

**Propósito**: Gestiona el registro, login y operaciones CRUD de usuarios.

**Funciones disponibles**:

- `register(usuario)` - Registrar nuevo usuario
- `login(email, password)` - Autenticar usuario
- `logout()` - Cerrar sesión y limpiar localStorage
- `getToken()` - Obtener token del localStorage
- `isAuthenticated()` - Verificar si hay token válido
- `getUsuario()` - Obtener datos del usuario autenticado
- `getAllUsuarios()` - Obtener lista de usuarios
- `getUsuarioPorId(id)` - Obtener usuario por ID
- `createUsuario(usuario)` - Crear nuevo usuario
- `updateUsuario(id, usuario)` - Actualizar usuario
- `deleteUsuario(id)` - Eliminar usuario

---

### 3. **pistaService.js** - Gestión de Pistas

**Ubicación**: `src/services/pistaService.js`

**Propósito**: Gestiona todas las operaciones CRUD sobre las pistas de pádel.

**Funciones disponibles**:

- `getPistas()` - Obtener todas las pistas
- `getPista(id)` - Obtener pista por ID
- `crearPista(pista)` - Crear nueva pista
- `actualizarPista(id, pista)` - Actualizar datos de pista
- `eliminarPista(id)` - Eliminar pista

---

### 4. **reservaService.js** - Gestión de Reservas

**Ubicación**: `src/services/reservaService.js`

**Propósito**: Gestiona la creación, lectura y eliminación de reservas.

**Funciones disponibles**:

- `getReservas()` - Obtener todas las reservas
- `crearReserva(reserva)` - Crear nueva reserva
- `eliminarReserva(id)` - Cancelar/eliminar una reserva

---

## 🌐 Endpoints del Backend

**URL Base**: `http://localhost:8080`

### Autenticación (Sin requerir token)

| Método | Endpoint             | Descripción                            |
| ------ | -------------------- | -------------------------------------- |
| POST   | `/api/auth/register` | Registrar usuario y obtener token JWT  |
| POST   | `/api/auth/login`    | Autenticar usuario y obtener token JWT |

---

### Usuarios (Requiere Authorization Bearer Token)

| Método | Endpoint             | Descripción                                        |
| ------ | -------------------- | -------------------------------------------------- |
| POST   | `/api/usuarios`      | Crear nuevo usuario                                |
| GET    | `/api/usuarios`      | Obtener todos los usuarios                         |
| GET    | `/api/usuarios/{id}` | Obtener usuario por ID                             |
| PUT    | `/api/usuarios/{id}` | Actualizar usuario                                 |
| DELETE | `/api/usuarios/{id}` | Eliminar usuario (elimina sus reservas en cascada) |

---

### Pistas (Requiere Authorization Bearer Token)

| Método | Endpoint           | Descripción              |
| ------ | ------------------ | ------------------------ |
| POST   | `/api/pistas`      | Crear nueva pista        |
| GET    | `/api/pistas`      | Obtener todas las pistas |
| GET    | `/api/pistas/{id}` | Obtener pista por ID     |
| PUT    | `/api/pistas/{id}` | Actualizar pista         |
| DELETE | `/api/pistas/{id}` | Eliminar pista           |

---

### Reservas (La mayoría sin token obligatorio para lectura)

| Método | Endpoint             | Descripción                |
| ------ | -------------------- | -------------------------- |
| POST   | `/api/reservas`      | Crear nueva reserva        |
| GET    | `/api/reservas`      | Obtener todas las reservas |
| DELETE | `/api/reservas/{id}` | Eliminar/cancelar reserva  |

---

## 📋 Horarios Válidos para Reservas

Las reservas solo pueden crearse en estos horarios de 1.5 horas cada uno:

- **17:30 - 19:00**
- **19:00 - 20:30**
- **20:30 - 22:00**
- **22:00 - 23:30**

---

## 📝 Formatos de Datos Importantes

### Formato de Fecha

- **Formato**: ISO 8601 → `YYYY-MM-DD`
- **Ejemplo**: `2026-05-15`

### Formato de Hora

- **Formato**: 24 horas → `HH:mm`
- **Ejemplos**: `17:30`, `19:00`, `20:30`, `22:00`

### Token JWT

- Se almacena en `localStorage` con clave `"token"`
- Se envía en header: `Authorization: Bearer {token}`

---

## 🔐 Validaciones Importantes

1. **Reservas Duplicadas**: No se pueden crear dos reservas para la misma pista en la misma fecha y horario
2. **Horarios Válidos**: Solo se aceptan los 4 horarios predefinidos
3. **Formato de Datos**: Todos los datos enviados deben cumplir con los formatos especificados
4. **Autenticación**: Todos los endpoints excepto `/api/auth/*` requieren token JWT válido
5. **Eliminación en Cascada**: Al eliminar un usuario, se eliminan automáticamente todas sus reservas

---

## 🎯 Flujo de Autenticación

1. Usuario se registra o loguea en `/api/auth/register` o `/api/auth/login`
2. Backend retorna un token JWT
3. Token se almacena en `localStorage`
4. Token se incluye automáticamente en el header de todas las peticiones posteriores
5. Si el token expira, el usuario debe volver a loguear

---

## 🚀 Comandos Disponibles

```bash
# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Ejecutar linter
npm lint

# Ver vista previa de producción
npm run preview
```

---

## 🔗 Ejemplo de Uso Completo

### 1. Registrar Usuario

```javascript
POST /api/auth/register
{
  "nombre": "Juan García",
  "email": "juan@example.com",
  "password": "securePassword123"
}
```

### 2. Obtener Pistas

```javascript
GET /api/pistas
Headers: Authorization: Bearer {token}
```

### 3. Crear Reserva

```javascript
POST /api/reservas
Headers: Authorization: Bearer {token}
{
  "fecha": "2026-05-15",
  "horaInicio": "17:30",
  "horaFin": "19:00",
  "usuarioId": 1,
  "pistaId": 1
}
```

---

## 📌 Notas para el Agente

- El proyecto usa **Context API** para gestión de estado (ver carpeta `context/`)
- Los componentes están organizados por funcionalidad en `components/`
- Las páginas están en la carpeta `pages/`
- El cliente HTTP está centralizado en `api.js` para facilitar cambios futuros
- Todos los servicios usan la función `api()` para consistencia
- Los errores del backend se retornan en formato JSON con un campo `error`
- **Nuevo**: Las rutas privadas están protegidas con `ProtectedRoute`
- **Nuevo**: El token JWT se almacena automáticamente en `localStorage` tras login/registro
- **Nuevo**: El navbar es responsive y muestra información del usuario autenticado
- Actualiza este archivo con cada nueva implementación de código que sea relevante (nuevas páginas, uso nuevo de endpoints...)
- Consultar `reglas_diseño.md` antes de aplicar estilos en cualquier componente o página

---

**Última actualización**: 29 de abril de 2026
