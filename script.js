// ── PRODUCTS DATA ──
const products = [
  { id:1,  name:"iPhone 15 Pro",         cat:"Electronics", emoji:"📱", price:134900, original:149900, rating:4.8, reviews:2841, desc:"A17 Pro chip, titanium design, 48MP camera system. The most powerful iPhone ever.",        deal:true  },
  { id:2,  name:"Samsung Galaxy S24",    cat:"Electronics", emoji:"📲", price:79999,  original:89999,  rating:4.7, reviews:1923, desc:"Galaxy AI features, 200MP camera, Snapdragon 8 Gen 3. Next level Android experience.",    deal:true  },
  { id:3,  name:"MacBook Air M3",        cat:"Electronics", emoji:"💻", price:114900, original:129900, rating:4.9, reviews:3102, desc:"Up to 18-hour battery life, fanless design, M3 chip. Ultimate thin & light laptop.",      deal:false },
  { id:4,  name:"Sony WH-1000XM5",       cat:"Audio",       emoji:"🎧", price:26990,  original:34990,  rating:4.8, reviews:4521, desc:"Industry-leading noise cancellation, 30hr battery, Speak-to-Chat technology.",           deal:true  },
  { id:5,  name:"AirPods Pro 2",         cat:"Audio",       emoji:"🎵", price:24900,  original:26900,  rating:4.7, reviews:3211, desc:"Active Noise Cancellation, Adaptive Transparency, Personalized Spatial Audio.",          deal:false },
  { id:6,  name:"iPad Pro 12.9\"",       cat:"Electronics", emoji:"📓", price:112900, original:119900, rating:4.8, reviews:1842, desc:"M2 chip, Liquid Retina XDR display, Apple Pencil support. Pro performance.",            deal:false },
  { id:7,  name:"Nike Air Max 270",      cat:"Footwear",    emoji:"👟", price:9995,   original:12995,  rating:4.6, reviews:2104, desc:"Max Air unit in the heel, breathable mesh upper. All-day comfort and style.",            deal:true  },
  { id:8,  name:"Adidas Ultraboost 23",  cat:"Footwear",    emoji:"🏃", price:14999,  original:17999,  rating:4.7, reviews:1567, desc:"Continental™ rubber outsole, BOOST midsole. Engineered mesh upper for a sock-like fit.", deal:false },
  { id:9,  name:"Levi's 511 Slim",       cat:"Fashion",     emoji:"👖", price:3999,   original:5999,   rating:4.5, reviews:892,  desc:"Slim fit from seat to ankle, sits below waist. Stretch fabric for all-day comfort.",     deal:true  },
  { id:10, name:"Apple Watch Series 9",  cat:"Wearables",   emoji:"⌚", price:45900,  original:49900,  rating:4.8, reviews:2341, desc:"S9 chip, Double Tap gesture, always-on Retina display, crash detection.",               deal:false },
  { id:11, name:"PS5 Controller",        cat:"Gaming",      emoji:"🎮", price:5999,   original:7499,   rating:4.7, reviews:3892, desc:"Haptic feedback, adaptive triggers, built-in mic. Next-gen gaming experience.",         deal:true  },
  { id:12, name:"Atomic Habits",         cat:"Books",       emoji:"📚", price:399,    original:799,    rating:4.9, reviews:12043,desc:"James Clear's #1 bestseller on building good habits and breaking bad ones.",             deal:true  },
  { id:13, name:"OnePlus 12",            cat:"Electronics", emoji:"📱", price:64999,  original:69999,  rating:4.6, reviews:1204, desc:"Hasselblad camera, Snapdragon 8 Gen 3, 100W SUPERVOOC charging.",                      deal:false },
  { id:14, name:"Dyson V15 Detect",      cat:"Home",        emoji:"🏠", price:52900,  original:59900,  rating:4.8, reviews:876,  desc:"Laser reveals hidden dust. Most powerful Dyson cordless vacuum. HEPA filtration.",      deal:true  },
  { id:15, name:"JBL Charge 5",          cat:"Audio",       emoji:"🔊", price:14999,  original:19999,  rating:4.6, reviews:2109, desc:"Powerful sound with deep bass, 20hr playtime, IP67 waterproof.",                       deal:false },
  { id:16, name:"Fitbit Charge 6",       cat:"Wearables",   emoji:"⌚", price:14999,  original:17999,  rating:4.5, reviews:1023, desc:"Built-in GPS, heart rate, sleep tracking. Google Maps & Wallet integration.",          deal:true  },
  { id:17, name:"Nintendo Switch OLED",  cat:"Gaming",      emoji:"🕹️", price:32999,  original:35999,  rating:4.8, reviews:4201, desc:"Vivid 7-inch OLED screen, enhanced audio, wide adjustable stand.",                    deal:false },
  { id:18, name:"Zara Oversized Blazer", cat:"Fashion",     emoji:"🧥", price:5999,   original:8999,   rating:4.4, reviews:341,  desc:"Structured oversized fit, notch lapels, two flap pockets. Premium wool blend.",       deal:false },
];
 
