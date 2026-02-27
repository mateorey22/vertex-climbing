// =======================================
// VERTEX CLIMBING - Main JavaScript
// Cart, Login & Interactivity
// =======================================

// Product Data
const products = [
    {
        id: 1,
        name: "C-Quence Harness Pro",
        category: "Harnais",
        description: "Harnais technique ultra-léger avec technologie Warp Strength",
        price: 189.00,
        image: "images/product_harness.png",
        badge: "Best Seller"
    },
    {
        id: 2,
        name: "Titanium Wire Carabiner",
        category: "Mousquetons",
        description: "Mousqueton en aluminium avec portes-câbles ultra-léger",
        price: 24.90,
        image: "images/product_carabiner.png",
        badge: null
    },
    {
        id: 3,
        name: "Edelrid Quickdraw Set",
        category: "Degaines",
        description: "Set de 6 degaines avec sangles Dyneema et mousquetons oranges",
        price: 119.00,
        image: "images/product_quickdraws.png",
        badge: "-15%"
    },
    {
        id: 4,
        name: "Pro Static Rope 60m",
        category: "Cordes",
        description: "Corde statique de haute résistance pour escalade et travail sur corde",
        price: 159.00,
        image: "images/product_rope.png",
        badge: null
    },
    {
        id: 5,
        name: "Summit Helmet Elite",
        category: "Casques",
        description: "Casque d'escalade ultra-léger avec ventilation optimale",
        price: 89.00,
        image: "images/product_helmet.png",
        badge: "Nouveau"
    },
    {
        id: 6,
        name: "Precision Climbing Shoes",
        category: "Chaussons",
        description: "Chaussons de haute performance pour escalade sportive",
        price: 145.00,
        image: "images/product_shoes.png",
        badge: null
    },
    {
        id: 7,
        name: "Liquid Grip Chalk",
        category: "Magnésie",
        description: "Magnésie liquide pour une adhérence maximale et longue durée",
        price: 18.90,
        image: "images/v2_liquid_chalk.png",
        badge: null
    },
    {
        id: 8,
        name: "Alpine Arc Brush",
        category: "Brosses",
        description: "Brosse carbone pour nettoyer les prises rocheuses",
        price: 22.90,
        image: "images/product_brush.png",
        badge: null
    },
    {
        id: 9,
        name: "Impact Crash Pad XL",
        category: "Crash Pads",
        description: "Grand crash pad avec mousse à mémoire de forme pour le bloc",
        price: 299.00,
        image: "images/product_crashpad.png",
        badge: "Pro"
    },
    {
        id: 10,
        name: "Belay Vision Glasses",
        category: "Accessoires",
        description: "Lunettes de relai pour éviter la fatigue de la nuque",
        price: 45.00,
        image: "images/v2_belay_glasses.png",
        badge: null
    },
    {
        id: 11,
        name: "Ascender Pro Jumar",
        category: "Ascendeurs",
        description: "Ascendeur mécanique pour la progression sur corde",
        price: 79.00,
        image: "images/v2_ascender.png",
        badge: null
    },
    {
        id: 12,
        name: "Pulley Matrix",
        category: "Poulies",
        description: "Poulie haute efficacité pour le travail sur corde",
        price: 89.00,
        image: "images/v2_pulley.png",
        badge: null
    },
    {
        id: 13,
        name: "Kevlar Cord 5mm",
        category: "Cordes",
        description: "Cordon Kevlar ultra-résistant pour ancrages et rappels",
        price: 12.90,
        image: "images/v2_kevlar_cord.png",
        badge: null
    },
    {
        id: 14,
        name: "NOVA-X Tracker",
        category: "Accessoires",
        description: "Tracker de performance avec GPS et cardio pour l'escalade",
        price: 249.00,
        image: "images/product_bracelet.png",
        badge: "Tech"
    }
];

// Cart State
let cart = JSON.parse(localStorage.getItem('vertex_cart')) || [];

// User State
let currentUser = JSON.parse(localStorage.getItem('vertex_user')) || null;

// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    init();
});

