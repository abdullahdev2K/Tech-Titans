import React, { Fragment, useState, useEffect } from "react";
import MetaData from "../components/layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../slices/productSlice";
import 'rc-slider/assets/index.css';
import Product from '../components/product/Product';
import Loader from "../components/layout/Loader";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Container, Row, Col, Carousel } from 'react-bootstrap';
import EuroCup from '../assets/Baseeta_EuroCup_Add10_HS_E_1.jpeg';
import SamsungEuro from '../assets/Euro24_Samsung60TVss_HS_E.jpeg';
import Iphone15 from '../assets/iPhone15ProMax_TabbyTamara_HS_E.jpeg';
import SamsungHajjOffer from '../assets/S24BNPL_HS_E_2.png';
import InstaItem1 from '../assets/insta-item1.jpg';
import InstaItem2 from '../assets/insta-item2.jpg';
import InstaItem3 from '../assets/insta-item3.jpg';
import InstaItem4 from '../assets/insta-item4.jpg';
import InstaItem5 from '../assets/insta-item5.jpg';
import ShopNowAdv from '../assets/summer_LastPieceDeal_Full_E.png';
import { FaMobile, FaLaptop, FaCameraRetro } from "react-icons/fa";
import { IoTvSharp } from "react-icons/io5";
import { CgSmartHomeRefrigerator } from "react-icons/cg";
import { GiWashingMachine, GiConsoleController } from "react-icons/gi";
import { PiHairDryerFill } from "react-icons/pi";
import { TbAirConditioning, TbTruckDelivery} from "react-icons/tb";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { RiCustomerService2Fill } from "react-icons/ri";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { MdOutlineHighQuality } from "react-icons/md";

// const { Range, Tooltip } = Slider;

