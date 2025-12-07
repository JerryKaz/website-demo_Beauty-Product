// DOM Elements
const cartBtn = document.getElementById('cartBtn');
const cartDropdown = document.getElementById('cartDropdown');
const closeCart = document.getElementById('closeCart');
const cartCount = document.getElementById('cartCount');
const cartItems = document.getElementById('cartItems');
const checkoutBtn = document.getElementById('checkoutBtn');
const searchBtn = document.getElementById('searchBtn');
const searchOverlay = document.getElementById('searchOverlay');
const closeSearch = document.getElementById('closeSearch');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const menuBtn = document.getElementById('menuBtn');
const glassNav = document.querySelector('.glass-nav'); // Changed from .nav-links
const loadMoreBtn = document.getElementById('loadMore');
const productsGrid = document.getElementById('productsGrid');
const filterTabs = document.querySelectorAll('.filter-tab');
const trendingSlider = document.querySelector('.swiper-wrapper');
const whatsappBtn = document.getElementById('whatsappBtn');
const snapchatBtn = document.getElementById('snapchatBtn');
const quickviewModal = document.getElementById('quickviewModal');
const closeQuickview = document.getElementById('closeQuickview');
const quickviewContent = document.getElementById('quickviewContent');
const toastContainer = document.getElementById('toastContainer');
const loadingOverlay = document.getElementById('loadingOverlay');
const floatingProducts = document.querySelectorAll('.floating-product');

// Product Database
const products = [
    {
        id: 1,
        name: "Radiance Glow Serum",
        category: "skincare",
        price: 89.99,
        originalPrice: 120.00,
        description: "Advanced anti-aging formula with Vitamin C, Hyaluronic Acid, and natural botanical extracts. Reduces fine lines and brightens complexion.",
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        badge: "Best Seller",
        trending: true
    },
    {
        id: 2,
        name: "Matte Lipstick Collection",
        category: "makeup",
        price: 24.99,
        originalPrice: 35.00,
        description: "Long-lasting matte lipstick in 12 vibrant shades. Non-drying formula with vitamin E for comfortable wear.",
        image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        badge: "New",
        trending: true
    },
    {
        id: 3,
        name: "Hydrating Foundation",
        category: "makeup",
        price: 34.99,
        originalPrice: 45.00,
        description: "24-hour hydration foundation with SPF 30. Medium to full coverage with a natural finish.",
        image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        badge: "",
        trending: false
    },
    {
        id: 4,
        name: "Signature Perfume",
        category: "fragrance",
        price: 65.99,
        originalPrice: 85.00,
        description: "Elegant floral-woody fragrance with notes of jasmine, sandalwood, and vanilla. Lasts up to 12 hours.",
        image: "https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        badge: "Popular",
        trending: true
    },
    {
        id: 5,
        name: "Hair Growth Oil",
        category: "haircare",
        price: 29.99,
        originalPrice: 40.00,
        description: "Natural hair growth oil with rosemary, peppermint, and castor oil. Strengthens and nourishes hair follicles.",
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        badge: "Sale",
        trending: false
    },
    {
        id: 6,
        name: "Night Repair Cream",
        category: "skincare",
        price: 45.99,
        originalPrice: 60.00,
        description: "Intensive overnight repair cream with retinol and peptides. Wake up to rejuvenated, glowing skin.",
        image: "https://images.unsplash.com/photo-1556228578-9c360e1d8d34?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        badge: "",
        trending: true
    },
    {
        id: 7,
        name: "Eyeshadow Palette",
        category: "makeup",
        price: 39.99,
        originalPrice: 55.00,
        description: "18-shade eyeshadow palette with matte and shimmer finishes. Highly pigmented and blendable.",
        image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        badge: "New",
        trending: false
    },
    {
        id: 8,
        name: "Body Mist Spray",
        category: "fragrance",
        price: 19.99,
        originalPrice: 25.00,
        description: "Light, refreshing body mist with tropical fruit notes. Perfect for everyday use.",
        image: "https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        badge: "",
        trending: false
    }
];

// Shopping Cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentFilter = 'all';
let displayedProducts = 6;

// Initialize the page
function init() {
    loadProducts();
    loadTrendingProducts();
    updateCartCount();
    renderCart();
    setupEventListeners();
    animateStats();
    setupSwiper();
    
    // Load cart from localStorage
    if (cart.length > 0) {
        updateCartCount();
        renderCart();
    }
}

