import { useState } from "react"

function Changepassword(){
    const [currentPassword,setCurrentPassword] = useState("")
    const [newPassword,setNewPassword] = useState("")
    const [confirmNewPassword,setConfirmNewPassword] = useState("")
    const [showAlert,setShowAlert] = useState(false)
    const [errors,setErrors] = useState({})

    const onCurrentPasswordChange = (e)=>{
        setCurrentPassword(e.target.value)

    }
    const onNewPasswordChange = (e)=>{
        setNewPassword(e.target.value)
    }
    const onConfirmNewPasswordChange = (e)=>{
        setConfirmNewPassword(e.target.value)
    }

    const validateField = ()=>{
        let errors = {};
        if(!currentPassword){
            errors.currentPassword="Please enter current"
        } if(!newPassword){
            errors.newPassword="Please enter new password"
        }if(!confirmNewPassword){
            errors.confirmNewPassword="Please enter confirmNewPasswordn"
        }

        return errors
    }

    const resetField = ()=>{
        setConfirmNewPassword("")
        setNewPassword("")
        setCurrentPassword("")
    }

    const applyChangePassword = async ()=>{
        const user = await localStorage.getItem("loggedInUser") && JSON.parse(localStorage.getItem("loggedInUser"))
        let errors = validateField()
        setErrors(errors)
        if(Object.keys(errors).length===0){
            fetch("http://localhost:7000/auth/changePassword", { method: "PUT", headers: { 'Content-Type': "application/json" }, body: JSON.stringify({email:user.email,currentPassword,newPassword}) }).then(function (res) {
                return res.json()
            }).then(function (result) {
                if(result._id){
                    setShowAlert(true)
                    resetField()
                }
                console.log("password updated successfully")
            })
        }else{
            return;
        }

    
    }

    const changePassword = (e)=>{
        e.preventDefault();
       applyChangePassword()
    }
    return(
        <div className="container">
        <h4>Change Password</h4>
        <div class="card" style={{ width: '25rem' }}>
            <div class="card-body">
                <form onSubmit={changePassword}>
                    <div class="form-group" style={{ padding: '15px' }}>
                        <label>Current Password</label>
                        <input type="text" class="form-control" value={currentPassword} onChange={onCurrentPasswordChange} />
                    </div>
                    
                    <div class="form-group" style={{ padding: '15px' }}>
                        <label>New Password</label>
                        <input type="text" class="form-control" value={newPassword} onChange={onNewPasswordChange} />
                    </div>
                    <div class="form-group" style={{ padding: '15px' }}>
                        <label>Confirm New Password</label>
                        <input type="text" class="form-control" value={confirmNewPassword} onChange={onConfirmNewPasswordChange} />
                    </div>
                   
                    <div style={{ padding: '15px' }}>
                        <button type="submit" class="btn btn-primary" >Update Password</button>
                    </div>
                </form>
            </div>
        </div>
        {showAlert &&<div className="row">
            <div className="col-md-3 mt-4">
                <div class="alert alert-success" role="alert">
                    Password updated successfully
                </div>
            </div>
        </div>}

    </div>
    )
}

export default Changepassword