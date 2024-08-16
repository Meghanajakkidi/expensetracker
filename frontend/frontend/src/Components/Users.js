import { useState, useEffect } from "react"

function Users() {
    const [users, setUsers] = useState([]);

    const getAllUsers = async () => {
        fetch(`http://localhost:7000/auth/users`).then((res) => {
            return res.json();
        }).then((result) => {
            console.log(result)
            setUsers(result)
        })
    }

    useEffect(() => {
        getAllUsers();
    }, [])

    const accountActivateDeactiate = (e, id, active) => {
        const activeFlag = active ? false : true
        fetch("http://localhost:7000/auth/activate_deactivate", { method: "PUT", headers: { "Content-type": 'Application/Json' }, body: JSON.stringify({ id: id, active: activeFlag }) }).then((res) => {
            return res.json();
        }).then((result) => {
            getAllUsers();
        })
    }
    return (
        <div className="container">
            <div className="row mt-5">
                <table className="table table-light">
                    <thead>
                        <tr>
                            <th scope="col">FullName</th>
                            <th scope="col">Email</th>
                            <th scope="col">Role</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => {
                            return (
                                <tr>
                                    <td>{user.fullName}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role ? user.role : "user"}</td>
                                    <td>{(user.active === true) && <button className="btn btn-sm btn-danger" onClick={(e) => accountActivateDeactiate(e, user._id, user.active)}>Deactivate</button>}
                                        {user.active === false && <button className="btn btn-sm btn-success" onClick={(e) => accountActivateDeactiate(e, user._id, user.active)}>Activate</button>}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default Users