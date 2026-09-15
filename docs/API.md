# Documentación de la API — Pokémon Trainer Hub

## 1. Descripción general

La API REST de Pokémon Trainer Hub está desarrollada con Node.js, Express y MySQL.

Su función es gestionar la información propia del proyecto:

- builds competitivas,
- objetos (`items`),
- roles competitivos (`roles`).

La información base de los Pokémon no se almacena en esta base de datos. Cada build guarda un `pokemon_id` que corresponde al identificador del Pokémon en PokéAPI.

---

## 2. URL base

### Producción

```text
https://pokemon-trainer-hub-api.onrender.com
```

### Desarrollo local

```text
http://localhost:3000
```

---

## 3. Formato de datos

La API recibe y devuelve datos en formato JSON.

Para las operaciones de escritura se debe enviar:

```http
Content-Type: application/json
```

---

## 4. Autenticación

Las operaciones de lectura son públicas.

Las operaciones que modifican builds están protegidas mediante una API Key.

Rutas protegidas:

```http
POST /builds
PUT /builds/:id
DELETE /builds/:id
```

La clave se envía mediante la cabecera:

```http
x-api-key: TU_API_KEY
```

La API Key válida se configura en el backend mediante la variable de entorno:

```env
ADMIN_API_KEY=
```

Si la cabecera no existe o la clave no es válida, la API responde:

```http
401 Unauthorized
```

Ejemplo:

```json
{
  "mensaje": "API key no válida."
}
```

La clave real no debe almacenarse en el repositorio.

---

# 5. Recurso Builds

`builds` es el recurso principal de la API y dispone de un CRUD completo.

Una build está relacionada con:

- un `item` mediante `item_id`,
- un `role` mediante `role_id`,
- un Pokémon externo mediante `pokemon_id`.

Las consultas de builds utilizan `JOIN` con las tablas `items` y `roles`, por lo que las respuestas incluyen tanto los IDs relacionados como sus nombres.

## Estructura de una build

Ejemplo de respuesta:

```json
{
  "id": 1,
  "pokemon_id": 25,
  "titulo": "Special Attacker",
  "objeto": "Light Ball",
  "movimiento_1": "Thunderbolt",
  "movimiento_2": "Volt Switch",
  "movimiento_3": "Grass Knot",
  "movimiento_4": "Nasty Plot",
  "rol": "Atacante especial",
  "descripcion": "Build ofensiva especial para Pikachu.",
  "item_id": 1,
  "role_id": 1
}
```

---

## GET /builds

Devuelve todas las builds.

```http
GET /builds
```

Las builds se ordenan por `pokemon_id` y después por `id`, ambos de forma ascendente.

### Respuesta correcta

```http
200 OK
```

Ejemplo:

```json
[
  {
    "id": 1,
    "pokemon_id": 25,
    "titulo": "Special Attacker",
    "objeto": "Light Ball",
    "movimiento_1": "Thunderbolt",
    "movimiento_2": "Volt Switch",
    "movimiento_3": "Grass Knot",
    "movimiento_4": "Nasty Plot",
    "rol": "Atacante especial",
    "descripcion": "Build ofensiva especial para Pikachu.",
    "item_id": 1,
    "role_id": 1
  }
]
```

---

## GET /builds?pokemon_id=:pokemon_id

Permite filtrar las builds por el ID externo de PokéAPI.

Ejemplo:

```http
GET /builds?pokemon_id=25
```

### Validación

`pokemon_id` debe ser un número entero positivo.

Si no es válido:

```http
400 Bad Request
```

```json
{
  "mensaje": "pokemon_id debe ser un número entero positivo."
}
```

### Respuesta correcta

```http
200 OK
```

Devuelve un array con las builds asociadas al Pokémon indicado.

Si no existen builds para ese Pokémon, devuelve un array vacío.

---

## GET /builds/:id

Devuelve una build concreta según su ID interno.

Ejemplo:

```http
GET /builds/1
```

### Respuesta correcta

```http
200 OK
```

### ID no válido

```http
400 Bad Request
```

```json
{
  "mensaje": "El id de la Build debe ser un número entero positivo."
}
```

### Build inexistente

```http
404 Not Found
```

```json
{
  "mensaje": "Build no encontrada."
}
```

---

## POST /builds

Crea una nueva build.

Ruta protegida mediante `x-api-key`.

```http
POST /builds
```

### Cabeceras

```http
Content-Type: application/json
x-api-key: TU_API_KEY
```

### Body

```json
{
  "pokemon_id": 25,
  "titulo": "Special Attacker",
  "item_id": 1,
  "movimiento_1": "Thunderbolt",
  "movimiento_2": "Volt Switch",
  "movimiento_3": "Grass Knot",
  "movimiento_4": "Nasty Plot",
  "role_id": 1,
  "descripcion": "Build ofensiva especial para Pikachu."
}
```

### Campos obligatorios

- `pokemon_id`
- `titulo`
- `item_id`
- `movimiento_1`
- `movimiento_2`
- `movimiento_3`
- `movimiento_4`
- `role_id`

`descripcion` es opcional. Si no se envía, se almacena como `null`.

### Validaciones

`pokemon_id`, `item_id` y `role_id` deben ser números enteros positivos.

Si faltan los campos de texto obligatorios:

```http
400 Bad Request
```

```json
{
  "mensaje": "Faltan campos obligatorios para crear la Build."
}
```

Si `pokemon_id` no es válido:

```json
{
  "mensaje": "pokemon_id debe ser un número entero positivo."
}
```

Si `item_id` no es válido:

