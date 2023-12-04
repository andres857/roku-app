import { Router } from 'express';
import { getAll, create, getById } from '../services/clientService.js';
import { locationRouter } from "./locations.js";

const router = Router();

router.get('/', async function(req, res) {  
  try {
    const clients  = await getAll();
    res.status(200).json({
      status: 200,
      message: "Success",
      clients: clients
  });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error getting clients",
      error: error.message
    });
  }
});

router.get('/:id', async function(req, res) {
  console.log("id client", req.params.id);
  try {
    const client  = await getById(req.params.id);
    res.status(200).json({
      status: 200,
      message: "Success",
      client: client
  });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error getting client",
      error: error.message
    });
  }
});

router.post('/', async function(req, res) {
  const clientData = req.body;
  try {
    const createdClient  = await create(clientData);
    res.status(201).json({
      ok: true,
      status: 201,
      message: "Client Created",
      client: createdClient
  });
  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      message: "Error creating client",
      error: error.message
    });
  }
});

//usa las rutas de router de location
router.use('/:clientID/locations', locationRouter);

export {
  router as clientRouter
}