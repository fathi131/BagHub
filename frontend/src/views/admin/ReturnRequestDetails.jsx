import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ReturnRequestDetails.css';

const ReturnRequestDetails = () => {
  const { requestId } = useParams();
  const navigate = useNavigate();

  // Return Request State
  const [returnDetails, setReturnDetails] = useState({
    customerName: 'Fathima',
    mobileNumber: '9895866277',
    typeOfPayment: 'COD',
    address: 'Kollam 691301',
    returnReason: 'Damaged Product',
    customerComment: 'The zip was broken',
    requestDate: '14 Jul 2026',
    requestStatus: 'Pending'
  });

  const [loading, setLoading] = useState(false);

  // Backend API-ൽ നിന്ന് Request Details എടുക്കാൻ (വേണമെങ്കിൽ ഉപയോഗിക്കാം)
  /*
  useEffect(() => {
    const fetchReturnDetails = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const res = await axios.get(`http://localhost:5000/api/admin/returns/${requestId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setReturnDetails(res.data);
      } catch (err) {
        console.error('Error fetching return details:', err);
      }
    };
    fetchReturnDetails();
  }, [requestId]);
  */

  // Status Change Handle ചെയ്യാനുള്ള ഫംഗ്ഷൻ (Approve / Reject)
  const handleStatusUpdate = async (newStatus) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');

      // Backend API Call
      await axios.patch(
        `http://localhost:5000/api/admin/returns/${requestId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setReturnDetails((prev) => ({ ...prev, requestStatus: newStatus }));
      alert(`Return Request ${newStatus} Successfully!`);
    } catch (err) {
      // API സെറ്റ് ചെയ്തിട്ടില്ലെങ്കിൽ UI-ൽ മാറ്റം വരുത്താൻ:
      setReturnDetails((prev) => ({ ...prev, requestStatus: newStatus }));
      alert(`Status updated to ${newStatus}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="return-details-container">
      <h1 className="page-title">Return Request Details</h1>

      <div className="return-details-grid">
        {/* Left Column: Customer Details */}
        <div className="details-card">
          <div className="card-header-banner">Customer Details</div>

          <div className="info-group">
            <div className="info-row">
              <span className="info-label">Customer Name</span>
              <span className="info-value">{returnDetails.customerName}</span>
            </div>
            <hr className="divider" />

            <div className="info-row">
              <span className="info-label">Mobile Number</span>
              <span className="info-value">{returnDetails.mobileNumber}</span>
            </div>
            <hr className="divider" />

            <div className="info-row">
              <span className="info-label">Type of payment</span>
              <span className="info-value">{returnDetails.typeOfPayment}</span>
            </div>
            <hr className="divider" />

            <div className="info-row">
              <span className="info-label">Address</span>
              <span className="info-value address-value">{returnDetails.address}</span>
            </div>
            <hr className="divider" />
          </div>
        </div>

        {/* Right Column: Return Request Details */}
        <div className="details-card">
          <div className="card-header-banner">Return Request</div>

          <div className="info-group right-group">
            <p>
              <strong>Return Reason :</strong> {returnDetails.returnReason}
            </p>
            <p>
              <strong>Customer Comment :</strong> {returnDetails.customerComment}
            </p>
            <p>
              <strong>Request Date :</strong> {returnDetails.requestDate}
            </p>
            <p>
              <strong>Request Status :</strong>{' '}
              <span className={`status-text ${returnDetails.requestStatus.toLowerCase()}`}>
                {returnDetails.requestStatus}
              </span>
            </p>

            {/* Action Buttons */}
            <div className="action-buttons">
              <button
                className="btn-reject"
                onClick={() => handleStatusUpdate('Rejected')}
                disabled={loading || returnDetails.requestStatus !== 'Pending'}
              >
                Reject
              </button>
              <button
                className="btn-approve"
                onClick={() => handleStatusUpdate('Approved')}
                disabled={loading || returnDetails.requestStatus !== 'Pending'}
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnRequestDetails;