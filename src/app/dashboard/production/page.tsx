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
  'Fermenting': 'secondary',
  'Conditioning': 'default',
  'Bottled': 'outline',
  'Planning': 'default',
};

export default function ProductionPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Production Batches</CardTitle>
        <CardDescription>Track all ongoing and completed production batches.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Batch ID</TableHead>
              <TableHead>Recipe</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>Ideal Bottling Date</TableHead>
              <TableHead>Expiration Date</TableHead>
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
                <TableCell>{format(batch.startDate, 'MMM d, yyyy')}</TableCell>
                <TableCell>{format(batch.idealBottlingDate, 'MMM d, yyyy')}</TableCell>
                <TableCell>{format(batch.expirationDate, 'MMM d, yyyy')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
