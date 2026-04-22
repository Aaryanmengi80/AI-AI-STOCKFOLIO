import httpx
import asyncio

async def test():
    try:
        async with httpx.AsyncClient() as client:
            r = await client.get("http://127.0.0.1:8000/api/portfolio/status")
            print(f"Status: {r.status_code}")
            print(f"Content: {r.text[:200]}")
    except Exception as e:
        print(f"Error: {e}")

asyncio.run(test())
