// Checkout page functionality
class CheckoutPage {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        this.shippingCost = 9.99;
        this.taxRate = 0.08; // 8% tax
        this.init();
    }

    init() {
        if (this.cart.length === 0) {
            window.location.href = 'products.html';
            return;
        }

        this.setupEventListeners();
        this.loadOrderSummary();
        this.setupFormValidation();
    }

    setupEventListeners() {
        // Form submission
        const checkoutForm = document.getElementById('checkoutForm');
        if (checkoutForm) {
            checkoutForm.addEventListener('submit', (e) => this.handleFormSubmit(e));
        }

        // Payment method change
        const paymentMethods = document.querySelectorAll('input[name="paymentMethod"]');
        paymentMethods.forEach(method => {
            method.addEventListener('change', () => this.togglePaymentDetails());
        });

        // Card number formatting
        const cardNumber = document.getElementById('cardNumber');
        if (cardNumber) {
            cardNumber.addEventListener('input', (e) => this.formatCardNumber(e));
        }

        // Expiry date formatting
        const expiryDate = document.getElementById('expiryDate');
        if (expiryDate) {
            expiryDate.addEventListener('input', (e) => this.formatExpiryDate(e));
        }

        // CVV validation
        const cvv = document.getElementById('cvv');
        if (cvv) {
            cvv.addEventListener('input', (e) => this.formatCVV(e));
        }
    }

    async loadOrderSummary() {
        const orderItems = document.getElementById('orderItems');
        const subtotal = document.getElementById('subtotal');
        const shipping = document.getElementById('shipping');
        const tax = document.getElementById('tax');
        const finalTotal = document.getElementById('finalTotal');

        if (!orderItems) return;

        // Clear existing items
        orderItems.innerHTML = '';
        
        // Render order items with MCP images
        for (const item of this.cart) {
            const imageResult = await window.mcpImageTool.getProductImages(item.name, 1);
            
            const orderItemDiv = document.createElement('div');
            orderItemDiv.className = 'order-item';
            
            orderItemDiv.innerHTML = `
                <img src="${imageResult.images[0]}" alt="${item.name}" class="order-item-image">
                <div class="order-item-info">
                    <h4>${item.name}</h4>
                    <div class="order-item-details">
                        <span>Qty: ${item.quantity}</span>
                        <span>${window.app.formatPrice(item.price)}</span>
                    </div>
                </div>
                <div class="order-item-total">${window.app.formatPrice(item.price * item.quantity)}</div>
            `;
            
            orderItems.appendChild(orderItemDiv);
        }

        // Calculate totals
        const subtotalAmount = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const taxAmount = subtotalAmount * this.taxRate;
        const totalAmount = subtotalAmount + this.shippingCost + taxAmount;

        // Update totals display
        if (subtotal) subtotal.textContent = window.app.formatPrice(subtotalAmount).replace('$', '');
        if (shipping) shipping.textContent = window.app.formatPrice(this.shippingCost).replace('$', '');
        if (tax) tax.textContent = window.app.formatPrice(taxAmount).replace('$', '');
        if (finalTotal) finalTotal.textContent = window.app.formatPrice(totalAmount).replace('$', '');
    }

    togglePaymentDetails() {
        const cardDetails = document.getElementById('cardDetails');
        const selectedMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
        
        if (cardDetails) {
            cardDetails.style.display = selectedMethod === 'card' ? 'block' : 'none';
        }
    }

    formatCardNumber(e) {
        let value = e.target.value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
        let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
        e.target.value = formattedValue;
    }

    formatExpiryDate(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        e.target.value = value;
    }

    formatCVV(e) {
        e.target.value = e.target.value.replace(/[^0-9]/g, '').substring(0, 4);
    }

    setupFormValidation() {
        const form = document.getElementById('checkoutForm');
        const inputs = form.querySelectorAll('input[required]');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Remove existing error
        this.clearFieldError(field);

        // Basic required field validation
        if (!value) {
            isValid = false;
            errorMessage = 'This field is required';
        } else {
            // Specific field validations
            switch (field.type) {
                case 'email':
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(value)) {
                        isValid = false;
                        errorMessage = 'Please enter a valid email address';
                    }
                    break;
                case 'tel':
                    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
                    if (!phoneRegex.test(value) || value.length < 10) {
                        isValid = false;
                        errorMessage = 'Please enter a valid phone number';
                    }
                    break;
            }

            // Card-specific validations
            if (field.id === 'cardNumber') {
                const cardNumber = value.replace(/\s/g, '');
                if (cardNumber.length < 13 || cardNumber.length > 19) {
                    isValid = false;
                    errorMessage = 'Please enter a valid card number';
                }
            }

            if (field.id === 'expiryDate') {
                const [month, year] = value.split('/');
                const currentDate = new Date();
                const currentYear = currentDate.getFullYear() % 100;
                const currentMonth = currentDate.getMonth() + 1;
                
                if (!month || !year || month < 1 || month > 12 || 
                    (parseInt(year) < currentYear) || 
                    (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid expiry date';
                }
            }

            if (field.id === 'cvv') {
                if (value.length < 3 || value.length > 4) {
                    isValid = false;
                    errorMessage = 'Please enter a valid CVV';
                }
            }
        }

        if (!isValid) {
            this.showFieldError(field, errorMessage);
        }

        return isValid;
    }

    showFieldError(field, message) {
        field.classList.add('error');
        
        // Remove existing error message
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        // Add new error message
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        errorElement.style.color = 'var(--error-color)';
        errorElement.style.fontSize = '0.875rem';
        errorElement.style.marginTop = '0.25rem';
        
        field.parentNode.insertBefore(errorElement, field.nextSibling);
    }

    clearFieldError(field) {
        field.classList.remove('error');
        const errorMessage = field.parentNode.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }

    validateForm() {
        const form = document.getElementById('checkoutForm');
        const requiredFields = form.querySelectorAll('input[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        return isValid;
    }

    handleFormSubmit(e) {
        e.preventDefault();
        
        if (!this.validateForm()) {
            window.app.showToast('Please correct the errors in the form', 'error');
            return;
        }

        // Show loading state
        const submitBtn = e.target.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Processing...';
        submitBtn.disabled = true;

        // Simulate payment processing
        setTimeout(() => {
            this.processOrder();
        }, 2000);
    }

    processOrder() {
        // Generate order ID
        const orderId = 'ORD-' + Date.now().toString().slice(-8);
        
        // Create order object
        const order = {
            id: orderId,
            items: [...this.cart],
            total: this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) + this.shippingCost + (this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) * this.taxRate),
            date: new Date().toISOString(),
            status: 'confirmed',
            shipping: this.getShippingInfo(),
            payment: this.getPaymentInfo()
        };

        // Save order to localStorage
        let orders = JSON.parse(localStorage.getItem('orders')) || [];
        orders.push(order);
        localStorage.setItem('orders', JSON.stringify(orders));

        // Clear cart
        localStorage.removeItem('cart');
        
        // Show confirmation
        this.showOrderConfirmation(orderId);
        
        // Update cart count
        window.app.updateCartCount();
    }

    getShippingInfo() {
        return {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('emailAddress').value,
            phone: document.getElementById('phone').value,
            address: document.getElementById('address').value,
            city: document.getElementById('city').value,
            state: document.getElementById('state').value,
            zipCode: document.getElementById('zipCode').value
        };
    }

    getPaymentInfo() {
        const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
        
        if (paymentMethod === 'card') {
            return {
                method: 'card',
                cardNumber: '****' + document.getElementById('cardNumber').value.slice(-4),
                cardName: document.getElementById('cardName').value
            };
        } else {
            return {
                method: 'paypal'
            };
        }
    }

    showOrderConfirmation(orderId) {
        const modal = document.getElementById('orderConfirmationModal');
        const orderIdElement = document.getElementById('orderId');
        
        if (orderIdElement) {
            orderIdElement.textContent = orderId;
        }
        
        if (modal) {
            modal.classList.add('show');
        }
    }
}

// Initialize checkout page
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('checkoutForm')) {
        new CheckoutPage();
    }
});