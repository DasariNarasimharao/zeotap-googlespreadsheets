import type { SpreadsheetData } from "@shared/schema";

// Helper to get numeric value from cell
function getNumericValue(value: string): number {
  const num = parseFloat(value);
  if (isNaN(num)) throw new Error('Not a number');
  return num;
}

// Helper to get cell reference value
function getCellValue(ref: string, data: SpreadsheetData): string {
  if (!data[ref]) return '';
  if (data[ref].formula) {
    return evaluateFormula(data[ref].formula!, data);
  }
  return data[ref].value;
}

export function evaluateFormula(formula: string, data: SpreadsheetData): string {
  if (!formula.startsWith('=')) return formula;
  
  const withoutEquals = formula.substring(1).trim().toUpperCase();
  
  // Handle cell references
  if (/^[A-Z][0-9]+$/.test(withoutEquals)) {
    return getCellValue(withoutEquals, data);
  }

  // Parse function and arguments
  const match = withoutEquals.match(/^([A-Z]+)\((.*)\)$/);
  if (!match) throw new Error('Invalid formula');
  
  const [_, fn, args] = match;
  const argArray = args.split(',').map(arg => arg.trim());

  switch (fn) {
    case 'SUM': {
      let sum = 0;
      for (const arg of argArray) {
        sum += getNumericValue(getCellValue(arg, data));
      }
      return sum.toString();
    }
    
    case 'AVERAGE': {
      let sum = 0;
      let count = 0;
      for (const arg of argArray) {
        sum += getNumericValue(getCellValue(arg, data));
        count++;
      }
      return (sum / count).toString();
    }
    
    case 'MAX': {
      let max = -Infinity;
      for (const arg of argArray) {
        const val = getNumericValue(getCellValue(arg, data));
        max = Math.max(max, val);
      }
      return max.toString();
    }
    
    case 'MIN': {
      let min = Infinity;
      for (const arg of argArray) {
        const val = getNumericValue(getCellValue(arg, data));
        min = Math.min(min, val);
      }
      return min.toString();
    }
    
    case 'COUNT': {
      let count = 0;
      for (const arg of argArray) {
        const val = getCellValue(arg, data);
        if (!isNaN(parseFloat(val))) count++;
      }
      return count.toString();
    }
    
    case 'TRIM': {
      return getCellValue(argArray[0], data).trim();
    }
    
    case 'UPPER': {
      return getCellValue(argArray[0], data).toUpperCase();
    }
    
    case 'LOWER': {
      return getCellValue(argArray[0], data).toLowerCase();
    }
    
    default:
      throw new Error('Unknown function');
  }
}
