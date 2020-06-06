import React, { useState } from 'react'
import './Update.css'
import { NavLink, Redirect } from 'react-router-dom';
import axios from 'axios';
const Update = (props) => {
    const [update, setUpdate] = useState(false);
    const [present, setPresent] = useState(false);
    const token = localStorage.getItem('token');
    console.log(token)
    var login = true;
    if (token == null) {
        login = false;
    }
    const [loggedIn, setLogin] = useState(login)

    if (loggedIn === false) {
        return <Redirect to="/empLogin" />
    }


    const updatePresent = () => {
        const tokenKey = localStorage.getItem('token');


        fetch('https://hrms-project.herokuapp.com/api/attendance/', { method: 'post', headers: { "Authorization": `Bearer ` + tokenKey } })
            .then(res => {
                //console.log(res);
                if (res.status !== 200 && res.status !== 201) {
                    console.log('hellllo');
                    throw new Error(res.status);
                }
                return res.json();
            })
            .then(response => {
                //console.log(response);
                alert('Attendance marked successfully');
            })
            .catch(err => {
                //console.log(err.message);
                if (err.message == 403) {
                    alert('Attendance already marked');
                } else {
                    alert('Some error occurred. Try again later')
                }

            })
        // setPresent(true)
        // alert('Present Marked')
    }
    const updateHandle = (event) => {
        event.preventDefault();
        setUpdate(true);
        alert('Update Sent')

    }

    return (
        <div>
            <div className="container">
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
                        <button className="uB" onClick={updatePresent}>Present</button>
                    </div>
                    <div className="kanban">
                        <div>
                            <table>

                                <thead>
                                    <tr>
                                        <th scope="col">Todo</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>

                                        <td>Task 1</td>
                                    </tr>

                                </tbody>
                            </table>

                        </div>

                        <div>
                            <table>

                                <thead>
                                    <tr>
                                        <th scope="col">Todo</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>

                                        <td>Task 1</td>
                                    </tr>

                                </tbody>
                            </table>

                        </div>
                        <div>
                            <table>

                                <thead>
                                    <tr>
                                        <th scope="col">Todo</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>

                                        <td>Task 1</td>
                                    </tr>

                                </tbody>
                            </table>

                        </div>




                    </div>
                    <button onClick={updateHandle} className="send">Send Update</button>
                </div>



                <div style={{ top: '6.25rem', right: '-11.25rem', position: 'absolute', display: 'flex', flexDirection: 'column' }} >
                    <img style={{ marginTop: '0.625rem', }} alt="img" src={require('../../../../assets/edunomics.png')} />
                    <NavLink to='/mydetails' style={{ marginTop: '0.625rem', }} className="link"  >My Details</NavLink>
                    <NavLink className="link" to='/myrecords' >My Record</NavLink>
                </div>

            </div>

        </div>

    )

}

export default Update;