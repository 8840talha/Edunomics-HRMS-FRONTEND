import React, { useState } from 'react'
import './Track.css'
import { NavLink, Redirect } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import SideBar from '../Sidebar'


const Track = (props) => {
    

    const [showSide, setShow] = useState(false)
    return (
        <div style={{ display: 'flex' }}>
            <div style={{ width: '20%' }}>
                <SideBar  show={showSide} />
            </div>
            <div className={showSide ? "Tcontainer" : "ActiveCont"}>
                <div className='toggle' onClick={() => setShow(!showSide)}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                
                <h1 style={{margin:'0 auto'}}> 'Click / Toggle On the Buttons to Get the views .' </h1>

            </div>



        </div>





    )

}

export default Track;