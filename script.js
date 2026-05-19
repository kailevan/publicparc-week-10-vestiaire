/* ---------------------------------------------------------------
   week 10 — vestiaire collective × year dial
   Magnetic horizontal-scroll picker (Week 8 style).
   - Browse: years 1955→2026, every year a tick, every 10 a label.
   - PDP:    5 editorial-slide ticks (PRODUCT/CAMPAIGN/RUNWAY/PRESS/DETAIL).
   - Same drag → momentum → magnetic snap behavior.
--------------------------------------------------------------- */

// ---------- Data ----------------------------------------------------
// The 15 significant Chanel bags, sourced from real Vestiaire product
// photos (white-bg shoots). Year 2008 keeps the original Modern Chain
// webp (the demo hero — matches PLP tile #2).
const BAGS = [
  { year: 1955, img: 'assets/bags/1955_255.jpg',          name: '2.55 · Lambskin',           price: '€7,800' },
  { year: 1983, img: 'assets/bags/1983_classic-flap.jpg', name: 'Timeless Classic · Caviar', price: '€5,400' },
  { year: 1992, img: 'assets/bags/1992_vanity-case.jpg',  name: 'Vanity Case · Lambskin',    price: '€4,200' },
  { year: 1994, img: 'assets/bags/1994_supermodel.jpg',   name: 'Supermodel · Calfskin',     price: '€3,650' },
  { year: 1997, img: 'assets/bags/1997_woc.jpg',          name: 'Wallet on Chain · Caviar',  price: '€2,400' },
  { year: 2005, img: 'assets/bags/2005_reissue-255.jpg',  name: 'Reissue 2.55 · Calfskin',   price: '€6,200' },
  { year: 2008, img: 'assets/bags/2008.webp',             name: 'Modern Chain · Caviar',     price: '€3,100' },
  { year: 2011, img: 'assets/bags/2011_boy.jpg',          name: 'Boy · Denim Patchwork',     price: '€3,800' },
  { year: 2014, img: 'assets/bags/2014_graffiti.jpg',     name: 'Graffiti · Canvas',         price: '€4,400' },
  { year: 2017, img: 'assets/bags/2017_gabrielle.jpg',    name: 'Gabrielle · Lambskin',      price: '€3,950' },
  { year: 2018, img: 'assets/bags/2018_31.jpg',           name: '31 · Lambskin',             price: '€5,800' },
  { year: 2019, img: 'assets/bags/2019_19.jpg',           name: 'Chanel 19 · Goatskin',      price: '€5,400' },
  { year: 2022, img: 'assets/bags/2022_22.jpg',           name: 'Chanel 22 · Calfskin',      price: '€5,200' },
  { year: 2023, img: 'assets/bags/2023_kelly.jpg',        name: 'Kelly · Caviar',            price: '€6,800' },
  { year: 2025, img: 'assets/bags/2025_25.jpg',           name: 'Chanel 25 · Denim',         price: '€5,900' },
];

const HERO_YEAR = 2008;

const DEFAULT_SLIDE_LABELS = ['Product', 'Campaign', 'Runway', 'Press', 'Detail'];

