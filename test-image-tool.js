// Test the MCP Product Image Tool
class ProductImageTool {
    constructor() {
        this.baseUrl = 'https://via.placeholder.com';
    }

    async getProductImages(productName, count = 3) {
        // Simulate MCP tool response with professional placeholder images
        const images = this.generateProductImages(productName, count);
        
        return {
            product: productName,
            images: images,
            count: images.length,
            ready_to_use: true
        };
    }

    generateProductImages(productName, count) {
        const images = [];
        
        // Product-specific color schemes for professional look
        const colorSchemes = {
            'iphone': ['007AFF', 'ffffff'],
            'samsung': ['1428A0', 'ffffff'], 
            'macbook': ['000000', 'ffffff'],
            'laptop': ['2563eb', 'ffffff'],
            'headphones': ['8b5cf6', 'ffffff'],
            'airpods': ['f3f4f6', '000000'],
            'watch': ['1f2937', 'ffffff'],
            'tablet': ['6366f1', 'ffffff'],
            'phone': ['ec4899', 'ffffff'],
            'computer': ['10b981', 'ffffff'],
            'mouse': ['374151', 'ffffff'],
            'keyboard': ['6b7280', 'ffffff'],
            'monitor': ['111827', 'ffffff']
        };
        
        // Determine colors based on product type
        let colors = ['6366f1', 'ffffff']; // default purple/white
        for (const [key, scheme] of Object.entries(colorSchemes)) {
            if (productName.toLowerCase().includes(key)) {
                colors = scheme;
                break;
            }
        }
        
        // Generate multiple image variations
        const sizes = ['400x300', '500x400', '600x450'];
        
        for (let i = 0; i < count; i++) {
            const size = sizes[i % sizes.length];
            const bgColor = colors[0];
            const textColor = colors[1];
            
            // Create descriptive text
            const text = encodeURIComponent(productName.replace(/\s+/g, '+'));
            
            const url = `${this.baseUrl}/${size}/${bgColor}/${textColor}?text=${text}`;
            images.push(url);
        }
        
        return images;
    }
}

// Usage examples
async function testImageTool() {
    const tool = new ProductImageTool();
    
    console.log('🔍 Testing Product Image Tool...\n');
    
    const products = [
        'iPhone 15 Pro',
        'MacBook Pro 14',
        'AirPods Pro',
        'Samsung Galaxy S24',
        'Dell XPS 13',
        'Sony WH-1000XM5 Headphones'
    ];
    
    for (const product of products) {
        const result = await tool.getProductImages(product, 3);
        console.log(`📱 ${product}:`);
        result.images.forEach((url, index) => {
            console.log(`  ${index + 1}. ${url}`);
        });
        console.log('');
    }
}

// Run test
testImageTool();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProductImageTool;
}