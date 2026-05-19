/* ---------------------------------------------------------------
   week 10 — vestiaire collective × year dial
   Magnetic horizontal-scroll picker (Week 8 style).
   - Browse: years 1955→2026, every year a tick, every 10 a label.
   - PDP:    5 editorial-slide ticks (PRODUCT/CAMPAIGN/RUNWAY/PRESS/DETAIL).
   - Same drag → momentum → magnetic snap behavior.
--------------------------------------------------------------- */

// ---------- Data ----------------------------------------------------
// 63 Chanel bags spanning 1955–2025 — every year (with a few exceptions
// that fall back via nearestBag) has its own image. The 15 "significant"
// bags get full editorial PDP slides + a story; the rest are vintage
// fill-ins so the year-scrub feels rich on video.
// All images are real Vestiaire product photos (white-bg shoots).
// Year 2008 keeps the original Modern Chain webp (the demo hero — also
// PLP tile #2 in v2).
const BAGS = [
  { year: 1955, img: 'assets/bags/1955_255.jpg',              name: '2.55 · Lambskin',                  price: '€7,800' },
  { year: 1956, img: 'assets/bags/1956_pink-255.jpg',         name: '2.55 · Pink Cloth',                price: '€5,400' },
  { year: 1957, img: 'assets/bags/1957_brown-classique.jpg',  name: '11.12 · Brown Calfskin',           price: '€5,200' },
  { year: 1958, img: 'assets/bags/1958_gold-classique.jpg',   name: '11.12 · Gold Lamé',                price: '€6,100' },
  { year: 1959, img: 'assets/bags/1959_black-velvet.jpg',     name: 'Evening Clutch · Black Velvet',    price: '€2,800' },
  { year: 1960, img: 'assets/bags/1960_silk-31.jpg',          name: 'Vintage 31 · Black Silk',          price: '€3,200' },
  { year: 1961, img: 'assets/bags/1961_white-classique.jpg',  name: '11.12 · White Caviar',             price: '€5,400' },
  { year: 1962, img: 'assets/bags/1962_pink-woc-255.jpg',     name: '2.55 WOC · Pink Lambskin',         price: '€2,400' },
  { year: 1963, img: 'assets/bags/1963_yellow.jpg',           name: 'Vintage Flap · Yellow Leather',    price: '€3,100' },
  { year: 1964, img: 'assets/bags/1964_green.jpg',            name: 'Vintage Flap · Green Leather',     price: '€3,200' },
  { year: 1965, img: 'assets/bags/1965_red-trendy.jpg',       name: 'Trendy CC · Red Leather',          price: '€3,400' },
  { year: 1966, img: 'assets/bags/1966_green-suede.jpg',      name: 'Vintage Flap · Green Suede',       price: '€2,900' },
  { year: 1967, img: 'assets/bags/1967_brown-cc-chain.jpg',   name: 'CC Chain Vintage · Brown',         price: '€3,300' },
  { year: 1968, img: 'assets/bags/1968_black-patent.jpg',     name: 'Vintage Flap · Black Patent',      price: '€2,800' },
  { year: 1969, img: 'assets/bags/1969_navy-cc-chain.jpg',    name: 'CC Chain Vintage · Navy',          price: '€3,400' },
  { year: 1970, img: 'assets/bags/1970_blue-cc-chain.jpg',    name: 'CC Chain Vintage · Blue',          price: '€3,200' },
  { year: 1971, img: 'assets/bags/1971_brown-suede-a.jpg',    name: 'Vintage Flap · Brown Suede',       price: '€2,950' },
  { year: 1972, img: 'assets/bags/1972_black-wool.jpg',       name: 'Vintage Flap · Black Wool',        price: '€2,800' },
  { year: 1973, img: 'assets/bags/1973_beige.jpg',            name: 'Vintage Flap · Beige Leather',     price: '€2,750' },
  { year: 1974, img: 'assets/bags/1974_gold-syn.jpg',         name: 'Vintage Flap · Gold Synthetic',    price: '€2,400' },
  { year: 1975, img: 'assets/bags/1975_orange-31.jpg',        name: 'Vintage 31 · Orange',              price: '€2,600' },
  { year: 1976, img: 'assets/bags/1976_black-velvet-cc.jpg',  name: 'CC Chain Vintage · Black Velvet',  price: '€3,100' },
  { year: 1977, img: 'assets/bags/1977_camel-vinyl.jpg',      name: 'CC Chain Vintage · Camel Vinyl',   price: '€2,200' },
  { year: 1978, img: 'assets/bags/1978_pink-trendy.jpg',      name: 'Trendy CC · Pink Leather',         price: '€3,400' },
  { year: 1979, img: 'assets/bags/1979_white-trendy.jpg',     name: 'Trendy CC · White Leather',        price: '€3,300' },
  { year: 1980, img: 'assets/bags/1980_black-cc-chain.jpg',   name: 'CC Chain Vintage · Black',         price: '€3,200' },
  { year: 1981, img: 'assets/bags/1981_black-suede.jpg',      name: 'Vintage Flap · Black Suede',       price: '€2,950' },
  { year: 1982, img: 'assets/bags/1982_beige-trendy.jpg',     name: 'Trendy CC · Beige Leather',        price: '€3,200' },
  { year: 1983, img: 'assets/bags/1983_classic-flap.jpg',     name: 'Timeless Classic · Caviar',        price: '€5,400' },
  { year: 1984, img: 'assets/bags/1984_black-31.jpg',         name: 'Vintage 31 · Black',               price: '€2,800' },
  { year: 1985, img: 'assets/bags/1985_beige-cc-chain.jpg',   name: 'CC Chain Vintage · Beige',         price: '€3,100' },
  { year: 1986, img: 'assets/bags/1986_black-31-b.jpg',       name: 'Vintage 31 · Black Lambskin',      price: '€2,750' },
  { year: 1987, img: 'assets/bags/1987_pink-31.jpg',          name: 'Vintage 31 · Pink',                price: '€2,650' },
  { year: 1988, img: 'assets/bags/1988_black-patent-cc.jpg',  name: 'CC Chain · Black Patent',          price: '€3,200' },
  { year: 1989, img: 'assets/bags/1989_navy-cc-chain-b.jpg',  name: 'CC Chain Vintage · Navy',          price: '€3,300' },
  { year: 1990, img: 'assets/bags/1990_brown-suede-b.jpg',    name: 'Vintage Flap · Brown Suede',       price: '€2,900' },
  { year: 1991, img: 'assets/bags/1991_black.jpg',            name: 'Vintage Flap · Black Leather',     price: '€2,800' },
  { year: 1992, img: 'assets/bags/1992_vanity-case.jpg',      name: 'Vanity Case · Lambskin',           price: '€4,200' },
  { year: 1994, img: 'assets/bags/1994_supermodel.jpg',       name: 'Supermodel · Calfskin',            price: '€3,650' },
  { year: 1995, img: 'assets/bags/1995_diana.jpg',            name: 'Diana · Lambskin',                 price: '€2,950' },
  { year: 1996, img: 'assets/bags/1996_silver-clutch.jpg',    name: 'Evening Clutch · Silver',          price: '€2,400' },
  { year: 1997, img: 'assets/bags/1997_woc.jpg',              name: 'Wallet on Chain · Caviar',         price: '€2,400' },
  { year: 1998, img: 'assets/bags/1998_python-mademoiselle.jpg', name: 'Mademoiselle · Python',         price: '€3,800' },
  { year: 2003, img: 'assets/bags/2003_coco-cabas.jpg',       name: 'Coco Cabas · Denim',               price: '€3,400' },
  { year: 2004, img: 'assets/bags/2004_cambon.jpg',           name: 'Cambon · Lambskin',                price: '€2,800' },
  { year: 2005, img: 'assets/bags/2005_reissue-255.jpg',      name: 'Reissue 2.55 · Calfskin',          price: '€6,200' },
  { year: 2006, img: 'assets/bags/2006_paris-biarritz.jpg',   name: 'Paris-Biarritz · Canvas',          price: '€2,200' },
  { year: 2008, img: 'assets/bags/2008.webp',                 name: 'Modern Chain · Caviar',            price: '€3,100' },
  { year: 2009, img: 'assets/bags/2009_pearl-minaudiere.jpg', name: 'Pearl Minaudière · Silk',          price: '€3,400' },
  { year: 2011, img: 'assets/bags/2011_boy.jpg',              name: 'Boy · Denim Patchwork',            price: '€3,800' },
  { year: 2012, img: 'assets/bags/2012_perfect-edge.jpg',     name: 'Perfect Edge · Lambskin',          price: '€3,400' },
  { year: 2013, img: 'assets/bags/2013_hula-hoop.jpg',        name: 'Hula Hoop · Calfskin',             price: '€3,200' },
  { year: 2014, img: 'assets/bags/2014_graffiti.jpg',         name: 'Graffiti · Canvas',                price: '€4,400' },
  { year: 2015, img: 'assets/bags/2015_girl.jpg',             name: 'Girl · Lambskin',                  price: '€2,900' },
  { year: 2016, img: 'assets/bags/2016_urban-spirit.jpg',     name: 'Urban Spirit Backpack · Denim',    price: '€3,500' },
  { year: 2017, img: 'assets/bags/2017_gabrielle.jpg',        name: 'Gabrielle · Lambskin',             price: '€3,950' },
  { year: 2018, img: 'assets/bags/2018_31.jpg',               name: '31 · Lambskin',                    price: '€5,800' },
  { year: 2019, img: 'assets/bags/2019_19.jpg',               name: 'Chanel 19 · Goatskin',             price: '€5,400' },
  { year: 2020, img: 'assets/bags/2020_diamond.jpg',          name: 'Heart Mini · Metallic',            price: '€2,600' },
  { year: 2022, img: 'assets/bags/2022_22.jpg',               name: 'Chanel 22 · Calfskin',             price: '€5,200' },
  { year: 2023, img: 'assets/bags/2023_kelly.jpg',            name: 'Kelly · Caviar',                   price: '€6,800' },
  { year: 2024, img: 'assets/bags/2024_star.jpg',             name: 'Walk of Fame Star · Patent',       price: '€3,100' },
  { year: 2025, img: 'assets/bags/2025_25.jpg',               name: 'Chanel 25 · Denim',                price: '€5,900' },
];

