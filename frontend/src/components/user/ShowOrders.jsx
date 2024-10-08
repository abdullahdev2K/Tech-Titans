import { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import { toast } from "react-toastify";
import { FaEye } from "react-icons/fa";
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyOrders, clearErrors } from "../../slices/orderSlice";
import { Container, Row, Col, Table, Button } from "react-bootstrap";

const ShowOrders = () => {
    const dispatch = useDispatch();
    const { loading, error, orders } = useSelector((state) => state.orders);

    useEffect(() => {
        dispatch(fetchMyOrders());

        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, error]);

    const setOrders = () => {
        const data = {
            columns: [
                { label: "Order Id", field: "id", sort: "asc" },
                { label: "Num of Items", field: "numOfItems", sort: "asc" },
                { label: "Amount", field: "amount", sort: "asc" },
                { label: "Status", field: "status", sort: "asc" },
                { label: "Actions", field: "actions", sort: "asc" },
            ],
            rows: [],
        };

        orders &&
            orders.forEach((order) => {
                data.rows.push({
                    id: order._id,
                    numOfItems: order.orderItems.length,
                    amount: `PKR ${order.totalPrice}`,
                    status: (
                        <span
                            className={`badge ${
                                order.orderStatus.includes("Delivered")
                                    ? "bg-success"
                                    : "bg-danger"
                            }`}
                        >
                            {order.orderStatus}
                        </span>
                    ),
                    actions: (
                        <Link to={`/order/${order._id}`}>
                            <Button variant="outline-primary" size="sm">
                                <FaEye />
                            </Button>
                        </Link>
                    ),
                });
            });

        return data;
    };

    return (
        <Fragment>
            <MetaData title="My Orders" />
            <Container fluid className="mt-5">
                <Row className="justify-content-center">
                    <Col md={10} lg={8}>
                        <h3 className="text-center mb-4">My Orders</h3>
                        {loading ? (
                            <Loader />
                        ) : (
                            <div className="table-responsive shadow-lg p-3 mb-5 bg-white rounded">
                                <MDBDataTable
                                    data={setOrders()}
                                    bordered
                                    striped
                                    hover
                                    className="table-sm"
                                />
                            </div>
                        )}
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};

export default ShowOrders;