import React, { Component } from 'react'
import './LeaveTrack.css';
import { NavLink } from 'react-router-dom'
import { InputBase } from '@material-ui/core';
import axios from 'axios';

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
        rejectedLeaves: []
    }
    componentDidMount() {
        // get requested call
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


    // For request change
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
            console.log(response.data.Record)
            this.setState({ pendingLeaves: response.data.Record })
        }).catch(err => {
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
        axios.get('https://hrms-project.herokuapp.com/api/leave/approved', {
            headers: {
                Authorization: `Bearer ${tokens}`
            }
        }).then(response => {
            console.log(response.data.Record)
            this.setState({ approvedLeaves: response.data.Record })
        }).catch(err => {
            console.log(err);
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
            console.log(err);
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

            <div>

                <div className="container">
                    <div style={{ top: '12.5rem', left: '-5rem', position: 'absolute', display: 'flex', flexDirection: 'column' }}>
                        <NavLink className="link" to="/track"> Home</NavLink>
                        <NavLink className="link" to='/update'  >Update Progress</NavLink>
                        <NavLink className="link" to='/leave' >Leave Track</NavLink>
                    </div>

                    <div>
                        <h1 className='headwidth'>Leave Track</h1>
                        <div className="btnContainer">
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
                                <div className="para">
                                    <InputBase
                                        onChange={(e) => {
                                            this.setState({
                                                Description: e.target.value
                                            })
                                        }}
                                        value={this.state.Description}
                                        multiline
                                        placeholder="Description For Leave"
                                        fullWidth
                                        style={{ border: '1px solid darkgray', margin: '10px 0' }} />

                                </div>
                                {this.state.requested ? <button className='req' onClick={this.sendreqHandler} >Send Request</button> : null}
                            </div> : null}

                            {/* approved */}
                            {this.state.approved ? <div>
                                <div>
                                    <table style={{ width: '900px', marginLeft: '42px' }} className="table table-striped table-bordered">
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
                                {/* <button className='req' onClick={this.sendreqHandler} >Send Request</button> */}
                            </div> : null

                            }
                            {/* rejected */}
                            {this.state.rejected ? <div>
                                <div>
                                    <table style={{ width: '900px', marginLeft: '42px' }} className="table table-striped table-bordered">
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
                                {/* <button className='req' onClick={this.sendreqHandler} >Send Request</button> */}
                            </div> : null

                            }
                            {/* pending */}
                            {this.state.pending ? <div >
                                <div >

                                    <table style={{ width: '900px', marginLeft: '42px' }} className="table table-striped table-bordered">
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
                                {/* <button className='req' onClick={this.pendingReqHandler} >Send Request</button> */}
                            </div> : null
                            }
                        </div>
                        <h3 className="m-20">No Of Leaves Available :{this.state.NoOFLeaves}</h3>
                    </div>

                    <div style={{ top: '6.25rem', right: '-11.25rem', position: 'absolute', display: 'flex', flexDirection: 'column' }} >
                        <img style={{ marginTop: '0.625rem', }} alt="img" src={require('../../../../assets/edunomics.png')} />
                        <NavLink to='/mydetails' style={{ marginTop: '0.625rem', }} className="link"  >My Details</NavLink>
                        <NavLink className="link" to='/myrecords' >My Record</NavLink>
                    </div>

                </div>

            </div >

        )

    }

}

export default LeaveTrack;