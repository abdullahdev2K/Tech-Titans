import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviews } from '../../slices/productSlice.js';
import { Container, Spinner, Alert, Table, Row, Col, Card } from 'react-bootstrap';

const ReviewsGetAll = () => {
    const dispatch = useDispatch();
    const { reviews, loading, error } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchReviews());
    }, [dispatch]);

    return (
        <Container className="mt-5">
            <Row>
                <Col>
                    <h2 className="text-center mb-4">All Product Reviews</h2>
                    {loading && (
                        <div className="text-center">
                            <Spinner animation="border" variant="primary" />
                        </div>
                    )}
                    {error && <Alert variant="danger">{error}</Alert>}
                    {!loading && !error && reviews.length > 0 && (
                        <Card className="shadow-lg mb-5">
                            <Card.Body>
                                <Table responsive bordered hover className="text-center">
                                    <thead className="table-dark">
                                        <tr>
                                            <th>Product</th>
                                            <th>Reviewer</th>
                                            <th>Rating</th>
                                            <th>Comment</th>
                                            <th>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {reviews.map((review) => (
                                            <tr key={review._id}>
                                                <td>{review.productName}</td>
                                                <td>{review.name}</td>
                                                <td>
                                                    <span className="text-warning">
                                                        {'★'.repeat(review.rating)}
                                                    </span>
                                                </td>
                                                <td>{review.comment}</td>
                                                <td>{new Date(review.createdAt).toLocaleDateString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    )}
                    {!loading && !error && reviews.length === 0 && (
                        <Alert variant="info" className="text-center mt-4">
                            No reviews available
                        </Alert>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default ReviewsGetAll;