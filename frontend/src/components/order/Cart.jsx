import { Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Row, Col, Image, Button, Form, Container, Spinner, Card } from "react-bootstrap";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeCartItem, fetchCart, clearCart } from "../../slices/cartSlice.js";
import EmptyCart from '../../assets/shopping.png';
import { FaTrashAlt } from "react-icons/fa";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, totalItems, totalPrice, loading } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const removeCartItemHandle = (id) => {
    dispatch(removeCartItem(id)).then(() => {
        dispatch(fetchCart()); // Refetch cart to reflect the updated state
    });
  };

  const handleClearCart = () => {
    dispatch(clearCart()).then(() => {
        dispatch(fetchCart()); // Refetch cart to reflect the updated state
    });
  };

  const increaseQty = (id, currentQuantity, stock) => {
    const newQty = currentQuantity + 1; 
    if (newQty > stock) return;

    dispatch(addToCart({ productId: id, quantity: newQty }))
        .then(() => {
            dispatch(fetchCart()); // Refetch the cart to ensure the state is correct
        });
  };

  const decreaseQty = (id, currentQuantity) => {
      const newQty = currentQuantity - 1;
      if (newQty <= 0) return;

      dispatch(addToCart({ productId: id, quantity: newQty }))
          .then(() => {
              dispatch(fetchCart()); // Refetch the cart to ensure the state is correct
          });
  };

  const checkoutHandler = () => {
    navigate("/shipping");
  };

  return (
    <Fragment>
      <MetaData title="Your Cart" />
      <Container className="py-5">
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : Array.isArray(items) && items.length === 0 ? (
          <div className="text-center">
            <Image src={EmptyCart} width="150" height="150" alt="Empty Cart" />
            <h2 className="mt-3">Your Cart is Empty</h2>
          </div>
        ) : (
          <Fragment>
            <h2 className="text-center mb-4">Your Cart: <b>{totalItems} items</b></h2>
            <Row>
              <Col lg={8}>
                {items?.map((item) => (
                  <Card className="mb-4" key={item.product._id}>
                    <Card.Body>
                      <Row className="align-items-center">
                        <Col md={2}>
                          {/* Accessing the first image in the 'images' array */}
                          <Image src={item.product.images[0]} alt={item.product.name} fluid rounded />
                        </Col>
                        <Col md={3}>
                          {/* Correctly linking to the product page */}
                          <Link to={`/products/${item.product._id}`} className="text-decoration-none text-black">
                            <h5>{item.product.name}</h5>
                          </Link>
                        </Col>
                        <Col md={2}>
                          <h5>PKR {item.price}</h5>
                        </Col>
                        <Col md={3}>
                          <div className="d-flex align-items-center">
                            <Button variant="outline-danger" size="sm" onClick={() => decreaseQty(item.product._id, item.quantity)}>-</Button>
                            <Form.Control type="number" value={item.quantity} readOnly className="text-center mx-2" style={{ width: "60px" }} />
                            <Button variant="outline-primary" size="sm" onClick={() => increaseQty(item.product._id, item.quantity, item.product.stock)}>+</Button>
                          </div>
                        </Col>
                        <Col md={2} className="text-center">
                          <Button variant="danger" onClick={() => removeCartItemHandle(item._id)}>
                              <FaTrashAlt />
                          </Button>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                ))}
                <Button onClick={handleClearCart} className="w-100" variant="primary">
                  Clear All Items
                </Button>
              </Col>

              <Col lg={4}>
                <Card>
                  <Card.Body>
                    <h3>Order Summary</h3>
                    <hr />
                    <Row>
                      <Col>Subtotal:</Col>
                      <Col className="text-end">{totalItems} Units</Col>
                    </Row>
                    <Row>
                      <Col>Est. Total:</Col>
                      <Col className="text-end">PKR {totalPrice ? totalPrice.toFixed(2) : '0.00'}</Col>
                    </Row>
                    <hr />
                    <Button onClick={checkoutHandler} className="w-100" variant="primary">
                      Proceed to Checkout
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Fragment>
        )}
      </Container>
    </Fragment>
  );
};

export default Cart;