export interface Recipe {
  id: string;
  name: string;
  image: string;
  prepareTime: number;
  tags: string[];
  steps: string[];
  nutrients?: any;
  ingredients: any;
  servings: number;
  category: string;
}
