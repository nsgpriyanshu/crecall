// src/server.js

const WebSocket = require('ws');
const http = require('http');
const express = require('express');
const path = require('path');

// Create an Express application
const app = express();
const server = http.createServer(app);

// Serve static files from the 'public' directory (if you have any)
app.use(express.static(path.join(__dirname, 'public')));

// Create a WebSocket server
const wss = new WebSocket.Server({ server });

// Handle WebSocket connections
wss.on('connection', ws => {
  console.log('New client connected');

  ws.on('message', message => {
    // Broadcast received message to all connected clients
    wss.clients.forEach(client => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });

  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });
});

// Start the server
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`WebSocket server is running on ws://localhost:${PORT}`);
});
