// Core Application Logic
class ECommerceApp {
    constructor() {
        this.products = [];
        this.currentUser = null;
        this.init();
    }

    init() {
        this.loadSampleData();
        this.setupEventListeners();
        this.updateUI();
    }

    // Sample product data
    loadSampleData() {
        this.products = [
            {
                id: 1,
                name: "iPhone 15 Pro",
                category: "smartphones",
                price: 999.99,
                originalPrice: 1099.99,
                image: "https://via.placeholder.com/400x300/007AFF/ffffff?text=iPhone+15+Pro",
                images: [
                    "https://via.placeholder.com/500x400/007AFF/ffffff?text=iPhone+15+Pro",
                    "https://via.placeholder.com/600x450/007AFF/ffffff?text=iPhone+15+Pro"
                ],
                description: "The most advanced iPhone ever with titanium design and A17 Pro chip.",
                rating: 4.8,
                reviews: 1250,
                inStock: true,
                specs: {
                    "Display": "6.1-inch Super Retina XDR",
                    "Chip": "A17 Pro",
                    "Storage": "128GB",
                    "Camera": "48MP Main + 12MP Ultra Wide"
                }
            },
            {
                id: 2,
                name: "MacBook Pro 14\"",
                category: "laptops",
                price: 1999.99,
                image: "https://via.placeholder.com/400x300/000000/ffffff?text=MacBook+Pro+14",
                images: [
                    "https://via.placeholder.com/500x400/000000/ffffff?text=MacBook+Pro+14",
                    "https://via.placeholder.com/600x450/000000/ffffff?text=MacBook+Pro+14"
                ],
                description: "Supercharged by M3 Pro chip for extreme performance.",
                rating: 4.9,
                reviews: 890,
                inStock: true,
                specs: {
                    "Display": "14.2-inch Liquid Retina XDR",
                    "Chip": "Apple M3 Pro",
                    "Memory": "18GB Unified Memory",
                    "Storage": "512GB SSD"
                }
            },
            {
                id: 3,
                name: "AirPods Pro (2nd Gen)",
                category: "headphones",
                price: 249.99,
                image: "https://via.placeholder.com/400x300/f3f4f6/000000?text=AirPods+Pro",
                images: [
                    "https://via.placeholder.com/500x400/f3f4f6/000000?text=AirPods+Pro"
                ],
                description: "Active Noise Cancellation and Spatial Audio for immersive sound.",
                rating: 4.7,
                reviews: 2100,
                inStock: true,
                specs: {
                    "Chip": "Apple H2",
                    "Battery": "Up to 6 hours listening time",
                    "Features": "Active Noise Cancellation, Spatial Audio"
                }
            },
            {
                id: 4,
                name: "Magic Keyboard",
                category: "accessories",
                price: 99.99,
                image: "https://via.placeholder.com/400x300/6b7280/ffffff?text=Magic+Keyboard",
                images: [
                    "https://via.placeholder.com/500x400/6b7280/ffffff?text=Magic+Keyboard"
                ],
                description: "Wireless keyboard with scissor mechanism and numeric keypad.",
                rating: 4.5,
                reviews: 650,
                inStock: true,
                specs: {
                    "Connectivity": "Bluetooth",
                    "Battery": "Rechargeable lithium-ion",
                    "Compatibility": "Mac, iPad, iPhone"
                }
            },
            {
                id: 5,
                name: "Samsung Galaxy S24 Ultra",
                category: "smartphones",
                price: 1199.99,
                image: "https://via.placeholder.com/400x300/1428A0/ffffff?text=Samsung+Galaxy+S24+Ultra",
                images: [
                    "https://via.placeholder.com/500x400/1428A0/ffffff?text=Samsung+Galaxy+S24+Ultra"
                ],
                description: "Ultimate smartphone with S Pen and 200MP camera.",
                rating: 4.6,
                reviews: 980,
                inStock: true,
                specs: {
                    "Display": "6.8-inch Dynamic AMOLED 2X",
                    "Processor": "Snapdragon 8 Gen 3",
                    "Storage": "256GB",
                    "Camera": "200MP Main + 50MP Periscope Telephoto"
                }
            },
            {
                id: 6,
                name: "Dell XPS 13",
                category: "laptops",
                price: 1299.99,
                image: "https://via.placeholder.com/400x300/2563eb/ffffff?text=Dell+XPS+13",
                images: [
                    "https://via.placeholder.com/500x400/2563eb/ffffff?text=Dell+XPS+13"
                ],
                description: "Ultra-portable laptop with InfinityEdge display.",
                rating: 4.4,
                reviews: 720,
                inStock: true,
                specs: {
                    "Display": "13.4-inch FHD+ InfinityEdge",
                    "Processor": "Intel Core i7-1360P",
                    "Memory": "16GB LPDDR5",
                    "Storage": "512GB PCIe SSD"
                }
            },
            {
                id: 7,
                name: "Sony WH-1000XM5",
                category: "headphones",
                price: 399.99,
                image: "https://via.placeholder.com/400x300/8b5cf6/ffffff?text=Sony+WH-1000XM5",
                images: [
                    "https://via.placeholder.com/500x400/8b5cf6/ffffff?text=Sony+WH-1000XM5"
                ],
                description: "Industry-leading noise canceling headphones.",
                rating: 4.8,
                reviews: 1850,
                inStock: true,
                specs: {
                    "Driver": "30mm",
                    "Battery": "30 hours",
                    "Connectivity": "Bluetooth 5.2, NFC",
                    "Features": "Active Noise Canceling, Quick Charge"
                }
            },
            {
                id: 8,
                name: "iPad Pro 12.9",
                category: "accessories",
                price: 1099.99,
                image: "https://via.placeholder.com/400x300/6366f1/ffffff?text=iPad+Pro+12.9",
                images: [
                    "https://via.placeholder.com/500x400/6366f1/ffffff?text=iPad+Pro+12.9"
                ],
                description: "The ultimate iPad experience with M2 chip.",
                rating: 4.7,
                reviews: 980,
                inStock: true,
                specs: {
                    "Display": "12.9-inch Liquid Retina XDR",
                    "Chip": "Apple M2",
                    "Storage": "128GB",
                    "Camera": "12MP Wide, 10MP Ultra Wide"
                }
            },
            {
                id: 9,
                name: "Google Pixel 8 Pro",
                category: "smartphones",
                price: 999.99,
                image: "https://via.placeholder.com/400x300/34d399/ffffff?text=Google+Pixel+8+Pro",
                images: [
                    "https://via.placeholder.com/500x400/34d399/ffffff?text=Google+Pixel+8+Pro"
                ],
                description: "AI-powered photography and pure Android experience.",
                rating: 4.6,
                reviews: 750,
                inStock: true,
                specs: {
                    "Display": "6.7-inch LTPO OLED",
                    "Processor": "Google Tensor G3",
                    "Storage": "128GB",
                    "Camera": "50MP Main + 48MP Telephoto + 48MP Ultra Wide"
                }
            },
            {
                id: 10,
                name: "Apple Watch Series 9",
                category: "accessories",
                price: 399.99,
                image: "https://via.placeholder.com/400x300/1f2937/ffffff?text=Apple+Watch+Series+9",
                images: [
                    "https://via.placeholder.com/500x400/1f2937/ffffff?text=Apple+Watch+Series+9"
                ],
                description: "Advanced health and fitness tracking.",
                rating: 4.5,
                reviews: 1200,
                inStock: true,
                specs: {
                    "Display": "45mm Retina LTPO OLED",
                    "Chip": "S9 SiP",
                    "Battery": "Up to 18 hours",
                    "Features": "GPS, Cellular, Health Sensors"
                }
            },
            {
                id: 11,
                name: "Microsoft Surface Laptop 5",
                category: "laptops",
                price: 1299.99,
                image: "https://via.placeholder.com/400x300/0078d4/ffffff?text=Surface+Laptop+5",
                images: [
                    "https://via.placeholder.com/500x400/0078d4/ffffff?text=Surface+Laptop+5"
                ],
                description: "Premium laptop with touchscreen display.",
                rating: 4.3,
                reviews: 650,
                inStock: true,
                specs: {
                    "Display": "13.5-inch PixelSense Touchscreen",
                    "Processor": "Intel Core i7-1255U",
                    "Memory": "16GB LPDDR5x",
                    "Storage": "512GB SSD"
                }
            },
            {
                id: 12,
                name: "Logitech MX Master 3S",
                category: "accessories",
                price: 99.99,
                image: "https://via.placeholder.com/400x300/6b7280/ffffff?text=MX+Master+3S",
                images: [
                    "https://via.placeholder.com/500x400/6b7280/ffffff?text=MX+Master+3S"
                ],
                description: "Advanced wireless mouse for productivity.",
                rating: 4.6,
                reviews: 890,
                inStock: true,
                specs: {
                    "Connectivity": "Bluetooth, USB-C",
                    "Battery": "70 days on full charge",
                    "DPI": "Up to 8000 DPI",
                    "Features": "MagSpeed Scroll, Multi-device"
                }
            }
        ];

        // Save to localStorage
        localStorage.setItem('products', JSON.stringify(this.products));
    }

