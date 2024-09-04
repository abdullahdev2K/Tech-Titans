import { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';

import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";

import { fetchOrderDetails, processOrder, clearErrors } from "../../features/order/orderSlice";
import { PROCESS_ORDER_RESET } from "../../constants/orderConstants.js";
import Sidebar from "../layout/Sidebar.jsx";

const OrderProcess = ({ match }) => {
    const [status, setStatus] = useState("");

    const dispatch = useDispatch();
    const { loading, order={} } = useSelector(state => state.orderDetails);
    const { shippingInfo, orderItems, paymentInfo, user, totalPrice, orderStatus } = order;
    const { error, isUpdated } = useSelector(state => state.order);

    const orderId = match.params.id;

    useEffect(() => {
        dispatch(fetchOrderDetails(orderId));

        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            toast.success("Order processed successfully!");
            dispatch({ type: PROCESS_ORDER_RESET });
        }
    }, [dispatch, error, isUpdated, orderId]);

    const processOrderHandler = () => {
        const formData = new FormData();
        formData.set('status', status);

        dispatch(processOrder(orderId, formData));
    };

    const shippingDetails = shippingInfo && `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`;
    const isPaid = paymentInfo && paymentInfo.status === "succeeded" ? true : false;

    return (
        <Fragment>
            <MetaData title={`Process Orders # ${order._id}`} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
                <div className="col-12 col-md-10 box-cart">
                    <Fragment>
                        {loading ? <Loader /> : (
                            <div className="row d-flex justify-content-around">
                                <div className="col-12 col-lg-7 order-details">

                                    <h2 className="my-5 purple">Order # {order._id}</h2>

                                    <h4 className="mb-4 purple">Shipping Info</h4>
                                    <p><b>Name:</b> {user && user.name}</p>
                                    <p><b>Phone:</b> {shippingInfo && shippingInfo.phoneNo} </p>
                                    <p className="mb-4"><b>Address:</b>{shippingDetails} </p>
                                    <p><b>Amount:</b> ${totalPrice}</p>

                                    <hr />

                                    <h4 className="my-4 purple">Payment</h4>
                                    <p className={isPaid ? "greenColor" : "redColor"} ><b>
                                        {isPaid ? "PAID" : "NOT PAID"}
                                    </b></p>

                                    <h4 className="my-4 purple">Stripe Id</h4>
                                    <p><b>
                                        {paymentInfo && paymentInfo.id}
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

                                <div className="col-12 col-lg-3 mt-5">
                                    <h4 className="my-4">Status</h4>

                                    <div className="form-group">
                                        <select
                                            className="form-control"
                                            name='status'
                                            value={status}
                                            onChange={(e) => setStatus(e.target.value)} >
                                            <option value="Processing">Processing</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Delivered">Delivered</option>
                                        </select>
                                    </div>
                                    <button onClick={processOrderHandler}
                                        className="btn btn-warning btn-block">
                                        Update Status
                                    </button>
                                </div>
                            </div>
                        )}
                    </Fragment>
                </div>
            </div>
        </Fragment>
    );
};

export default OrderProcess;