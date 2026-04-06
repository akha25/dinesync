import React from 'react';

const BillSummary = ({ orders, onCheckout }) => {
  const { items, summary } = orders;

  if (!summary || items.length === 0) return (
    <div className="bill-section">
      <h3>Running Bill</h3>
      <p style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>No active orders.</p>
    </div>
  );

  return (
    <div className="bill-section">
      <h3>Running Bill</h3>
      <div style={{ maxHeight: '300px', overflowY: 'auto', marginTop: '1rem' }}>
        {items.map(order => (
          <div key={order._id} className="order-item">
            <div>
              <div>{order.item_name}</div>
              <span className={`badge ${order.category}`}>{order.category}</span>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div>₹{order.price.toFixed(2)}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Tax: ₹{order.tax.toFixed(2)}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="bill-summary">
        <div className="summary-row">
          <span>Subtotal</span>
          <span>₹{summary.subtotal.toFixed(2)}</span>
        </div>
        <div className="summary-row">
          <span>Taxes</span>
          <span>₹{summary.total_tax.toFixed(2)}</span>
        </div>
        <div className="summary-row">
          <span>Service Charge (10%)</span>
          <span>₹{summary.service_charge.toFixed(2)}</span>
        </div>
        <div className="summary-row total">
          <span>Grand Total</span>
          <span>₹{summary.grand_total.toFixed(2)}</span>
        </div>
        <button className="btn" style={{ width: '100%', marginTop: '1.5rem', background: '#10b981' }} onClick={onCheckout}>
          Checkout & Settle Bill
        </button>
      </div>
    </div>
  );
};

export default BillSummary;
