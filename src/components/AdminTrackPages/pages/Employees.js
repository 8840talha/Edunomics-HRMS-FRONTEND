import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Employees = () => {
  const [users, setUser] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

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
    // const result = await axios.get("http://localhost:3003/users");

  };

  const deleteUser = async id => {
    // await axios.delete(`http://localhost:3003/users/${id}`);
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
    <div style={{ display: 'flex', flexDirection: 'column' }} className="container">
      <Link style={{ width: '180px', height: '50px', marginLeft: '420px' }} className="btn btn-outline-dark w-35" to="/users/add">Add User</Link>

      <div style={{ marginLeft: '-15px', marginTop: '-150px' }} className="container">


        <div className="py-4">
          <h1>Employees</h1>
          <table class="table border shadow">
            <thead class="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">EmployeesId</th>
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
    </div>
  );
};

export default Employees;
