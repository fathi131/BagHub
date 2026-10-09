import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './WriteReviewPage.css';

const WriteReviewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [rating, setRating] = useState(1);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');

  
  const product = {
    name: 'Embroidered-motif twill',
    image: 'https://via.placeholder.com/150'
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      alert('Please enter your comment');
      return;
    }
    console.log({ productId: id, rating, comment });
    alert('Review submitted successfully!');
    navigate(-1);
  };

  return (
    <div className="review-container">
      {/* Outer Border Box */}
      <div className="review-card">
        <h2 className="review-main-title">Product Reviews</h2>

        <div className="review-body">
          {/* Left Column: Product Image & Name */}
          <div className="review-left-section">
            <div className="product-image-box">
              <img src={product.image} alt={product.name} />
            </div>
            <p className="product-title">{product.name}</p>
          </div>

          {/* Right Column: Rating & Comment Form */}
          <div className="review-right-section">
            <h3 className="section-subtitle">Leave a Review</h3>

            <form onSubmit={handleSubmit} className="review-form">
              {/* Interactive Star Rating */}
              <div className="star-rating">
                {[...Array(5)].map((_, index) => {
                  const starValue = index + 1;
                  return (
                    <span
                      key={index}
                      className={`star ${starValue <= (hover || rating) ? 'filled' : ''}`}
                      onClick={() => setRating(starValue)}
                      onMouseEnter={() => setHover(starValue)}
                      onMouseLeave={() => setHover(0)}
                    >
                      ★
                    </span>
                  );
                })}
              </div>

              {/* Comment Textarea */}
              <textarea
                className="comment-box"
                placeholder="enter your comment here"
                rows="4"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>

              <div className="button-container">
                <button type="submit" className="btn-back">
                  back
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WriteReviewPage;