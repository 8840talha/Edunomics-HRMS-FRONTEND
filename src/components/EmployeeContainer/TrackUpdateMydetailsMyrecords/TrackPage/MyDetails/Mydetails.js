import React from 'react'
import { NavLink } from 'react-router-dom'
import SideBar from '../SideBar/Sidebar'
import './MyDetails.css'
class MyDetails extends React.Component {

    state = {
        name: '',
        email: '',
        phone: '',
        employeeId: '',
        category: '',
        role: '',
        showSide: false
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
            <div style={{ display: "flex" }}>

                <div style={{ width: '20%' }}>
                    <SideBar show={this.state.showSide} />
                </div>

                <div className={this.state.showSide ? "MDcontainer" : "MDActiveCont"}>
                    <div style={{ marginTop: '15px' }} className='toggle' onClick={() => this.setState({ showSide: !this.state.showSide })}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <div className={this.state.showSide ? "MDActive" : "MD"}>
                        <h1>My Details</h1>
                        <div>
                            <table style={{ margin: '0 auto', width: '30%', backgroundColor: '#fff' }} className="table table-bordered table-striped">
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


                </div>

            </div>


        )
    }

}

export default MyDetails;