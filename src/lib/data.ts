import type { InventoryItem, Recipe, ProductionBatch, Sale, Supplier } from '@/lib/types';
import { addDays, subDays } from 'date-fns';

export const suppliers: Supplier[] = [
  { id: 'sup1', name: 'GrainTrust', contactPerson: 'John Grain', email: 'john@graintrust.com', phone: '555-0101' },
  { id: 'sup2', name: 'Hops & Dreams', contactPerson: 'Jane Hopper', email: 'jane@hopsdreams.com', phone: '555-0102' },
  { id: 'sup3', name: 'Yeastly Boys', contactPerson: 'Mike Yeast', email: 'mike@yeastlyboys.com', phone: '555-0103' },
];

export const inventory: InventoryItem[] = [
  { id: 'inv1', name: 'Malta Pilsner', category: 'Materia Prima', quantity: 500, unit: 'kg', reorderLevel: 100, supplierId: 'sup1' },
  { id: 'inv2', name: 'Lúpulo Citra', category: 'Materia Prima', quantity: 20, unit: 'kg', reorderLevel: 5, supplierId: 'sup2' },
  { id: 'inv3', name: 'Lúpulo Cascade', category: 'Materia Prima', quantity: 15, unit: 'kg', reorderLevel: 5, supplierId: 'sup2' },
  { id: 'inv4', 'name': 'Levadura American Ale', 'category': 'Materia Prima', 'quantity': 2, 'unit': 'kg', 'reorderLevel': 1, 'supplierId': 'sup3' },
  { id: 'inv5', name: 'Golden Promise Pale Ale', category: 'Producto Terminado', quantity: 150, unit: 'botellas', reorderLevel: 50, supplierId: '' },
  { id: 'inv6', name: 'Citrus IPA', category: 'Producto Terminado', quantity: 45, unit: 'botellas', reorderLevel: 50, supplierId: '' },
  { id: 'inv7', name: 'Sanitizante Starsan', category: 'Suministro de Limpieza', quantity: 10, unit: 'litros', reorderLevel: 2, supplierId: 'sup1' },
];

export const recipes: Recipe[] = [
  {
    id: 'rec1',
    name: 'Golden Promise Pale Ale',
    description: 'Una pale ale equilibrada y lupulada con un final limpio.',
    instructions: [
      'Macerar a 65°C durante 60 minutos.',
      'Hervir durante 60 minutos, añadiendo lúpulos en los tiempos especificados.',
      'Enfriar a 20°C e inocular la levadura.',
      'Fermentar durante 7 días.',
      'Acondicionar durante 14 días antes de embotellar.',
    ],
    ingredients: [
      { ingredientId: 'inv1', name: 'Malta Pilsner', quantity: 5, unit: 'kg' },
      { ingredientId: 'inv3', name: 'Lúpulo Cascade', quantity: 50, unit: 'g' },
      { ingredientId: 'inv4', name: 'Levadura American Ale', quantity: 1, unit: 'paquete' },
    ],
  },
  {
    id: 'rec2',
    name: 'Citrus IPA',
    description: 'Una IPA jugosa y turbia rebosante de aromas cítricos.',
    instructions: [
      'Macerar a 67°C durante 60 minutos.',
      'Hervir durante 60 minutos.',
      'Añadir lúpulos de whirlpool después de hervir.',
      'Enfriar a 18°C e inocular la levadura.',
      'Hacer dry hopping en el día 3 de la fermentación.',
      'Fermentar por un total de 10 días.',
    ],
    ingredients: [
      { ingredientId: 'inv1', name: 'Malta Pilsner', quantity: 6, unit: 'kg' },
      { ingredientId: 'inv2', name: 'Lúpulo Citra', quantity: 100, unit: 'g' },
      { ingredientId: 'inv4', name: 'Levadura American Ale', quantity: 1, unit: 'paquete' },
    ],
  },
];

const now = new Date();
export const productionBatches: ProductionBatch[] = [
  { id: 'b1', recipeName: 'Golden Promise Pale Ale', status: 'Fermentando', startDate: subDays(now, 4), idealBottlingDate: addDays(now, 17), expirationDate: addDays(now, 197) },
  { id: 'b2', recipeName: 'Citrus IPA', status: 'Acondicionando', startDate: subDays(now, 15), idealBottlingDate: addDays(now, 2), expirationDate: addDays(now, 182) },
  { id: 'b3', recipeName: 'Golden Promise Pale Ale', status: 'Embotellado', startDate: subDays(now, 30), idealBottlingDate: subDays(now, 9), expirationDate: addDays(now, 150) },
];

export const sales: Sale[] = [
  { id: 's1', customer: 'El Pub Local', date: subDays(now, 1), total: 350.00, status: 'Pagado' },
  { id: 's2', customer: 'Rincón de la Cerveza Artesanal', date: subDays(now, 2), total: 720.50, status: 'Pagado' },
  { id: 's3', customer: 'Bar & Grill del Centro', date: subDays(now, 2), total: 480.00, status: 'Pendiente' },
  { id: 's4', customer: 'El Pub Local', date: subDays(now, 8), total: 320.00, status: 'Pagado' },
];
