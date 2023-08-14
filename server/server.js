const WebSocket = require("ws");
const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("WebSocket server is running");
});

const wss = new WebSocket.Server({ server });

wss.on("connection", (ws, req) => {
  ws.send("test -> ");
  console.log("Client connected");

  ws.on("message", (message) => {
    console.log("Received message:", message);
    ws.send(message);
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

const port = 8080;
server.listen(port, () => {
  console.log(`WebSocket server is listening on port ${port}`);
});
