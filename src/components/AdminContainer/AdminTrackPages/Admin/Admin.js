import React, { useState } from 'react'
import './Admin.css'
import { NavLink, Redirect } from 'react-router-dom'
import jwt_decode from 'jwt-decode';
import AdminSideBar from '../AdminSideBar/AdminSideBar'

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
    const [show, setshow] = useState(false)
    return (
        <div style={{ display: 'flex' }}>
            <div style={{ width: '20%' }}>
                <AdminSideBar show={show} />
            </div>
            <div className={show ? "AContainer" : "AContainerActive"} >
                <div style={{ marginTop: '15px' }} className='admintoggle' onClick={() => setshow(!show)}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div className={show ? "AheadActive" : "Ahead"}>
                    <h1 > Home Page </h1>
                </div>





            </div>

        </div>





    )

}

export default AdminTrack;