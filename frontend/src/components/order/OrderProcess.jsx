import { Fragment, useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';

import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";

import { fetchOrderDetails, processOrder, clearErrors } from "../../slices/orderSlice.js";
import { PROCESS_ORDER_RESET } from "../../constants/orderConstants.js";
import Sidebar from "../layout/Sidebar.jsx";
import { Container, Row, Col, Button, Form, Image, Card, ListGroup } from "react-bootstrap";

const OrderProcess = () => {
    const [status, setStatus] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const { loading, order = {}, error, isUpdated } = useSelector(state => state.orders);
    const { shippingInfo, orderItems = [], paymentInfo, user, totalPrice, orderStatus } = order;

    useEffect(() => {
        if (id) {
            dispatch(fetchOrderDetails(id));
        }

        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            toast.success("Order processed successfully!");
            dispatch({ type: PROCESS_ORDER_RESET });
            setStatus(orderStatus); // Update local state without re-fetching the details
        }
    }, [dispatch, error, isUpdated, id, orderStatus]);

    useEffect(() => {
        if (orderStatus) {
            setStatus(orderStatus); // Set dropdown status to the fetched order status
        }
    }, [orderStatus]);

    const processOrderHandler = () => {
        if (!status) {
            toast.error("Please select a status");
            return;
        }

        const orderData = {
            orderStatus: status,
        };
        dispatch(processOrder({ id, orderData }));
    };

    const shippingDetails = shippingInfo && `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`;
    const isPaid = paymentInfo && paymentInfo.status === "succeeded";

    return (
        <Fragment>
            <MetaData title={`Process Orders # ${order._id}`} />
            <Container fluid>
                <Row>
                    <Col md={2}>
                        <Sidebar />
                    </Col>

                    <Col md={10}>
                        {loading ? <Loader /> : (
                            <Fragment>
                                <Row className="justify-content-center mt-4">
                                    <Col lg={8}>
                                        <Card>
                                            <Card.Header className="bg-dark text-white">
                                                <h3 className="mb-0">Order #{order._id}</h3>
                                            </Card.Header>
                                            <Card.Body>
                                                <h4 className="text-dark mb-4">Shipping Info</h4>
                                                <ListGroup variant="flush">
                                                    <ListGroup.Item><strong>Name:</strong> {user?.name}</ListGroup.Item>
                                                    <ListGroup.Item><strong>Phone:</strong> {shippingInfo?.phone}</ListGroup.Item>
                                                    <ListGroup.Item><strong>Address:</strong> {shippingDetails}</ListGroup.Item>
                                                    <ListGroup.Item><strong>Amount:</strong> PKR {totalPrice}</ListGroup.Item>
                                                </ListGroup>

                                                <hr className="my-2" />

                                                <h4 className="text-dark mb-4">Payment Info</h4>
                                                <ListGroup variant="flush">
                                                    <ListGroup.Item className={isPaid ? "text-success" : "text-danger"}>
                                                        <strong>{isPaid ? "PAID" : "NOT PAID"}</strong>
                                                    </ListGroup.Item>
                                                    <ListGroup.Item><strong>Stripe ID:</strong> {paymentInfo?.id}</ListGroup.Item>
                                                </ListGroup>

                                                <hr className="my-2" />

                                                <h4 className="text-dark mb-4">Order Status</h4>
                                                <ListGroup variant="flush">
                                                    <ListGroup.Item className={status?.includes("Delivered") ? "text-success" : "text-danger"}>
                                                        <strong>{status}</strong>
                                                    </ListGroup.Item>
                                                </ListGroup>

                                                <hr className="my-2" />

                                                <h4 className="text-dark mb-4">Order Items</h4>
                                                {orderItems.map(item => (
                                                    <ListGroup.Item key={item.product._id} className="d-flex justify-content-between align-items-center">
                                                        <Image src={item.product?.images[0]} alt={item.product?.name} width="60" height="60" fluid />
                                                        <Link to={`/product/${item.product._id}`} className="text-dark text-decoration-none">{item.product?.name}</Link>
                                                        <span>PKR {item.price} x {item.quantity} = PKR {(item.price * item.quantity).toFixed(2)}</span>
                                                    </ListGroup.Item>
                                                ))}
                                            </Card.Body>
                                        </Card>
                                    </Col>

                                    <Col lg={4} className="mt-4">
                                        <Card>
                                            <Card.Header>
                                                <h4 className="mb-0">Update Status</h4>
                                            </Card.Header>
                                            <Card.Body>
                                                <Form.Group controlId="orderStatus">
                                                    <Form.Label>Status</Form.Label>
                                                    <Form.Control as="select" value={status} onChange={(e) => setStatus(e.target.value)}>
                                                        <option value="Processing">Processing</option>
                                                        <option value="Shipped">Shipped</option>
                                                        <option value="Delivered">Delivered</option>
                                                    </Form.Control>
                                                </Form.Group>
                                                <Button
                                                    variant="success"
                                                    className="mt-3 w-100"
                                                    onClick={processOrderHandler}
                                                >
                                                    Update Status
                                                </Button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                            </Fragment>
                        )}
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};

export default OrderProcess;