export const calculateTotals = (lines) => {
  const subtotal = lines.reduce(
    (acc, line) =>
      acc +
      Number(line.quantity || 0) *
        Number(line.unitPrice || 0),
    0
  );

  const tax = subtotal * 0.18;

  return {
    subtotal,
    tax,
    grandTotal: subtotal + tax
  };
};
