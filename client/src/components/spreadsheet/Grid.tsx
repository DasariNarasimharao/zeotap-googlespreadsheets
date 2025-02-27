import React, { useState, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Cell } from "./Cell";
import type { SpreadsheetData, CellData } from "@shared/schema";
import { evaluateFormula } from "@/lib/formulas";

interface GridProps {
  data: SpreadsheetData;
  selectedCell: string | null;
  onSelectCell: (cell: string | null) => void;
  onUpdateCell: (cell: string, data: Partial<CellData>) => void;
}

const COLS = 26; // A-Z
const ROWS = 100;

export default function Grid({ data, selectedCell, onSelectCell, onUpdateCell }: GridProps) {
  const [dragStart, setDragStart] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const getCellId = (row: number, col: number) => {
    const colLetter = String.fromCharCode(65 + col);
    return `${colLetter}${row + 1}`;
  };

  const getCellValue = (cellId: string) => {
    const cell = data[cellId];
    if (!cell) return '';
    if (cell.formula) {
      try {
        return evaluateFormula(cell.formula, data);
      } catch (e) {
        return '#ERROR!';
      }
    }
    return cell.value;
  };

  return (
    <ScrollArea className="h-[600px] border rounded-md">
      <div 
        ref={gridRef}
        className="grid"
        style={{
          gridTemplateColumns: `40px repeat(${COLS}, 120px)`,
          gridTemplateRows: `40px repeat(${ROWS}, 30px)`
        }}
      >
        {/* Column headers */}
        <div className="bg-muted" key="corner" />
        {Array.from({ length: COLS }).map((_, i) => (
          <div 
            key={`col-${i}`}
            className="bg-muted flex items-center justify-center border-b border-r font-medium"
          >
            {String.fromCharCode(65 + i)}
          </div>
        ))}

        {/* Row headers and cells */}
        {Array.from({ length: ROWS }).map((_, row) => (
          <React.Fragment key={`row-${row}`}>
            <div 
              className="bg-muted flex items-center justify-center border-r font-medium"
            >
              {row + 1}
            </div>
            {Array.from({ length: COLS }).map((_, col) => {
              const cellId = getCellId(row, col);
              const cell = data[cellId];
              const isSelected = cellId === selectedCell;

              return (
                <Cell
                  key={cellId}
                  id={cellId}
                  value={getCellValue(cellId)}
                  style={cell?.style}
                  formula={cell?.formula}
                  isSelected={isSelected}
                  onSelect={() => onSelectCell(cellId)}
                  onChange={(value) => onUpdateCell(cellId, {
                    value,
                    formula: value.startsWith('=') ? value : undefined
                  })}
                />
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </ScrollArea>
  );
}