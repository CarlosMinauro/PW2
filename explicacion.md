# Explicación de la Conexión entre el Frontend y el Backend

Este documento detalla cómo se establece la comunicación entre la aplicación frontend (React + TypeScript) y el backend (Node.js + Express) en este proyecto.

## 1. Arquitectura de la Conexión

La comunicación entre el frontend y el backend se realiza a través de **peticiones HTTP (RESTful API)**. El frontend actúa como un cliente que envía solicitudes HTTP al backend, y el backend responde con los datos solicitados. Ambos se ejecutan en puertos diferentes de `localhost`:

- **Backend**: Corre en `http://localhost:8080`
- **Frontend**: Corre en `http://localhost:5173` (puerto predeterminado de Vite)

## 2. Configuración del Backend (API REST)

El backend está implementado con Node.js y Express, y expone los siguientes endpoints para el manejo de libros:

### `back/src/index.ts`

Este archivo es el punto de entrada del servidor Express. Aquí se configura el puerto, los middlewares y las rutas de la API.

```typescript
import express from 'express';
import cors from 'cors';
import { getAllBooks, getBooksByAuthor } from './controllers/bookController';

const app = express();
const port = process.env.PORT || 8080; // Puerto del backend

// Middleware para habilitar CORS (Cross-Origin Resource Sharing)
// Esto permite que el frontend (en un origen diferente) acceda al backend.
app.use(cors());

// Middleware para parsear el cuerpo de las peticiones JSON
app.use(express.json());

// Rutas de la API
app.get('/api/books', getAllBooks); // Endpoint para obtener todos los libros
app.get('/api/books/filter', getBooksByAuthor); // Endpoint para filtrar libros por autor

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
```

**Puntos clave:**
- **`cors()`**: Este middleware es crucial. Permite que el navegador del usuario en el frontend haga peticiones al backend a pesar de estar en dominios (o puertos) diferentes. Sin CORS, las peticiones serían bloqueadas por la política de seguridad del navegador.
- **`express.json()`**: Permite que Express parsee los cuerpos de las peticiones que vienen en formato JSON, facilitando el acceso a los datos enviados desde el frontend.
- **Rutas (`app.get`)**: Definen los caminos (endpoints) a los que el frontend puede hacer peticiones. Cada ruta está asociada a una función controladora que maneja la lógica de la petición y la respuesta.

### `back/src/controllers/bookController.ts`

Este archivo contiene las funciones controladoras que gestionan la lógica de negocio para cada endpoint.

```typescript
import { Request, Response } from 'express';
import { books } from '../data/books';

// Controlador para obtener todos los libros
export const getAllBooks = (req: Request, res: Response): void => {
  res.json(books); // Envía los datos de los libros como respuesta JSON
};

// Controlador para filtrar libros por autor
export const getBooksByAuthor = (req: Request, res: Response): void => {
  const { autor } = req.query; // Obtiene el parámetro 'autor' de la URL (query string)
  
  if (!autor) {
    res.json(books); // Si no hay autor, devuelve todos los libros
    return;
  }

  // Filtra los libros por autor (insensible a mayúsculas/minúsculas)
  const filteredBooks = books.filter(book => 
    book.autor.toLowerCase() === (autor as string).toLowerCase()
  );

  res.json(filteredBooks); // Envía los libros filtrados como respuesta JSON
};
```

**Puntos clave:**
- **`req.query`**: Se utiliza para acceder a los parámetros de la URL (query parameters), como `?autor=Arturo Perez-Reverte`.
- **`res.json()`**: Método de Express para enviar una respuesta en formato JSON al cliente (frontend).

## 3. Configuración del Frontend (Consumo de la API)

El frontend, desarrollado con React y TypeScript, utiliza la API `Fetch` para realizar peticiones HTTP al backend.

### `front/src/pages/LibrosPage.tsx`

Este componente es responsable de consumir la API del backend y manejar el estado de los libros.