// Event Listeners Setup - UPDATED
function setupEventListeners() {
    // Cart functionality
    cartBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleCart();
        closeMobileMenu();
    });
    
    closeCart.addEventListener('click', closeCartDropdown);
    
    // Close cart when clicking outside
    document.addEventListener('click', (e) => {
        if (!cartBtn.contains(e.target) && !cartDropdown.contains(e.target)) {
            closeCartDropdown();
        }
    });
    
    // Close cart on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeCartDropdown();
            closeMobileMenu();
        }
    });
    
    // Search functionality
    searchBtn.addEventListener('click', openSearch);
    closeSearch.addEventListener('click', closeSearchOverlay);
    
    // Close search on escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
            closeSearchOverlay();
        }
    });
    
    searchInput.addEventListener('input', handleSearch);
    
    // Mobile menu - FIXED
    menuBtn.addEventListener('click', toggleMobileMenu);
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });
    
    // Filter tabs
    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentFilter = tab.dataset.filter;
            displayedProducts = 6;
            loadProducts();
        });
    });
    
    // Load more products
    loadMoreBtn.addEventListener('click', loadMoreProducts);
    
    // Social commerce buttons
    whatsappBtn.addEventListener('click', checkoutViaWhatsApp);
    snapchatBtn.addEventListener('click', checkoutViaSnapchat);
    
    // Quickview modal
    closeQuickview.addEventListener('click', () => {
        quickviewModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // Close modal when clicking outside
    quickviewModal.addEventListener('click', (e) => {
        if (e.target === quickviewModal) {
            quickviewModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Floating products interaction
    floatingProducts.forEach(product => {
        product.addEventListener('click', () => {
            const productId = parseInt(product.dataset.productId);
            const productData = products.find(p => p.id === productId);
            if (productData) {
                openQuickview(productData);
            }
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu if open
            closeMobileMenu();
        });
    });
}

// Cart Functions
function toggleCart() {
    cartDropdown.classList.toggle('active');
    // Close mobile menu when opening cart
    closeMobileMenu();
}

function closeCartDropdown() {
    cartDropdown.classList.remove('active');
}

function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartCount();
    renderCart();
    saveCart();
    showToast('Product added to cart!', 'success');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    renderCart();
    saveCart();
    showToast('Product removed from cart', 'info');
}

function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

function renderCart() {
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-bag"></i>
                <p>Your bag is empty</p>
            </div>
        `;
        updateCartTotal();
        return;
    }
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item" data-id="${item.id}">
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <h4 class="cart-item-name">${item.name}</h4>
                <div class="cart-item-price">₵${item.price.toFixed(2)}</div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn minus" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn plus" onclick="updateQuantity(${item.id}, 1)">+</button>
                    <button class="remove-item" onclick="removeFromCart(${item.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    
    updateCartTotal();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity < 1) {
            removeFromCart(productId);
        } else {
            updateCartCount();
            renderCart();
            saveCart();
        }
    }
}

function updateCartTotal() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.querySelector('.total-amount').textContent = `₵${total.toFixed(2)}`;
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Product Display Functions
function loadProducts() {
    const filteredProducts = currentFilter === 'all' 
        ? products 
        : products.filter(product => product.category === currentFilter);
    
    const productsToShow = filteredProducts.slice(0, displayedProducts);
    
    productsGrid.innerHTML = productsToShow.map(product => createProductCard(product)).join('');
    
    loadMoreBtn.style.display = displayedProducts >= filteredProducts.length ? 'none' : 'block';
}

function loadMoreProducts() {
    displayedProducts += 3;
    loadProducts();
}

function createProductCard(product) {
    const discount = product.originalPrice 
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;
    
    return `
        <div class="product-card glass-card" data-category="${product.category}">
            ${product.badge ? `<div class="product-card-badge">${product.badge}</div>` : ''}
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-card-content">
                <h3 class="product-card-name">${product.name}</h3>
                <p class="product-card-category">${product.category}</p>
                <div class="product-card-price">
                    <span class="current">₵${product.price.toFixed(2)}</span>
                    ${product.originalPrice ? `<span class="original">₵${product.originalPrice.toFixed(2)}</span>` : ''}
                    ${discount > 0 ? `<span class="discount">${discount}% OFF</span>` : ''}
                </div>
                <div class="product-card-actions">
                    <button class="action-icon" onclick="addToCart(${JSON.stringify(product).replace(/"/g, '&quot;')})">
                        <i class="fas fa-shopping-bag"></i>
                    </button>
                    <button class="action-icon" onclick="openQuickview(${JSON.stringify(product).replace(/"/g, '&quot;')})">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="quickview-btn" onclick="openQuickview(${JSON.stringify(product).replace(/"/g, '&quot;')})">
                        Quick View
                    </button>
                </div>
            </div>
        </div>
    `;
}

function loadTrendingProducts() {
    const trendingProducts = products.filter(product => product.trending);
    
    trendingSlider.innerHTML = trendingProducts.map(product => `
        <div class="swiper-slide">
            <div class="trending-product glass-card">
                ${product.badge ? `<div class="trending-badge">${product.badge}</div>` : ''}
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-card-content">
                    <h3 class="product-card-name">${product.name}</h3>
                    <p class="product-card-category">${product.category}</p>
                    <div class="product-card-price">
                        <span class="current">₵${product.price.toFixed(2)}</span>
                        ${product.originalPrice ? `<span class="original">₵${product.originalPrice.toFixed(2)}</span>` : ''}
                    </div>
                    <div class="product-card-actions">
                        <button class="action-icon" onclick="addToCart(${JSON.stringify(product).replace(/"/g, '&quot;')})">
                            <i class="fas fa-shopping-bag"></i>
                        </button>
                        <button class="quickview-btn" onclick="openQuickview(${JSON.stringify(product).replace(/"/g, '&quot;')})">
                            View Details
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Quickview Modal
function openQuickview(product) {
    const discount = product.originalPrice 
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;
    
    quickviewContent.innerHTML = `
        <div class="quickview-image">
            <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="quickview-details">
            <h2>${product.name}</h2>
            <span class="quickview-category">${product.category}</span>
            <div class="quickview-price">
                <span class="quickview-current">₵${product.price.toFixed(2)}</span>
                ${product.originalPrice ? `<span class="quickview-original">₵${product.originalPrice.toFixed(2)}</span>` : ''}
                ${discount > 0 ? `<span class="quickview-discount">${discount}% OFF</span>` : ''}
            </div>
            <p class="quickview-description">${product.description}</p>
            <div class="quickview-actions">
                <div class="quantity-selector">
                    <button class="qty-btn minus">-</button>
                    <span class="qty-value">1</span>
                    <button class="qty-btn plus">+</button>
                </div>
                <button class="quickview-add" onclick="addToCartFromQuickview(${JSON.stringify(product).replace(/"/g, '&quot;')})">
                    Add to Cart
                </button>
            </div>
            <div class="social-checkout">
                <p>Or purchase directly via:</p>
                <div class="social-buttons">
                    <button class="social-btn whatsapp-btn" onclick="checkoutSingleProduct(${JSON.stringify(product).replace(/"/g, '&quot;')})">
                        <i class="fab fa-whatsapp"></i>
                        <span>Buy on WhatsApp</span>
                    </button>
                    <button class="social-btn snapchat-btn" onclick="checkoutSingleProduct(${JSON.stringify(product).replace(/"/g, '&quot;')}, 'snapchat')">
                        <i class="fab fa-snapchat-ghost"></i>
                        <span>Buy on Snapchat</span>
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Add quantity functionality
    const qtyValue = quickviewContent.querySelector('.qty-value');
    const minusBtn = quickviewContent.querySelector('.qty-btn.minus');
    const plusBtn = quickviewContent.querySelector('.qty-btn.plus');
    
    let quantity = 1;
    
    minusBtn.addEventListener('click', () => {
        if (quantity > 1) {
            quantity--;
            qtyValue.textContent = quantity;
        }
    });
    
    plusBtn.addEventListener('click', () => {
        quantity++;
        qtyValue.textContent = quantity;
    });
    
    quickviewModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function addToCartFromQuickview(product) {
    const quantity = parseInt(quickviewContent.querySelector('.qty-value').textContent);
    
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            ...product,
            quantity: quantity
        });
    }
    
    updateCartCount();
    renderCart();
    saveCart();
    showToast(`${quantity} ${product.name} added to cart!`, 'success');
    quickviewModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Checkout Functions
function checkoutViaWhatsApp() {
    if (cart.length === 0) {
        showToast('Your cart is empty!', 'error');
        return;
    }
    
    const message = generateCheckoutMessage();
    const phoneNumber = "233241234567"; // Replace with actual WhatsApp business number
    
    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
    
    // Show confirmation
    showToast('Opening WhatsApp...', 'success');
}

function checkoutViaSnapchat() {
    if (cart.length === 0) {
        showToast('Your cart is empty!', 'error');
        return;
    }
    
    const message = generateCheckoutMessage();
    
    // In a real implementation, this would open Snapchat
    // For demo, we'll show an alert with the order details
    alert(`Snapchat Checkout\n\nOrder Summary:\n${message}\n\nIn a real app, this would open Snapchat with your order.`);
    
    showToast('Preparing Snapchat checkout...', 'success');
}

function checkoutSingleProduct(product, platform = 'whatsapp') {
    const message = `Hello! I'd like to purchase:\n\n*${product.name}*\nPrice: ₵${product.price.toFixed(2)}\nQuantity: 1\n\nTotal: ₵${product.price.toFixed(2)}`;
    
    if (platform === 'whatsapp') {
        const phoneNumber = "233241234567";
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
    } else {
        alert(`Snapchat Checkout\n\n${message}\n\nIn a real app, this would open Snapchat.`);
    }
    
    showToast(`Opening ${platform === 'whatsapp' ? 'WhatsApp' : 'Snapchat'}...`, 'success');
}

