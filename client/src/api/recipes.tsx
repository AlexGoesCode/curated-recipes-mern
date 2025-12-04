import { baseUrl } from '../config';
import { Recipe } from '../types/Types';

// Define the shape of the params so it's type-safe
interface FetchRecipesParams {
  searchBy: 'name' | 'ingredients' | 'diet' | 'id';
  searchTerm: string;
  page: number;
  limit: number;
}

export const fetchRecipesApi = async ({
  searchBy,
  searchTerm,
  page,
  limit,
}: FetchRecipesParams) => {
  // Logic extracted from component
  const url = `${baseUrl}/api/curated-recipes/recipesby${searchBy}?${searchBy}=${searchTerm}&page=${page}&number=${limit}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
