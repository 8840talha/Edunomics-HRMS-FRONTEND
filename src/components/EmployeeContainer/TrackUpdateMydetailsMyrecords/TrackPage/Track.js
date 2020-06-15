import React, { useState } from 'react'
import './Track.css'
import SideBar from './SideBar/Sidebar'


const Track = (props) => {


    const [showSide, setShow] = useState(false)
    return (
        <div style={{ display: 'flex' }}>
            <div style={{ width: '20%' }}>
                <SideBar show={showSide} />
            </div>
            <div className={showSide ? "Tcontainer" : "ActiveCont"}>
                <div style={{ marginTop: '15px' }} className='toggle' onClick={() => setShow(!showSide)}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div className={showSide ? "THEADACTIVE" : "THEAD"}>
                    <h1 > Home Page </h1>
                </div>
            </div>



        </div>





    )

}

export default Track;