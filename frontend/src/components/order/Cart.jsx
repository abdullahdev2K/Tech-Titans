import { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, removeItemFromCart } from "../../slices/cartSlice.js";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems, loading } = useSelector((state) => state.cart);

  const removeCartItemHandle = (id) => {
    dispatch(removeItemFromCart(id));
  }

  const increaseQty = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (newQty > stock) return;

    dispatch(addItemToCart({ id, quantity: newQty }));
  }

  const decreaseQty = (id, quantity) => {
    const newQty = quantity - 1;
    if (newQty <= 0) return;

    dispatch(addItemToCart({ id, quantity: newQty }));
  }

  const checkoutHandler = () => {
    navigate("/login?redirect=shipping");
  }

  return (
    <Fragment>
      <MetaData title="Your Cart" />
      {loading ? (
        <div>Loading...</div>
      ) : cartItems.length === 0 ? (
        <div className="cart0 pt-1 pb-2 mt-3 text-center">
          <img width="60" height="60" className="czero" src="images/empty-cart.png" alt="cart" />
          <h2 className='mt-1 white'> Your Cart is Empty </h2>
        </div>
      ) : (
        <Fragment>
          <h2 className="mt-5 white text-center">
            Your Cart: <b> {cartItems.length} items</b>
          </h2>

          <div className="row mt-3 d-flex box-cart justify-content-between">
            <div className="col-12 col-lg-8">
              {cartItems.map((item) => (
                <Fragment key={item.product}>
                  <hr />
                  <div className="cart-item">
                    <div className="row">
                      <div className="col-4 col-lg-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          height="90"
                          width="115"
                        />
                      </div>
                      <div className="col-5 col-lg-3">
                        <Link to={`/products/${item.product}`}>
                          <span className="purple">
                            {item.name}
                          </span>
                        </Link>
                      </div>
                      <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                        <p id="card_item_price">${item.price}</p>
                      </div>
                      <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                        <div className="stockCounter d-inline">
                          <span className="btn btn-danger minus"
                            onClick={() => decreaseQty(item.product, item.quantity)}
                          >-</span>
                          <input
                            type="number"
                            className="form-control count d-inline"
                            value={item.quantity}
                            readOnly />
                          <span className="btn btn-primary plus"
                            onClick={() => increaseQty(item.product, item.quantity, item.stock)}
                          >+</span>
                        </div>
                      </div>

                      <div className="col-4 col-lg-1 mt-5 mt-lg-1">
                        <i id="delete_cart_item"
                          className="fa fa-trash btn btn-danger"
                          onClick={() => removeCartItemHandle(item.product)}
                        ></i>
                      </div>
                    </div>
                  </div>
                  <hr />
                </Fragment>
              ))}
            </div>

            <div className="col-12 col-lg-3 my-4">
              <div id="order_summary">
                <h3 className="summary">Order Summary</h3>
                <hr />
                <p>
                  <span className="crimson"> Subtotal:{" "}</span>
                  <span className="order-summary-values"> {cartItems.reduce((acc, item) => (acc + Number(item.quantity)), 0)} (Units)</span>
                </p>
                <p>
                  <span className="crimson"> Est. total:{" "}</span>
                  <span className="order-summary-values">
                    {cartItems.reduce((acc, item) => (acc + item.quantity * item.price), 0).toFixed(2)} $
                  </span>
                </p>

                <hr />
                <button onClick={checkoutHandler} id="checkout_btn" className="btn btn-primary btn-block">
                  Check out
                </button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Cart;