// Estado global compartido entre islas React y scripts de Astro.
// El carrito se guarda en localStorage: no hace falta base de datos.
import { atom, computed } from 'nanostores';
import { persistentAtom } from '@nanostores/persistent';

export interface CartItem {
  id: string;
  qty: number;
}

export const MAX_QTY = 20;

export const $cart = persistentAtom<CartItem[]>('vibes-cart', [], {
  encode: JSON.stringify,
  decode: (value) => {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  },
});

export const $cartCount = computed($cart, (items) => items.reduce((sum, item) => sum + item.qty, 0));

export const $cartOpen = atom(false);
/** id de la planta que se muestra en el modal (null = cerrado) */
export const $activePlant = atom<string | null>(null);
export const $toast = atom<{ id: number; message: string } | null>(null);

const clamp = (qty: number) => Math.max(1, Math.min(MAX_QTY, Math.round(qty)));

export function addToCart(id: string, qty = 1, name?: string) {
  const items = $cart.get();
  const existing = items.find((item) => item.id === id);
  $cart.set(
    existing
      ? items.map((item) => (item.id === id ? { ...item, qty: clamp(item.qty + qty) } : item))
      : [...items, { id, qty: clamp(qty) }],
  );
  showToast(name ? `${name} added to your cart` : 'Added to your cart');
}

export function setQty(id: string, qty: number) {
  if (qty <= 0) return removeFromCart(id);
  $cart.set($cart.get().map((item) => (item.id === id ? { ...item, qty: clamp(qty) } : item)));
}

export function removeFromCart(id: string) {
  $cart.set($cart.get().filter((item) => item.id !== id));
}

export function clearCart() {
  $cart.set([]);
}

export const openCart = () => {
  $activePlant.set(null);
  $cartOpen.set(true);
};
export const closeCart = () => $cartOpen.set(false);
export const openPlant = (id: string) => $activePlant.set(id);
export const closePlant = () => $activePlant.set(null);

export function showToast(message: string) {
  $toast.set({ id: Date.now(), message });
}
