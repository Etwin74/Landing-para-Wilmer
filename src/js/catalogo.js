// === Carga de catálogo completo (todas las categorías) ===
import CATALOGO from "../data/catalogo.json";

// === Config de categorías (nombre bonito + hero sugerido) ===
const CATS = {
  iluminacion: {
    nombre: "Iluminación",
    desc: "Focos, paneles y luminarias LED para hogar y negocio.",
    hero: "/media/hero/iluminacion.webp"
  },
  electricidad: {
    nombre: "Electricidad",
    desc: "Cables, tomacorrientes, tuberías y tableros.",
    hero: "/media/hero/electricidad.webp"
  },
  gasfiteria: {
    nombre: "Gasfitería",
    desc: "Grifería, tuberías PVC/CPVC, válvulas y accesorios.",
    hero: "/media/hero/gasfiteria.webp"
  },
  acabados: {
    nombre: "Acabados",
    desc: "Pinturas, siliconas, selladores y más.",
    hero: "/media/hero/acabados.webp"
  }
};

// === Utilitarios DOM ===
const $ = (s, r = document) => r.querySelector(s);
const grid = $("#grid");
const empty = $("#empty");
const q = $("#q");
const title = $("#titleCat");
const desc = $("#descCat");
const hero = $("#imgCat");
const count = $("#count");

// === 1) Leer parámetro ?cat=... ===
const params = new URLSearchParams(location.search);
const catKey = params.get("cat");

if (!catKey || !CATS[catKey]) {
  // Si no hay categoría válida, muestra mensaje simple:
  title.textContent = "Catálogo";
  desc.textContent = "Selecciona una categoría desde la página de inicio.";
  hero.alt = "Catálogo";
  grid.innerHTML = "";
  empty.classList.remove("hidden");
  count.textContent = "";
  throw new Error("Categoría no válida");
}

// Setear textos/imagen del hero:
title.textContent = CATS[catKey].nombre;
desc.textContent = CATS[catKey].desc;
hero.src = CATS[catKey].hero;
hero.alt = CATS[catKey].nombre;

// === 2) Filtrar productos por categoría ===
const productos = CATALOGO.filter(p => p.categoria === catKey);

// === 3) Render de tarjeta de producto ===
function cardProducto(p) {
  const li = document.createElement("li");
  li.className = "bg-white border rounded-xl p-3 opacity-0 translate-y-2 transition-all duration-300";

  const img = document.createElement("img");
  img.src = p.img;
  img.alt = p.titulo;
  img.loading = "lazy";
  img.className = "w-full h-40 object-cover rounded-lg mb-2";

  const h3 = document.createElement("h3");
  h3.className = "font-semibold";
  h3.textContent = p.titulo;

  const d = document.createElement("p");
  d.className = "text-sm text-slate-600 mt-1";
  d.textContent = p.descripcion;

  const price = document.createElement("p");
  price.className = "text-sm mt-2";
  price.innerHTML = `<strong>S/ ${p.precio}</strong>`;

  // CTA (puedes cambiar a “Agregar a carrito” si luego implementas)
  const cta = document.createElement("a");
  cta.href = `https://wa.me/51999999999?text=Quiero%20comprar:%20${encodeURIComponent(p.titulo)}`;
  cta.target = "_blank";
  cta.rel = "noopener";
  cta.className = "mt-3 inline-block rounded-lg border px-3 py-1.5 text-sm hover:bg-slate-50";
  cta.textContent = "Consultar";

  li.append(img, h3, d, price, cta);

  // Pequeña animación de entrada
  requestAnimationFrame(() => {
    li.classList.remove("opacity-0", "translate-y-2");
  });

  return li;
}

// === 4) Render inicial y buscador ===
let view = [...productos];

function render(list) {
  grid.innerHTML = "";
  if (!list.length) {
    empty.classList.remove("hidden");
    count.textContent = "0 resultados";
    return;
  }
  empty.classList.add("hidden");
  list.forEach(p => grid.append(cardProducto(p)));
  count.textContent = `${list.length} producto(s)`;
}

render(view);

// Búsqueda simple por título, descripción o tags
q.addEventListener("input", () => {
  const term = q.value.trim().toLowerCase();
  if (!term) return render(productos);

  const res = productos.filter(p => {
    const hayEnTitulo = p.titulo.toLowerCase().includes(term);
    const hayEnDesc = p.descripcion.toLowerCase().includes(term);
    const hayEnTags = (p.tags || []).some(t => t.toLowerCase().includes(term));
    return hayEnTitulo || hayEnDesc || hayEnTags;
  });
  render(res);
});
