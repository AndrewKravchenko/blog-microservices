import ky from 'ky';

export const queryApi = ky.create({
  prefixUrl: import.meta.env.VITE_API_QUERY_SERVICE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
