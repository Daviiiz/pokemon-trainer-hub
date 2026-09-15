# Pokémon Trainer Hub

Proyecto final de Desarrollo Web Full Stack creado como una aplicación web para consultar información de Pokémon y estrategias competitivas.

La aplicación combina PokéAPI como fuente externa de datos con una API REST propia desarrollada con Node.js, Express y MySQL.

## Demo

**Frontend:**
https://pokemon-trainer-hub-daviiiz.netlify.app

**Backend API:**
https://pokemon-trainer-hub-api.onrender.com

---

## Funcionalidades principales

### Pokédex

- Búsqueda de Pokémon por nombre.
- Catálogo basado en PokéAPI.
- Consulta de información individual de cada Pokémon.
- Visualización de tipos, estadísticas y datos principales.
- Diseño responsive para escritorio y dispositivos móviles.

### Builds competitivas

- Listado de estrategias competitivas almacenadas en la base de datos propia.
- Asociación entre cada build y un Pokémon mediante su ID de PokéAPI.
- Información de rol competitivo, objeto equipado, cuatro movimientos y descripción.
- Página de detalle para cada build.

### API propia

El backend dispone de tres recursos relacionados:

- `builds`
- `items`
- `roles`

`builds` es el recurso principal y dispone de un CRUD completo.

Los recursos se relacionan mediante claves foráneas en MySQL.

---

## Arquitectura

El proyecto separa frontend, backend y base de datos:

```text
Usuario
   |
   v
Frontend
Astro + React
Netlify
   |
   | HTTP / REST API
   v
Backend
Node.js + Express
Render
   |
   v
MySQL
Clever Cloud
```

PokéAPI se utiliza como fuente externa para obtener la información base de los Pokémon.

La API propia almacena la información adicional creada específicamente para Pokémon Trainer Hub.

---

## Tecnologías utilizadas

### Frontend

- Astro
- React
- JavaScript
- HTML
- CSS
- Fetch API

### Backend

- Node.js
- Express
- MySQL2
- CORS
- dotenv

### Base de datos

- MySQL / MariaDB
- Relaciones mediante Foreign Keys

### APIs

- PokéAPI
- API REST propia de Pokémon Trainer Hub

### Despliegue

- Netlify — Frontend
- Render — Backend
- Clever Cloud — Base de datos MySQL

### Control de versiones

- Git
- GitHub

---

## Estructura principal del proyecto

```text
pokemon-trainer-hub/
|
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controladores/
│   │   ├── data/
│   │   ├── middlewares/
│   │   └── rutas/
│   ├── .env.example
│   └── package.json
|
├── database/
│   └── pokemon_trainer_hub.sql
|
├── public/
|
├── src/
│   ├── components/
│   ├── layouts/
│   ├── pages/
│   └── styles/
|
├── .env.example
├── astro.config.mjs
├── package.json
└── README.md
```

---

## Páginas principales

- `/` — Página principal de Pokémon Trainer Hub.
- `/pokedex` — Buscador y catálogo Pokémon.
- `/pokemon/:id` — Detalle individual de un Pokémon.
- `/builds` — Listado de builds competitivas.
- `/builds/:id` — Detalle de una build.

---

## API REST

URL base de producción:

```text
https://pokemon-trainer-hub-api.onrender.com
```

### Builds

```http
GET /builds
GET /builds/:id
POST /builds
PUT /builds/:id
DELETE /builds/:id
```

### Items

```http
GET /items
```

### Roles

```http
GET /roles
```

Las operaciones de escritura del CRUD están protegidas mediante una API Key enviada en la cabecera:

```http
x-api-key
```

La clave no se almacena en el repositorio y se configura mediante variables de entorno.

---

## Modelo de datos

La base de datos contiene tres tablas principales:

```text
items
roles
builds
```

Relaciones:

```text
items.id  -> builds.item_id
roles.id  -> builds.role_id
```

Cada build también almacena:

```text
pokemon_id
```

Este valor corresponde al ID del Pokémon en PokéAPI.

No existe una tabla local de Pokémon porque PokéAPI funciona como catálogo externo.

---

## Variables de entorno

### Frontend

Crear un archivo `.env` en la raíz del proyecto tomando como referencia `.env.example`:

```env
PUBLIC_API_URL=http://localhost:3000
```

### Backend

Crear `backend/.env` utilizando `backend/.env.example` como plantilla.

Variables necesarias:

```env
DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_NAME=
FRONTEND_URL=
ADMIN_API_KEY=
PORT=3000
```

Los archivos `.env` contienen información privada y no se incluyen en Git.

---

## Instalación local

### 1. Clonar el repositorio

```bash
git clone https://github.com/Daviiiz/pokemon-trainer-hub.git
cd pokemon-trainer-hub
```

### 2. Instalar dependencias del frontend

```bash
npm install
```

### 3. Instalar dependencias del backend

```bash
cd backend
npm install
cd ..
```

### 4. Crear la base de datos

Importar el archivo:

```text
database/pokemon_trainer_hub.sql
```

en una instancia MySQL o MariaDB y configurar las credenciales correspondientes en `backend/.env`.

---

## Ejecutar el proyecto

### Backend

Desde la carpeta `backend/`, ejecutar el script configurado para iniciar el servidor:

```bash
npm start
```

El servidor local estará disponible normalmente en:

```text
http://localhost:3000
```

### Frontend

Desde la raíz del proyecto:

```bash
npm run dev
```

Astro estará disponible en:

```text
http://localhost:4321
```

---

## Build de producción

Desde la raíz del proyecto:

```bash
npm run build
```

Astro genera los archivos de producción dentro de `dist/`.

Para comprobar el resultado localmente:

```bash
npm run preview
```

---

## Seguridad

El proyecto utiliza variables de entorno para evitar almacenar credenciales directamente en el código.

Las operaciones de modificación de la API están protegidas mediante `x-api-key`.

También se utiliza CORS para controlar qué frontend puede realizar peticiones al backend.

---

## Despliegue

La versión de producción utiliza tres servicios separados:

```text
Frontend -> Netlify
Backend  -> Render
Database -> Clever Cloud
```

El frontend utiliza la variable `PUBLIC_API_URL` para conocer la URL del backend.

El backend utiliza `FRONTEND_URL` para configurar el origen permitido mediante CORS.

---

## Estado del proyecto

MVP funcional y desplegado.

Incluye:

- Frontend responsive.
- Integración con PokéAPI.
- API REST propia.
- Base de datos relacional.
- CRUD completo de builds.
- Recursos relacionados.
- Protección de rutas de escritura.
- Variables de entorno.
- Despliegue completo de frontend, backend y base de datos.

---

## Autor

David

Proyecto final de Desarrollo Web Full Stack.
