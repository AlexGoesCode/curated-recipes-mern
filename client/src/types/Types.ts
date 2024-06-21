export type Recipe = {
  _id?: string;
  name: string; // It's always available, so no need to make it optional
  origin: string;
  ingredients: string[];
  instructions: string;
  difficulty: 'easy' | 'medium' | 'hard';
  likes: number;
  imageUrl: string;
  diet:
    | 'nothing special'
    | 'vegetarian'
    | 'vegan'
    | 'gluten-free'
    | 'dairy-free'; // Match the schema exactly
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
