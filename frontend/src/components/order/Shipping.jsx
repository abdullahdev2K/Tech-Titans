import { Fragment, useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingInfo } from "../../slices/cartSlice";
import { countries } from "countries-list";
import CheckoutSteps from './CheckoutSteps';
import { useNavigate } from "react-router-dom";

const Shipping = () => {
    const countriesList = Object.values(countries);
    const { shippingInfo } = useSelector(state => state.cart);

    const [address, setAddress] = useState(shippingInfo?.address || '');
    const [city, setCity] = useState(shippingInfo?.city || '');
    const [country, setCountry] = useState(shippingInfo?.country || '');
    const [postalCode, setPostalCode] = useState(shippingInfo?.postalCode || '');
    const [phone, setPhone] = useState(shippingInfo?.phone || '');

    const dispatch = useDispatch();
    const navigate = useNavigate();  // Using navigate instead of history.push

    const shippingHandle = (e) => {
        e.preventDefault();
        dispatch(saveShippingInfo({ address, city, country, postalCode, phone }));
        navigate("/order/confirm");  // Updated navigation method
    };

    return (
        <Fragment>
            <MetaData title={'Shipping info'} />
            <CheckoutSteps shipping />

            <Container>
                <Row className="justify-content-md-center">
                    <Col xs={12} md={6}>
                        <Form className="shadow-lg p-4 mb-5" onSubmit={shippingHandle}>
                            <h1 className="mb-4 text-center purple">Shipping Info</h1>

                            <Form.Group controlId="address_field" className="mb-3">
                                <Form.Label>Address</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="city_field" className="mb-3">
                                <Form.Label>City</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your city"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="phone_field" className="mb-3">
                                <Form.Label>Phone No</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your phone number"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="postal_code_field" className="mb-3">
                                <Form.Label>Postal Code</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your postal code"
                                    value={postalCode}
                                    onChange={(e) => setPostalCode(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="country_field" className="mb-3">
                                <Form.Label>Country</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    required
                                >
                                    <option value="">Select Country</option>
                                    {countriesList.map(country => (
                                        <option key={country.name} value={country.name}>
                                            {country.name}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>

                            <Button variant="primary" type="submit" className="w-100 py-2">
                                CONTINUE
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};

export default Shipping;