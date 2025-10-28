import type { InventoryItem, Recipe, ProductionBatch, Sale, Supplier } from '@/lib/types';
import { addDays, subDays } from 'date-fns';

export const suppliers: Supplier[] = [
  { id: 'sup1', name: 'GrainTrust', contactPerson: 'John Grain', email: 'john@graintrust.com', phone: '555-0101' },
  { id: 'sup2', name: 'Hops & Dreams', contactPerson: 'Jane Hopper', email: 'jane@hopsdreams.com', phone: '555-0102' },
  { id: 'sup3', name: 'Yeastly Boys', contactPerson: 'Mike Yeast', email: 'mike@yeastlyboys.com', phone: '555-0103' },
];

export const inventory: InventoryItem[] = [
  { id: 'inv1', name: 'Pilsner Malt', category: 'Raw Material', quantity: 500, unit: 'kg', reorderLevel: 100, supplierId: 'sup1' },
  { id: 'inv2', name: 'Citra Hops', category: 'Raw Material', quantity: 20, unit: 'kg', reorderLevel: 5, supplierId: 'sup2' },
  { id: 'inv3', name: 'Cascade Hops', category: 'Raw Material', quantity: 15, unit: 'kg', reorderLevel: 5, supplierId: 'sup2' },
  { id: 'inv4', 'name': 'American Ale Yeast', 'category': 'Raw Material', 'quantity': 2, 'unit': 'kg', 'reorderLevel': 1, 'supplierId': 'sup3' },
  { id: 'inv5', name: 'Golden Promise Pale Ale', category: 'Finished Product', quantity: 150, unit: 'bottles', reorderLevel: 50, supplierId: '' },
  { id: 'inv6', name: 'Citrus IPA', category: 'Finished Product', quantity: 45, unit: 'bottles', reorderLevel: 50, supplierId: '' },
  { id: 'inv7', name: 'Starsan Sanitizer', category: 'Cleaning Supply', quantity: 10, unit: 'liters', reorderLevel: 2, supplierId: 'sup1' },
];

export const recipes: Recipe[] = [
  {
    id: 'rec1',
    name: 'Golden Promise Pale Ale',
    description: 'A balanced, hop-forward pale ale with a clean finish.',
    instructions: [
      'Mash at 65°C for 60 minutes.',
      'Boil for 60 minutes, adding hops at specified times.',
      'Cool to 20°C and pitch yeast.',
      'Ferment for 7 days.',
      'Condition for 14 days before bottling.',
    ],
    ingredients: [
      { ingredientId: 'inv1', name: 'Pilsner Malt', quantity: 5, unit: 'kg' },
      { ingredientId: 'inv3', name: 'Cascade Hops', quantity: 50, unit: 'g' },
      { ingredientId: 'inv4', name: 'American Ale Yeast', quantity: 1, unit: 'pack' },
    ],
  },
  {
    id: 'rec2',
    name: 'Citrus IPA',
    description: 'A juicy and hazy IPA bursting with citrus aromas.',
    instructions: [
      'Mash at 67°C for 60 minutes.',
      'Boil for 60 minutes.',
      'Add whirlpool hops after boil.',
      'Cool to 18°C and pitch yeast.',
      'Dry hop on day 3 of fermentation.',
      'Ferment for 10 days total.',
    ],
    ingredients: [
      { ingredientId: 'inv1', name: 'Pilsner Malt', quantity: 6, unit: 'kg' },
      { ingredientId: 'inv2', name: 'Citra Hops', quantity: 100, unit: 'g' },
      { ingredientId: 'inv4', name: 'American Ale Yeast', quantity: 1, unit: 'pack' },
    ],
  },
];

const now = new Date();
export const productionBatches: ProductionBatch[] = [
  { id: 'b1', recipeName: 'Golden Promise Pale Ale', status: 'Fermenting', startDate: subDays(now, 4), idealBottlingDate: addDays(now, 17), expirationDate: addDays(now, 197) },
  { id: 'b2', recipeName: 'Citrus IPA', status: 'Conditioning', startDate: subDays(now, 15), idealBottlingDate: addDays(now, 2), expirationDate: addDays(now, 182) },
  { id: 'b3', recipeName: 'Golden Promise Pale Ale', status: 'Bottled', startDate: subDays(now, 30), idealBottlingDate: subDays(now, 9), expirationDate: addDays(now, 150) },
];

export const sales: Sale[] = [
  { id: 's1', customer: 'The Local Pub', date: subDays(now, 1), total: 350.00, status: 'Paid' },
  { id: 's2', customer: 'Craft Beer Corner', date: subDays(now, 2), total: 720.50, status: 'Paid' },
  { id: 's3', customer: 'Downtown Bar & Grill', date: subDays(now, 2), total: 480.00, status: 'Pending' },
  { id: 's4', customer: 'The Local Pub', date: subDays(now, 8), total: 320.00, status: 'Paid' },
];
