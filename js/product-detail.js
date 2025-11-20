// Product detail page functionality
class ProductDetailPage {
    constructor() {
        this.currentProduct = null;
        this.currentImageIndex = 0;
        this.init();
    }

    init() {
        this.loadProduct();
        this.setupEventListeners();
    }

    loadProduct() {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
        
        if (!productId) {
            window.location.href = 'products.html';
            return;
        }

        this.currentProduct = window.app.getProduct(parseInt(productId));
        
        if (!this.currentProduct) {
            window.location.href = 'products.html';
            return;
        }

        this.renderProduct();
        this.loadReviews();
    }

    setupEventListeners() {
        // Add to cart button
        const addToCartBtn = document.getElementById('addToCartBtn');
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', () => this.handleAddToCart());
        }

        // Add to wishlist button
        const addToWishlistBtn = document.getElementById('addToWishlistBtn');
        if (addToWishlistBtn) {
            addToWishlistBtn.addEventListener('click', () => this.handleAddToWishlist());
        }

        // Load more reviews
        const loadMoreReviews = document.getElementById('loadMoreReviews');
        if (loadMoreReviews) {
            loadMoreReviews.addEventListener('click', () => this.loadMoreReviews());
        }
    }

    renderProduct() {
        const product = this.currentProduct;
        
        // Update page title and breadcrumb
        document.title = `${product.name} - TechStore`;
        const productName = document.getElementById('productName');
        const categoryLink = document.getElementById('categoryLink');
        
        if (productName) productName.textContent = product.name;
        if (categoryLink) {
            categoryLink.href = `products.html?category=${product.category}`;
            categoryLink.textContent = product.category.charAt(0).toUpperCase() + product.category.slice(1);
        }

        // Product images
        this.renderImages();

        // Product info
        const productTitle = document.getElementById('productTitle');
        const productStars = document.getElementById('productStars');
        const reviewCount = document.getElementById('reviewCount');
        const currentPrice = document.getElementById('currentPrice');
        const originalPrice = document.getElementById('originalPrice');
        const productDescription = document.getElementById('productDescription');
        const productSpecs = document.getElementById('productSpecs');

        if (productTitle) productTitle.textContent = product.name;
        if (productStars) productStars.innerHTML = window.app.generateStars(product.rating);
        if (reviewCount) reviewCount.textContent = `(${product.reviews} reviews)`;
        if (currentPrice) currentPrice.textContent = window.app.formatPrice(product.price);
        
        if (originalPrice && product.originalPrice) {
            originalPrice.textContent = window.app.formatPrice(product.originalPrice);
            originalPrice.style.display = 'inline';
        }

        if (productDescription) productDescription.textContent = product.description;

        // Render specifications
        if (productSpecs && product.specs) {
            productSpecs.innerHTML = `
                <h3>Specifications</h3>
                <div class="specs-list">
                    ${Object.entries(product.specs).map(([key, value]) => `
                        <div class="spec-item">
                            <span class="spec-label">${key}:</span>
                            <span class="spec-value">${value}</span>
                        </div>
                    `).join('')}
                </div>
            `;
        }
    }

    async renderImages() {
        const product = this.currentProduct;
        const mainImage = document.getElementById('mainImage');
        const thumbnails = document.getElementById('thumbnails');
        
        if (!mainImage || !thumbnails) return;

        const imageResult = await window.mcpImageTool.getProductImages(product.name, 3);
        const images = imageResult.images;
        
        // Set main image
        mainImage.src = images[0];
        mainImage.alt = product.name;

        // Render thumbnails
        if (images.length > 1) {
            thumbnails.innerHTML = images.map((image, index) => `
                <img src="${image}" alt="${product.name} ${index + 1}" 
                     class="thumbnail ${index === 0 ? 'active' : ''}"
                     onclick="productDetail.changeMainImage(${index})">
            `).join('');
            this.productImages = images;
        } else {
            thumbnails.style.display = 'none';
        }
    }

    changeMainImage(index) {
        const images = this.productImages || [];
        const mainImage = document.getElementById('mainImage');
        
        if (mainImage && images[index]) {
            mainImage.src = images[index];
            this.currentImageIndex = index;
            
            // Update active thumbnail
            document.querySelectorAll('.thumbnail').forEach((thumb, i) => {
                thumb.classList.toggle('active', i === index);
            });
        }
    }

    handleAddToCart() {
        const quantity = parseInt(document.getElementById('quantity').value) || 1;
        const product = this.currentProduct;
        
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingItem = cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: quantity
            });
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        window.app.updateCartCount();
        window.app.showToast(`${quantity} ${product.name}(s) added to cart!`);
    }

    handleAddToWishlist() {
        const product = this.currentProduct;
        let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        const existingIndex = wishlist.findIndex(item => item.id === product.id);
        
        if (existingIndex > -1) {
            wishlist.splice(existingIndex, 1);
            window.app.showToast(`${product.name} removed from wishlist`);
            document.getElementById('addToWishlistBtn').innerHTML = '❤️ Add to Wishlist';
        } else {
            wishlist.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image
            });
            window.app.showToast(`${product.name} added to wishlist!`);
            document.getElementById('addToWishlistBtn').innerHTML = '💖 In Wishlist';
        }
        
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        window.app.updateWishlistCount();
    }

    loadReviews() {
        // Generate sample reviews for the product
        const reviews = this.generateSampleReviews();
        this.renderReviews(reviews.slice(0, 3)); // Show first 3 reviews
        
        // Update average rating
        const avgRating = document.getElementById('avgRating');
        const avgStars = document.getElementById('avgStars');
        
        if (avgRating && avgStars) {
            avgRating.textContent = this.currentProduct.rating.toFixed(1);
            avgStars.innerHTML = window.app.generateStars(this.currentProduct.rating);
        }
    }

    generateSampleReviews() {
        const reviewers = [
            { name: 'John D.', rating: 5, text: 'Excellent product! Exceeded my expectations.' },
            { name: 'Sarah M.', rating: 4, text: 'Great quality and fast shipping. Highly recommend.' },
            { name: 'Mike R.', rating: 5, text: 'Perfect! Exactly what I was looking for.' },
            { name: 'Lisa K.', rating: 4, text: 'Good value for money. Very satisfied with the purchase.' },
            { name: 'David L.', rating: 5, text: 'Outstanding quality and excellent customer service.' }
        ];

        return reviewers.map((reviewer, index) => ({
            id: index + 1,
            name: reviewer.name,
            rating: reviewer.rating,
            text: reviewer.text,
            date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString()
        }));
    }

    renderReviews(reviews) {
        const reviewsList = document.getElementById('reviewsList');
        if (!reviewsList) return;

        reviewsList.innerHTML = reviews.map(review => `
            <div class="review-item">
                <div class="review-header">
                    <span class="reviewer-name">${review.name}</span>
                    <div class="review-rating">
                        <span class="stars">${window.app.generateStars(review.rating)}</span>
                    </div>
                    <span class="review-date">${review.date}</span>
                </div>
                <div class="review-text">${review.text}</div>
            </div>
        `).join('');
    }

    loadMoreReviews() {
        // Simulate loading more reviews
        const moreReviews = this.generateSampleReviews().slice(3);
        const reviewsList = document.getElementById('reviewsList');
        
        moreReviews.forEach(review => {
            const reviewElement = document.createElement('div');
            reviewElement.className = 'review-item';
            reviewElement.innerHTML = `
                <div class="review-header">
                    <span class="reviewer-name">${review.name}</span>
                    <div class="review-rating">
                        <span class="stars">${window.app.generateStars(review.rating)}</span>
                    </div>
                    <span class="review-date">${review.date}</span>
                </div>
                <div class="review-text">${review.text}</div>
            `;
            reviewsList.appendChild(reviewElement);
        });

        // Hide load more button
        document.getElementById('loadMoreReviews').style.display = 'none';
    }
}

// Quantity change functions
function changeQuantity(delta) {
    const quantityInput = document.getElementById('quantity');
    if (quantityInput) {
        const currentValue = parseInt(quantityInput.value) || 1;
        const newValue = Math.max(1, currentValue + delta);
        quantityInput.value = newValue;
    }
}

// Initialize product detail page
let productDetail;
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('productTitle')) {
        productDetail = new ProductDetailPage();
    }
});