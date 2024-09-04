import { Fragment, useEffect, useState } from "react";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addProduct, clearErrors, resetAddProduct } from "../../slices/productSlice.js";
import Sidebar from "../layout/Sidebar.jsx";
import { Form, Button, Row, Col, Card, Image } from 'react-bootstrap';
import axios from 'axios';

const AddNewProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [brand, setBrand] = useState('');
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [isFeatured, setIsFeatured] = useState(false);

  const categories = [
    'Select Category',
    'Gaming',
    'Laptop/PC',
    'Mobiles/Tablets',
    'Accessories',
    'Tv & Entertainment',
    'Washing Machines',
    'Refrigerators',
    'Personal Care',
    'Air Conditioners'
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, success } = useSelector(state => state.products);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      navigate("/dashboard");
      toast.success("New Product Added successfully");
      dispatch(resetAddProduct());
    }
  }, [dispatch, error, success, navigate]);

  const addProductHandler = (e) => {
    e.preventDefault();

    const formData = {
        name,
        price,
        description,
        category,
        countInStock,
        brand,
        images,
        isFeatured: isFeatured.toString()
    };

    dispatch(addProduct(formData));
  };


  const onChange = async (e) => {
    const files = Array.from(e.target.files);
    setImagesPreview([]);
    setImages([]);

    for (const file of files) {
      const formData = new FormData();
      formData.append('image', file);

      try {
        const { data } = await axios.post('http://localhost:8080/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        setImagesPreview(oldArray => [...oldArray, data.url]);
        setImages(oldArray => [...oldArray, data.url]);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  return (
    <Fragment>
      <MetaData title={'Add New Product'} />
      <Row className="no-gutters">
        <Col md={2} className="bg-dark text-light vh-100">
          <Sidebar />
        </Col>
        <Col md={10} className="p-4">
          <Card className="shadow-lg">
            <Card.Body>
              <Card.Title className="text-center mb-4">Add New Product</Card.Title>
              <Form onSubmit={addProductHandler}>
                <Form.Group controlId="name_field">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter product name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="price_field">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="description_field">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Enter product description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="category_field">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    as="select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="countInStock_field">
                  <Form.Label>Stock</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter stock quantity"
                    value={countInStock}
                    onChange={(e) => setCountInStock(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="brand_field">
                  <Form.Label>Brand</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter brand name"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Images</Form.Label>
                  <Form.Control
                    type="file"
                    name="product_images"
                    onChange={onChange}
                    multiple
                  />
                  <Form.Text className="text-muted">
                    Choose images for the product
                  </Form.Text>
                  <div className="mt-3 d-flex flex-wrap">
                    {imagesPreview.map((img, index) => (
                      <Image src={img} key={index} alt="Preview" width="100" height="100" className="mr-2 mb-2" />
                    ))}
                  </div>
                </Form.Group>

                <Form.Group controlId="isFeatured_field">
                  <Form.Check
                    type="checkbox"
                    label="Feature this product"
                    checked={isFeatured}
                    className="mb-2"
                    onChange={() => setIsFeatured(!isFeatured)}
                  />
                </Form.Group>

                <Button type="submit" variant="primary" block="true" disabled={loading}>
                  {loading ? "Adding..." : "Add Product"}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default AddNewProduct;