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
import { sales } from '@/lib/data';
import { format } from 'date-fns';

const statusVariantMap: { [key: string]: 'default' | 'secondary' | 'destructive' } = {
  'Paid': 'default',
  'Pending': 'secondary',
  'Overdue': 'destructive',
};

export default function SalesPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Sales Orders</CardTitle>
        <CardDescription>Manage and track all customer sales orders.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sales.map((sale) => (
              <TableRow key={sale.id}>
                <TableCell className="font-medium">{sale.id.toUpperCase()}</TableCell>
                <TableCell>{sale.customer}</TableCell>
                <TableCell>{format(sale.date, 'MMM d, yyyy')}</TableCell>
                <TableCell className="text-right">
                  ${sale.total.toFixed(2)}
                </TableCell>
                <TableCell>
                  <Badge variant={statusVariantMap[sale.status] || 'default'}>{sale.status}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
