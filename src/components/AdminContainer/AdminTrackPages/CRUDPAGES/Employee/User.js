import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";


const User = () => {

  const [user, setUser] = useState({
    name: "",
    email: "",
    employeeId: "",
    phone: "",
    category: "",
    role: "",
    password: ""
  });
  const { id } = useParams();
  useEffect(() => {
    loadUser();
  }, []);
  const loadUser = async () => {
    var token = localStorage.getItem('token');
    const res = await axios.get(`https://hrms-project.herokuapp.com/api/user/${id}`,
      {
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` }
      }).then(res => {
        if (res.data.success == "true") {

          setUser(res.data.user);

        } else {
          alert(res.data.message)
        }

      }).catch(err => {
        console.log(err)
        alert('network issue or error')
      })

  };
  return (
    <div style={{ marginTop: '100px' }} className="container py-4">
      <Link style={{ height: '50px' }} className="btn btn-outline-light" to="/employees">
        Back to Employeee
      </Link>
      <h2 >User Id: {user.employeeId}</h2>
      <table style={{ margin: '0 auto', width: '35%' }} className="  table  table-striped table-bordered list-group-item">
        <tr>
          <th>Name:</th>
          <td>{user.name}</td>
        </tr>
        <tr>
          <th>Email:</th>
          <td>{user.email}</td>
        </tr>
        <tr>
          <th>Telephone:</th>
          <td>{user.phone}</td>
        </tr>
        <tr>
          <th>Role:</th>
          <td>{user.role}</td>
        </tr>
        <tr>
          <th>Category:</th>
          <td>{user.category}</td>
        </tr>
        <tr>
          <th>EmployeeId:</th>
          <td>{user.employeeId}</td>
        </tr>
      </table>

    </div>
  );
};

export default User;
