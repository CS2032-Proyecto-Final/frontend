
# Bibliokuna

Bibliokuna es una aplicación web desarrollada con React y Vite que permite a los usuarios gestionar y explorar una colección de libros de manera eficiente.

## Características

- **Interfaz Intuitiva**: Diseño limpio y fácil de usar para una mejor experiencia del usuario.
- **Gestión de Libros**: Permite agregar, editar y eliminar libros de la colección.
- **Búsqueda Avanzada**: Funcionalidad de búsqueda para encontrar libros rápidamente.
- **Integración con API**: Conexión con servicios externos para obtener información actualizada sobre libros.

## Tecnologías Utilizadas

- **React**: Biblioteca de JavaScript para construir interfaces de usuario.
- **Vite**: Herramienta de desarrollo que ofrece un entorno de desarrollo rápido y moderno.
- **ESLint**: Herramienta de análisis estático para identificar y corregir problemas en el código JavaScript.
- **Tailwind CSS**: Framework de CSS para un diseño rápido y responsivo.

## Requisitos Previos

- **Node.js**: Versión 14 o superior.
- **npm**: Versión 6 o superior.

## Instalación

1. **Clonar el repositorio**:

   ```bash
   git clone https://github.com/CS2032-Proyecto-Final/frontend.git
   ```

2. **Navegar al directorio del proyecto**:

   ```bash
   cd frontend
   ```

3. **Instalar las dependencias**:

   ```bash
   npm install
   ```

## Configuración

1. **Variables de Entorno**: Crear un archivo `.env` en la raíz del proyecto y definir las siguientes variables:

   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

   Ajustar `REACT_APP_API_URL` según la URL de la API backend.

## Uso

- **Iniciar el servidor de desarrollo**:

  ```bash
  npm run dev
  ```

  La aplicación estará disponible en `http://localhost:3000`.

- **Construir para producción**:

  ```bash
  npm run build
  ```

  Los archivos listos para producción se generarán en el directorio `dist`.

## Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo.
- `npm run build`: Construye la aplicación para producción.
- `npm run lint`: Ejecuta ESLint para analizar el código.
- `npm run lint:fix`: Ejecuta ESLint y corrige problemas automáticamente.

## Estructura del Proyecto

```plaintext
frontend/
├── public/
│   ├── images/
│   └── index.html
├── src/
│   ├── components/
│   ├── pages/
│   ├── App.jsx
│   └── main.jsx
├── .gitignore
├── .eslintrc.cjs
├── package.json
├── tailwind.config.js
└── vite.config.js
```

- **public/**: Archivos estáticos.
- **src/**: Código fuente de la aplicación.
  - **components/**: Componentes reutilizables.
  - **pages/**: Páginas de la aplicación.
  - **App.jsx**: Componente principal.
  - **main.jsx**: Punto de entrada de la aplicación.
- **.eslintrc.cjs**: Configuración de ESLint.
- **tailwind.config.js**: Configuración de Tailwind CSS.
- **vite.config.js**: Configuración de Vite.

## Contribuciones

Las contribuciones son bienvenidas. Por favor, sigue estos pasos:

1. **Fork** el repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -m 'Agregar nueva funcionalidad'`).
4. Sube tus cambios (`git push origin feature/nueva-funcionalidad`).
5. Abre un **Pull Request**.

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.

## Contacto

Para más información, visita el [repositorio del proyecto](https://github.com/CS2032-Proyecto-Final/frontend).