let cart = {};
let wishlist = new Set();
let modalQty = 1;
let currentModalId = null;
let activeCategory = null;
let cartOpen = false;
 
// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  renderFeatured();
  renderShopGrid(products);
  renderDeals();
  buildCategoryFilters();
  startCountdown();
});
 
// ── PAGE NAVIGATION ──
function showPage(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(page).classList.add('active');
  if (page === 'wishlist') renderWishlist();
  if (page === 'checkout') renderCheckout();
  if (cartOpen) toggleCart();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
 
// ── RENDER HELPERS ──
function renderStars(r) {
  const full = Math.floor(r);
  const half = r % 1 >= 0.5 ? '½' : '';
  return '★'.repeat(full) + half;
}
 
function fmt(n) {
  return '₹' + n.toLocaleString('en-IN');
}
 
function discount(p) {
  return Math.round((1 - p.price / p.original) * 100);
}
 
function productCard(p) {
  const isWished = wishlist.has(p.id);
  const disc = discount(p);
  return `
    <div class="pcard" data-id="${p.id}">
      <div class="pcard-img" onclick="openProduct(${p.id})">
        ${p.deal ? `<div class="pcard-deal-badge">${disc}% OFF</div>` : ''}
        <button class="pcard-wish ${isWished ? 'active' : ''}" onclick="toggleWish(event,${p.id})">${isWished ? '♥' : '♡'}</button>
        ${p.emoji}
      </div>
      <div class="pcard-body">
        <div class="pcard-cat">${p.cat}</div>
        <div class="pcard-name" onclick="openProduct(${p.id})">${p.name}</div>
        <div class="pcard-rating">
          <span class="stars">${renderStars(p.rating)}</span>
          <span>${p.rating}</span>
          <span class="rcount">(${p.reviews.toLocaleString()})</span>
        </div>
        <div class="pcard-price-row">
          <div>
            <span class="pcard-price">${fmt(p.price)}</span>
            <span class="pcard-original">${fmt(p.original)}</span>
            <span class="pcard-discount">${disc}% off</span>
          </div>
          <button class="btn-add" onclick="addToCart(${p.id},1)">+</button>
        </div>
      </div>
    </div>`;
}
 
function renderFeatured() {
  const top = products.filter(p => p.rating >= 4.7).slice(0, 8);
  document.getElementById('featuredGrid').innerHTML = top.map(productCard).join('');
}
 
function renderShopGrid(list) {
  const grid = document.getElementById('shopGrid');
  if (!list.length) { grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:4rem;color:var(--muted)">No products found.</div>`; return; }
  grid.innerHTML = list.map(productCard).join('');
  document.getElementById('resultCount').textContent = `${list.length} products`;
}
 
function renderDeals() {
  const deals = products.filter(p => p.deal);
  document.getElementById('dealsGrid').innerHTML = deals.map(productCard).join('');
}
 
function renderWishlist() {
  const grid = document.getElementById('wishlistGrid');
  const items = products.filter(p => wishlist.has(p.id));
  if (!items.length) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:4rem">
      <div style="font-size:4rem">♡</div>
      <h3 style="font-family:Syne,sans-serif;margin:1rem 0 0.5rem">Your wishlist is empty</h3>
      <p style="color:var(--muted);margin-bottom:1.5rem">Save items you love!</p>
      <button class="btn-hero" onclick="showPage('products')">Browse Products</button>
    </div>`;
    return;
  }
  grid.innerHTML = items.map(productCard).join('');
}
 
// ── CATEGORY FILTER ──
function buildCategoryFilters() {
  const cats = [...new Set(products.map(p => p.cat))].sort();
  document.getElementById('categoryFilters').innerHTML = cats.map(c => `
    <label class="check-label">
      <input type="checkbox" value="${c}" onchange="applyFilters()"> ${c}
    </label>`).join('');
}
 
function filterByCategory(cat) {
  showPage('products');
  // Uncheck all, check matching
  document.querySelectorAll('#categoryFilters input').forEach(cb => {
    cb.checked = cb.value === cat;
  });
  applyFilters();
}
 
function applyFilters() {
  let list = [...products];
 
  // Category
  const checked = [...document.querySelectorAll('#categoryFilters input:checked')].map(c => c.value);
  if (checked.length) list = list.filter(p => checked.includes(p.cat));
 
  // Price
  const minP = parseFloat(document.getElementById('minPrice').value) || 0;
  const maxP = parseFloat(document.getElementById('maxPrice').value) || Infinity;
  list = list.filter(p => p.price >= minP && p.price <= maxP);
 
  // Rating
  const minR = parseFloat(document.querySelector('input[name="rating"]:checked')?.value || 0);
  if (minR > 0) list = list.filter(p => p.rating >= minR);
 
  // Sort
  const sort = document.getElementById('sortSelect').value;
  if (sort === 'price-low') list.sort((a,b) => a.price - b.price);
  else if (sort === 'price-high') list.sort((a,b) => b.price - a.price);
  else if (sort === 'rating') list.sort((a,b) => b.rating - a.rating);
 
  renderShopGrid(list);
}
 
function clearFilters() {
  document.querySelectorAll('#categoryFilters input').forEach(cb => cb.checked = false);
  document.getElementById('minPrice').value = '';
  document.getElementById('maxPrice').value = '';
  document.querySelector('input[name="rating"][value="0"]').checked = true;
  document.getElementById('sortSelect').value = 'default';
  renderShopGrid(products);
}
 
// ── SEARCH ──
function handleSearch(val) {
  const dd = document.getElementById('searchDropdown');
  if (!val.trim()) { dd.classList.remove('open'); return; }
  const results = products.filter(p => p.name.toLowerCase().includes(val.toLowerCase())).slice(0,6);
  if (!results.length) { dd.classList.remove('open'); return; }
  dd.innerHTML = results.map(p => `
    <div class="search-item" onclick="openProduct(${p.id}); document.getElementById('searchDropdown').classList.remove('open'); document.getElementById('searchInput').value=''">
      <span style="font-size:1.5rem">${p.emoji}</span>
      <div><div style="font-weight:600;font-size:0.85rem">${p.name}</div><div style="color:var(--muted);font-size:0.78rem">${fmt(p.price)}</div></div>
    </div>`).join('');
  dd.classList.add('open');
}
 
document.addEventListener('click', e => {
  if (!e.target.closest('.search-wrap')) {
    document.getElementById('searchDropdown').classList.remove('open');
  }
});
 
// ── PRODUCT MODAL ──
function openProduct(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;
  currentModalId = id;
  modalQty = 1;
  const disc = discount(p);
  const isWished = wishlist.has(p.id);
  document.getElementById('modalContent').innerHTML = `
    <div class="modal-grid">
      <div class="modal-img">${p.emoji}</div>
      <div class="modal-info">
        <div class="modal-cat">${p.cat}</div>
        <h2>${p.name}</h2>
        <div class="modal-rating">
          <span class="stars">${renderStars(p.rating)}</span>
          <span style="font-weight:600">${p.rating}</span>
          <span class="rcount">(${p.reviews.toLocaleString()} reviews)</span>
        </div>
        <div class="modal-price">${fmt(p.price)}</div>
        <span class="modal-original">${fmt(p.original)}</span>
        <span class="modal-discount"> ${disc}% off</span>
        <p class="modal-desc">${p.desc}</p>
        <div class="modal-qty">
          <span style="font-weight:600;font-size:0.88rem">Qty:</span>
          <div class="modal-qty-ctrl">
            <button onclick="changeModalQty(-1)">−</button>
            <span id="modalQtyDisplay">1</span>
            <button onclick="changeModalQty(1)">+</button>
          </div>
        </div>
        <button class="btn-modal-cart" onclick="addToCart(${id}, modalQty); closeModal()">Add to Cart 🛒</button>
        <button class="btn-modal-wish" onclick="toggleWishFromModal(${id})" id="modalWishBtn">
          ${isWished ? '♥ Remove from Wishlist' : '♡ Add to Wishlist'}
        </button>
      </div>
    </div>`;
  document.getElementById('modalOverlay').classList.add('open');
  document.getElementById('productModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}
 
function changeModalQty(d) {
  modalQty = Math.max(1, modalQty + d);
  document.getElementById('modalQtyDisplay').textContent = modalQty;
}
 
function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.getElementById('productModal').classList.remove('open');
  document.body.style.overflow = '';
}
 
// ── WISHLIST ──
function toggleWish(e, id) {
  e.stopPropagation();
  if (wishlist.has(id)) {
    wishlist.delete(id);
    showToast('Removed from wishlist');
  } else {
    wishlist.add(id);
    showToast('♥ Added to wishlist!');
  }
  updateWishCount();
  // Re-render current grids
  const activePage = document.querySelector('.page.active').id;
  if (activePage === 'products') applyFilters();
  else if (activePage === 'home') renderFeatured();
  else if (activePage === 'deals') renderDeals();
  else if (activePage === 'wishlist') renderWishlist();
}
 
function toggleWishFromModal(id) {
  if (wishlist.has(id)) {
    wishlist.delete(id);
    document.getElementById('modalWishBtn').textContent = '♡ Add to Wishlist';
    showToast('Removed from wishlist');
  } else {
    wishlist.add(id);
    document.getElementById('modalWishBtn').textContent = '♥ Remove from Wishlist';
    showToast('♥ Added to wishlist!');
  }
  updateWishCount();
}
 
function updateWishCount() {
  document.getElementById('wishCount').textContent = wishlist.size;
}
 
// ── CART ──
function addToCart(id, qty = 1) {
  const p = products.find(x => x.id === id);
  if (!p) return;
  cart[id] = (cart[id] || 0) + qty;
  updateCartCount();
  renderCartDrawer();
  showToast(`${p.emoji} ${p.name} added to cart!`);
}
 
function removeFromCart(id) {
  delete cart[id];
  updateCartCount();
  renderCartDrawer();
}
 
function changeCartQty(id, d) {
  cart[id] = (cart[id] || 0) + d;
  if (cart[id] <= 0) delete cart[id];
  updateCartCount();
  renderCartDrawer();
}
 
function updateCartCount() {
  const total = Object.values(cart).reduce((a,b) => a+b, 0);
  document.getElementById('cartCount').textContent = total;
}
 
function toggleCart() {
  cartOpen = !cartOpen;
  document.getElementById('cartDrawer').classList.toggle('open', cartOpen);
  document.getElementById('cartOverlay').classList.toggle('open', cartOpen);
  if (cartOpen) renderCartDrawer();
}
 
function renderCartDrawer() {
  const items = Object.entries(cart);
  const itemsEl = document.getElementById('cartItems');
  const footerEl = document.getElementById('cartFooter');
 
  if (!items.length) {
    itemsEl.innerHTML = `<div class="empty-cart"><span class="big">🛒</span><p>Your cart is empty</p><button class="btn-hero" onclick="toggleCart();showPage('products')">Start Shopping</button></div>`;
    footerEl.innerHTML = '';
    return;
  }
 
  let subtotal = 0;
  itemsEl.innerHTML = items.map(([id, qty]) => {
    const p = products.find(x => x.id == id);
    subtotal += p.price * qty;
    return `
      <div class="ci">
        <div class="ci-emoji">${p.emoji}</div>
        <div class="ci-info">
          <div class="ci-name">${p.name}</div>
          <div class="ci-price">${fmt(p.price)}</div>
          <div class="ci-qty">
            <button onclick="changeCartQty(${p.id},-1)">−</button>
            <span>${qty}</span>
            <button onclick="changeCartQty(${p.id},1)">+</button>
          </div>
        </div>
        <div style="font-weight:600;font-size:0.88rem">${fmt(p.price * qty)}</div>
        <button class="ci-remove" onclick="removeFromCart(${p.id})">✕</button>
      </div>`;
  }).join('');
 
  const delivery = subtotal >= 500 ? 0 : 49;
  const total = subtotal + delivery;
 
  footerEl.innerHTML = `
    <div class="cf-row"><span>Subtotal</span><span>${fmt(subtotal)}</span></div>
    <div class="cf-row"><span>Delivery</span><span>${delivery === 0 ? '<span style="color:#22c55e">FREE</span>' : fmt(delivery)}</span></div>
    <div class="cf-row cf-total"><span>Total</span><span>${fmt(total)}</span></div>
    <button class="btn-checkout" onclick="toggleCart(); showPage('checkout')">Proceed to Checkout →</button>`;
}
 
// ── CHECKOUT ──
function renderCheckout() {
  const items = Object.entries(cart);
  if (!items.length) { showPage('products'); return; }
 
  let subtotal = 0;
  document.getElementById('checkoutItems').innerHTML = items.map(([id, qty]) => {
    const p = products.find(x => x.id == id);
    subtotal += p.price * qty;
    return `<div class="co-item"><span class="co-item-emoji">${p.emoji}</span><span class="co-item-name">${p.name} ×${qty}</span><span>${fmt(p.price*qty)}</span></div>`;
  }).join('');
 
  const delivery = subtotal >= 500 ? 0 : 49;
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + delivery + tax;
 
  document.getElementById('checkoutTotals').innerHTML = `
    <div class="co-totals">
      <div class="co-row"><span>Subtotal</span><span>${fmt(subtotal)}</span></div>
      <div class="co-row"><span>Delivery</span><span>${delivery === 0 ? 'FREE' : fmt(delivery)}</span></div>
      <div class="co-row"><span>GST (18%)</span><span>${fmt(tax)}</span></div>
      <div class="co-total-row"><span>Total</span><span>${fmt(total)}</span></div>
    </div>`;
}
 
function placeOrder() {
  const orderId = 'SZ' + Date.now().toString().slice(-8).toUpperCase();
  document.getElementById('orderId').textContent = orderId;
  cart = {};
  updateCartCount();
  showPage('success');
  showToast('🎉 Order placed successfully!');
}
 
// ── AUTH ──
function switchAuth(formId, btn) {
  document.querySelectorAll('.atab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('login-form').style.display = formId === 'login-form' ? 'block' : 'none';
  document.getElementById('register-form').style.display = formId === 'register-form' ? 'block' : 'none';
}
 
function doLogin() {
  showToast('🎉 Welcome to ShopZen!');
  setTimeout(() => showPage('home'), 800);
}
 
// ── COUNTDOWN ──
function startCountdown() {
  const end = new Date();
  end.setHours(23, 59, 59, 0);
 
  function update() {
    const now = new Date();
    let diff = Math.max(0, end - now);
    const h = Math.floor(diff / 3600000); diff %= 3600000;
    const m = Math.floor(diff / 60000); diff %= 60000;
    const s = Math.floor(diff / 1000);
    const el = document.getElementById('countdown');
    if (el) el.innerHTML = `
      <div class="cd-block"><div class="cd-num">${String(h).padStart(2,'0')}</div><div class="cd-label">Hours</div></div>
      <div class="cd-block"><div class="cd-num">${String(m).padStart(2,'0')}</div><div class="cd-label">Mins</div></div>
      <div class="cd-block"><div class="cd-num">${String(s).padStart(2,'0')}</div><div class="cd-label">Secs</div></div>`;
  }
  update();
  setInterval(update, 1000);
}
 
// ── TOAST ──
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 3000);
}
 
// ── PROMO BANNER FIX ──
document.addEventListener('DOMContentLoaded', () => {
  const banner = document.querySelector('.promo-banner');
  if (banner) banner.innerHTML = `
    <div class="promo-inner">
      <div class="promo-content">
        <div class="promo-tag">LIMITED TIME</div>
        <h2>Up to 70% Off<br>on Electronics</h2>
        <p>Grab the best deals before they expire!</p>
        <button class="btn-hero" onclick="showPage('deals')">Shop Deals →</button>
      </div>
      <div class="promo-emoji">⚡</div>
    </div>`;
});