import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const [isToggled, setIsToggled] = useState(false);
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const navigate = useNavigate();

    const getUserInfo = async () => {
        const userInfo = await localStorage.getItem("loggedInUser") && JSON.parse(localStorage.getItem("loggedInUser"));
        setUser(userInfo);
    };

    const getUserProfile = async () => {
        const userInfo = await localStorage.getItem("loggedInUser") && JSON.parse(localStorage.getItem("loggedInUser"));
        setUser(userInfo);
        if (userInfo) {
            fetch("http://localhost:7000/auth/profile/" + userInfo.email, {
                headers: {
                    'Authorization': `Bearer ${userInfo.token}`,
                }
            }).then((res) => res.json())
              .then((data) => {
                console.log(data);
                setProfile(data);
            }).catch(error => {
                console.error('Error fetching profile:', error);
            });
        }
    };

    useEffect(() => {
        getUserInfo();
        getUserProfile();
    }, []);

    const logout = async () => {
        setIsToggled(!isToggled);
        await localStorage.clear();
        navigate("/login");
    };

    const dropDownToggle = () => {
        setIsToggled(!isToggled);
    };

    const goToPage = (e, pageName) => {
        e.preventDefault();
        navigate(pageName);
        setIsToggled(false);
    };

    return (
        <nav className="navbar navbar-expand" style={{ backgroundColor: "#009688" }}>
            <div className="container-fluid">
                <Link className="navbar-brand" to="/" style={{fontWeight :'bold'}}>ExpenseApp</Link>
                <div className="collapse navbar-collapse justify-content-start" style={{ justifyContent: 'space-around' }}>
                    <ul className="navbar-nav mr-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" to="/create-expense">Add Expenses</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" to="/usersList">Users</Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav" style={{ marginLeft: 'auto' }}>
                        <li className="nav-item dropdown">
                            <Link className="nav-link" role="button" onClick={dropDownToggle}>
                                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#ddd' }}>
                                    <img src={`http://localhost:7000/uploads/${profile?.profilepic}`} style={{ width: '100%', height: '100%', borderRadius: '50%' }} alt="Profile" />
                                </div>
                            </Link>
                            {isToggled && (
                                <div className="dropdown-menu" style={{ display: 'block' }}>
                                    <Link className="dropdown-item" onClick={(e) => goToPage(e, "/profile")}>Profile Info</Link>
                                    <Link className="dropdown-item" onClick={(e) => goToPage(e, "/change-password")}>Change Password</Link>
                                    <div className="dropdown-divider"></div>
                                    <Link className="dropdown-item" onClick={logout}>Logout</Link>
                                </div>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;