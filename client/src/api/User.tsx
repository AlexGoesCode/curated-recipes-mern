export const fetchUserLikes = async (token: string) => {
  const response = await fetch('/api/user/likes', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data.likes;
};
