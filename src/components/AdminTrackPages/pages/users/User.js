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
    <div className="container py-4">
      <Link style={{ height: '50px' }} className="btn btn-primary" to="/employees">
        Back to Employeee
      </Link>
      <h1 >User Id: {user.employeeId}</h1>
      <hr />
      <ul className="list-group w-50">
        <li className="list-group-item"><h1>Name: {user.name}</h1></li>
        <li className="list-group-item"><h1>Email: {user.email}</h1></li>
        <li className="list-group-item"><h1>EmployeeId: {user.employeeId}</h1></li>
        <li className="list-group-item"><h1>Phone: {user.phone}</h1></li>
        <li className="list-group-item"><h1>Category:{user.category}</h1></li>
        <li className="list-group-item"><h1>Role: {user.role}</h1></li>
      </ul>
    </div>
  );
};

export default User;
