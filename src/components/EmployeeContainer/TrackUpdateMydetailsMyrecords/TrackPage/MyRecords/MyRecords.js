import React, { useState } from 'react'
import { NavLink,  } from 'react-router-dom'
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
        <div>

            <div className="myRecContainer">
                <div style={{ top: '12.5rem', left: '-5rem', position: 'absolute', display: 'flex', flexDirection: 'column' }}>
                    <NavLink className="link" to="/track"> Home</NavLink>
                    <NavLink className="link" to='/update'  >Update Progress</NavLink>
                    <NavLink className="link" to='/leave' >Leave Tracker</NavLink>
                </div>

                <div>
                    <h1 className="headMyRecords">MyRecords</h1>

                    <button className="viewRec" onClick={getMyRecords}>View All Records</button>

                    <div>


                        <table style={{ width: '850px', marginLeft: '68px' }} className="table table-striped table-bordered ">
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



                <div style={{ top: '6.25rem', right: '-9.25rem', position: 'absolute', display: 'flex', flexDirection: 'column' }} >
                    <img style={{ marginTop: '0.625rem', }} alt="img" src={require('../../../../../assets/edunomics.png')} />
                    <NavLink to='/mydetails' style={{ marginTop: '0.625rem', }} className="link"  >My Details</NavLink>
                    <NavLink className="link" to='/myrecords' >My Record</NavLink>
                </div>

            </div>

        </div>



    )

}

export default MyRecords;