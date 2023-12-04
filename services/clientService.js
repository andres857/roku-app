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

const getAll = async function (){
    const response = await Client.findAll({
        attributes: ['client_id', 'client_name', 'client_abreviatura']
    });
     const clients = response.map( client => {
      return {
        id: client.client_id,
        name: client.client_name,
        alias: client.client_abreviatura
      }
     })
    console.log(clients);
    return clients;
}

const getById = async function (id){
  const response = await Client.findByPk(id)
  if (response === null){
    console.log(' not found ');
    return null;
  }else{
    const client = response.dataValues;
    console.log(client);
    return client;
  }
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

const getIdByName = async function (name){
  const response = await Client.findOne({
    where: {
      client_name: name
    }
  })
  if (response === null){
    console.log(' not found ');
    return null;
  }else{
    const client = response.dataValues.client_id;
    return client;
  }
}

export {
  create,
  getAll,
  getIdByName,
  getById,
  getIdByAlias
}