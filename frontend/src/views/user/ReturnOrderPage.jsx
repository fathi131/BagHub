import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './ReturnOrderPage.css';

const ReturnOrderPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reason, setReason] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!reason.trim()) {
      alert('Please enter a reason for return');
      return;
    }
    // Return request logic code link
    console.log('Return request submitted for order:', id, 'Reason:', reason);
    alert('Return request submitted successfully!');
    navigate(`/view-return-order/${id}`);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="return-container">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        My Account &gt; Order &gt; <span>Return Order</span>
      </div>

      {/* Main Card */}
      <div className="return-card">
        <h2 className="return-title">Return Order</h2>

        <form onSubmit={handleSubmit} className="return-form">
          <label className="reason-label">Reason For Return</label>
          <textarea
            className="reason-textarea"
            rows="6"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          ></textarea>

          <div className="action-buttons">
            <button type="submit" className="btn-submit">
              Return
            </button>
            <button type="button" className="btn-cancel" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReturnOrderPage;