/* ---------------------------------------------------------------
   week 10 — PLP (chanel bag search results, Vestiaire 1:1)
   - Populates 18-card product grid from Figma data
   - Heart toggle
   - PLP → prototype morph: tile becomes the bag in the year-dial
     prototype, with the selected bag's year as the landing year.
--------------------------------------------------------------- */

const PRODUCTS = [
  { id: '01', img: 'assets/plp/01.jpg', name: 'Timeless/Classique leather clutch bag', price: '$363', location: 'United States', year: 1995 },
  { id: '02', img: 'assets/bags/2008.webp', name: 'Modern Chain leather handbag',     price: '$3,100', location: 'United States', year: 2008 },
  { id: '03', img: 'assets/plp/03.jpg', name: 'Wallet On Chain Double C leather crossbody bag', price: '$920', location: 'United States', year: 2014 },
  { id: '04', img: 'assets/plp/04.jpg', name: 'Timeless/Classique leather crossbody bag', price: '$1,898', location: 'United States', year: 1983 },
  { id: '05', img: 'assets/plp/05.jpg', name: 'Handbag',                                  price: '$736', location: 'United States', year: 1999 },
  { id: '06', img: 'assets/plp/06.jpg', name: 'Leather tote',                             price: '$807', location: 'United States', year: 2003 },
  { id: '07', img: 'assets/plp/07.jpg', name: 'Leather handbag',                          price: '$1,570', location: 'United States', year: 1990 },
  { id: '08', img: 'assets/plp/08.jpg', name: 'Coco Handle leather handbag',              price: '$2,577', location: 'United States', year: 2017, tag: 'vintage' },
  { id: '09', img: 'assets/plp/09.jpg', name: 'Bowling Bag cloth handbag',                price: '$748', location: 'United States', year: 1994, tag: 'vintage' },
  { id: '10', img: 'assets/plp/10.jpg', name: 'Petite Shopping Tote leather tote',        price: '$916', location: 'United States', year: 1996, tag: 'vintage' },
  { id: '11', img: 'assets/plp/11.jpg', name: 'Grand shopping handbag',                   price: '$728', location: 'United States', year: 2003, tag: 'vintage' },
  { id: '12', img: 'assets/plp/12.jpg', name: 'Wallet On Chain Boy leather crossbody bag', price: '$748', location: 'United States', year: 2011 },
  { id: '13', img: 'assets/plp/13.jpg', name: 'Tote',                                     price: '$408', location: 'United States', year: 2021 },
  { id: '14', img: 'assets/plp/14.jpg', name: '2.55 leather handbag',                     price: '$1,610', location: 'United States', year: 1955 },
  { id: '15', img: 'assets/plp/15.jpg', name: 'Wallet On Chain Cambon leather crossbody bag', price: '$909', location: 'United States', year: 2019 },
  { id: '16', img: 'assets/plp/16.jpg', name: 'Timeless/Classique leather handbag',       price: '$4,300', location: 'United States', year: 2023 },
  { id: '17', img: 'assets/plp/17.jpg', name: '2.55 leather handbag',                     price: '$1,725', location: 'United States', year: 2026 },
  { id: '18', img: 'assets/plp/18.jpg', name: 'Leather handbag',                          price: '$837', location: 'United States', year: 2026 },
];

const LEAF_SVG       = `<svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="#1f7a4f" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="M3 13 C3 7 7 3 13 3 C13 9 9 13 3 13 Z M5 11 L11 5"/></svg>`;
const HEART_SVG      = `<svg viewBox="0 0 24 24" width="20" height="18" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21 C8 18 3 14 3 9 A4 4 0 0 1 12 7 A4 4 0 0 1 21 9 C21 14 16 18 12 21 Z"/></svg>`;
const HEART_FILLED_SVG = `<svg viewBox="0 0 24 24" width="20" height="18" fill="currentColor" stroke="none"><path d="M12 21 C8 18 3 14 3 9 A4 4 0 0 1 12 7 A4 4 0 0 1 21 9 C21 14 16 18 12 21 Z"/></svg>`;

