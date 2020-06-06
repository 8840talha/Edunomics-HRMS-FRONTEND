import React, { useState } from 'react'
import './Update.css'
import { NavLink } from 'react-router-dom';

const Update = (props) => {

    const [update, setUpdate] = useState(false);
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
    const updateHandle = (event) => {
        event.preventDefault();
        setUpdate(true);
        alert('Update Sent')

    }

    return (
        <div>
            <div className="updatecontainer">
                <div style={{ top: '12.5rem', left: '-5rem', position: 'absolute', display: 'flex', flexDirection: 'column' }}>
                    <NavLink className="link" to="/track"> Home</NavLink>
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




                    <button onClick={updateHandle} className="send">Send Update</button>
                </div>



                <div style={{ top: '6.25rem', right: '-9.25rem', position: 'absolute', display: 'flex', flexDirection: 'column' }} >
                    <img style={{ marginTop: '0.625rem', }} alt="img" src={require('../../../../../assets/edunomics.png')} />
                    <NavLink to='/mydetails' style={{ marginTop: '0.625rem', }} className="link"  >My Details</NavLink>
                    <NavLink className="link" to='/myrecords' >My Record</NavLink>
                </div>

            </div>

        </div>

    )

}

export default Update;