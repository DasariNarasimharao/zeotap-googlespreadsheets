import { useState } from "react";
import { Card } from "@/components/ui/card";
import Grid from "@/components/spreadsheet/Grid";
import Toolbar from "@/components/spreadsheet/Toolbar";
import FormulaBar from "@/components/spreadsheet/FormulaBar";
import type { CellData, SpreadsheetData } from "@shared/schema";

export default function Spreadsheet() {
  const [selectedCell, setSelectedCell] = useState<string | null>(null);
  const [data, setData] = useState<SpreadsheetData>({});

  const updateCell = (cellId: string, cellData: Partial<CellData>) => {
    setData(prev => ({
      ...prev,
      [cellId]: {
        ...prev[cellId],
        ...cellData,
      },
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Card className="mx-auto max-w-[1200px] my-8 p-4">
        <Toolbar 
          selectedCell={selectedCell}
          onStyleChange={(style) => {
            if (selectedCell) {
              updateCell(selectedCell, {
                style: {
                  ...data[selectedCell]?.style,
                  ...style
                }
              });
            }
          }}
        />
        <FormulaBar
          selectedCell={selectedCell}
          value={selectedCell ? data[selectedCell]?.formula || data[selectedCell]?.value : ''}
          onChange={(value, isFormula) => {
            if (selectedCell) {
              updateCell(selectedCell, {
                value: value,
                formula: isFormula ? value : undefined
              });
            }
          }}
        />
        <Grid
          data={data}
          selectedCell={selectedCell}
          onSelectCell={setSelectedCell}
          onUpdateCell={updateCell}
        />
      </Card>
    </div>
  );
}
