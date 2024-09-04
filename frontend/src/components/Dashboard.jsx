import React, { Fragment, useEffect } from 'react';
import { Link } from "react-router-dom";
import MetaData from "./layout/MetaData";
import Loader from "./layout/Loader";
import Sidebar from "./layout/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminProducts } from "../slices/productSlice";
import { fetchAllOrders } from "../slices/orderSlice";
import { fetchAllUsers } from "../slices/authSlice";
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const Dashboard = () => {
    const dispatch = useDispatch();

    const { products } = useSelector(state => state.products);
    const { allUsers: users } = useSelector(state => state.auth);
    const { loading, orders, totalAmount } = useSelector(state => state.orders);

    let outOfStock = 0;
    if (products) {
        products.forEach(product => {
            if (product.stock === 0) {
                outOfStock += 1;
            }
        });
    }

    useEffect(() => {
        dispatch(fetchAdminProducts());
        dispatch(fetchAllOrders());
        dispatch(fetchAllUsers());
    }, [dispatch]);

    return (
        <Fragment>
            <MetaData title={'Admin Dashboard'} />
            <Container fluid>
                <Row>
                    <Col md={2}>
                        <Sidebar />
                    </Col>
                    <Col md={10}>
                        <h1 className="my-5 text-center">Dashboard</h1>

                        {loading ? <Loader /> : (
                            <Fragment>
                                <Row>
                                    <Col xs={12} className="mb-3">
                                        <Card bg="primary" text="white" className="shadow">
                                            <Card.Body className="text-center">
                                                <Card.Title>Total Amount</Card.Title>
                                                <Card.Text>
                                                    <b>${totalAmount && parseFloat(totalAmount).toFixed(2)}</b>
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12} sm={6} md={3} className="mb-3">
                                        <Card bg="success" text="white" className="shadow">
                                            <Card.Body className="text-center">
                                                <Card.Title>Products</Card.Title>
                                                <Card.Text>
                                                    <b>{products && products.length}</b>
                                                </Card.Text>
                                            </Card.Body>
                                            <Card.Footer>
                                                <Link to="/admin/products" className="text-white">
                                                    <span>View Details</span>
                                                    <i className="fa fa-angle-right float-right"></i>
                                                </Link>
                                            </Card.Footer>
                                        </Card>
                                    </Col>
                                    <Col xs={12} sm={6} md={3} className="mb-3">
                                        <Card bg="danger" text="white" className="shadow">
                                            <Card.Body className="text-center">
                                                <Card.Title>Orders</Card.Title>
                                                <Card.Text>
                                                    <b>{orders && orders.length}</b>
                                                </Card.Text>
                                            </Card.Body>
                                            <Card.Footer>
                                                <Link to="/admin/orders" className="text-white">
                                                    <span>View Details</span>
                                                    <i className="fa fa-angle-right float-right"></i>
                                                </Link>
                                            </Card.Footer>
                                        </Card>
                                    </Col>
                                    <Col xs={12} sm={6} md={3} className="mb-3">
                                        <Card bg="info" text="white" className="shadow">
                                            <Card.Body className="text-center">
                                                <Card.Title>Users</Card.Title>
                                                <Card.Text>
                                                    <b>{users && users.length}</b>
                                                </Card.Text>
                                            </Card.Body>
                                            <Card.Footer>
                                                <Link to="/admin/users" className="text-white">
                                                    <span>View Details</span>
                                                    <i className="fa fa-angle-right float-right"></i>
                                                </Link>
                                            </Card.Footer>
                                        </Card>
                                    </Col>
                                    <Col xs={12} sm={6} md={3} className="mb-3">
                                        <Card bg="warning" text="white" className="shadow">
                                            <Card.Body className="text-center">
                                                <Card.Title>Out of Stock</Card.Title>
                                                <Card.Text>
                                                    <b>{outOfStock}</b>
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                            </Fragment>
                        )}
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};

export default Dashboard;
