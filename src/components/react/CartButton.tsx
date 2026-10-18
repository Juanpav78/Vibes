import { useEffect, useState } from 'react';
import { useStore } from '@nanostores/react';
import { ShoppingBag } from 'lucide-react';
import { $cartCount, openCart } from '../../store/cart';

export default function CartButton() {
  const count = useStore($cartCount);
  // El carrito vive en localStorage: evitamos diferencias con el HTML del servidor
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const shown = mounted ? count : 0;

  return (
    <button className="cart-btn" onClick={openCart} aria-label={`Open cart (${shown} items)`}>
      <ShoppingBag size={24} aria-hidden="true" />
      {shown > 0 && (
        <span key={shown} className="cart-btn__badge">
          {shown > 99 ? '99+' : shown}
        </span>
      )}
    </button>
  );
}
