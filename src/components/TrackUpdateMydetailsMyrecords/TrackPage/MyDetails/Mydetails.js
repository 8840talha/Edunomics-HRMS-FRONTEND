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
    componentDidMount() {
        const tokenKey = localStorage.getItem('token');
        //console.log(tokenKey);

        fetch('https://hrms-project.herokuapp.com/api/user', { method: 'get', headers: { "Content-Type": "application/json", "Authorization": `Bearer ` + tokenKey } })
            .then(res => {
                //console.log(res);
                if (res.status !== 200 && res.status !== 201) {
                    console.log('hellllo');
                    throw new Error(res.status);
                }
                return res.json();
            })
            .then(response => {
                const user = response.user;
                //console.log(user);
                this.setState({
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    category: user.category,
                    phone: user.phone,
                    employeeId: user.employeeId
                })
                //alert('sent');            
            })
            .catch(err => {
                //console.log(err.message);
                this.setState({ NoOFLeaves: '' });
                //alert('Some error occurred. Try again later')


            })
    }

    render() {
        return (
            <div>

                <div className="container">
                    <div style={{ top: '12.5rem', left: '-5rem', position: 'absolute', display: 'flex', flexDirection: 'column' }}>
                        <NavLink className="link" to='/update'  >Update Progress</NavLink>
                        <NavLink className="link" to='/leave' >Leave Track</NavLink>
                    </div>


                    <div >
                        <h1 className="headMyDETAil">My Details</h1>
                        <div >
                            <form>
                                <div className="form">
                                    <label><h4>Name</h4></label>
                                    {this.state.name}
                                </div>
                                {/* <div className="form">
                                    <label><h4>Last Name</h4></label>
                                    <input type="text" />
                                </div> */}
                                <div className="form">
                                    <label><h4>Mobile</h4></label>
                                    {this.state.phone}
                                </div>
                                <div className="form">
                                    <label><h4>Email</h4></label>
                                    {this.state.email}
                                </div>
                                {/* <div className="form">
                                    <label><h4>Addresse</h4></label>
                                    <input type="text" />
                                </div> */}
                                <div className="form">
                                    <label><h4>Employee Id</h4></label>
                                    {this.state.employeeId}
                                </div>
                                <div className="form">
                                    <label><h4>Category</h4></label>
                                    {this.state.category}
                                </div>
                                <div className="form">
                                    <label><h4>Role</h4></label>
                                    {this.state.role}
                                </div>

                            </form>
                            <button className="change"><a href="/detailChange">Request For Change In Details</a></button>
                        </div>

                    </div>
                    <div style={{ top: '6.25rem', right: '-11.25rem', position: 'absolute', display: 'flex', flexDirection: 'column' }} >
                        <img style={{ marginTop: '0.625rem', }} alt="img" src={require('../../../../assets/edunomics.png')} />
                        <NavLink to='/mydetails' style={{ marginTop: '0.625rem', }} className="link"  >My Details</NavLink>
                        <NavLink className="link" to='/myrecords' >My Record</NavLink>
                    </div>

                </div>

            </div>


        )
    }

}

export default MyDetails;