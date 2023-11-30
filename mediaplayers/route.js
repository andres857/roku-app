import { Router } from 'express';
import { getDevices, getSubscripcions } from './service.js';

const router = Router();

router.get('/devices', async function(req, res) {
  const client = req.query.client;
  console.log(client);
  try {
    const devices = await getDevices(client);
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

export {
  router
} 