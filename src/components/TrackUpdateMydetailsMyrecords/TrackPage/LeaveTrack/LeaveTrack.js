import React, { Component } from 'react'
import './LeaveTrack.css';
import { NavLink } from 'react-router-dom'
import { InputBase } from '@material-ui/core';

class LeaveTrack extends Component {

    state = {
        requested: true,
        pending: false,
        approved: false,
        rejected: false,
        sentReq: false,
        Description: '',
        NoOFLeaves: '',
        approvedLeaves: [
            { id: 1, name: 'Wasif', date: 21 / 11 / 12, },

        ],
         rejectedLeaves: [
            { id: 1, name: 'manan', date: 21 / 11 / 12, },
        ]
    }
    componentDidMount() {
        const tokenKey = localStorage.getItem('token');
        //console.log(tokenKey);
        
        fetch('https://hrms-project.herokuapp.com/api/user',{method:'get', headers: { "Content-Type": "application/json" ,"Authorization": `Bearer `+tokenKey } })
        .then(res => {
            //console.log(res);
            if(res.status !== 200 && res.status !== 201) {
                console.log('hellllo');
                throw new Error(res.status);
            }
            return res.json();
        })	
        .then(response => {
                //console.log(response.user.leaveCount);
                this.setState({NoOFLeaves: response.user.leaveCount});
                //alert('sent');            
            })
            .catch(err => {
                //console.log(err.message);
                this.setState({NoOFLeaves: ''});
                    //alert('Some error occurred. Try again later')
                
                
            })

    }

    sendreqHandler = () => {
        this.setState({ sentReq: true })
        console.log(this.state.Description);
        var data = JSON.stringify({"description":this.state.Description});
        // send request here..
        const tokenKey = localStorage.getItem('token');
        //console.log(tokenKey);
        
        fetch('https://hrms-project.herokuapp.com/api/leave',{method:'post',body: data, headers: { "Content-Type": "application/json" ,"Authorization": `Bearer `+tokenKey } })
        .then(res => {
            //console.log(res);
            if(res.status !== 200 && res.status !== 201) {
                console.log('hellllo');
                throw new Error(res.status);
            }
            return res.json();
        })	
        .then(response => {
                //console.log(response);
                alert('request successfully sent');            
            })
            .catch(err => {
                //console.log(err.message);
                
                    alert('Some error occurred. Try again later')
                
                
            })

        this.state.approvedLeaves.push({ id: 1, name: '3', date: 122 / 3 / 33 })
        this.setState({ approvedLeaves: this.state.approvedLeaves })
    }

    renderTableData() {
        return this.state.approvedLeaves.map((approvedLeave, index) => {
            const { id, name, date } = approvedLeave
            return (
                <tr key={id}>

                    <td>{name}</td>
                    <td>{date}</td>
                </tr>
            )
        })
    }

    renderTableData1() {
        return this.state.rejectedLeaves.map((rejectedLeave, index) => {
            const { id, name, date } = rejectedLeave
            return (
                <tr key={id}>

                    <td>{name}</td>
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
                        <NavLink className="link" to='/update'  >Update Progress</NavLink>
                        <   NavLink className="link" to='/leave' >Leave Track</NavLink>
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
                                onClick={() => this.setState({
                                    requested: false,
                                    pending: true,
                                    approved: false,
                                    rejected: false,
                                    
                                })} >Pending</button>
                            <button className={this.state.approved ? 'green' : null}
                                onClick={() => this.setState({
                                    requested: false,
                                    pending: false,
                                    approved: true,
                                    rejected: false,
                                    
                                })}>Approved </button>
                            <button className={this.state.rejected ? 'green' : null}
                                onClick={() => this.setState({
                                    requested: false,
                                    pending: false,
                                    approved: false,
                                    rejected: true,
                                   

                                })}>Rejected</button>
                        </div>
                        <div>
                            {/* Requested */}
                            <div>
                                <div className="leaveContainer">
                                    <h2>></h2>
                                    <h2>Your Name</h2>
                                    <h2>dd/mm/yy</h2>
                                    <h2>Leave Request</h2>
                                </div>
                                <div className="para">
                                    <InputBase
                                        onChange={(e) => {
                                            this.setState({
                                                Description: e.target.value
                                            })
                                        }} multiline
                                        placeholder="Description For Leave"
                                        fullWidth
                                        style={{ border: '1px solid darkgray', margin: '10px 0' }} />

                                </div>
                                {this.state.requested ? <button className='req' onClick={this.sendreqHandler} >Send Request</button> : null}
                            </div>
                            {/* approved */}
                            {this.state.approved ? <div>
                                <div className="approved">
                                    <table >
                                        <thead>
                                            <tr>
                                                <th style={{ textAlign: 'left' }}>Approved By</th>
                                                <th style={{ textAlign: 'left' }}>Approved On</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.renderTableData()}
                                        </tbody>
                                    </table>

                                </div>
                                <button className='req' onClick={this.sendreqHandler} >Send Request</button>
                            </div> : null

                            }
                            {/* rejected */}
                            {this.state.rejected ? <div>
                                <div className="approved">
                                    <table >
                                        <thead>
                                            <tr>
                                                <th style={{ textAlign: 'left' }}>Approved By</th>
                                                <th style={{ textAlign: 'left' }}>Approved On</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.renderTableData1()}
                                        </tbody>
                                    </table>
                                </div>
                                <button className='req' onClick={this.sendreqHandler} >Send Request</button>
                            </div> : null

                            }
                            {/* pending */}
                            {this.state.pending ? <div >
                                <div className="leaveContainer">
                                    <h2>></h2>
                                    <h2>Bickey</h2>
                                    <h2>23/05/2020</h2>
                                    <h2>Leave Request</h2>
                                </div>
                                <button className='req' onClick={this.sendreqHandler} >Send Request</button>
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

            </div>

        )

    }

}

export default LeaveTrack;