import type { Spreadsheet, InsertSpreadsheet } from "@shared/schema";

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
    const newSpreadsheet = { ...spreadsheet, id };
    this.spreadsheets.set(id, newSpreadsheet);
    return newSpreadsheet;
  }

  async updateSpreadsheet(id: number, spreadsheet: Partial<InsertSpreadsheet>): Promise<Spreadsheet | undefined> {
    const existing = this.spreadsheets.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, ...spreadsheet };
    this.spreadsheets.set(id, updated);
    return updated;
  }
}

export const storage = new MemStorage();
