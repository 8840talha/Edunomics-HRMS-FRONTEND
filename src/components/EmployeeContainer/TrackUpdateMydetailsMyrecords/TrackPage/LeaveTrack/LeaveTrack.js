import React, { Component } from 'react'
import './LeaveTrack.css';
import { NavLink, } from 'react-router-dom'
import { InputBase } from '@material-ui/core';
import axios from 'axios';
import SideBar from '../../Sidebar'
class LeaveTrack extends Component {

    state = {
        requested: true,
        pending: false,
        approved: false,
        rejected: false,
        sentReq: false,
        Description: '',
        NoOFLeaves: '',
        pendingLeaves: [],
        approvedLeaves: [],
        rejectedLeaves: [],
        showSide: false
    }


    componentDidMount() {
        // get leave count
        const tokenKey = localStorage.getItem('token');
        fetch('https://hrms-project.herokuapp.com/api/user', { method: 'get', headers: { "Content-Type": "application/json", "Authorization": `Bearer ` + tokenKey } })
            .then(res => {
                if (res.status !== 200 && res.status !== 201) {
                    console.log('hellllo');
                    throw new Error(res.status);
                }
                return res.json();
            })
            .then(response => {

                this.setState({ NoOFLeaves: response.user.leaveCount });

            })
            .catch(err => {
                this.setState({ NoOFLeaves: '' });

            })



    }


    // For leave request
    sendreqHandler = () => {
        this.setState({ sentReq: true })
        console.log(this.state.Description);
        var data = JSON.stringify({ "description": this.state.Description });
        const tokenKey = localStorage.getItem('token');
        fetch('https://hrms-project.herokuapp.com/api/leave', { method: 'post', body: data, headers: { "Content-Type": "application/json", "Authorization": `Bearer ` + tokenKey } })
            .then(res => {
                if (res.status !== 200 && res.status !== 201) {
                    console.log('hellllo');
                    throw new Error(res.status);
                }
                return res.json();
            })
            .then(response => {
                alert('request successfully sent');
                this.setState({ Description: '' })
            })
            .catch(err => {
                alert('Some error occurred. Try again later')
            })
    }

