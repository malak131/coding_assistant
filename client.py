import asyncio

from my_mcp_client.mcp_client_class import MCPClient
    
async def main():
    async with MCPClient() as client:
        result = await client.plus()
        print(result)

asyncio.run(main())
