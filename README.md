# Evaluation System

# React + Vite

## Configuración y Ejecución del Proyecto

### Prerrequisitos

- Node.js (versión >=20)

### Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/miguelortis/evaluation_system-api.git
   ```
2. Navega al directorio del proyecto:
   ```bash
   cd evaluation-system/es-app
   ```
3. Instala las dependencias:
   ```bash
   npm install
   ```
   o si prefieres usar yarn:
   ```bash
   yarn install
   ```

### Ejecución

Para ejecutar el proyecto en modo desarrollo:

```bash
npm run dev
```

o con yarn:

```bash
yarn dev
```

Para construir el proyecto para producción:

```bash
npm run build
```

o con yarn:

```bash
yarn build
```

## Estructura del Proyecto

```
evaluation-system/
│
├── es-app/
    ├── src/
    │   ├── assets/           # Recursos estáticos como imágenes, íconos y archivos multimedia que se utilizan en la aplicación.
    │   ├── components/       # Componentes reutilizables de la aplicación, como botones, formularios y otros elementos de UI.
    │   ├── hooks/            # Hooks personalizados de React que encapsulan la lógica reutilizable para compartirla entre componentes.
    │   ├── layouts/          # Estructuras de diseño que definen la disposición general de la aplicación, como encabezados, pies de página y barras laterales.
    │   ├── redux/            # Archivos relacionados con el estado global de la aplicación gestionado con Redux, como acciones, reducers y store.
    │   ├── routes/           # Definiciones de rutas de la aplicación utilizando React Router u otro sistema de enrutamiento.
    │   ├── styles/           # Archivos de estilos CSS, SASS o LESS que dan estilo a la aplicación.
    │   ├── views/            # Páginas principales de la aplicación que representan diferentes vistas o pantallas.
    │   ├── utils/            # Utilidades y funciones auxiliares que se utilizan en toda la aplicación para realizar tareas comunes.
    │   ├── App.js            # Componente principal de la aplicación que contiene la configuración general y el enrutamiento.
    │   ├── main.js           # Punto de entrada de la aplicación que inicializa y renderiza el componente principal.
    └── public/               # Archivos estáticos públicos que se sirven directamente, como favicon, manifest y otros recursos públicos.
    └── index.html/           # Archivo HTML principal que sirve como contenedor de la aplicación de React.
    └── package.json          # Archivo de configuración del proyecto que incluye dependencias, scripts y metadata del proyecto.
    └── README.md             # Documentación del proyecto que describe su propósito, instalación y uso.
```

## Decisiones de Diseño

- **Componentes Reutilizables**: Los componentes se organizan en la carpeta `components` para promover la reutilización y facilitar el mantenimiento.
- **Páginas**: Las páginas principales de la aplicación se encuentran en la carpeta `views`, lo que permite una navegación clara y una estructura modular.
- **Utilidades**: Funciones auxiliares y utilidades se colocan en la carpeta `utils` para mantener el código organizado y accesible.
