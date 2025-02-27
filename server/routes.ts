import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { insertSpreadsheetSchema } from "@shared/schema";

export async function registerRoutes(app: Express) {
  const httpServer = createServer(app);

  app.get("/api/spreadsheets/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const spreadsheet = await storage.getSpreadsheet(id);
    if (!spreadsheet) {
      res.status(404).json({ message: "Spreadsheet not found" });
      return;
    }
    res.json(spreadsheet);
  });

  app.post("/api/spreadsheets", async (req, res) => {
    const parsed = insertSpreadsheetSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ message: "Invalid spreadsheet data" });
      return;
    }
    const spreadsheet = await storage.createSpreadsheet(parsed.data);
    res.json(spreadsheet);
  });

  app.patch("/api/spreadsheets/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const parsed = insertSpreadsheetSchema.partial().safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ message: "Invalid spreadsheet data" });
      return;
    }
    const spreadsheet = await storage.updateSpreadsheet(id, parsed.data);
    if (!spreadsheet) {
      res.status(404).json({ message: "Spreadsheet not found" });
      return;
    }
    res.json(spreadsheet);
  });

  return httpServer;
}
