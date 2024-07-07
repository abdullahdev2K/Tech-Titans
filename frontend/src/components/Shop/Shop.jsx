import React from 'react';
import ShopHero from '../HeroGeneral.jsx';
import Categories from '../Categories.jsx';
import LatestProducts from '../LatestProducts.jsx';
import PopularProducts from '../PopularProducts.jsx';
import { Container, Card, Row, Col } from 'react-bootstrap';

const Shop = () => {
    return (
        <>
            <ShopHero />
            <Categories />
            <LatestProducts />
            <section>
                <Container>
                    <Card className="p-4 bg-primary">
                        <Row className="align-items-center">
                            <Col lg={10}>
                                <h4 className="mb-0 text-white">Best products and brands in store</h4>
                                <p className="mb-0 text-white-50">Trendy products and text to build on the card title</p>
                            </Col>
                            <Col lg={2}>
                                <a className="btn btn-danger text-white shadow-0" href="#">Discover</a>
                            </Col>
                        </Row>
                    </Card>
                </Container>
            </section>
            <PopularProducts />
        </>
    );
}

export default Shop;