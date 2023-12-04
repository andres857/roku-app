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

const getById = async function (id){
  const response = await Location.findByPk(id)
  if (response === null){
    console.log(' not found ');
    return null;
  }else{
    const location = response.dataValues;
    console.log(location);
    return location;
  }
}

const getByIdClient = async function (id){
  const response = await Location.findAll({
    where:{
      client_id: id
    }
  });
  if (response === null){
    console.log(' not found ');
    return null;
  }else{
    const locations = response.map( location => location.dataValues);
    console.log(locations);
    return locations;
  }
}

export {
    create,
    getById,
    getByIdClient
}