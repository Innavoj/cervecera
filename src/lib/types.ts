export type InventoryItem = {
  id: string;
  name: string;
  category: 'Raw Material' | 'Finished Product' | 'Cleaning Supply';
  quantity: number;
  unit: string;
  reorderLevel: number;
  supplierId: string;
};

export type RecipeIngredient = {
  ingredientId: string;
  name: string;
  quantity: number;
  unit: string;
};

export type Recipe = {
  id: string;
  name: string;
  description: string;
  instructions: string[];
  ingredients: RecipeIngredient[];
};

export type ProductionBatch = {
  id: string;
  recipeName: string;
  status: 'Planning' | 'Fermenting' | 'Conditioning' | 'Bottled';
  startDate: Date;
  idealBottlingDate: Date;
  expirationDate: Date;
};

export type Sale = {
  id: string;
  customer: string;
  date: Date;
  total: number;
  status: 'Paid' | 'Pending' | 'Overdue';
};

export type Supplier = {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
};
