# Vibes — catálogo de plantas

Template de tienda/catálogo de plantas hecho con **Astro 6 + React 19**. No usa base de datos:
el catálogo vive en archivos de datos y el carrito se guarda en el `localStorage` del navegador.
El pedido se envía por **WhatsApp** con el resumen del carrito.

## Scripts

| Comando           | Acción                                   |
| ----------------- | ---------------------------------------- |
| `npm install`     | Instala dependencias (Node ≥ 22.12)      |
| `npm run dev`     | Servidor local en `localhost:4321`       |
| `npm run build`   | Genera el sitio estático en `./dist/`    |
| `npm run preview` | Sirve el build localmente                |
| `npm run check`   | Revisión de tipos                         |

## Dónde editar el contenido

- `src/data/plants.ts` — plantas del catálogo (nombre, precio, imagen, cuidados, etiquetas).
- `src/data/site.ts` — servicios, blog, testimonios, tiendas (con coordenadas del mapa) y redes sociales.
- `src/data/config.ts` — nombre de la tienda, email, teléfono, **número de WhatsApp**, moneda y envío gratis.
- `src/img/` — imágenes originales; Astro las optimiza a WebP al compilar.

## Estructura

- `src/components/*.astro` — secciones de la página (HTML estático, sin JS).
- `src/components/react/` — islas interactivas: modal de planta, carrito lateral, aviso, carrusel y botón del carrito.
- `src/store/cart.ts` — estado global (nanostores) compartido entre React y los scripts.
- `src/scripts/` — animaciones al hacer scroll y acciones de las tarjetas (`data-plant-open`, `data-add-to-cart`).
