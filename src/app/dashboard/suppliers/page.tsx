"use client";

import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { inventory, suppliers } from '@/lib/data';
import { suggestAlternateVendors, SuggestAlternateVendorsOutput } from '@/ai/flows/suggest-alternate-vendors';
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Loader2 } from "lucide-react";

const lowStockIngredients = inventory.filter(
  (item) => item.category === 'Materia Prima' && item.quantity < item.reorderLevel
);

export default function SuppliersPage() {
  const { toast } = useToast();
  const [loadingIngredient, setLoadingIngredient] = React.useState<string | null>(null);
  const [vendorSuggestion, setVendorSuggestion] = React.useState<SuggestAlternateVendorsOutput | null>(null);

  const handleFindAlternates = async (ingredientName: string) => {
    setLoadingIngredient(ingredientName);
    try {
      const result = await suggestAlternateVendors({ ingredientName });
      setVendorSuggestion(result);
    } catch (error) {
      console.error("Error al encontrar proveedores alternativos:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudieron encontrar proveedores alternativos en este momento.",
      });
    } finally {
      setLoadingIngredient(null);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Lista de Proveedores</CardTitle>
          <CardDescription>Tus principales contactos para suministros.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Proveedor</TableHead>
                <TableHead>Persona de Contacto</TableHead>
                <TableHead>Correo Electrónico</TableHead>
                <TableHead>Teléfono</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {suppliers.map((supplier) => (
                <TableRow key={supplier.id}>
                  <TableCell className="font-medium">{supplier.name}</TableCell>
                  <TableCell>{supplier.contactPerson}</TableCell>
                  <TableCell>{supplier.email}</TableCell>
                  <TableCell>{supplier.phone}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {lowStockIngredients.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Ingredientes con Stock Bajo</CardTitle>
            <CardDescription>Encuentra proveedores alternativos para ingredientes que se están agotando.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ingrediente</TableHead>
                  <TableHead>Cantidad</TableHead>
                  <TableHead>Acción</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lowStockIngredients.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.quantity} {item.unit}</TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        onClick={() => handleFindAlternates(item.name)}
                        disabled={loadingIngredient === item.name}
                      >
                        {loadingIngredient === item.name ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : null}
                        Buscar Alternativas
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      <AlertDialog open={!!vendorSuggestion} onOpenChange={() => setVendorSuggestion(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-headline">¡Proveedor Alternativo Encontrado!</AlertDialogTitle>
            <AlertDialogDescription>
              Nuestra IA ha encontrado un posible proveedor alternativo para ti.
            </AlertDialogDescription>
          </AlertDialogHeader>
          {vendorSuggestion && (
            <div className="text-sm space-y-2">
              <p><strong className="font-medium">Proveedor:</strong> {vendorSuggestion.vendorName}</p>
              <p><strong className="font-medium">Contacto:</strong> {vendorSuggestion.vendorContact}</p>
              <p><strong className="font-medium">Sitio Web:</strong> <a href={vendorSuggestion.vendorWebsite} target="_blank" rel="noopener noreferrer" className="text-primary underline">{vendorSuggestion.vendorWebsite}</a></p>
            </div>
          )}
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setVendorSuggestion(null)}>¡Genial!</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
