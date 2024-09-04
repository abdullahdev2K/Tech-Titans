import { useState, useEffect, Fragment } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Button, Form, Container, Card, Row, Col } from 'react-bootstrap';
import MetaData from "../layout/MetaData";
import { signup, clearErrors } from "../../slices/authSlice.js";

const Signup = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        phoneNumber: '',
        address: '',
    });
    const { name, email, password, phoneNumber, address } = user;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isAuthenticated, error, loading } = useSelector(state => state.auth);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, isAuthenticated, error, navigate]);

    const signupHandle = (e) => {
        e.preventDefault();
        const formData = {
            name,
            email,
            password,
            phoneNumber,
            address,
        };
        dispatch(signup(formData));
    };

    const changeData = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    return (
        <Fragment>
            <MetaData title={"Signup User"} />
            <Container className="d-flex justify-content-center align-items-center vh-100">
                <Row className="justify-content-center">
                    <Col lg={12} md={7}>
                        <Card className="border-light shadow-lg">
                            <Card.Body className="p-4">
                                <div className="text-center mb-4">
                                    <h2 className="mt-3">Create Your Account</h2>
                                </div>
                                <Form onSubmit={signupHandle}>
                                    <Form.Group controlId="name_field">
                                        <Form.Control
                                            type="text"
                                            placeholder="Full Name"
                                            name="name"
                                            value={name}
                                            onChange={changeData}
                                            className="mb-3"
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="email_field">
                                        <Form.Control
                                            type="email"
                                            placeholder="Email Address"
                                            name="email"
                                            value={email}
                                            onChange={changeData}
                                            className="mb-3"
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="password_field">
                                        <Form.Control
                                            type="password"
                                            placeholder="Password"
                                            name="password"
                                            value={password}
                                            onChange={changeData}
                                            className="mb-3"
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="phone_number_field">
                                        <Form.Control
                                            type="text"
                                            placeholder="Phone Number"
                                            name="phoneNumber"
                                            value={phoneNumber}
                                            onChange={changeData}
                                            className="mb-3"
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="address_field">
                                        <Form.Control
                                            type="text"
                                            placeholder="Address"
                                            name="address"
                                            value={address}
                                            onChange={changeData}
                                            className="mb-3"
                                        />
                                    </Form.Group>

                                    <Button
                                        type="submit"
                                        className="w-100"
                                        variant="primary"
                                        disabled={loading}
                                    >
                                        Signup
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

export default Signup;