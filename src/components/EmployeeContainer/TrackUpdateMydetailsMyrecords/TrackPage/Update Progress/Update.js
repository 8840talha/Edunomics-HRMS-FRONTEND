import React, { useState } from 'react'
import './Update.css'
import './Update1.css'
import { Link } from 'react-router-dom';
import { Button, Paper, Tabs, Tab } from '@material-ui/core'

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
        <div className="_container">
            <div className="header-container">
                <h1 style={{ fontWeight: "bolder" }}>Update Progress</h1>
            </div>
            <div className="navigation-container">
                <Link to="/track">
                    <Button variant="contained" style={{
                        backgroundColor: "#1976D2",
                        color: "white"
                    }}>Employee Home</Button>
                </Link>
                <Link to="/update">
                    <Button variant="contained" style={{
                        backgroundColor: "#1976D2",
                        color: "white"
                    }}>Update Progress</Button>
                </Link>
                <Link to="/leave">
                    <Button variant="contained" style={{
                        backgroundColor: "#1976D2",
                        color: "white"
                    }}>Leave Tracker</Button>
                </Link>
            </div>
            <div className="mark-attendance-container">
                <div className="mark-attendance-heading">
                    <h3>Mark Attendance:</h3>
                </div>
                <div className="mark-attendance-button">
                    <Button variant="contained" style={{ backgroundColor: "#00a652", color: "white" }}>
                        Present
                    </Button>
                </div>
            </div>
            <div className="table-container">
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

    )

}

export default Update;