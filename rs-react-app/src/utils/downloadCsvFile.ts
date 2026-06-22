import { SELECTED_ITEMS_CSV } from '../constants';

export function downloadCsvFile(csv: string, filename: string): void {
  const blob = new Blob([csv], { type: SELECTED_ITEMS_CSV.mimeType });
  const objectUrl = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = objectUrl;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(objectUrl);
}
