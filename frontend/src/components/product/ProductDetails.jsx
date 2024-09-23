import { useState, useEffect, Fragment } from "react";
import { Carousel, Button, Col, Container, Row, Modal, Form, Card, Badge } from 'react-bootstrap';
import { toast } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux';
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";
import { fetchProductDetails, addReview, clearErrors } from "../../slices/productSlice";
import { addToCart, fetchCart } from "../../slices/cartSlice";
import ShowReviewsCarousel from "./ShowReviewsCarousel";
import { useParams } from 'react-router-dom';
import { FaStar } from "react-icons/fa";

const ProductDetails = () => {
    const { id } = useParams();
    const [quantity, setQuantity] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [modalShow, setModalShow] = useState(false);

    const dispatch = useDispatch();

    const { loading, error, product } = useSelector(state => state.products);
    const { user } = useSelector(state => state.auth);
    const { error: reviewError, success: reviewSuccess } = useSelector(state => state.products);

    useEffect(() => {
        dispatch(fetchProductDetails(id));
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if (reviewError) {
            toast.error(reviewError);
            dispatch(clearErrors());
        }
        if (reviewSuccess) {
            toast.success("Review posted successfully!");
            dispatch(clearErrors());
        }
    }, [dispatch, error, reviewError, id, reviewSuccess]);

    const handleAddToCart = (e) => {
        e.preventDefault();
        // Pass the selected quantity to the addToCart action
        dispatch(addToCart({ productId: product._id, quantity }))
            .unwrap()  // Unwrap the result to handle it directly
            .then(() => {
                // Optionally re-fetch cart to ensure consistency
                dispatch(fetchCart());
                toast.success("Item added to cart");
            })
            .catch((error) => {
                toast.error("Failed to add item to cart");
            });
    };

    const increaseQty = () => {
        setQuantity(prev => (prev < product.countInStock ? prev + 1 : prev));
    };

    const decreaseQty = () => {
        setQuantity(prev => (prev > 1 ? prev - 1 : prev));
    };

    const reviewHandler = () => {
        const reviewData = {
            rating,
            comment,
            productId: id
        };
        dispatch(addReview(reviewData));
        setModalShow(false);
    };    

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={product.name} />
                    <Container className="mt-5">
                        <Row>
                            <Col md={5}>
                                <Carousel>
                                    {product.images && product.images.map((image, index) => (
                                        <Carousel.Item key={index}>
                                            <img
                                                className="d-block mx-auto"
                                                src={image}
                                                alt={product.name}
                                                height="400"
                                            />
                                        </Carousel.Item>
                                    ))}
                                </Carousel>
                            </Col>
                            <Col md={7}>
                                <h1>{product.name}</h1>
                                <div className="my-2">
                                    <div className="d-inline-block">
                                        <Badge bg="warning" text="dark" className="me-2">
                                            {product.rating} <FaStar />
                                        </Badge>
                                        <span>({product.numReviews} Reviews)</span>
                                    </div>
                                </div>

                                {/* Product Description */}
                                <Card className="mt-3">
                                    <Card.Body>
                                        <Card.Title>Description</Card.Title>
                                        <p>{product.description || "No description available."}</p>
                                    </Card.Body>
                                </Card>

                                <p className="text-success h4 mt-3">PKR {product.price}</p>
                                <div className="d-flex align-items-center mb-3">
                                    <Button variant="outline-danger" onClick={decreaseQty}>-</Button>
                                    <Form.Control
                                        type="number"
                                        className="mx-2 text-center"
                                        value={quantity}
                                        readOnly
                                        style={{ maxWidth: '60px' }}
                                    />
                                    <Button variant="outline-primary" onClick={increaseQty}>+</Button>
                                </div>
                                <Button
                                    variant="outline-success"
                                    className="mb-3"
                                    onClick={handleAddToCart}
                                    disabled={product.countInStock === 0}
                                >
                                    Add to Cart
                                </Button>
                                <p className={`mt-2 ${product.countInStock > 0 ? 'text-success' : 'text-danger'}`}>
                                    Status: {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                                </p>

                                <p>Sold by: <strong>{product.brand}</strong></p>
                                {user ? (
                                    <Button variant="primary" onClick={() => setModalShow(true)}>Submit Your Review</Button>
                                ) : (
                                    <div className="alert alert-danger mt-3">Login to post your review</div>
                                )}
                            </Col>
                        </Row>

                        {/* Specifications Section */}
                        <Row className="my-5">
                            <Col md={12}>
                                <Card className="shadow">
                                    <Card.Body>
                                        <Card.Title className="mb-3">Specifications</Card.Title>
                                        {product.specification ? (
                                            <Row>
                                                {product.specification.split(',').reduce((result, item, index) => {
                                                    const half = Math.ceil(product.specification.split(',').length / 2);
                                                    if (index < half) result[0].push(item.trim());
                                                    else result[1].push(item.trim());
                                                    return result;
                                                }, [[], []]).map((column, colIndex) => (
                                                    <Col key={colIndex} md={6}>
                                                        <ul>
                                                            {column.map((item, index) => (
                                                                <li key={index}>{item}</li>
                                                            ))}
                                                        </ul>
                                                    </Col>
                                                ))}
                                            </Row>
                                        ) : (
                                            <p>No specifications available.</p>
                                        )}
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>

                        <h3 className="text-center mb-3">Customer Reviews</h3>

                        {product.reviews && product.reviews.length > 0 && <ShowReviewsCarousel reviews={product.reviews} />}
                    </Container>

                    <Modal show={modalShow} onHide={() => setModalShow(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Submit Review</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="rating mb-3">
                                {[1, 2, 3, 4, 5].map(star => (
                                    <span
                                        key={star}
                                        style={{
                                            cursor: 'pointer',
                                            color: rating >= star ? '#ffcc00' : '#ccc',
                                            fontSize: '1.5rem'
                                        }}
                                        onClick={() => setRating(star)}
                                    >
                                        <FaStar />
                                    </span>
                                ))}
                            </div>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Write your review..."
                            />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setModalShow(false)}>Close</Button>
                            <Button variant="primary" onClick={reviewHandler}>Submit</Button>
                        </Modal.Footer>
                    </Modal>
                </Fragment>
            )}
        </Fragment>
    );
};

export default ProductDetails;