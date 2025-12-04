import { baseUrl } from '../config';
import { Recipe } from '../types/Types';

export interface FetchRecipesParams {
  searchBy: 'name' | 'ingredients' | 'diet' | 'id';
  searchTerm: string;
  page: number;
  limit: number;
}

// Added ': Promise<Recipe[]>' to use the imported Recipe type
export const fetchRecipesApi = async ({
  searchBy,
  searchTerm,
  page,
  limit,
}: FetchRecipesParams): Promise<Recipe[]> => {
  const url = `${baseUrl}/api/curated-recipes/recipesby${searchBy}?${searchBy}=${searchTerm}&page=${page}&number=${limit}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    // Cast the result to Recipe[] so TypeScript is happy
    const data = await response.json();
    return data as Recipe[];
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