const HERO_YEAR = 2008;

const DEFAULT_SLIDE_LABELS = ['Product', 'Campaign', 'Runway', 'Press', 'Detail'];

// Editorial slides per significant bag, sourced from Maison de Chanel CA.
// Slide 0 (Product) is always the bag itself — null here, handled by
// showEditorial. Slides 1+ are real archival / editorial / press imagery
// with captions verified by actually opening each image.
const EDITORIAL_CURATED = {
  1955: [
    null,
    { src: 'assets/editorial/1955_255_b.webp', label: 'Coco Chanel' },
    { src: 'assets/editorial/1955_255_a.jpg',  label: 'Press, 1961' },
    { src: 'assets/editorial/1955_255_c.jpg',  label: 'Tuileries, Paris' },
  ],
  1983: [
    null,
    { src: 'assets/editorial/1983_classicflap_a.jpg', label: 'Campaign' },
    { src: 'assets/editorial/1983_classicflap_c.jpg', label: 'Editorial' },
    { src: 'assets/editorial/1983_classicflap_b.jpg', label: 'Product detail' },
  ],
  1997: [
    null,
    { src: 'assets/editorial/1997_woc_a.jpeg', label: 'Archive' },
    { src: 'assets/editorial/1997_woc_c.jpg',  label: 'Editorial' },
  ],
  2005: [
    null,
    { src: 'assets/editorial/2005_reissue_b.jpg', label: 'Campaign' },
    { src: 'assets/editorial/2005_reissue_a.jpg', label: 'Runway detail' },
  ],
  2011: [
    null,
    { src: 'assets/editorial/2011_boy_b.webp', label: 'Runway A/W 2011' },
    { src: 'assets/editorial/2011_boy_a.jpg',  label: 'Archive' },
    { src: 'assets/editorial/2011_boy_c.jpg',  label: 'Product detail' },
    { src: 'assets/editorial/2011_boy_d.jpg',  label: 'Spring 2015 archive' },
  ],
  2019: [
    null,
    { src: 'assets/editorial/2019_19_a.jpg', label: 'Campaign' },
    { src: 'assets/editorial/2019_19_b.jpg', label: 'Editorial, Paris' },
    { src: 'assets/editorial/2019_19_c.jpg', label: 'Neon edition' },
  ],
  2022: [
    null,
    { src: 'assets/editorial/2022_22_a.jpg', label: 'London campaign' },
    { src: 'assets/editorial/2022_22_b.jpg', label: 'Studio campaign' },
    { src: 'assets/editorial/2022_22_c.jpg', label: 'Night campaign' },
  ],
  2025: [
    null,
    { src: 'assets/editorial/2025_25_dua.webp', label: 'Dua Lipa campaign' },
    { src: 'assets/editorial/2025_25_a.jpg',    label: 'Editorial' },
    // 2025_25_b dropped — relabel pass flagged it likely isn't the 25 bag
    { src: 'assets/editorial/2025_25_c.jpg',    label: 'Studio portrait' },
  ],
};