// ---------- Build grid -------------------------------------------
const grid = document.getElementById('plpGrid');
if (grid) {
  PRODUCTS.forEach(p => {
    const li = document.createElement('li');
    li.className = 'card';
    li.dataset.productId = p.id;
    li.dataset.year = p.year;
    li.dataset.bagName = p.name;
    li.innerHTML = `
      <div class="card__media">
        <img class="card__img" src="${p.img}" alt="${p.name}" loading="lazy" />
        <button class="card__heart" type="button" aria-label="Add to favorites">${HEART_SVG}</button>
      </div>
      <div class="card__details">
        <div class="card__name-wrap">
          <span class="card__brand">CHANEL</span>
          <span class="card__name">${p.name}</span>
        </div>
        <span class="card__price">${p.price}</span>
        <span class="card__location">${LEAF_SVG}<span>${p.location}</span></span>
      </div>
    `;
    grid.appendChild(li);
  });
}

// ---------- Chip thumbnails --------------------------------------
document.querySelectorAll('.chip__thumb').forEach(t => {
  const id = t.dataset.thumb;
  if (id) t.style.backgroundImage = `url('assets/plp/${id}.jpg')`;
});

// ---------- Heart toggle -----------------------------------------
if (grid) {
  grid.addEventListener('click', (e) => {
    const heart = e.target.closest('.card__heart');
    if (!heart) return;
    e.preventDefault();
    e.stopPropagation();
    const active = heart.classList.toggle('is-active');
    heart.innerHTML = active ? HEART_FILLED_SVG : HEART_SVG;
  }, true);
}

// ---------- Morph: tile → prototype bag --------------------------
const morphClone = document.getElementById('morphClone');
const morphCloneImg = morphClone ? morphClone.querySelector('img') : null;

/* ---------------------------------------------------------------
   Morph choreography — 3 strict phases, no overlap, premium feel.
   The image is the only thing that visibly moves; everything around
   it turns white first, then the image expands, then the prototype
   UI fades in. Only the Vestiaire logo persists throughout.

   Timeline (ms):
     0   …  350   PLP elements + tile background fade to white.
                  Prototype hdr (logo) cross-fades in.
                  Clone is locked at tile rect, white background.
     350 …  1100  Clone expands from tile rect → bag rect.
                  Nothing else changes. Ease-out-quint.
     1100         Switch state → browse. Year, bagname, strip start
                  their delayed opacity transitions (fade in).
     1100 …  1400 Prototype UI reveals.
     1180 …  1430 Clone fades out, underlying bag image is exposed
                  (identical image, same position — no visible swap).
--------------------------------------------------------------- */
const T_FADE_PLP      = 350;          // phase 1 duration
const T_EXPAND        = 750;          // phase 2 duration (clone expansion)
const T_BUFFER        = 60;           // small breath at the top of phase 3
const T_TOTAL         = T_FADE_PLP + T_EXPAND + 500;
const EASE_EXPAND     = 'cubic-bezier(0.16, 1, 0.3, 1)';  // ease-out-quint, premium deceleration

function lockBodyScroll() {
  document.documentElement.style.overflow = 'hidden';
  document.body.style.overflow = 'hidden';
}
function unlockBodyScroll() {
  document.documentElement.style.overflow = '';
  document.body.style.overflow = '';
}

// Source tile remembered across browse mode, so we can morph BACK into
// it when the user hits .plp-back.
let sourceTile = null;

