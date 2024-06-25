// api/user.js

export const fetchUserLikes = async (token) => {
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
