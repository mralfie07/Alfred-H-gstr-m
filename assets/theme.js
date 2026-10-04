/* OBJECT 07 — shared behaviour: dialogs, cart API, product forms, toast.
   Everything here enhances markup that already works without JavaScript. */

(() => {
const theme = window.theme || {};

/**
 * @typedef {Object} ToastData
 * @property {string} [image]
 * @property {string} title
 * @property {string} [sub]
 */

/* Dialogs (menu and cart drawer) */
function openDialog(id) {
  const dialog = document.getElementById(id);
  if (!dialog || dialog.open) return;
  dialog.showModal();
}

document.addEventListener('click', (event) => {
  const opener = event.target.closest('[data-open-dialog]');
  if (opener) {
    if (opener.dataset.openDialog === 'cart-drawer' && theme.template === 'cart') return;
    event.preventDefault();
    openDialog(opener.dataset.openDialog);
    return;
  }

  const closer = event.target.closest('[data-close-dialog]');
  if (closer) {
    closer.closest('dialog')?.close();
    return;
  }

  // Light dismiss: a click on the backdrop lands on the dialog element itself.
  if (event.target instanceof HTMLDialogElement && event.target.classList.contains('drawer')) {
    event.target.close();
  }
});

/* Cart */
const cartSection = 'cart-drawer';

/**
 * @param {string} url
 * @param {Object|FormData} body
 */
async function cartRequest(url, body) {
  const isForm = body instanceof FormData;
  if (isForm) {
    body.append('sections', cartSection);
    body.append('sections_url', window.location.pathname);
  }
  const response = await fetch(url, {
    method: 'POST',
    headers: isForm ? { Accept: 'application/json' } : { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: isForm ? body : JSON.stringify({ ...body, sections: cartSection, sections_url: window.location.pathname }),
  });
  const data = await response.json();
  if (!response.ok || data.status) throw new Error(data.description || data.message || theme.strings.cartError);
  return data;
}

/** @param {Record<string, string>} sections */
function renderCart(sections) {
  const html = sections?.[cartSection];
  if (!html) return;
  const next = new DOMParser().parseFromString(html, 'text/html').getElementById('CartDrawerContent');
  const current = document.getElementById('CartDrawerContent');
  if (!next || !current) return;
  current.replaceWith(next);
  updateCount(Number(next.dataset.cartCount));
}

/** @param {number} count */
function updateCount(count) {
  for (const bubble of document.querySelectorAll('[data-cart-count]')) {
    bubble.textContent = String(count);
    bubble.hidden = count === 0;
    bubble.classList.add('cart-count--bump');
    setTimeout(() => bubble.classList.remove('cart-count--bump'), 400);
  }
  for (const label of document.querySelectorAll('[data-cart-label]')) {
    label.setAttribute('aria-label', count === 1 ? theme.strings.cartOne : theme.strings.cartMany.replace('__count__', count));
  }
}

/* Quantity and remove links inside the drawer. On the cart page they navigate as plain links. */
document.addEventListener('click', async (event) => {
  const link = event.target.closest('#cart-drawer [data-cart-change]');
  if (!link) return;
  event.preventDefault();
  const content = document.getElementById('CartDrawerContent');
  content?.setAttribute('data-cart-busy', '');
  try {
    const data = await cartRequest(theme.routes.cartChange, {
      line: Number(link.dataset.line),
      quantity: Number(link.dataset.quantity),
    });
    renderCart(data.sections);
  } catch (error) {
    content?.removeAttribute('data-cart-busy');
    window.location.href = link.href;
  }
});

/* Toast */
let toastTimer;

/** @param {ToastData} data */
function showToast(data) {
  const toast = document.getElementById('cart-toast');
  if (!toast) return;
  const image = toast.querySelector('img');
  if (data.image) image.src = data.image;
  image.hidden = !data.image;
  toast.querySelector('[data-toast-title]').textContent = data.title;
  toast.querySelector('[data-toast-sub]').textContent = data.sub || '';
  toast.classList.add('toast--show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('toast--show'), 4200);
}

document.addEventListener('click', (event) => {
  if (event.target.closest('#cart-toast [data-open-dialog]')) {
    document.getElementById('cart-toast')?.classList.remove('toast--show');
  }
});

/**
 * Adds a variant to the cart, refreshes the drawer and shows the toast.
 * @param {FormData} formData
 * @param {ToastData} toast
 */
async function addToCart(formData, toast) {
  const data = await cartRequest(theme.routes.cartAdd, formData);
  renderCart(data.sections);
  showToast(toast);
  return data;
}

/* <product-form>: wraps a plain /cart/add form. */
class ProductForm extends HTMLElement {
  connectedCallback() {
    this.form = this.querySelector('form');
    this.button = this.querySelector('[type="submit"]');
    this.error = this.querySelector('[data-form-error]');
    this.form?.addEventListener('submit', this.#onSubmit.bind(this));
    this.form?.addEventListener('change', this.#onChange.bind(this));
    this.#onChange();
  }

  /* The button asks for a size until one is picked (radios are `required`, so this also holds without JS). */
  #onChange() {
    const picked = this.form.querySelector('input[name="id"]:checked');
    if (!this.button || this.button.disabled) return;
    this.button.textContent = picked ? theme.strings.addToCart : theme.strings.chooseSize;
  }

  /** @param {SubmitEvent} event */
  async #onSubmit(event) {
    event.preventDefault();
    this.button.setAttribute('aria-busy', 'true');
    if (this.error) this.error.textContent = '';
    try {
      await addToCart(new FormData(this.form), {
        image: this.dataset.toastImage,
        title: theme.strings.added,
        sub: this.toastLine(),
      });
    } catch (error) {
      if (this.error) this.error.textContent = error.message;
    } finally {
      this.button.removeAttribute('aria-busy');
    }
  }

  toastLine() {
    const checked = this.form.querySelector('input[name="id"]:checked');
    return [this.dataset.toastTitle, checked?.dataset.size, this.dataset.toastPrice].filter(Boolean).join(' · ');
  }
}

if (!customElements.get('product-form')) customElements.define('product-form', ProductForm);

window.theme = Object.assign(theme, { addToCart, showToast, openDialog, updateCount });
})();
