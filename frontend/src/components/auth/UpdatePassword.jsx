import { useState, useEffect, Fragment } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';

import MetaData from "../layout/MetaData";
import { updatePassword, clearErrors, UPDATE_PASSWORD_RESET, fetchUserProfile } from "../../slices/authSlice.js";

const UpdatePassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { error, isUpdated, loading } = useSelector(state => state.auth);

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            toast.success("Password Updated Successfully!");
            navigate("/profile");
            dispatch(UPDATE_PASSWORD_RESET());
            dispatch(fetchUserProfile());
        }
    }, [dispatch, error, isUpdated, navigate]);

    const updatePasswordHandle = (e) => {
        e.preventDefault();
    
        const passwordData = {
            oldPassword,
            password
        };
    
        dispatch(updatePassword(passwordData));
    }
    

    return (
        <Fragment>
            <MetaData title={'Change Password'} />
            <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
                <Row className="w-100">
                    <Col xs={12} md={8} lg={6} className="mx-auto">
                        <Card className="shadow-lg p-4">
                            <Card.Body>
                                <h2 className="text-center mb-4 purple">Update Password</h2>
                                <Form onSubmit={updatePasswordHandle}>
                                    <Form.Group className="mb-3">
                                        <Form.Label htmlFor="old_password_field">Old Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            id="old_password_field"
                                            value={oldPassword}
                                            onChange={(e) => setOldPassword(e.target.value)}
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-4">
                                        <Form.Label htmlFor="new_password_field">New Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            id="new_password_field"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </Form.Group>
                                    <Button
                                        type="submit"
                                        className="w-100"
                                        variant="primary"
                                        disabled={loading}
                                    >
                                        {loading ? 'Updating...' : 'Update Password'}
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

export default UpdatePassword;