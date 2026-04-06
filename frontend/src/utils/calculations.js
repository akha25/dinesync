export const calculateBill = (items) => {
  const subtotal = items.reduce((sum, item) => sum + item.price, 0);
  const totalTax = items.reduce((sum, item) => sum + item.tax, 0);
  const serviceCharge = subtotal * 0.10;
  const grandTotal = subtotal + totalTax + serviceCharge;

  return { subtotal, totalTax, serviceCharge, grandTotal };
};
