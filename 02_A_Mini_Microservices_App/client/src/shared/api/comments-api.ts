import ky from 'ky';

export const commentsApi = ky.create({
  prefixUrl: 'http://localhost:4001/',
  headers: {
    'Content-Type': 'application/json',
  },
});
