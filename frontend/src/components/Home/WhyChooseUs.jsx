import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaCameraRetro } from "react-icons/fa";


const WhyChooseUs = () => {
    return (
        <section className="mt-5">
            <Container className="text-dark pt-3">
                <h3 className="pt-4 pb-3">Why choose us</h3>

                <Row className="mb-4">
                    <Col md={6} lg={4}>
                        <figure className="d-flex align-items-center mb-4">
                            <span className="rounded-circle bg-white p-3 d-flex me-2 mb-2">
                                <FaCameraRetro size="32" className="text-primary floating" />
                            </span>
                            <figcaption className="info">
                                <h6 className="title">Reasonable prices</h6>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do eiusmor</p>
                            </figcaption>
                        </figure>
                    </Col>
                    <Col md={6} lg={4}>
                        <figure className="d-flex align-items-center mb-4">
                            <span className="rounded-circle bg-white p-3 d-flex me-2 mb-2">
                                <FaCameraRetro size="32" className="text-primary floating" />
                            </span>
                            <figcaption className="info">
                                <h6 className="title">Reasonable prices</h6>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do eiusmor</p>
                            </figcaption>
                        </figure>
                    </Col>
                    <Col md={6} lg={4}>
                        <figure className="d-flex align-items-center mb-4">
                            <span className="rounded-circle bg-white p-3 d-flex me-2 mb-2">
                                <FaCameraRetro size="32" className="text-primary floating" />
                            </span>
                            <figcaption className="info">
                                <h6 className="title">Reasonable prices</h6>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do eiusmor</p>
                            </figcaption>
                        </figure>
                    </Col>
                    <Col md={6} lg={4}>
                        <figure className="d-flex align-items-center mb-4">
                            <span className="rounded-circle bg-white p-3 d-flex me-2 mb-2">
                                <FaCameraRetro size="32" className="text-primary floating" />
                            </span>
                            <figcaption className="info">
                                <h6 className="title">Reasonable prices</h6>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do eiusmor</p>
                            </figcaption>
                        </figure>
                    </Col>
                    <Col md={6} lg={4}>
                        <figure className="d-flex align-items-center mb-4">
                            <span className="rounded-circle bg-white p-3 d-flex me-2 mb-2">
                                <FaCameraRetro size="32" className="text-primary floating" />
                            </span>
                            <figcaption className="info">
                                <h6 className="title">Reasonable prices</h6>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do eiusmor</p>
                            </figcaption>
                        </figure>
                    </Col>
                    <Col md={6} lg={4}>
                        <figure className="d-flex align-items-center mb-4">
                            <span className="rounded-circle bg-white p-3 d-flex me-2 mb-2">
                                <FaCameraRetro size="32" className="text-primary floating" />
                            </span>
                            <figcaption className="info">
                                <h6 className="title">Reasonable prices</h6>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do eiusmor</p>
                            </figcaption>
                        </figure>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default WhyChooseUs;