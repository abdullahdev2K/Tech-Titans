import { Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Row, Col, Container, Button, Card } from "react-bootstrap";
import { FaEye, FaTrashAlt } from "react-icons/fa";

import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";
import Sidebar from "../layout/Sidebar.jsx";

import {
    fetchAllOrders,
    removeOrder,
    clearErrors,
    resetDeleteOrder,
} from "../../slices/orderSlice.js";

const OrdersGetAll = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, orders, isDeleted } = useSelector(
        (state) => state.orders
    );

    useEffect(() => {
        dispatch(fetchAllOrders());

        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        if (isDeleted) {
            toast.success("Order deleted successfully!!");
            navigate("/admin/orders");
            dispatch(resetDeleteOrder());
        }
    }, [dispatch, error, isDeleted, navigate]);

    const deleteOrderHandler = (id) => {
        dispatch(removeOrder(id));
    };

    const setOrders = () => {
        const data = {
            columns: [
                { label: "Order Id", field: "id", sort: "asc" },
                { label: "No of Items", field: "numOfItems", sort: "asc" },
                { label: "Amount", field: "amount", sort: "asc" },
                { label: "Status", field: "status", sort: "asc" },
                { label: "Actions", field: "actions" },
            ],
            rows: [],
        };

        orders &&
            orders.forEach((order) => {
                data.rows.push({
                    id: order._id,
                    numOfItems: order.orderItems.length,
                    amount: `PKR ${order.totalPrice}`,
                    status:
                        order.orderStatus &&
                        String(order.orderStatus).includes("Delivered") ? (
                            <p style={{ color: "green" }}>{order.orderStatus}</p>
                        ) : (
                            <p style={{ color: "red" }}>{order.orderStatus}</p>
                        ),
                    actions: (
                        <div className="d-flex justify-content-center">
                            <Link
                                to={`/admin/orders/${order._id}/process`}
                                title="Order Process"
                                className="btn btn-outline-success btn-sm mx-1"
                            >
                                <FaEye />
                            </Link>

                            <Button
                                variant="outline-danger"
                                size="sm"
                                title="Delete Order"
                                onClick={() => deleteOrderHandler(order._id)}
                                className="mx-1"
                            >
                                <FaTrashAlt />
                            </Button>
                        </div>
                    ),
                });
            });
        return data;
    };

    return (
        <Fragment>
            <MetaData title={"Show All Orders"} />
            <Container fluid>
                <Row className="mt-4">
                    <Col md={2}>
                        <Sidebar />
                    </Col>
                    <Col md={10}>
                        <Card className="shadow-sm border-0">
                            <Card.Header className="bg-primary text-white text-center">
                                <h4 className="mb-0">All Orders</h4>
                            </Card.Header>
                            <Card.Body>
                                {loading ? (
                                    <Loader />
                                ) : (
                                    <MDBDataTable
                                        data={setOrders()}
                                        className="table table-hover mb-0"
                                        bordered
                                        striped
                                        responsive
                                        style={{ cursor: "pointer" }}
                                    />
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};

export default OrdersGetAll;