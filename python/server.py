import asyncio
import websockets


async def hello(websocket, path):
    clients.append(websocket)
    while True:
        try:
            receivedMessage = await websocket.recv()
            print(f"Message reçu : {receivedMessage}")
            for client in clients:
                await client.send(receivedMessage)
        except websockets.ConnectionClosed:
            clients.remove(websocket)
            # for client in clients:
            #     print("client")
            break


clients = []

start_server = websockets.serve(hello, "localhost", 12345)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
