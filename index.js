const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const router = require('./mediaplayers/route');

const app = express();
const server = http.createServer(app);
// Configurar CORS para Socket.IO
const io = socketIo(server, {
  cors: {
    origin: "http://127.0.0.1:5173", // Reemplaza con el origen de tu cliente
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());
app.use('/', router);

io.on('connection', (socket) => {
  console.log('Cliente conectado');

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });

  // Más eventos y lógica aquí
});

const PORT = 5005;
server.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
