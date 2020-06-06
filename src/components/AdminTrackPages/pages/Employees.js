import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link ,Redirect} from "react-router-dom";

const Employees = () => {
  const token = localStorage.getItem('token');
  console.log(token)
  var login = true;
  if (token == null) {
    login = false;
  }
  const [loggedIn, setLogin] = useState(login)

  if (loggedIn === false) {
    return <Redirect to="/adminLogin" />
  }
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


  };

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
    <div style={{ display: 'flex', flexDirection: 'column' }} className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Link style={{ width: '180px', height: '50px' }} className="btn btn-outline-dark w-35" to="/adminTrack">Go to Home</Link>
        <Link style={{ width: '180px', height: '50px' }} className="btn btn-outline-dark w-35" to="/users/add">Add User</Link>

      </div>

      <div style={{ marginLeft: '-15px', marginTop: '-150px' }} className="container">


        <div className="py-4">
          <h1>Employees</h1>
          <table style={{ marginLeft: '-15px', width: '1007px' }} class="table table-bordered">
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
