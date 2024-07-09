export type Recipe = {
  _id: string;
  name: string; // always available, no need to make it optional
  origin: string;
  ingredients: string[];
  instructions: string;
  difficulty: 'easy' | 'medium' | 'hard';
  likes: string[];
  picture: string;
  diet: 'none' | 'vegetarian' | 'vegan' | 'gluten-free' | 'dairy-free'; // Match the schema exactly
};

export type UserType = {
  email: string;
  username: string;
  likedRecipes: Recipe[];
  id: string;
  avatar: string;
};

export type SingleRecipeOkResponse = {
  error: boolean;
  message: string;
  data: Recipe;
};

export type LoginAndSignUpResponse = {
  message: string;
  user: UserType;
  token?: string;
};
export type GetProfileOkResponse = {
  message: string;
  user: UserType;
};
