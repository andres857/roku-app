import { Router } from 'express';
import { getIdByName } from '../services/clientService.js';
import { create, getByIdClient, getById } from '../services/locationService.js';
import {roomRouter} from './rooms.js';

const router = Router({ mergeParams: true });

//:clientId en tus rutas
router.get('/', async function(req, res) {
  console.log(req.params);
  const id = req.params.clientID;
  console.log(id);
  try {
    const locations  = await getByIdClient(id);
    res.status(200).json({
      message: "Success",
      locations: locations
  });
  } catch (error) {
    res.status(500).json({
      message: "Error getting location",
      error: error.message
    });
  }
});

router.get('/:idLocation', async function(req, res) {
  const id = req.params.idLocation;
  try {
    const location  = await getById(id);
    res.status(200).json({
      message: "Success",
      location: location
  });
  } catch (error) {
    res.status(500).json({
      message: "Error getting location",
      error: error.message
    });
  }
});

router.post('/', async function(req, res) {
  const locationData = req.body;
  try {
    const idClient = await getIdByName(locationData.client);
    const created  = await create(idClient, locationData);
    res.status(201).json({
      message: "Location Created",
      client: created
  });
  } catch (error) {
    res.status(500).json({
      message: "Error creating Location",
      error: error.message
    });
  }
});

router.use('/:idLocation/rooms', roomRouter);

export {
  router as locationRouter
}