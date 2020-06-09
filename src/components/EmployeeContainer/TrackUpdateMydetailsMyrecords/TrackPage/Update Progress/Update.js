import React, { useState } from 'react'
import './Update.css'
import { NavLink } from 'react-router-dom';

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


    return (
        <div>
            <div className="updatecontainer">
                <div className="up">
                    <NavLink className="link" to="/track">Employee  Home</NavLink>
                    <NavLink className="link" to='/update'  >Update Progress</NavLink>
                    <NavLink className="link" to='/leave' >Leave Track</NavLink>
                </div>
                <div className="Progress">
                    <div>
                        <h1>Update Progress</h1>

                    </div>
                    <div className="mark">
                        <h3>Mark Attendance</h3>
                        <button className="uB" onClick={updatePresent}><NavLink className="link" to="#">Present</NavLink></button>
                    </div>

                    <div>
                        <table style={{ width: '800px', marginLeft: '90px' }} className="table table-striped table-bordered ">
                            <thead  >
                                <tr>

                                    <th>Todo</th>
                                    <th>Doing</th>
                                    <th>Done</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Task 1</td>
                                    <td>Task 2 </td>
                                    <td>Task 3</td>
                                </tr>
                                <tr>
                                    <td>Task 1</td>
                                    <td>Task 2 </td>
                                    <td>Task 3</td>
                                </tr>
                            </tbody>
                        </table>

                    </div>





                </div>



                <div className="down" >
                    {/* <img style={{ marginTop: '0.625rem', }} alt="img" src={require('../../../../../assets/edunomics.png')} /> */}
                    <div className="ImgContainer">
                        <img style={{ marginTop: '0.625rem', }} alt="img" src={require('../../../../../assets/profile.png')} />
                        <NavLink style={{ textAlign: 'center' }} to="/detailChange" >Edit Profile</NavLink>
                    </div>
                    <NavLink to='/mydetails' style={{ marginTop: '0.625rem', }} className="link"  >My Details</NavLink>
                    <NavLink className="link" to='/myrecords' >My Record</NavLink>
                </div>

            </div>

        </div>

    )

}

export default Update;