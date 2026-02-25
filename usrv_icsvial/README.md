# usrv_icsvial

Backend Node.js con Express y arquitectura SQL desacoplada (vía Sequelize) para manejar CRUD de:

- servicio
- cliente
- blog (contenido en texto con soporte para Markdown)

## Requisitos

- Node.js 20+
- Motor SQL compatible (SQLite/PostgreSQL/MySQL/MariaDB)

## Variables de entorno

Si existe `.env`, se utiliza automáticamente. Si no existe, se toman desde variables de entorno del sistema.

Variable principal:

- `DB_URL` (define motor SQL, host, puerto, base y credenciales)

Si `DB_URL` no existe o está vacío, se utiliza automáticamente:

- `sqlite:./data/icsvial.sqlite`

Ejemplos:

- SQLite (recomendado para inicio): `sqlite:./data/icsvial.sqlite`

- PostgreSQL: `postgres://user:pass@localhost:5432/icsvial`
- MySQL: `mysql://user:pass@localhost:3306/icsvial`

Puedes usar `.env.example` como base.

## Instalación

```bash
npm install
```

## Levantar servidor

```bash
npm start
```

`npm start` ejecuta internamente `npm run db:init` antes de iniciar el servidor, por lo que crea/actualiza tablas automáticamente con `sequelize.sync()`.

## Inicializar tablas manualmente (opcional)

```bash
npm run db:init
```

## Seed de datos

```bash
npm run db:seed
```

Este comando inserta datos base de servicios, blogs y clientes.

## Limpieza total de base de datos

```bash
npm run db:clear
```

Este comando elimina todos los registros de `services`, `blogs` y `clients`.

Base URL: `http://localhost:3000/api`

## Imágenes desde carpeta public

- El backend expone archivos estáticos desde `http://localhost:3000/public/*`.
- Guarda en el campo `imagen` una ruta relativa, por ejemplo:
  - `/public/servicios/servicio.png`
  - `/public/clientes/cliente.png`
  - `/public/blog/blog.png`
- Ubica los archivos físicos dentro de la carpeta `public/` del proyecto.

## Endpoints

### Servicio
- `GET /api/servicios`
- `GET /api/servicios/:id`
- `POST /api/servicios`
- `PUT /api/servicios/:id`
- `DELETE /api/servicios/:id`

### Cliente
- `GET /api/clientes`
- `GET /api/clientes/:id`
- `POST /api/clientes`
- `PUT /api/clientes/:id`
- `DELETE /api/clientes/:id`

### Blog
- `GET /api/blogs`
- `GET /api/blogs/:id`
- `POST /api/blogs`
- `PUT /api/blogs/:id`
- `DELETE /api/blogs/:id`

### Administración DB
- `DELETE /api/db/clear`
- `DELETE /api/db/clear/:tableName` (`services|blogs|clients` y alias en español)

Respuestas esperadas:

- `DELETE /api/db/clear` devuelve un resumen de registros eliminados por tabla.
- `DELETE /api/db/clear/:tableName` devuelve la tabla afectada y el total eliminado.

El seed se ejecuta únicamente por comando:

- `npm run db:seed`
- `npm run db:clear`

## Postman

- Colección: `postman/usrv_icsvial.postman_collection.json`
- Environment local: `postman/usrv_icsvial.local.postman_environment.json`

La colección incluye CRUD de `servicios`, `clientes`, `blogs` y endpoints de administración DB.
