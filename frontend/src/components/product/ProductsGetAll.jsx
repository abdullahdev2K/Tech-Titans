import { Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { Row, Col, Container, Button, Card } from "react-bootstrap";
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";
import { fetchAdminProducts, deleteProduct, clearErrors, resetDeleteProduct } from "../../slices/productSlice";
import Sidebar from "../layout/Sidebar.jsx";
import { FaEye, FaPencilAlt, FaTrashAlt } from "react-icons/fa";

const ProductsGetAll = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error, products } = useSelector(state => state.products);
    const { error: deleteError, isDeleted } = useSelector(state => state.products);

    useEffect(() => {
        dispatch(fetchAdminProducts());
    
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
    
        if (deleteError) {
            toast.error(deleteError);
            dispatch(clearErrors());
        }
    
        if (isDeleted) {
            toast.success("Product deleted successfully!");
            navigate("/admin/products");
            dispatch(resetDeleteProduct());
        }
    }, [dispatch, error, deleteError, isDeleted, navigate]);

    const setProducts = () => {
        const data = {
            columns: [
                { label: "Image", field: "images", sort: "disabled" },
                { label: "ID", field: "id", sort: "asc" },
                { label: "Name", field: "name", sort: "asc" },
                { label: "Price", field: "price", sort: "asc" },
                { label: "Stock", field: "stock", sort: "asc" },
                { label: "Actions", field: "actions", sort: "disabled" },
            ],
            rows: []
        };
    
        products && products.forEach(product => {
            const imageUrl = product.images && product.images.length > 0 ? product.images[0] : "default-image-url";
            
            data.rows.push({
                id: product._id,
                name: product.name,
                price: `PKR ${product.price}`,
                stock: product.countInStock,
                actions: (
                    <div className="d-flex justify-content-center">
                        <Link to={`/product/${product._id}`} title="View Product" className="btn btn-outline-success btn-sm mx-1">
                            <FaEye />
                        </Link>
                        <Link to={`/admin/updateproduct/${product._id}`} title="Update Product" className="btn btn-outline-info btn-sm mx-1">
                            <FaPencilAlt />
                        </Link>
                        <Button variant="outline-danger" size="sm" title="Delete Product" onClick={() => deleteProductHandler(product._id)} className="mx-1">
                            <FaTrashAlt />
                        </Button>
                    </div>
                ),
                images: <img src={imageUrl} alt={product.name} className="img-fluid img-thumbnail" style={{ maxWidth: "60px" }} />
            });
        });
    
        return data;
    };
    

    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id));
    };

    return (
        <Fragment>
            <MetaData title={"Show All Products"} />
            <Container fluid>
                <Row className="mt-4">
                    <Col md={2}>
                        <Sidebar />
                    </Col>
                    <Col md={10}>
                        <Card className="shadow-sm border-0">
                            <Card.Header className="bg-primary text-white text-center">
                                <h4 className="mb-0">All Products</h4>
                            </Card.Header>
                            <Card.Body>
                                {loading ? <Loader /> : (
                                    <MDBDataTable
                                        data={setProducts()}
                                        className="table table-hover mb-0"
                                        bordered
                                        striped
                                        responsive
                                        style={{ cursor: 'pointer' }}
                                    />
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};

export default ProductsGetAll;