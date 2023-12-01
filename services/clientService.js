import { Client } from '../models/client.model.js';

const create = async function (data){
    await Client.sync();
    try {
      const createdClient = await Client.create({
        client_name: data.name,
        client_abreviatura: data.siglas,
      });
      console.log(createdClient);
      return createdClient;
    } catch (error) {
      console.error(error.message);
    }
}

const get = async function (){
    const response = await Client.findAll({
        attributes: [ 'client_name', 'client_abreviatura']
    });
     const clients = response.map( client => {
      return {
        name: client.client_name,
        alias: client.client_abreviatura
      }
     })
    console.log(clients);
    return clients;
}

const getIdByAlias = async function (alias){
  const response = await Client.findOne({
    where: {
      client_abreviatura: alias
    }
  })
  if (response === null){
    console.log(' not found ');
    return null;
  }else{
    const idClient = response.dataValues.client_id
    return idClient;
  }
}

export {
    create,
    get,
    getIdByAlias
}