// api/user.js
// this file is in TS so it shou
export const fetchUserLikes = async (token: string) => {
  const response = await fetch('/api/user/likes', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // Add your auth token here
    },
  });
  const data = await response.json();
  return data.likes;
};
