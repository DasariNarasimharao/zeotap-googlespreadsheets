import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { 
  Bold, 
  Italic,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from "lucide-react";
import type { CellStyle } from "@shared/schema";

interface ToolbarProps {
  selectedCell: string | null;
  onStyleChange: (style: Partial<CellStyle>) => void;
}

export default function Toolbar({ selectedCell, onStyleChange }: ToolbarProps) {
  return (
    <div className="flex items-center gap-2 p-2 border-b">
      <Toggle
        disabled={!selectedCell}
        onPressedChange={(pressed) => onStyleChange({ bold: pressed })}
      >
        <Bold className="h-4 w-4" />
      </Toggle>
      
      <Toggle
        disabled={!selectedCell}
        onPressedChange={(pressed) => onStyleChange({ italic: pressed })}
      >
        <Italic className="h-4 w-4" />
      </Toggle>

      <div className="h-6 w-px bg-border mx-2" />
      
      <Button
        variant="ghost"
        size="sm"
        disabled={!selectedCell}
      >
        <AlignLeft className="h-4 w-4" />
      </Button>
      
      <Button
        variant="ghost"
        size="sm"
        disabled={!selectedCell}
      >
        <AlignCenter className="h-4 w-4" />
      </Button>
      
      <Button
        variant="ghost"
        size="sm"
        disabled={!selectedCell}
      >
        <AlignRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
