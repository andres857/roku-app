import { Router } from 'express';
import { getIdByAlias } from '../services/clientService.js';
import { create } from '../services/locationService.js';

const router = Router();

// router.get('/', async function(req, res) {  
//   try {
//     const clients  = await get();
//     res.status(200).json({
//       ok: true,
//       status: 200,
//       message: "Success",
//       client: clients
//   });
//   } catch (error) {
//     res.status(500).json({
//       ok: false,
//       status: 500,
//       message: "Error getting clients",
//       error: error.message
//     });
//   }
// });

router.post('/', async function(req, res) {
  const locationData = req.body;
  try {
    // get id Client
    const idClient = await getIdByAlias(locationData.alias);
    console.log('**************');
    console.log(idClient);
    console.log('**************');

    const created  = await create(idClient, locationData);
    res.status(201).json({
      ok: true,
      status: 201,
      message: "Location Created",
      client: created
  });
  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      message: "Error creating Location",
      error: error.message
    });
  }
});

export {
  router as locationRouter
}