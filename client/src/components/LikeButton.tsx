// import { useContext, useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';

interface LikeButtonProps {
  recipeId: string;
  isLiked: boolean;
  fetchData: () => Promise<void>;
}

const LikeButton = ({ recipeId, isLiked, fetchData }: LikeButtonProps) => {
  const { user, getUserProfile } = useAuth();
  console.log('isLiked :>> ', isLiked);

  const handleLike = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation(); // Prevent the event from bubbling up to the parent div

    console.log('user :>> ', user);
    console.log('recipeId :>> ', recipeId);
    console.log('isLiked :>> ', isLiked);

    try {
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
      myHeaders.append(
        'Authorization',
        `Bearer ${localStorage.getItem('token')}`
      );

      const urlencoded = new URLSearchParams();
      urlencoded.append('recipeId', recipeId);
      urlencoded.append('userId', user?.id ?? '');

      if (!user?.id || !recipeId) {
        alert('you need to login first to like/unlike a recipe');
        return;
      }

      const url = `http://localhost:5022/api/curated-recipes/${recipeId}/${
        isLiked ? 'unlike' : 'like'
      }`;
      const method = isLiked ? 'DELETE' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: myHeaders,
        body: urlencoded,
      });

      if (response.ok) {
        const data = await response.json();
        console.log(`${isLiked ? 'recipe unliked' : 'recipe liked'}`, data);
        fetchData();
        getUserProfile();
      } else {
        console.log(`can't ${isLiked ? 'unlike' : 'like'} recipe`);
      }
    } catch (error) {
      console.error(`Error ${isLiked ? 'unliking' : 'liking'} recipe:`, error);
    }
  };

  return (
    <button
      className={`mt-2 px-4 py-2 rounded-lg ${
        isLiked ? 'bg-red-500 text-white' : 'bg-gray-300'
      }`}
      onClick={handleLike}
    >
      <FontAwesomeIcon icon={isLiked ? solidHeart : regularHeart} />
    </button>
  );
};

export default LikeButton;
