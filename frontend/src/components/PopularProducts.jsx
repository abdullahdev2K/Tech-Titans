import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaHeart } from "react-icons/fa";

const PopularProducts = () => {
    return (
        <section>
            <Container className="my-5">
                <h3 className='mb-4'>Most Liked Products</h3>
                <Row>
                    <Col sm={6} md={6} lg={3} className="d-flex">
                        <Card className="w-100 my-2 shadow-2-strong">
                            <Card.Img src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/1.webp" variant="top" style={{ aspectRatio: '1 / 1' }} />
                            <Card.Body className="d-flex flex-column">
                                <Card.Title>GoPro HERO6 4K Action Camera - Black</Card.Title>
                                <Card.Text>$790.50</Card.Text>
                                <Card.Footer className="d-flex align-items-end pt-3 px-0 pb-0 mt-auto">
                                    <Button variant="primary" className='shadow-0 me-1'>Add to cart</Button>
                                    <Button variant="light" className='border px-2 icon-hover'><FaHeart /></Button>
                                </Card.Footer>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col sm={6} md={6} lg={3} className="d-flex">
                        <Card className="w-100 my-2 shadow-2-strong">
                            <Card.Img src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/1.webp" variant="top" style={{ aspectRatio: '1 / 1' }} />
                            <Card.Body className="d-flex flex-column">
                                <Card.Title>GoPro HERO6 4K Action Camera - Black</Card.Title>
                                <Card.Text>$790.50</Card.Text>
                                <Card.Footer className="d-flex align-items-end pt-3 px-0 pb-0 mt-auto">
                                    <Button variant="primary" className='shadow-0 me-1'>Add to cart</Button>
                                    <Button variant="light" className='border px-2 icon-hover'><FaHeart /></Button>
                                </Card.Footer>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col sm={6} md={6} lg={3} className="d-flex">
                        <Card className="w-100 my-2 shadow-2-strong">
                            <Card.Img src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/1.webp" variant="top" style={{ aspectRatio: '1 / 1' }} />
                            <Card.Body className="d-flex flex-column">
                                <Card.Title>GoPro HERO6 4K Action Camera - Black</Card.Title>
                                <Card.Text>$790.50</Card.Text>
                                <Card.Footer className="d-flex align-items-end pt-3 px-0 pb-0 mt-auto">
                                    <Button variant="primary" className='shadow-0 me-1'>Add to cart</Button>
                                    <Button variant="light" className='border px-2 icon-hover'><FaHeart /></Button>
                                </Card.Footer>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col sm={6} md={6} lg={3} className="d-flex">
                        <Card className="w-100 my-2 shadow-2-strong">
                            <Card.Img src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/1.webp" variant="top" style={{ aspectRatio: '1 / 1' }} />
                            <Card.Body className="d-flex flex-column">
                                <Card.Title>GoPro HERO6 4K Action Camera - Black</Card.Title>
                                <Card.Text>$790.50</Card.Text>
                                <Card.Footer className="d-flex align-items-end pt-3 px-0 pb-0 mt-auto">
                                    <Button variant="primary" className='shadow-0 me-1'>Add to cart</Button>
                                    <Button variant="light" className='border px-2 icon-hover'><FaHeart /></Button>
                                </Card.Footer>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default PopularProducts;
