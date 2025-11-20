# TechStore - Modern E-Commerce Website

A complete, functional e-commerce website built with HTML, CSS, and JavaScript, featuring local storage for data persistence.

## 🚀 Features

### Core Functionality
- **Homepage** with hero banner, featured products, and category navigation
- **Product Listings** with advanced filtering (category, price, rating) and sorting
- **Product Detail Pages** with image galleries, specifications, and reviews
- **Shopping Cart** with add/remove/update functionality
- **Checkout Process** with form validation and order confirmation
- **User Authentication** (login/register system)
- **Search System** with autocomplete and suggestions
- **Wishlist** functionality

### Advanced Features
- **Responsive Design** - Mobile-first approach
- **Local Storage** - All data persisted locally (products, cart, orders, users)
- **Toast Notifications** - User feedback for actions
- **Form Validation** - Real-time validation with error messages
- **Order History** - Users can view their past orders
- **Product Reviews** - Display and manage product reviews
- **Quick View** - Modal for quick product preview
- **Breadcrumb Navigation** - Easy navigation tracking
- **Loading States** - Skeleton screens and loading indicators

## 📁 Project Structure

```
E-Commerce Website/
├── index.html              # Homepage
├── products.html           # Product listings page
├── product-detail.html     # Individual product page
├── checkout.html           # Checkout process
├── css/
│   └── styles.css         # Main stylesheet
├── js/
│   ├── app.js             # Core application logic
│   ├── products.js        # Product listing functionality
│   ├── product-detail.js  # Product detail page logic
│   ├── cart.js            # Shopping cart management
│   ├── checkout.js        # Checkout process
│   ├── auth.js            # Authentication system
│   └── search.js          # Search functionality
└── README.md              # Project documentation
```

## 🛠️ Technologies Used

- **HTML5** - Semantic markup structure
- **CSS3** - Modern styling with CSS Grid, Flexbox, and custom properties
- **Vanilla JavaScript** - ES6+ features, classes, and modules
- **Local Storage** - Client-side data persistence
- **Google Fonts** - Inter font family for modern typography

## 🎨 Design Features

- **Modern UI/UX** - Clean, professional design
- **CSS Custom Properties** - Consistent theming and easy customization
- **Responsive Grid Layouts** - Adapts to all screen sizes
- **Smooth Animations** - CSS transitions and hover effects
- **Accessible Design** - Semantic HTML and proper contrast ratios

## 🚀 Getting Started

1. **Clone or Download** the project files
2. **Open `index.html`** in your web browser
3. **Start Shopping!** - The site is fully functional with sample data

### Sample Data
The application comes pre-loaded with:
- 6 sample products across 4 categories
- Product images (placeholder images)
- Product specifications and reviews
- Sample user accounts (register to create new ones)

## 💡 Key Features Explained

### Product Management
- Products are stored in localStorage with full details
- Categories: Smartphones, Laptops, Headphones, Accessories
- Each product includes: name, price, images, description, rating, reviews, specifications

### Shopping Cart
- Add/remove products with quantity management
- Persistent cart data across browser sessions
- Real-time total calculations
- Cart counter in navigation

### User Authentication
- Register new accounts or login with existing ones
- User data stored securely in localStorage
- User-specific order history
- Profile management

### Search & Filtering
- Real-time search with autocomplete suggestions
- Filter by category, price range, and rating
- Sort by name, price, and rating
- Search history tracking

### Checkout Process
- Multi-step form with validation
- Shipping and payment information
- Order confirmation with unique order ID
- Order history for logged-in users

## 🔧 Customization

### Adding New Products
Edit the `loadSampleData()` method in `js/app.js`:

```javascript
{
    id: 7,
    name: "Your Product Name",
    category: "category-name",
    price: 299.99,
    image: "path/to/image.jpg",
    description: "Product description",
    rating: 4.5,
    reviews: 100,
    inStock: true,
    specs: {
        "Feature 1": "Value 1",
        "Feature 2": "Value 2"
    }
}
```

### Styling Customization
Modify CSS custom properties in `css/styles.css`:

```css
:root {
    --primary-color: #your-color;
    --secondary-color: #your-color;
    /* ... other properties */
}
```

## 📱 Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔒 Security Notes

This is a demo application using localStorage for simplicity. In a production environment:
- Use proper backend authentication
- Implement secure payment processing
- Add input sanitization and validation
- Use HTTPS for all transactions

## 🎯 Future Enhancements

Potential improvements for a production version:
- Backend API integration
- Real payment gateway integration
- Product image upload functionality
- Advanced inventory management
- Email notifications
- Social media integration
- Product comparison feature
- Advanced analytics

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to fork this project and submit pull requests for improvements!

---

**Built with ❤️ for learning and demonstration purposes**