# Ferretería Wilmer · landing y catálogo

**Sitio de presentación comercial con catálogo, ofertas, servicios y contacto por WhatsApp.**

Proyecto de frontend orientado a comunicar la oferta de una ferretería. El contenido se organiza en archivos JSON y se presenta mediante tarjetas y carruseles.

## Funcionalidades

- Página principal con servicios, ofertas y trabajos destacados.
- Catálogo de productos en una página independiente.
- Consultas y solicitudes de cotización por WhatsApp.
- Imágenes optimizadas en WebP y páginas de información legal.

No incluye un backend de pedidos, cobros en línea ni un panel de administración. Es una landing comercial con catálogo.

## Desarrollo local

Requiere Node.js y npm compatibles con Vite 5.

```bash
npm ci
npm run dev
```

```bash
npm run build
npm run preview
```

## Estructura

| Ruta | Contenido |
|---|---|
| `index.html` | Página principal. |
| `catalogo.html` | Catálogo comercial. |
| `src/data/` | Productos, ofertas, servicios y portafolio en JSON. |
| `src/js/` | Renderizado, carruseles e interacción. |
| `src/styles/` | Estilos de la interfaz. |
| `Public/media/` | Imágenes del proyecto. |
| `legal/` | Páginas de privacidad y términos. |

Tecnologías: HTML, JavaScript, Tailwind CSS y Vite.

## Estado y límites

El repositorio conserva una versión del sitio y no incorpora pruebas automatizadas. Antes de desplegar, verifica enlaces, datos comerciales, rutas de imágenes y la configuración de la carpeta `Public/` en un sistema que distinga mayúsculas.

`node_modules/` está incluido en el historial del proyecto; las dependencias deben reconstruirse desde `package-lock.json`. La documentación no cambia los archivos de la aplicación ni su configuración.

**Autor:** Josué Saldaña Fustamante.
