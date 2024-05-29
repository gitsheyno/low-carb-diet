type Nutrients = {
  [key: string]: number;
};

export type Ingredient = {
  name: string;
  servingSizes: {
    [key: string]: string | number;
  };
};

export interface Recipe {
  id: string;
  name: string;
  image: string;
  prepareTime: number;
  cookTime: number;
  tags: string[];
  steps: [];
  nutrients: Nutrients;
  ingredients: Ingredient[];
  servings: number;
  category: string;
}
