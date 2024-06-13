export type Recipe = {
  id: string;
  title: string;
  cuisine?: string;
  diet?: string;
  name?: string; // Make this optional if it's not always available
  image: string;
  type?: string;
  ingredients: string[];
  instructions: string;
  author: string;
};

export type UserType = {
  email: string;
  uid: string;
};
