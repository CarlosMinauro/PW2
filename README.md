# Proyecto de Catálogo de Libros

Este proyecto consiste en una aplicación web para mostrar y filtrar un catálogo de libros, implementada con React + TypeScript en el frontend y Node.js en el backend.

## Comandos Ejecutados

### 1. Creación de la Estructura del Proyecto
```bash
# Creación de carpetas principales
mkdir front back
```

### 2. Configuración del Frontend
```bash
# Inicialización del proyecto React con Vite
cd front
npm create vite@latest . -- --template react-ts

# Instalación de dependencias
npm install

# Instalación de Bootstrap
npm install bootstrap
```

### 3. Configuración del Backend
```bash
# Inicialización del proyecto Node.js
cd ../back
npm init -y

# Instalación de dependencias del backend
npm install express cors typescript ts-node @types/node @types/express @types/cors
```

## Cambios Realizados

### Frontend

1. **Estructura de Carpetas**
   - Creación de `src/components/` para componentes reutilizables
   - Creación de `src/pages/` para las páginas principales

2. **Componentes Creados**
   - `BookList.tsx`: Componente para mostrar la lista de libros
   - `BookFilter.tsx`: Componente para filtrar libros por autor
   - `LibrosPage.tsx`: Página principal que integra los componentes

3. **Modificaciones en Archivos Existentes**
   - `App.tsx`: Simplificado para mostrar solo LibrosPage
   - `main.tsx`: Agregada importación de Bootstrap CSS

### Backend

1. **Estructura de Carpetas**
   - Creación de `src/` para el código fuente
   - Creación de `src/types/` para definiciones de tipos
   - Creación de `src/controllers/` para controladores
   - Creación de `src/data/` para datos mockeados

2. **Archivos Creados**
   - `types/book.ts`: Interfaz para el tipo Book
   - `data/books.ts`: Datos mockeados de libros
   - `controllers/bookController.ts`: Controlador para endpoints de libros
   - `index.ts`: Archivo principal del servidor

3. **Configuración**
   - `tsconfig.json`: Configuración de TypeScript
   - `package.json`: Scripts y dependencias

4. **Correcciones de TypeScript**
   - Se corrigió el error de tipos en el controlador de libros
   - Se agregaron tipos de retorno explícitos (`: void`) a las funciones del controlador
   - Se modificó la estructura de retorno en `getBooksByAuthor` para evitar retornos implícitos
   - Se aseguró la consistencia en las respuestas HTTP

## Dependencias Instaladas

### Frontend
- react: ^18.2.0
- react-dom: ^18.2.0
- typescript: ^5.0.0
- bootstrap: ^5.3.0
- vite: ^4.0.0

### Backend
- express: ^4.18.2
- cors: ^2.8.5
- typescript: ^5.1.3
- ts-node: ^10.9.1
- @types/express: ^4.17.17
- @types/cors: ^2.8.13
- @types/node: ^20.3.1

## Estructura del Proyecto
```
PWejer2/
├── front/               # Frontend React + TypeScript
│   ├── src/
│   │   ├── components/ # Componentes React
│   │   │   ├── BookList.tsx    # Componente para mostrar la lista de libros
│   │   │   └── BookFilter.tsx  # Componente para filtrar libros por autor
│   │   ├── pages/
│   │   │   └── LibrosPage.tsx  # Página principal que integra los componentes
│   │   ├── App.tsx     # Componente principal de la aplicación
│   │   └── main.tsx    # Punto de entrada de la aplicación
│   └── package.json    # Dependencias del frontend
└── back/               # Backend Node.js
    ├── src/
    │   ├── types/     # Definiciones de tipos
    │   ├── controllers/ # Controladores
    │   ├── data/      # Datos mockeados
    │   └── index.ts   # Punto de entrada del servidor
    ├── package.json   # Dependencias del backend
    └── tsconfig.json  # Configuración de TypeScript
```

## Características Implementadas

### Frontend
1. **Diseño y UI**
   - Implementación de diseño responsivo con Bootstrap
   - Sistema de grid para la disposición de libros
   - Componentes de formulario estilizados
   - Mensajes de estado para usuario

2. **Funcionalidad**
   - Filtrado de libros por autor
   - Estado local con React Hooks
   - Tipado fuerte con TypeScript
   - Integración con el backend

3. **Componentes**
   - BookList: Muestra libros en formato de tarjetas
   - BookFilter: Selector de autores con Bootstrap
   - LibrosPage: Integración de componentes y lógica

### Backend
1. **API Endpoints**
   - GET `/api/books`: Obtiene todos los libros
   - GET `/api/books/filter`: Filtra libros por autor

2. **Características**
   - Servidor Express con TypeScript
   - CORS habilitado para desarrollo
   - Manejo de errores
   - Datos mockeados
   - Puerto personalizado (8080)

## Instalación y Ejecución

### Frontend
```bash
cd front
npm install
npm run dev
```

### Backend
```bash
cd back
npm install
npm run dev
```

## Notas de Desarrollo
- Se utilizó Bootstrap para el diseño en lugar de Tailwind CSS
- La aplicación está completamente integrada con el backend
- Se implementó un diseño modular y reutilizable
- Se utilizaron interfaces TypeScript para el tipado de datos
- El backend está configurado para desarrollo con hot-reload
- Se utiliza el puerto 8080 para el backend para evitar conflictos con otros servicios
- Se corrigieron problemas de tipado en el controlador para asegurar la consistencia de las respuestas HTTP 