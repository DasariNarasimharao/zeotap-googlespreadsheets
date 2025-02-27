import { Input } from "@/components/ui/input";

interface FormulaBarProps {
  selectedCell: string | null;
  value: string;
  onChange: (value: string, isFormula: boolean) => void;
}

export default function FormulaBar({ selectedCell, value, onChange }: FormulaBarProps) {
  return (
    <div className="flex items-center gap-2 p-2 border-b">
      <div className="w-20 text-sm font-medium">
        {selectedCell || ''}
      </div>
      <div className="flex-1">
        <Input
          value={value}
          onChange={(e) => {
            const val = e.target.value;
            onChange(val, val.startsWith('='));
          }}
          placeholder="Enter value or formula (start with =)"
          disabled={!selectedCell}
        />
      </div>
    </div>
  );
}
