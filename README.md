# The Man-Tenimiento — Sitio web

Rediseño completo del sitio de **The Man-Tenimiento** (Vite + React + TypeScript + Tailwind CSS v4 + Motion + Lucide).

## Arranque rápido

```bash
npm install
npm run dev       # desarrollo en http://localhost:5173
npm run build     # compila a /dist (listo para Vercel, Netlify, Hostinger, etc.)
npm run preview   # sirve la versión compilada
```

## Dónde editar

| Qué | Archivo |
| --- | --- |
| Textos, servicios, testimonios, teléfono, correo, redes, fotos | `src/data/site.ts` |
| Colores y tipografías (design tokens) | `src/index.css` (bloque `@theme`) |
| Secciones | `src/components/*` |

### Fotografías
Por ahora se usan fotos de Unsplash (licencia libre) servidas desde su CDN. **Recomendado:** reemplazarlas con fotos reales de la empresa:
1. Copia las fotos a `public/img/`.
2. En `src/data/site.ts` cambia, por ejemplo, `img: unsplash('photo-…')` por `img: '/img/pintura.jpg'`.

### Galería de proyectos
La sección **Proyectos** (`projects` en `src/data/site.ts`) tiene ejemplos ilustrativos por tipo de trabajo. Sustitúyelos por proyectos reales (foto, categoría, título, descripción) antes de publicar.

## Sistema visual

- **Ink** `#121211`: carbón casi negro, para superficies principales
- **Bone** `#F4F1EA`: blanco cálido, para fondos editoriales
- **Signal** `#FF5B14`: naranja de seguridad, solo para acciones y énfasis
- **Archivo** (variable, ancho expandido) en titulares · **Inter** en texto
- El guion de “Man-Tenimiento” se convierte en la barra naranja de la marca.

## Funcionalidad

- Navegación transparente sobre el hero → sólida al hacer scroll; se oculta al bajar y reaparece al subir; menú móvil a pantalla completa.
- Servicios: índice editorial con imagen fija que cambia al pasar el cursor (escritorio) / acordeón con foto (móvil).
- Botones “Cotizar …” preseleccionan el servicio en el formulario.
- El formulario de cotización arma el mensaje y abre **WhatsApp** (+52 221 229 0462) con la solicitud lista. No requiere backend.
- Selector de frecuencia en Pólizas, testimonios con navegación y botón flotante de WhatsApp.
- Respeta `prefers-reduced-motion`, enlaces de salto, foco visible y contraste AA.

> Three.js / React Three Fiber no se incluyó a propósito: el brief pide animaciones sutiles y sin elementos innecesarios. El 3D añadiría ~600 KB sin aportar a la conversión.
