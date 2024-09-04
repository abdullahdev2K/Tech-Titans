import { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import { toast } from "react-toastify";

import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";

import { useDispatch, useSelector } from "react-redux";

import { fetchMyOrders, clearErrors } from "../../slices/orderSlice";

const ShowOrders = () => {
    const dispatch = useDispatch();
    
    const { loading, error, orders } = useSelector((state) => state.orders);

    useEffect(() => {
        dispatch(fetchMyOrders());

        if (error) {
        toast.error(error);
        dispatch(clearErrors());
        }
    }, [dispatch, error]);

    const setOrders = () => {
        const data = {
        columns: [
            {
            label: "Order Id",
            field: "id",
            sort: "asc"
            },
            {
            label: "Num of Items",
            field: "numOfItems",
            sort: "asc"
            },
            {
            label: "Amount",
            field: "amount",
            sort: "asc"
            },
            {
            label: "Status",
            field: "status",
            sort: "asc"
            },
            {
            label: "Actions",
            field: "actions",
            sort: "asc"
            }
        ],
        rows: []
        };

        orders && orders.forEach((order) => {
        data.rows.push({
            id: order._id,
            numOfItems: order.orderItems.length,
            amount: `$${order.totalPrice}`,
            status: order.orderStatus && String(order.orderStatus).includes("Delivered") ? (
            <p style={{ color: "green" }}>{order.orderStatus}</p>
            ) : (
            <p style={{ color: "red" }}>{order.orderStatus}</p>
            ),
            actions: (
            <Link to={`/order/${order._id}`} className="btn btn-primary">
                <i className="fa fa-eye"></i>
            </Link>
            )
        });
    });

    return data;
    };

    return (
        <Fragment>
            <MetaData title={'My Orders'} />
            <h1 className="my-5 white text-center">My Orders</h1>
            {loading ? (
                <Loader />
            ) : (
                <MDBDataTable 
                data={setOrders()}
                className="px-3 py-3 box-cart purple"
                bordered
                striped
                hover
                />
            )}
        </Fragment>
    );
};

export default ShowOrders;