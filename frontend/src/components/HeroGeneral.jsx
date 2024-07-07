import React from 'react';
import { Carousel } from 'react-bootstrap';
import EuroCup from '../assets/images/Baseeta_EuroCup_Add10_HS_E_1.jpeg';
import SamsungEuro from '../assets/images/Euro24_Samsung60TVss_HS_E.jpeg';
import Iphone15 from '../assets/images/iPhone15ProMax_TabbyTamara_HS_E.jpeg';
import SamsungHajjOffer from '../assets/images/S24BNPL_HS_E_2.png';

const HomeHero = () => {
    return (
        <Carousel>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={EuroCup}
                    alt="First slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={SamsungEuro}
                    alt="Second slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={Iphone15}
                    alt="Third slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={SamsungHajjOffer}
                    alt="Fourth slide"
                />
            </Carousel.Item>
        </Carousel>
    );
}

export default HomeHero;
