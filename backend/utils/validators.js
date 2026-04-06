const validatePositivePrice = (price) => {
  if (price === undefined || price === null || price <= 0) {
    throw new Error('Price must be greater than zero.');
  }
  return true;
};

module.exports = { validatePositivePrice };
