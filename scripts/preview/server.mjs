// Local preview of the OBJECT 07 theme: renders the Liquid with liquidjs and real product data
// (fetched from Shopify), with a working in-memory cart. Not a full Shopify emulation.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Liquid, Hash } from 'liquidjs';

const THEME = process.env.THEME || path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../theme');
const PORT = Number(process.env.PORT || 4321);
const locale = JSON.parse(fs.readFileSync(path.join(THEME, 'locales/sv.default.json'), 'utf8'));

/* ---------- data (from Shopify Admin, 2026-10-08) ---------- */
function makeProduct(id, handle, title, type, price, sizes) {
  const variants = sizes.map(([size, vid, available]) => ({
    id: vid, title: size, available, price, options: [size], option1: size,
  }));
  return {
    id, handle, title, type, price, description: '', url: `/products/${handle}`,
    available: variants.some((v) => v.available), variants,
    options_with_values: [{ name: 'Storlek', values: sizes.map((s) => s[0]) }],
    has_only_default_variant: false, selected_variant: null,
    selected_or_first_available_variant: variants.find((v) => v.available) || variants[0],
    featured_image: null, media: [], collections: [], compare_at_price: null,
  };
}
const p1 = makeProduct(15864364237148, 'object-001-svart-camo', 'OBJECT #001', 'T-shirt', 69900, [
  ['S', 59345392533852, false], ['M', 59353741787484, false], ['L', 59353741820252, false], ['XL', 59353741853020, false],
]);
const p2 = makeProduct(15871757517148, 'object-002-svart-camo', 'OBJECT #002', 'Långärmad t-shirt', 99900, [
  ['S', 59388624765276, true], ['M', 59388624798044, false], ['L', 59388624830812, false], ['XL', 59388624863580, false],
]);
if (process.env.ALL_AVAILABLE) for (const p of [p1, p2]) { p.available = true; p.variants.forEach((v) => (v.available = true)); }
const c1 = { id: 701028172124, handle: 'object-001', title: 'OBJECT #001', url: '/collections/object-001', products: [p1], products_count: 1, description: '' };
const c2 = { id: 701028237660, handle: 'object-002', title: 'OBJECT #002', url: '/collections/object-002', products: [p2], products_count: 1, description: '' };
p1.collections = [c1]; p2.collections = [c2];
const products = { [p1.handle]: p1, [p2.handle]: p2 };
const collections = [c1, c2];
const collectionByHandle = Object.fromEntries(collections.map((c) => [c.handle, c]));

/* ---------- cart ---------- */
let cartItems = [];
function cartObject() {
  const items = cartItems.map((it, i) => {
    const product = products[it.handle];
    const variant = product.variants.find((v) => v.id === it.variantId);
    return {
      key: `${variant.id}:k`, id: variant.id, quantity: it.quantity, product, variant,
      url: `${product.url}?variant=${variant.id}`, final_line_price: variant.price * it.quantity,
      options_with_values: [{ name: 'Storlek', value: variant.title }], line_level_discount_allocations: [],
    };
  });
  return {
    items, item_count: items.reduce((n, i) => n + i.quantity, 0),
    total_price: items.reduce((n, i) => n + i.final_line_price, 0),
  };
}

/* ---------- liquid ---------- */
const engine = new Liquid({
  root: [path.join(THEME, 'sections'), path.join(THEME, 'snippets'), path.join(THEME, 'layout')],
  partials: [path.join(THEME, 'snippets')],
  extname: '.liquid',
  dynamicPartials: true,
  jsTruthy: false,
  strictVariables: false,
});

