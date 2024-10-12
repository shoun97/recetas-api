# Recetas API

Este proyecto es una API RESTful simple construida con [Koa.js](https://koajs.com/) y [Mongoose](https://mongoosejs.com/) para la gestión de recetas.

## Requisitos

- Node.js v16 o superior
- MongoDB (local o en la nube)

## Instalación

1. Clona este repositorio:

   ```bash
   git clone https://github.com/usuario/recetas-api.git
   cd recetas-api
   ```

2. Instala las dependencias del proyecto:

   ```bash
    npm install

   ```

3. Crea un archivo .env en la raíz del proyecto con la configuración de tu base de datos MongoDB:

   ```bash
   MONGO_URI=mongodb://localhost:27017/recetasdb
   PORT=3000


   ```

4. Si usas TypeScript, puedes compilarlo manualmente usando:
   ```bash
   npx tsc
   ```
5. Para ejecutar el servidor en modo desarrollo con TypeScript, puedes usar ts-node:

   ```bash
   npx ts-node src/index.ts

   ```

6. El servidor estará disponible en:
   ```bash
   http://localhost:3000
   ```

## Ejemplo de reeta

```json
{
  "nombre": "Tarta de manzana",
  "descripcion": "Una tarta deliciosa y fácil de hacer.",
  "imagenUrl": "http://imagen.com/tarta.jpg",
  "ingredientes": ["Manzanas", "Harina", "Azúcar"],
  "instrucciones": "1. Precalentar el horno. 2. Mezclar los ingredientes...",
  "tiempoPreparacion": 45,
  "dificultad": "Media",
  "participante": "Chef Juan"
}
```

## Scripts

npm run build: Compila el proyecto TypeScript a JavaScript.
npm start: Inicia el servidor en modo producción.
npx ts-node src/index.ts: Inicia el servidor en modo desarrollo.

## Estructura del proyecto

```plaintext
├── src
│   ├── index.ts        # Archivo principal del servidor
│   ├── routes.ts       # Definición de rutas de la API
│   └── models
│       └── receta.ts   # Definición del modelo de Receta en Mongoose
├── .env                # Archivo de configuración de entorno (no incluido en el repositorio)
├── package.json        # Configuración de npm
├── tsconfig.json       # Configuración de TypeScript
└── README.md           # Documentación del proyecto

```


# recetas-api
