# Quick Start Guide - HTTPS MCP Server

## Setup (One-time)

### 1. Install Python Dependencies
```bash
pip install flask flask-cors
```

Or use requirements file:
```bash
pip install -r requirements.txt
```

## Running the Application

### Option 1: With MCP Server (Recommended)

**Terminal 1 - Start MCP Server:**
```bash
python mcp-server.py
```
You should see:
```
MCP Server running on http://localhost:5000
```

**Terminal 2 - Open Website:**
```bash
# Open index.html in your browser
# Or use a local server:
python -m http.server 8000
# Then visit: http://localhost:8000
```

### Option 2: Without MCP Server (Fallback Mode)

Just open `index.html` in your browser. The client will automatically use local fallback mode.

## Testing MCP Server

### Test 1: Check Server is Running
```bash
curl http://localhost:5000/tools
```

Expected output:
```json
{
  "tools": [
    {
      "name": "get_product_images",
      "description": "Get product images for e-commerce display",
      ...
    }
  ]
}
```

### Test 2: Call Tool
```bash
curl -X POST http://localhost:5000/tools/get_product_images \
  -H "Content-Type: application/json" \
  -d '{"product_name": "iPhone 15", "count": 3}'
```

Expected output:
```json
{
  "product": "iPhone 15",
  "images": ["url1", "url2", "url3"],
  "count": 3
}
```

## Troubleshooting

### Server won't start
- Check if port 5000 is already in use
- Install dependencies: `pip install flask flask-cors`

### Browser can't connect to server
- Make sure server is running on http://localhost:5000
- Check browser console for CORS errors
- The app will work in fallback mode if server is unavailable

### Images not loading
- Check browser console for errors
- Verify MCP client is initialized: `window.mcpClient`
- Server connection is optional - fallback mode works offline

## Architecture

```
Browser (index.html)
    ↓
MCP Client (mcp-client.js)
    ↓ HTTPS
MCP Server (mcp-server.py) on localhost:5000
    ↓
Product Image Tool
```

## Features

✅ HTTPS/REST API communication
✅ Automatic fallback to local mode
✅ Caching for performance
✅ CORS enabled
✅ Works offline (fallback mode)
