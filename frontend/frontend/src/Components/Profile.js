import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { apiService } from "../apiService";

function Profile() {
    const [user, setUser] = useState(null)
    const [profile, setProfile] = useState(null)
    const getUserProfile = async ()=>{
        let userInfo = await localStorage.getItem("loggedInUser") && JSON.parse(localStorage.getItem("loggedInUser"))
        setUser(userInfo)
        if (userInfo) {
            apiService.getUserProfile(userInfo.email).then(function(data){
                setProfile(data)
            })
        }
    }
    useEffect(() => {
        getUserProfile();
    }, [])

    const onFileChange = (e)=>{
        e.preventDefault()
        const data = new FormData();
        data.append("profile",e.target.files[0])
        apiService.profileUpload(data,user.email).then(function(data){
            console.log("file uplaoded successfully")
        })
    }
    return (
        <div className="row mt-4">
            <div className="col-md-6">
                <div className="card">
                    <div className="card-header">
                        My Profile
                    </div>
                    <div>
                        <input type="file" onChange={(e)=>onFileChange(e)}/>
                    </div>

                    {profile && <div className="card-body">
                        <img src={`http://localhost:7000/uploads/${profile.profilepic}`}/>
                        <h5 className="card-title">{profile.fullName}</h5>
                        <p className="card-text">{profile.email}</p>
                        <Link className="btn btn-primary">Logout</Link>
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default Profile