function morphTileToPrototype(tile) {
  if (!morphClone || !window.protoApi) return;
  const tileImg = tile.querySelector('.card__img');
  if (!tileImg) return;
  const imgSrc = tileImg.currentSrc || tileImg.src;
  const year = parseInt(tile.dataset.year, 10) || 2008;
  const bagName = tile.dataset.bagName || '';

  sourceTile = tile;

  // Capture start rect (the tile's image on screen)
  const startRect = tileImg.getBoundingClientRect();

  // Mark the source tile (CSS hides its image/heart/details cleanly)
  tile.classList.add('card--is-source');

  // Switch into morphing state — makes prototype DOM lay out so we can
  // measure the .bag's eventual screen rect.
  document.body.dataset.state = 'morphing';
  lockBodyScroll();

  // Pre-warm prototype: year, bag name text. (We do NOT touch .bag__img
  // anymore — the clone IS the bag from here on. Internal .bag__img--a/b
  // are forced opacity 0 by CSS so they never compete with the clone.)
  window.protoApi.setYear(year);
  const bagLayer = window.protoApi.getBagEl();
  const bagnameEl = document.querySelector('.bagname');
  if (bagnameEl) bagnameEl.textContent = bagName;

  // Measure the bag's eventual screen rect (target)
  const targetRect = bagLayer.getBoundingClientRect();

  // Position the clone at the tile rect, cream background to match PLP card
  morphCloneImg.src = imgSrc;
  morphClone.style.transition = 'none';
  morphClone.style.left   = `${startRect.left}px`;
  morphClone.style.top    = `${startRect.top}px`;
  morphClone.style.width  = `${startRect.width}px`;
  morphClone.style.height = `${startRect.height}px`;
  morphClone.style.opacity = '1';
  morphClone.style.background = '#f1efe9';
  morphClone.classList.add('is-active');
  void morphClone.offsetWidth;

  // PHASE 1 (0–T_FADE_PLP): fade clone background cream → white in
  // lockstep with PLP and source tile turning white.
  requestAnimationFrame(() => {
    morphClone.style.transition = `background ${T_FADE_PLP}ms ease`;
    morphClone.style.background = '#ffffff';
  });

  // PHASE 2: at T_FADE_PLP, expand the clone to the target rect.
  setTimeout(() => {
    morphClone.style.transition = [
      `left ${T_EXPAND}ms ${EASE_EXPAND}`,
      `top ${T_EXPAND}ms ${EASE_EXPAND}`,
      `width ${T_EXPAND}ms ${EASE_EXPAND}`,
      `height ${T_EXPAND}ms ${EASE_EXPAND}`,
    ].join(', ');
    morphClone.style.left   = `${targetRect.left}px`;
    morphClone.style.top    = `${targetRect.top}px`;
    morphClone.style.width  = `${targetRect.width}px`;
    morphClone.style.height = `${targetRect.height}px`;
  }, T_FADE_PLP);

  // PHASE 3: when clone has fully landed, flip state to browse.
  // CSS reveals year / bagname / strip via their own transitions.
  // The clone STAYS visible — it's the bag from now on. No handoff.
  setTimeout(() => {
    document.body.dataset.state = 'browse';
    // After morph the clone sits over the prototype's .bag rect. Lock
    // its transition so future src changes don't accidentally animate.
    morphClone.style.transition = 'none';
  }, T_FADE_PLP + T_EXPAND + T_BUFFER);
}

// Reverse morph: back to PLP. The clone shrinks to the source element's
// rect (tile image or chip thumb), then fades out.
function morphPrototypeToPlp() {
  if (!sourceTile || !morphClone) {
    document.body.dataset.state = 'plp';
    unlockBodyScroll();
    sourceTile = null;
    return;
  }
  const source = sourceTile;
  const isChip   = source.classList.contains('chip');
  const isFilter = source.classList.contains('hot-filter');
  const sourceEl = isChip   ? source.querySelector('.chip__thumb')
                : isFilter  ? source                  // the button itself
                            : source.querySelector('.card__img');
  if (!sourceEl) {
    document.body.dataset.state = 'plp';
    unlockBodyScroll();
    sourceTile = null;
    return;
  }

  // Flip state→plp so the source's layout is restored, then measure.
  document.body.dataset.state = 'plp';
  unlockBodyScroll();
  void source.offsetWidth;
  const endRect = sourceEl.getBoundingClientRect();

  // Reverse animation — shrink to source rect; re-morph shape back to
  // whatever the source's natural shape was (circle / pill / square).
  const endRadius = isChip   ? '50%'
                  : isFilter ? `${endRect.height / 2}px`
                  : '0';
  const endBg     = isChip   ? '#111'
                  : isFilter ? '#ffffff'
                  : '#f1efe9';

  morphClone.style.transition = [
    `left ${T_EXPAND}ms ${EASE_EXPAND}`,
    `top ${T_EXPAND}ms ${EASE_EXPAND}`,
    `width ${T_EXPAND}ms ${EASE_EXPAND}`,
    `height ${T_EXPAND}ms ${EASE_EXPAND}`,
    `border-radius ${T_EXPAND}ms ${EASE_EXPAND}`,
    `background ${T_FADE_PLP}ms ease`,
  ].join(', ');
  morphClone.style.background = endBg;
  morphClone.style.borderRadius = endRadius;
  morphClone.style.left   = `${endRect.left}px`;
  morphClone.style.top    = `${endRect.top}px`;
  morphClone.style.width  = `${endRect.width}px`;
  morphClone.style.height = `${endRect.height}px`;

  setTimeout(() => {
    source.classList.remove('card--is-source');
    source.classList.remove('chip--is-source');
    source.classList.remove('hot-filter--is-source');
    morphClone.style.transition = 'opacity 200ms ease';
    morphClone.style.opacity = '0';
  }, T_EXPAND);

  setTimeout(() => {
    morphClone.classList.remove('is-active');
    morphClone.style.transition = '';
    morphClone.style.opacity = '';
    morphClone.style.background = '';
    morphClone.style.borderRadius = '';
    sourceTile = null;
  }, T_EXPAND + 250);
}

