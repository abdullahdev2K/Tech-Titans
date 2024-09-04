import { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';

import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";

import { fetchOrderDetails, clearErrors } from "../../slices/orderSlice.js";

const OrderDetails = ({ match }) => {
    const dispatch = useDispatch();
    const { loading, error, order={} } = useSelector(state => state.orderDetails);
    const { shippingInfo, orderItems, paymentInfo, user, totalPrice, orderStatus } = order;
    const shippingDetails = shippingInfo && `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`;
    const isPaid = paymentInfo && paymentInfo.status === "succeeded" ? true : false;

    useEffect(() => {
        dispatch(fetchOrderDetails(match.params.id));
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, error, match.params.id]);

    return (
        <Fragment>
            <MetaData title="Order Details" />
            {loading ? <Loader /> : (
                <Fragment>
                    <br /><br />
                    <div className="mt-5 row d-flex justify-content-between box-cart ">
                        <div className="col-12 col-lg-8 mt-3 order-details">

                            <h1 className="my-4 purple text-center">Order # {order._id}</h1>

                            <h4 className="mb-4 purple">Shipping Info</h4>
                            <p><b className="purple">Name:</b> {user && user.name}</p>
                            <p><b className="purple">Phone:</b> {shippingInfo && shippingInfo.phoneNo}</p>
                            <p className="mb-4"><b className="purple">Address:</b>{shippingDetails}</p>
                            <p><b className="purple">Amount:</b> ${totalPrice}</p>

                            <hr />

                            <h4 className="my-4 purple">Payment</h4>
                            <p className={isPaid ? "greenColor" : "redColor"} ><b>
                                {isPaid ? "PAID" : "NOT PAID"}
                            </b></p>

                            <h4 className="my-4 purple">Order Status:</h4>
                            <p className={order.orderStatus && String(order.orderStatus).includes("Delivered") ? "greenColor" : "redColor"}><b>{orderStatus}</b></p>

                            <h4 className="my-4 purple">Order Items:</h4>

                            <hr />
                            <div className="cart-item my-1">
                                {orderItems && orderItems.map(item => (
                                    <div key={item.product} className="row my-5">
                                        <div className="col-4 col-lg-2">
                                            <img src={item.image} alt={item.name} height="45" width="65" />
                                        </div>
                                        <div className="col-5 col-lg-5">
                                            <Link to={`/product/${item.product}`}>
                                                {item.name}
                                            </Link>
                                        </div>
                                        <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                            <p>${item.price} </p>
                                        </div>
                                        <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                            <p>{item.quantity} Piece(s)</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <hr />
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default OrderDetails;