import { useEffect, useState } from 'react';

interface LikeButtonProps {
  recipeId: string;
  userId: string;
  likedRecipes: string[];
  onLike: (recipeId: string) => void; // Add onLike prop
}

const LikeButton = ({
  recipeId,
  userId,
  likedRecipes,
  onLike,
}: LikeButtonProps) => {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (likedRecipes.includes(recipeId)) {
      setLiked(true);
    }
  }, [likedRecipes, recipeId]);

  const handleLike = async () => {
    if (liked) return;

    try {
      const response = await fetch('/api/like', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer your-auth-token`, // Add your auth token here
        },
        body: JSON.stringify({ userId, recipeId }),
      });

      if (response.ok) {
        setLiked(true);
        onLike(recipeId); // Call onLike prop
      } else {
        const data = await response.json();
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error liking recipe:', error);
    }
  };

  return (
    <button onClick={handleLike} disabled={liked}>
      {liked ? 'Liked' : 'Like'}
    </button>
  );
};

export default LikeButton;
