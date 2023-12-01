import { Router } from 'express';
import { get, create } from '../services/clientService.js';

const router = Router();

router.get('/', async function(req, res) {  
  try {
    const clients  = await get();
    res.status(200).json({
      ok: true,
      status: 200,
      message: "Success",
      client: clients
  });
  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      message: "Error getting clients",
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

export {
  router as clientRouter
}