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
import { productionBatches } from '@/lib/data';
import { format } from 'date-fns';

const statusVariantMap: { [key: string]: 'default' | 'secondary' | 'outline' } = {
  'Fermentando': 'secondary',
  'Acondicionando': 'default',
  'Embotellado': 'outline',
  'Planificación': 'default',
};

export default function ProductionPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Lotes de Producción</CardTitle>
        <CardDescription>Realiza un seguimiento de todos los lotes de producción en curso y completados.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID de Lote</TableHead>
              <TableHead>Receta</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Fecha de Inicio</TableHead>
              <TableHead>Fecha Ideal de Embotellado</TableHead>
              <TableHead>Fecha de Caducidad</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productionBatches.map((batch) => (
              <TableRow key={batch.id}>
                <TableCell className="font-medium">{batch.id.toUpperCase()}</TableCell>
                <TableCell>{batch.recipeName}</TableCell>
                <TableCell>
                  <Badge variant={statusVariantMap[batch.status] || 'default'}>{batch.status}</Badge>
                </TableCell>
                <TableCell>{format(batch.startDate, 'd MMM, yyyy')}</TableCell>
                <TableCell>{format(batch.idealBottlingDate, 'd MMM, yyyy')}</TableCell>
                <TableCell>{format(batch.expirationDate, 'd MMM, yyyy')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
