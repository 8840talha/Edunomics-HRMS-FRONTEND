import React, { useState } from 'react'
import './Update.css'
import { NavLink, useLocation } from 'react-router-dom';
import SideBar from '../SideBar/Sidebar'

const Update = (props) => {

    const updatePresent = () => {
        const tokenKey = localStorage.getItem('token');


        fetch('https://hrms-project.herokuapp.com/api/attendance/', { method: 'post', headers: { "Authorization": `Bearer ` + tokenKey } })
            .then(res => {

                if (res.status !== 200 && res.status !== 201) {
                    console.log('hellllo');
                    throw new Error(res.status);
                }
                return res.json();
            })
            .then(response => {

                alert('Attendance marked successfully');
            })
            .catch(err => {

                if (err.message == 403) {
                    alert('Attendance already marked');
                } else {
                    alert('Some error occurred. Try again later')
                }

            })


    }

    const [showSide, setShow] = useState(false)

    return (

        <div style={{ display: 'flex' }} >
            <div style={{ width: '20%' }}>
                <SideBar show={showSide} />
            </div>

            <div className={showSide ? "UTcontainer" : "UActiveCont"}>
                <div style={{ marginTop: '15px' }} className='toggle' onClick={() => setShow(!showSide)}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div className={showSide ? "ActiveProg" : "Progress"}>
                    <h1> Update Progress </h1>
                    <div className="mark">
                        <h2>Mark Attendance:</h2>
                        <button className="uB" onClick={updatePresent}>Present</button>
                    </div>
                </div>
            </div>
        </div>



    )

}

export default Update;