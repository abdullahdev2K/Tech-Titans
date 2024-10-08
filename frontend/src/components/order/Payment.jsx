import { Fragment, useEffect } from "react";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { createOrder, clearErrors } from "../../slices/orderSlice";
import CheckoutSteps from './CheckoutSteps';
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const options = {
    style: {
        base: {
            fontSize: "17px"
        },
        invalid: {
            color: "#9e2146"
        }
    }
};

const Payment = () => {
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Initialize useNavigate

    const { user } = useSelector(state => state.auth);
    const { items, shippingInfo } = useSelector(state => state.cart);
    const { error } = useSelector(state => state.orders);

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, error]);

    const order = {
        orderItems: items,
        shippingInfo
    };

    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
    if (orderInfo) {
        order.itemsPrice = orderInfo.itemsPrice;
        order.shippingPrice = orderInfo.shippingPrice;
        order.taxPrice = orderInfo.taxPrice;
        order.totalPrice = orderInfo.totalPrice;
    }

    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100)
    };

    const processHandler = async (e) => {
        e.preventDefault();
        document.querySelector("#pay_btn").disabled = true;

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            // Make the payment request
            const res = await axios.post("http://localhost:8080/api/v1/payment/process", paymentData, config);
            
            const clientSecret = res.data.client_secret; // Accessing client_secret

            if (!clientSecret) {
                throw new Error("Client secret not found in the response.");
            }

            if (!stripe || !elements) {
                return;
            }

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email
                    }
                }
            });

            if (result.error) {
                toast.error(result.error.message);
                document.querySelector("#pay_btn").disabled = false;
            } else {
                if (result.paymentIntent.status === "succeeded") {
                    // Ensure order contains all required fields
                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status,
                    };

                    // Populate shippingInfo with required fields
                    if (shippingInfo) {
                        order.shippingInfo = {
                            phone: shippingInfo.phone,
                            country: shippingInfo.country,
                            postalCode: shippingInfo.postalCode,
                            city: shippingInfo.city,
                            address: shippingInfo.address,
                        };
                    }

                    // Ensure orderItems are populated correctly
                    order.orderItems = items.map(item => ({
                        product: item.product, // Ensure name exists
                        quantity: item.quantity, // Add other necessary fields
                        price: item.price // Assuming you have this field
                    }));

                    dispatch(createOrder(order));
                    navigate("/order/success"); // Use navigate instead of history.push
                } else {
                    toast.error("There was an issue processing your payment.");
                }
            }
        } catch (error) {
            document.querySelector("#pay_btn").disabled = false;

            // Enhanced error handling
            console.error(error);
            const errorMessage = error.response ? error.response.data.message : error.message || "Payment processing failed.";
            toast.error(errorMessage);
        }
    };
    
    return (
        <Fragment>
            <MetaData title={'Payment'} />
            <CheckoutSteps shipping confirmOrder payment />
            
            <Container className="my-5">
                <Row className="justify-content-center">
                    <Col xs={12} md={6} lg={5}>
                        <Form className="shadow-lg p-4" onSubmit={processHandler}>
                            <h2 className="mb-4 text-center text-black">Card Info</h2>

                            <Form.Group controlId="card_num_field" className="mb-3">
                                <Form.Label>Card Number</Form.Label>
                                <CardNumberElement 
                                    type="text" 
                                    className="form-control" 
                                    options={options} 
                                />
                            </Form.Group>

                            <Form.Group controlId="card_exp_field" className="mb-3">
                                <Form.Label>Card Expiry</Form.Label>
                                <CardExpiryElement 
                                    type="text" 
                                    className="form-control" 
                                    options={options} 
                                />
                            </Form.Group>

                            <Form.Group controlId="card_cvc_field" className="mb-3">
                                <Form.Label>Card CVC</Form.Label>
                                <CardCvcElement 
                                    type="text" 
                                    className="form-control" 
                                    options={options} 
                                />
                            </Form.Group>

                            <Button 
                                id="pay_btn" 
                                type="submit" 
                                variant="primary" 
                                className="btn-block py-2"
                                disabled={!stripe || !elements}
                            >
                                Pay {` - PKR ${orderInfo && orderInfo.totalPrice}`}
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};

export default Payment;