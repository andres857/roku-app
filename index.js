const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const clientesConectados = {};

app.get('/', (req, res) => {
  res.send('WebSocket with Express');
});

// Endpoint para obtener la lista de clientes conectados
app.get('/clientes', (req, res) => {
  const listaClientes = Object.keys(clientesConectados).map((idCliente) => {
    return {
      id: idCliente,
    };
  });

  res.json(listaClientes);
});

wss.on('connection', (ws) => {
  console.log('Cliente conectado.');

  ws.on('message', (message) => {
    const data = JSON.parse(message);
    clientesConectados[data.id] = ws;
    console.log(`Cliente conectado con ID: ${data.id}`);
  });

  ws.on('close', () => {
    console.log('Cliente desconectado.');
  });
});

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error('Error en Express:', err.message);
  res.status(500).send('Error interno del servidor.');
});

const PORT = 5005;

server.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});