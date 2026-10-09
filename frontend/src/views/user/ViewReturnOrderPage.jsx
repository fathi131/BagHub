import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ViewReturnOrderPage.css';

const ViewReturnOrderPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    // Figma ഡിസൈനിൽ നിന്നുള്ള mock ഡാറ്റ[cite: 6]
    const mockOrderData = {
      orderId: id || '#76806',
      orderDate: 'July 15, 2024',
      status: 'Delivered',
      shippingAddress: {
        name: 'Fathima S',
        building: 'Vaniyakkudi',
        street: 'Kongal',
        cityStatePin: 'Paravur Kollam 691301',
        country: 'India'
      },
      paymentMethod: 'Cash On Delivery (COD)',
      summary: {
        totalItems: 2,
        subtotal: 1697,
        shipping: 'Free',
        total: 1697
      },
      items: [
        {
          id: 1,
          name: 'Embroidered-motif twill',
          image: 'https://via.placeholder.com/100',
          qty: 2,
          price: 1198,
          deliveryStatus: 'Delivered on Aug 15',
          statusType: 'delivered',
          isReturnable: true
        },
        {
          id: 2,
          name: 'NewYork fr2',
          image: 'https://via.placeholder.com/100',
          qty: 1,
          price: 499,
          deliveryStatus: 'Returned on Sep 10',
          statusSubtext: 'Your order has returned',
          statusType: 'returned',
          isReturnable: false
        }
      ]
    };

    setOrder(mockOrderData);
  }, [id]);

  if (!order) return <div className="loading-text">Loading return order details...</div>;

  return (
    <div className="return-order-container">
      {/* Breadcrumb Navigation */}
      <div className="breadcrumb">
        My Account &gt; Order &gt; <span>Order details</span>
      </div>

      {/* Main Outer Box */}
      <div className="return-order-card">
        {/* Left Pane: Shipping & Order Summary */}
        <div className="return-left-pane">
          <div className="info-block">
            <p className="order-number">Order {order.orderId}</p>
            <p className="sub-text">Date: {order.orderDate}</p>
            <p className="sub-text">Status : <span className="status-delivered">{order.status}</span></p>
          </div>

          <div className="info-block">
            <h4>Shipping Address</h4>
            <p>{order.shippingAddress.name}</p>
            <p>{order.shippingAddress.building}</p>
            <p>{order.shippingAddress.street}</p>
            <p>{order.shippingAddress.cityStatePin}</p>
            <p>{order.shippingAddress.country}</p>
          </div>

          <div className="info-block">
            <h4>Payment Method</h4>
            <p>{order.paymentMethod}</p>
          </div>

          <div className="info-block summary-block">
            <h4>Order Summary</h4>
            <div className="summary-row">
              <span>Total Items :</span>
              <span>{order.summary.totalItems}</span>
            </div>
            <div className="summary-row">
              <span>Subtotal :</span>
              <span>₹ {order.summary.subtotal}</span>
            </div>
            <div className="summary-row">
              <span>Shipping :</span>
              <span>{order.summary.shipping}</span>
            </div>
            <div className="summary-row total-row">
              <span>Total :</span>
              <span>₹ {order.summary.total}</span>
            </div>
          </div>
        </div>

        {/* Right Pane: Items Details & Action Buttons */}
        <div className="return-right-pane">
          <h2 className="header-title">Order Details</h2>

          <div className="items-list">
            {order.items.map((item) => (
              <div className="item-card" key={item.id}>
                <div className="item-img-container">
                  <img src={item.image} alt={item.name} />
                </div>

                <div className="item-info">
                  <h4 className="item-name">{item.name}</h4>
                  <div className="item-meta">
                    <span>Qty:{item.qty}</span>
                    <span>₹ {item.price}</span>
                  </div>
                </div>

                <div className="item-status-actions">
                  {item.statusType === 'delivered' && (
                    <>
                      <div className="status-badge green-badge">
                        <span className="dot"></span>
                        <span>{item.deliveryStatus}</span>
                      </div>
                      <div className="button-group">
                        <button 
                          className="btn-pill-red" 
                          onClick={() => navigate(`/write-review/${item.id}`)}
                        >
                          write review
                        </button>
                        <button 
                          className="btn-pill-red" 
                          onClick={() => navigate(`/return-order/${order.orderId}?itemId=${item.id}`)}
                        >
                          Return
                        </button>
                      </div>
                    </>
                  )}

                  {item.statusType === 'returned' && (
                    <>
                      <div className="status-badge green-badge">
                        <span className="dot"></span>
                        <span>{item.deliveryStatus}</span>
                      </div>
                      <p className="return-subtext">{item.statusSubtext}</p>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewReturnOrderPage;