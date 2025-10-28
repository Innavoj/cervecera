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
  'inventory_levels',
  'production_efficiency',
  'sales_trends',
  'financial_performance',
  'best_selling_items',
  'slow_moving_items',
  'ingredients_at_risk_of_spoilage',
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
        title: "Select a report type",
        description: "Please choose a type of report to generate.",
      });
      return;
    }

    setIsLoading(true);
    setReport(null);

    try {
      const result = await generateInsightfulReport({ reportType });
      setReport(result);
    } catch (error) {
      console.error("Error generating report:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not generate the report at this time.",
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
            <CardTitle className="font-headline">Generate Report</CardTitle>
            <CardDescription>Use AI to generate insightful business reports.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="report-type">Report Type</Label>
              <Select onValueChange={setReportType} value={reportType}>
                <SelectTrigger id="report-type">
                  <SelectValue placeholder="Select a report..." />
                </SelectTrigger>
                <SelectContent>
                  {reportTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
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
              Generate with AI
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="md:col-span-2">
        <Card className="min-h-[500px]">
          <CardHeader>
            <CardTitle className="font-headline">{report?.reportTitle || "Your Report"}</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading && (
              <div className="flex flex-col items-center justify-center h-96">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="mt-4 text-muted-foreground">Generating your report...</p>
              </div>
            )}
            {!isLoading && !report && (
              <div className="flex flex-col items-center justify-center h-96 text-center">
                <Wand2 className="h-12 w-12 text-muted-foreground" />
                <p className="mt-4 text-muted-foreground">Select a report type and click generate to see your report.</p>
              </div>
            )}
            {report && (
              <div className="space-y-6">
                <Textarea readOnly value={report.reportContent} className="h-48 bg-background" />
                {report.visualization?.shouldVisualize && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Visualization: {report.visualization.visualizationType}</h3>
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
                        <Bar dataKey="sales" fill="hsl(var(--primary))" name="Sample Sales" />
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
