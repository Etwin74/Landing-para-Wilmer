// === Importamos los JSON como módulos (Vite los entiende) ===
import servicios from "../data/servicios.json";
import ofertas from "../data/ofertas.json";
import portafolio from "../data/portafolio.json";

// === Helpers de creación de nodos (evitamos innerHTML cuando se pueda) ===
const $ = (sel, root = document) => root.querySelector(sel);

function createEl(tag, className = "", attrs = {}) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
  return el;
}

// === Render de tarjetas ===
function cardServicio(item) {
  // Tarjeta compacta para carrusel de servicios
  const li = createEl(
    "li",
    "carousel-item min-w-[280px] max-w-[320px] bg-white border rounded-xl p-3"
  );

  const img = createEl("img", "w-full h-40 object-cover rounded-lg mb-2", {
    src: item.img,
    alt: item.titulo
  });

  const h3 = createEl("h3", "font-semibold");
  h3.textContent = item.titulo;

  const p = createEl("p", "text-sm text-slate-600 mt-1");
  p.textContent = item.descripcion;

  const price = createEl("p", "text-sm mt-2");
  price.innerHTML = `<span class="text-slate-500">Desde</span> <strong>S/ ${item.precioDesde}</strong>`;

  const cta = createEl(
    "a",
    "mt-3 inline-block rounded-lg border px-3 py-1.5 text-sm hover:bg-slate-50",
    {
      href: `https://wa.me/51992763063?text=Quiero%20cotizar%20${encodeURIComponent(item.titulo)}`,
      target: "_blank",
      rel: "noopener"
    }
  );
  cta.textContent = "Cotizar";

  li.append(img, h3, p, price, cta);
  return li;
}

function cardOferta(item) {
  const li = createEl(
    "li",
    "carousel-item min-w-[280px] max-w-[320px] bg-white border rounded-xl p-3"
  );
  const img = createEl("img", "w-full h-40 object-cover rounded-lg mb-2", {
    src: item.img,
    alt: item.titulo
  });
  const h3 = createEl("h3", "font-semibold");
  h3.textContent = item.titulo;

  const prices = createEl("p", "text-sm mt-1");
  prices.innerHTML = `<s class="text-slate-400 mr-2">S/ ${item.precioAntes}</s> <strong>S/ ${item.precioAhora}</strong>`;

  const note = createEl("p", "text-xs text-slate-500");
  note.textContent = `Vigencia: ${item.vigencia}`;

  li.append(img, h3, prices, note);
  return li;
}

function cardPortafolio(item) {
  const li = createEl("li", "bg-white border rounded-xl overflow-hidden");
  const img = createEl("img", "w-full h-44 object-cover", {
    src: item.img,
    alt: `${item.servicio} – ${item.zona}`
  });
  const box = createEl("div", "p-3");
  const h3 = createEl("h3", "font-semibold");
  h3.textContent = item.servicio;

  const meta = createEl("p", "text-sm text-slate-600");
  meta.textContent = `${item.cliente} · ${item.zona}`;

  box.append(h3, meta);
  li.append(img, box);
  return li;
}

// === Función para poblar listas según data y plantilla ===
function populateList(selector, data, cardFn) {
  const ul = $(`[data-list="${selector}"]`);
  if (!ul) return;
  const frag = document.createDocumentFragment();
  data.forEach((it) => frag.append(cardFn(it)));
  ul.append(frag);
}

// === Carrusel “simple”: mueve por ancho de contenedor ===
function initCarousel(trackSelector, prevBtnSelector, nextBtnSelector) {
  const track = $(`[data-list="${trackSelector}"]`);
  const prev = $(`.${prevBtnSelector}`);
  const next = $(`.${nextBtnSelector}`);
  if (!track || !prev || !next) return;

  // cantidad a desplazar = 90% del ancho visible
  const step = () => Math.floor(track.clientWidth * 0.9);

  prev.addEventListener("click", () => (track.scrollLeft -= step()));
  next.addEventListener("click", () => (track.scrollLeft += step()));

  // Accesibilidad: teclas izquierda/derecha cuando el UL tiene foco
  track.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") track.scrollLeft -= step();
    if (e.key === "ArrowRight") track.scrollLeft += step();
  });
}

// === Inicialización ===
populateList("servicios", servicios, cardServicio);
populateList("ofertas", ofertas, cardOferta);
populateList("portafolio", portafolio, cardPortafolio);

// Carruseles
initCarousel("servicios", "prev-serv", "next-serv");
initCarousel("ofertas", "prev-ofe", "next-ofe");

// Año dinámico en footer
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();
