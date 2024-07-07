import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaMobile, FaLaptop } from "react-icons/fa";
import { IoTvSharp } from "react-icons/io5";
import { CgSmartHomeRefrigerator } from "react-icons/cg";
import { GiWashingMachine, GiConsoleController } from "react-icons/gi";
import { PiHairDryerFill } from "react-icons/pi";
import { TbAirConditioning } from "react-icons/tb";

const Categories = () => {
    return (
        <section>
            <Container className="pt-5">
                <h3 className='mb-4'>Shop By Categories</h3>
                <Row className="gy-4">
                    <Col md={12}>
                        <Row>
                            <Col className="col-3">
                                <a href="#" className="text-center d-flex flex-column justify-content-center">
                                    <button type="button" className="btn btn-outline-secondary mx-auto p-3 mb-2" data-mdb-ripple-color="dark">
                                        <FaMobile size={24} />
                                    </button>
                                    <div className="text-dark">Mobiles & Tablets</div>
                                </a>
                            </Col>
                            <Col className="col-3">
                                <a href="#" className="text-center d-flex flex-column justify-content-center">
                                    <button type="button" className="btn btn-outline-secondary mx-auto p-3 mb-2" data-mdb-ripple-color="dark">
                                        <FaLaptop size={24} />
                                    </button>
                                    <div className="text-dark">Computing</div>
                                </a>
                            </Col>
                            <Col className="col-3">
                                <a href="#" className="text-center d-flex flex-column justify-content-center">
                                    <button type="button" className="btn btn-outline-secondary mx-auto p-3 mb-2" data-mdb-ripple-color="dark">
                                        <IoTvSharp size={24} />
                                    </button>
                                    <div className="text-dark">Entertainment</div>
                                </a>
                            </Col>
                            <Col className="col-3">
                                <a href="#" className="text-center d-flex flex-column justify-content-center">
                                    <button type="button" className="btn btn-outline-secondary mx-auto p-3 mb-2" data-mdb-ripple-color="dark">
                                        <CgSmartHomeRefrigerator size={24} />
                                    </button>
                                    <div className="text-dark">Refrigerators</div>
                                </a>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={12}>
                        <Row>
                            <Col className="col-3">
                                <a href="#" className="text-center d-flex flex-column justify-content-center">
                                    <button type="button" className="btn btn-outline-secondary mx-auto p-3 mb-2" data-mdb-ripple-color="dark">
                                        <GiWashingMachine size={24} />
                                    </button>
                                    <div className="text-dark">Washing Machines</div>
                                </a>
                            </Col>
                            <Col className="col-3">
                                <a href="#" className="text-center d-flex flex-column justify-content-center">
                                    <button type="button" className="btn btn-outline-secondary mx-auto p-3 mb-2" data-mdb-ripple-color="dark">
                                        <GiConsoleController size={24} />
                                    </button>
                                    <div className="text-dark">Gaming</div>
                                </a>
                            </Col>
                            <Col className="col-3">
                                <a href="#" className="text-center d-flex flex-column justify-content-center">
                                    <button type="button" className="btn btn-outline-secondary mx-auto p-3 mb-2" data-mdb-ripple-color="dark">
                                        <PiHairDryerFill size={24} />
                                    </button>
                                    <div className="text-dark">Personal Care</div>
                                </a>
                            </Col>
                            <Col className="col-3">
                                <a href="#" className="text-center d-flex flex-column justify-content-center">
                                    <button type="button" className="btn btn-outline-secondary mx-auto p-3 mb-2" data-mdb-ripple-color="dark">
                                        <TbAirConditioning size={24} />
                                    </button>
                                    <div className="text-dark">Air Conditioner</div>
                                </a>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default Categories;