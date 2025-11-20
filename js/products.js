// Products page functionality
class ProductsPage {
    constructor() {
        this.currentFilters = {
            category: null,
            maxPrice: 2000,
            minRating: 0,
            search: ''
        };
        this.currentSort = 'name';
        this.init();
    }

    init() {
        this.loadURLParams();
        this.setupEventListeners();
        this.loadProducts();

    }
    

    loadURLParams() {
        const urlParams = new URLSearchParams(window.location.search);
        
        // Set category from URL
        const category = urlParams.get('category');
        if (category) {
            this.currentFilters.category = category;
            this.updateCategoryUI(category);
        }

        // Handle wishlist view
        const wishlist = urlParams.get('wishlist');
        if (wishlist === 'true') {
            this.showWishlistProducts();
            return;
        }

        // Set search from URL
        const search = urlParams.get('search');
        if (search) {
            this.currentFilters.search = search;
            const searchInput = document.getElementById('searchInput');
            if (searchInput) {
                searchInput.value = search;
            }
        }
    }

    updateCategoryUI(category) {
        // Update page title
        const pageTitle = document.getElementById('pageTitle');
        const currentCategory = document.getElementById('currentCategory');
        
        if (pageTitle && currentCategory) {
            const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
            pageTitle.textContent = categoryName;
            currentCategory.textContent = categoryName;
        }

        // Check the appropriate filter checkbox
        const categoryCheckboxes = document.querySelectorAll('.filter-group input[type="checkbox"]');
        categoryCheckboxes.forEach(checkbox => {
            if (checkbox.value === category) {
                checkbox.checked = true;
            }
        });
    }

