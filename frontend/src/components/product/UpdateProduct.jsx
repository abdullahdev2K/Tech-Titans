import { Fragment, useEffect, useState } from "react";
import MetaData from "../layout/MetaData";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { editProduct, fetchProductDetails, clearErrors, resetUpdateProduct } from "../../slices/productSlice";
import Sidebar from "../layout/Sidebar";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Card, Image } from 'react-bootstrap';
import axios from 'axios';

const UpdateProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [countInStock, setCountInStock] = useState(0);
    const [brand, setBrand] = useState("");
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    const [isFeatured, setIsFeatured] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

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

    const { error, product } = useSelector(state => state.products);
    const { loading, error: updateError, isUpdated } = useSelector(state => state.products);

    useEffect(() => {
        if (product && product._id !== id) {
            dispatch(fetchProductDetails(id));
        } else {
            setName(product.name);
            setPrice(product.price);
            setDescription(product.description);
            setCategory(product.category);
            setCountInStock(product.countInStock);
            setBrand(product.brand);
            setIsFeatured(product.isFeatured === true || product.isFeatured === 'true');
            setImagesPreview(product.images);
        }
    
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if (updateError) {
            toast.error(updateError);
            dispatch(clearErrors());
        }
    }, [dispatch, error, isUpdated, navigate, updateError, product, id]);

    const updateProductHandler = async (e) => {
        e.preventDefault();
    
        const updatedProduct = {
            name,
            price,
            description,
            category,
            countInStock,
            brand,
            images,
            isFeatured
        };
    
        const res = await dispatch(editProduct({ id, updatedProduct }));
    
        if (res.type === 'product/editProduct/fulfilled') {
            toast.success("Product updated successfully!");
            navigate("/admin/products");
        } else {
            toast.error('Error updating product');
        }
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
    
                setImagesPreview(prev => [...prev, data.url]);
                setImages(prev => [...prev, data.url]);
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }
    };

    return (
        <Fragment>
            <MetaData title={"Update Product"} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
                <div className="col-12 col-md-10">
                    <Card className="shadow-lg">
                        <Card.Body>
                            <Card.Title className="text-center mb-4">Update Product</Card.Title>
                            <Form onSubmit={updateProductHandler}>
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
                                    {loading ? "Updating..." : "Update Product"}
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </Fragment>
    );
};

export default UpdateProduct;