// Builds the slide list for a given bag year.
//   Slide 0           — Product (bag photo)
//   Slides 1..N       — Real editorial images (skipped if not curated)
//   Last slide        — Story (text card) if BAG_STORIES has this year
//
// Non-significant bags (no editorial, no story) → 1 slide (Product only).
// Significant bags with no editorial but with story → 2 slides.
// Significant bags with editorial + story → 2 + N slides.
function getSlidesFor(year) {
  const curated = EDITORIAL_CURATED[year] || [];
  const story = (typeof BAG_STORIES !== 'undefined') ? BAG_STORIES[year] : null;
  const slides = [{ type: 'product', label: 'Product' }];
  for (let i = 1; i < curated.length; i++) {
    const c = curated[i];
    if (c && c.src) slides.push({ type: 'image', src: c.src, label: c.label });
  }
  if (story) slides.push({ type: 'story', label: 'Story' });
  return slides;
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

  if (s.type === 'product') {
    hideStoryCard();
    const bag = BAGS.find(b => b.year === year) || lockedBag;
    const probe = new Image();
    probe.onload  = () => showImageURL(bag.img);
    probe.onerror = () => showImageURL(placeholderURI(bag));
    probe.src = bag.img;
  } else if (s.type === 'story') {
    showStoryCard(year);
  } else {
    hideStoryCard();
    const probe = new Image();
    probe.onload  = () => showImageURL(s.src);
    probe.onerror = () => showImageURL(editorialPlaceholderURI(s.label, year));
    probe.src = s.src;
  }
}

function showStoryCard(year) {
  const card = document.getElementById('storyCard');
  if (!card) return;
  const text = (typeof BAG_STORIES !== 'undefined') ? BAG_STORIES[year] : null;
  if (!text) return;
  card.textContent = text;
  card.scrollTop = 0;
  card.setAttribute('aria-hidden', 'false');
  document.body.dataset.slideType = 'story';
  // Hide the morph-clone (the bag image) — it's z-index 9999, so CSS
  // can't easily stack over it. Toggling its opacity inline is the
  // simplest way to let the story text stand alone.
  const clone = document.getElementById('morphClone');
  if (clone) {
    clone.style.transition = 'opacity 260ms var(--easing)';
    clone.style.opacity = '0';
  }
}

function hideStoryCard() {
  const card = document.getElementById('storyCard');
  if (card) card.setAttribute('aria-hidden', 'true');
  if (document.body.dataset.slideType === 'story') {
    document.body.dataset.slideType = '';
  }
  const clone = document.getElementById('morphClone');
  if (clone && clone.classList.contains('is-active')) {
    clone.style.transition = 'opacity 260ms var(--easing)';
    clone.style.opacity = '1';
  }
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

  hideStoryCard();

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
