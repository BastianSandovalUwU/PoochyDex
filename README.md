# 🎮 PoochyDex

<div align="center">
  <img src="src/assets/icons/rotom-dex/RotomDex.png" alt="PoochyDex Logo" width="120" height="120">
  
  **Una Pokédex moderna y completa construida con Angular que integra la PokéAPI**
  
  [![Angular](https://img.shields.io/badge/Angular-17.3.12-red.svg)](https://angular.io/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.4.5-blue.svg)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.3-38B2AC.svg)](https://tailwindcss.com/)
  [![Capacitor](https://img.shields.io/badge/Capacitor-7.0.1-119EFF.svg)](https://capacitorjs.com/)
</div>

## 📖 Descripción

PoochyDex es una aplicación web moderna y responsive que funciona como una Pokédex digital completa. La aplicación integra la [PokéAPI](https://pokeapi.co/) para proporcionar información detallada sobre más de 1,300 Pokémon, incluyendo estadísticas, movimientos, evoluciones, localizaciones y mucho más.

### 🌟 Características Principales

- **🔍 Pokédex Nacional Completa**: Explora todos los Pokémon desde la primera hasta la novena generación
- **📱 Diseño Responsive**: Optimizado para dispositivos móviles, tablets y desktop
- **🌐 Multiidioma**: Soporte para español e inglés
- **⚡ Caché Inteligente**: Sistema de caché local para mejorar el rendimiento
- **🎮 Información de Juegos**: Detalles sobre los juegos de Pokémon y sus versiones
- **👤 Sistema de Autenticación**: Registro e inicio de sesión de usuarios
- **📊 Estadísticas Detalladas**: Información completa sobre stats, tipos, habilidades y movimientos
- **🔄 Cadenas Evolutivas**: Visualización de las evoluciones de cada Pokémon
- **📍 Localizaciones**: Información sobre dónde encontrar cada Pokémon en los juegos
- **🎵 Sonidos**: Reproducción de los gritos de los Pokémon
- **🌙 Modo Oscuro**: Interfaz adaptable con tema claro y oscuro

## 🚀 Tecnologías Utilizadas

### Frontend
- **Angular 17.3.12** - Framework principal
- **TypeScript 5.4.5** - Lenguaje de programación
- **Tailwind CSS 3.4.3** - Framework de CSS
- **Angular Material 16.2.14** - Componentes de UI
- **RxJS 7.4.0** - Programación reactiva

### Backend & Servicios
- **Firebase 10.12.2** - Autenticación y base de datos
- **PokéAPI** - API externa para datos de Pokémon
- **Node.js API** - API personalizada (desplegada en Vercel)

### Mobile & PWA
- **Capacitor 7.0.1** - Desarrollo de aplicaciones móviles
- **Angular Service Worker** - Funcionalidad PWA

## 📦 Instalación

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm o yarn
- Angular CLI

### Pasos de Instalación

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/BastianSandovalUwU/PoochyDex.git
   cd PoochyDex
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   ```

3. **Configura las variables de entorno**
   
   Edita `src/environments/environment.ts` con tus configuraciones:
   ```typescript
   export const environment = {
     production: false,
     nodeJsApi: "tu-api-url",
   };
   ```

4. **Inicia el servidor de desarrollo**
   ```bash
   npm start
   # o
   ng serve
   ```

5. **Abre tu navegador**
   
   Navega a `http://localhost:4200/`

## 🛠️ Scripts Disponibles

```bash
# Servidor de desarrollo
npm start

# Construcción para producción
npm run build

# Construcción en modo watch
npm run watch

# Ejecutar tests
npm test

# Construir Tailwind CSS
npm run build:tailwind
```

## 📱 Desarrollo Móvil

Para desarrollar la aplicación móvil:

```bash
# Instalar Capacitor
npm install @capacitor/cli @capacitor/core

# Añadir plataformas
npx cap add android
npx cap add ios

# Sincronizar
npx cap sync

# Abrir en Android Studio
npx cap open android

# Abrir en Xcode
npx cap open ios
```

## 🏗️ Estructura del Proyecto

```
src/
├── app/
│   ├── modules/
│   │   ├── auth/           # Autenticación de usuarios
│   │   ├── game/           # Información de juegos
│   │   ├── movements/      # Movimientos de Pokémon
│   │   ├── pokedex/        # Módulo principal de Pokédex
│   │   ├── poochyDexApi/   # API personalizada
│   │   ├── profile/        # Perfil de usuario y configuración (/profile/settings)
│   │   └── shared/         # Componentes compartidos
│   ├── services/           # Servicios globales
│   └── app.component.*     # Componente raíz
├── assets/                 # Recursos estáticos
├── environments/           # Configuraciones de entorno
└── styles/                # Estilos globales
```

## 🔧 Características Técnicas

### Sistema de Caché
- Caché local inteligente para Pokémon y movimientos
- Límite de 2000 entradas para optimizar el rendimiento
- Limpieza automática de caché antiguo

### Optimizaciones
- Lazy loading de módulos
- Service Worker para funcionalidad offline
- Compresión de imágenes y assets
- Tree shaking para reducir el bundle size

### API Integration
- Integración completa con PokéAPI
- Manejo de errores robusto
- Retry automático en fallos de red
- Placeholder data para movimientos no encontrados

## 🎨 Personalización

### Temas
La aplicación soporta temas claro y oscuro. Los estilos se pueden personalizar en:
- `src/styles/styles.scss` - Estilos globales
- `src/styles/tailwind.scss` - Configuración de Tailwind
- `tailwind.config.js` - Configuración de Tailwind CSS

### Idiomas
Para añadir nuevos idiomas:
1. Actualiza el servicio `LanguageService`
2. Añade las traducciones correspondientes
3. Actualiza los pipes de traducción

## 🚀 Despliegue

### Web
```bash
# Construcción para producción
npm run build

# Los archivos se generan en dist/poochydex/
```

### Vercel
```bash
# Instalar Vercel CLI
npm install -g vercel

# Desplegar
vercel --prod
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🙏 Agradecimientos

- [PokéAPI](https://pokeapi.co/) - Por proporcionar la API gratuita de Pokémon
- [Angular Team](https://angular.io/) - Por el excelente framework
- [Tailwind CSS](https://tailwindcss.com/) - Por el sistema de diseño

## 📞 Contacto

**Desarrollador**: Bastian Sandoval
- GitHub: [@BastianSandovalUwU](https://github.com/BastianSandovalUwU)
- Email: bastiansandoval.informatico@gmail.com

---

<div align="center">
  <p>Hecho con ❤️ para la comunidad Pokémon</p>
  <p>⭐ ¡No olvides darle una estrella al proyecto si te gusta!</p>
</div>