function generateCheckoutMessage() {
    let message = "Hello! I'd like to place an order:\n\n";
    
    cart.forEach(item => {
        message += `*${item.name}*\nQuantity: ${item.quantity}\nPrice: ₵${item.price.toFixed(2)} each\nSubtotal: ₵${(item.price * item.quantity).toFixed(2)}\n\n`;
    });
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    message += `*TOTAL: ₵${total.toFixed(2)}*\n\nPlease provide payment details and delivery address.`;
    
    return message;
}

// Search Functionality
function openSearch() {
    searchOverlay.classList.add('active');
    searchInput.focus();
    document.body.style.overflow = 'hidden';
    // Close other overlays
    closeCartDropdown();
    closeMobileMenu();
}

function closeSearchOverlay() {
    searchOverlay.classList.remove('active');
    searchInput.value = '';
    searchResults.innerHTML = '';
    document.body.style.overflow = 'auto';
}

function handleSearch() {
    const query = searchInput.value.toLowerCase().trim();
    
    if (query.length < 2) {
        searchResults.innerHTML = '';
        return;
    }
    
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.category.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
    );
    
    if (filteredProducts.length === 0) {
        searchResults.innerHTML = '<p class="no-results">No products found. Try a different search term.</p>';
        return;
    }
    
    searchResults.innerHTML = filteredProducts.map(product => `
        <div class="search-result" onclick="openQuickview(${JSON.stringify(product).replace(/"/g, '&quot;')}); closeSearchOverlay();">
            <img src="${product.image}" alt="${product.name}">
            <div class="search-result-info">
                <h4>${product.name}</h4>
                <p>${product.category} • ₵${product.price.toFixed(2)}</p>
            </div>
        </div>
    `).join('');
}

