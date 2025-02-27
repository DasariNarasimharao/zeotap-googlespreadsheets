import type { Spreadsheet, InsertSpreadsheet, SpreadsheetData } from "@shared/schema";

export interface IStorage {
  getSpreadsheet(id: number): Promise<Spreadsheet | undefined>;
  createSpreadsheet(spreadsheet: InsertSpreadsheet): Promise<Spreadsheet>;
  updateSpreadsheet(id: number, spreadsheet: Partial<InsertSpreadsheet>): Promise<Spreadsheet | undefined>;
}

export class MemStorage implements IStorage {
  private spreadsheets: Map<number, Spreadsheet>;
  private currentId: number;

  constructor() {
    this.spreadsheets = new Map();
    this.currentId = 1;
  }

  async getSpreadsheet(id: number): Promise<Spreadsheet | undefined> {
    return this.spreadsheets.get(id);
  }

  async createSpreadsheet(spreadsheet: InsertSpreadsheet): Promise<Spreadsheet> {
    const id = this.currentId++;
    const newSpreadsheet: Spreadsheet = {
      id,
      name: spreadsheet.name,
      data: spreadsheet.data || {}
    };
    this.spreadsheets.set(id, newSpreadsheet);
    return newSpreadsheet;
  }

  async updateSpreadsheet(id: number, spreadsheet: Partial<InsertSpreadsheet>): Promise<Spreadsheet | undefined> {
    const existing = this.spreadsheets.get(id);
    if (!existing) return undefined;

    const updated: Spreadsheet = {
      ...existing,
      name: spreadsheet.name || existing.name,
      data: spreadsheet.data || existing.data
    };
    this.spreadsheets.set(id, updated);
    return updated;
  }
}

export const storage = new MemStorage();