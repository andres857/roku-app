import { Room } from '../models/rooms.model.js';

const create = async function (idLocation, data){
    await Room.sync();
    try {
      const created = await Room.create({
        room_name: data.name,
        room_floor: data.floor,
        location_id: idLocation
      });
      console.log(created);
      return created;
    } catch (error) {
      console.error(error.message);
    }
}

const getRooms = async function (idLocation){
  const response = await Room.findAll({
    where:{
      location_id: idLocation
    }
  });
  if (response === null){
    console.log(' not found ');
    return null;
  }else{
    const rooms = response.map( room => room.dataValues);
    console.log(rooms);
    return rooms;
  }
}

export {
    create,
    getRooms,
    // getByIdClient
}