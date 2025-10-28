export type InventoryItem = {
  id: string;
  name: string;
  category: 'Materia Prima' | 'Producto Terminado' | 'Suministro de Limpieza';
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
  status: 'Planificación' | 'Fermentando' | 'Acondicionando' | 'Embotellado';
  startDate: Date;
  idealBottlingDate: Date;
  expirationDate: Date;
};

export type Sale = {
  id: string;
  customer: string;
  date: Date;
  total: number;
  status: 'Pagado' | 'Pendiente' | 'Vencido';
};

export type Supplier = {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
};
