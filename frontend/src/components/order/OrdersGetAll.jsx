import { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";

import { fetchAllOrders, removeOrder, clearErrors, DELETE_ORDER_RESET } from "../../features/order/orderSlice";
import Sidebar from "../layout/Sidebar.jsx";

const OrdersGetAll = ({ history }) => {
    const dispatch = useDispatch();
    const { loading, error, orders } = useSelector((state) => state.allOrders);
    const { isDeleted } = useSelector((state) => state.order);

    useEffect(() => {
        dispatch(fetchAllOrders());
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if (isDeleted) {
            toast.success("Order deleted successfully!!");
            history.push("/admin/orders");
            dispatch({ type: DELETE_ORDER_RESET });
        }
    }, [dispatch, error, history, isDeleted]);

    const deleteOrderHandler = (id) => {
        dispatch(removeOrder(id));
    };

    const setOrders = () => {
        const data = {
            columns: [
                {
                    label: "Order Id",
                    field: "id",
                    sort: "asc",
                },
                {
                    label: "No of Items",
                    field: "numOfItems",
                    sort: "asc",
                },
                {
                    label: "Amount",
                    field: "amount",
                    sort: "asc",
                },
                {
                    label: "Status",
                    field: "status",
                    sort: "asc",
                },
                {
                    label: "Actions",
                    field: "actions",
                },
            ],
            rows: [],
        };
        orders &&
            orders.forEach((order) => {
                data.rows.push({
                    id: order._id,
                    numOfItems: order.orderItems.length,
                    amount: `$${order.totalPrice}`,
                    status: order.orderStatus && String(order.orderStatus).includes("Delivered") ? (
                        <p style={{ color: "green" }}>{order.orderStatus}</p>
                    ) : (
                        <p style={{ color: "red" }}>{order.orderStatus}</p>
                    ),
                    actions: (
                        <>
                            <Link
                                to={`/admin/order/${order._id}`}
                                title="Order Process"
                                className="btn btn-success py-1 px-2 ml-2"
                            >
                                <i className="fa fa-eye"></i>
                            </Link>

                            <button
                                className="btn btn-danger py-1 px-2 ml-2"
                                onClick={() => deleteOrderHandler(order._id)}
                                title="Delete Order"
                            >
                                <i className="fa fa-trash"></i>
                            </button>
                        </>
                    ),
                });
            });
        return data;
    };

    return (
        <Fragment>
            <MetaData title={"Show All Orders"} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
                <div className="col-12 col-md-10">
                    <Fragment>
                        <h1 className="my-5 text-center white"> Show All Orders </h1>
                        {loading ? (
                            <Loader />
                        ) : (
                            <MDBDataTable
                                data={setOrders()}
                                className="px-3 py-3 box-cart purple"
                                bordered
                                striped
                                hover
                            />
                        )}
                    </Fragment>
                </div>
            </div>
        </Fragment>
    );
};

export default OrdersGetAll;