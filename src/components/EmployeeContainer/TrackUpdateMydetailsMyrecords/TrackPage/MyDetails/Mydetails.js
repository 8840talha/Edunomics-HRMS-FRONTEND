import React from 'react'
import { NavLink } from 'react-router-dom'

import './MyDetails.css'
class MyDetails extends React.Component {

    state = {
        name: '',
        email: '',
        phone: '',
        employeeId: '',
        category: '',
        role: ''
    }
    // getting all personal details 
    componentDidMount() {
        const tokenKey = localStorage.getItem('token');


        fetch('https://hrms-project.herokuapp.com/api/user', { method: 'get', headers: { "Content-Type": "application/json", "Authorization": `Bearer ` + tokenKey } })
            .then(res => {

                if (res.status !== 200 && res.status !== 201) {

                    throw new Error(res.status);
                }
                return res.json();
            })
            .then(response => {
                const user = response.user;
                console.log(user);
                this.setState({
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    category: user.category,
                    phone: user.phone,
                    employeeId: user.employeeId
                })

            })
            .catch(err => {

                this.setState({ NoOFLeaves: '' });



            })
    }

    render() {

        return (
            <div>

                <div className="myDet-Container">
                    <div className="up">
                        <NavLink to='/track'><button className="link">Employee Home</button></NavLink>
                        <NavLink to='/update'><button className="link">Update Progress</button></NavLink>
                        <NavLink to='/leave'><button className="link">Leave Tracker</button></NavLink>

                    </div>


                    <div >
                        <h1 className="headMyDETAil">My Details</h1>
                        <div >
                            <table style={{ width: '25%', marginLeft: '30%' }} className="  table  table-striped table-bordered">
                                <tr>
                                    <th>Name:</th>
                                    <td>{this.state.name}</td>
                                </tr>
                                <tr>
                                    <th>Email:</th>
                                    <td>{this.state.email}</td>
                                </tr>
                                <tr>
                                    <th>Telephone:</th>
                                    <td>{this.state.phone}</td>
                                </tr>
                                <tr>
                                    <th>Role:</th>
                                    <td>{this.state.role}</td>
                                </tr>
                                <tr>
                                    <th>Category:</th>
                                    <td>{this.state.category}</td>
                                </tr>
                                <tr>
                                    <th>EmployeeId:</th>
                                    <td>{this.state.employeeId}</td>
                                </tr>
                            </table>

                        </div>

                    </div>
                    <div className="down" >

                        <div className="ImgContainer">
                            <img style={{ marginTop: '0.625rem', }} alt="img" src={require('../../../../../assets/profile.png')} />
                            <NavLink style={{ textAlign: 'center', color: 'black' }} to="/detailChange" >Edit Profile</NavLink>
                        </div>
                        <NavLink to='/mydetails'><button style={{ marginTop: '0.625rem' }} className="link">My Details</button></NavLink>
                        <NavLink to='/myrecords'><button className="link">My Records</button></NavLink>
                    </div>

                </div>

            </div>


        )
    }

}

export default MyDetails;