function kw(args) {
  const out = {};
  for (const a of args) if (Array.isArray(a)) out[a[0]] = a[1];
  return out;
}
function lookup(key) {
  return key.split('.').reduce((o, k) => (o == null ? o : o[k]), locale);
}
engine.registerFilter('t', (key, ...args) => {
  const opts = kw(args);
  let v = lookup(key);
  if (v && typeof v === 'object') v = opts.count === 1 ? v.one : v.other;
  if (v == null) return `[missing ${key}]`;
  return String(v).replace(/\{\{\s*(\w+)\s*\}\}/g, (_, k) => (opts[k] ?? ''));
});
engine.registerFilter('asset_url', (name) => `/assets/${name}`);
engine.registerFilter('money', (c) => (c == null ? '' : `${Math.round(c / 100)} kr`));
engine.registerFilter('money_without_currency', (c) => (c == null ? '' : `${Math.round(c / 100)}`));
engine.registerFilter('image_url', (img) => (img && img.src) || '');
engine.registerFilter('image_tag', (src, ...args) => {
  const o = kw(args);
  return `<img src="${src}"${o.class ? ` class="${o.class}"` : ''} alt="${o.alt || ''}" loading="${o.loading || 'lazy'}">`;
});
engine.registerFilter('stylesheet_tag', (url) => `<link rel="stylesheet" href="${url}">`);
engine.registerFilter('preload_tag', (url, ...args) => {
  const o = kw(args);
  return `<link rel="preload" href="${url}" as="${o.as}" type="${o.type}" crossorigin="${o.crossorigin}">`;
});
engine.registerFilter('structured_data', () => '{}');
engine.registerFilter('default_pagination', () => '');
engine.registerFilter('within', (url) => url);
engine.registerFilter('handleize', (v) => String(v).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''));

for (const name of ['doc', 'schema', 'stylesheet', 'javascript']) {
  engine.registerTag(name, {
    parse(token, remain) {
      while (remain.length) {
        const t = remain.shift();
        if (t.name === `end${name}`) return;
      }
      throw new Error(`${name} not closed`);
    },
    * render() {},
  });
}

engine.registerTag('form', {
  parse(token, remain) {
    const m = token.args.match(/^\s*'(\w+)'\s*(?:,\s*([a-z_]+)(?=\s*(,|$)))?\s*,?\s*(.*)$/);
    this.kind = m[1];
    this.hash = new Hash(m[4] || '');
    this.tpls = [];
    const stream = this.liquid.parser.parseStream(remain)
      .on('tag:endform', () => stream.stop())
      .on('template', (tpl) => this.tpls.push(tpl))
      .on('end', () => { throw new Error('form not closed'); });
    stream.start();
  },
  * render(ctx, emitter) {
    const h = yield this.hash.render(ctx);
    const action = { product: '/cart/add', customer: '/contact#anmal' }[this.kind] || '/';
    const attrs = Object.entries(h).map(([k, v]) => ` ${k}="${v}"`).join('');
    emitter.write(`<form method="post" action="${action}"${attrs} accept-charset="UTF-8">`);
    ctx.push({ form: { errors: null, email: '', 'posted_successfully?': false } });
    yield this.liquid.renderer.renderTemplates(this.tpls, ctx, emitter);
    ctx.pop();
    emitter.write('</form>');
  },
});

engine.registerTag('paginate', {
  parse(token, remain) {
    this.tpls = [];
    const stream = this.liquid.parser.parseStream(remain)
      .on('tag:endpaginate', () => stream.stop())
      .on('template', (tpl) => this.tpls.push(tpl))
      .on('end', () => { throw new Error('paginate not closed'); });
    stream.start();
  },
  * render(ctx, emitter) {
    ctx.push({ paginate: { pages: 1 } });
    yield this.liquid.renderer.renderTemplates(this.tpls, ctx, emitter);
    ctx.pop();
  },
});

/* Sections */
const schemaCache = {};
function schemaOf(type) {
  if (!schemaCache[type]) {
    const src = fs.readFileSync(path.join(THEME, 'sections', `${type}.liquid`), 'utf8');
    const m = src.match(/\{%\s*schema\s*%\}([\s\S]*?)\{%\s*endschema\s*%\}/);
    schemaCache[type] = m ? JSON.parse(m[1]) : {};
  }
  return schemaCache[type];
}
function resolveSettings(defs = [], given = {}) {
  const out = {};
  for (const d of defs) if (d.id) out[d.id] = d.default ?? (d.type === 'checkbox' ? false : null);
  Object.assign(out, given);
  for (const d of defs) {
    if (d.type === 'collection' && typeof out[d.id] === 'string') out[d.id] = collectionByHandle[out[d.id]] || null;
    if (d.type === 'link_list') out[d.id] = MENUS[out[d.id]] || { links: [] };
    if ((d.type === 'video' || d.type === 'image_picker' || d.type === 'page' || d.type === 'url') && out[d.id] == null) out[d.id] = null;
  }
  return out;
}
const MENUS = {
  'main-menu': { links: [
    { title: 'OBJECT #001', url: '/collections/object-001' },
    { title: 'OBJECT #002', url: '/collections/object-002' },
    { title: 'Om', url: '/pages/om' },
  ] },
  footer: { links: [{ title: 'Sök', url: '/search' }, { title: 'Kontakt', url: '/pages/kontakt' }] },
};

