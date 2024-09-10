import React from 'react';
import PropTypes from 'prop-types';
import { Carousel } from 'react-bootstrap';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const ShowReviewsCarousel = ({ reviews }) => {
    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 !== 0;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

        return (
            <>
                {Array(fullStars).fill().map((_, i) => (
                    <FaStar key={`full-${i}`} color="#ffc107" />
                ))}
                {halfStar && <FaStarHalfAlt key="half" color="#ffc107" />}
                {Array(emptyStars).fill().map((_, i) => (
                    <FaRegStar key={`empty-${i}`} color="#ffc107" />
                ))}
            </>
        );
    };

    return (
        <Carousel className="shadow mb-5">
            {reviews && reviews.length > 0 ? (
                reviews.map(review => (
                    <Carousel.Item key={review._id}>
                        <div className="p-4 border rounded">
                            <h5>{review.name}</h5>
                            <div className="d-flex align-items-center mb-2">
                                {renderStars(review.rating)}
                            </div>
                            <p className="text-muted">{review.comment}</p>
                        </div>
                    </Carousel.Item>
                ))
            ) : (
                <p className="text-center">No reviews yet.</p>
            )}
        </Carousel>
    );
};

ShowReviewsCarousel.propTypes = {
    reviews: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        comment: PropTypes.string.isRequired
    })).isRequired
};

export default ShowReviewsCarousel;