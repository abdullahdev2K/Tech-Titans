import { useState, useEffect, Fragment } from "react";
import MetaData from "../layout/MetaData";
import Sidebar from "../layout/Sidebar.jsx";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import { updateUser, fetchUserDetails, clearErrors } from "../../slices/authSlice";
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Form, Container, Row, Col, Card } from 'react-bootstrap';

const UpdateUser = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id: userId } = useParams();

    const { error, userDetails } = useSelector(state => state.auth);

    useEffect(() => {
        if (!userDetails || userDetails._id !== userId) {
            dispatch(fetchUserDetails(userId));
        } else {
            setName(userDetails.name || '');
            setEmail(userDetails.email || '');
            setRole(userDetails.role || 'Customer'); // Default to 'Customer' if role is missing
            setPhoneNumber(userDetails.phoneNumber || '');
            setAddress(userDetails.address || '');
        }
    
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, error, userDetails, userId]);
    

    const updateUserHandle = async (e) => {
        e.preventDefault();
        const updatedData = {
            name,
            email,
            role,
            phoneNumber,
            address
        };
        
        const res = await dispatch(updateUser({ userId, updatedData }));
    
        if (res.type === 'auth/updateUser/fulfilled') {
            toast.success("User updated successfully!");
            navigate("/admin/users");
        } else {
            toast.error('Error updating user');
        }
    };

    return (
        <Fragment>
            <MetaData title={`Update User`} />
            <Container fluid>
                <Row>
                    <Col md={2}>
                        <Sidebar />
                    </Col>
                    <Col md={10}>
                        <Card className="my-4 shadow-lg">
                            <Card.Body>
                                <h1 className="text-center mb-4">Update User</h1>
                                <Form onSubmit={updateUserHandle}>
                                    <Form.Group controlId="name_field" className="mb-3">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter user name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="email_field" className="mb-3">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Enter user email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="role_field" className="mb-3">
                                        <Form.Label>Role</Form.Label>
                                        <Form.Control
                                            as="select"
                                            value={role}
                                            onChange={(e) => setRole(e.target.value)}
                                        >
                                            <option value="Customer">Customer</option>
                                            <option value="Admin">Admin</option>
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId="phone_field" className="mb-3">
                                        <Form.Label>Phone Number</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter phone number"
                                            value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="address_field" className="mb-3">
                                        <Form.Label>Address</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter address"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                        />
                                    </Form.Group>

                                    <Button type="submit" variant="primary" className="w-100 mt-4">
                                        Update
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};

export default UpdateUser;