    setupEventListeners() {
        // Filter checkboxes
        document.querySelectorAll('.filter-group input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', () => this.handleFilterChange());
        });

        // Price range slider
        const priceRange = document.getElementById('priceRange');
        const priceValue = document.getElementById('priceValue');
        if (priceRange && priceValue) {
            priceRange.addEventListener('input', (e) => {
                priceValue.textContent = e.target.value;
                this.currentFilters.maxPrice = parseInt(e.target.value);
                this.loadProducts();
            });
        }

        // Sort dropdown
        const sortSelect = document.getElementById('sortSelect');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.currentSort = e.target.value;
                this.loadProducts();
            });
        }

        // Clear filters button
        const clearFilters = document.querySelector('.clear-filters');
        if (clearFilters) {
            clearFilters.addEventListener('click', () => this.clearAllFilters());
        }

        // Search functionality
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.currentFilters.search = e.target.value;
                this.debounceSearch();
            });
        }
    }

    handleFilterChange() {
        // Get selected categories
        const categoryCheckboxes = document.querySelectorAll('.filter-group input[value="smartphones"], .filter-group input[value="laptops"], .filter-group input[value="headphones"], .filter-group input[value="accessories"]');
        const selectedCategories = Array.from(categoryCheckboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.value);

        this.currentFilters.category = selectedCategories.length === 1 ? selectedCategories[0] : null;

        // Get selected rating
        const ratingCheckboxes = document.querySelectorAll('.filter-group input[value="4"], .filter-group input[value="3"]');
        const selectedRatings = Array.from(ratingCheckboxes)
            .filter(cb => cb.checked)
            .map(cb => parseInt(cb.value));

        this.currentFilters.minRating = selectedRatings.length > 0 ? Math.max(...selectedRatings) : 0;

        this.loadProducts();
    }

    debounceSearch() {
        clearTimeout(this.searchTimeout);
        this.searchTimeout = setTimeout(() => {
            this.loadProducts();
        }, 300);
    }

    clearAllFilters() {
        // Reset filters
        this.currentFilters = {
            category: null,
            maxPrice: 2000,
            minRating: 0,
            search: ''
        };

        // Reset UI
        document.querySelectorAll('.filter-group input[type="checkbox"]').forEach(cb => {
            cb.checked = false;
        });

        const priceRange = document.getElementById('priceRange');
        const priceValue = document.getElementById('priceValue');
        if (priceRange && priceValue) {
            priceRange.value = 2000;
            priceValue.textContent = '2000';
        }

        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.value = '';
        }

        this.loadProducts();
    }

    loadProducts() {
        const productsGrid = document.getElementById('productsGrid');
        const loading = document.getElementById('loading');
        
        if (!productsGrid) return;

        // Show loading
        if (loading) loading.style.display = 'block';
        productsGrid.innerHTML = '';

        // Simulate loading delay
        setTimeout(() => {
            const products = JSON.parse(localStorage.getItem('products')) || [];
            let filteredProducts = window.app.filterProducts(this.currentFilters);
            
            // Apply category filter for multiple categories
            if (this.currentFilters.category === null) {
                const categoryCheckboxes = document.querySelectorAll('.filter-group input[value="smartphones"], .filter-group input[value="laptops"], .filter-group input[value="headphones"], .filter-group input[value="accessories"]');
                const selectedCategories = Array.from(categoryCheckboxes)
                    .filter(cb => cb.checked)
                    .map(cb => cb.value);
                
                if (selectedCategories.length > 0) {
                    filteredProducts = filteredProducts.filter(product => 
                        selectedCategories.includes(product.category)
                    );
                }
            }

            const sortedProducts = window.app.sortProducts(filteredProducts, this.currentSort);

            // Hide loading
            if (loading) loading.style.display = 'none';

            if (sortedProducts.length === 0) {
                productsGrid.innerHTML = '<div class="no-products">No products found matching your criteria.</div>';
                return;
            }

            this.loadProductsWithMCP(sortedProducts, productsGrid);
        }, 500);
    }

    async loadProductsWithMCP(products, container) {
        container.innerHTML = '';
        
        for (const product of products) {
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
                    <div class="product-price">
                        ${window.app.formatPrice(product.price)}
                        ${product.originalPrice ? `<span class="original-price">${window.app.formatPrice(product.originalPrice)}</span>` : ''}
                    </div>
                    <div class="product-actions">
                        <button class="btn btn-primary" onclick="event.stopPropagation(); addToCart(${product.id})">Add to Cart</button>
                        <button class="btn btn-secondary" onclick="event.stopPropagation(); toggleWishlist(${product.id})">❤️</button>
                        <button class="btn btn-secondary" onclick="event.stopPropagation(); showQuickView(${product.id})">Quick View</button>
                    </div>
                </div>
            `;
            
            container.appendChild(productCard);
        }
    }

    showWishlistProducts() {
        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        const productsGrid = document.getElementById('productsGrid');
        const pageTitle = document.getElementById('pageTitle');
        const currentCategory = document.getElementById('currentCategory');
        
        if (pageTitle) pageTitle.textContent = 'My Wishlist';
        if (currentCategory) currentCategory.textContent = 'Wishlist';

        if (wishlist.length === 0) {
            productsGrid.innerHTML = '<div class="no-products">Your wishlist is empty. <a href="products.html">Continue shopping</a></div>';
            return;
        }

        const products = JSON.parse(localStorage.getItem('products')) || [];
        const wishlistProducts = products.filter(product => 
            wishlist.some(item => item.id === product.id)
        );

        this.loadProductsWithMCP(wishlistProducts, productsGrid);
    }
}

// Quick view functionality
async function showQuickView(productId) {
    const product = window.app.getProduct(productId);
    if (!product) return;

    const modal = document.getElementById('quickViewModal');
    const content = document.getElementById('quickViewContent');
    
    if (!modal || !content) return;

    const imageResult = await window.mcpImageTool.getProductImages(product.name, 1);

    content.innerHTML = `
        <div class="quick-view-layout">
            <div class="quick-view-image">
                <img src="${imageResult.images[0]}" alt="${product.name}">
            </div>
            <div class="quick-view-info">
                <h2>${product.name}</h2>
                <div class="product-rating">
                    <span class="stars">${window.app.generateStars(product.rating)}</span>
                    <span>(${product.reviews} reviews)</span>
                </div>
                <div class="product-price">${window.app.formatPrice(product.price)}</div>
                <p>${product.description}</p>
                <div class="quick-view-actions">
                    <button class="btn btn-primary" onclick="addToCart(${product.id}); window.app.closeModals();">Add to Cart</button>
                    <button class="btn btn-secondary" onclick="window.location.href='product-detail.html?id=${product.id}'">View Details</button>
                </div>
            </div>
        </div>
    `;

    modal.classList.add('show');
}

// Initialize products page
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('productsGrid')) {
        new ProductsPage();
    }
});