    // Event listeners setup
    setupEventListeners() {
        // Modal controls
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('close') || e.target.classList.contains('modal')) {
                this.closeModals();
            }
        });

        // Login button
        const loginBtn = document.getElementById('loginBtn');
        if (loginBtn) {
            loginBtn.addEventListener('click', () => this.showModal('loginModal'));
        }

        // Cart button
        const cartBtn = document.getElementById('cartBtn');
        if (cartBtn) {
            cartBtn.addEventListener('click', () => this.showModal('cartModal'));
        }

        // Wishlist button
        const wishlistBtn = document.getElementById('wishlistBtn');
        if (wishlistBtn) {
            wishlistBtn.addEventListener('click', () => this.showWishlist());
        }
    }

    // Modal management
    showModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('show');
        }
    }

    closeModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.remove('show');
        });
    }

    // Update UI elements
    updateUI() {
        this.updateCartCount();
        this.updateWishlistCount();
        this.updateLoginStatus();
    }

    updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        const cartCountEl = document.getElementById('cartCount');
        if (cartCountEl) {
            cartCountEl.textContent = count;
        }
    }

    updateWishlistCount() {
        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        const wishlistCountEl = document.getElementById('wishlistCount');
        if (wishlistCountEl) {
            wishlistCountEl.textContent = wishlist.length;
        }
    }

    updateLoginStatus() {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        const loginBtn = document.getElementById('loginBtn');
        if (loginBtn) {
            if (user) {
                loginBtn.textContent = `Hi, ${user.name}`;
                loginBtn.onclick = () => this.logout();
            } else {
                loginBtn.textContent = 'Login';
                loginBtn.onclick = () => this.showModal('loginModal');
            }
        }
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.showToast('Logged out successfully');
        this.updateLoginStatus();
    }

    showWishlist() {
        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        if (wishlist.length === 0) {
            this.showToast('Your wishlist is empty');
            return;
        }
        
        // Redirect to products page with wishlist filter
        window.location.href = 'products.html?wishlist=true';
    }

    // Toast notifications
    showToast(message, type = 'success') {
        const toast = document.getElementById('toast');
        if (toast) {
            toast.textContent = message;
            toast.className = `toast ${type} show`;
            
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        }
    }

    // Utility functions
    formatPrice(price) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(price);
    }

    generateStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        let stars = '';
        
        for (let i = 0; i < fullStars; i++) {
            stars += '★';
        }
        
        if (hasHalfStar) {
            stars += '☆';
        }
        
        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars += '☆';
        }
        
        return stars;
    }

    // Get product by ID
    getProduct(id) {
        return this.products.find(product => product.id === parseInt(id));
    }

    // Filter products
    filterProducts(filters) {
        let filtered = [...this.products];
        
        if (filters.category && filters.category !== 'all') {
            filtered = filtered.filter(product => product.category === filters.category);
        }
        
        if (filters.maxPrice) {
            filtered = filtered.filter(product => product.price <= filters.maxPrice);
        }
        
        if (filters.minRating) {
            filtered = filtered.filter(product => product.rating >= filters.minRating);
        }
        
        if (filters.search) {
            const searchTerm = filters.search.toLowerCase();
            filtered = filtered.filter(product => 
                product.name.toLowerCase().includes(searchTerm) ||
                product.description.toLowerCase().includes(searchTerm)
            );
        }
        
        return filtered;
    }

    // Sort products
    sortProducts(products, sortBy) {
        const sorted = [...products];
        
        switch (sortBy) {
            case 'price-low':
                return sorted.sort((a, b) => a.price - b.price);
            case 'price-high':
                return sorted.sort((a, b) => b.price - a.price);
            case 'rating':
                return sorted.sort((a, b) => b.rating - a.rating);
            case 'name':
            default:
                return sorted.sort((a, b) => a.name.localeCompare(b.name));
        }
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new ECommerceApp();
    
    // Load featured products on homepage
    if (document.getElementById('featuredProducts')) {
        loadFeaturedProducts();
    }
});

