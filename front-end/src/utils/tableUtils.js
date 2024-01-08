export const addRow = (rows, newRowData) => {
  return [...rows, newRowData];
};

export const deleteRow = (rows, rowIndex) => {
  return rows.filter((_, index) => index !== rowIndex);
};

export const updateRow = (rows, rowIndex, updatedRowData) => {
  return rows.map((row, index) => (index === rowIndex ? updatedRowData : row));
};
