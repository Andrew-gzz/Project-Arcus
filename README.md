# Project Arcus

E-commerce especializado en gaming y entretenimiento arcade. Compra y venta de videojuegos, consolas, accesorios y gabinetes arcade, con planes de membresía para centros arcade.

---

## Integrantes del Equipo

2046701 - Jock Rey Reyes Aguirre
2020197 - Andres Rafael Gonzalez Sierra
2048292 - Areli Sarai Hernández Franco
2048689 - Joshua Salvador Torres González

---

## Descripción de la Aplicación

Project Arcus es una plataforma e-commerce full-stack (MERN) que ofrece:

- Catálogo de productos con búsqueda, filtros y paginación
- Carrito de compras y lista de deseos
- Sistema de calificaciones y reseñas
- Compra de membresías (Start, Select, Bonus)
- Panel de administración (productos, categorías, usuarios, reportes)
- Gestión de órdenes con cancelación y restauración de stock
- Reportes de ventas, productos más vendidos, usuarios y suscripciones

---

## Estructura de Carpetas

```
Project-Arcus/
├── backend/                 # Servicio Back End (Express + Mongoose)
│   ├── config/              # Configuración de base de datos
│   ├── controllers/         # Lógica de negocio (auth, product, cart, orders, etc.)
│   ├── middleware/          # Auth, logging, validación, error handler
│   ├── models/              # Esquemas de Mongoose (7 colecciones)
│   ├── routes/              # Endpoints de Express
│   ├── utils/               # Logger (winston)
│   ├── validators/          # Validaciones con express-validator
│   └── app.js               # Punto de entrada del servidor
├── frontend/                # Servicio Front End (React + TypeScript + Vite)
│   ├── src/
│   │   ├── api/             # Cliente HTTP (fetch con cookies)
│   │   ├── components/      # Componentes reutilizables (navbar, footer, modales, etc.)
│   │   ├── pages/           # Páginas de la aplicación
│   │   ├── services/        # Capa de servicios para llamadas a la API
│   │   └── App.tsx          # Configuración de rutas
│   └── package.json
└── README.md                # Este archivo
```

---

## Instrucciones de Ejecución

### Prerrequisitos

- **Node.js** >= 18
- **MongoDB** corriendo localmente en `mongodb://localhost:27017`

### 1. Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd Project-Arcus
```

### 2. Configurar variables de entorno

Crear archivo `backend/.env`:

```env
PORT=7000
MONGODB_URI=mongodb://localhost:27017/arcus
FRONTEND_URL=http://localhost:5173
JWT_SECRET=tu_jwt_secret_aqui
JWT_EXPIRE=7d
```

### 3. Instalar dependencias

```bash
# Backend
cd backend && npm install

# Frontend
cd ../frontend && npm install
```

### 4. Ejecutar la aplicación

**Terminal 1 — Backend:**
```bash
cd backend && npm run dev
```
El servidor inicia en `http://localhost:7000`

**Terminal 2 — Frontend:**
```bash
cd frontend && npm run dev
```
La aplicación está en `http://localhost:5173`

### 5. Usuario administrador por defecto

Para acceder al panel de administración, registra un usuario y cambia su campo `type` a `"admin"` directamente en MongoDB:

```js
db.users.updateOne({ email: "tu@email.com" }, { $set: { type: "admin" } })
```

---

## Tecnologías

| Capa | Tecnologías |
|------|-------------|
| Frontend | React 18, TypeScript, Vite 5, Bootstrap 5, React Router DOM v7 |
| Backend | Express 4, Mongoose 8, JWT, bcrypt, express-validator, winston, morgan |
| Base de datos | MongoDB |
