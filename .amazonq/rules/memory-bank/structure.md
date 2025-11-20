# Project Structure & Architecture

## Directory Organization

```
E-Commerce Website/
├── index.html              # Homepage with hero banner and featured products
├── products.html           # Product catalog with filtering and search
├── product-detail.html     # Individual product pages with full details
├── checkout.html           # Multi-step checkout process
├── css/
│   └── styles.css         # Unified stylesheet with CSS custom properties
├── js/
│   ├── app.js             # Core application logic and data management
│   ├── products.js        # Product listing, filtering, and sorting
│   ├── product-detail.js  # Product detail page functionality
│   ├── cart.js            # Shopping cart operations and persistence
│   ├── checkout.js        # Checkout form validation and processing
│   ├── auth.js            # User authentication and registration
│   ├── search.js          # Search functionality with autocomplete
│   └── theme.js           # Theme management and UI utilities
├── mcp-*.py               # MCP server implementations for image handling
├── mcp-server.json        # MCP server configuration
└── README.md              # Project documentation
```

## Core Components

### HTML Pages
- **index.html**: Landing page with navigation, hero section, and featured products
- **products.html**: Product catalog with sidebar filters and grid layout
- **product-detail.html**: Detailed product view with image gallery and reviews
- **checkout.html**: Multi-step checkout form with validation

### JavaScript Modules

#### Core Application (app.js)
- Application initialization and configuration
- Sample data loading and management
- Global utility functions
- localStorage data persistence layer
- Toast notification system

#### Product Management (products.js, product-detail.js)
- Product catalog rendering and pagination
- Advanced filtering (category, price, rating)
- Sorting functionality (name, price, rating)
- Product detail page rendering
- Image gallery and zoom functionality

#### Shopping Cart (cart.js)
- Add/remove/update cart items
- Cart persistence across sessions
- Cart counter updates
- Price calculations and totals

#### User System (auth.js)
- User registration and login
- Session management
- User profile data
- Order history tracking

#### Search System (search.js)
- Real-time search with debouncing
- Autocomplete suggestions
- Search history management
- Category-based filtering integration

#### UI Components (theme.js)
- Theme switching functionality
- Modal management
- Loading states and animations
- Responsive navigation handling

### CSS Architecture

#### Design System
- CSS custom properties for consistent theming
- Mobile-first responsive design approach
- CSS Grid and Flexbox for layouts
- Component-based styling organization

#### Key Style Categories
- **Layout**: Grid systems, containers, and spacing
- **Components**: Buttons, cards, forms, and navigation
- **Utilities**: Typography, colors, and spacing helpers
- **Responsive**: Breakpoints and mobile adaptations

## Architectural Patterns

### Data Management
- **localStorage as Database**: All data persisted client-side
- **JSON Data Structures**: Structured data for products, users, orders
- **State Management**: Centralized state in app.js with event-driven updates
- **Data Validation**: Input validation and sanitization throughout

### Component Architecture
- **Modular JavaScript**: Each feature in separate files
- **Event-Driven Communication**: Custom events for component interaction
- **Separation of Concerns**: Clear division between data, presentation, and logic
- **Reusable Utilities**: Common functions shared across modules

### User Experience Patterns
- **Progressive Enhancement**: Core functionality works without JavaScript
- **Responsive Design**: Mobile-first with desktop enhancements
- **Accessibility**: Semantic HTML and ARIA attributes
- **Performance**: Lazy loading and optimized asset delivery

## Data Flow

### Application Lifecycle
1. **Initialization**: Load sample data and user session
2. **Navigation**: Route handling and page-specific initialization
3. **User Interaction**: Event handling and state updates
4. **Data Persistence**: Automatic localStorage synchronization
5. **UI Updates**: Real-time interface updates based on state changes

### Key Data Entities
- **Products**: Catalog items with specifications and media
- **Users**: Authentication and profile information
- **Cart**: Shopping cart items and quantities
- **Orders**: Purchase history and order details
- **Preferences**: User settings and search history

## Integration Points

### MCP Server Integration
- **Image Management**: Python-based MCP server for product images
- **Tool Integration**: Custom tools for enhanced functionality
- **Configuration**: JSON-based server configuration

### External Dependencies
- **Google Fonts**: Inter font family for typography
- **Placeholder Images**: External image services for product photos
- **Browser APIs**: localStorage, sessionStorage, and DOM APIs