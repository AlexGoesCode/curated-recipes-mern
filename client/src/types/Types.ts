export type Recipe = {
  _id: string;
  name: string;
  origin: string;
  ingredients: string[];
  instructions: string;
  difficulty: 'easy' | 'medium' | 'hard';
  likes: string[];
  picture: string;
  diet: ('none' | 'vegetarian' | 'vegan' | 'gluten-free' | 'dairy-free')[];
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
