import React, { useState } from 'react'
import { NavLink, } from 'react-router-dom'
import './MyRecords.css'
import axios from 'axios'
const MyRecords = (props) => {
    const [records, setRecords] = useState([])

    const getMyRecords = () => {
        const token = localStorage.getItem('token');
        axios.get('https://hrms-project.herokuapp.com/api/project/all', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            console.log(response.data.project)
            if (response.data.success == "true") {
                alert(response.data.message)
                setRecords(response.data.project)

            } else {
                alert(response.data.message)
            }


        }).catch(err => {
            console.log(err);
            alert('No Projects Found')
        })
    }
    const renderRecordsData = () => {
        return records.map((record, index) => {
            const { _modules, name, _id, createdAt } = record;

            const Module = _modules.map(module => {
                console.log(module)
                return <td>{module}</td>
            })
            return (
                <tr key={_id} >
                    <td>{name}</td>

                    {Module}
                    <td>{createdAt}</td>
                </tr>
            )
        })
    }
    return (
        <div className="_RWrapper">

            <div className="myRecContainer">
                <div className="up">
                    <NavLink to='/track'><button className="link">Employee Home</button></NavLink>
                    <NavLink to='/update'><button className="link">Update Progress</button></NavLink>
                    <NavLink to='/leave'><button className="link">Leave Tracker</button></NavLink>

                </div>

                <div>
                    <h1 className="headMyRecords">MyRecords</h1>
                    
                    <button className="viewRec" onClick={getMyRecords}>View All Records</button>

                    <div>


                        <table style={{ width: '850px', marginLeft: '75px',backgroundColor:'#fff' }} className="table table-striped table-bordered ">
                            <thead  >
                                <tr>
                                    <th>Project Name</th>
                                    <th>Module One</th>
                                    <th>Module Two</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {renderRecordsData()}
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

export default MyRecords;