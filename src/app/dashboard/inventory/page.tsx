import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { inventory } from '@/lib/data';
import type { InventoryItem } from '@/lib/types';

function getStockStatus(item: InventoryItem): { text: string; variant: 'default' | 'secondary' | 'destructive' } {
  if (item.quantity <= 0) {
    return { text: 'Out of Stock', variant: 'destructive' };
  }
  if (item.quantity < item.reorderLevel) {
    return { text: 'Low Stock', variant: 'secondary' };
  }
  return { text: 'In Stock', variant: 'default' };
}

export default function InventoryPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Inventory Status</CardTitle>
        <CardDescription>A complete overview of your stock levels.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Quantity</TableHead>
              <TableHead className="text-right">Reorder Level</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inventory.map((item) => {
              const status = getStockStatus(item);
              return (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell className="text-right">
                    {item.quantity} {item.unit}
                  </TableCell>
                  <TableCell className="text-right">
                    {item.reorderLevel} {item.unit}
                  </TableCell>
                  <TableCell>
                    <Badge variant={status.variant}>{status.text}</Badge>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
