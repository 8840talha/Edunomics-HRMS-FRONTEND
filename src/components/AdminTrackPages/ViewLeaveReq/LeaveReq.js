import React, { Component } from 'react'
import './LeaveReq.css';
import { NavLink } from 'react-router-dom'
import { TextField, jssPreset } from '@material-ui/core'

class LeaveView extends Component {
    state = {
        approve: false,
        reject: false,
        data: []
    }



    componentDidMount() {
        var token = localStorage.getItem('token');
        fetch('https://hrms-project.herokuapp.com/api/leave/all', {
            method: 'get',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }).then(response => {
            response.text()
                .then((dataStr) => {

                    let data = JSON.parse(dataStr);
                    console.log(data)
                    if (data.success == "false") {
                        alert(data.message + 'No Req Found')
                    } else {
                        const Myarr = data.Request;
                        console.log(Myarr)
                        this.setState({ data: Myarr })
                    }
                })
        }).catch(error => {
            console.log(error)
        });




    }
    rejectHandler = (id) => {
        console.log(id)
        var Token = localStorage.getItem('token');
        var leaveId = id;
        fetch(`https://hrms-project.herokuapp.com/api/leave/${leaveId}`, {
            method: 'put',
            body: JSON.stringify({ "status": "rejected" }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Token}`
            }
        }).then(response => response.json())
            .then(data => {
                if (data.success == "false") {
                    alert(data.message)
                } else {
                    this.setState({ reject: true })
                    alert(data.message)
                }
            })
            .catch(error => {
                console.log(error)
            });


        console.log('rejecting')
    }
    approveHandler = (id) => {
        console.log(id)
        var Tokenn = localStorage.getItem('token');
        var leaveID = id;
        fetch(`https://hrms-project.herokuapp.com/api/leave/${leaveID}`, {
            method: 'put',
            body: JSON.stringify({ "status": "approved" }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Tokenn}`
            }
        }).then(response => response.json())
            .then(data => {
                console.log(data)
                if (data.success == "false") {
                    alert(data.message)
                } else {
                    this.setState({ approve: true })
                    alert(data.message)
                }
            })
            .catch(error => {
                console.log(error)
            });
        console.log('approving')
    }
    render() {


        var result = this.state.data.map((val, index) => {

            return (<div className="descCont" key={index}>
                <p className="description">
                    {val.description}My EmpId is{val.employeeId}amd Todays dateis{val.date}
                </p>
                <div className="iconCont">
                    <img alt={val.employeeId} onClick={() => this.approveHandler(val._id)} src={require('../../../assets/check.png')} />
                    <img alt={val.employeeId} onClick={() => this.rejectHandler(val._id)} src={require('../../../assets/cross.png')} />
                </div>
            </div>

            )
        })






        return (


            < div >

                <div className="container">
                    <div style={{ top: '12.5rem', left: '-5rem', position: 'absolute', display: 'flex', flexDirection: 'column' }}>
                        <NavLink className="link" to="/employees"  >Employees</NavLink>
                        <   NavLink className="link" to="/viewLeaveReq">Leave Requests</NavLink>
                    </div>

                    <div>
                        <h1 className='headwidth'>View Leave</h1>

                        <div>
                            <div className="leaveContainer">
                                <h2>></h2>
                                <h2>Your Name</h2>
                                <h2>dd/mm/yy</h2>
                                <h2>Leave Request</h2>
                            </div>
                            <div className="par">

                                {result}


                            </div>
                        </div>

                    </div>


                </div>

            </div >

        )

    }

}

export default LeaveView;