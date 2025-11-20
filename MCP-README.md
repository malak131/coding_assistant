# MCP (Model Context Protocol) Implementation

## Overview
This project implements the Model Context Protocol (MCP) according to the official specification at https://modelcontextprotocol.io/

## Architecture

### MCP Server (`mcp-server.py`)
- Built using Flask for HTTPS communication
- RESTful API endpoints for MCP tools
- Provides `get_product_images` tool for e-commerce product images
- CORS enabled for browser access
- Runs on http://localhost:5000

### MCP Client (`mcp-client.js`)
- Browser-based MCP client using HTTPS
- Connects to MCP server via REST API
- Automatic fallback to local execution if server unavailable
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
# Install dependencies first
pip install -r requirements.txt

# Start HTTPS server
python mcp-server.py

# Server will run on http://localhost:5000
```

### Using MCP Client in Browser
```javascript
// Client auto-connects on page load to http://localhost:5000

// Call tool (will use HTTPS server if available, fallback to local)
const result = await window.mcpClient.callTool('get_product_images', {
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
- Server: HTTPS/REST API communication
- Tool listing via GET `/tools`
- Tool execution via POST `/tools/{tool_name}`
- Proper input/output schemas
- CORS support for browser clients
- Error handling and validation
- Automatic fallback to local execution

## Development

### Testing MCP Server
```bash
# Start server
python mcp-server.py

# Test tool listing
curl http://localhost:5000/tools

# Test tool execution
curl -X POST http://localhost:5000/tools/get_product_images \
  -H "Content-Type: application/json" \
  -d '{"product_name": "iPhone 15", "count": 3}'
```

### Adding New Tools
1. Add tool definition in `list_tools()`
2. Implement tool logic in `call_tool()`
3. Update client if needed

## References
- Official MCP Documentation: https://modelcontextprotocol.io/docs/develop/build-client
- MCP Python SDK: https://github.com/modelcontextprotocol/python-sdk
