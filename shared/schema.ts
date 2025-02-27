import { pgTable, text, serial, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export type CellStyle = {
  bold?: boolean;
  italic?: boolean;
  fontSize?: number;
  color?: string;
};

export type CellData = {
  value: string;
  formula?: string;
  style?: CellStyle;
};

export type SpreadsheetData = {
  [key: string]: CellData;
};

// Define the spreadsheet table schema
export const spreadsheets = pgTable("spreadsheets", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  data: jsonb("data").$type<SpreadsheetData>().notNull().default({}),
});

export const insertSpreadsheetSchema = createInsertSchema(spreadsheets);

export type InsertSpreadsheet = z.infer<typeof insertSpreadsheetSchema>;
export type Spreadsheet = typeof spreadsheets.$inferSelect;