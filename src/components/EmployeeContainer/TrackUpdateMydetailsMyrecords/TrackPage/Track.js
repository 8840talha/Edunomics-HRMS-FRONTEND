import React, { useState } from 'react'
import './Track.css'
import { NavLink, Redirect } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import SideBar from '../Sidebar'


const Track = (props) => {
    // protected route logic
    const token = localStorage.getItem('token');
    var login = true;
    if (token == null) {
        login = false;
    }
    const [loggedIn, setLogin] = useState(login)

    if (loggedIn === false) {
        return <Redirect to="/empLogin" />
    }
    const handleLogout = () => {
        localStorage.removeItem('token');
        setLogin(!login)

    }
    // 

    const [showSide, setShow] = useState(false)
    return (
        <div style={{ display: 'flex' }}>
            <div style={{ width: '20%' }}>
                <SideBar logout={handleLogout} show={showSide} />
            </div>
            <div className={showSide ? "Tcontainer" : "ActiveCont"}>
                <div className='toggle' onClick={() => setShow(!showSide)}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <h1> 'Click / Toggle On the Buttons to Get the views .' </h1>
                <button className="Lout" onClick={handleLogout}>LogOut</button>

            </div>



        </div>





    )

}

export default Track;