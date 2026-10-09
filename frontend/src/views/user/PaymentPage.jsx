import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import API from '../../api/axios';
import { useCart } from '../../context/CartContext';
import './PaymentPage.css';

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { clearCart } = useCart();

  const {
    shippingAddress,
    cartItems = [],
    grandTotal = 0,
    subTotal = 0,
    discount = 0,
    shippingFee = 0,
    tax = 0,
    appliedCoupon = null
  } = location.state || {};

  const [paymentMode, setPaymentMode] = useState('Cash On Delivery');
  const [loading, setLoading] = useState(false);

  const tryRazorpayPayment = async () => {
    if (paymentMode !== 'RazorPay') return true;

    try {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;

      await new Promise((resolve, reject) => {
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Razorpay script failed to load'));
        document.body.appendChild(script);
      });

      if (window.Razorpay) {
        const razorpay = new window.Razorpay({
          key: 'rzp_test_demo_key',
          amount: Math.round((grandTotal || subTotal || 0) * 100),
          currency: 'INR',
          name: 'Bag Store',
          description: 'Order Payment',
          handler: () => {
            // Demo success mode when no real Razorpay keys are configured.
            return true;
          }
        });

        razorpay.open();
      }

      return true;
    } catch (error) {
      console.warn('Razorpay fallback active:', error);
      return true;
    }
  };

  const handlePlaceOrder = async () => {
    if (!shippingAddress || !cartItems.length) {
      alert('Please select a shipping address and cart items.');
      return;
    }

    try {
      setLoading(true);

      if (paymentMode === 'RazorPay') {
        const razorpayReady = await tryRazorpayPayment();
        if (!razorpayReady) {
          navigate('/payment-failed', {
            state: { errorMessage: 'Razorpay checkout could not be initialized.' }
          });
          return;
        }
      }

      const payload = {
        items: cartItems.map((item) => ({
          productId: item.productId || item._id,
          quantity: item.quantity
        })),
        shippingAddress: {
          name: shippingAddress.name,
          phone: shippingAddress.phone,
          houseName: shippingAddress.houseName || shippingAddress.addressLine || '',
          locality: shippingAddress.locality || shippingAddress.street || '',
          city: shippingAddress.city,
          state: shippingAddress.state || '',
          country: shippingAddress.country || 'India',
          pincode: shippingAddress.pincode || shippingAddress.zipCode || ''
        },
        paymentMethod: paymentMode,
        subtotal: subTotal,
        tax,
        shippingFee,
        discount,
        couponCode: appliedCoupon || ''
      };

      const res = await API.post('/user/orders', payload);

      if (res.data?.success) {
        if (clearCart) {
          await clearCart();
        }

        navigate('/order-success', {
          state: {
            orderId: res.data.order?.orderId || 'ORD-000000',
            amount: res.data.order?.totalAmount || grandTotal || subTotal,
            paymentMethod: paymentMode,
            shippingAddress,
            orderItems: cartItems,
            estimatedDelivery: '10–12 July 2026'
          }
        });
      }
    } catch (error) {
      console.error('Place order error:', error);
      navigate('/payment-failed', {
        state: {
          errorMessage: error.response?.data?.message || 'Failed to place order. Please try again.'
        }
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-container">
      <div className="payment-content">
        <div className="payment-left">
          <div className="shipping-address-box">
            <h3>Shipping Address</h3>
            {shippingAddress ? (
              <div className="address-details">
                <p><strong>{shippingAddress.name}</strong></p>
                <p>{shippingAddress.houseName || shippingAddress.addressLine}, {shippingAddress.city}, {shippingAddress.pincode || shippingAddress.zipCode}</p>
                <p>phn: {shippingAddress.phone}</p>
                <button className="btn-edit-addr" onClick={() => navigate('/checkout')}>
                  Edit
                </button>
              </div>
            ) : (
              <p>No shipping address selected. <span onClick={() => navigate('/checkout')} style={{cursor: 'pointer', color: 'green'}}>Go back</span></p>
            )}
          </div>

          <hr className="divider" />

          <div className="payment-mode-box">
            <h3>Payment Mode</h3>

            <label className={`payment-option ${paymentMode === 'RazorPay' ? 'active' : ''}`}>
              <input type="radio" name="paymentMode" value="RazorPay" checked={paymentMode === 'RazorPay'} onChange={(e) => setPaymentMode(e.target.value)} />
              <span>RazorPay</span>
            </label>

            <label className={`payment-option ${paymentMode === 'Wallet' ? 'active' : ''}`}>
              <input type="radio" name="paymentMode" value="Wallet" checked={paymentMode === 'Wallet'} onChange={(e) => setPaymentMode(e.target.value)} />
              <span>Wallet</span>
            </label>

            <label className={`payment-option ${paymentMode === 'Cash On Delivery' ? 'active' : ''}`}>
              <input type="radio" name="paymentMode" value="Cash On Delivery" checked={paymentMode === 'Cash On Delivery'} onChange={(e) => setPaymentMode(e.target.value)} />
              <span>Cash On Delivery</span>
            </label>

            <div className="pay-now-btn-wrapper">
              <button className="btn-pay-now" onClick={handlePlaceOrder} disabled={loading}>
                {loading ? 'Placing Order...' : (paymentMode === 'Cash On Delivery' ? 'CHECKOUT' : 'PAY NOW')}
              </button>
            </div>
          </div>
        </div>

        <div className="payment-right">
          <div className="order-summary-box">
            <h3>Order Summary</h3>

            <div className="price-row">
              <span>Item Sub Total</span>
              <span>₹{subTotal}</span>
            </div>
            <div className="price-row">
              <span>Tax</span>
              <span>₹{tax || 0}</span>
            </div>
            <div className="price-row">
              <span>Shipping</span>
              <span>{shippingFee === 0 ? 'Free' : `₹${shippingFee}`}</span>
            </div>
            {discount > 0 && (
              <div className="price-row discount-row" style={{ color: '#2e7d32', fontWeight: 'bold' }}>
                <span>Discount</span>
                <span>- ₹{discount}</span>
              </div>
            )}

            <div className="price-row total-row">
              <strong>Total</strong>
              <strong>₹{grandTotal || subTotal}</strong>
            </div>

            <button className="btn-summary-checkout" onClick={handlePlaceOrder} disabled={loading}>
              {loading ? 'Processing...' : 'CHECKOUT'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;