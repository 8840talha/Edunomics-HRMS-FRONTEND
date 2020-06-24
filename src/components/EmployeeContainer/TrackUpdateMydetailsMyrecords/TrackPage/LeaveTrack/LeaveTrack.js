import React, { Component } from 'react'
import './LeaveTrack.css';
import { NavLink, } from 'react-router-dom'
import { InputBase } from '@material-ui/core';
import axios from 'axios';
import SideBar from '../SideBar/Sidebar'
class LeaveTrack extends Component {

    state = {
        requested: true,
        pending: false,
        approved: false,
        rejected: false,
        sentReq: false,
        description: '',
        dateTo: '',
        dateFrom: '',
        NoOFLeaves: '',
        pendingLeaves: [],
        approvedLeaves: [],
        rejectedLeaves: [],
        showSide: false
    }

    handleChange = (event) => {
        event.preventDefault();

        this.setState({ [event.target.name]: event.target.value })
        console.log(this.state.description, this.state.dateFrom, this.state.dateTo)

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
        console.log(this.state.description, this.state.dateTo, this.state.dateFrom)

        var data = JSON.stringify({
            "description": this.state.description,
            "dateTo": this.state.dateTo,
            "dateFrom": this.state.dateFrom
        });
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
                this.setState({
                    description: '',
                    dateTo: '',
                    dateFrom: ''
                })
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
            const newDate = new Date(date);
            const DATE = newDate.toDateString();
            return (
                <tr key={_id} >

                    <td>{description}</td>
                    <td>{employeeId}</td>
                    <td>{DATE}</td>
                </tr>
            )
        })
    }
    renderApprovedData() {
        return this.state.approvedLeaves.map((approvedLeave, index) => {
            const { _id, date, description, employeeId } = approvedLeave
            const newDate = new Date(date);
            const DATE = newDate.toDateString();
            return (
                <tr key={_id} >

                    <td>{description}</td>
                    <td>{employeeId}</td>
                    <td>{DATE}</td>
                </tr>
            )
        })
    }

    renderRejectedData() {
        return this.state.rejectedLeaves.map((rejectedLeave, index) => {
            const { _id, date, description, employeeId, comment } = rejectedLeave
            const newDate = new Date(date);
            const DATE = newDate.toDateString();

            return (
                <tr key={_id} >

                    <td>{description}</td>
                    <td>{employeeId}</td>
                    <td>{DATE}</td>
                    <td>{comment}</td>
                </tr>
            )
        })
    }

    render() {
        return (

            <div style={{ display: 'flex' }} >
                <div style={{ width: '20%' }}>
                    <SideBar show={this.state.showSide} height=" 96.25rem" />
                </div>
                <div className={this.state.showSide ? "LTrackcontainer" : "LTrackActiveCont"}>
                    <div style={{ marginTop: '15px' }} className='toggle' onClick={() => this.setState({ showSide: !this.state.showSide })}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
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
                                    <div className="block">
                                        <label className='LABEL'>Purpose</label>
                                        <textarea className='Linput' style={{ marginTop: '5px', resize: 'none', height: '130px' }} rows="5" cols="50" value={this.state.description} onChange={this.handleChange} name="description" placeholder="Purpose for leave" type="Text" />
                                    </div>
                                    <div className="block">
                                        <label className='LABEL'>Date From</label>
                                        <input style={{ marginBottom: '5px' }} value={this.state.dateFrom} className='Linput' onChange={this.handleChange} name="dateFrom" placeholder="Date From" type="date" />
                                    </div>
                                    <div className="block">
                                        <label className='LABEL'>Date To</label>
                                        <input value={this.state.dateTo} className='Linput' onChange={this.handleChange} name="dateTo" placeholder="Date To" type="date" />
                                    </div>
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
                                                <th>Reason</th>
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


                </div>

            </div >

        )

    }

}

export default LeaveTrack;