// Mobile Menu Functions - FIXED
function toggleMobileMenu() {
    glassNav.classList.toggle('active');
    menuBtn.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = glassNav.classList.contains('active') ? 'hidden' : 'auto';
    
    // Close cart if open
    closeCartDropdown();
}

function closeMobileMenu() {
    glassNav.classList.remove('active');
    menuBtn.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Animations
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.dataset.count);
        const increment = target / 50;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target + (stat.dataset.count.includes('K') ? 'K+' : '+');
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current) + (stat.dataset.count.includes('K') ? 'K' : '');
            }
        }, 30);
    });
}

// Swiper Slider
function setupSwiper() {
    const swiper = new Swiper('.trending-slider', {
        slidesPerView: 'auto',
        spaceBetween: 30,
        centeredSlides: true,
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 20
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 30
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 30
            }
        }
    });
}

// Toast Notifications
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    const icon = type === 'success' ? 'check-circle' : 
                 type === 'error' ? 'exclamation-circle' : 'info-circle';
    
    toast.innerHTML = `
        <div class="toast-icon">
            <i class="fas fa-${icon}"></i>
        </div>
        <div class="toast-content">
            <h4>${type.charAt(0).toUpperCase() + type.slice(1)}</h4>
            <p>${message}</p>
        </div>
    `;
    
    toastContainer.appendChild(toast);
    
    // Show toast
    setTimeout(() => toast.classList.add('show'), 100);
    
    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Loading Overlay
function showLoading() {
    loadingOverlay.classList.add('active');
}

function hideLoading() {
    loadingOverlay.classList.remove('active');
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Make functions available globally
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
window.openQuickview = openQuickview;
window.checkoutSingleProduct = checkoutSingleProduct;
window.checkoutViaWhatsApp = checkoutViaWhatsApp;
window.checkoutViaSnapchat = checkoutViaSnapchat;