import axios from 'axios';
import { Mediaplayer } from '../models/mediaplayer.model.js';

// Tus credenciales para la autenticación básica
const username = 'admin';
const password = 'public';

// Codifica las credenciales en base64 para la autenticación básica
const basicAuth = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');

const getDevicesConnected = async () => {
  try {
    const {data} = await axios.get('http://3.129.105.109:8081/api/v4/clients', {
      headers: { 'Authorization': basicAuth }
    });
    const devices = data.data.map( (device)=>{
        return {
            clientid: device.clientid,
            connected: device.connected,
            ip_address: device.ip_address,
            // created_at: device.created_at,
            connected_at: device.connected_at,
            subscriptions_cnt: device.subscriptions_cnt,
            username: device.username
        }
    })
    return devices;
  } catch (error) {
    // Maneja el error como prefieras
    console.error('Error al obtener los dispositivos:', error);
    throw error; // o retorna un valor por defecto, según tus necesidades
  }
};

const getDevicesByClient = async function(client){
    try {
        const allDevices = await getAllDevices();
        const filterDevices = allDevices.filter( (device)=>{
        return device.username === `p${client}`
    })
    return filterDevices;
    } catch (error) {
        console.log(error);
    }
}

const getSubscripcions = async function(idDevice){
  try {
    const {data} = await axios.get(`http://3.129.105.109:8081/api/v4/subscriptions/${idDevice}`, {
      headers: { 'Authorization': basicAuth }
    });
    const subscriptions = data.data.map( (subscription)=>{
        return {
            clientid: subscription.clientid,
            topic: subscription.topic,
        }
    })
    return subscriptions;
  } catch (error) {
    // Maneja el error como prefieras
    console.error('Error al obtener las subscriptions:', error);
    throw error; // o retorna un valor por defecto, según tus necesidades
  }
}

const create = async function( dataMediaPlayer ){

  await Mediaplayer.sync();
    try {
      const created = await Mediaplayer.create({
        channel_id: dataMediaPlayer.channel_id || null,
        serial: dataMediaPlayer.serial,
        status: dataMediaPlayer.status,
        room_id: dataMediaPlayer.room_id,
      });
      return created;
    } catch (error) {
      console.error(error.message);
    }
}

export {
  getDevicesConnected,
  getDevicesByClient,
  getSubscripcions,
  create
};
