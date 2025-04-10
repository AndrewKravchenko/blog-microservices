import ky from 'ky';

export const postsApi = ky.create({
  prefixUrl: 'http://localhost:4000/',
  headers: {
    'Content-Type': 'application/json',
  },
});
