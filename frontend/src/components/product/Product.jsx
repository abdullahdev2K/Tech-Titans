import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

const Product = ({ product }) => {
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
              <Button variant="primary" className='shadow-0'>Add to cart</Button>
              <Button as={Link} to={`/product/${product._id}`} variant="primary" className="ms-auto">
                View Details
              </Button>
          </Card.Footer>
        </Card.Body>
      </Card>
  );
};

export default Product;