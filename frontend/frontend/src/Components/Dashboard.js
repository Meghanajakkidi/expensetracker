import Navbar from "./Navbar"
import { Outlet } from "react-router-dom"


function Dashboard(){
    return(
        <div className="container-fluid">
            <Navbar/>
            <Outlet/>
            
        </div>
    )
}

export default Dashboard