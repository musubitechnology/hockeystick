export const generateBlankCSV = (): string => {
  const headers = ['Model', 'Curve', 'Hand', 'Flex', 'Weight (g)', 'QTY', 'PRICE'];
  return headers.join('\t');
};

export const downloadBlankCSV = () => {
  const content = generateBlankCSV();
  const blob = new Blob([content], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'inventory_template.csv';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};