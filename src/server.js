const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: 8080 })

wss.on('connection', ws => {
  ws.on('message', message => {
    const data = JSON.parse(message)
    // Broadcast the message to all clients except the sender
    wss.clients.forEach(client => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data))
      }
    })
  })

  ws.send(JSON.stringify({ message: 'Welcome to the signaling server' }))
})

console.log('WebSocket signaling server is running on ws://localhost:8080')
