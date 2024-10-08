import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import Order_Success from '../../assets/order_success.jpg';

const OrderSuccess = () => {
  return (
    <Fragment>
      <MetaData title={"Order Success"} />
      <div className="row justify-content-center box-success">
        <div className="col-6 mt-5 text-center purple">
          <img
            className="my-5 img-fluid d-block mx-auto"
            src={Order_Success}
            alt="Order Success"
            width="200"
            height="200"
          />
          <h2>Your Order has been placed successfully.</h2>
          <Link to="/orders">Go to Orders</Link>
        </div>
      </div>
    </Fragment>
  );
};

export default OrderSuccess;