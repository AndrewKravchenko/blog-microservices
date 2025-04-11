import ky from 'ky';

export const commentApi = ky.create({
  prefixUrl: import.meta.env.VITE_API_COMMENTS_SERVICE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
