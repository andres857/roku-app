const express = require('express');
const router = express.Router();
const { getDevices } = require('./service'); // Asegúrate de que la ruta sea correcta

router.get('/', async function(req, res) {
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

module.exports = router;