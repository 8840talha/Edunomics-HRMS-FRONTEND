import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import jwt_decode from 'jwt-decode'

const User = (props) => {
  // giving Role Based Access by jwt token
  var decoded = jwt_decode(localStorage.getItem('token'));
  console.log(decoded.role);
  if (decoded.role !== "admin") {
    alert(' Unauthorized Acess, Only Admins are Authorized for these Routes')
    props.history.push('/')
  }
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
  // getting a view of an specific employee by id
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
    <div style={{ marginTop: '100px', backgroundColor: '#fff' }} className="container py-4">
      <Link style={{ height: '50px' }} className="btn btn-dark" to="/employees">
        Back to Employeee
      </Link>
      <h1 >User Id: {user.employeeId}</h1>
      <table style={{ margin: '0 auto', backgroundColor: '#fff' }} className="w-50 table  table-striped table-bordered ">
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
