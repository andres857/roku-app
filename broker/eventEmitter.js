import EventEmitter from 'events';

class MqttEmitter extends EventEmitter {}

const mqttEmitter = new MqttEmitter();

export default mqttEmitter;