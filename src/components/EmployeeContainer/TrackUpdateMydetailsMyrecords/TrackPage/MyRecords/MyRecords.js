import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './MyRecords.css'
import axios from 'axios'
import SideBar from '../SideBar/Sidebar'
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
                    <td><NavLink to="/kanban"><button className="btn btn-success btn-block">Go to Kanban</button></NavLink></td>
                </tr>
            )
        })
    }
    const [showSide, setShow] = useState(false)
    return (
        <div style={{ display: 'flex' }}>
            <div style={{ width: '20%' }}>
                <SideBar show={showSide} />
            </div>
            <div className={showSide ? "myRecContainer" : "myRecContainerActive"}>

                <div style={{ marginTop: '15px' }} className='toggle' onClick={() => setShow(!showSide)}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div className={showSide ? "HeadActive" : "Head"} >
                    <h1 >MyRecords</h1>

                    <button className={showSide ? "viewRecActive" : "viewRec"} onClick={getMyRecords}>View All Records</button>

                    <div>


                        <table className={showSide ? "table table-striped table-bordered mrTwidthActive " : "table table-striped table-bordered mrTwidth "}>
                            <thead  >
                                <tr>
                                    <th>Project Name</th>
                                    <th>Module One</th>
                                    <th>Module Two</th>
                                    <th>Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {renderRecordsData()}
                            </tbody>
                        </table>

                    </div>

                </div>



            </div>

        </div>



    )

}

export default MyRecords;