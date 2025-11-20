// Authentication functionality
class AuthSystem {
    constructor() {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateAuthUI();
    }

    setupEventListeners() {
        // Auth form submission
        const authForm = document.getElementById('authForm');
        if (authForm) {
            authForm.addEventListener('submit', (e) => this.handleAuthSubmit(e));
        }

        // Toggle between login and register
        const toggleAuth = document.getElementById('toggleAuth');
        if (toggleAuth) {
            toggleAuth.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleAuthMode();
            });
        }

        // Login button
        const loginBtn = document.getElementById('loginBtn');
        if (loginBtn) {
            loginBtn.addEventListener('click', () => {
                if (this.currentUser) {
                    this.logout();
                } else {
                    window.app.showModal('loginModal');
                }
            });
        }
    }

    toggleAuthMode() {
        const authSubmit = document.getElementById('authSubmit');
        const toggleAuth = document.getElementById('toggleAuth');
        const modalTitle = document.querySelector('#loginModal h2');
        
        if (authSubmit.textContent === 'Login') {
            // Switch to register mode
            authSubmit.textContent = 'Register';
            toggleAuth.textContent = 'Login here';
            modalTitle.textContent = 'Register';
            toggleAuth.parentElement.innerHTML = 'Already have an account? <a href="#" id="toggleAuth">Login here</a>';
        } else {
            // Switch to login mode
            authSubmit.textContent = 'Login';
            toggleAuth.textContent = 'Register here';
            modalTitle.textContent = 'Login';
            toggleAuth.parentElement.innerHTML = 'Don\'t have an account? <a href="#" id="toggleAuth">Register here</a>';
        }

        // Re-attach event listener
        document.getElementById('toggleAuth').addEventListener('click', (e) => {
            e.preventDefault();
            this.toggleAuthMode();
        });
    }

    handleAuthSubmit(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const isLogin = document.getElementById('authSubmit').textContent === 'Login';

        if (!this.validateAuthForm(email, password)) {
            return;
        }

        if (isLogin) {
            this.login(email, password);
        } else {
            this.register(email, password);
        }
    }

    validateAuthForm(email, password) {
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            window.app.showToast('Please enter a valid email address', 'error');
            return false;
        }

        // Password validation
        if (password.length < 6) {
            window.app.showToast('Password must be at least 6 characters long', 'error');
            return false;
        }

        return true;
    }

    login(email, password) {
        // Get stored users
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            this.currentUser = {
                id: user.id,
                name: user.name,
                email: user.email
            };
            
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
            window.app.showToast(`Welcome back, ${user.name}!`);
            window.app.closeModals();
            this.updateAuthUI();
        } else {
            window.app.showToast('Invalid email or password', 'error');
        }
    }

    register(email, password) {
        // Get stored users
        let users = JSON.parse(localStorage.getItem('users')) || [];
        
        // Check if user already exists
        if (users.find(u => u.email === email)) {
            window.app.showToast('An account with this email already exists', 'error');
            return;
        }

        // Create new user
        const newUser = {
            id: Date.now(),
            name: email.split('@')[0], // Use email prefix as name
            email: email,
            password: password, // In real app, this should be hashed
            createdAt: new Date().toISOString()
        };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        // Auto-login after registration
        this.currentUser = {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email
        };
        
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        window.app.showToast(`Welcome to TechStore, ${newUser.name}!`);
        window.app.closeModals();
        this.updateAuthUI();
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
        window.app.showToast('Logged out successfully');
        this.updateAuthUI();
    }

    updateAuthUI() {
        const loginBtn = document.getElementById('loginBtn');
        if (loginBtn) {
            if (this.currentUser) {
                loginBtn.textContent = `Hi, ${this.currentUser.name}`;
                loginBtn.onclick = () => this.showUserMenu();
            } else {
                loginBtn.textContent = 'Login';
                loginBtn.onclick = () => window.app.showModal('loginModal');
            }
        }
    }

    showUserMenu() {
        // Create a simple dropdown menu
        const existingMenu = document.querySelector('.user-menu');
        if (existingMenu) {
            existingMenu.remove();
            return;
        }

        const menu = document.createElement('div');
        menu.className = 'user-menu';
        menu.style.cssText = `
            position: absolute;
            top: 100%;
            right: 0;
            background: white;
            border: 1px solid var(--border-color);
            border-radius: var(--border-radius);
            box-shadow: var(--shadow-lg);
            min-width: 200px;
            z-index: 1000;
        `;

        menu.innerHTML = `
            <div style="padding: 1rem;">
                <div style="font-weight: 600; margin-bottom: 0.5rem;">${this.currentUser.name}</div>
                <div style="color: var(--text-secondary); font-size: 0.875rem; margin-bottom: 1rem;">${this.currentUser.email}</div>
                <hr style="margin: 0.5rem 0; border: none; border-top: 1px solid var(--border-color);">
                <button onclick="auth.showOrders()" style="width: 100%; text-align: left; background: none; border: none; padding: 0.5rem 0; cursor: pointer;">My Orders</button>
                <button onclick="auth.logout(); document.querySelector('.user-menu').remove();" style="width: 100%; text-align: left; background: none; border: none; padding: 0.5rem 0; cursor: pointer; color: var(--error-color);">Logout</button>
            </div>
        `;

        const loginBtn = document.getElementById('loginBtn');
        loginBtn.parentElement.style.position = 'relative';
        loginBtn.parentElement.appendChild(menu);

        // Close menu when clicking outside
        setTimeout(() => {
            document.addEventListener('click', function closeMenu(e) {
                if (!menu.contains(e.target) && e.target !== loginBtn) {
                    menu.remove();
                    document.removeEventListener('click', closeMenu);
                }
            });
        }, 0);
    }

    showOrders() {
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        const userOrders = orders.filter(order => 
            order.shipping && order.shipping.email === this.currentUser.email
        );

        if (userOrders.length === 0) {
            window.app.showToast('You have no orders yet');
            return;
        }

        // Create orders modal
        const modal = document.createElement('div');
        modal.className = 'modal show';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 800px;">
                <span class="close" onclick="this.parentElement.parentElement.remove()">&times;</span>
                <h2>My Orders</h2>
                <div class="orders-list">
                    ${userOrders.map(order => `
                        <div class="order-item" style="border: 1px solid var(--border-color); border-radius: var(--border-radius); padding: 1rem; margin-bottom: 1rem;">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                                <strong>Order #${order.id}</strong>
                                <span style="color: var(--success-color);">${order.status.toUpperCase()}</span>
                            </div>
                            <div style="color: var(--text-secondary); margin-bottom: 0.5rem;">
                                ${new Date(order.date).toLocaleDateString()}
                            </div>
                            <div style="margin-bottom: 0.5rem;">
                                ${order.items.map(item => `${item.name} (${item.quantity}x)`).join(', ')}
                            </div>
                            <div style="font-weight: 600;">
                                Total: ${window.app.formatPrice(order.total)}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        document.querySelector('.user-menu').remove();
    }

    isLoggedIn() {
        return !!this.currentUser;
    }

    getCurrentUser() {
        return this.currentUser;
    }
}

// Initialize auth system
let auth;
document.addEventListener('DOMContentLoaded', () => {
    auth = new AuthSystem();
});