// Load featured products for homepage
async function loadFeaturedProducts() {
    const container = document.getElementById('featuredProducts');
    if (!container) return;
    
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const featured = products.slice(0, 4);
    
    // Load products with MCP tool images
    for (const product of featured) {
        const imageResult = await window.mcpImageTool.getProductImages(product.name, 1);
        
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.onclick = () => window.location.href = `product-detail.html?id=${product.id}`;
        
        productCard.innerHTML = `
            <img src="${imageResult.images[0]}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-rating">
                    <span class="stars">${window.app.generateStars(product.rating)}</span>
                    <span>(${product.reviews})</span>
                </div>
                <div class="product-price">${window.app.formatPrice(product.price)}</div>
                <div class="product-actions">
                    <button class="btn btn-primary" onclick="event.stopPropagation(); addToCart(${product.id})">Add to Cart</button>
                    <button class="btn btn-secondary" onclick="event.stopPropagation(); toggleWishlist(${product.id})">❤️</button>
                </div>
            </div>
        `;
        
        container.appendChild(productCard);
    }
}

// Add to cart function
async function addToCart(productId) {
    const product = window.app.getProduct(productId);
    if (!product) return;
    
    const imageResult = await window.mcpImageTool.getProductImages(product.name, 1);
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            image: imageResult.images[0],
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    window.app.updateCartCount();
    window.app.showToast(`${product.name} added to cart!`);
}

// Toggle wishlist
function toggleWishlist(productId) {
    const product = window.app.getProduct(productId);
    if (!product) return;
    
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const existingIndex = wishlist.findIndex(item => item.id === productId);
    
    if (existingIndex > -1) {
        wishlist.splice(existingIndex, 1);
        window.app.showToast(`${product.name} removed from wishlist`);
    } else {
        wishlist.push({
            id: productId,
            name: product.name,
            price: product.price,
            image: product.image
        });
        window.app.showToast(`${product.name} added to wishlist!`);
    }
    
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    window.app.updateWishlistCount();
}