// Editorial slides per significant bag, sourced from Maison de Chanel CA.
// Slide 0 (Product) is always the bag itself — null here, handled by
// showEditorial. Slides 1+ are real archival / editorial / press imagery.
const EDITORIAL_CURATED = {
  1955: [
    null,
    { src: 'assets/editorial/1955_255_b.webp', label: 'Coco' },
    { src: 'assets/editorial/1955_255_a.jpg',  label: 'Press' },
    { src: 'assets/editorial/1955_255_c.jpg',  label: 'Editorial' },
  ],
  1983: [
    null,
    { src: 'assets/editorial/1983_classicflap_a.jpg', label: 'Campaign' },
    { src: 'assets/editorial/1983_classicflap_b.jpg', label: 'Press' },
    { src: 'assets/editorial/1983_classicflap_c.jpg', label: 'Detail' },
  ],
  1997: [
    null,
    { src: 'assets/editorial/1997_woc_a.jpeg', label: 'Campaign' },
    { src: 'assets/editorial/1997_woc_c.jpg',  label: 'Editorial' },
  ],
  2005: [
    null,
    { src: 'assets/editorial/2005_reissue_a.jpg', label: 'Detail' },
    { src: 'assets/editorial/2005_reissue_b.jpg', label: 'Press' },
  ],
  2011: [
    null,
    { src: 'assets/editorial/2011_boy_a.jpg',  label: 'Campaign' },
    { src: 'assets/editorial/2011_boy_b.webp', label: 'Runway' },
    { src: 'assets/editorial/2011_boy_c.jpg',  label: 'Press' },
    { src: 'assets/editorial/2011_boy_d.jpg',  label: 'Detail' },
  ],
  2019: [
    null,
    { src: 'assets/editorial/2019_19_a.jpg', label: 'Campaign' },
    { src: 'assets/editorial/2019_19_b.jpg', label: 'Runway' },
    { src: 'assets/editorial/2019_19_c.jpg', label: 'Detail' },
  ],
  2022: [
    null,
    { src: 'assets/editorial/2022_22_a.jpg', label: 'Campaign' },
    { src: 'assets/editorial/2022_22_b.jpg', label: 'Runway' },
    { src: 'assets/editorial/2022_22_c.jpg', label: 'Detail' },
  ],
  2025: [
    null,
    { src: 'assets/editorial/2025_25_dua.webp', label: 'Dua Lipa' },
    { src: 'assets/editorial/2025_25_a.jpg',    label: 'Campaign' },
    { src: 'assets/editorial/2025_25_b.jpg',    label: 'Press' },
    { src: 'assets/editorial/2025_25_c.jpg',    label: 'Detail' },
  ],
};

// Editorial slides per bag year. Slide 0 (Product) is always the bag
// itself — handled in showEditorial. Slides 1-4 fall back to dark
// typographic editorial cards (label + year, italic serif) so the
// editorial layer is visually distinct from bag product photography.
function getSlidesFor(year) {
  const curated = EDITORIAL_CURATED[year] || [];
  return DEFAULT_SLIDE_LABELS.map((label, i) => {
    if (curated[i]) return curated[i];
    return { src: editorialPlaceholderURI(label, year), label };
  });
}

const YEAR_MIN = 1955;
const YEAR_MAX = 2026;
const PX_PER_YEAR  = 18;   // browse tick spacing
const PX_PER_SLIDE = 80;   // PDP tick spacing

// ---------- DOM refs ------------------------------------------------
const app        = document.querySelector('.app');
const yearEl     = document.querySelector('.year');
const bagNameEl  = document.querySelector('.bagname');
const strip      = document.getElementById('strip');
const stripBrowse = document.getElementById('stripBrowse');
const stripPdp    = document.getElementById('stripPdp');
const bagLayer   = document.getElementById('bagLayer');
const imgA       = bagLayer.querySelector('.bag__img--a');
const imgB       = bagLayer.querySelector('.bag__img--b');
const backBtn    = document.querySelector('.back');
const buyPrice   = document.querySelector('.buybar__price');

// ---------- State ---------------------------------------------------
let mode = 'browse';          // 'browse' | 'pdp'
let browseTx = 0;             // browse-rail translateX
let pdpTx = 0;                // pdp-rail translateX
let yearF = YEAR_MIN;
let slideIdx = 0;
let lockedBag = null;

// Convenience: read/write the active rail's transform.
function getActiveTx() { return mode === 'browse' ? browseTx : pdpTx; }
function setActiveTx(v) {
  if (mode === 'browse') { browseTx = v; stripBrowse.style.transform = `translateX(${v}px)`; }
  else                   { pdpTx    = v; stripPdp.style.transform    = `translateX(${v}px)`; }
}

let frontLayer = 'a';
let lastBagShown = null;
let lastEditorialShown = null;

let dragging = false;
let dragStartX = 0;
let dragStartTx = 0;
let velocitySamples = [];     // {x, t} for momentum velocity
let momentumRAF = null;
let snapRAF = null;

// ---------- Helpers -------------------------------------------------
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const easeOutCubic = t => 1 - Math.pow(1 - t, 3);

function stripCenter() { return strip.clientWidth / 2; }

function txForYear(yf) {
  return stripCenter() - (yf - YEAR_MIN) * PX_PER_YEAR;
}
function yearForTx(tx) {
  return YEAR_MIN + (stripCenter() - tx) / PX_PER_YEAR;
}
function txMinBrowse() { return stripCenter() - (YEAR_MAX - YEAR_MIN) * PX_PER_YEAR; }
function txMaxBrowse() { return stripCenter(); }

