export type Recipe = {
  _id: string;
  name: string; // Make this optional if it's not always available
  origin: string;
  ingredients: string[];
  instructions: string;
  difficulty: 'easy' | 'medium' | 'hard';
  likes: number;
  imageUrl: string;
};

export type UserType = {
  email: string;
  uid: string;
};
export type SingleRecipeOkResponse = {
  error: boolean;
  message: string;
  data: Recipe;
};
