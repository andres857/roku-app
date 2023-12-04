import { Router } from 'express';
import { create, getRooms } from '../services/roomService.js';

const router = Router({ mergeParams: true });

router.get('/', async function(req, res) {
  console.log('router Rooms');
  console.log(req.params);
  const idLocation = req.params.idLocation;
  try {
    const rooms  = await getRooms(idLocation);
    res.status(200).json({
      message: "Success",
      rooms: rooms
  });
  } catch (error) {
    res.status(500).json({
      message: "Error getting Rooms",
      error: error.message
    });
  }
});

router.post('/', async function(req, res) {
  console.log('router Rooms');
  console.log(req.params);
  const idLocation = req.params.idLocation;
  const roomData = req.body;
  console.log(roomData);

  try {
    const room  = await create(idLocation, roomData);
    res.status(201).json({
      message: "Room Created",
      room: room
  });
  } catch (error) {
    res.status(500).json({
      message: "Error creating Location",
      error: error.message
    });
  }
});

export {
  router as roomRouter
}