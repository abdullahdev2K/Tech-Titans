import { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Row, Col, Button, Image, Container, Card, ListGroup } from "react-bootstrap";
import MetaData from "../layout/MetaData";
import { useSelector } from "react-redux";
import CheckoutSteps from './CheckoutSteps';

const ConfirmOrder = () => {
    const navigate = useNavigate();
    const { items, shippingInfo = {} } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.auth);

    // Calculate Order Prices
    const itemsPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shippingPrice = 100;
    const taxPrice = Number((0.05 * itemsPrice).toFixed(2));
    const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2);

    const processToPayment = () => {
        const data = {
            itemsPrice: itemsPrice.toFixed(2),
            shippingPrice,
            taxPrice,
            totalPrice,
        };
        sessionStorage.setItem('orderInfo', JSON.stringify(data));
        navigate('/payment');
    };

    return (
        <Fragment>
            <MetaData title="Confirm Order" />
            <CheckoutSteps shipping confirmOrder />
            <Container>
                <Row className="justify-content-between mt-4">
                    <Col md={8}>
                        <Card>
                            <Card.Body>
                                <h4 className="mb-3 text-center">Shipping Info</h4>
                                <p><b>Name: </b>{user && user.name}</p>
                                <p><b>Phone: </b>{shippingInfo.phone}</p>
                                <p className="mb-4"><b>Address: </b>{`${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`}</p>
                                <hr />
                                <h4>Your Cart Items:</h4>
                                {items.map((item) => (
                                    <Fragment key={item.product._id}>
                                        <hr />
                                        <Row className="align-items-center">
                                            <Col xs={4} md={2}>
                                                <Image src={item.product.images[0]} alt={item.product.name} fluid rounded />
                                            </Col>
                                            <Col xs={5}>
                                                <Link to={`/product/${item.product._id}`} className="text-decoration-none text-black">{item.product.name}</Link>
                                            </Col>
                                            <Col xs={3} md={5}>
                                                <p>{item.quantity} x PKR {item.price.toFixed(2)} = <b>PKR {(item.quantity * item.price).toFixed(2)}</b></p>
                                            </Col>
                                        </Row>
                                    </Fragment>
                                ))}
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="my-4">
                            <Card.Body>
                                <h4>Order Summary</h4>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>Subtotal: <span>PKR {itemsPrice.toFixed(2)}</span></ListGroup.Item>
                                    <ListGroup.Item>Shipping: <span>PKR {shippingPrice.toFixed(2)}</span></ListGroup.Item>
                                    <ListGroup.Item>Tax: <span>PKR {taxPrice.toFixed(2)}</span></ListGroup.Item>
                                    <ListGroup.Item>Total: <span>PKR {totalPrice}</span></ListGroup.Item>
                                </ListGroup>
                                <Button variant="primary" block onClick={processToPayment}>
                                    Proceed to Payment
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};

export default ConfirmOrder;