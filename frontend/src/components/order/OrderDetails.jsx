import { Fragment, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Container, Row, Col, Card, Image, Button } from "react-bootstrap";
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";
import { fetchOrderDetails, clearErrors } from "../../slices/orderSlice.js";

const OrderDetails = () => {
    const { id } = useParams(); 
    const dispatch = useDispatch();
    const { loading, error, order = {} } = useSelector((state) => state.orders);
    const { shippingInfo, orderItems, paymentInfo, user, totalPrice, orderStatus } = order;

    const shippingDetails = shippingInfo ? `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}` : "";

    const isPaid = paymentInfo && paymentInfo.status === "succeeded";

    useEffect(() => {
        dispatch(fetchOrderDetails(id)); 
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, error, id]);

    return (
        <Fragment>
            <MetaData title="Order Details" />
            {loading ? (
                <Loader />
            ) : (
                <Container className="mt-5">
                    <Row className="justify-content-center">
                        <Col lg={8}>
                            <Card className="p-4 shadow-lg">
                                <Card.Body>
                                    <Card.Title className="text-center mb-4">
                                        Order #{order._id}
                                    </Card.Title>
                                    <Card.Subtitle className="mb-3">Shipping Info</Card.Subtitle>
                                    <p><strong>Name:</strong> {user && user.name}</p>
                                    <p><strong>Phone:</strong> {shippingInfo && shippingInfo.phone}</p>
                                    <p><strong>Address:</strong> {shippingDetails}</p>
                                    <p><strong>Amount:</strong> PKR {totalPrice}</p>

                                    <hr />

                                    <Card.Subtitle className="mb-3">Payment</Card.Subtitle>
                                    <p>
                                        <span className={`badge ${isPaid ? 'bg-success' : 'bg-danger'}`}>
                                        {isPaid ? "PAID" : "NOT PAID"}
                                        </span>
                                    </p>

                                    <Card.Subtitle className="mb-3">Order Status</Card.Subtitle>
                                    <p>
                                        <span className={`badge ${orderStatus && orderStatus.includes("Delivered") ? 'bg-success' : 'bg-danger'}`}>
                                        {orderStatus}
                                        </span>
                                    </p>

                                    <hr />

                                    <Card.Subtitle className="mb-3">Order Items</Card.Subtitle>
                                    {orderItems && orderItems.map((item) => (
                                        <Row className="mb-4 align-items-center" key={item.product}>
                                        <Col xs={3} md={2}>
                                            <Image src={item.product.images[0]} alt={item.product.name} fluid rounded />
                                        </Col>
                                        <Col xs={5} md={6}>
                                            <Link to={`/product/${item.product._id}`} className="text-decoration-none text-black">
                                            {item.product.name}
                                            </Link>
                                        </Col>
                                        <Col xs={2} className="text-center">
                                            <p className="mb-0">PKR {item.price}</p>
                                        </Col>
                                        <Col xs={2} className="text-center">
                                            <p className="mb-0">{item.quantity} Piece(s)</p>
                                        </Col>
                                        </Row>
                                    ))}

                                    <hr />

                                    <div className="d-flex justify-content-center mt-4">
                                        <Button variant="primary" as={Link} to="/orders">
                                            Back to Orders
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            )}
        </Fragment>
    );
};

export default OrderDetails;