import { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import { useSelector } from "react-redux";
import CheckoutSteps from './CheckoutSteps';

const ConfirmOrder = () => {
    const navigate = useNavigate();
    const { cartItems, shippingInfo = {} } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.auth);

    // Calculate Order Prices
    const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shippingPrice = itemsPrice > 200 ? 0 : 25;
    const taxPrice = Number((0.05 * itemsPrice).toFixed(2));
    const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2);

    const processToPayment = () => {
        const data = {
            itemsPrice: itemsPrice.toFixed(2),
            shippingPrice,
            taxPrice,
            totalPrice,
        };
        sessionStorage.setItem('orderInfo', JSON.stringify(data));
        navigate('/payment');
    };

    return (
        <Fragment>
            <MetaData title="Confirm Order" />
            <CheckoutSteps shipping confirmOrder />
            <div className="row d-flex justify-content-between">
                <div className="offset-1 col-7 col-lg-7 mt-4 order-confirm">
                    <h4 className="mb-3 text-center purple">Shipping Info</h4>
                    <p><b className="purple">Name: </b>{user && user.name}</p>
                    <p><b className="purple">Phone: </b>{shippingInfo.phoneNo}</p>
                    <p className="mb-4"><b className="purple">Address: </b>{`${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`}</p>

                    <hr />
                    <h4 className="mt-2 purple">Your Cart Items:</h4>

                    {cartItems.map((item) => (
                        <Fragment key={item.product}>
                            <hr />
                            <div className="cart-item my-1 purple">
                                <div className="row">
                                    <div className="col-4 col-lg-2">
                                        <img src={item.image} alt="Product" height="45" width="65" />
                                    </div>
                                    <div className="col-5 col-lg-6">
                                        <Link className="purple" to={`/product/${item.product}`}>{item.name}</Link>
                                    </div>
                                    <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                                        <p className="purple">{item.quantity} x ${item.price.toFixed(2)} = <b>${(item.quantity * item.price).toFixed(2)}</b></p>
                                    </div>
                                </div>
                            </div>
                            <hr />
                        </Fragment>
                    ))}
                </div>
                <div className="col-7 col-lg-3 my-4 mr-3">
                    <div id="order_summary">
                        <h4 className="white">Order Summary</h4>
                        <hr />
                        <p className="white">Subtotal: <span className="order-summary-values">${itemsPrice.toFixed(2)}</span></p>
                        <p className="white">Shipping: <span className="order-summary-values">${shippingPrice.toFixed(2)}</span></p>
                        <p className="white">Tax: <span className="order-summary-values">${taxPrice.toFixed(2)}</span></p>
                        <hr />
                        <p className="white">Total: <span className="order-summary-values">${totalPrice}</span></p>
                        <hr />
                        <button onClick={processToPayment} id="checkout_btn" className="btn btn-primary btn-block">
                            Proceed to Payment
                        </button>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default ConfirmOrder;