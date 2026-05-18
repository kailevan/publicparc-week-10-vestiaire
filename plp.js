/* ---------------------------------------------------------------
   week 10 — PLP (chanel bag search results, Vestiaire 1:1)
   - Populates 18-card product grid from Figma data
   - Heart toggle on tap
   - Chip thumbnails reuse product images for the demo
--------------------------------------------------------------- */

const PRODUCTS = [
  { id: '01', img: 'assets/plp/01.jpg', name: 'Timeless/Classique leather clutch bag', price: '$363', location: 'United States' },
  { id: '02', img: 'assets/plp/02.jpg', name: 'Travel bag',                              price: '$299', location: 'United States' },
  { id: '03', img: 'assets/plp/03.jpg', name: 'Wallet On Chain Double C leather crossbody bag', price: '$920', location: 'United States' },
  { id: '04', img: 'assets/plp/04.jpg', name: 'Timeless/Classique leather crossbody bag', price: '$1,898', location: 'United States' },
  { id: '05', img: 'assets/plp/05.jpg', name: 'Handbag',                                  price: '$736', location: 'United States' },
  { id: '06', img: 'assets/plp/06.jpg', name: 'Leather tote',                             price: '$807', location: 'United States' },
  { id: '07', img: 'assets/plp/07.jpg', name: 'Leather handbag',                          price: '$1,570', location: 'United States' },
  { id: '08', img: 'assets/plp/08.jpg', name: 'Coco Handle leather handbag',              price: '$2,577', location: 'United States', tag: 'vintage' },
  { id: '09', img: 'assets/plp/09.jpg', name: 'Bowling Bag cloth handbag',                price: '$748', location: 'United States', tag: 'vintage' },
  { id: '10', img: 'assets/plp/10.jpg', name: 'Petite Shopping Tote leather tote',        price: '$916', location: 'United States', tag: 'vintage' },
  { id: '11', img: 'assets/plp/11.jpg', name: 'Grand shopping handbag',                   price: '$728', location: 'United States', tag: 'vintage' },
  { id: '12', img: 'assets/plp/12.jpg', name: 'Wallet On Chain Boy leather crossbody bag', price: '$748', location: 'United States' },
  { id: '13', img: 'assets/plp/13.jpg', name: 'Tote',                                     price: '$408', location: 'United States' },
  { id: '14', img: 'assets/plp/14.jpg', name: '2.55 leather handbag',                     price: '$1,610', location: 'United States' },
  { id: '15', img: 'assets/plp/15.jpg', name: 'Wallet On Chain Cambon leather crossbody bag', price: '$909', location: 'United States' },
  { id: '16', img: 'assets/plp/16.jpg', name: 'Timeless/Classique leather handbag',       price: '$4,300', location: 'United States' },
  { id: '17', img: 'assets/plp/17.jpg', name: '2.55 leather handbag',                     price: '$1,725', location: 'United States' },
  { id: '18', img: 'assets/plp/18.jpg', name: 'Leather handbag',                          price: '$837', location: 'United States' },
];

const LEAF_SVG = `<svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="#1f7a4f" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="M3 13 C3 7 7 3 13 3 C13 9 9 13 3 13 Z M5 11 L11 5"/></svg>`;
const HEART_SVG = `<svg viewBox="0 0 24 24" width="20" height="18" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21 C8 18 3 14 3 9 A4 4 0 0 1 12 7 A4 4 0 0 1 21 9 C21 14 16 18 12 21 Z"/></svg>`;
const HEART_FILLED_SVG = `<svg viewBox="0 0 24 24" width="20" height="18" fill="currentColor" stroke="none"><path d="M12 21 C8 18 3 14 3 9 A4 4 0 0 1 12 7 A4 4 0 0 1 21 9 C21 14 16 18 12 21 Z"/></svg>`;

// Build the grid
const grid = document.getElementById('plpGrid');
PRODUCTS.forEach(p => {
  const li = document.createElement('li');
  li.className = 'card';
  li.dataset.productId = p.id;
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

// Heart toggle
grid.addEventListener('click', (e) => {
  const heart = e.target.closest('.card__heart');
  if (!heart) return;
  e.preventDefault();
  e.stopPropagation();
  const active = heart.classList.toggle('is-active');
  heart.innerHTML = active ? HEART_FILLED_SVG : HEART_SVG;
});

// Wire chip thumbnails (each chip references a product image)
document.querySelectorAll('.chip__thumb').forEach(t => {
  const id = t.dataset.thumb;
  if (id) t.style.backgroundImage = `url('assets/plp/${id}.jpg')`;
});

// Card tap → prototype transition (placeholder for now)
grid.addEventListener('click', (e) => {
  const card = e.target.closest('.card');
  if (!card || e.target.closest('.card__heart')) return;
  // TODO: morph into prototype
  // For now, navigate to index.html
  window.location.href = `index.html?from=${card.dataset.productId}`;
});
