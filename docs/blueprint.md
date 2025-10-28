# **App Name**: BrewCentral

## Core Features:

- Inventory Management: Track raw materials and finished products inventory, manage stock levels, and automate reordering.
- Recipe Creation: Define and manage beer recipes with detailed ingredient lists and production instructions. The system warns the user when ingredients aren't in stock.
- Production Batch Management: Create and track production batches, linking them to specific recipes and monitoring progress through various stages. Also compute ideal bottling and expiration dates automatically
- Sales and Order Management: Process sales orders, manage customer accounts, and track sales performance. Also maintain customer credit data.
- User Authentication and Roles: Secure the application with Keycloak, manage user roles and permissions to control access to different features and data.
- Report Generation: Generate reports on inventory levels, production efficiency, sales trends, and financial performance. The system is capable of generating reports such as best selling items, slow moving items, and ingredients at risk of spoilage. Use a tool to determine whether it makes sense to generate a visualization given the results returned, and, if the visualization would communicate insights well, include a visualization in the report.
- Supplier Management: Maintain records of suppliers, their contact information, and materials provided. A LLM automatically searches the web periodically to locate alternate vendors in case a particular ingredient runs short. (If a replacement vendor is found, notify an admin)

## Style Guidelines:

- Primary color: Use 'brew-brown-600' from the Tailwind theme, reminiscent of rich beer colors.
- Background color: Use 'brew-brown-50' from the Tailwind theme, evoking a brewery-like atmosphere with desaturated shade of amber.
- Accent color: Use 'brew-gold-500' from the Tailwind theme, for highlights and calls to action.
- Headline font: 'Playfair', a modern serif, elegant and high-end. Body font: 'PT Sans', a modern humanist sans-serif.
- Use minimalist icons related to brewing, ingredients, and management.
- Clean and organized layout with clear navigation, prioritizing key metrics and workflows. Utilize Tailwind's grid and flexbox utilities.
- Subtle transitions and animations to enhance user experience. Use Tailwind's transition utilities.