```typescript
import React, { useState, useEffect } from 'react';
// ... otras importaciones ...

interface Book {
  id: number;
  nombre: string;
  anho: number;
  autor: string;
}

const API_URL = 'http://localhost:8080/api'; // URL base de la API del backend

const LibrosPage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // useEffect para cargar los libros cuando el componente se monta
  useEffect(() => {
    fetchBooks();
  }, []); // El array vacío asegura que se ejecute solo una vez al montar

  // Función para obtener todos los libros desde el backend
  const fetchBooks = async () => {
    try {
      setLoading(true); // Indicar que la carga ha comenzado
      const response = await fetch(`${API_URL}/books`); // Petición GET a /api/books
      if (!response.ok) {
        throw new Error('Error al cargar los libros');
      }
      const data = await response.json(); // Parsear la respuesta JSON
      setBooks(data); // Almacenar todos los libros
      setFilteredBooks(data); // Inicialmente, los libros filtrados son todos los libros
      setError(null); // Limpiar cualquier error previo
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false); // Indicar que la carga ha terminado
    }
  };

  // Función para manejar el cambio en el filtro por autor
  const handleFilterChange = async (author: string) => {
    // ... (lógica de estado para el autor seleccionado)
    try {
      setLoading(true); // Indicar que la carga ha comenzado
      const url = author 
        ? `${API_URL}/books/filter?autor=${encodeURIComponent(author)}` // Petición a /api/books/filter con el autor
        : `${API_URL}/books`; // Si no hay autor, vuelve a /api/books

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Error al filtrar los libros');
      }
      const data = await response.json();
      setFilteredBooks(data); // Actualizar los libros filtrados
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false); // Indicar que la carga ha terminado
    }
  };

  // ... (JSX para mostrar la UI, spinner, mensajes de error, etc.)
};

export default LibrosPage;
```

**Puntos clave:**
- **`API_URL`**: Constante que define la URL base del backend, asegurando que todas las peticiones se dirijan al servidor correcto.
- **`useEffect`**: Hook de React que se utiliza para realizar efectos secundarios en componentes funcionales. En este caso, se usa para hacer la petición inicial de los libros cuando el componente se carga.
- **`fetch()`**: API nativa del navegador para hacer peticiones HTTP. Se utiliza para enviar solicitudes GET a los endpoints del backend.
- **`response.json()`**: Método para parsear la respuesta del servidor como JSON.
- **Manejo de estados (`useState`)**: Se utilizan estados para almacenar los libros (`books`), los libros filtrados (`filteredBooks`), el estado de carga (`loading`) y los posibles errores (`error`).

## 4. Origen Cruzado (CORS)

Un aspecto fundamental en la comunicación entre un frontend y un backend que corren en dominios o puertos diferentes es el **Cross-Origin Resource Sharing (CORS)**.

Por defecto, los navegadores web implementan una política de seguridad llamada **Same-Origin Policy (SOP)**, que restringe las peticiones HTTP entre diferentes orígenes. Esto significa que un script ejecutándose en `http://localhost:5173` no puede hacer una petición a `http://localhost:8080` a menos que el servidor de `http://localhost:8080` lo permita explícitamente.

En este proyecto, el backend utiliza el middleware `cors` de Express para habilitar las peticiones de origen cruzado:

```typescript
// back/src/index.ts
app.use(cors()); // Habilita CORS para todas las rutas
```

Al usar `app.use(cors())`, el servidor backend envía las cabeceras HTTP necesarias (`Access-Control-Allow-Origin: *` por defecto, o configurado para un origen específico) para indicar al navegador del cliente que es seguro permitir la petición desde el frontend.

## 5. Resumen del Flujo de Datos

1. Cuando la `LibrosPage` del frontend se monta, `useEffect` dispara la función `fetchBooks`.
2. `fetchBooks` realiza una petición `GET` a `http://localhost:8080/api/books`.
3. El backend recibe la petición, `express.json()` y `cors()` procesan la petición.
4. La función `getAllBooks` en `bookController.ts` se ejecuta, recupera los datos de los libros y los envía como JSON.
5. El frontend recibe la respuesta, la parsea como JSON, y actualiza los estados `books` y `filteredBooks`.
6. Cuando el usuario selecciona un autor en `BookFilter`, `handleFilterChange` se dispara.
7. `handleFilterChange` realiza una petición `GET` a `http://localhost:8080/api/books/filter?autor=XYZ`.
8. El backend recibe la petición con el parámetro `autor`.
9. La función `getBooksByAuthor` filtra los libros según el autor y envía los resultados como JSON.
10. El frontend recibe los libros filtrados y actualiza el estado `filteredBooks`, lo que provoca que el `BookList` se re-renderice con los libros correctos. 