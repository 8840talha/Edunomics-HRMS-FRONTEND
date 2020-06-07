import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const AddUser = () => {
  
  let history = useHistory();
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

  const onSubmit = async e => {
    e.preventDefault();
    var data = {
      ...user
    }
// adding a new employee
    var newdata = JSON.stringify(data);
    console.log(newdata)
    var tokenKey = localStorage.getItem('token')
    console.log(tokenKey)
    fetch('https://hrms-project.herokuapp.com/api/register', {
      method: 'post', method: 'POST', mode: "cors",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenKey}`
      },
      body: newdata
    }).then(response => response.json().then(jsonD => {
      if (jsonD.success == 'false') {
        alert(jsonD.message)

      } else {
        if (jsonD.success) {
          alert(jsonD.message)
          history.push("/employees");
        }
      }
    })).catch(error => {
      console.log(error)
    })



  }


  return (
    <div style={{marginTop:'100px'}} className="container">
      <div className=" w-50 mx-auto shadow p-5 ">
        <h2 className="text-center mb-4 ">Add A User</h2>
        <form style={{ marginLeft: '1px' }} onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Name"
              name="name"
              value={name}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control form-control-lg"
              placeholder="Enter Your Email"
              name="email"
              value={email}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Employee Id"
              name="employeeId"
              value={employeeId}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="contact"
              className="form-control form-control-lg"
              placeholder="Enter Your PhoneNumber"
              name="phone"
              value={phone}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Category"
              name="category"
              value={category}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Role"
              name="role"
              value={role}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control form-control-lg"
              placeholder="Enter Your password"
              name="password"
              value={password}
              onChange={e => onInputChange(e)}
            />
          </div>
          <button className="btn btn-primary btn-block ">Add User</button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
