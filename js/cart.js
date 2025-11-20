// Shopping cart functionality
class ShoppingCart {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateCartDisplay();
    }

    setupEventListeners() {
        // Cart modal events
        const cartBtn = document.getElementById('cartBtn');
        if (cartBtn) {
            cartBtn.addEventListener('click', () => {
                this.updateCartDisplay();
                window.app.showModal('cartModal');
            });
        }
    }

    async updateCartDisplay() {
        const cartItems = document.getElementById('cartItems');
        const cartTotal = document.getElementById('cartTotal');
        
        if (!cartItems || !cartTotal) return;

        if (this.cart.length === 0) {
            cartItems.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
            cartTotal.textContent = '0.00';
            return;
        }

        // Clear existing items
        cartItems.innerHTML = '';
        
        // Render cart items with MCP images
        for (const item of this.cart) {
            const imageResult = await window.mcpImageTool.getProductImages(item.name, 1);
            
            const cartItemDiv = document.createElement('div');
            cartItemDiv.className = 'cart-item';
            cartItemDiv.setAttribute('data-id', item.id);
            
            cartItemDiv.innerHTML = `
                <img src="${imageResult.images[0]}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <div class="cart-item-price">${window.app.formatPrice(item.price)}</div>
                </div>
                <div class="cart-item-controls">
                    <button class="qty-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="qty-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                </div>
                <div class="cart-item-total">${window.app.formatPrice(item.price * item.quantity)}</div>
                <button class="remove-item" onclick="cart.removeItem(${item.id})">×</button>
            `;
            
            cartItems.appendChild(cartItemDiv);
        }

        // Calculate and display total
        const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = total.toFixed(2);
    }

    addItem(productId, quantity = 1) {
        const product = window.app.getProduct(productId);
        if (!product) return;

        const existingItem = this.cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.cart.push({
                id: productId,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: quantity
            });
        }

        this.saveCart();
        this.updateCartDisplay();
        window.app.updateCartCount();
        window.app.showToast(`${product.name} added to cart!`);
    }

    updateQuantity(productId, newQuantity) {
        if (newQuantity <= 0) {
            this.removeItem(productId);
            return;
        }

        const item = this.cart.find(item => item.id === productId);
        if (item) {
            item.quantity = newQuantity;
            this.saveCart();
            this.updateCartDisplay();
            window.app.updateCartCount();
        }
    }

    removeItem(productId) {
        const itemIndex = this.cart.findIndex(item => item.id === productId);
        if (itemIndex > -1) {
            const item = this.cart[itemIndex];
            this.cart.splice(itemIndex, 1);
            this.saveCart();
            this.updateCartDisplay();
            window.app.updateCartCount();
            window.app.showToast(`${item.name} removed from cart`);
        }
    }

    clearCart() {
        this.cart = [];
        this.saveCart();
        this.updateCartDisplay();
        window.app.updateCartCount();
    }

    getTotal() {
        return this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    getItemCount() {
        return this.cart.reduce((sum, item) => sum + item.quantity, 0);
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }

    // Get cart data for checkout
    getCartData() {
        return {
            items: [...this.cart],
            total: this.getTotal(),
            itemCount: this.getItemCount()
        };
    }
}

// Initialize cart
let cart;
document.addEventListener('DOMContentLoaded', () => {
    cart = new ShoppingCart();
});

// Global functions for cart operations
function addToCart(productId, quantity = 1) {
    if (cart) {
        cart.addItem(productId, quantity);
    }
}

function updateCartQuantity(productId, newQuantity) {
    if (cart) {
        cart.updateQuantity(productId, newQuantity);
    }
}

function removeFromCart(productId) {
    if (cart) {
        cart.removeItem(productId);
    }
}