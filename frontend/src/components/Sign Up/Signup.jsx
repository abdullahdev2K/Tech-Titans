import React from 'react';
import { Card, CardBody, Col, Container, Form, Row } from 'react-bootstrap';

const signup = () => {
    return (
        <section>
            <Container className="px-4 py-5 px-md-5 text-center text-lg-start">
                <Row className="gx-lg-5 align-items-center">
                    <Col lg={6} className="mb-5 mb-lg-0">
                    <h1 className="my-5 display-3 fw-bold ls-tight">
                        The best offer <br />
                        <span className="text-primary">for your business</span>
                    </h1>
                    <p style={{ color: "hsl(217, 10%, 50.8%)" }}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Eveniet, itaque accusantium odio, soluta, corrupti aliquam
                        quibusdam tempora at cupiditate quis eum maiores libero
                        veritatis? Dicta facilis sint aliquid ipsum atque?
                    </p>
                    </Col>
                    <Col lg={6} className="mb-5 mb-lg-0">
                    <Card className="rounded-5">
                        <CardBody className="py-5 px-md-5">
                        <Form>
                            <Row>
                            <Col md={6} className="mb-4">
                                <div data-mdb-input-init className="form-outline">
                                    <label className="form-label" htmlFor="form3Example1">
                                        First name
                                    </label>
                                    <input type="text" className="form-control" />
                                </div>
                            </Col>
                            <Col md={6} className="mb-4">
                                <div data-mdb-input-init className="form-outline">
                                    <label className="form-label" htmlFor="form3Example2">
                                        Last name
                                    </label>
                                    <input type="text" className="form-control" />
                                </div>
                            </Col>
                            </Row>
                            {/* Email input */}
                            <div className="form-outline mb-4">
                            <label className="form-label">Email address</label>
                            <input
                                type="email"
                                id="form3Example3"
                                className="form-control"
                            />
                            </div>
                            {/* Password input */}
                            <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="form3Example4">
                                Password
                            </label>
                            <input type="password" className="form-control" />
                            </div>
                            {/* Checkbox */}
                            <div className="form-check d-flex justify-content-center mb-4">
                            <input
                                className="form-check-input me-2"
                                type="checkbox"
                            />
                            <label
                                className="form-check-label"
                                htmlFor="form2Example33"
                            >
                                Subscribe to our newsletter
                            </label>
                            </div>
                            {/* Submit button */}
                            <button
                            type="submit"
                            className="btn btn-primary btn-block mb-4"
                            >
                            Sign up
                            </button>
                            {/* Register buttons */}
                            <div className="text-center">
                            <p>or sign up with:</p>
                            <button
                                type="button"
                                className="btn btn-link btn-floating mx-1"
                            >
                                <i className="fab fa-facebook-f" />
                            </button>
                            <button
                                type="button"
                                className="btn btn-link btn-floating mx-1"
                            >
                                <i className="fab fa-google" />
                            </button>
                            <button
                                type="button"
                                className="btn btn-link btn-floating mx-1"
                            >
                                <i className="fab fa-twitter" />
                            </button>
                            <button
                                type="button"
                                className="btn btn-link btn-floating mx-1"
                            >
                                <i className="fab fa-github" />
                            </button>
                            </div>
                        </Form>
                        </CardBody>
                    </Card>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default signup;