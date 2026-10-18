// Conecta las tarjetas estáticas (HTML de Astro, sin React) con el estado del carrito.
//   data-plant-open="id"      -> abre el modal de la planta
//   data-add-to-cart="id"     -> añade 1 unidad (data-name opcional para el aviso)
//   data-cart-open            -> abre el carrito
import { addToCart, openCart, openPlant } from '../store/cart';

document.addEventListener('click', (event) => {
  const target = event.target as Element | null;
  if (!target) return;

  const add = target.closest<HTMLElement>('[data-add-to-cart]');
  if (add) {
    event.preventDefault();
    event.stopPropagation();
    addToCart(add.dataset.addToCart!, 1, add.dataset.name);
    add.classList.remove('is-added');
    void add.offsetWidth; // reinicia la animación
    add.classList.add('is-added');
    return;
  }

  const open = target.closest<HTMLElement>('[data-plant-open]');
  if (open) {
    event.preventDefault();
    openPlant(open.dataset.plantOpen!);
    return;
  }

  if (target.closest('[data-cart-open]')) {
    event.preventDefault();
    openCart();
  }
});
