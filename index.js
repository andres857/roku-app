const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.get('/', (req, res) => {
  res.send('WebSocket with Express');
});

wss.on('connection', (ws) => {
  console.log('Cliente conectado.');

  ws.on('message', (message) => {
    try {
      // Lógica de la base de datos que podría lanzar errores
      // Simulamos un error para propósitos demostrativos
      if (message === 'error') {
        throw new Error('¡Este es un error simulado!');
      }

      console.log(`Mensaje recibido: ${message}`);

      // Enviar un mensaje de vuelta al cliente
      ws.send(`Servidor recibió tu mensaje: ${message}`);
    } catch (error) {
      // Manejar errores y enviar un mensaje de error al cliente
      console.error('Error en el servidor:', error.message);
      ws.send(`Error en el servidor: ${error.message}`);
    }
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