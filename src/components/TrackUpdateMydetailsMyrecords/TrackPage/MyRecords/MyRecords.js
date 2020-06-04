import React from 'react'
import { NavLink } from 'react-router-dom'
import './MyRecords.css'
const MyRecords = (props) => {
    return (
        <div>

            <div className="container">
                <div style={{ top: '12.5rem', left: '-5rem', position: 'absolute', display: 'flex', flexDirection: 'column' }}>
                    <NavLink className="link" to='/update'  >Update Progress</NavLink>
                    <   NavLink className="link" to='/leave' >Leave Track</NavLink>
                </div>

                <div>
                    <h1 className="headMyRecords">MyRecords</h1>
                    <div className="forrm">
                        <div className="inpBox">
                            <label><h4>Search Name:</h4></label>
                            <input type="text" placeholder="Enter Project Name" />
                        </div>
                        <div className="inpBox">
                            <label><h4>Select Date Range:</h4></label>
                            <input type="date" placeholder="Select Date" />
                        </div>

                    </div>

                    <div>

                        <table style={{ width: '900px', marginLeft: '50px' }}>
                            <thead >
                                <tr >
                                    <th>Project</th>
                                    <th>Module</th>
                                    <th>Assigned On</th>
                                    <th>Approved On</th>
                                    <th>Approved By</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="td">
                                    <td>3741255</td>
                                    <td>Jones, Martha</td>

                                    <td>3741255</td>
                                    <td>Jones, Martha</td>
                                    <td>Computer Science</td>
                                </tr>
                                <tr className="td">
                                    <td>3971244</td>
                                    <td>Nim, Victor</td>
                                    <td>3741255</td>
                                    <td>Jones, Martha</td>

                                    <td>Russian Literature</td>
                                </tr>
                                <tr className="td">
                                    <td>4100332</td>
                                    <td>Petrov, Alexandra</td>
                                    <td>3741255</td>
                                    <td>Jones, Martha</td>

                                    <td>Astrophysics</td>
                                </tr>
                            </tbody>
                        </table>


                    </div>

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

export default MyRecords;