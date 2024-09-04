import { Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import { toast } from "react-toastify";
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers, deleteUser, clearErrors } from "../../slices/authSlice.js";
import { DELETE_USER_RESET } from "../../constants/authConstants.js";
import Sidebar from "../layout/Sidebar.jsx";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { Button } from 'react-bootstrap';

const UsersGetAll = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error, allUsers } = useSelector(state => state.auth);
    const { isDeleted } = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(fetchAllUsers());

        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        if (isDeleted) {
            toast.success("User deleted successfully!!");
            navigate("/admin/users");
            dispatch({ type: DELETE_USER_RESET });
        }
    }, [dispatch, error, navigate, isDeleted]);

    const deleteUserHandler = (id) => {
        dispatch(deleteUser(id));
    };

    const setUsers = () => {
        const data = {
            columns: [
                {
                    label: "User Id",
                    field: "id",
                    sort: "asc",
                },
                {
                    label: "Name",
                    field: "name",
                    sort: "asc",
                },
                {
                    label: "Email",
                    field: "email",
                    sort: "asc",
                },
                {
                    label: "Role",
                    field: "role",
                    sort: "asc",
                },
                {
                    label: "Actions",
                    field: "actions",
                },
            ],
            rows: []
        };

        allUsers && allUsers.forEach(user => {
            data.rows.push({
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role === "admin" 
                    ? <strong className="text-primary">{user.role}</strong>
                    : <strong className="text-danger">{user.role}</strong>,
                actions: (
                    <>
                        <Link to={`/admin/edituser/${user._id}`} title="Update User" className="btn btn-outline-info btn-sm mx-1">
                            <FaPencilAlt />
                        </Link>
                        <Button variant="outline-danger" size="sm" title="Delete User" onClick={() => deleteUserHandler(user._id)} className="mx-1">
                            <FaTrashAlt />
                        </Button>
                    </>
                ),
            });
        });

        return data;
    };

    return (
        <Fragment>
            <MetaData title={"Show All Users"} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
                <div className="col-12 col-md-10">
                    <Fragment>
                        <h1 className="my-5 text-center white">Show All Users</h1>
                        {loading ? <Loader /> : (
                            <MDBDataTable
                                data={setUsers()}
                                className="table table-hover mb-0"
                                bordered
                                striped
                                responsive
                                style={{ cursor: 'pointer' }}
                            />
                        )}
                    </Fragment>
                </div>
            </div>
        </Fragment>
    );
};

export default UsersGetAll;