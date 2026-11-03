/* OBJECT 07 — honest buying cues.
   "Last one in L" by the size picker, read from Shopify's inventory (snippets/stock-data), so it is only
   ever what can actually be bought. Works for every <product-form>: the product page renders the line
   (snippets/stock-note), the cross gets one here, and both follow the size that is picked. */

(() => {
  const theme = window.theme || {};
  const strings = theme.strings || {};
  const data = document.getElementById('O7Stock');
  if (!data) return;

  /** @type {Record<string, number>} */
  let stock = {};
  try {
    stock = JSON.parse(data.textContent);
  } catch (error) {
    return;
  }

  const STAR =
    '<svg viewBox="0 0 40 40" aria-hidden="true" focusable="false" fill="currentColor"><path d="M20 0 C21.2 13 27 18.8 40 20 C27 21.2 21.2 27 20 40 C18.8 27 13 21.2 0 20 C13 18.8 18.8 13 20 0 Z"/></svg>';

  /**
   * @param {string} template
   * @param {Record<string, string|number>} values
   */
  const fill = (template, values) =>
    Object.entries(values).reduce((text, [key, value]) => text.split(`__${key}__`).join(String(value)), template || '');

  /** @param {HTMLInputElement} input */
  function lineFor(input) {
    const qty = stock[input.value];
    if (!qty) return '';
    const size = input.dataset.size;
    if (!size) return qty === 1 ? strings.stockSingleLast : fill(strings.stockSingleFew, { count: qty });
    return qty === 1 ? fill(strings.stockLast, { size }) : fill(strings.stockFew, { count: qty, size });
  }

  /** @param {HTMLFormElement} form */
  function textFor(form) {
    const picked = form.querySelector('input[name="id"]:checked');
    if (picked) return lineFor(picked);
    const low = [...form.querySelectorAll('input[name="id"]:not(:disabled)')].filter((input) => stock[input.value]);
    if (low.length === 1) return lineFor(low[0]);
    if (low.length > 1) return fill(strings.stockSizes, { sizes: low.map((input) => input.dataset.size).join(', ') });
    return '';
  }

  /** @param {HTMLElement} productForm */
  function noteFor(productForm) {
    const existing = productForm.querySelector('[data-stock-note]');
    if (existing) return existing;
    const sizes = productForm.querySelector('.sizes');
    if (!sizes) return null;
    const note = document.createElement('p');
    note.className = 'stock-note ui ui--small';
    note.dataset.stockNote = '';
    note.setAttribute('aria-live', 'polite');
    note.hidden = true;
    note.innerHTML = `${STAR}<span data-stock-text></span>`;
    sizes.after(note);
    return note;
  }

  /** @param {HTMLElement} productForm */
  function update(productForm) {
    const form = productForm.querySelector('form');
    const note = form && noteFor(productForm);
    if (!note) return;
    const text = textFor(form);
    const label = note.querySelector('[data-stock-text]');
    if (label.textContent.trim() === text && note.hidden === !text) return;
    label.textContent = text;
    note.hidden = !text;
    if (!text) return;
    // A new line arrives with the emblem's star turning in.
    note.removeAttribute('data-fresh');
    void note.offsetWidth;
    note.setAttribute('data-fresh', '');
  }

  const updateAll = () => document.querySelectorAll('product-form').forEach(update);

  // Capture, because the cross re-renders its sizes and then dispatches a change that doesn't bubble.
  document.addEventListener(
    'change',
    (event) => {
      const productForm = event.target instanceof Element && event.target.closest('product-form');
      if (productForm) update(productForm);
    },
    true
  );

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', updateAll, { once: true });
  else updateAll();
})();