// Search functionality
class SearchSystem {
    constructor() {
        this.searchTimeout = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        const searchInput = document.getElementById('searchInput');
        const searchBtn = document.getElementById('searchBtn');
        const searchSuggestions = document.getElementById('searchSuggestions');

        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.handleSearchInput(e.target.value);
            });

            searchInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.performSearch(e.target.value);
                }
            });

            searchInput.addEventListener('focus', () => {
                if (searchInput.value.trim()) {
                    this.showSuggestions(searchInput.value);
                }
            });

            searchInput.addEventListener('blur', () => {
                // Delay hiding suggestions to allow clicking on them
                setTimeout(() => {
                    this.hideSuggestions();
                }, 200);
            });
        }

        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                const query = searchInput ? searchInput.value : '';
                this.performSearch(query);
            });
        }
    }

    handleSearchInput(query) {
        clearTimeout(this.searchTimeout);
        
        if (query.trim().length === 0) {
            this.hideSuggestions();
            return;
        }

        // Debounce search suggestions
        this.searchTimeout = setTimeout(() => {
            this.showSuggestions(query);
        }, 300);
    }

    showSuggestions(query) {
        const searchSuggestions = document.getElementById('searchSuggestions');
        if (!searchSuggestions || !query.trim()) return;

        const products = JSON.parse(localStorage.getItem('products')) || [];
        const suggestions = this.getSuggestions(query, products);

        if (suggestions.length === 0) {
            this.hideSuggestions();
            return;
        }

        searchSuggestions.innerHTML = suggestions.map(suggestion => `
            <div class="suggestion-item" onclick="search.selectSuggestion('${suggestion.query}', ${suggestion.productId || 'null'})">
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                    ${suggestion.type === 'product' ? '🔍' : '📱'}
                    <span>${suggestion.text}</span>
                </div>
            </div>
        `).join('');

        searchSuggestions.classList.add('show');
    }

    getSuggestions(query, products) {
        const suggestions = [];
        const queryLower = query.toLowerCase();

        // Product name suggestions
        const productSuggestions = products
            .filter(product => 
                product.name.toLowerCase().includes(queryLower) ||
                product.description.toLowerCase().includes(queryLower)
            )
            .slice(0, 5)
            .map(product => ({
                type: 'product',
                text: product.name,
                query: product.name,
                productId: product.id
            }));

        suggestions.push(...productSuggestions);

        // Category suggestions
        const categories = ['smartphones', 'laptops', 'headphones', 'accessories'];
        const categorySuggestions = categories
            .filter(category => category.toLowerCase().includes(queryLower))
            .map(category => ({
                type: 'category',
                text: `${category.charAt(0).toUpperCase() + category.slice(1)}`,
                query: category
            }));

        suggestions.push(...categorySuggestions);

        // Search term suggestion
        if (suggestions.length === 0 || !suggestions.some(s => s.query.toLowerCase() === queryLower)) {
            suggestions.unshift({
                type: 'search',
                text: `Search for "${query}"`,
                query: query
            });
        }

        return suggestions.slice(0, 6); // Limit to 6 suggestions
    }

    selectSuggestion(query, productId = null) {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.value = query;
        }

        this.hideSuggestions();

        if (productId) {
            // Navigate to specific product
            window.location.href = `product-detail.html?id=${productId}`;
        } else {
            // Perform search
            this.performSearch(query);
        }
    }

    hideSuggestions() {
        const searchSuggestions = document.getElementById('searchSuggestions');
        if (searchSuggestions) {
            searchSuggestions.classList.remove('show');
        }
    }

    performSearch(query) {
        if (!query.trim()) {
            window.app.showToast('Please enter a search term', 'error');
            return;
        }

        // Check if it's a category search
        const categories = ['smartphones', 'laptops', 'headphones', 'accessories'];
        const category = categories.find(cat => 
            cat.toLowerCase() === query.toLowerCase()
        );

        if (category) {
            // Navigate to category page
            window.location.href = `products.html?category=${category}`;
        } else {
            // Navigate to search results
            window.location.href = `products.html?search=${encodeURIComponent(query)}`;
        }

        this.hideSuggestions();
    }

    // Advanced search with filters
    advancedSearch(filters) {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        let results = [...products];

        // Apply text search
        if (filters.query) {
            const queryLower = filters.query.toLowerCase();
            results = results.filter(product =>
                product.name.toLowerCase().includes(queryLower) ||
                product.description.toLowerCase().includes(queryLower) ||
                product.category.toLowerCase().includes(queryLower)
            );
        }

        // Apply category filter
        if (filters.category && filters.category !== 'all') {
            results = results.filter(product => product.category === filters.category);
        }

        // Apply price range filter
        if (filters.minPrice !== undefined) {
            results = results.filter(product => product.price >= filters.minPrice);
        }
        if (filters.maxPrice !== undefined) {
            results = results.filter(product => product.price <= filters.maxPrice);
        }

        // Apply rating filter
        if (filters.minRating !== undefined) {
            results = results.filter(product => product.rating >= filters.minRating);
        }

        // Apply availability filter
        if (filters.inStock) {
            results = results.filter(product => product.inStock);
        }

        return results;
    }

    // Get search suggestions for autocomplete
    getSearchSuggestions(query, limit = 5) {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        const suggestions = new Set();

        const queryLower = query.toLowerCase();

        // Add product names
        products.forEach(product => {
            if (product.name.toLowerCase().includes(queryLower)) {
                suggestions.add(product.name);
            }
        });

        // Add categories
        const categories = ['smartphones', 'laptops', 'headphones', 'accessories'];
        categories.forEach(category => {
            if (category.toLowerCase().includes(queryLower)) {
                suggestions.add(category.charAt(0).toUpperCase() + category.slice(1));
            }
        });

        return Array.from(suggestions).slice(0, limit);
    }

    // Search history management
    saveSearchHistory(query) {
        if (!query.trim()) return;

        let history = JSON.parse(localStorage.getItem('searchHistory')) || [];
        
        // Remove if already exists
        history = history.filter(item => item !== query);
        
        // Add to beginning
        history.unshift(query);
        
        // Keep only last 10 searches
        history = history.slice(0, 10);
        
        localStorage.setItem('searchHistory', JSON.stringify(history));
    }

    getSearchHistory() {
        return JSON.parse(localStorage.getItem('searchHistory')) || [];
    }

    clearSearchHistory() {
        localStorage.removeItem('searchHistory');
    }
}

// Initialize search system
let search;
document.addEventListener('DOMContentLoaded', () => {
    search = new SearchSystem();
});