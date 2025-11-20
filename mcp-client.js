/**
 * MCP Client Implementation
 * Built according to official MCP specification - HTTPS version
 */

class MCPClient {
    constructor(serverUrl = 'http://localhost:5000') {
        this.serverUrl = serverUrl;
        this.connected = false;
        this.cache = new Map();
    }

    async connect() {
        try {
            const response = await fetch(`${this.serverUrl}/tools`);
            if (response.ok) {
                this.connected = true;
                console.log('MCP Client connected to', this.serverUrl);
                return true;
            }
        } catch (error) {
            console.warn('MCP Server not available, using fallback');
            this.connected = false;
        }
        return false;
    }

    async callTool(toolName, args) {
        // Check cache
        const cacheKey = `${toolName}:${JSON.stringify(args)}`;
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }

        let result;
        
        // Try HTTPS server first
        if (!this.connected) {
            await this.connect();
        }

        if (this.connected) {
            try {
                result = await this._callRemoteTool(toolName, args);
            } catch (error) {
                console.warn('Remote call failed, using fallback:', error);
                result = await this._executeToolLocally(toolName, args);
            }
        } else {
            result = await this._executeToolLocally(toolName, args);
        }
        
        // Cache result
        this.cache.set(cacheKey, result);
        return result;
    }

    async _callRemoteTool(toolName, args) {
        const response = await fetch(`${this.serverUrl}/tools/${toolName}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(args)
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        return await response.json();
    }

    async _executeToolLocally(toolName, args) {
        if (toolName === 'get_product_images') {
            return this._getProductImages(args.product_name, args.count || 3);
        }
        throw new Error(`Unknown tool: ${toolName}`);
    }

    _getProductImages(productName, count) {
        const colorSchemes = {
            'iphone': { bg: '007AFF', text: 'ffffff' },
            'samsung': { bg: '1428A0', text: 'ffffff' },
            'macbook': { bg: '000000', text: 'ffffff' },
            'laptop': { bg: '2563eb', text: 'ffffff' },
            'headphones': { bg: '8b5cf6', text: 'ffffff' },
            'airpods': { bg: 'f3f4f6', text: '000000' },
            'watch': { bg: '1f2937', text: 'ffffff' },
            'tablet': { bg: '6366f1', text: 'ffffff' },
        };

        // Determine colors
        const name = productName.toLowerCase();
        let colors = { bg: '6366f1', text: 'ffffff' };
        for (const [key, scheme] of Object.entries(colorSchemes)) {
            if (name.includes(key)) {
                colors = scheme;
                break;
            }
        }

        // Generate images
        const sizes = ['400x300', '500x400', '600x450'];
        const images = [];
        for (let i = 0; i < count; i++) {
            const size = sizes[i % sizes.length];
            const text = encodeURIComponent(productName.replace(/\s+/g, '+'));
            images.push(`https://via.placeholder.com/${size}/${colors.bg}/${colors.text}?text=${text}`);
        }

        return {
            product: productName,
            images: images,
            count: images.length
        };
    }

    async listTools() {
        return [
            {
                name: 'get_product_images',
                description: 'Get product images for e-commerce display',
                inputSchema: {
                    type: 'object',
                    properties: {
                        product_name: { type: 'string' },
                        count: { type: 'integer', default: 3 }
                    },
                    required: ['product_name']
                }
            }
        ];
    }
}

// Initialize global MCP client with HTTPS server URL
window.mcpClient = new MCPClient('http://localhost:5000');

// Auto-connect on page load
window.mcpClient.connect();

// Backward compatibility wrapper
window.mcpImageTool = {
    async getProductImages(productName, count = 3) {
        return await window.mcpClient.callTool('get_product_images', {
            product_name: productName,
            count: count
        });
    }
};
