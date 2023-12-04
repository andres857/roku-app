import mqtt from "mqtt";
import mqttEmitter from './eventEmitter.js';
import dotenv from 'dotenv';
dotenv.config();

const host = process.env.HOST;
const port = process.env.PORT;
console.log(host);
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;

const connectUrl = `ws://${host}:${port}/mqtt`;

const client = mqtt.connect(connectUrl, {
  clientId,
  clean: true,
  connectTimeout: 4000,
  username:  process.env.USERNAME,
  password: process.env.PASSWORD,
  reconnectPeriod: 1000,
})

client.on('message', (topic, payload) => {
  console.log('Received Message:', topic, payload.toString());
  mqttEmitter.emit('mqttMessage', { topic, payload: payload.toString() });
})

client.on("reconnect", () => {
    console.log("Intentando reconectar al broker MQTT...");
});

client.on("error", (error) => {
    console.error("Error de conexión MQTT:", error);
});

export default client;