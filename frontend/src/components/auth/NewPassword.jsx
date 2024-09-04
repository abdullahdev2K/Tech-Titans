import { useState, useEffect, Fragment } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import MetaData from "../layout/MetaData.jsx";
import { resetPassword, clearErrors } from "../../slices/authSlice.js";

const NewPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token } = useParams();

    const { error, success } = useSelector(state => state.auth);

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if (success) {
            toast.success("Password updated successfully");
            navigate("/login");
        }
    }, [dispatch, error, success, navigate]);

    const newPasswordHandle = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set('password', password);
        formData.set('confirmPassword', confirmPassword);

        dispatch(resetPassword({ token, formData }));
    }

    return (
        <Fragment>
            <MetaData title={'Reset New Password'} />
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={newPasswordHandle}>
                        <h1 className="mb-3 mt-2 mb-5 text-center purple">Reset New Password</h1>

                        <div className="form-group">
                            <label htmlFor="password_field">Password</label>
                            <input
                                type="password"
                                id="password_field"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirm_password_field">Confirm Password</label>
                            <input
                                type="password"
                                id="confirm_password_field"
                                className="form-control"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)} />
                        </div>

                        <button
                            id="new_password_button"
                            type="submit"
                            className="btn btn-block py-3">
                            Reset Password
                        </button>

                    </form>
                </div>
            </div>
        </Fragment>
    );
}

export default NewPassword;