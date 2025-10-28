'use server';

/**
 * @fileOverview Automatically searches the web for alternate vendors for ingredients that are running short.
 *
 * - suggestAlternateVendors - A function that initiates the vendor search and notification process.
 * - SuggestAlternateVendorsInput - The input type for the suggestAlternateVendors function.
 * - SuggestAlternateVendorsOutput - The return type for the suggestAlternateVendors function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestAlternateVendorsInputSchema = z.object({
  ingredientName: z.string().describe('The name of the ingredient that is running short.'),
});
export type SuggestAlternateVendorsInput = z.infer<typeof SuggestAlternateVendorsInputSchema>;

const SuggestAlternateVendorsOutputSchema = z.object({
  vendorName: z.string().describe('The name of the alternate vendor.'),
  vendorContact: z.string().describe('The contact information for the alternate vendor.'),
  vendorWebsite: z.string().describe('The website of the alternate vendor.'),
});

export type SuggestAlternateVendorsOutput = z.infer<typeof SuggestAlternateVendorsOutputSchema>;

export async function suggestAlternateVendors(input: SuggestAlternateVendorsInput): Promise<SuggestAlternateVendorsOutput> {
  return suggestAlternateVendorsFlow(input);
}

const findAlternateVendor = ai.defineTool({
  name: 'findAlternateVendor',
  description: 'Searches the web for alternate vendors of a specific ingredient.',
  inputSchema: z.object({
    ingredientName: z.string().describe('The name of the ingredient to find vendors for.'),
  }),
  outputSchema: z.object({
    vendorName: z.string().describe('The name of the alternate vendor.'),
    vendorContact: z.string().describe('The contact information for the alternate vendor.'),
    vendorWebsite: z.string().describe('The website of the alternate vendor.'),
  }),
  async (input) => {
    // Placeholder implementation for searching the web and finding vendor information.
    // In a real application, this would use a search engine or web scraping library.
    console.log(`Searching the web for alternate vendors for ${input.ingredientName}`);
    return {
      vendorName: 'Example Vendor',
      vendorContact: 'contact@example.com',
      vendorWebsite: 'https://example.com',
    };
  },
});

const prompt = ai.definePrompt({
  name: 'suggestAlternateVendorsPrompt',
  tools: [findAlternateVendor],
  input: {schema: SuggestAlternateVendorsInputSchema},
  output: {schema: SuggestAlternateVendorsOutputSchema},
  prompt: `You are a brewery assistant tasked with finding alternate vendors for ingredients that are running short.

  The brewery is running short on the following ingredient: {{{ingredientName}}}.

  Use the findAlternateVendor tool to search for an alternate vendor for this ingredient.
  Return the vendor name, contact, and website.
  `,
});

const suggestAlternateVendorsFlow = ai.defineFlow(
  {
    name: 'suggestAlternateVendorsFlow',
    inputSchema: SuggestAlternateVendorsInputSchema,
    outputSchema: SuggestAlternateVendorsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
