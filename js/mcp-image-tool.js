// MCP Product Image Tool - JavaScript Implementation
class MCPImageTool {
    constructor() {
        this.imageCache = new Map();
        this.fallbackImages = {
            'iphone': 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop',
            'macbook': 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop',
            'airpods': 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400&h=300&fit=crop',
            'samsung': 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=300&fit=crop',
            'laptop': 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop',
            'headphones': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
            'keyboard': 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=300&fit=crop',
            'mouse': 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop',
            'watch': 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop'
        };
    }

    async getProductImages(productName, count = 3) {
        // Check cache first
        const cacheKey = productName.toLowerCase();
        if (this.imageCache.has(cacheKey)) {
            return this.imageCache.get(cacheKey);
        }

        try {
            // Search for matching images
            const images = await this.searchProductImages(productName, count);
            
            const result = {
                product: productName,
                images: images,
                count: images.length,
                ready_to_use: true
            };

            // Cache the result
            this.imageCache.set(cacheKey, result);
            return result;
        } catch (error) {
            console.warn('Image search failed, using fallback:', error);
            return this.getFallbackImages(productName, count);
        }
    }

    async searchProductImages(productName, count) {
        const images = [];
        const productKey = this.getProductKey(productName);
        
        // Get base image from fallback collection
        const baseImage = this.fallbackImages[productKey];
        
        if (baseImage) {
            // Generate multiple sizes from the same image
            const sizes = ['400x300', '500x400', '600x450'];
            for (let i = 0; i < count && i < sizes.length; i++) {
                const [width, height] = sizes[i].split('x');
                const imageUrl = baseImage.replace(/w=\d+&h=\d+/, `w=${width}&h=${height}`);
                images.push(imageUrl);
            }
        }

        // Fill remaining slots with placeholder if needed
        while (images.length < count) {
            const size = ['400x300', '500x400', '600x450'][images.length % 3];
            const colors = this.getProductColors(productName);
            const text = encodeURIComponent(productName.replace(/\s+/g, '+'));
            images.push(`https://via.placeholder.com/${size}/${colors.bg}/${colors.text}?text=${text}`);
        }

        return images;
    }

    getProductKey(productName) {
        const name = productName.toLowerCase();
        
        if (name.includes('iphone')) return 'iphone';
        if (name.includes('macbook')) return 'macbook';
        if (name.includes('airpods')) return 'airpods';
        if (name.includes('samsung')) return 'samsung';
        if (name.includes('laptop') || name.includes('dell') || name.includes('hp')) return 'laptop';
        if (name.includes('headphones') || name.includes('sony')) return 'headphones';
        if (name.includes('keyboard')) return 'keyboard';
        if (name.includes('mouse')) return 'mouse';
        if (name.includes('watch')) return 'watch';
        
        return 'laptop'; // default
    }

    getProductColors(productName) {
        const name = productName.toLowerCase();
        
        if (name.includes('iphone')) return { bg: '007AFF', text: 'ffffff' };
        if (name.includes('macbook')) return { bg: '000000', text: 'ffffff' };
        if (name.includes('airpods')) return { bg: 'f3f4f6', text: '000000' };
        if (name.includes('samsung')) return { bg: '1428A0', text: 'ffffff' };
        if (name.includes('headphones')) return { bg: '8b5cf6', text: 'ffffff' };
        if (name.includes('keyboard')) return { bg: '6b7280', text: 'ffffff' };
        
        return { bg: '6366f1', text: 'ffffff' }; // default purple
    }

    getFallbackImages(productName, count) {
        const images = [];
        const colors = this.getProductColors(productName);
        const sizes = ['400x300', '500x400', '600x450'];
        
        for (let i = 0; i < count; i++) {
            const size = sizes[i % sizes.length];
            const text = encodeURIComponent(productName.replace(/\s+/g, '+'));
            images.push(`https://via.placeholder.com/${size}/${colors.bg}/${colors.text}?text=${text}`);
        }

        return {
            product: productName,
            images: images,
            count: images.length,
            ready_to_use: true
        };
    }
}

// Global instance
window.mcpImageTool = new MCPImageTool();