```json
{
  "mensaje": "item_id debe ser un número entero positivo."
}
```

Si `role_id` no es válido:

```json
{
  "mensaje": "role_id debe ser un número entero positivo."
}
```

### Respuesta correcta

```http
201 Created
```

La API devuelve la build recién creada con los datos relacionados de item y rol.

---

## PUT /builds/:id

Actualiza completamente una build existente.

Ruta protegida mediante `x-api-key`.

```http
PUT /builds/1
```

### Cabeceras

```http
Content-Type: application/json
x-api-key: TU_API_KEY
```

### Body

El formato es el mismo que en `POST /builds`:

```json
{
  "pokemon_id": 25,
  "titulo": "Special Attacker actualizado",
  "item_id": 1,
  "movimiento_1": "Thunderbolt",
  "movimiento_2": "Volt Switch",
  "movimiento_3": "Grass Knot",
  "movimiento_4": "Nasty Plot",
  "role_id": 1,
  "descripcion": "Descripción actualizada."
}
```

Los campos obligatorios y sus validaciones son los mismos que en la creación.

### Respuesta correcta

```http
200 OK
```

La API devuelve la build ya actualizada.

### ID no válido

```http
400 Bad Request
```

```json
{
  "mensaje": "El id de la Build debe ser un número entero positivo."
}
```

### Build inexistente

```http
404 Not Found
```

```json
{
  "mensaje": "Build no encontrada."
}
```

---

## DELETE /builds/:id

Elimina una build.

Ruta protegida mediante `x-api-key`.

```http
DELETE /builds/1
```

### Cabecera

```http
x-api-key: TU_API_KEY
```

### Respuesta correcta

```http
200 OK
```

```json
{
  "mensaje": "Build eliminada correctamente.",
  "id": 1
}
```

### ID no válido

```http
400 Bad Request
```

```json
{
  "mensaje": "El id de la Build debe ser un número entero positivo."
}
```

### Build inexistente

```http
404 Not Found
```

```json
{
  "mensaje": "Build no encontrada."
}
```

---

# 6. Recurso Items

Los items son recursos de solo lectura.

## Estructura

```json
{
  "id": 1,
  "nombre": "Light Ball"
}
```

---

## GET /items

Devuelve todos los items ordenados alfabéticamente por `nombre`.

```http
GET /items
```

### Respuesta correcta

```http
200 OK
```

Ejemplo:

```json
[
  {
    "id": 1,
    "nombre": "Light Ball"
  }
]
```

---

## GET /items/:id

Devuelve un item concreto.

```http
GET /items/1
```

### Respuesta correcta

```http
200 OK
```

### ID no válido

```http
400 Bad Request
```

```json
{
  "mensaje": "El id del Item debe ser un número entero positivo."
}
```

### Item inexistente

```http
404 Not Found
```

```json
{
  "mensaje": "Item no encontrado."
}
```

---

# 7. Recurso Roles

Los roles son recursos de solo lectura.

## Estructura

```json
{
  "id": 1,
  "nombre": "Atacante especial"
}
```

---

## GET /roles

Devuelve todos los roles ordenados alfabéticamente por `nombre`.

```http
GET /roles
```

### Respuesta correcta

```http
200 OK
```

Ejemplo:

```json
[
  {
    "id": 1,
    "nombre": "Atacante especial"
  }
]
```

---

## GET /roles/:id

Devuelve un rol concreto.

```http
GET /roles/1
```

### Respuesta correcta

```http
200 OK
```

### ID no válido

```http
400 Bad Request
```

```json
{
  "mensaje": "El id del Rol debe ser un número entero positivo."
}
```

### Rol inexistente

```http
404 Not Found
```

```json
{
  "mensaje": "Rol no encontrado."
}
```

---

# 8. Resumen de endpoints

| Método | Endpoint | Descripción | Protección |
| --- | --- | --- | --- |
| GET | `/builds` | Obtener todas las builds | Pública |
| GET | `/builds?pokemon_id=:id` | Filtrar builds por Pokémon | Pública |
| GET | `/builds/:id` | Obtener una build por ID | Pública |
| POST | `/builds` | Crear una build | `x-api-key` |
| PUT | `/builds/:id` | Actualizar una build | `x-api-key` |
| DELETE | `/builds/:id` | Eliminar una build | `x-api-key` |
| GET | `/items` | Obtener todos los items | Pública |
| GET | `/items/:id` | Obtener un item por ID | Pública |
| GET | `/roles` | Obtener todos los roles | Pública |
| GET | `/roles/:id` | Obtener un rol por ID | Pública |

---

# 9. Códigos HTTP utilizados

| Código | Significado en la API |
| --- | --- |
| `200` | Petición realizada correctamente |
| `201` | Build creada correctamente |
| `400` | ID, parámetro o datos de entrada no válidos |
| `401` | API Key ausente o incorrecta |
| `404` | Recurso no encontrado |

---

# 10. Relación con PokéAPI

`pokemon_id` no es una Foreign Key de MySQL.

Es el identificador externo utilizado para relacionar una build de Pokémon Trainer Hub con un Pokémon de PokéAPI.

Ejemplo:

```text
pokemon_id = 25
```

corresponde al Pokémon cuyo ID en PokéAPI es `25`.

Las Foreign Keys reales de la base de datos son:

```text
builds.item_id -> items.id
builds.role_id -> roles.id
```

De esta forma, la aplicación combina:

```text
PokéAPI
  +
API propia
  +
MySQL
```

sin duplicar localmente el catálogo de Pokémon.