async function renderSection(id, data, scope) {
  const schema = schemaOf(data.type);
  const blocks = (data.block_order || Object.keys(data.blocks || {})).map((bid) => {
    const b = data.blocks[bid];
    const bschema = (schema.blocks || []).find((x) => x.type === b.type) || {};
    return { id: bid, type: b.type, settings: resolveSettings(bschema.settings, b.settings), shopify_attributes: '' };
  });
  const section = { id, settings: resolveSettings(schema.settings, data.settings), blocks };
  const html = await engine.renderFile(data.type, { ...scope, section }, { globals: scope });
  const tag = schema.tag || 'div';
  return `<${tag} id="shopify-section-${id}" class="shopify-section${schema.class ? ` ${schema.class}` : ''}">${html}</${tag}>`;
}
async function renderJson(file, scope) {
  const json = JSON.parse(fs.readFileSync(file, 'utf8'));
  let out = '';
  for (const id of json.order) out += await renderSection(id, json.sections[id], scope);
  return out;
}
engine.registerTag('sections', {
  parse(token) { this.group = token.args.replace(/['"\s]/g, ''); },
  * render(ctx, emitter) {
    const html = yield renderJson(path.join(THEME, 'sections', `${this.group}.json`), ctx.getAll());
    emitter.write(html);
  },
});
engine.registerTag('section', {
  parse(token) { this.type = token.args.replace(/['"\s]/g, ''); },
  * render(ctx, emitter) {
    const html = yield renderSection(this.type, { type: this.type, settings: {} }, ctx.getAll());
    emitter.write(html);
  },
});

/* Compiled section CSS/JS, like Shopify's bundles */
function compiled(kind) {
  let out = '';
  for (const dir of ['sections', 'snippets']) {
    for (const f of fs.readdirSync(path.join(THEME, dir)).sort()) {
      if (!f.endsWith('.liquid')) continue;
      const src = fs.readFileSync(path.join(THEME, dir, f), 'utf8');
      const re = new RegExp(`\\{%-?\\s*${kind}\\s*-?%\\}([\\s\\S]*?)\\{%-?\\s*end${kind}\\s*-?%\\}`);
      const m = src.match(re);
      if (m) out += kind === 'javascript' ? `\n/* ${f} */\n(function(){\n${m[1]}\n})();\n` : `\n/* ${f} */\n${m[1]}\n`;
    }
  }
  return out;
}

async function renderPage(templateName, extra = {}) {
  const scope = {
    shop: { name: 'OBJECT 07' }, request: { locale: { iso_code: 'sv' } },
    routes: { root_url: '/', cart_url: '/cart', cart_add_url: '/cart/add', cart_change_url: '/cart/change', search_url: '/search', collections_url: '/collections' },
    cart: cartObject(), template: { name: templateName }, settings: {}, collections,
    localization: { available_languages: [{ iso_code: 'sv', endonym_name: 'svenska' }], available_countries: [], language: { iso_code: 'sv' } },
    canonical_url: '', page_title: extra.page_title || 'OBJECT 07', content_for_header: '<link rel="stylesheet" href="/compiled/styles.css"><script src="/compiled/scripts.js" defer></script>',
    current_page: 1, linklists: MENUS, ...extra,
  };
  const content = await renderJson(path.join(THEME, 'templates', `${templateName}.json`), scope);
  return engine.renderFile(path.join(THEME, 'layout', 'theme.liquid'), { ...scope, content_for_layout: content }, { globals: scope });
}

/* ---------- server ---------- */
const MIME = { '.css': 'text/css', '.js': 'text/javascript', '.webp': 'image/webp', '.png': 'image/png', '.mp4': 'video/mp4', '.woff2': 'font/woff2', '.json': 'application/json' };

async function body(req) {
  const chunks = [];
  for await (const c of req) chunks.push(c);
  return Buffer.concat(chunks);
}
async function drawerSection() {
  const scope = {
    cart: cartObject(), routes: { root_url: '/', cart_url: '/cart', cart_change_url: '/cart/change' }, shop: { name: 'OBJECT 07' },
  };
  return renderSection('cart-drawer', { type: 'cart-drawer', settings: {} }, scope);
}

http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://x');
  const p = url.pathname;
  const delay = Number(process.env.DELAY || 0);
  try {
    if (p.startsWith('/assets/')) {
      const file = path.join(THEME, 'assets', path.basename(p));
      if (!fs.existsSync(file)) { res.writeHead(404); return res.end(); }
      const stat = fs.statSync(file);
      const ext = path.extname(file);
      // Video needs range support for Chromium to play it.
      const range = req.headers.range;
      if (range && ext === '.mp4') {
        const [s, e] = range.replace('bytes=', '').split('-');
        const start = Number(s); const end = e ? Number(e) : stat.size - 1;
        res.writeHead(206, { 'Content-Type': MIME[ext], 'Content-Range': `bytes ${start}-${end}/${stat.size}`, 'Accept-Ranges': 'bytes', 'Content-Length': end - start + 1 });
        return fs.createReadStream(file, { start, end }).pipe(res);
      }
      res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream', 'Content-Length': stat.size, 'Accept-Ranges': 'bytes', 'Cache-Control': 'max-age=3600' });
      return fs.createReadStream(file).pipe(res);
    }
    if (p === '/compiled/styles.css') { res.writeHead(200, { 'Content-Type': 'text/css' }); return res.end(compiled('stylesheet')); }
    if (p === '/compiled/scripts.js') { res.writeHead(200, { 'Content-Type': 'text/javascript' }); return res.end(compiled('javascript')); }

    if (p === '/cart/add.js' && req.method === 'POST') {
      const raw = await body(req);
      const form = new URLSearchParams();
      // multipart from FormData
      const text = raw.toString();
      for (const m of text.matchAll(/name="([^"]+)"\r\n\r\n([^\r]*)\r\n/g)) form.append(m[1], m[2]);
      const id = Number(form.get('id'));
      const product = Object.values(products).find((x) => x.variants.some((v) => v.id === id));
      if (!product) { res.writeHead(422, { 'Content-Type': 'application/json' }); return res.end(JSON.stringify({ status: 422, description: 'Okänd variant' })); }
      const line = cartItems.find((l) => l.variantId === id);
      if (line) line.quantity += 1; else cartItems.push({ handle: product.handle, variantId: id, quantity: 1 });
      await new Promise((r) => setTimeout(r, Number(process.env.CART_DELAY || 700)));
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ id, sections: { 'cart-drawer': await drawerSection() } }));
    }
    if (p === '/cart/change.js' && req.method === 'POST') {
      const data = JSON.parse((await body(req)).toString());
      const i = data.line - 1;
      if (cartItems[i]) { if (data.quantity <= 0) cartItems.splice(i, 1); else cartItems[i].quantity = data.quantity; }
      await new Promise((r) => setTimeout(r, 300));
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ sections: { 'cart-drawer': await drawerSection() } }));
    }
    if (p === '/__reset') { cartItems = []; res.writeHead(200); return res.end('ok'); }

    let html;
    let m;
    if (delay) await new Promise((r) => setTimeout(r, delay));
    if (p === '/') html = await renderPage('index');
    else if ((m = p.match(/^\/collections\/([^/]+)$/)) && collectionByHandle[m[1]]) html = await renderPage('collection', { collection: collectionByHandle[m[1]], page_title: collectionByHandle[m[1]].title });
    else if ((m = p.match(/\/products\/([^/?]+)$/)) && products[m[1]]) html = await renderPage('product', { product: products[m[1]], page_title: products[m[1]].title });
    else if (p === '/cart') html = await renderPage('cart');
    else if (p === '/pages/om') html = await renderPage('page', { page: { title: 'Om OBJECT 07', content: '<p>Text kommer.</p>' } });
    else { res.statusCode = 404; html = await renderPage('404'); }
    res.writeHead(res.statusCode || 200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(html);
  } catch (err) {
    console.error(err);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end(String(err.stack || err));
  }
}).listen(PORT, () => console.log(`preview on http://localhost:${PORT}`));
