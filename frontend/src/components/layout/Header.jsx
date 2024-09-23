import React, { Fragment, useEffect } from 'react';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Container, Badge } from 'react-bootstrap';
import Search from './Search';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { logout } from '../../slices/authSlice';
import { fetchCart } from '../../slices/cartSlice';
import { GiShoppingBag } from 'react-icons/gi';
import { FaUser } from "react-icons/fa";
import 'react-toastify/dist/ReactToastify.css';

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, loading } = useSelector(state => state.auth);
    const { totalItems } = useSelector(state => state.cart); // Accessing totalItems from cart state

    const logoutHandler = () => {
        dispatch(logout());
        toast.success('Logged out successfully!!');
        navigate('/');
    };

    useEffect(() => {
        dispatch(fetchCart());
    }, [dispatch]);

    return (
        <Fragment>
            <Navbar bg="light" variant="light" expand="lg" collapseOnSelect>
                <Container>
                    <Navbar.Brand as={Link} to="/" className='text-decoration-none col-12 col-md-3'>
                        <h2 className="brand">Tech-Titans</h2>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className='justify-content-between'>
                        <div className="col-12 col-md-6 mt-2 mt-md-0">
                            <Routes>
                                <Route path="*" element={<Search />} />
                            </Routes>
                        </div>
                        <Nav className="col-12 col-md-3 mt-4 mt-md-0 text-center">
                            <Nav.Link as={Link} to="/cart">
                                <GiShoppingBag className="size" />
                                <Badge pill bg="danger" className="ms-1">
                                    {totalItems || 0} {/* Display the total number of items */}
                                </Badge>
                            </Nav.Link>
                            {user ? (
                                <NavDropdown title={<FaUser style={{color: 'black'}} />} id="username" className="ms-3">
                                    {user.role === 'Admin' && (
                                        <NavDropdown.Item as={Link} to="/dashboard">Dashboard</NavDropdown.Item>
                                    )}
                                    <NavDropdown.Item as={Link} to="/orders">Orders</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
                                    <NavDropdown.Item onClick={logoutHandler} className="text-danger">
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) : !loading && (
                                <Nav.Link as={Link} to="/login" className="ms-3">
                                    Login
                                </Nav.Link>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </Fragment>
    );
};

export default Header;