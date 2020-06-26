import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams, NavLink, } from "react-router-dom";
import jwt_decode from 'jwt-decode'
import LastPageIcon from '@material-ui/icons/LastPage';

const EditUser = (props) => {
  // giving role based access by jwt token
  var decoded = jwt_decode(localStorage.getItem('token'));
  console.log(decoded.role);
  if (decoded.role !== "admin") {
    alert(' Unauthorized Acess, Only Admins are Authorized for these Routes')
    props.history.push('/')
  }
  let history = useHistory();
  const { id } = useParams();
  const [user, setUser] = useState({
    name: "",
    email: "",
    employeeId: "",
    phone: "",
    category: "",
    role: "",
    password: ""

  });

  const { name, email, employeeId, phone, category, role, password } = user;
  const onInputChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadUser();
  }, []);

  const onSubmit = async e => {
    e.preventDefault();
    // editting an specific employee with its emp id
    var token = localStorage.getItem('token');
    await axios.put(`https://hrms-project.herokuapp.com/api/edit/${employeeId}`, user,
      {
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` }
      }).then(res => {
        if (res.data.success == "true") {
          alert(res.data.message)
          history.push("/employees");
        } else {
          alert(res.data.message)
        }

      }).catch(err => {
        alert('EmpId is unique ,Dont Change')
      })



  };
  // loading data to the form before editting
  const loadUser = async () => {


    var token = localStorage.getItem('token');
    await axios.get(`https://hrms-project.herokuapp.com/api/user/${id}`,
      {
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` }
      }).then(result => {
        console.log(result.data.user);
        setUser(result.data.user);
      }).catch(err => {
        console.log(err)
      })

  };
  return (
    <div style={{ marginTop: '100px' }} className="container">
      <div style={{ backgroundColor: '#fff' }} className=" w-50 shadow mx-auto p-5">
        <h2 className="text-center mb-3">Edit A User</h2>
        <form style={{ marginLeft: '10px', backgroundColor: '#fff' }} onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <label for="name"><h3>Name</h3></label>
            <input
              type="text"
              className="form-control form-control-lg "
              placeholder="Enter Your Name"
              name="name"
              value={name}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <label for="email"><h3>Email address</h3></label>
            <input
              type="email"
              className="form-control form-control-lg"
              placeholder="Enter Your E-mail Address"
              name="email"
              value={email}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <label for="employeeId"><h3>Employee Id</h3></label>
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your EmployeeId"
              name="employeeId"
              value={employeeId}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <label for="phone"><h3>Contact</h3></label>
            <input
              type="contact"
              className="form-control form-control-lg"
              placeholder="Enter Your Phone Number"
              name="phone"
              value={phone}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <label for="category"><h3>Category</h3></label>
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Category Name"
              name="category"
              value={category}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <label for="role"><h3>Role</h3></label>
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Role"
              name="role"
              value={role}
              onChange={e => onInputChange(e)}
            />
          </div>
          <button className="btn btn-warning btn-block">Update User</button>
          <NavLink to="/employees"><button style={{display:'flex',justifyContent:'center'}} className="btn btn-primary btn-block mt-1"><LastPageIcon />Back</button></NavLink>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
