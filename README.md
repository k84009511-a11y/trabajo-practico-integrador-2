# Trabajo Práctico Integrador II

## Requisitos

- Node.js y npm.
- MySQL configurado para el backend.

## Iniciar el backend

Desde `backend/`, instalar dependencias con `npm install`, configurar `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD` y `JWT_SECRET` en `backend/.env`, e iniciar el servidor con `node src/index.js`. El backend escucha por defecto en `http://localhost:3000` y acepta el origen `http://localhost:5173` con credenciales.

## Iniciar el frontend

Desde `frontend/`, ejecutar `npm install` y luego `npm run dev`. El frontend usa por defecto `http://localhost:3000/api`; para cambiarlo, definir `VITE_API_URL` en `frontend/.env` (por ejemplo `VITE_API_URL=http://localhost:3000/api`).
