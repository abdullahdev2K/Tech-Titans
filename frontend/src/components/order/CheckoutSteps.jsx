import React from 'react';
import { Link } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';

const CheckoutSteps = ({ shipping, confirmOrder, payment }) => {
    return (
        <Container className="my-5">
            <Row className="justify-content-center">
                <Col xs={12} md={4} className="text-center">
                    {shipping ? (
                        <Link to="/shipping" className="checkout-step text-decoration-none">
                            <div className="step-circle bg-primary text-white">1</div>
                            <p className="step-label mt-2">Shipping</p>
                        </Link>
                    ) : (
                        <div className="checkout-step disabled-step">
                            <div className="step-circle bg-light text-muted">1</div>
                            <p className="step-label mt-2 text-muted">Shipping</p>
                        </div>
                    )}
                </Col>

                <Col xs={12} md={4} className="text-center">
                    {confirmOrder ? (
                        <Link to="/order/confirm" className="checkout-step text-decoration-none">
                            <div className="step-circle bg-primary text-white">2</div>
                            <p className="step-label mt-2">Confirm Order</p>
                        </Link>
                    ) : (
                        <div className="checkout-step disabled-step">
                            <div className="step-circle bg-light text-muted">2</div>
                            <p className="step-label mt-2 text-muted">Confirm Order</p>
                        </div>
                    )}
                </Col>

                <Col xs={12} md={4} className="text-center">
                    {payment ? (
                        <Link to="/order/payment" className="checkout-step text-decoration-none">
                            <div className="step-circle bg-primary text-white">3</div>
                            <p className="step-label mt-2">Payment</p>
                        </Link>
                    ) : (
                        <div className="checkout-step disabled-step">
                            <div className="step-circle bg-light text-muted">3</div>
                            <p className="step-label mt-2 text-muted">Payment</p>
                        </div>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default CheckoutSteps;