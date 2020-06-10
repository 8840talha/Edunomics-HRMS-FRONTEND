import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, } from "react-router-dom";
import jwt_decode from 'jwt-decode'


const Employees = (props) => {

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

  return (
    <div style={{ marginTop: '100px', backgroundColor: '#fff' }} className="container">
      <div style={{ display: 'flex' }}>
        <Link style={{ border: '1px solid gray', width: '180px', height: '50px', marginRight: '5px' }} className="btn btn-dark w-35" to="/adminTrack">Go to Admin's Home</Link>
        <Link style={{ border: '1px solid gray', width: '180px', height: '50px' }} className="btn btn-dark w-35" to="/users/add">Add User</Link>

      </div>
      <div className="py-4">
        <h1 className="py-4">Employees</h1>
        <table style={{ backgroundColor: '#fff' }} class="table table-bordered shadow table-striped ">
          <thead class="thead">
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
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.employeeId}</td>
                <td>{user.email}</td>
                <td>
                  <Link class="btn btn-primary mr-2" to={`/users/${user._id}`}>
                    View
                </Link>
                  <Link
                    class="btn btn-outline-primary mr-2"
                    to={`/users/edit/${user._id}`}
                  >
                    Edit
                </Link>
                  <Link
                    class="btn btn-danger"
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
