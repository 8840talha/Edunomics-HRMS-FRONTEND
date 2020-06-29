import React, { Component } from 'react'
import './project.css';
import { Link } from 'react-router-dom';
import { NavLink, } from 'react-router-dom'
import { InputBase } from '@material-ui/core';
import axios from 'axios';
import jwt_decode from 'jwt-decode'
import SideBar from '../AdminSideBar/AdminSideBar';
import { Button } from 'react-bootstrap'
class Project extends Component {

    state = {
        requested: true,
        pending: false,
        approved: false,
        rejected: false,
        sentReq: false,
        description: '',
        showSide: false,
        users: [],
        user: [],
        project: []
    }


    handleChange = (event) => {
        event.preventDefault();

        this.setState({ [event.target.name]: event.target.value })
        console.log(this.state.description)

    }



    componentDidMount() {
        // get leave count
        var decoded = jwt_decode(localStorage.getItem('token'));
        console.log(decoded.role);
        if (decoded.role !== "admin") {
            alert(' Unauthorized Acess, Only Admins are Authorized for these Routes')
            this.props.history.push('/projectsEmp')
        }
        const tokenKey = localStorage.getItem('token');
        fetch('https://hrms-project.herokuapp.com/api/user/all', { method: 'get', headers: { "Content-Type": "application/json", "Authorization": `Bearer ` + tokenKey } })
            .then(res => {
                if (res.status !== 200 && res.status !== 201) {
                    console.log('hellllo');
                    throw new Error(res.status);
                }
                return res.json();
            })
            .then(response => {
                console.log(response);
                this.setState({ users: response.user })

                // this.setState({ NoOFLeaves: response.user.leaveCount });

            })
            .catch(err => {
                console.log(err);
                // this.setState({ NoOFLeaves: '' });

            })



    }


    // For leave request
    sendreqHandler = () => {
        this.setState({ sentReq: true })
        console.log(this.state.description, this.state.user)

        var data = JSON.stringify({
            "name": this.state.description,
            "member": this.state.user
        });
        const tokenKey = localStorage.getItem('token');
        fetch('https://hrms-project.herokuapp.com/api/project', { method: 'post', body: data, headers: { "Content-Type": "application/json", "Authorization": `Bearer ` + tokenKey } })
            .then(res => {
                if (res.status !== 200 && res.status !== 201) {
                    console.log('hellllo');
                    throw new Error(res.status);
                }
                return res.json();
            })
            .then(response => {
                console.log(response._id);

                alert('request successfully sent');
                this.setState({
                    description: ''
                })
                this.props.history.push('/kanban', { project: response });
            })
            .catch(err => {
                if (err == 401) {
                    alert('unauthorised access');
                } else {
                    alert('Some error occurred')
                }
                console.log(err);


            })
    }




    onApprovedClick = () => {

        // get approved call
        this.setState({
            requested: false,
            pending: false,
            approved: true,
            rejected: false,
        })
        const tokens = localStorage.getItem('token');
        const tokenKey = localStorage.getItem('token');
        fetch('https://hrms-project.herokuapp.com/api/user/all', { method: 'get', headers: { "Content-Type": "application/json", "Authorization": `Bearer ` + tokenKey } })
            .then(res => {
                if (res.status !== 200 && res.status !== 201) {
                    console.log('hellllo');
                    throw new Error(res.status);
                }
                return res.json();
            })
            .then(response => {
                console.log(response.user);
                this.setState({ project: response.user })


            })
            .catch(err => {

                console.log(err);


            })
    }


    renderApprovedData() {
        return this.state.project.map((project, index) => {
            return (
                <tr key={index} >
                    <th scope="row">{index + 1}</th>
                    <td>{project.name}</td>
                    <td>{project.employeeId}</td>
                    <td><Link className="btn btn-primary btn-block mr-2" to={`/viewProject/${project.employeeId}`}>
                        View Project
                </Link></td>

                </tr>
            )
        })
    }



    renderUserData() {
        console.log("helllll0");

        return this.state.users.map((user, index) => {
            <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.employeeId}</td>

            </tr>
        })
    }

    userAdd(employeeId) {
        let list = [...this.state.user];
        if (list.indexOf(employeeId) === -1) {
            list = [...this.state.user, employeeId];
        }

        console.log(list);
        this.setState({ user: list });


    }
    userDelete(employeeId) {
        const list = [...this.state.user];
        for (var i = 0; i < list.length; i++) {
            if (list[i] === employeeId) {
                list.splice(i, 1);

            }
        }
        console.log(list);
    }
    render() {
        return (

            <div style={{ display: 'flex' }} >
                <div style={{ width: '20%' }}>
                    <SideBar show={this.state.showSide} />
                </div>
                <div className={this.state.showSide ? "LTcontainer" : "LTActiveCont"}>
                    <div style={{ marginTop: '15px' }} className='toggle' onClick={() => this.setState({ showSide: !this.state.showSide })}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <div>
                        <div className={this.state.showSide ? "LTActive" : "LT"}>
                            <h1 className='LTheadwidth'>Kanban</h1>
                        </div>
                        <div className={this.state.showSide ? "btnContainerActive" : "btnContainer"}>
                            <button className={this.state.requested ? 'green' : null}
                                onClick={() => this.setState({
                                    requested: true,
                                    pending: false,
                                    approved: false,
                                    rejected: false
                                })}
                            >Add Project</button>

                            <button className={this.state.approved ? 'green' : null}
                                onClick={this.onApprovedClick}>View Projects</button>

                        </div>
                        <div>
                            {/* Requested */}
                            {this.state.requested ? <div>
                                <div>
                                    <input value={this.state.description} className='Linpp' onChange={this.handleChange} name="description" placeholder="Project Name" type="text" />
                                    <table className={this.state.showSide ? "table table-striped table-bordered tWidthActive" : "table table-striped table-bordered tWidth"}>
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th>Employee ID</th>
                                                <th>Name</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {this.state.users.map((user, index) => (
                                                <tr key={index}>
                                                    <th scope="row">{index + 1}</th>
                                                    <td>{user.name}</td>
                                                    <td>{user.employeeId}</td>
                                                    <td>
                                                        <Button className="btn btn-primary mr-2"
                                                            onClick={() => { this.userAdd(user.employeeId) }}
                                                        >
                                                            Add user
                </Button>

                                                        <Button className="btn btn-danger"
                                                            onClick={() => { this.userDelete(user.employeeId) }}
                                                        >
                                                            Delete user
                </Button>
                                                    </td>


                                                </tr>
                                            ))}
                                        </tbody>

                                    </table>
                                </div>

                                {this.state.requested ? <button className={this.state.showSide ? 'reqActive' : 'req'} onClick={this.sendreqHandler} >Send Request</button> : null}
                            </div> : null}

                            {/* approved */}
                            {this.state.approved ? <div>
                                <div>
                                    <table className={this.state.showSide ? "table table-striped table-bordered tWidthActive" : "table table-striped table-bordered tWidth"}>
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th>Employee Name</th>
                                                <th>Employee ID</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.renderApprovedData()}
                                        </tbody>
                                    </table>

                                </div>

                            </div> : null

                            }

                        </div>
                    </div>
                </div>

            </div >

        )

    }

}

export default Project;