// Keep clone aligned with the .bag's screen rect on viewport changes
// while in browse / pdp.
function realignCloneToBag() {
  if (!morphClone || !morphClone.classList.contains('is-active')) return;
  if (!window.protoApi) return;
  const state = document.body.dataset.state;
  if (state !== 'browse' && state !== 'pdp') return;
  const rect = window.protoApi.getBagEl().getBoundingClientRect();
  morphClone.style.transition = 'none';
  morphClone.style.left   = `${rect.left}px`;
  morphClone.style.top    = `${rect.top}px`;
  morphClone.style.width  = `${rect.width}px`;
  morphClone.style.height = `${rect.height}px`;
}
window.addEventListener('resize', realignCloneToBag);

// When the prototype switches between browse↔pdp, the CSS rule
//   `.bag { width: 78% }`  →  `.app[data-mode="pdp"] .bag { width: 92% }`
// animates the bag's underlying size over 500ms. The morph-clone (which
// is the visible bag image) needs to grow/shrink in lockstep.
function getBagTargetRect(mode) {
  const inner = document.querySelector('.stage__inner');
  if (!inner) return null;
  const r = inner.getBoundingClientRect();
  const pct = mode === 'pdp' ? 0.92 : 0.78;
  const size = Math.min(r.width * pct, r.height);
  const left = r.left + (r.width - size) / 2;
  const top  = r.top  + (r.height - size) / 2;
  return { left, top, width: size, height: size };
}

function syncCloneToMode(mode) {
  if (!morphClone || !morphClone.classList.contains('is-active')) return;
  const target = getBagTargetRect(mode);
  if (!target) return;
  const ease = 'cubic-bezier(0.22, 0.61, 0.36, 1)';     // same as --easing
  morphClone.style.transition = [
    `left 500ms ${ease} 50ms`,
    `top 500ms ${ease} 50ms`,
    `width 500ms ${ease} 50ms`,
    `height 500ms ${ease} 50ms`,
  ].join(', ');
  morphClone.style.left   = `${target.left}px`;
  morphClone.style.top    = `${target.top}px`;
  morphClone.style.width  = `${target.width}px`;
  morphClone.style.height = `${target.height}px`;
}

// Watch the prototype's data-mode and sync the clone whenever it
// flips browse↔pdp. (Initial PLP→browse morph doesn't change this
// attribute; it stays "browse" throughout, so this observer is silent
// during the entry morph.)
const appEl = document.querySelector('.app');
if (appEl) {
  new MutationObserver((mutations) => {
    for (const m of mutations) {
      if (m.attributeName === 'data-mode') {
        syncCloneToMode(appEl.dataset.mode);
      }
    }
  }).observe(appEl, { attributes: true });
}

// v2: tiles in the grid DO NOT trigger the morph. Only the "Year"
// hot-filter pill does. (Hearts still toggle as in v1.)

