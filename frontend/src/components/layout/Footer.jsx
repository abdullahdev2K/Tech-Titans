import { React,useState,useEffect } from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { Col, Container, Row } from 'react-bootstrap';

const Footer = ({ isDarkMode }) => {

    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    useEffect(() => {
        // This effect runs only once after the component mounts
        setCurrentYear(new Date().getFullYear());
    }, []);

    return (
        <footer className="py-5 bg-light">
            <Container>
                <Row className='mb-3 justify-content-center'>
                    <Col sm={6}>
                        <h2 className='text-center'>Tech Titans</h2>
                    </Col>
                </Row>
                <div className='mb-5 justify-content-center d-flex gap-4 align-items-center'>
                        <a href="#facebook" className="text-dark"><FaFacebook size={24} /></a>
                        <a href="#instagram" className="text-dark"><FaInstagram size={24} /></a>
                        <a href="#twitter" className="text-dark"><FaTwitter size={24} /></a>
                        <a href="#youtube" className="text-dark"><FaYoutube size={24} /></a>
                </div>
                <Row className='mb-4 row-gap-4 row-gap-lg-0 justify-content-center'>
                    <Col sm={6} lg={3}>
                        <h5 className='text-capitalize mb-3 text-center text-sm-start'>About Tech Titans</h5>
                        <p className='text-center text-sm-start'>We provide the latest in technology and gadgets at the best prices. Visit our store or shop online to find what you need.</p>
                    </Col>
                    <Col sm={6} lg={2}>
                        <h5 className='text-capitalize mb-3 text-center text-sm-start'>Quick Links</h5>
                        <ul className='list-unstyled text-center text-sm-start'>
                            <li><a href="#home" className="text-decoration-none text-dark">Home</a></li>
                            <li><a href="#shop" className="text-decoration-none text-dark">Shop</a></li>
                            <li><a href="#deals" className="text-decoration-none text-dark">Latest Deals</a></li>
                            <li><a href="#contact" className="text-decoration-none text-dark">Contact Us</a></li>
                        </ul>
                    </Col>
                    <Col sm={6} lg={2}>
                        <h5 className='text-capitalize mb-3 text-center text-sm-start'>Pages</h5>
                        <ul className='list-unstyled text-center text-sm-start'>
                            <li><a href="#privacy-policy" className='text-dark text-decoration-none'>Privacy Policy</a></li>
                            <li><a href="#terms-conditions" className='text-dark text-decoration-none'>Terms & Conditions</a></li>
                            <li><a href="#return-policy" className='text-dark text-decoration-none'>Return Policy</a></li>
                        </ul>
                    </Col>
                    <Col sm={6} lg={3}>
                        <h5 className='text-capitalize mb-3 text-center text-sm-start'>Contact Us</h5>
                        <p className='text-center text-sm-start'><b>Working Hours:</b> 10 am to 8:30 pm</p>
                        <p className='text-center text-sm-start'><b>WhatsApp:</b> +971 501200046</p>
                        <p className='text-center text-sm-start'><b>Email:</b> support@techtitans.com</p>
                    </Col>
                </Row>
                <Row>
                    <Col className='text-center'>
                        <p className='m-0'>&copy; {currentYear} Tech Titans. All Rights Reserved.</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;