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

  const handleLike = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation(); // Prevent the event from bubbling up to the parent div
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
    <button
      className={`mt-2 px-4 py-2 rounded ${
        liked ? 'bg-red-500 text-white' : 'bg-gray-300'
      }`}
      onClick={handleLike}
      disabled={liked}
    >
      {liked ? 'Liked' : 'Like'}
    </button>
  );
};

export default LikeButton;
