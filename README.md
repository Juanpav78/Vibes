# 🌿 Vibes — catálogo de plantas

> Tienda de plantas con carrito y pedidos por WhatsApp, hecha con Astro y React en islas para que cargue rápido y casi sin JavaScript.

![Astro](https://img.shields.io/badge/Astro-BC52EE?style=flat&logo=astro&logoColor=white)
![React](https://img.shields.io/badge/React_19-20232A?style=flat&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=flat&logo=netlify&logoColor=white)

🔗 **Demo:** [vibesplants.netlify.app](https://vibesplants.netlify.app/)

![Vibes — vista de escritorio](https://res.cloudinary.com/degdhu5ep/image/upload/w_1400,q_auto,f_auto/v1792376011/images/q0gygydl1mjtrqfktgz0.png)

<details>
<summary>📸 Más capturas</summary>

![Vibes — captura 1](https://res.cloudinary.com/degdhu5ep/image/upload/w_1400,q_auto,f_auto/v1792376011/images/e57migmqqq7mapnadfgb.png)
![Vibes — captura 2](https://res.cloudinary.com/degdhu5ep/image/upload/w_1400,q_auto,f_auto/v1792376011/images/efrfrg6upgk6a858kekh.png)
![Vibes — captura 3](https://res.cloudinary.com/degdhu5ep/image/upload/w_1400,q_auto,f_auto/v1792376011/images/extnirfgrivyvoms4zsj.png)

<p align="center"><img src="https://res.cloudinary.com/degdhu5ep/image/upload/w_400,q_auto,f_auto/v1793914557/images/wzaudu7bkgtscdj29o0c.jpg" alt="Vibes — vista móvil" width="300"></p>

</details>

**Lo que demuestra este proyecto:** arquitectura de islas (HTML estático y React solo donde hay interacción), estado compartido con nanostores y persistido en el navegador, imágenes optimizadas a WebP en el build, animaciones al hacer scroll y pedidos por WhatsApp sin backend.

## ✨ Funcionalidades

- Catálogo con modal de detalle y cuidados de cada planta
- Carrito lateral que se mantiene al recargar
- Pedido enviado por WhatsApp con el resumen del carrito
- Páginas de inicio, catálogo, nosotros, blog y tiendas con mapa

## 📖 Detalles

Template de tienda/catálogo de plantas hecho con **Astro 7 + React 19**. No usa base de datos:
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

---

Hecho por **Juan Pablo Alvarado** · [Portafolio](https://juanpalvaradov.com) · [LinkedIn](https://www.linkedin.com/in/juanpavpandax/) · [GitHub](https://github.com/Juanpav78)
