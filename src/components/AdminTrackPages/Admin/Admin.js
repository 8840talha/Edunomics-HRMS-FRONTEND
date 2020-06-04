import React, { useState } from 'react'
import './Admin.css'
import { NavLink, Redirect } from 'react-router-dom'


const AdminTrack = (props) => {
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

            <div className="container">
                <div style={{ top: '12.5rem', left: '-5rem', position: 'absolute', display: 'flex', flexDirection: 'column' }}>
                    <NavLink className="link" to='/viewLeaveReq'  >View Leave Request</NavLink>
                    <NavLink className="link" to='/employees' >Employees</NavLink>
                </div>

                <h1 className="hp"> 'View Employees And Leave Requests If Any.' </h1>
                <button style={{ border: 'none', backgroundColor: 'green', color: '#fff', width: '150px', height: '50px' }} onClick={handleLogout}>LogOut</button>



            </div>
        </div>





    )

}

export default AdminTrack;