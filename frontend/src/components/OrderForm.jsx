import React, { useState } from 'react';

const OrderForm = ({ onAddFood }) => {
  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState('Food');
  const [price, setPrice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (price <= 0) return alert("Price must be greater than zero");
    await onAddFood({ item_name: itemName, category, price: Number(price) });
    setItemName('');
    setPrice('');
  };

  return (
    <div>
      <h3>Quick Order</h3>
      <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
        <div className="form-group">
          <label>Item Name</label>
          <input required value={itemName} onChange={e => setItemName(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Category</label>
          <select value={category} onChange={e => setCategory(e.target.value)}>
            <option value="Food">Food (5% GST)</option>
            <option value="Beverage">Beverage (18% GST)</option>
          </select>
        </div>
        <div className="form-group">
          <label>Price (₹)</label>
          <input type="number" required min="1" value={price} onChange={e => setPrice(e.target.value)} />
        </div>
        <button type="submit" className="btn" style={{ width: '100%' }}>Add Item</button>
      </form>
    </div>
  );
};

export default OrderForm;