function init() {
    // Initialize all functionality
    updateCartCount();
    renderProducts();
    setupEventListeners();
    setupMobileMenu();
    setupScrollEffects();

    // Page-specific initialization
    const path = window.location.pathname;
    if (path.includes('panier')) {
        renderCartItems();
    }
    if (path.includes('login')) {
        checkLoginStatus();
    }
}

// =======================================
// EVENT LISTENERS
// =======================================
function setupEventListeners() {
    // Header scroll effect
    window.addEventListener('scroll', handleScroll);
}

function handleScroll() {
    const header = document.querySelector('.header');
    if (header) {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
}

function setupMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');

    if (menuBtn && navMenu) {
        menuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
}

function setupScrollEffects() {
    // Add reveal animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.product-card, .category-card, .philosophy-feature').forEach(el => {
        observer.observe(el);
    });
}

// =======================================
// PRODUCT RENDERING
// =======================================
function renderProducts() {
    const grid = document.querySelector('.products-grid');
    if (!grid) return;

    grid.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
                <div class="product-actions">
                    <button class="product-action-btn" onclick="quickView(${product.id})" title="Aperçu rapide">
                        <span>👁</span>
                    </button>
                    <button class="product-action-btn" onclick="addToWishlist(${product.id})" title="Liste de souhaits">
                        <span>♥</span>
                    </button>
                </div>
            </div>
            <div class="product-info">
                <span class="product-category">${product.category}</span>
                <h3 class="product-title">${product.name}</h3>
                <p class="product-desc">${product.description}</p>
                <div class="product-footer">
                    <span class="product-price">${product.price.toFixed(2)} €</span>
                    <button class="product-btn" onclick="addToCart(${product.id})">
                        Ajouter
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// =======================================
// CART FUNCTIONS
// =======================================
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    saveCart();
    updateCartCount();
    showNotification(`${product.name} ajouté au panier!`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartCount();
    renderCartItems();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart();
            updateCartCount();
            renderCartItems();
        }
    }
}

function saveCart() {
    localStorage.setItem('vertex_cart', JSON.stringify(cart));
}

function updateCartCount() {
    const countElement = document.querySelector('.cart-count');
    if (countElement) {
        const total = cart.reduce((sum, item) => sum + item.quantity, 0);
        countElement.textContent = total;
        countElement.style.display = total > 0 ? 'flex' : 'none';
    }
}

function renderCartItems() {
    const container = document.querySelector('.cart-items');
    const summary = document.querySelector('.cart-summary');

    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="empty-cart">
                <div style="text-align: center; padding: 4rem 2rem;">
                    <div style="font-size: 4rem; margin-bottom: 1rem;">🛒</div>
                    <h2 style="font-family: var(--font-heading); margin-bottom: 1rem;">Votre panier est vide</h2>
                    <p style="color: var(--light-gray); margin-bottom: 2rem;">Découvrez notre collection d'équipement d'escalade</p>
                    <a href="produits.html" class="btn btn-primary">Voir les produits</a>
                </div>
            </div>
        `;
        if (summary) summary.style.display = 'none';
        return;
    }

    if (summary) summary.style.display = 'block';

    container.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-info">
                <h3>${item.name}</h3>
                <p>Prix unitaire: ${item.price.toFixed(2)} €</p>
                <div class="cart-item-qty">
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span class="qty-value">${item.quantity}</span>
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    <button class="qty-btn" onclick="removeFromCart(${item.id})" style="margin-left: 1rem; background: #ff4444;">×</button>
                </div>
            </div>
            <div class="cart-item-price">
                ${(item.price * item.quantity).toFixed(2)} €
            </div>
        </div>
    `).join('');

    // Update summary
    updateCartSummary();
}

function updateCartSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 150 ? 0 : 9.90;
    const total = subtotal + shipping;

    const summaryRows = document.querySelectorAll('.summary-row');
    if (summaryRows.length >= 3) {
        summaryRows[0].querySelector('span:last-child').textContent = `${subtotal.toFixed(2)} €`;
        summaryRows[1].querySelector('span:last-child').textContent = shipping === 0 ? 'GRATUIT' : `${shipping.toFixed(2)} €`;
        summaryRows[2].querySelector('span:last-child').textContent = `${total.toFixed(2)} €`;
    }
}

