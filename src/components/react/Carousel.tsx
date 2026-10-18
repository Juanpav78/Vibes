import { useCallback, useEffect, useRef, useState, type ReactNode, type PointerEvent } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  /** cantidad de diapositivas (.carrousel__contain) que recibe en el slot */
  num: number;
  label: string;
  /** ms entre diapositivas; 0 = sin autoplay */
  autoplay?: number;
  children?: ReactNode;
}

const SWIPE_THRESHOLD = 50;

export default function Carousel({ num, label, autoplay = 0, children }: Props) {
  const [index, setIndex] = useState(0);
  const [drag, setDrag] = useState(0);
  const [paused, setPaused] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const startX = useRef<number | null>(null);

  const go = useCallback((i: number) => setIndex(((i % num) + num) % num), [num]);

  // Solo la diapositiva visible es accesible con teclado / lector de pantalla
  useEffect(() => {
    rootRef.current?.querySelectorAll<HTMLElement>('.carrousel__contain').forEach((slide, i) => {
      slide.inert = i !== index;
      slide.setAttribute('aria-roledescription', 'slide');
      slide.setAttribute('aria-label', `${i + 1} of ${num}`);
    });
  }, [index, num]);

  // Autoplay: se pausa con hover/foco, fuera de pantalla o si se pide menos movimiento
  useEffect(() => {
    if (!autoplay || paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => setIndex((i) => (i + 1) % num), autoplay);
    return () => window.clearInterval(timer);
  }, [autoplay, paused, num]);

  useEffect(() => {
    if (!autoplay || !rootRef.current) return;
    const io = new IntersectionObserver(([entry]) => setPaused(!entry.isIntersecting));
    io.observe(rootRef.current);
    return () => io.disconnect();
  }, [autoplay]);

  const onPointerDown = (e: PointerEvent) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    startX.current = e.clientX;
  };
  const onPointerMove = (e: PointerEvent) => {
    if (startX.current === null) return;
    const dx = e.clientX - startX.current;
    if (Math.abs(dx) > 5) setDrag(dx);
  };
  const onPointerEnd = () => {
    if (startX.current === null) return;
    if (drag < -SWIPE_THRESHOLD) go(index + 1);
    else if (drag > SWIPE_THRESHOLD) go(index - 1);
    startX.current = null;
    setDrag(0);
  };

  return (
    <div
      ref={rootRef}
      className="carrousel"
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') go(index - 1);
        if (e.key === 'ArrowRight') go(index + 1);
      }}
    >
      <div className="carrousel__dots">
        {Array.from({ length: num }, (_, dot) => (
          <button
            key={dot}
            type="button"
            className={`carrousel__dot ${index === dot ? 'active' : ''}`}
            aria-label={`Go to slide ${dot + 1}`}
            aria-current={index === dot}
            onClick={() => go(dot)}
          />
        ))}
      </div>
      <div className="carrousel__movil contain">
        <button type="button" onClick={() => go(index - 1)} className="carrousel__arrow carrousel__arrow--left" aria-label="Previous slide">
          <ChevronLeft size={28} />
        </button>
        <div
          className="carrousel__visible"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerEnd}
          onPointerCancel={onPointerEnd}
          onPointerLeave={onPointerEnd}
          aria-live={autoplay && !paused ? 'off' : 'polite'}
        >
          <div
            className={`carrousel__content ${drag ? 'is-dragging' : ''}`}
            style={{ transform: `translateX(calc(${-index * 100}% + ${drag}px))` }}
          >
            {children}
          </div>
        </div>
        <button type="button" onClick={() => go(index + 1)} className="carrousel__arrow carrousel__arrow--rigth" aria-label="Next slide">
          <ChevronRight size={28} />
        </button>
      </div>
    </div>
  );
}
