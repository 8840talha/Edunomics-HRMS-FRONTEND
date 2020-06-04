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
    //   axios.post('https://hrms-project.herokuapp.com/api/login', newdata, {
    //     headers: { "Content-Type": "application/json" }
    // })
    var token = localStorage.getItem('token');
    const res = await axios.get(`https://hrms-project.herokuapp.com/api/user/${id}`,
      {
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` }
      }).then(res => {
        console.log(res.data);
        setUser(res.data.user);
      }).catch(err => {
        console.log(err)
      })

  };
  return (
    <div className="container py-4">
      <Link style={{ height: '50px' }} className="btn btn-primary" to="/employees">
        Back to Employeee
      </Link>
      <h1 className="display-4">User Id: {id}</h1>
      <hr />
      <ul className="list-group w-50">
        <li className="list-group-item">name: {user.name}</li>
        <li className="list-group-item">email: {user.email}</li>
        <li className="list-group-item">employeeId: {user.employeeId}</li>
        <li className="list-group-item">phone: {user.phone}</li>
        <li className="list-group-item">category: {user.category}</li>
        <li className="list-group-item">role: {user.role}</li>
      </ul>
    </div>
  );
};

export default User;
