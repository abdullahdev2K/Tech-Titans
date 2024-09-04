import { useState, useEffect, Fragment } from "react";
import { Carousel, Button, Col, Container, Row, Modal, Form } from 'react-bootstrap';
import { toast } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux';
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";
import { fetchProductDetails, addReview, clearErrors } from "../../slices/productSlice";
import { addItemToCart } from "../../slices/cartSlice";
import ShowReviews from "./ShowReviews";
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
    const { id } = useParams(); // Get the product ID from the URL
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

    const addToCart = () => {
        dispatch(addItemToCart({ id, quantity }));
        toast.success("Item added to cart");
    };

    const increaseQty = () => {
        setQuantity(prev => (prev < product.countInStock ? prev + 1 : prev));
    };

    const decreaseQty = () => {
        setQuantity(prev => (prev > 1 ? prev - 1 : prev));
    };

    const reviewHandler = () => {
        const formData = new FormData();
        formData.set("rating", rating);
        formData.set("comment", comment);
        formData.set("productId", id);
        dispatch(addReview(formData));
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
                                        <div className="rating-outer">
                                            <div className="rating-inner" style={{ width: `${(product.rating / 5) * 100}%` }}></div>
                                        </div>
                                        <span>({product.numReviews} Reviews)</span>
                                    </div>
                                </div>
                                <p>PKR {product.price}</p>
                                <div className="d-flex align-items-center">
                                    <Button variant="danger" onClick={decreaseQty}>-</Button>
                                    <Form.Control
                                        type="number"
                                        className="mx-2 text-center"
                                        value={quantity}
                                        readOnly
                                        style={{ maxWidth: '60px' }}
                                    />
                                    <Button variant="primary" onClick={increaseQty}>+</Button>
                                </div>
                                <Button
                                    variant="success"
                                    className="mt-3"
                                    onClick={addToCart}
                                    disabled={product.countInStock === 0}
                                >
                                    Add to Cart
                                </Button>
                                <p className={`mt-2 ${product.countInStock > 0 ? 'text-success' : 'text-danger'}`}>
                                    Status: {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                                </p>
                                <h4 className="mt-3">Description:</h4>
                                <p>{product.description}</p>
                                <p>Sold by: <strong>{product.brand}</strong></p>
                                {user ? (
                                    <Button variant="primary" onClick={() => setModalShow(true)}>Submit Your Review</Button>
                                ) : (
                                    <div className="alert alert-danger mt-3">Login to post your review</div>
                                )}
                            </Col>
                        </Row>
                        {product.reviews && product.reviews.length > 0 && <ShowReviews reviews={product.reviews} />}
                    </Container>
                    <Modal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Submit Review</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="rating mb-3">
                                {[1, 2, 3, 4, 5].map(star => (
                                    <span
                                        key={star}
                                        className={`star ${rating >= star ? 'orange' : ''}`}
                                        onClick={() => setRating(star)}
                                    >
                                        <i className="fa fa-star"></i>
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