    onPendingClick = () => {
        // get pending call
        this.setState({
            requested: false,
            pending: true,
            approved: false,
            rejected: false,
        })

        const token = localStorage.getItem('token');
        axios.get('https://hrms-project.herokuapp.com/api/leave/pending', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            console.log(response.data)
            if (response.data.success == "true") {
                alert(response.data.message)
                this.setState({ pendingLeaves: response.data.Record })


            } else {
                alert(response.data.message)
            }

        }).catch(err => {
            alert('No Pending leaves')
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
        axios.get('https://hrms-project.herokuapp.com/api/leave/approved', {
            headers: {
                Authorization: `Bearer ${tokens}`
            }
        }).then(response => {
            console.log(response.data.Record)
            this.setState({ approvedLeaves: response.data.Record })
        }).catch(err => {
            alert('No approved leaves or network error')
        })
    }
    onRejectedClick = () => {

        // get rejected call
        this.setState({
            requested: false,
            pending: false,
            approved: false,
            rejected: true,
        })
        const tokenn = localStorage.getItem('token');
        axios.get('https://hrms-project.herokuapp.com/api/leave/rejected', {
            headers: {
                Authorization: `Bearer ${tokenn}`
            }
        }).then(response => {
            console.log(response.data.Record)
            this.setState({ rejectedLeaves: response.data.Record })
        }).catch(err => {
            alert('No rejected leaves or network error')
        })

    }
    renderPendingData() {
        return this.state.pendingLeaves.map((pendingLeave, index) => {
            const { _id, date, description, employeeId } = pendingLeave
            return (
                <tr key={_id} >

                    <td>{description}</td>
                    <td>{employeeId}</td>
                    <td>{date}</td>
                </tr>
            )
        })
    }
    renderApprovedData() {
        return this.state.approvedLeaves.map((approvedLeave, index) => {
            const { _id, date, description, employeeId } = approvedLeave
            return (
                <tr key={_id} >

                    <td>{description}</td>
                    <td>{employeeId}</td>
                    <td>{date}</td>
                </tr>
            )
        })
    }

    renderRejectedData() {
        return this.state.rejectedLeaves.map((rejectedLeave, index) => {
            const { _id, date, description, employeeId } = rejectedLeave
            return (
                <tr key={_id} >

                    <td>{description}</td>
                    <td>{employeeId}</td>
                    <td>{date}</td>
                </tr>
            )
        })
    }

    render() {
        return (

            <div style={{ display: 'flex' }} >
                <div style={{ width: '20%' }}>
                    <SideBar show={this.state.showSide} />
                </div>
                {/* <div className="updatecontainer"> */}

                {/* <div className="up">
                    <NavLink to='/track'><button className="link">Employee Home</button></NavLink>
                    <NavLink to='/update'><button className="link">Update Progress</button></NavLink>
                    <NavLink to='/leave'><button className="link">Leave Tracker</button></NavLink>
                </div> */}

                <div className={this.state.showSide ? "LTcontainer" : "LTActiveCont"}>
                    <div style={{ marginTop: '15px' }} className='toggle' onClick={() => this.setState({ showSide: !this.state.showSide })}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    {/* <div className="LtContainer"> */}
                    {/* <div className="up">
                        <NavLink to='/track'><button className="link">Employee Home</button></NavLink>
                        <NavLink to='/update'><button className="link">Update Progress</button></NavLink>
                        <NavLink to='/leave'><button className="link">Leave Tracker</button></NavLink>

                    </div> */}

                    <div>
                        <div className={this.state.showSide ? "LTActive" : "LT"}>
                            <h1 className='LTheadwidth'>Leave Track</h1>
                        </div>
                        <div className={this.state.showSide ? "btnContainerActive" : "btnContainer"}>
                            <button className={this.state.requested ? 'green' : null}
                                onClick={() => this.setState({
                                    requested: true,
                                    pending: false,
                                    approved: false,
                                    rejected: false
                                })}
                            >Request For Leave</button>
                            <button className={this.state.pending ? 'green' : null}
                                onClick={this.onPendingClick}>Pending</button>
                            <button className={this.state.approved ? 'green' : null}
                                onClick={this.onApprovedClick}>Approved </button>
                            <button className={this.state.rejected ? 'green' : null}
                                onClick={this.onRejectedClick}>Rejected</button>
                        </div>
                        <div>
                            {/* Requested */}
                            {this.state.requested ? <div>
                                <div className={this.state.showSide ? "paraActive" : "para"}>
                                    <InputBase
                                        rowsMax={10}
                                        onChange={(e) => {
                                            this.setState({
                                                Description: e.target.value
                                            })
                                        }}
                                        value={this.state.Description}
                                        multiline
                                        placeholder="Description For Leave"
                                        fullWidth
                                    />

                                </div>
                                {this.state.requested ? <button className={this.state.showSide ? 'reqActive' : 'req'} onClick={this.sendreqHandler} >Send Request</button> : null}
                            </div> : null}

                            {/* approved */}
                            {this.state.approved ? <div>
                                <div>
                                    <table className={this.state.showSide ? "table table-striped table-bordered tWidthActive" : "table table-striped table-bordered tWidth"}>
                                        <thead>
                                            <tr>
                                                <th>Description</th>
                                                <th>Employee ID</th>
                                                <th>Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.renderApprovedData()}
                                        </tbody>
                                    </table>

                                </div>

                            </div> : null

                            }
                            {/* rejected */}
                            {this.state.rejected ? <div>
                                <div>
                                    <table className={this.state.showSide ? "table table-striped table-bordered tWidthActive" : "table table-striped table-bordered tWidth"}>
                                        <thead>
                                            <tr>
                                                <th>Description</th>
                                                <th>Employee ID</th>
                                                <th>Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.renderRejectedData()}
                                        </tbody>
                                    </table>
                                </div>
                            </div> : null

                            }
                            {/* pending */}
                            {this.state.pending ? <div >
                                <div >

                                    <table className={this.state.showSide ? "table table-striped table-bordered tWidthActive" : "table table-striped table-bordered tWidth"}>
                                        <thead>
                                            <tr>
                                                <th>Description</th>
                                                <th>Employee ID</th>
                                                <th>Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.renderPendingData()}
                                        </tbody>
                                    </table>
                                </div>

                            </div> : null
                            }
                        </div>
                        <h3 className={this.state.showSide ? "m-20Active" : "m-20"}>No Of Leaves Available :{this.state.NoOFLeaves}</h3>
                    </div>
                    {/* 
                    <div className="down">

                        <div className="ImgContainer">
                            <img style={{ marginTop: '0.625rem', }} alt="img" src={require('../../../../../assets/profile.png')} />
                            <NavLink style={{ textAlign: 'center', color: 'black' }} to="/detailChange" >Edit Profile</NavLink>
                        </div>
                        <NavLink to='/mydetails'><button style={{ marginTop: '0.625rem' }} className="link">My Details</button></NavLink>
                        <NavLink to='/myrecords'><button className="link">My Records</button></NavLink>

                    </div> */}

                </div>

            </div >

        )

    }

}

export default LeaveTrack;