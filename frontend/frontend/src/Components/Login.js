import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isError, setIsError] = useState(false);
    const [errMessage, setErrMessage] = useState("");
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const onEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const onPasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const validateLoginForm = () => {
        let errors = {};
        if (!email) {
            errors.email = "Please enter email";
        }
        if (!password) {
            errors.password = "Please enter password";
        }
        return errors;
    };

    const login = (e) => {
        e.preventDefault();
        let errors = validateLoginForm();
        setErrors(errors);

        //https://expense-tracker-d2dz.onrender.com

        if (Object.keys(errors).length === 0) {
            fetch("http://localhost:7000/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            })
                .then((res) => res.json())
                .then(async (result) => {
                    if (result.success) {
                        await localStorage.setItem("loggedInUser", JSON.stringify({
                            email: result.email,
                            userId: result.userId,
                            role: result.role,
                            token: result.token
                        }));
                        await localStorage.setItem("isLoggedIn", true);
                        navigate("/");

                    } else {
                        setIsError(true);
                        setErrMessage(result.message);
                    }
                })
                .catch((error) => {
                    setIsError(true);
                    setErrMessage("Failed to connect to the server. Please try again later.");
                });
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <div className="col-md-4">
                <div className="card shadow-sm border">
                    <div className="card-body">
                        <h4 className="text-center">Login</h4>
                        <form onSubmit={login}>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={email}
                                    onChange={onEmailChange}
                                />
                            </div>
                            <p className="text-danger">{errors?.email}</p>
                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={password}
                                    onChange={onPasswordChange}
                                />
                            </div>
                            <p className="text-danger">{errors?.password}</p>
                            <div className="mb-3">
                                <Link to="/signup">Doesn't have an account? Signup here</Link>
                            </div>
                            <input
                                type="submit"
                                className="btn btn-primary w-100"
                                value="Login"
                                style={{ background: '#009688', border: '1px solid #009688' }}
                            />
                        </form>
                        {isError && (
                            <div className="mb-3">
                                <h4 style={{ color: "red" }}>{errMessage}</h4>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;