function txForSlide(i) {
  return stripCenter() - i * PX_PER_SLIDE;
}
function slideForTx(tx, n) {
  return clamp((stripCenter() - tx) / PX_PER_SLIDE, 0, n - 1);
}
function txMinPdp(n) { return stripCenter() - (n - 1) * PX_PER_SLIDE; }
function txMaxPdp()  { return stripCenter(); }

function clampTx(tx) {
  if (mode === 'browse') return clamp(tx, txMinBrowse(), txMaxBrowse());
  const n = lockedBag ? getSlidesFor(lockedBag.year).length : 1;
  return clamp(tx, txMinPdp(n), txMaxPdp());
}

function nearestBag(year) {
  let chosen = BAGS[0];
  for (const b of BAGS) {
    if (b.year <= year) chosen = b; else break;
  }
  return chosen;
}

// ---------- Placeholders -------------------------------------------
function placeholderURI(bag) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet">
      <rect width="400" height="400" fill="#f6f4ef"/>
      <g fill="#1a1a1a" font-family="Georgia, serif">
        <text x="200" y="195" text-anchor="middle" font-size="64" font-weight="400">${bag.year}</text>
      </g>
      <g fill="#888" font-family="Helvetica, sans-serif" font-size="11" letter-spacing="1.2">
        <text x="200" y="225" text-anchor="middle">${bag.name.toUpperCase()}</text>
      </g>
    </svg>`;
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

function editorialPlaceholderURI(label, year) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet">
      <rect width="400" height="400" fill="#0d0d0d"/>
      <g fill="#f1efe9" font-family="Georgia, 'Times New Roman', serif">
        <text x="200" y="195" text-anchor="middle" font-size="34" font-weight="400" font-style="italic">${label}</text>
        <text x="200" y="235" text-anchor="middle" font-size="11" letter-spacing="6" font-family="Helvetica, Arial, sans-serif">${year}</text>
      </g>
    </svg>`;
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

// ---------- Image display ------------------------------------------
// Updates BOTH the legacy .bag__img--a/--b layers (kept for layout
// continuity even though they're forced opacity 0 by CSS) AND the
// morph-clone img — which is the bag image the user actually sees in
// browse / PDP after entering from the PLP.
function showImageURL(url) {
  // Legacy crossfade (invisible — bag__imgs are forced opacity 0 in CSS
  // by .bag__img--a/--b override, but we keep this wired so the original
  // dual-layer logic is intact if we ever re-enable them).
  const front = frontLayer === 'a' ? imgA : imgB;
  const back  = frontLayer === 'a' ? imgB : imgA;
  if (front.dataset.url !== url) {
    back.onload = () => {
      back.classList.add('is-visible');
      front.classList.remove('is-visible');
      frontLayer = frontLayer === 'a' ? 'b' : 'a';
    };
    back.dataset.url = url;
    back.onerror = null;
    back.src = url;
  }

  // The morph-clone img is the visible bag during browse / PDP.
  // Update it on every showImageURL call.
  const stageImg = document.querySelector('#morphClone img');
  if (stageImg && stageImg.src !== url) {
    stageImg.src = url;
  }
}

function showBag(bag) {
  if (lastBagShown === bag.year) return;
  lastBagShown = bag.year;
  const probe = new Image();
  probe.onload  = () => showImageURL(bag.img);
  probe.onerror = () => showImageURL(placeholderURI(bag));
  probe.src = bag.img;
}

function showEditorial(year, idx) {
  if (lastEditorialShown === idx) return;
  lastEditorialShown = idx;
  const slides = getSlidesFor(year);
  const s = slides[idx];
  if (!s) return;
  if (idx === 0) {
    const bag = BAGS.find(b => b.year === year) || lockedBag;
    const probe = new Image();
    probe.onload  = () => showImageURL(bag.img);
    probe.onerror = () => showImageURL(placeholderURI(bag));
    probe.src = bag.img;
    return;
  }
  const probe = new Image();
  probe.onload  = () => showImageURL(s.src);
  probe.onerror = () => showImageURL(editorialPlaceholderURI(s.label, year));
  probe.src = s.src;
}

// ---------- Strip building -----------------------------------------
function buildBrowseStrip() {
  stripBrowse.innerHTML = '';
  for (let y = YEAR_MIN; y <= YEAR_MAX; y++) {
    const t = document.createElement('div');
    const isMajor = y % 10 === 0 || y === YEAR_MIN || y === YEAR_MAX;
    t.className = 'tick' + (isMajor ? ' tick--major' : '');
    t.style.left = `${(y - YEAR_MIN) * PX_PER_YEAR}px`;
    if (isMajor) {
      const lbl = document.createElement('span');
      lbl.className = 'tick__label';
      lbl.textContent = y;
      t.appendChild(lbl);
    }
    stripBrowse.appendChild(t);
  }
  stripBrowse.style.width = `${(YEAR_MAX - YEAR_MIN) * PX_PER_YEAR + 2}px`;
}

