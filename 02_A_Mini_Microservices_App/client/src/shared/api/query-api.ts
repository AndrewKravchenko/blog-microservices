import ky from 'ky';

export const queryApi = ky.create({
  prefixUrl: 'http://localhost:4002/',
  headers: {
    'Content-Type': 'application/json',
  },
});
