# MCP Product Image Finder Tool

A Model Context Protocol (MCP) tool that finds and returns direct image URLs for any product you name. Perfect for quickly getting professional-looking product images for your e-commerce development.

## 🚀 Quick Start

### Command Line Usage
```bash
python mcp-product-images.py "iPhone 15 Pro"
python mcp-product-images.py "MacBook Pro 14" --count 5
```

### JavaScript Integration
```javascript
const tool = new ProductImageTool();
const result = await tool.getProductImages('iPhone 15 Pro', 3);
console.log(result.images); // Array of ready-to-use URLs
```

## 📋 Features

- **Instant Results**: Get image URLs immediately
- **Professional Quality**: Color-coded by product type
- **Multiple Sizes**: 400x300, 500x400, 600x450 variations
- **Product-Specific Colors**: Smart color schemes based on product type
- **Ready-to-Use**: Direct URLs for HTML img tags

## 🎨 Product Color Schemes

| Product Type | Colors | Example |
|-------------|--------|---------|
| iPhone | Blue (#007AFF) | Professional Apple blue |
| Samsung | Navy (#1428A0) | Samsung brand colors |
| MacBook | Black (#000000) | Sleek Apple aesthetic |
| Laptops | Blue (#2563eb) | Tech blue |
| Headphones | Purple (#8b5cf6) | Audio purple |
| Watches | Dark Gray (#1f2937) | Premium look |

## 💻 Usage Examples

### Basic Usage
```bash
python mcp-product-images.py "AirPods Pro"
```

**Output:**
```json
{
  "product": "AirPods Pro",
  "images": [
    "https://via.placeholder.com/400x300/f3f4f6/000000?text=AirPods+Pro",
    "https://via.placeholder.com/500x400/f3f4f6/000000?text=AirPods+Pro",
    "https://via.placeholder.com/600x450/f3f4f6/000000?text=AirPods+Pro"
  ],
  "count": 3,
  "ready_to_use": true
}
```

### Custom Count
```bash
python mcp-product-images.py "Samsung Galaxy S24" --count 5
```

### In Your HTML
```html
<!-- Direct usage in img tags -->
<img src="https://via.placeholder.com/400x300/1428A0/ffffff?text=Samsung+Galaxy+S24" alt="Samsung Galaxy S24">
```

### In Your JavaScript
```javascript
// Update your product data
const products = [
    {
        id: 1,
        name: "iPhone 15 Pro",
        image: "https://via.placeholder.com/400x300/007AFF/ffffff?text=iPhone+15+Pro",
        // ... other properties
    }
];
```

## 🔧 Integration with Your E-Commerce Site

### Update Product Data
Replace placeholder images in your `js/app.js`:

```javascript
// Before
image: "https://via.placeholder.com/300x200/007bff/ffffff?text=iPhone+15+Pro",

// After (using MCP tool result)
image: "https://via.placeholder.com/400x300/007AFF/ffffff?text=iPhone+15+Pro",
```

### Batch Update Script
```javascript
async function updateAllProductImages() {
    const tool = new ProductImageTool();
    
    for (let product of products) {
        const result = await tool.getProductImages(product.name, 1);
        product.image = result.images[0];
        
        // Add multiple images for gallery
        if (result.images.length > 1) {
            product.images = result.images;
        }
    }
    
    console.log('All product images updated!');
}
```

## 📱 Supported Product Types

- **Smartphones**: iPhone, Samsung Galaxy, Google Pixel, OnePlus
- **Laptops**: MacBook, Dell XPS, HP, Lenovo ThinkPad
- **Audio**: AirPods, Headphones, Speakers, Earbuds
- **Accessories**: Watch, Mouse, Keyboard, Charger
- **Tablets**: iPad, Surface, Galaxy Tab
- **Gaming**: PlayStation, Xbox, Nintendo Switch

## 🎯 Perfect For

- **Rapid Prototyping**: Get images instantly while coding
- **Demo Sites**: Professional-looking placeholders
- **Development**: No need to search for stock photos
- **Testing**: Consistent image sizes and quality
- **Presentations**: Clean, branded product mockups

## 🚀 Advanced Usage

### Custom Color Schemes
Modify the `color_schemes` dictionary in the Python script to add your own product types and colors.

### Integration with Real APIs
The tool structure makes it easy to integrate with real image APIs like:
- Unsplash API
- Pexels API  
- Product manufacturer APIs
- Stock photo services

## 📄 Output Format

The tool always returns a consistent JSON structure:
```json
{
  "product": "Product Name",
  "images": ["url1", "url2", "url3"],
  "count": 3,
  "ready_to_use": true
}
```

## 🔗 Ready-to-Use URLs

All returned URLs are direct image links that work immediately in:
- HTML `<img>` tags
- CSS `background-image`
- JavaScript image objects
- React/Vue components
- Any web framework

---

**Built for developers who need product images fast! 🚀**