function buildPdpStrip(year) {
  stripPdp.innerHTML = '';
  const slides = getSlidesFor(year);
  slides.forEach((s, i) => {
    const t = document.createElement('div');
    t.className = 'tick tick--editorial';
    t.style.left = `${i * PX_PER_SLIDE}px`;
    const lbl = document.createElement('span');
    lbl.className = 'tick__label';
    lbl.textContent = s.label;
    t.appendChild(lbl);
    stripPdp.appendChild(t);
  });
  stripPdp.style.width = `${(slides.length - 1) * PX_PER_SLIDE + 2}px`;
}

// ---------- Sync state from rail position --------------------------
function syncFromTx() {
  const tx = getActiveTx();
  if (mode === 'browse') {
    yearF = clamp(yearForTx(tx), YEAR_MIN, YEAR_MAX);
    const yi = Math.round(yearF);
    yearEl.textContent = yi;
    strip.setAttribute('aria-valuenow', String(yi));
    const bag = nearestBag(yi);
    showBag(bag);
    bagNameEl.textContent = bag.name;
    buyPrice.textContent = bag.price;
  } else {
    if (!lockedBag) return;
    const slides = getSlidesFor(lockedBag.year);
    const idxF = slideForTx(tx, slides.length);
    slideIdx = Math.round(idxF);
    showEditorial(lockedBag.year, slideIdx);
  }
}

function setYear(yf, animate = false) {
  yearF = clamp(yf, YEAR_MIN, YEAR_MAX);
  if (animate) {
    animateTxTo(txForYear(yearF), 280);
  } else {
    setActiveTx(txForYear(yearF));
    syncFromTx();
  }
}

function setSlide(idx, animate = false) {
  if (!lockedBag) return;
  const slides = getSlidesFor(lockedBag.year);
  const i = clamp(Math.round(idx), 0, slides.length - 1);
  slideIdx = i;
  if (animate) {
    animateTxTo(txForSlide(i), 280);
  } else {
    setActiveTx(txForSlide(i));
    syncFromTx();
  }
}

// ---------- Animated transitions -----------------------------------
function cancelAnims() {
  if (momentumRAF) { cancelAnimationFrame(momentumRAF); momentumRAF = null; }
  if (snapRAF)     { cancelAnimationFrame(snapRAF);     snapRAF = null; }
}

function animateTxTo(targetTx, duration) {
  cancelAnims();
  const startTx = getActiveTx();
  const startT = performance.now();
  function frame(now) {
    const t = Math.min(1, (now - startT) / duration);
    setActiveTx(startTx + (targetTx - startTx) * easeOutCubic(t));
    syncFromTx();
    if (t < 1) snapRAF = requestAnimationFrame(frame);
    else snapRAF = null;
  }
  snapRAF = requestAnimationFrame(frame);
}

function snapToNearest() {
  let targetTx;
  if (mode === 'browse') {
    const yi = Math.round(yearForTx(getActiveTx()));
    targetTx = txForYear(clamp(yi, YEAR_MIN, YEAR_MAX));
  } else {
    const n = getSlidesFor(lockedBag.year).length;
    const i = Math.round(slideForTx(getActiveTx(), n));
    targetTx = txForSlide(i);
  }
  animateTxTo(targetTx, 280);
}

function startMomentum(vPxPerMs) {
  cancelAnims();
  let v = vPxPerMs;
  let last = performance.now();
  const friction = 0.94;
  function frame(now) {
    const dt = now - last;
    last = now;
    setActiveTx(clampTx(getActiveTx() + v * dt));
    syncFromTx();
    v *= Math.pow(friction, dt / 16);
    if (Math.abs(v) < 0.04) {
      momentumRAF = null;
      snapToNearest();
      return;
    }
    momentumRAF = requestAnimationFrame(frame);
  }
  momentumRAF = requestAnimationFrame(frame);
}