const Homepage = () => {
    // const [currentPage, setCurrentPage] = useState(1);
    // const [price, setPrice] = useState([1, 1000]);
    // const [category, setCategory] = useState("");
    // const [rating, setRating] = useState(0);

    // const categories = [
    //     'Select Category',
    //     'Gaming',
    //     'Laptop/PC',
    //     'Mobiles/Tablets',
    //     'Accessories',
    //     'Tv & Entertainment',
    //     'Washing Machines',
    //     'Refrigerators',
    //     'Personal Care',
    //     'Air Conditioners'
    // ];

    const dispatch = useDispatch();
    const { loading, products, error } = useSelector(state => state.products);

    // const { keyword } = useParams();

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
        dispatch(fetchProducts());
    }, [dispatch, error]);

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={"Purchase Best Products in the City"} />

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

                    <section className="pt-5">
                        <Container>
                            <h3 className='mb-4'>Shop By Categories</h3>
                            <Row className="gy-4">
                                <Col md={12}>
                                    <Row>
                                        <Col className="col-3">
                                            <a href="#" className="text-center d-flex flex-column justify-content-center text-decoration-none">
                                                <button type="button" className="btn btn-outline-secondary mx-auto p-3 mb-2" data-mdb-ripple-color="dark">
                                                    <FaMobile size={24} />
                                                </button>
                                                <div className="text-dark">Mobiles & Tablets</div>
                                            </a>
                                        </Col>
                                        <Col className="col-3">
                                            <a href="#" className="text-center d-flex flex-column justify-content-center text-decoration-none">
                                                <button type="button" className="btn btn-outline-secondary mx-auto p-3 mb-2" data-mdb-ripple-color="dark">
                                                    <FaLaptop size={24} />
                                                </button>
                                                <div className="text-dark">Computing</div>
                                            </a>
                                        </Col>
                                        <Col className="col-3">
                                            <a href="#" className="text-center d-flex flex-column justify-content-center text-decoration-none">
                                                <button type="button" className="btn btn-outline-secondary mx-auto p-3 mb-2" data-mdb-ripple-color="dark">
                                                    <IoTvSharp size={24} />
                                                </button>
                                                <div className="text-dark">Entertainment</div>
                                            </a>
                                        </Col>
                                        <Col className="col-3">
                                            <a href="#" className="text-center d-flex flex-column justify-content-center text-decoration-none">
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
                                            <a href="#" className="text-center d-flex flex-column justify-content-center text-decoration-none">
                                                <button type="button" className="btn btn-outline-secondary mx-auto p-3 mb-2" data-mdb-ripple-color="dark">
                                                    <GiWashingMachine size={24} />
                                                </button>
                                                <div className="text-dark">Washing Machines</div>
                                            </a>
                                        </Col>
                                        <Col className="col-3">
                                            <a href="#" className="text-center d-flex flex-column justify-content-center text-decoration-none">
                                                <button type="button" className="btn btn-outline-secondary mx-auto p-3 mb-2" data-mdb-ripple-color="dark">
                                                    <GiConsoleController size={24} />
                                                </button>
                                                <div className="text-dark">Gaming</div>
                                            </a>
                                        </Col>
                                        <Col className="col-3">
                                            <a href="#" className="text-center d-flex flex-column justify-content-center text-decoration-none">
                                                <button type="button" className="btn btn-outline-secondary mx-auto p-3 mb-2" data-mdb-ripple-color="dark">
                                                    <PiHairDryerFill size={24} />
                                                </button>
                                                <div className="text-dark">Personal Care</div>
                                            </a>
                                        </Col>
                                        <Col className="col-3">
                                            <a href="#" className="text-center d-flex flex-column justify-content-center text-decoration-none">
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

                    <section className="pt-5">
                        <Container>
                            <h3>New Arrivals</h3>
                            <Row>
                                {products && products.map(product => (
                                    <Col sm={12} md={6} lg={3} key={product._id} className="my-4">
                                        <Product product={product} />
                                    </Col>
                                ))}
                            </Row>
                        </Container>
                    </section>


                    <img
                        className="d-block w-100 my-4"
                        src={ShopNowAdv}
                        alt="Shop Now Advertisement"
                    />

                    <section className="pt-5">
                        <Container className="text-dark">
                            <h3 className="mb-4">Why Choose Us</h3>
                            <Row className="mb-4">
                                <Col md={6} lg={4}>
                                    <figure className="d-flex align-items-center mb-4">
                                        <span className="rounded-circle bg-white p-3 d-flex me-2 mb-2">
                                            <MdOutlineHighQuality size={32} className="text-primary floating" />
                                        </span>
                                        <figcaption className="info">
                                            <h6 className="title">Premium Quality Products</h6>
                                            <p>We offer a carefully curated selection of top-quality electronics from trusted brands, ensuring you get the best value for your money.</p>
                                        </figcaption>
                                    </figure>
                                </Col>
                                <Col md={6} lg={4}>
                                    <figure className="d-flex align-items-center mb-4">
                                        <span className="rounded-circle bg-white p-3 d-flex me-2 mb-2">
                                            <RiCustomerService2Fill size={32} className="text-primary floating" />
                                        </span>
                                        <figcaption className="info">
                                            <h6 className="title">Unmatched Customer Support</h6>
                                            <p>Our dedicated customer support team is available 24/7 to assist you with any inquiries or issues, providing a seamless shopping experience.</p>
                                        </figcaption>
                                    </figure>
                                </Col>
                                <Col md={6} lg={4}>
                                    <figure className="d-flex align-items-center mb-4">
                                        <span className="rounded-circle bg-white p-3 d-flex me-2 mb-2">
                                            <AiOutlineDollarCircle size={32} className="text-primary floating" />
                                        </span>
                                        <figcaption className="info">
                                            <h6 className="title">Competitive Pricing</h6>
                                            <p>Enjoy the latest electronics at competitive prices with regular discounts and special offers, making cutting-edge technology more affordable.</p>
                                        </figcaption>
                                    </figure>
                                </Col>
                                <Col md={6} lg={4}>
                                    <figure className="d-flex align-items-center mb-4">
                                        <span className="rounded-circle bg-white p-3 d-flex me-2 mb-2">
                                            <TbTruckDelivery size={32} className="text-primary floating" />
                                        </span>
                                        <figcaption className="info">
                                            <h6 className="title">Fast and Secure Shipping</h6>
                                            <p>We prioritize fast delivery and secure packaging to ensure your products arrive safely and on time, no matter where you are.</p>
                                        </figcaption>
                                    </figure>
                                </Col>
                                <Col md={6} lg={4}>
                                    <figure className="d-flex align-items-center mb-4">
                                        <span className="rounded-circle bg-white p-3 d-flex me-2 mb-2">
                                            <FaMoneyCheckDollar size={32} className="text-primary floating" />
                                        </span>
                                        <figcaption className="info">
                                            <h6 className="title">Easy Returns and Refunds</h6>
                                            <p>Our hassle-free return and refund policy gives you peace of mind, allowing you to shop confidently knowing you can easily return any item.</p>
                                        </figcaption>
                                    </figure>
                                </Col>
                                <Col md={6} lg={4}>
                                    <figure className="d-flex align-items-center mb-4">
                                        <span className="rounded-circle bg-white p-3 d-flex me-2 mb-2">
                                            <FaCameraRetro size={32} className="text-primary floating" />
                                        </span>
                                        <figcaption className="info">
                                            <h6 className="title">Secure Payment Options</h6>
                                            <p>We offer a variety of secure payment methods, including credit cards, PayPal, and more, to ensure your transactions are safe and protected.</p>
                                        </figcaption>
                                    </figure>
                                </Col>
                            </Row>
                        </Container>
                    </section>

                    <section id="instagram" className="bg-light">
                        <Container>
                            <Row>
                                <div className="display-header text-uppercase text-dark text-center py-3">
                                    <h2 className="display-7">Shop Our Insta</h2>
                                </div>
                                <div className="d-flex">
                                    <figure className="instagram-item pe-2 w-25">
                                    
                                        <img
                                            className="d-block w-100 h-100 object-fit-cover"
                                            src={InstaItem1}
                                            alt="First slide"
                                        />
                                    </figure>
                                    <figure className="instagram-item pe-2 w-25">
                                    
                                        <img
                                            className="d-block w-100 h-100 object-fit-cover"
                                            src={InstaItem2}
                                            alt="First slide"
                                        />
                                    </figure>
                                    <figure className="instagram-item pe-2 w-25">
                                    
                                        <img
                                            className="d-block w-100 h-100 object-fit-cover"
                                            src={InstaItem3}
                                            alt="First slide"
                                        />
                                    </figure>
                                    <figure className="instagram-item pe-2 w-25">
                                    
                                        <img
                                            className="d-block w-100 h-100 object-fit-cover"
                                            src={InstaItem4}
                                            alt="First slide"
                                        />
                                    </figure>
                                </div>
                            </Row>
                        </Container>
                    </section>



                </Fragment>
            )}
        </Fragment>
    );
};

export default Homepage;