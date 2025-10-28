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
  'Pagado': 'default',
  'Pendiente': 'secondary',
  'Vencido': 'destructive',
};

export default function SalesPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Órdenes de Venta</CardTitle>
        <CardDescription>Gestiona y realiza un seguimiento de todas las órdenes de venta de clientes.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID de Orden</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead>Estado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sales.map((sale) => (
              <TableRow key={sale.id}>
                <TableCell className="font-medium">{sale.id.toUpperCase()}</TableCell>
                <TableCell>{sale.customer}</TableCell>
                <TableCell>{format(sale.date, 'd MMM, yyyy')}</TableCell>
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
