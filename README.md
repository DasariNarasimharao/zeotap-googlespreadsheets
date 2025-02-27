# Google Sheets Clone

A web-based spreadsheet application that mimics core Google Sheets functionality, built with React and Express.

## Features

- 📊 Spreadsheet Interface
  - Grid-based layout with column (A-Z) and row (1-100) headers
  - Cell selection and editing
  - Formula bar for direct value/formula input
  - Basic cell formatting (bold, italic)

- 🧮 Mathematical Functions
  - SUM: Calculate sum of cells
  - AVERAGE: Calculate average of cells
  - MAX: Find maximum value
  - MIN: Find minimum value
  - COUNT: Count numeric cells

- 🔤 Data Quality Functions
  - TRIM: Remove whitespace
  - UPPER: Convert to uppercase
  - LOWER: Convert to lowercase

## Tech Stack

- Frontend:
  - React
  - TanStack Query
  - Tailwind CSS
  - shadcn/ui components
  - TypeScript

- Backend:
  - Express.js
  - Drizzle ORM
  - In-memory storage

## Installation

1. Clone the repository:
```bash
git clone [your-repo-url]
cd google-sheets-clone
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## Usage

1. The application shows a spreadsheet interface similar to Google Sheets
2. Click on any cell to select it
3. Use the formula bar to enter values or formulas
4. For formulas, start with '=' followed by the function name and arguments
   - Example: `=SUM(A1,A2)` or `=AVERAGE(B1:B5)`
5. Use the toolbar buttons to format cells (bold, italic)

## Project Structure

```
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   └── spreadsheet/    # Spreadsheet components
│   │   ├── lib/                # Utility functions
│   │   └── pages/              # Page components
├── server/                     # Backend API
└── shared/                     # Shared types and schemas
```

## Development Guidelines

- Cell formulas are evaluated in real-time
- The application uses in-memory storage for data persistence
- The UI is responsive and works on different screen sizes

## License

MIT
