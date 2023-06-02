import axios from 'axios';
import soketio from 'socket.io-client';

const dev = 'http://192.168.0.64:3333';
const production = 'https://geb-server.appcom.dev';

export const api = axios.create({
  baseURL: production,
});

export const socket = soketio(production);
