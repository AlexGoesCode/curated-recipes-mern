import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { baseUrl } from '../config';

interface LikeButtonProps {
  recipeId: string;
  isLiked: boolean;
  fetchData: () => Promise<void>;
}

const LikeButton = ({ recipeId, isLiked, fetchData }: LikeButtonProps) => {
  const { user, getUserProfile } = useAuth();
  const navigate = useNavigate();

  const handleLike = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();

    if (!user?.id) {
      navigate('/login');
      return;
    }

    try {
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
      myHeaders.append(
        'Authorization',
        `Bearer ${localStorage.getItem('token')}`
      );

      const urlencoded = new URLSearchParams();
      urlencoded.append('recipeId', recipeId);
      urlencoded.append('userId', user.id);

      const url = `${baseUrl}/api/curated-recipes/${recipeId}/${
        isLiked ? 'unlike' : 'like'
      }`;
      const method = isLiked ? 'DELETE' : 'POST';

      const response = await fetch(url, {
        method,
        headers: myHeaders,
        body: urlencoded,
      });

      if (response.ok) {
        fetchData();
        getUserProfile();
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
