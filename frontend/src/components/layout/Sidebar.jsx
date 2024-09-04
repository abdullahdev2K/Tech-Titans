import React from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';

const Sidebar = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="md" className="flex-column vh-100 p-3">
            <Navbar.Brand href="/dashboard">
                <i className="fa fa-tachometer"></i> Dashboard
            </Navbar.Brand>
            <Nav className="flex-column w-100">
                <NavDropdown title={<span><i className="fa fa-product-hunt"></i> Products</span>} id="productSubmenu">
                    <NavDropdown.Item as={Link} to="/admin/products">
                        <i className="fa fa-clipboard"></i> Show All Products
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/addNewProduct">
                        <i className="fa fa-plus"></i> Add New Product
                    </NavDropdown.Item>
                </NavDropdown>
                <Nav.Link as={Link} to="/admin/orders">
                    <i className="fa fa-shopping-basket"></i> Orders
                </Nav.Link>
                <Nav.Link as={Link} to="/admin/users">
                    <i className="fa fa-users"></i> Users
                </Nav.Link>
                <Nav.Link as={Link} to="/admin/reviews">
                    <i className="fa fa-star"></i> Reviews
                </Nav.Link>
            </Nav>
        </Navbar>
    );
};

export default Sidebar;