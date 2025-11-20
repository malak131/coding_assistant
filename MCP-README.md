# MCP (Model Context Protocol) Implementation

## Overview
This project implements the Model Context Protocol (MCP) according to the official specification at https://modelcontextprotocol.io/

## Architecture

### MCP Server (`mcp-server.py`)
- Built using official MCP Python SDK
- Implements stdio-based server communication
- Provides `get_product_images` tool for e-commerce product images
- Follows MCP specification for tool listing and execution

### MCP Client (`mcp-client.js`)
- Browser-based MCP client implementation
- Provides backward compatibility with existing code
- Implements caching for performance optimization
- Follows MCP client specification

## Installation

### Prerequisites
```bash
# Install Python MCP SDK
pip install -r requirements.txt
```

### Configuration
The MCP server is configured in `mcp-server.json`:
```json
{
  "mcpServers": {
    "product-image-service": {
      "command": "python",
      "args": ["mcp-server.py"],
      "env": {}
    }
  }
}
```

## Usage

### Starting MCP Server
```bash
python mcp-server.py
```

### Using MCP Client in Browser
```javascript
// Initialize client
const client = window.mcpClient;

// Call tool
const result = await client.callTool('get_product_images', {
    product_name: 'iPhone 15 Pro',
    count: 3
});

// Backward compatible API
const images = await window.mcpImageTool.getProductImages('iPhone 15 Pro', 3);
```

## MCP Tools

### get_product_images
Retrieves product images for e-commerce display.

**Input Schema:**
```json
{
  "product_name": "string (required)",
  "count": "integer (optional, default: 3)"
}
```

**Output:**
```json
{
  "product": "Product Name",
  "images": ["url1", "url2", "url3"],
  "count": 3
}
```

## File Structure
```
├── mcp-server.py          # MCP server implementation
├── mcp-client.js          # MCP client implementation
├── mcp-server.json        # MCP server configuration
├── requirements.txt       # Python dependencies
└── js/
    └── mcp-client.js      # Browser MCP client
```

## Migration from Old Implementation

### Changes Made
1. Replaced `mcp-product-images.py` with `mcp-server.py` (official MCP spec)
2. Replaced `js/mcp-image-tool.js` with `js/mcp-client.js`
3. Updated all HTML files to use new MCP client
4. Added proper MCP configuration and dependencies

### Backward Compatibility
The new implementation maintains backward compatibility:
```javascript
// Old API still works
window.mcpImageTool.getProductImages(productName, count)

// New API available
window.mcpClient.callTool('get_product_images', { product_name, count })
```

## Official MCP Specification
This implementation follows the official Model Context Protocol specification:
- Server: stdio-based communication
- Tool listing via `list_tools()`
- Tool execution via `call_tool()`
- Proper input/output schemas
- Error handling and validation

## Development

### Testing MCP Server
```bash
# Test tool listing
python mcp-server.py

# Test tool execution (via MCP client)
```

### Adding New Tools
1. Add tool definition in `list_tools()`
2. Implement tool logic in `call_tool()`
3. Update client if needed

## References
- Official MCP Documentation: https://modelcontextprotocol.io/docs/develop/build-client
- MCP Python SDK: https://github.com/modelcontextprotocol/python-sdk
