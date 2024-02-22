// Import the WebSocket library
import WebSocket from "ws";

// Create a WebSocket server on port 8080
const WebSocketServer = new WebSocket().Server({ port: 6001 });

// Set to store all connected clients
const clients = new Set();

// Event handler for when a client connects
WebSocketServer.on("connection", (clientSocket) => {
  console.log("A client connected"); // Log when a client connects

  // Add the client to the set of connected clients
  clients.add(clientSocket);

  // Event handler for when the server receives a message from a client
  clientSocket.on("message", (message) => {
    console.log(`Received: ${message}`); // Log the received message

    // Send the message to all connected clients
    for (const client of clients) {
      // if (client !== clientSocket || true) {
      // }
      client.send(`User said: ${message}`);
    }
  });

  // Event handler for when a client disconnects
  clientSocket.on("close", () => {
    console.log("Client disconnected"); // Log when a client disconnects

    // Remove the client from the set of connected clients
    clients.delete(clientSocket);
  });

  // Send a welcome message to the newly connected client
  clientSocket.send("Welcome! You are now connected.");
});
