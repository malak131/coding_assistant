from mcp import ClientSession
from typing import Optional
from contextlib import AsyncExitStack

class MCPClient:

    def __init__(self, url : str):
        self.session: Optional[ClientSession] = None
        self._exit_stack = AsyncExitStack()
        self.url = url

    async def __aenter__(self):
        print("Entering Session")
        return self
    async def __aexit__(self, *args):
        print("Exiting Session")

    async def plus(self):
        return "Plus Working..."