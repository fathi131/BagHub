import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './CancelConfirmationPage.css';

const CancelConfirmationPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleCancelConfirm = () => {
    // 💡 ഇവിടെ ബാക്കെൻഡിലേക്ക് ഓർഡർ ക്യാൻസൽ ചെയ്യാനുള്ള API Request അയക്കാം
    alert('Order cancelled successfully!');
    navigate('/my-orders');
  };

  return (
    <div className="cancel-confirm-container">
      <div className="cancel-confirm-card">
        <h2 className="cancel-title">Cancel Order?</h2>
        <p className="cancel-text">Are you sure you want<br />to cancel this order?</p>

        <div className="cancel-btn-group">
          <button 
            className="btn-cancel-action" 
            onClick={() => navigate(-1)}
          >
            No
          </button>
          <button 
            className="btn-cancel-action" 
            onClick={handleCancelConfirm}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelConfirmationPage;