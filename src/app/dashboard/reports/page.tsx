"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { generateInsightfulReport, GenerateInsightfulReportOutput } from "@/ai/flows/generate-insightful-reports";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Wand2 } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const reportTypes = [
  { value: 'inventory_levels', label: 'Niveles de Inventario' },
  { value: 'production_efficiency', label: 'Eficiencia de Producción' },
  { value: 'sales_trends', label: 'Tendencias de Ventas' },
  { value: 'financial_performance', label: 'Rendimiento Financiero' },
  { value: 'best_selling_items', label: 'Artículos más Vendidos' },
  { value: 'slow_moving_items', label: 'Artículos de Baja Rotación' },
  { value: 'ingredients_at_risk_of_spoilage', label: 'Ingredientes en Riesgo de Deterioro' },
];

const sampleChartData = [
  { name: 'Pilsner', sales: 450 },
  { name: 'IPA', sales: 800 },
  { name: 'Stout', sales: 300 },
  { name: 'Lager', sales: 650 },
  { name: 'Sour', sales: 200 },
];

export default function ReportsPage() {
  const { toast } = useToast();
  const [reportType, setReportType] = React.useState<string | undefined>();
  const [isLoading, setIsLoading] = React.useState(false);
  const [report, setReport] = React.useState<GenerateInsightfulReportOutput | null>(null);

  const handleGenerateReport = async () => {
    if (!reportType) {
      toast({
        variant: "destructive",
        title: "Selecciona un tipo de informe",
        description: "Por favor, elige un tipo de informe para generar.",
      });
      return;
    }

    setIsLoading(true);
    setReport(null);

    try {
      const result = await generateInsightfulReport({ reportType });
      setReport(result);
    } catch (error) {
      console.error("Error al generar el informe:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo generar el informe en este momento.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="md:col-span-1 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Generar Informe</CardTitle>
            <CardDescription>Usa IA para generar informes de negocio detallados.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="report-type">Tipo de Informe</Label>
              <Select onValueChange={setReportType} value={reportType}>
                <SelectTrigger id="report-type">
                  <SelectValue placeholder="Selecciona un informe..." />
                </SelectTrigger>
                <SelectContent>
                  {reportTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleGenerateReport} disabled={isLoading || !reportType} className="w-full">
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Wand2 className="mr-2 h-4 w-4" />
              )}
              Generar con IA
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="md:col-span-2">
        <Card className="min-h-[500px]">
          <CardHeader>
            <CardTitle className="font-headline">{report?.reportTitle || "Tu Informe"}</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading && (
              <div className="flex flex-col items-center justify-center h-96">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="mt-4 text-muted-foreground">Generando tu informe...</p>
              </div>
            )}
            {!isLoading && !report && (
              <div className="flex flex-col items-center justify-center h-96 text-center">
                <Wand2 className="h-12 w-12 text-muted-foreground" />
                <p className="mt-4 text-muted-foreground">Selecciona un tipo de informe y haz clic en generar para ver tu informe.</p>
              </div>
            )}
            {report && (
              <div className="space-y-6">
                <Textarea readOnly value={report.reportContent} className="h-48 bg-background" />
                {report.visualization?.shouldVisualize && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Visualización: {report.visualization.visualizationType}</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={sampleChartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" fontSize={12} />
                        <YAxis fontSize={12} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'hsl(var(--background))',
                            borderColor: 'hsl(var(--border))',
                          }}
                        />
                        <Legend />
                        <Bar dataKey="sales" fill="hsl(var(--primary))" name="Ventas de Muestra" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
