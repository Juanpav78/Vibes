import { useEffect, useRef, useState } from 'react';

const CLOSE_MS = 280;

/**
 * Controla un <dialog> nativo (foco atrapado, Esc, capa superior) y
 * deja tiempo a la animación de salida antes de cerrarlo.
 */
export function useAnimatedDialog(open: boolean, onClose: () => void) {
  const ref = useRef<HTMLDialogElement>(null);
  const [closing, setClosing] = useState(false);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;

    if (open) {
      setClosing(false);
      if (!dialog.open) dialog.showModal();
      return;
    }
    if (!dialog.open) return;

    setClosing(true);
    const timer = window.setTimeout(() => {
      dialog.close();
      setClosing(false);
    }, CLOSE_MS);
    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    // Esc: cerramos nosotros para poder animar
    const onCancel = (e: Event) => {
      e.preventDefault();
      onCloseRef.current();
    };
    // Click en el fondo (::backdrop cuenta como el propio <dialog>)
    const onClick = (e: MouseEvent) => {
      if (e.target === dialog) onCloseRef.current();
    };
    dialog.addEventListener('cancel', onCancel);
    dialog.addEventListener('click', onClick);
    return () => {
      dialog.removeEventListener('cancel', onCancel);
      dialog.removeEventListener('click', onClick);
    };
  }, []);

  return { ref, closing };
}