// =======================================
// LOGIN FUNCTIONS
// =======================================
function checkLoginStatus() {
    const loginForm = document.getElementById('login-form');
    if (!loginForm) return;

    if (currentUser) {
        // User is logged in
        loginForm.innerHTML = `
            <div style="text-align: center; padding: 2rem;">
                <div style="font-size: 4rem; margin-bottom: 1rem;">👤</div>
                <h2>Bienvenue, ${currentUser.name}!</h2>
                <p style="color: var(--light-gray); margin: 1rem 0 2rem;">${currentUser.email}</p>
                <button class="btn btn-primary" onclick="logout()">Se déconnecter</button>
            </div>
        `;
    }
}

function login(email, password) {
    // Simulate login (in real app, this would be an API call)
    if (email && password) {
        currentUser = {
            name: email.split('@')[0],
            email: email
        };
        localStorage.setItem('vertex_user', JSON.stringify(currentUser));
        showNotification('Connexion réussie!');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
        return true;
    }
    return false;
}

function logout() {
    currentUser = null;
    localStorage.removeItem('vertex_user');
    showNotification('Déconnexion réussie');
    setTimeout(() => {
        window.location.reload();
    }, 1000);
}

// =======================================
// QUICK VIEW & WISHLIST
// =======================================
function quickView(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close" onclick="this.closest('.modal').remove()">×</button>
            <div class="modal-body">
                <img src="${product.image}" alt="${product.name}">
                <div>
                    <span class="product-category">${product.category}</span>
                    <h2>${product.name}</h2>
                    <p>${product.description}</p>
                    <div class="product-price" style="font-size: 2rem; margin: 1rem 0;">${product.price.toFixed(2)} €</div>
                    <button class="btn btn-primary" onclick="addToCart(${product.id}); this.closest('.modal').remove();">
                        Ajouter au panier
                    </button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    // Add modal styles
    const style = document.createElement('style');
    style.textContent = `
        .modal { position: fixed; inset: 0; background: rgba(0,0,0,0.8); z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 2rem; }
        .modal-content { background: var(--tertiary-black); border-radius: 24px; max-width: 800px; width: 100%; position: relative; border: 1px solid var(--glass-border); }
        .modal-close { position: absolute; top: 1rem; right: 1rem; width: 40px; height: 40px; border-radius: 50%; background: var(--glass-bg); border: none; color: white; font-size: 1.5rem; cursor: pointer; z-index: 10; }
        .modal-body { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; padding: 2rem; }
        .modal-body img { width: 100%; border-radius: 16px; }
        @media(max-width: 768px) { .modal-body { grid-template-columns: 1fr; } }
    `;
    document.head.appendChild(style);
}

function addToWishlist(productId) {
    showNotification('Ajouté à la liste de souhaits! ♥');
}

// =======================================
// NOTIFICATIONS
// =======================================
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        padding: 1rem 2rem;
        background: linear-gradient(135deg, var(--orange-primary), var(--orange-bright));
        color: white;
        border-radius: 12px;
        font-weight: 600;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation styles
const animStyle = document.createElement('style');
animStyle.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    .revealed { opacity: 0; transform: translateY(30px); transition: all 0.6s ease; }
    .revealed.visible { opacity: 1; transform: translateY(0); }
`;
document.head.appendChild(animStyle);

// =======================================
// CONTACT FORM
// =======================================
function submitContactForm(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    // Simulate form submission
    showNotification('Message envoyé! Nous vous répondrons sous 24h.');
    form.reset();
}

// =======================================
// SEARCH (Bonus)
// =======================================
function searchProducts(query) {
    if (!query || query.length < 2) return;

    const filtered = products.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase())
    );

    return filtered;
}

// Export functions globally
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
window.quickView = quickView;
window.addToWishlist = addToWishlist;
window.login = login;
window.logout = logout;
window.submitContactForm = submitContactForm;
