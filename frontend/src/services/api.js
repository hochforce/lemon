import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333',
});

const list = axios.create({
  baseURL: 'http://localhost:3333/listEventos',
});

export { api, list };