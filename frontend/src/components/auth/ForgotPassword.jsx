import { useState, useEffect, Fragment } from "react";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword, clearErrors } from "../../slices/authSlice.js";
import { toast } from "react-toastify";
import { Button, Form, Container, Card, Row, Col } from 'react-bootstrap';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');

    const dispatch = useDispatch();
    const { error, loading, message } = useSelector(state => state.auth);

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if (message) {
            toast.success(message);
        }
    }, [dispatch, error, message]);

    const forgotPasswordHandle = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set('email', email);

        dispatch(forgotPassword(formData));   
    }

    return (
        <Fragment>
            <MetaData title={'Forgot Password'} />
            <Container className="d-flex justify-content-center align-items-center vh-100">
                <Row className="justify-content-center">
                    <Col lg={12} md={7}>
                        <Card className="border-light shadow-lg">
                            <Card.Body className="p-4">
                                <div className="text-center mb-4">
                                    <h2 className="mt-2 mb-4">Forgot Password</h2>
                                </div>
                                <Form onSubmit={forgotPasswordHandle}>
                                    <Form.Group controlId="email_field" className="mb-3">
                                        <Form.Label>Enter Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Enter your email address"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Button
                                        type="submit"
                                        className="w-100"
                                        variant="primary"
                                        disabled={loading}
                                    >
                                        Send Email
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
}

export default ForgotPassword;