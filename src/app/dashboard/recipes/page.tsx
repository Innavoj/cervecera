import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { inventory, recipes } from '@/lib/data';
import { cn } from '@/lib/utils';
import { AlertTriangle } from 'lucide-react';

const inventoryMap = new Map(inventory.map((item) => [item.id, item]));

export default function RecipesPage() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {recipes.map((recipe) => {
        const hasLowStock = recipe.ingredients.some(ing => {
            const stockItem = inventoryMap.get(ing.ingredientId);
            return stockItem && stockItem.quantity < stockItem.reorderLevel;
        });

        return (
            <Card key={recipe.id} className="flex flex-col">
            <CardHeader>
              <CardTitle className="font-headline">{recipe.name}</CardTitle>
              <CardDescription className="flex-grow">{recipe.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="ingredients">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                        Ingredients
                        {hasLowStock && <AlertTriangle className="w-4 h-4 text-yellow-500" />}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      {recipe.ingredients.map((ing) => {
                         const stockItem = inventoryMap.get(ing.ingredientId);
                         const isLow = stockItem && stockItem.quantity < stockItem.reorderLevel;
                        return (
                          <li key={ing.ingredientId} className={cn(isLow && 'text-yellow-600 dark:text-yellow-400')}>
                            {ing.name}: {ing.quantity} {ing.unit}
                          </li>
                        );
                      })}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="instructions">
                  <AccordionTrigger>Instructions</AccordionTrigger>
                  <AccordionContent>
                    <ol className="list-decimal pl-5 space-y-2 text-sm">
                      {recipe.instructions.map((step, index) => (
                        <li key={index}>{step}</li>
                      ))}
                    </ol>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
