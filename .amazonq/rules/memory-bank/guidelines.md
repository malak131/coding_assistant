# Development Guidelines & Patterns

## Code Quality Standards

### JavaScript Class Architecture
- **ES6 Classes**: All major functionality organized into classes (ECommerceApp, CheckoutPage, AuthSystem, ThemeManager)
- **Constructor Pattern**: Initialize state and call init() method in constructor
- **Method Organization**: Group related methods logically (setup, validation, UI updates, data handling)
- **Consistent Naming**: Use descriptive method names (setupEventListeners, validateField, updateAuthUI)

### Error Handling & Validation
- **Input Validation**: Always validate user input before processing
- **Real-time Validation**: Validate on blur events, clear errors on input events
- **Error Display**: Show inline error messages with consistent styling
- **Graceful Fallbacks**: Handle missing DOM elements and localStorage unavailability

### Event Management
- **Event Delegation**: Use document-level event listeners where appropriate
- **Prevent Default**: Always call e.preventDefault() on form submissions
- **Event Cleanup**: Remove event listeners when elements are destroyed
- **Async Event Handling**: Use async/await for events requiring API calls

## Structural Conventions

### File Organization
- **Single Responsibility**: Each JavaScript file handles one major feature area
- **Modular Design**: Features can work independently (auth.js, cart.js, theme.js)
- **Consistent Naming**: File names match their primary class (checkout.js → CheckoutPage)
- **Clear Dependencies**: Global dependencies clearly defined (window.app, window.mcpImageTool)

### DOM Manipulation Patterns
- **Element Existence Checks**: Always check if elements exist before manipulation
```javascript
const element = document.getElementById('elementId');
if (element) {
    // Safe to manipulate
}
```
- **Dynamic Content Creation**: Use innerHTML for complex structures, createElement for simple elements
- **CSS Class Management**: Use classList.add/remove instead of className manipulation
- **Event Stopping**: Use event.stopPropagation() for nested clickable elements

### Data Persistence Patterns
- **localStorage as Database**: All data stored as JSON strings in localStorage
- **Consistent Data Structure**: Arrays for collections, objects for entities
- **Data Validation**: Parse JSON with fallback to empty arrays/objects
```javascript
const data = JSON.parse(localStorage.getItem('key')) || [];
```
- **Immediate Persistence**: Save data immediately after modifications

## Semantic Patterns

### Form Handling Architecture
- **Progressive Enhancement**: Forms work without JavaScript
- **Real-time Validation**: Validate fields on blur, clear errors on input
- **Loading States**: Show loading indicators during form submission
- **Error Recovery**: Allow users to correct errors without losing data

### Modal Management System
- **Centralized Control**: Modal show/hide managed by main app class
- **Event Bubbling**: Use event delegation for modal close buttons
- **Keyboard Support**: Close modals with Escape key
- **Focus Management**: Return focus to trigger element when closing

### State Management Patterns
- **Centralized State**: Main application state in ECommerceApp class
- **Event-Driven Updates**: Use custom events for cross-component communication
- **UI Synchronization**: Update UI immediately after state changes
- **Persistent State**: Sync critical state with localStorage

## Internal API Usage

### localStorage API Patterns
```javascript
// Standard data retrieval with fallback
const items = JSON.parse(localStorage.getItem('items')) || [];

// Safe data storage
localStorage.setItem('items', JSON.stringify(items));

// Data modification pattern
let cart = JSON.parse(localStorage.getItem('cart')) || [];
const existingItem = cart.find(item => item.id === productId);
if (existingItem) {
    existingItem.quantity += 1;
} else {
    cart.push(newItem);
}
localStorage.setItem('cart', JSON.stringify(cart));
```

### DOM Query Patterns
```javascript
// Safe element selection
const element = document.getElementById('elementId');
if (element) {
    element.addEventListener('click', handler);
}

// Event delegation for dynamic content
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('target-class')) {
        handleClick(e);
    }
});
```

### Async/Await Integration
```javascript
// MCP tool integration pattern
async function loadProductWithImage(product) {
    const imageResult = await window.mcpImageTool.getProductImages(product.name, 1);
    return {
        ...product,
        image: imageResult.images[0]
    };
}
```

## Code Idioms & Conventions

### Utility Function Patterns
- **Price Formatting**: Use Intl.NumberFormat for consistent currency display
- **Star Rating Generation**: Mathematical approach for star display
- **Form Data Extraction**: Consistent pattern for gathering form values
- **Toast Notifications**: Centralized notification system with timeout

### CSS Integration Patterns
- **CSS Custom Properties**: Use CSS variables for theming
- **Class-based Styling**: Apply styles through CSS classes, not inline styles
- **Responsive Design**: Mobile-first approach with progressive enhancement
- **Component Isolation**: Each component has its own CSS namespace

### Error Handling Idioms
```javascript
// Validation pattern
validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    if (!value) {
        isValid = false;
        errorMessage = 'This field is required';
    }
    
    if (!isValid) {
        this.showFieldError(field, errorMessage);
    }
    
    return isValid;
}
```

### Animation & UI Feedback
- **Loading States**: Show processing feedback for async operations
- **Smooth Transitions**: Use CSS transitions for state changes
- **User Feedback**: Immediate visual feedback for user actions
- **Progressive Disclosure**: Show/hide content based on user selections

## Best Practices Adherence

### Performance Optimization
- **Minimal DOM Queries**: Cache DOM elements when used multiple times
- **Event Debouncing**: Debounce search input and resize events
- **Lazy Loading**: Load images and content as needed
- **Efficient Updates**: Batch DOM updates to minimize reflow

### Accessibility Standards
- **Semantic HTML**: Use proper HTML elements for their intended purpose
- **ARIA Attributes**: Add ARIA labels for dynamic content
- **Keyboard Navigation**: Support keyboard-only operation
- **Focus Management**: Maintain logical focus order

### Security Considerations
- **Input Sanitization**: Clean user input before storage or display
- **XSS Prevention**: Use textContent instead of innerHTML for user data
- **Data Validation**: Validate all data on both client and conceptual server side
- **Secure Storage**: Never store sensitive information in localStorage

### Code Maintainability
- **Consistent Formatting**: Use consistent indentation and spacing
- **Descriptive Names**: Use clear, descriptive variable and function names
- **Single Responsibility**: Each function should have one clear purpose
- **Documentation**: Comment complex logic and business rules