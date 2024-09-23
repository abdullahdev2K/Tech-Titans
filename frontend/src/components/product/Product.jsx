import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import { addToCart, fetchCart } from "../../slices/cartSlice";
import { useDispatch } from 'react-redux';
import { toast } from "react-toastify";
import PropTypes from 'prop-types';

const Product = ({ product }) => {

  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(addToCart({ productId: product._id, quantity: 1 }))
        .unwrap()  // Unwrap the result to handle it directly
        .then(() => {
            // Optionally re-fetch cart to ensure consistency
            dispatch(fetchCart());
            toast.success("Item added to cart");
        })
        .catch((error) => {
            toast.error("Failed to add item to cart");
        });
};

  return (
      <Card className="w-100 shadow-md h-100">
        <Link to={`/product/${product._id}`}>
          <Card.Img 
            variant="top" 
            src={product.images[0]} 
            alt="Product" 
            className="mx-auto"
            style={{ height: '200px', objectFit: 'contain' }} 
          />
        </Link>
        <Card.Body className="d-flex flex-column justify-content-between">
          <Card.Title className='mb-3'>
            <Link to={`/product/${product._id}`} className="text-decoration-none text-dark">
              {product.name}
            </Link>
          </Card.Title>
          <Card.Text>
            PKR {product.price}
          </Card.Text>
          <Card.Footer className="d-flex align-items-end pt-3 px-0 pb-0">
              <Button variant="primary" className='shadow-0' onClick={handleAddToCart}>Add to cart</Button>
              <Button as={Link} to={`/product/${product._id}`} variant="primary" className="ms-auto">
                View Details
              </Button>
          </Card.Footer>
        </Card.Body>
      </Card>
  );
};

Product.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default Product;