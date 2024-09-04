import React, { Fragment } from 'react';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import Loader from '../layout/Loader';
import { Container } from 'react-bootstrap';

const Profile = () => {
    const { user, loading } = useSelector(state => state.auth);

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <Container>
                        <MetaData title={`${user.name}'s Profile`} />
                        <h2 className="profile mt-5 ml-5">My Profile</h2>
                        <div className="row justify-content-around mt-4 py-3 user-info">
                            <div className="col-12 col-md-3">
                                <Link to="/update-profile" id="edit_profile" className="btn btn-primary btn-block my-5">
                                    Edit Profile
                                </Link>
                            </div>

                            <div className="col-12 col-md-5">
                                <h4>Full Name</h4>
                                <p>{user.name}</p>

                                <h4>Email Address</h4>
                                <p>{user.email}</p>

                                <h4>Contact</h4>
                                <p>{user.phoneNumber}</p>

                                <h4>Address</h4>
                                <p>{user.address}</p>

                                <Link to="/orders" className="btn btn-danger btn-block mt-3 me-2">
                                    My Orders
                                </Link>
                                
                                <Link to="/update-password" className="btn btn-warning btn-block mt-3">
                                    Change Password
                                </Link>
                            </div>
                        </div>
                    </Container>
                </Fragment>
            )}
        </Fragment>
    );
};

export default Profile;