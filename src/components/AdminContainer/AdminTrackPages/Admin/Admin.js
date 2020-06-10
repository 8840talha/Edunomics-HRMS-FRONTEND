import React, { useState } from 'react'
import './Admin.css'
import { NavLink, Redirect } from 'react-router-dom'
import jwt_decode from 'jwt-decode';

const AdminTrack = (props) => {
    //protected Route Logic



    const token = localStorage.getItem('token');
    console.log(token)
    var login = true;
    if (token == null) {
        login = false;
    }
    const [loggedIn, setLogin] = useState(login)

    if (loggedIn === false) {
        return <Redirect to="/adminLogin" />
    }
    const handleLogout = () => {
        localStorage.removeItem('token');
        setLogin(!login)

    }
  
    return (
        <div>

            <div className="Container">
                <div className="tab">
                    <NavLink to='/viewLeaveReq'><button className="link">Leave Requests</button></NavLink>
                    <NavLink to='/employees'><button className="link"> Employees</button></NavLink>
                    <NavLink to='/editReq'><button className="link"> Edit Requests</button></NavLink>

                </div>

                <h1 className="hp"> 'View Employees And Leave Requests If Any.' </h1>
                <button className="btnLogOut" onClick={handleLogout}>LogOut</button>



            </div>
        </div>





    )

}

export default AdminTrack;