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
const MORPH_DURATION = 700;     // ms

function lockBodyScroll() {
  document.documentElement.style.overflow = 'hidden';
  document.body.style.overflow = 'hidden';
}
function unlockBodyScroll() {
  document.documentElement.style.overflow = '';
  document.body.style.overflow = '';
}

function morphTileToPrototype(tile) {
  if (!morphClone || !window.protoApi) return;
  const tileImg = tile.querySelector('.card__img');
  if (!tileImg) return;
  const imgSrc = tileImg.currentSrc || tileImg.src;
  const year = parseInt(tile.dataset.year, 10) || 2008;
  const bagName = tile.dataset.bagName || '';

  // 1. Capture start rect (tile image's current viewport position)
  const startRect = tileImg.getBoundingClientRect();

  // 2. Mark the source tile so CSS hides its image/details cleanly
  tile.classList.add('card--is-source');

  // 3. Switch into 'morphing' state — this makes the prototype DOM
  //    layout (still invisible) so we can measure where the bag will sit.
  document.body.dataset.state = 'morphing';
  lockBodyScroll();

  // 4. Pre-set the prototype to the target year and force its bag image
  //    to be the tile's image (so the underlying handoff is seamless)
  window.protoApi.setYear(year);
  const bagLayer = window.protoApi.getBagEl();
  const bagImgA = bagLayer.querySelector('.bag__img--a');
  const bagImgB = bagLayer.querySelector('.bag__img--b');
  bagImgA.src = imgSrc;
  bagImgA.classList.add('is-visible');
  bagImgB.classList.remove('is-visible');
  bagImgA.style.opacity = '0';   // hide until clone has settled
  // Also update bag name / price displayed
  const bagnameEl = document.querySelector('.bagname');
  if (bagnameEl) bagnameEl.textContent = bagName;

  // 5. Measure target rect (where .bag sits inside the prototype layout)
  const bagEl = window.protoApi.getBagEl();
  const targetRect = bagEl.getBoundingClientRect();

  // 6. Position the clone at the tile rect
  morphCloneImg.src = imgSrc;
  morphClone.style.transition = 'none';
  morphClone.style.left = `${startRect.left}px`;
  morphClone.style.top = `${startRect.top}px`;
  morphClone.style.width = `${startRect.width}px`;
  morphClone.style.height = `${startRect.height}px`;
  morphClone.style.opacity = '1';
  morphClone.classList.add('is-active');

  // Trigger reflow
  void morphClone.offsetWidth;

  // 7. Animate the clone to the target rect
  const ease = 'cubic-bezier(0.22, 0.61, 0.36, 1)';
  morphClone.style.transition = `left ${MORPH_DURATION}ms ${ease}, top ${MORPH_DURATION}ms ${ease}, width ${MORPH_DURATION}ms ${ease}, height ${MORPH_DURATION}ms ${ease}`;
  morphClone.style.left = `${targetRect.left}px`;
  morphClone.style.top = `${targetRect.top}px`;
  morphClone.style.width = `${targetRect.width}px`;
  morphClone.style.height = `${targetRect.height}px`;

  // 8. After the morph completes, hand off to the prototype
  setTimeout(() => {
    bagImgA.style.opacity = '1';                // real bag becomes visible
    morphClone.style.transition = 'opacity 200ms ease';
    morphClone.style.opacity = '0';
    document.body.dataset.state = 'browse';     // PLP fully hidden now
    setTimeout(() => {
      morphClone.classList.remove('is-active');
      morphClone.style.transition = '';
      morphClone.style.opacity = '';
      tile.classList.remove('card--is-source'); // cleanup
    }, 220);
  }, MORPH_DURATION + 30);
}

// Tile click handler — only the non-heart area triggers morph
if (grid) {
  grid.addEventListener('click', (e) => {
    if (e.target.closest('.card__heart')) return; // heart handled above
    const card = e.target.closest('.card');
    if (!card) return;
    morphTileToPrototype(card);
  });
}

// ---------- Back-to-PLP from prototype browse mode ---------------
const plpBack = document.getElementById('plpBack');
if (plpBack) {
  plpBack.addEventListener('click', () => {
    document.body.dataset.state = 'plp';
    unlockBodyScroll();
    // Reset the prototype to a clean state next time
    if (window.protoApi && window.protoApi.exitPDP) window.protoApi.exitPDP();
  });
}
