import { Location } from '../models/locations.model.js';

const create = async function (idClient, data){
    await Location.sync();
    try {
      const created = await Location.create({
        location_name: data.name,
        address: data.address,
        client_id: idClient
      });
      console.log(created);
      return created;
    } catch (error) {
      console.error(error.message);
    }
}

export {
    create,
}