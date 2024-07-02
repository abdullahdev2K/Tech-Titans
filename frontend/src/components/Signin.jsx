import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebookF } from "react-icons/fa6";

const Signin = ({ isDarkMode }) => {
    return (
        <Container className="py-5">
            <Row className="align-items-center justify-content-center">
                <Col md={8} lg={7} xl={6}>
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" className="img-fluid" alt="Phone image" />
                </Col>
                <Col md={7} lg={5} xl={5} className="offset-xl-1">
                    <form>
                    {/* Email input */}
                    <div data-mdb-input-init className="form-outline mb-4">
                        <label className="form-label" htmlFor="form1Example13">Email address</label>
                        <input type="email" id="form1Example13" className="form-control form-control-lg" />
                    </div>
                    {/* Password input */}
                    <div data-mdb-input-init className="form-outline mb-4">
                        <label className="form-label" htmlFor="form1Example23">Password</label>
                        <input type="password" id="form1Example23" className="form-control form-control-lg" />
                    </div>
                    <div className="d-flex justify-content-around align-items-center mb-4">
                        {/* Checkbox */}
                        <div className="form-check">
                        <input className="form-check-input" type="checkbox" defaultValue id="form1Example3" />
                        <label className="form-check-label" htmlFor="form1Example3"> Remember me </label>
                        </div>
                        <a href="#!">Forgot password?</a>
                    </div>
                    {/* Submit button */}
                    <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg btn-block w-100">Sign in</button>
                    <div className="divider d-flex align-items-center my-4">
                        <p className={`text-center fw-bold mx-3 mb-0 ${ isDarkMode ? 'text-white' : 'text-dark' }`}>
                        {console.log(`isDarkMode: ${isDarkMode}`)}OR</p>
                    </div>
                    <div className='d-flex gap-2'>
                        <a data-mdb-ripple-init className="btn btn-primary btn-lg btn-block" style={{backgroundColor: '#3b5998'}} href="#!" role="button">
                            <i className="fab fa-facebook-f me-2" />Continue with Facebook
                        </a>

                        <a data-mdb-ripple-init className="btn btn-primary btn-lg btn-block" style={{backgroundColor: '#55acee'}} href="#!" role="button">
                            <i className="fab fa-twitter me-2" />Continue with Google
                        </a>
                    </div>
                    </form>
                </Col>
            </Row>
        </Container>
    );
}

export default Signin;