// ---------- Morph: hot-filter "Year" pill → prototype bag --------
// Same 3-phase choreography as morphTileToPrototype, but the source
// is the wide-flat filter pill at the top of the page. The pill itself
// fades (text + border) during phase 1; the clone (positioned over the
// pill rect with the bag image inside, object-fit: contain) takes over
// and expands down to the bag rect. Border-radius animates pill-curve
// → square. Larger travel distance than the v1 morph → reads as the
// bag literally emerging from the filter row.
function morphFilterToPrototype(filterBtn) {
  if (!morphClone || !window.protoApi) return;

  // v2 entry: pill is the click target, but the visual morph source is the
  // hero tile in the grid (right column, first row → product id "02",
  // the 2008 Modern Chain). The pill itself just fades away with the
  // rest of the PLP chrome during phase 1.
  const sourceTileEl = document.querySelector('.plp__grid .card[data-product-id="02"]');
  if (!sourceTileEl) return;
  const tileImg = sourceTileEl.querySelector('.card__img');
  if (!tileImg) return;

  const imgSrc = tileImg.currentSrc || tileImg.src;
  const year = parseInt(sourceTileEl.dataset.year, 10) || 2008;
  const bagName = sourceTileEl.dataset.bagName || '';

  sourceTile = sourceTileEl;

  const startRect = tileImg.getBoundingClientRect();

  sourceTileEl.classList.add('card--is-source');

  document.body.dataset.state = 'morphing';
  lockBodyScroll();

  // Pre-warm prototype
  window.protoApi.setYear(year);
  const bagLayer = window.protoApi.getBagEl();
  const bagnameEl = document.querySelector('.bagname');
  if (bagnameEl) bagnameEl.textContent = bagName;
  const targetRect = bagLayer.getBoundingClientRect();

  // Position clone at the tile rect, cream background to match PLP card
  morphCloneImg.src = imgSrc;
  morphClone.style.transition = 'none';
  morphClone.style.left   = `${startRect.left}px`;
  morphClone.style.top    = `${startRect.top}px`;
  morphClone.style.width  = `${startRect.width}px`;
  morphClone.style.height = `${startRect.height}px`;
  morphClone.style.borderRadius = '0';
  morphClone.style.background = '#f1efe9';
  morphClone.style.opacity = '1';
  morphClone.classList.add('is-active');
  void morphClone.offsetWidth;

  // PHASE 1 (0–T_FADE_PLP): fade clone background cream → white in
  // lockstep with PLP and source tile turning white.
  requestAnimationFrame(() => {
    morphClone.style.transition = `background ${T_FADE_PLP}ms ease`;
    morphClone.style.background = '#ffffff';
  });

  // PHASE 2: expand the clone to the bag rect.
  setTimeout(() => {
    morphClone.style.transition = [
      `left ${T_EXPAND}ms ${EASE_EXPAND}`,
      `top ${T_EXPAND}ms ${EASE_EXPAND}`,
      `width ${T_EXPAND}ms ${EASE_EXPAND}`,
      `height ${T_EXPAND}ms ${EASE_EXPAND}`,
    ].join(', ');
    morphClone.style.left   = `${targetRect.left}px`;
    morphClone.style.top    = `${targetRect.top}px`;
    morphClone.style.width  = `${targetRect.width}px`;
    morphClone.style.height = `${targetRect.height}px`;
  }, T_FADE_PLP);

  // PHASE 3: state → browse
  setTimeout(() => {
    document.body.dataset.state = 'browse';
    morphClone.style.transition = 'none';
  }, T_FADE_PLP + T_EXPAND + T_BUFFER);
}

// Wire the "Year" hot-filter click
const filterByYear = document.getElementById('filterByYear');
if (filterByYear) {
  filterByYear.addEventListener('click', () => morphFilterToPrototype(filterByYear));
}

// ---------- Back-to-PLP from prototype browse mode ---------------
const plpBack = document.getElementById('plpBack');
if (plpBack) {
  plpBack.addEventListener('click', () => {
    // Reset the prototype to a clean state if user was in PDP
    if (window.protoApi && window.protoApi.exitPDP) window.protoApi.exitPDP();
    morphPrototypeToPlp();
  });
}
