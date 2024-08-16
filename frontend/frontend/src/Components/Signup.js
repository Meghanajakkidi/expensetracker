import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
    const [userAuth, setUserAuth] = useState({ email: "", fullName: "", password: "", rePassword: "" });
    const [errors, setErrors] = useState({});
    const [isError, setIsError] = useState(false);
    const [errMessage, setErrMessage] = useState("");
    const navigate = useNavigate();

    const onFieldChange = (e) => {
        setUserAuth((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const validateFormFields = () => {
        let errors = {};
        if (!userAuth.fullName) errors.fullName = "Please enter full name";
        if (!userAuth.email) errors.email = "Please enter email";
        if (!userAuth.password) errors.password = "Please enter password";
        if (!userAuth.rePassword) {
            errors.rePassword = "Please enter confirm password";
        } else if (userAuth.password !== userAuth.rePassword) {
            errors.rePassword = "Passwords do not match";
        }
        return errors;
    };

    const signup = () => {
        fetch("http://localhost:7000/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userAuth)
        }).then((res) => res.json())
          .then((result) => {
            if (result.success) {
                navigate("/login");
            } else {
                setIsError(true);
                setErrMessage(result.message);
            }
        });
    };

    const register = (e) => {
        e.preventDefault();
        let errors = validateFormFields();
        setErrors(errors);
        if (Object.keys(errors).length === 0) {
            signup();
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <div className="col-md-4">
                <div className="card shadow-sm border">
                    <div className="card-body">
                        <h4 className="text-center">Signup</h4>
                        <form onSubmit={register}>
                            <div className="mb-3">
                                <label className="form-label">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={userAuth.fullName}
                                    onChange={onFieldChange}
                                    name="fullName"
                                />
                            </div>
                            <p className="text-danger">{errors?.fullName}</p>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={userAuth.email}
                                    onChange={onFieldChange}
                                    name="email"
                                />
                            </div>
                            <p className="text-danger">{errors?.email}</p>
                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={userAuth.password}
                                    onChange={onFieldChange}
                                    name="password"
                                />
                            </div>
                            <p className="text-danger">{errors?.password}</p>
                            <div className="mb-3">
                                <label className="form-label">Re-enter Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={userAuth.rePassword}
                                    onChange={onFieldChange}
                                    name="rePassword"
                                />
                            </div>
                            <p className="text-danger">{errors?.rePassword}</p>
                            <div className="mb-3">
                                <Link to="/login">Already have an account? Login here</Link>
                            </div>
                            <input
                                type="submit"
                                className="btn btn-primary w-100"
                                value="Signup"
                                style={{ background: '#009688', border: '1px solid #009688' }}
                            />
                            {isError && (
                                <div className="mb-3">
                                    <h4 style={{ color: "red" }}>{errMessage}</h4>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;