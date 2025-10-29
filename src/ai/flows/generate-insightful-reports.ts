'use server';
/**
 * @fileOverview An AI agent that generates insightful reports on various aspects of the brewery business.
 *
 * - generateInsightfulReport - A function that generates insightful reports.
 * - GenerateInsightfulReportInput - The input type for the generateInsightfulReport function.
 * - GenerateInsightfulReportOutput - The return type for the generateInsightfulReport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ReportTypeSchema = z.enum([
  'inventory_levels',
  'production_efficiency',
  'sales_trends',
  'financial_performance',
  'best_selling_items',
  'slow_moving_items',
  'ingredients_at_risk_of_spoilage',
]);

const GenerateInsightfulReportInputSchema = z.object({
  reportType: ReportTypeSchema.describe('The type of report to generate.'),
  timePeriod: z
    .string()
    .optional()
    .describe(
      'The time period for the report (e.g., last week, last month, last year).'
    ),
});
export type GenerateInsightfulReportInput = z.infer<
  typeof GenerateInsightfulReportInputSchema
>;

const ReportVisualizationSchema = z.object({
  shouldVisualize: z
    .boolean()
    .describe(
      'Whether a visualization would effectively communicate insights.'
    ),
  visualizationType: z
    .string()
    .optional()
    .describe('The type of visualization to use (e.g., bar chart, line graph).'),
  visualizationData: z
    .string()
    .optional()
    .describe('The data to use for the visualization.'),
});

const GenerateInsightfulReportOutputSchema = z.object({
  reportTitle: z.string().describe('The title of the report.'),
  reportContent: z.string().describe('The content of the report.'),
  visualization: ReportVisualizationSchema.optional().describe(
    'An optional visualization for the report.'
  ),
});
export type GenerateInsightfulReportOutput = z.infer<
  typeof GenerateInsightfulReportOutputSchema
>;

export async function generateInsightfulReport(
  input: GenerateInsightfulReportInput
): Promise<GenerateInsightfulReportOutput> {
  return generateInsightfulReportFlow(input);
}

const shouldIncludeVisualizationTool = ai.defineTool({
  name: 'shouldIncludeVisualization',
  description: 'Determine if a visualization would effectively communicate the insights from the report data.',
  inputSchema: z.object({
    reportData: z.string().describe('The data from the generated report.'),
  }),
  outputSchema: z.object({
    shouldVisualize: z
      .boolean()
      .describe(
        'Whether a visualization would effectively communicate insights.'
      ),
    visualizationType: z
      .string()
      .optional()
      .describe('The type of visualization to use (e.g., bar chart, line graph).'),
  }),
},
async input => {
  const response = await ai.generate({
    prompt: `Based on the following report data, determine if a visualization would be helpful. If so, describe the visualization type.  If not, return shouldVisualize = false.\n\nReport Data: ${input.reportData}`,
    model: 'googleai/gemini-2.5-flash',
    config: {
      safetySettings: [
        {
          category: 'HARM_CATEGORY_HATE_SPEECH',
          threshold: 'BLOCK_ONLY_HIGH',
        },
        {
          category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
          threshold: 'BLOCK_NONE',
        },
        {
          category: 'HARM_CATEGORY_HARASSMENT',
          threshold: 'BLOCK_MEDIUM_AND_ABOVE',
        },
        {
          category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
          threshold: 'BLOCK_LOW_AND_ABOVE',
        },
      ],
    },
  });
  const shouldVisualizeMatch = response.text?.match(/shouldVisualize:\s*(true|false)/i);
  const visualizationTypeMatch = response.text?.match(/visualizationType:\s*([^\n]+)/i);
  const shouldVisualize = shouldVisualizeMatch ? shouldVisualizeMatch[1].toLowerCase() === 'true' : false;
  const visualizationType = visualizationTypeMatch ? visualizationTypeMatch[1].trim() : undefined;
  return { shouldVisualize: shouldVisualize, visualizationType: visualizationType };
});


const generateInsightfulReportPrompt = ai.definePrompt({
  name: 'generateInsightfulReportPrompt',
  input: {schema: GenerateInsightfulReportInputSchema},
  output: {schema: GenerateInsightfulReportOutputSchema},
  tools: [shouldIncludeVisualizationTool],
  prompt: `Eres un analista de negocios experto para una cervecería.

  Generarás un informe en español basado en los siguientes parámetros:

  Tipo de Informe: {{{reportType}}}
  Período de Tiempo: {{{timePeriod}}}

  Si el usuario solicita un informe de tendencias de ventas, DEBES mencionar productos específicos y su rendimiento.
  Si el usuario solicita un informe de niveles de inventario, DEBES mencionar ingredientes específicos y sus cantidades.
  Si el usuario solicita un informe de eficiencia de producción, DEBES mencionar cervezas específicas y sus tasas de producción.

  Analizarás los datos y proporcionarás información sobre el rendimiento de la cervecería.

  Usa la herramienta shouldIncludeVisualization para determinar si se debe incluir una visualización con el informe.

  Incluye también un título para el informe.
  `,
});

const generateInsightfulReportFlow = ai.defineFlow(
  {
    name: 'generateInsightfulReportFlow',
    inputSchema: GenerateInsightfulReportInputSchema,
    outputSchema: GenerateInsightfulReportOutputSchema,
  },
  async input => {
    const {output} = await generateInsightfulReportPrompt(input);

    if (output?.reportContent) {
      const visualizationDecision = await shouldIncludeVisualizationTool({
        reportData: output.reportContent,
      });

      output.visualization = {
        shouldVisualize: visualizationDecision.shouldVisualize,
        visualizationType: visualizationDecision.visualizationType,
        visualizationData: 'Sample Data', // Replace with actual data if available
      };
    }
    return output!;
  }
);
