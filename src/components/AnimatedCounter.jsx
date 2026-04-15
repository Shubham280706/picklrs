import { useEffect, useRef, useState } from 'react';
import { useInView } from '../hooks/useInView';

/**
 * Counts from 0 → target when scrolled into view.
 * Returns the formatted string value.
 */
export function useAnimatedCounter(target, duration = 1800, suffix = '') {
  const [count, setCount]   = useState(0);
  const [ref, inView]       = useInView({ threshold: 0.4 });
  const raf                 = useRef(null);

  useEffect(() => {
    if (!inView) return;
    const start     = performance.now();
    const numTarget = parseFloat(String(target).replace(/[^0-9.]/g, ''));

    const step = (now) => {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased    = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * numTarget));
      if (progress < 1) raf.current = requestAnimationFrame(step);
      else setCount(numTarget);
    };

    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, [inView, target, duration]);

  // Re-attach the original suffix/prefix characters
  const prefix = String(target).match(/^[^0-9]*/)?.[0] ?? '';
  const tail   = String(target).match(/[^0-9]*$/)?.[0] ?? '';

  return [ref, `${prefix}${count}${tail}${suffix}`];
}
