#!/usr/bin/env python3
"""
MCP Server: Product Image Service
Built according to official MCP specification - HTTPS version
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import urllib.parse

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Product color schemes
COLOR_SCHEMES = {
    'iphone': ('007AFF', 'ffffff'),
    'samsung': ('1428A0', 'ffffff'),
    'macbook': ('000000', 'ffffff'),
    'laptop': ('2563eb', 'ffffff'),
    'headphones': ('8b5cf6', 'ffffff'),
    'airpods': ('f3f4f6', '000000'),
    'watch': ('1f2937', 'ffffff'),
    'tablet': ('6366f1', 'ffffff'),
}

def get_product_colors(product_name: str) -> tuple:
    """Get color scheme for product"""
    name = product_name.lower()
    for key, colors in COLOR_SCHEMES.items():
        if key in name:
            return colors
    return ('6366f1', 'ffffff')

def generate_image_url(product_name: str, size: str) -> str:
    """Generate placeholder image URL"""
    bg_color, text_color = get_product_colors(product_name)
    text = urllib.parse.quote(product_name.title().replace(' ', '+'))
    return f"https://via.placeholder.com/{size}/{bg_color}/{text_color}?text={text}"

@app.route('/tools', methods=['GET'])
def list_tools():
    """List available MCP tools"""
    return jsonify({
        "tools": [
            {
                "name": "get_product_images",
                "description": "Get product images for e-commerce display",
                "inputSchema": {
                    "type": "object",
                    "properties": {
                        "product_name": {
                            "type": "string",
                            "description": "Name of the product"
                        },
                        "count": {
                            "type": "integer",
                            "description": "Number of images to return",
                            "default": 3
                        }
                    },
                    "required": ["product_name"]
                }
            }
        ]
    })

@app.route('/tools/<tool_name>', methods=['POST'])
def call_tool(tool_name):
    """Handle tool calls"""
    data = request.get_json()
    
    if tool_name == "get_product_images":
        product_name = data.get("product_name", "")
        count = data.get("count", 3)
        
        # Generate images
        sizes = ['400x300', '500x400', '600x450']
        images = [generate_image_url(product_name, sizes[i % len(sizes)]) for i in range(count)]
        
        return jsonify({
            "product": product_name,
            "images": images,
            "count": len(images)
        })
    
    return jsonify({"error": f"Unknown tool: {tool_name}"}), 404

if __name__ == "__main__":
    print("MCP Server running on http://localhost:5000")
    app.run(host='0.0.0.0', port=5000, debug=True)
