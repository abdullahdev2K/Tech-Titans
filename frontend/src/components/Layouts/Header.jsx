import React from 'react';
import { Container, Nav, Navbar, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { FaBars, FaShoppingCart, FaSignInAlt, FaHeart, FaSun, FaMoon, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Header = ({ toggleSidebar, toggleTheme, isDarkMode }) => {
    return (
        <header>
            {/* Primary Navbar */}
            <Navbar className='d-none d-lg-flex py-3' bg={isDarkMode ? "dark" : "light"} variant={isDarkMode ? "dark" : "light"} expand="lg">
                <Container>
                    <Navbar.Brand>
                        <Link to="/">
                            <h2 className='mb-0 fw-bold'>Tech Titans</h2>
                        </Link>
                    </Navbar.Brand>
                    <Form className="d-flex align-items-center" style={{ position: 'relative', flex: 1, maxWidth: '600px' }}>
                        <FormControl
                            type="search"
                            placeholder="Search"
                            className='w-100 rounded-5'
                            aria-label="Search"
                            style={{ paddingRight: '2.5rem'}}
                        />
                        <FaSearch style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', color: '#6c757d' }} />
                    </Form>
                    <Nav className="d-flex align-items-center gap-1 gap-lg-2">
                        <Nav.Link href="#wishlist"><FaHeart style={{ marginBottom: '4px', marginRight:'4px' }} />Wishlist</Nav.Link>
                        <Nav.Link href="#cart"><FaShoppingCart style={{ marginBottom: '4px' , marginRight:'4px' }} />Cart</Nav.Link>
                        <Nav.Link>
                            <Link to="/signin">
                                <FaSignInAlt style={{ marginBottom: '4px', marginRight:'4px' }} /> Sign In
                            </Link>
                        </Nav.Link>
                        <Button variant={isDarkMode ? "outline-light" : "outline-secondary"} onClick={toggleTheme}>
                            {isDarkMode ? <FaSun style={{ marginBottom: '4px' }} /> : <FaMoon style={{ marginBottom: '4px' }} />}
                        </Button>
                    </Nav>
                </Container>
            </Navbar>

            <hr className='m-0 d-none d-lg-block' />

            {/* Secondary Navbar */}
            <Navbar bg={isDarkMode ? "dark" : "light"} variant={isDarkMode ? "dark" : "light"} expand="lg">
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Brand className='d-lg-none m-0' href="#home"><h2 className='mb-0 fw-bold'>Tech Titans</h2></Navbar.Brand>
                    <div className='d-flex flex-row d-lg-none gap-2'>
                        <Button className='bg-transparent p-1 border-0' onClick={toggleTheme}>
                            {isDarkMode ? <FaSun style={{ marginBottom: '4px' }} /> : <FaMoon style={{ marginBottom: '4px' }} />}
                        </Button>
                        <Button className='bg-transparent p-1 border-0' >
                            <FaSignInAlt style={{ marginBottom: '4px' }} />
                        </Button>
                        <Button className='bg-transparent p-1 border-0' >
                            <FaShoppingCart style={{ marginBottom: '4px' }} />
                        </Button>
                    </div>
                    <Navbar.Collapse className='justify-content-center px-3 px-lg-0' id="basic-navbar-nav">
                        <Form className="d-flex d-lg-none align-items-center mt-3" style={{ position: 'relative', flex: 1, maxWidth: '600px' }}>
                            <FormControl
                                type="search"
                                placeholder="Search"
                                className="w-100 rounded-5 mb-3"
                                aria-label="Search"
                                style={{ paddingRight: '2.5rem'}}
                            />
                            <FaSearch style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-100%)', color: '#6c757d' }} />
                        </Form>
                        <Nav className="gap-2 gap-lg-5">
                            <Nav.Link className='d-none d-lg-block' href="#categories" onClick={toggleSidebar}>
                                <FaBars style={{ marginBottom: '4px' }} /> Categories
                            </Nav.Link>
                            <Nav.Link>
                                <Link to="/">
                                    Home
                                </Link>
                            </Nav.Link>
                            <Nav.Link>
                                <Link to="/shop">
                                    Shop
                                </Link>
                            </Nav.Link>
                            <NavDropdown title="Categories" id="basic-nav-dropdown" className='d-lg-none'>
                                <NavDropdown.Item href="#action/3.1">TV</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.2">
                                    Gaming
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.3">Home Appliances</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">
                                    Computers & Laptops
                                </NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href="#deals">Latest Deals</Nav.Link>
                            <Nav.Link href="#contact">Contact Us</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;
