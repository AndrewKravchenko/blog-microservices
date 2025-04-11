import ky from 'ky';

export const postApi = ky.create({
  prefixUrl: import.meta.env.VITE_API_POSTS_SERVICE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
