import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import '../../App.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const [openCategory, setOpenCategory] = useState(null);

    const handleToggle = (category) => {
        setOpenCategory(openCategory === category ? null : category);
    };

    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={toggleSidebar}>×</button>
        <Nav className="flex-column p-3">
            <div>
                <Nav.Link onClick={() => handleToggle('tv')}>TV</Nav.Link>
                {openCategory === 'tv' && (
                    <Nav className="flex-column ms-3">
                    <Nav.Link href="#samsung">Samsung</Nav.Link>
                    <Nav.Link href="#sony">Sony</Nav.Link>
                    </Nav>
                )}
            </div>
            <div>
                <Nav.Link onClick={() => handleToggle('laptops')}>Laptops</Nav.Link>
                {openCategory === 'laptops' && (
                    <Nav className="flex-column ms-3">
                    <Nav.Link href="#windows">Windows</Nav.Link>
                    <Nav.Link href="#mac">Mac</Nav.Link>
                    </Nav>
                )}
            </div>
            <div>
                <Nav.Link onClick={() => handleToggle('smartphones')}>Smartphones</Nav.Link>
                {openCategory === 'smartphones' && (
                    <Nav className="flex-column ms-3">
                    <Nav.Link href="#android">Android</Nav.Link>
                    <Nav.Link href="#ios">iOS</Nav.Link>
                    </Nav>
                )}
            </div>
            {/* Add more categories and subcategories as needed */}
        </Nav>
        </div>
    );
};

export default Sidebar;
