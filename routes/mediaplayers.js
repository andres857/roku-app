import { Router } from 'express';
import { create, getDevicesConnected , getDevicesByClient, getSubscripcions } from '../services/mediaplayerService.js';

const router = Router();

router.get('/', async function(req, res) {
  const client = req.query.client;
  console.log(client);
  try {
    const devices = await getDevicesByClient(client);
    console.log(devices);
    res.json(devices);
  } catch (error) {
    res.status(500).send('Error al obtener dispositivos');
  }
});

router.get('/subscriptions', async function(req, res) {
  const id = req.query.idDevice;
  console.log(id);
  try {
    const subscripcions = await getSubscripcions(id);
    console.log(subscripcions);
    res.json(subscripcions);
  } catch (error) {
    res.status(500).send('Error al obtener dispositivos');
  }
});

router.post('/', async function(req, res) {
  const data = req.body;
  try {
    const newMediaPlayer  = await create(data);
    res.status(201).json({
      message: "mediaPlayer Created",
      mediaPlayer: newMediaPlayer
  });
  } catch (error) {
    res.status(500).json({
      message: "Error creating mediaPlayer",
      error: error.message
    });
  }
});

export {
  router as mediaplayerRouter
}