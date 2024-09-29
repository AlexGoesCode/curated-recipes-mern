export const baseUrl =
  import.meta.env.MODE === 'development'
    ? 'http://localhost:5022/api'
    : 'https://curated-recipes-server.vercel.app/api';
