/* OBJECT 07 — motion helpers shared by the sections: scroll reveals, scrambled labels, rolling
   archive numbers, the cursor, magnetic controls, drag-to-turn, tilt, and the flight into the bag.
   Everything degrades to a plain state change when motion is off (`.motion` missing on <html>). */

(() => {
const root = document.documentElement;
const motion = root.classList.contains('motion');
const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const theme = (window.theme = window.theme || {});
const EASE_OUT = 'cubic-bezier(0.16, 1, 0.3, 1)';
const SPRING =
  'linear(0, 0.056 3.1%, 0.191 6.2%, 0.368 9.4%, 0.552 12.5%, 0.724 15.6%, 0.868 18.8%, 0.98 21.9%, 1.057 25%, 1.103 28.1%, 1.124 31.2%, 1.125 34.4%, 1.112 37.5%, 1.092 40.6%, 1.069 43.8%, 1.046 46.9%, 1.026 50%, 1.01 53.1%, 0.998 56.2%, 0.99 59.4%, 0.985 62.5%, 0.984 65.6%, 0.985 68.8%, 0.987 71.9%, 0.99 75%, 0.993 78.1%, 0.995 81.2%, 0.998 84.4%, 1 87.5%, 1.001 90.6%, 1)';

/* ---------- Leaving for another page: a hairline draws under the header ---------- */
document.addEventListener('click', (event) => {
  const link = event.target.closest?.('a[href]');
  if (!link || event.defaultPrevented || event.button !== 0) return;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  if ((link.target && link.target !== '_self') || link.hasAttribute('download')) return;
  const url = new URL(link.href, location.href);
  if (url.origin !== location.origin) return;
  if (url.pathname === location.pathname && url.search === location.search) return;
  root.classList.add('is-leaving');
});
window.addEventListener('pageshow', (event) => {
  if (event.persisted) root.classList.remove('is-leaving');
});

/* ---------- Scrambled labels: decode from archive glyphs ---------- */
const GLYPHS = '0123456789#*+/<>';
const scrambles = new WeakMap();

/**
 * Decodes `text` into `el` character by character. Width is held so the line doesn't jitter.
 * @param {HTMLElement} el
 * @param {string} [text]
 * @param {{ duration?: number, delay?: number }} [options]
 */
function scramble(el, text = el.dataset.scrambleText ?? el.textContent, { duration = 760, delay = 0 } = {}) {
  cancelAnimationFrame(scrambles.get(el));
  el.dataset.scrambled = '';
  if (!motion || !text.trim()) {
    el.textContent = text;
    return;
  }
  el.textContent = text;
  // Hold the final width and keep to one line, so the glyphs never shift the layout.
  if (getComputedStyle(el).display === 'inline') el.classList.add('scramble');
  el.style.width = `${el.getBoundingClientRect().width}px`;
  el.style.whiteSpace = 'nowrap';
  const chars = [...text];
  const settle = chars.map((_, i) => (i / chars.length) * duration * 0.75 + Math.random() * duration * 0.25);
  const start = performance.now() + delay;
  let last = 0;
  const frame = (now) => {
    const t = now - start;
    if (t >= duration) {
      el.textContent = text;
      el.classList.remove('scramble');
      el.style.width = '';
      el.style.whiteSpace = '';
      return;
    }
    if (now - last > 45) {
      last = now;
      el.textContent = chars
        .map((c, i) => (c === ' ' || c === '·' || t >= settle[i] ? c : GLYPHS[(Math.random() * GLYPHS.length) | 0]))
        .join('');
    }
    scrambles.set(el, requestAnimationFrame(frame));
  };
  scrambles.set(el, requestAnimationFrame(frame));
}

/* ---------- Rolling archive numbers ---------- */
/**
 * Rolls the digits in `el` from its current value to `next`, like a counter.
 * @param {HTMLElement} el
 * @param {string} next
 * @param {number} [dir] 1 rolls forward (digits come up from below), -1 rolls back
 */
function rollTo(el, next, dir = 1) {
  const prev = el.dataset.rollValue ?? el.textContent.trim();
  el.dataset.rollValue = next;
  if (!motion || prev === next) {
    if (!motion) el.textContent = next;
    return;
  }
  el.replaceChildren();
  [...next].forEach((c, i) => {
    const p = prev[i];
    const digit = /\d/.test(c) && /\d/.test(p ?? '');
    const steps = digit ? (((Number(c) - Number(p)) * dir) % 10 + 10) % 10 : 0;
    if (!steps) {
      el.append(c);
      return;
    }
    const seq = Array.from({ length: steps + 1 }, (_, k) => (((Number(p) + k * dir) % 10) + 10) % 10);
    if (dir < 0) seq.reverse();
    const wrap = document.createElement('span');
    wrap.className = 'roll';
    const ghost = document.createElement('span');
    ghost.className = 'roll__ghost';
    ghost.textContent = c;
    const col = document.createElement('span');
    col.className = 'roll__col';
    col.setAttribute('aria-hidden', 'true');
    for (const d of seq) {
      const s = document.createElement('span');
      s.textContent = String(d);
      col.append(s);
    }
    const far = `${(-steps / (steps + 1)) * 100}%`;
    const [from, to] = dir > 0 ? ['0%', far] : [far, '0%'];
    col.style.setProperty('--roll-end', to);
    wrap.append(ghost, col);
    el.append(wrap);
    col.animate([{ transform: `translateY(${from})` }, { transform: `translateY(${to})` }], {
      duration: 900 + i * 140,
      easing: EASE_OUT,
    });
  });
}

/* ---------- Reveal on scroll ---------- */

// Only what starts below the fold is hidden ("waiting"); it plays once as it arrives ("in").
const revealed = (el) => el.dispatchEvent(new CustomEvent('o7:reveal', { bubbles: false }));
function observeReveals(scope = document) {
  const targets = scope.querySelectorAll('[data-reveal]:not([data-reveal-state]), [data-scramble]:not([data-scramble-state])');
  if (!targets.length) return;
  if (!motion || !('IntersectionObserver' in window)) {
    for (const el of targets) {
      if (el.matches('[data-scramble]')) el.dataset.scrambled = '';
      revealed(el);
    }
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      let batch = 0;
      for (const entry of entries) {
        const el = entry.target;
        const isScramble = el.matches('[data-scramble]');
        const key = isScramble ? 'scrambleState' : 'revealState';
        if (!el.dataset[key]) {
          // First report: what is on screen (or above it) stays put; labels decode right away.
          const onScreen = entry.isIntersecting || entry.boundingClientRect.top < window.innerHeight;
          // Scenes are hidden from the first paint (CSS) and always play when they arrive.
          if (el.dataset.reveal === 'scene') {
            el.dataset[key] = 'waiting';
            if (!entry.isIntersecting) continue;
          } else if (onScreen && !isScramble) {
            el.dataset[key] = 'shown';
            io.unobserve(el);
            revealed(el);
            continue;
          }
          el.dataset[key] = 'waiting';
          if (!onScreen) continue;
        } else if (!entry.isIntersecting) {
          continue;
        }
        play(el, isScramble, batch);
        batch += 1;
      }
    },
    // Plays a little after the top edge clears the bottom of the screen. (Not a visibility ratio:
    // masked elements are fully clipped while they wait, so their ratio stays at 0.)
    { rootMargin: '0px 0px -10% 0px' }
  );
  const play = (el, isScramble, batch) => {
    const key = isScramble ? 'scrambleState' : 'revealState';
    el.dataset[key] = 'in';
    io.unobserve(el);
    if (isScramble) {
      scramble(el, undefined, { delay: Number(el.dataset.scrambleDelay || 0) + batch * 90 });
    } else {
      el.style.setProperty('--reveal-delay', `${batch * 90}ms`);
      revealed(el);
    }
  };
  for (const el of targets) io.observe(el);

  // At the very bottom of the page the margin can't be cleared: play whatever is still waiting on screen.
  const atBottom = () => {
    if (window.scrollY + window.innerHeight < document.documentElement.scrollHeight - 4) return;
    let batch = 0;
    for (const el of scope.querySelectorAll('[data-reveal-state="waiting"], [data-scramble-state="waiting"]')) {
      if (el.getBoundingClientRect().top < window.innerHeight) play(el, !el.matches('[data-reveal]'), batch++);
    }
  };
  window.addEventListener('scroll', atBottom, { passive: true });
}

/* ---------- Cursor: a bone disc that names the action over a garment ---------- */
function initCursor() {
  if (!motion || !fine) return;
  const cursor = document.createElement('div');
  cursor.className = 'cursor';
  cursor.setAttribute('aria-hidden', 'true');
  document.body.append(cursor);
  root.classList.add('has-cursor');
  let x = 0;
  let y = 0;
  let cx = 0;
  let cy = 0;
  let raf = 0;
  let zone = null;
  const tick = () => {
    cx += (x - cx) * 0.22;
    cy += (y - cy) * 0.22;
    cursor.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
    raf = Math.abs(x - cx) + Math.abs(y - cy) > 0.2 ? requestAnimationFrame(tick) : 0;
  };
  document.addEventListener(
    'pointermove',
    (event) => {
      if (event.pointerType !== 'mouse') return;
      x = event.clientX;
      y = event.clientY;
      const next = event.target.closest?.('[data-cursor]') || null;
      if (next !== zone) {
        if (next && !zone) {
          cx = x;
          cy = y;
        }
        zone = next;
        if (zone) cursor.textContent = zone.dataset.cursor;
        cursor.classList.toggle('cursor--on', !!zone);
      }
      if (!raf) raf = requestAnimationFrame(tick);
    },
    { passive: true }
  );
  document.documentElement.addEventListener('mouseleave', () => {
    zone = null;
    cursor.classList.remove('cursor--on');
  });
  document.addEventListener('pointerdown', () => cursor.classList.add('cursor--press'));
  document.addEventListener('pointerup', () => cursor.classList.remove('cursor--press'));
}

/* ---------- Magnetic controls ---------- */
function initMagnetic(scope = document) {
  if (!motion || !fine) return;
  for (const el of scope.querySelectorAll('[data-magnetic]')) {
    el.addEventListener('pointermove', (event) => {
      const r = el.getBoundingClientRect();
      const dx = event.clientX - (r.left + r.width / 2);
      const dy = event.clientY - (r.top + r.height / 2);
      el.classList.add('is-attracted');
      el.style.translate = `${dx * 0.32}px ${dy * 0.4}px`;
    });
    el.addEventListener('pointerleave', () => {
      el.classList.remove('is-attracted');
      el.style.translate = '';
    });
  }
}

/* ---------- Drag to turn a garment over ---------- */
/**
 * The garment follows a sideways drag and turns over when let go far or fast enough.
 * @param {HTMLElement} stage - Area that takes the drag (vertical scrolling still works)
 * @param {HTMLElement} target - What follows the finger
 * @param {(dir: number) => void} flip - Called with 1 (dragged left) or -1 (dragged right)
 */
function dragFlip(stage, target, flip) {
  let x0 = null;
  let y0 = 0;
  let t0 = 0;
  let dx = 0;
  let drag = false;
  let id = null;
  let suppress = false;
  const follow = (d) => {
    const r = d / (1 + Math.abs(d) / 520);
    return `translateX(${r * 0.75}px) rotate(${r * 0.03}deg)`;
  };
  stage.addEventListener('pointerdown', (event) => {
    if (event.button) return;
    x0 = event.clientX;
    y0 = event.clientY;
    t0 = performance.now();
    dx = 0;
    drag = false;
    id = event.pointerId;
  });
  stage.addEventListener('pointermove', (event) => {
    if (x0 === null || event.pointerId !== id) return;
    dx = event.clientX - x0;
    const dy = event.clientY - y0;
    if (!drag) {
      if (Math.abs(dx) < 8) return;
      if (Math.abs(dy) > Math.abs(dx)) {
        x0 = null;
        return;
      }
      drag = true;
      try {
        stage.setPointerCapture(id);
      } catch (error) {}
      for (const animation of target.getAnimations()) animation.cancel();
      stage.classList.add('is-dragging');
    }
    if (motion) target.style.transform = follow(dx);
  });
  const end = (event, cancelled) => {
    if (x0 === null || event.pointerId !== id) return;
    x0 = null;
    if (!drag) return;
    drag = false;
    stage.classList.remove('is-dragging');
    suppress = true;
    setTimeout(() => (suppress = false), 60);
    const velocity = dx / Math.max(1, performance.now() - t0);
    const go = !cancelled && (Math.abs(dx) > 64 || Math.abs(velocity) > 0.45);
    const from = target.style.transform;
    target.style.transform = '';
    if (motion && from) target.animate([{ transform: from }, { transform: 'none' }], { duration: 760, easing: SPRING });
    if (go) flip(dx < 0 ? 1 : -1);
  };
  stage.addEventListener('pointerup', (event) => end(event, false));
  stage.addEventListener('pointercancel', (event) => end(event, true));
  stage.addEventListener(
    'click',
    (event) => {
      // Only the real click that ends a drag; the turn itself may click a radio programmatically.
      if (!suppress || !event.isTrusted) return;
      event.stopPropagation();
      event.preventDefault();
    },
    true
  );
}

/* ---------- Tilt: the garment leans toward the pointer, the number drifts the other way ---------- */
/**
 * @param {HTMLElement} stage
 * @param {HTMLElement} target - Gets the 3D `rotate` (its parent needs `perspective`)
 * @param {HTMLElement} [numeral] - Drifts against the pointer for depth
 */
function tilt(stage, target, numeral) {
  if (!motion || !fine) return;
  stage.addEventListener('pointermove', (event) => {
    if (event.pointerType !== 'mouse' || stage.classList.contains('is-dragging')) return;
    const r = stage.getBoundingClientRect();
    const px = (event.clientX - r.left) / r.width - 0.5;
    const py = (event.clientY - r.top) / r.height - 0.5;
    const amount = Math.hypot(px, py);
    target.style.rotate = amount < 0.01 ? 'none' : `${-py} ${px} 0 ${amount * 16}deg`;
    if (numeral) numeral.style.translate = `${px * -28}px ${py * -16}px`;
  });
  stage.addEventListener('pointerleave', () => {
    target.style.rotate = '';
    if (numeral) numeral.style.translate = '';
  });
}

/* ---------- Into the bag ---------- */
/** @param {HTMLImageElement | null | undefined} source - The garment on screen */
function flyToCart(source) {
  const bag = document.querySelector('.site-header [data-cart-label]');
  if (!bag) return;
  const catchIt = () => {
    bag.classList.remove('bag--catch');
    void bag.offsetWidth;
    bag.classList.add('bag--catch');
    setTimeout(() => bag.classList.remove('bag--catch'), 600);
  };
  if (!motion || !source) return catchIt();
  const a = source.getBoundingClientRect();
  if (!a.width || a.bottom < 0 || a.top > window.innerHeight) return catchIt();
  const b = bag.getBoundingClientRect();
  const size = Math.min(a.width, a.height);
  const left = a.left + (a.width - size) / 2;
  const top = a.top + (a.height - size) / 2;
  const fly = document.createElement('div');
  fly.className = 'fly';
  fly.style.cssText = `left:${left}px;top:${top}px;width:${size}px;height:${size}px`;
  const inner = document.createElement('div');
  inner.style.cssText = 'width:100%;height:100%';
  const img = document.createElement('img');
  img.src = source.currentSrc || source.src;
  img.alt = '';
  inner.append(img);
  fly.append(inner);
  document.body.append(fly);
  const dx = b.left + b.width / 2 - (left + size / 2);
  const dy = b.top + b.height / 2 - (top + size / 2);
  const lift = -Math.min(140, Math.max(40, top * 0.4));
  const duration = 950;
  fly.animate([{ transform: 'translateX(0)' }, { transform: `translateX(${dx}px)` }], {
    duration,
    easing: 'cubic-bezier(0.45, 0, 0.25, 1)',
    fill: 'forwards',
  });
  inner
    .animate(
      [
        { transform: 'translateY(0) scale(1) rotate(0deg)', opacity: 1, easing: 'cubic-bezier(0.2, 0.8, 0.3, 1)' },
        { transform: `translateY(${lift}px) scale(0.5) rotate(-8deg)`, opacity: 1, offset: 0.38, easing: 'cubic-bezier(0.6, 0, 0.9, 0.5)' },
        { transform: `translateY(${dy}px) scale(0.05) rotate(12deg)`, opacity: 0.4 },
      ],
      { duration, fill: 'forwards' }
    )
    .finished.then(() => {
      fly.remove();
      catchIt();
    });
}

Object.assign(theme, { motion, scramble, rollTo, observeReveals, dragFlip, tilt, flyToCart, initMagnetic });

const init = () => {
  observeReveals();
  initCursor();
  initMagnetic();
};
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
else init();

// Theme editor: a re-rendered section brings fresh elements to observe.
document.addEventListener('shopify:section:load', (event) => {
  observeReveals(event.target);
  initMagnetic(event.target);
});
})();
