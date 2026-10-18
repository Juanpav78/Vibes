import { useEffect, useMemo, useState } from 'react';
import { useStore } from '@nanostores/react';
import {
  ChevronLeft, ChevronRight, Droplets, Minus, Plus, Ruler, ShoppingBag, Sun, Trash2, X, Check, Send,
} from 'lucide-react';
import {
  $activePlant, $cart, $cartOpen, $toast, MAX_QTY,
  addToCart, clearCart, closeCart, closePlant, openCart, openPlant, removeFromCart, setQty,
} from '../../store/cart';
import { formatPrice, site } from '../../data/config';
import type { ClientPlant } from '../../lib/clientPlants';
import { useAnimatedDialog } from './useAnimatedDialog';
import './overlays.css';

interface Props {
  plants: ClientPlant[];
}

export default function ShopOverlays({ plants }: Props) {
  return (
    <>
      <PlantModal plants={plants} />
      <CartDrawer plants={plants} />
      <Toast />
    </>
  );
}

/* ---------------------------------- Modal --------------------------------- */

function PlantModal({ plants }: Props) {
  const activeId = useStore($activePlant);
  const index = plants.findIndex((p) => p.id === activeId);
  // Conservamos la última planta mientras se anima el cierre
  const [shown, setShown] = useState<ClientPlant | null>(null);
  const [qty, setQtyLocal] = useState(1);
  const [added, setAdded] = useState(false);
  const { ref, closing } = useAnimatedDialog(index !== -1, closePlant);

  useEffect(() => {
    if (index === -1) return;
    setShown(plants[index]);
    setQtyLocal(1);
    setAdded(false);
  }, [index, plants]);

  const step = (dir: 1 | -1) => openPlant(plants[(index + dir + plants.length) % plants.length].id);

  useEffect(() => {
    if (index === -1) return;
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement)?.tagName === 'INPUT') return;
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const handleAdd = () => {
    if (!shown) return;
    addToCart(shown.id, qty, shown.name);
    setAdded(true);
  };

  return (
    <dialog ref={ref} className={`vb-dialog vb-modal ${closing ? 'is-closing' : ''}`} aria-labelledby="vb-modal-title">
      {shown && (
        <div className="vb-modal__panel" key={shown.id}>
          <button className="vb-icon-btn vb-modal__close" onClick={closePlant} aria-label="Close">
            <X size={22} />
          </button>

          <div className="vb-modal__media">
            <img src={shown.image} alt={shown.name} width={720} height={720} />
            <div className="vb-modal__nav">
              <button className="vb-icon-btn" onClick={() => step(-1)} aria-label="Previous plant">
                <ChevronLeft size={22} />
              </button>
              <span>
                {index + 1} / {plants.length}
              </span>
              <button className="vb-icon-btn" onClick={() => step(1)} aria-label="Next plant">
                <ChevronRight size={22} />
              </button>
            </div>
          </div>

          <div className="vb-modal__info">
            <p className="vb-modal__latin">{shown.latin}</p>
            <h2 id="vb-modal-title" className="vb-modal__title">
              {shown.name}
            </h2>
            <p className="vb-modal__price">{formatPrice(shown.price)}</p>

            <ul className="vb-tags">
              {shown.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>

            <p className="vb-modal__desc">{shown.description}</p>

            <dl className="vb-care">
              <div>
                <dt><Sun size={18} /> Light</dt>
                <dd>{shown.light}</dd>
              </div>
              <div>
                <dt><Droplets size={18} /> Water</dt>
                <dd>{shown.water}</dd>
              </div>
              <div>
                <dt><Ruler size={18} /> Size</dt>
                <dd>{shown.size}</dd>
              </div>
            </dl>

            <div className="vb-modal__actions">
              <Stepper value={qty} onChange={(v) => setQtyLocal(Math.max(1, Math.min(MAX_QTY, v)))} label={shown.name} />
              <button className={`vb-btn vb-btn--fill ${added ? 'is-done' : ''}`} onClick={handleAdd}>
                {added ? <Check size={20} /> : <ShoppingBag size={20} />}
                {added ? 'Added!' : `Add to cart · ${formatPrice(shown.price * qty)}`}
              </button>
            </div>
            {added && (
              <button className="vb-link vb-fade-in" onClick={openCart}>
                View cart and checkout →
              </button>
            )}
          </div>
        </div>
      )}
    </dialog>
  );
}

/* ---------------------------------- Cart ---------------------------------- */

function CartDrawer({ plants }: Props) {
  const open = useStore($cartOpen);
  const items = useStore($cart);
  const { ref, closing } = useAnimatedDialog(open, closeCart);

  const lines = useMemo(
    () =>
      items
        .map((item) => ({ ...item, plant: plants.find((p) => p.id === item.id) }))
        .filter((line): line is typeof line & { plant: ClientPlant } => Boolean(line.plant)),
    [items, plants],
  );

  const subtotal = lines.reduce((sum, l) => sum + l.plant.price * l.qty, 0);
  const freeShipping = subtotal >= site.freeShippingFrom;
  const shipping = subtotal === 0 || freeShipping ? 0 : site.shippingCost;
  const total = subtotal + shipping;
  const progress = Math.min(100, (subtotal / site.freeShippingFrom) * 100);

  const whatsappUrl = useMemo(() => {
    const text = [
      `Hi ${site.name}! I'd like to order:`,
      ...lines.map((l) => `• ${l.qty} x ${l.plant.name} — ${formatPrice(l.plant.price * l.qty)}`),
      `Shipping: ${shipping ? formatPrice(shipping) : 'Free'}`,
      `Total: ${formatPrice(total)}`,
    ].join('\n');
    return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
  }, [lines, shipping, total]);

  return (
    <dialog ref={ref} className={`vb-dialog vb-drawer ${closing ? 'is-closing' : ''}`} aria-labelledby="vb-cart-title">
      <div className="vb-drawer__panel">
        <header className="vb-drawer__head">
          <h2 id="vb-cart-title">Your cart</h2>
          <button className="vb-icon-btn" onClick={closeCart} aria-label="Close cart">
            <X size={22} />
          </button>
        </header>

        {lines.length === 0 ? (
          <div className="vb-empty">
            <ShoppingBag size={56} strokeWidth={1.2} />
            <p>Your cart is empty.</p>
            <a className="vb-btn vb-btn--fill" href="/catalog" onClick={closeCart}>
              Explore the catalog
            </a>
          </div>
        ) : (
          <>
            <div className="vb-shipping" aria-live="polite">
              <p>
                {freeShipping
                  ? 'You unlocked free shipping 🌿'
                  : `Add ${formatPrice(site.freeShippingFrom - subtotal)} more for free shipping`}
              </p>
              <div className="vb-shipping__bar">
                <span style={{ width: `${progress}%` }} />
              </div>
            </div>

            <ul className="vb-lines">
              {lines.map(({ id, qty, plant }, i) => (
                <li key={id} className="vb-line" style={{ animationDelay: `${i * 50}ms` }}>
                  <button className="vb-line__img" onClick={() => openPlant(id)} aria-label={`View ${plant.name}`}>
                    <img src={plant.thumb} alt="" width={80} height={80} loading="lazy" />
                  </button>
                  <div className="vb-line__info">
                    <p className="vb-line__name">{plant.name}</p>
                    <p className="vb-line__price">{formatPrice(plant.price)}</p>
                    <Stepper value={qty} onChange={(v) => setQty(id, v)} label={plant.name} small />
                  </div>
                  <div className="vb-line__end">
                    <p className="vb-line__total">{formatPrice(plant.price * qty)}</p>
                    <button className="vb-icon-btn" onClick={() => removeFromCart(id)} aria-label={`Remove ${plant.name}`}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <footer className="vb-summary">
              <dl>
                <div><dt>Subtotal</dt><dd>{formatPrice(subtotal)}</dd></div>
                <div><dt>Shipping</dt><dd>{shipping ? formatPrice(shipping) : 'Free'}</dd></div>
                <div className="vb-summary__total"><dt>Total</dt><dd>{formatPrice(total)}</dd></div>
              </dl>
              <a className="vb-btn vb-btn--fill vb-btn--block" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <Send size={18} /> Order via WhatsApp
              </a>
              <button className="vb-link" onClick={clearCart}>
                Empty cart
              </button>
            </footer>
          </>
        )}
      </div>
    </dialog>
  );
}

/* ------------------------------- Utilidades ------------------------------- */

function Stepper({
  value, onChange, label, small,
}: { value: number; onChange: (v: number) => void; label: string; small?: boolean }) {
  return (
    <div className={`vb-stepper ${small ? 'vb-stepper--small' : ''}`}>
      <button onClick={() => onChange(value - 1)} aria-label={`Decrease quantity of ${label}`}>
        <Minus size={16} />
      </button>
      <span aria-live="polite" aria-label={`Quantity: ${value}`}>{value}</span>
      <button onClick={() => onChange(value + 1)} disabled={value >= MAX_QTY} aria-label={`Increase quantity of ${label}`}>
        <Plus size={16} />
      </button>
    </div>
  );
}

function Toast() {
  const toast = useStore($toast);
  const cartOpen = useStore($cartOpen);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!toast) return;
    setVisible(true);
    const timer = window.setTimeout(() => setVisible(false), 2600);
    return () => window.clearTimeout(timer);
  }, [toast]);

  return (
    <div className={`vb-toast ${visible && !cartOpen ? 'is-visible' : ''}`} role="status" aria-live="polite">
      <Check size={18} />
      <span>{toast?.message}</span>
      <button onClick={() => { setVisible(false); openCart(); }}>View cart</button>
    </div>
  );
}
