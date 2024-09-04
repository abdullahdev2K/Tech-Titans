import { useState, useEffect, Fragment } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import MetaData from "../layout/MetaData";
import { updateProfile, fetchUserProfile, clearErrors, UPDATE_PROFILE_RESET } from "../../slices/authSlice.js";
import { Button, Form, Container, Card, Row, Col } from 'react-bootstrap';

const UpdateProfile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, error, isUpdated, loading } = useSelector(state => state.auth);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setContact(user.phoneNumber);
      setAddress(user.address);
    }
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      toast.success("User updated Successfully!");
      navigate("/profile");
      dispatch(UPDATE_PROFILE_RESET());
      dispatch(fetchUserProfile());
    }
  }, [dispatch, error, isUpdated, navigate, user]);

  const updateProfileHandle = (e) => {
    e.preventDefault();

    const profileData = {
        name,
        email,
        contact,
        address
    };

    dispatch(updateProfile(profileData));
  };

  return (
    <Fragment>
      <MetaData title={'Update Profile'} />
      <Container>
        <Row className="justify-content-center my-5">
          <Col md={12}>
            <Card className="border-light shadow-lg">
              <Card.Body className="p-4">
                <div className="text-center mb-4">
                  <h2 className="mt-2 mb-5">Update Profile</h2>
                </div>
                <Form onSubmit={updateProfileHandle}>
                  <Form.Group controlId="name_field" className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your name"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="email_field" className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="contact_field" className="mb-3">
                    <Form.Label>Contact</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your contact number"
                      name="contact"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="address_field" className="mb-3">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your address"
                      name="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </Form.Group>
                  <Button type="submit" className="w-100" variant="primary" disabled={loading}>
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
}

export default UpdateProfile;