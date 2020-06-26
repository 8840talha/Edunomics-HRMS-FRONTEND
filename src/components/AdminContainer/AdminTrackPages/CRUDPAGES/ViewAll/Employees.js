import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, } from "react-router-dom";
import jwt_decode from 'jwt-decode'
import './Employees.css';
import AdminSideBar from '../../AdminSideBar/AdminSideBar'

const Employees = (props) => {

  var decoded = jwt_decode(localStorage.getItem('token'));
  console.log(decoded.role);
  if (decoded.role !== "admin") {
    alert(' Unauthorized Acess, Only Admins are Authorized for these Routes')
    props.history.push('/')
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
  // deleting a specific employee with its id
  const deleteUser = async id => {

    var tokenn = localStorage.getItem('token');
    await axios.delete(`https://hrms-project.herokuapp.com/api/delete/${id}`,
      {
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${tokenn}` }
      }).then(result => {
        console.log(result.data.user);
        loadUsers();

      }).catch(err => {
        console.log(err)
      })



  };
  const [show, setshow] = useState(false);

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '20%' }}>
        <AdminSideBar show={show} />
      </div>
      <div className={show ? "empContainer" : "empContainerActive"}>

        <div style={{ marginTop: '15px' }} className='admintoggle' onClick={() => setshow(!show)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className={show ? "empheadActive" : "emphead"}>
          <h1 >Employees</h1>
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
                <td style={{display:'flex'}}>
                  <Link className="btn btn-primary mr-2" to={`/users/${user._id}`}>
                    View
                </Link>
                  <Link
                    className="btn btn-outline-primary mr-2"
                    to={`/users/edit/${user._id}`}
                  >
                    Edit
                </Link>
                  <Link to="#"
                    className="btn btn-danger"
                    onClick={() => deleteUser(user._id)}
                  >
                    Delete
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

export default Employees;
