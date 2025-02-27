import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import type { Cell as CellType } from '@shared/schema';

interface CellProps {
  id: string;
  value: string;
  format?: CellType['format'];
  formula?: string;
  isSelected: boolean;
  onSelect: () => void;
  onChange: (value: string) => void;
}

export function Cell({ id, value, format, formula, isSelected, onSelect, onChange }: CellProps) {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing]);

  const handleDoubleClick = () => {
    setEditing(true);
  };

  const handleBlur = () => {
    setEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setEditing(false);
      onChange(e.currentTarget.value);
    }
  };

  return (
    <div
      className={cn(
        'h-8 border-b border-r relative',
        isSelected && 'outline outline-2 outline-blue-500 z-10',
        format?.bold && 'font-bold',
        format?.italic && 'italic'
      )}
      onClick={onSelect}
      onDoubleClick={handleDoubleClick}
    >
      {editing ? (
        <input
          ref={inputRef}
          className="absolute inset-0 w-full h-full px-2"
          defaultValue={formula || value}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <div className="px-2 py-1 overflow-hidden text-ellipsis whitespace-nowrap">
          {value}
        </div>
      )}
    </div>
  );
}
