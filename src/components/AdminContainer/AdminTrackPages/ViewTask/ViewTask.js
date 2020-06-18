import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, } from "react-router-dom";
import jwt_decode from 'jwt-decode'
import './ViewTask.css';
import AdminSideBar from '../AdminSideBar/AdminSideBar'

const ViewTask = (props) => {

    var decoded = jwt_decode(localStorage.getItem('token'));
    console.log(decoded.role);
    if (decoded.role !== "admin") {
        alert(' Unauthorized Acess, Only Admins are Authorized for these Routes')
        props.history.push('/track')
    }
    //  else {
    //     props.history.push('/adminTrack');
    // }

    // 
    const [users, setUser] = useState([]);

    useEffect(() => {
        loadUsers();
    }, []);
    // loading list of all registered employees
    const loadUsers = async () => {
        var token = localStorage.getItem('token');
        await axios.get(`https://hrms-project.herokuapp.com/api/user/all`,
            {
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` }
            }).then(result => {
                console.log(result.data.user);
                setUser(result.data.user);

            }).catch(err => {
                console.log(err)
            })


    };
    
    // const project = async id => {
    //     var tokenn = localStorage.getItem('token');
    //     await axios.get(`https://hrms-project.herokuapp.com/api/projects/${id}`,
    //         {
    //             headers: { "Content-Type": "application/json", "Authorization": `Bearer ${tokenn}` }
    //         }).then(result => {
    //             console.log(result.data.project);

    //         }).catch(err => {
    //             console.log(err)
    //         })

    // }
    const [show, setshow] = useState(false);

    return (
        <div style={{ display: 'flex' }}>
            <div style={{ width: '20%' }}>
                <AdminSideBar show={show} />
            </div>
            <div className={show ? "VTContainer" : "VTContainerActive"}>

                <div style={{ marginTop: '15px' }} className='admintoggle' onClick={() => setshow(!show)}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div className={show ? "VTheadActive" : "VThead"}>
                    <h1 >View Tasks</h1>
                </div>

                <table style={{ backgroundColor: '#fff', width: '80%', marginLeft: '10%' }} className="table table-bordered shadow table-striped ">
                    <thead className="thead">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">EmployeeId</th>
                            <th scope="col">Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.employeeId}</td>
                                <td>{user.email}</td>
                                <td>
                                    <Link className="btn btn-primary btn-block mr-2" to={`/viewProject/${user.employeeId}`}>
                                        View Tasks
                </Link>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>

        </div>



    )
};

export default ViewTask;
