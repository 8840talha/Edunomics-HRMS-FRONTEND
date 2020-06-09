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
                    <NavLink to='/track'><button className="link">Employee Home</button></NavLink>
                    <NavLink to='/update'><button className="link">Update Progress</button></NavLink>
                    <NavLink to='/leave'><button className="link">Leave Tracker</button></NavLink>

                </div>
                <div className="Progress">
                    <div>
                        <h1>Update Progress</h1>

                    </div>
                    <div className="mark">
                        <h3>Mark Attendance</h3>
                        <NavLink to="#"><button className="link" onClick={updatePresent}>Present</button></NavLink>
                    </div>

                    <div>
                        <table style={{ width: '800px', marginLeft: '100px' }} className="table table-striped table-bordered ">
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

                    <div className="ImgContainer">
                        <img style={{ marginTop: '0.625rem', }} alt="img" src={require('../../../../../assets/profile.png')} />
                        <NavLink style={{ textAlign: 'center', color: 'black' }} to="/detailChange" >Edit Profile</NavLink>
                    </div>
                    <NavLink to='/mydetails'><button style={{ marginTop: '0.625rem' }} className="link">My Details</button></NavLink>
                    <NavLink to='/myrecords'><button className="link">My Records</button></NavLink>
                </div>

            </div>

        </div>

    )

}

export default Update;