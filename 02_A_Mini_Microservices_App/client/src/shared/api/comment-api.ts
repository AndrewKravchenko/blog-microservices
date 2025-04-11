import ky from 'ky';

export const commentApi = ky.create({
  prefixUrl: 'http://localhost:4001/',
  headers: {
    'Content-Type': 'application/json',
  },
});
