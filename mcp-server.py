#!/usr/bin/env python3
"""
MCP Server: Product Image Service
Built according to official MCP specification
"""

import asyncio
import json
from mcp.server import Server
from mcp.server.stdio import stdio_server
from mcp.types import Tool, TextContent
import urllib.parse

# Initialize MCP Server
app = Server("product-image-service")

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

@app.list_tools()
async def list_tools() -> list[Tool]:
    """List available MCP tools"""
    return [
        Tool(
            name="get_product_images",
            description="Get product images for e-commerce display",
            inputSchema={
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
        )
    ]

@app.call_tool()
async def call_tool(name: str, arguments: dict) -> list[TextContent]:
    """Handle tool calls"""
    if name == "get_product_images":
        product_name = arguments.get("product_name", "")
        count = arguments.get("count", 3)
        
        # Generate images
        sizes = ['400x300', '500x400', '600x450']
        images = [generate_image_url(product_name, sizes[i % len(sizes)]) for i in range(count)]
        
        result = {
            "product": product_name,
            "images": images,
            "count": len(images)
        }
        
        return [TextContent(type="text", text=json.dumps(result, indent=2))]
    
    raise ValueError(f"Unknown tool: {name}")

async def main():
    """Run MCP server"""
    async with stdio_server() as (read_stream, write_stream):
        await app.run(read_stream, write_stream, app.create_initialization_options())

if __name__ == "__main__":
    asyncio.run(main())
