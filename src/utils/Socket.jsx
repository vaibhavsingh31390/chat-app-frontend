import { io } from 'socket.io-client';
import { host } from './APIRoutes';

const socket = io(host);

socket.on('connect', () => {
  console.log('Socket connected');
});

export default socket;
