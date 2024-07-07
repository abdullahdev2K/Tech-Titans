import React from 'react';
import HomeHero from '../HeroGeneral.jsx';
import LatestProducts from '../LatestProducts.jsx';
import WhyChooseUs from './WhyChooseUs.jsx';
import Categories from '../Categories.jsx';
import ShopNowAdv from '../../assets/images/summer_LastPieceDeal_Full_E.png';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <>
            <HomeHero />
            <Categories />
            <LatestProducts />
            <Link to="/shop">
                <img
                    className="d-block w-100"
                    src={ShopNowAdv}
                    alt="Shop Now Advertisement"
                />
            </Link>
            <WhyChooseUs />
        </>
    );
}

export default Home;