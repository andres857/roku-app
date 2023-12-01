import express from 'express';
import http from 'http';
// import { Server as SocketIo } from 'socket.io';
import cors from 'cors';
import { routerApi } from './routes/index.js';
import { db } from './db/index.js'

const PORT = process.env.PORT || 5005;

const app = express();
const server = http.createServer(app);

// Conectar a la base de datos
db.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida');
  })
  .catch(err => {
    console.error('Error al conectarse a la base de datos:', err);
  });

// Configurar CORS para Socket.IO
// const io = socketIo(server, {
//   cors: {
//     origin: "http://127.0.0.1:5173", // Reemplaza con el origen de tu cliente
//     methods: ["GET", "POST"]
//   }
// });

app.use(cors());
app.use(express.json());

routerApi(app);

// io.on('connection', (socket) => {
//   console.log('Cliente conectado');

//   socket.on('disconnect', () => {
//     console.log('Cliente desconectado');
//   });

//   // Más eventos y lógica aquí
// });

server.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
