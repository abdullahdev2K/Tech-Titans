import React from 'react';
import PropTypes from 'prop-types';

const ShowReviews = ({ reviews }) => {
    return (
        <div className="reviews w-75">
            <h3 className="purple cart2">Product Reviews:</h3>
            <hr />
            {reviews && reviews.length > 0 ? (
                reviews.map(review => (
                    <div key={review._id} className="cart2 box-cart my-1">
                        <div className="rating-outer">
                            <div className="rating-inner"
                                style={{ width: `${(review.rating / 5) * 100}%` }}>
                            </div>
                        </div>
                        &nbsp;({review.rating} Stars)
                        <p className="review_user">by {review.name} </p>
                        <p className="review_comment">{review.comment}</p>
                        <hr />
                    </div>
                ))
            ) : (
                <p>No reviews yet.</p>
            )}
        </div>
    );
}

ShowReviews.propTypes = {
    reviews: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        comment: PropTypes.string.isRequired
    })).isRequired
};

export default ShowReviews;