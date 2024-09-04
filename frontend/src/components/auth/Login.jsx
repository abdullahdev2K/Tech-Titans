import { useState, useEffect, Fragment } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from 'react-redux';
import { login, clearErrors } from "../../slices/authSlice.js";
import { toast } from "react-toastify";
import { Button, Form, Container, Card } from 'react-bootstrap';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const { isAuthenticated, error, loading } = useSelector(state => state.auth);

    const redirect = location.search ? location.search.split('=')[1] : "/";

    useEffect(() => {
        if (isAuthenticated) {
            navigate(redirect);
        }
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, isAuthenticated, error, navigate, redirect]);

    const loginHandle = (e) => {
        e.preventDefault();
        dispatch(login({ email, password }));
    }

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title="Login" />
                    <Container className="d-flex justify-content-center align-items-center vh-100">
                        <Card className="p-4 shadow-lg" style={{ maxWidth: '500px', width: '100%' }}>
                            <Card.Body>
                                <h1 className="text-center mb-4">Login</h1>

                                <Form onSubmit={loginHandle}>
                                    <Form.Group controlId="email_field">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Enter Email..."
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="mb-3"
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="password_field">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Enter Password..."
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="mb-4"
                                        />
                                    </Form.Group>

                                    <Link to="/forgot-password" className="d-block text-end mb-3">Forgot Password?</Link>

                                    <Button
                                        type="submit"
                                        className="w-100 py-2"
                                        variant="primary"
                                    >
                                        LOGIN
                                    </Button>

                                    <Link to="/signup" className="d-block text-center mt-3">Create New Account?</Link>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Container>
                </Fragment>
            )}
        </Fragment>
    );
}

export default Login;