// ---------- Pointer drag -------------------------------------------
function onPointerDown(e) {
  cancelAnims();
  dragging = true;
  dragStartX = e.clientX;
  dragStartTx = getActiveTx();
  velocitySamples = [{ x: e.clientX, t: performance.now() }];
  strip.setPointerCapture(e.pointerId);
}

function onPointerMove(e) {
  if (!dragging) return;
  const dx = e.clientX - dragStartX;
  setActiveTx(clampTx(dragStartTx + dx));
  syncFromTx();
  velocitySamples.push({ x: e.clientX, t: performance.now() });
  const cutoff = performance.now() - 80;
  while (velocitySamples.length > 2 && velocitySamples[0].t < cutoff) velocitySamples.shift();
}

function onPointerUp(e) {
  if (!dragging) return;
  dragging = false;
  try { strip.releasePointerCapture(e.pointerId); } catch(_) {}
  // Compute velocity from recent samples
  if (velocitySamples.length >= 2) {
    const a = velocitySamples[0];
    const b = velocitySamples[velocitySamples.length - 1];
    const dt = b.t - a.t;
    const v = dt > 0 ? (b.x - a.x) / dt : 0; // px/ms
    if (Math.abs(v) > 0.25) {
      startMomentum(v);
      return;
    }
  }
  snapToNearest();
}

strip.addEventListener('pointerdown', onPointerDown);
strip.addEventListener('pointermove', onPointerMove);
strip.addEventListener('pointerup', onPointerUp);
strip.addEventListener('pointercancel', onPointerUp);

// ---------- Mode transitions ---------------------------------------
// browse → PDP morph is a coordinated 600ms cascade:
//   0ms:    bag click registers
//   0-250:  header + bagname fade out
//   50-550: bag image grows, year shrinks
//   140-460: strip rails crossfade (browse out, pdp in)
//   280-580: back arrow + buy bar slide in
function enterPDP() {
  if (mode === 'pdp') return;
  const yi = Math.round(yearF);
  lockedBag = nearestBag(yi);

  // Prepare the PDP rail BEFORE flipping mode so it's painted at slide 0
  buildPdpStrip(lockedBag.year);
  slideIdx = 0;
  lastEditorialShown = null;
  pdpTx = txForSlide(0);
  stripPdp.style.transform = `translateX(${pdpTx}px)`;

  // Now flip mode — CSS transitions everything in sync
  mode = 'pdp';
  app.dataset.mode = 'pdp';

  yearEl.textContent = lockedBag.year;
  buyPrice.textContent = lockedBag.price;
  bagNameEl.textContent = lockedBag.name;

  // slide 0 = product hero, which is the same bag image, so no jarring image swap
  showEditorial(lockedBag.year, 0);
}

function exitPDP() {
  if (mode === 'browse') return;
  const restoreYear = lockedBag ? lockedBag.year : YEAR_MIN;
  lockedBag = null;
  mode = 'browse';
  app.dataset.mode = 'browse';

  // The browse rail is still positioned where the user left it before tapping
  // the bag (browseTx didn't change). But yearF might be different from
  // restoreYear (user dragged to 1997 → entered PDP at 1996). Re-sync.
  lastBagShown = null;
  setYear(restoreYear);
}

bagLayer.addEventListener('click', () => { if (mode === 'browse') enterPDP(); });
backBtn.addEventListener('click', exitPDP);

// ---------- Keyboard ------------------------------------------------
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mode === 'pdp') exitPDP();
  if (mode === 'browse') {
    if (e.key === 'ArrowLeft')  setYear(Math.round(yearF) - 1, true);
    if (e.key === 'ArrowRight') setYear(Math.round(yearF) + 1, true);
  } else {
    if (e.key === 'ArrowLeft')  setSlide(slideIdx - 1, true);
    if (e.key === 'ArrowRight') setSlide(slideIdx + 1, true);
  }
});

// ---------- Init / resize ------------------------------------------
function init() {
  buildBrowseStrip();
  setYear(2008);
}

window.addEventListener('load', init);
window.addEventListener('resize', () => {
  if (mode === 'browse') setYear(yearF);
  else setSlide(slideIdx);
});

// Expose for cross-script coordination with plp.js (PLP→prototype morph)
window.protoApi = {
  setYear,                 // (year, animate?) → jumps prototype to a year
  exitPDP,                 // (no-op if already in browse)
  enterBrowse() {
    if (mode === 'pdp') exitPDP();
    setYear(yearF);        // re-center after potential layout change
  },
  getBagEl() { return bagLayer; },
  getYearEl() { return yearEl; },
};
