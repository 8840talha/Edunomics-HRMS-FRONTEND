import React, { Component } from 'react'
import './LeaveReq.css';
import AdminSideBar from '../AdminSideBar/AdminSideBar'

class LeaveView extends Component {
    state = {
        islogin: true,
        approve: false,
        reject: false,
        data: [],
        show: false,
        reason: ''
    }


    // getting all the request made by employee for leave
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
                    if (data.success === "false") {

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

    changeHandler = (event) => {
        event.preventDefault();
        console.log(this.state.reason)
        this.setState({ [event.target.name]: event.target.value })
    }
    // rejecting the request
    rejectHandler = (id) => {
        console.log(id)

        var Token = localStorage.getItem('token');
        var leaveId = id;
        fetch(`https://hrms-project.herokuapp.com/api/leave/${leaveId}`, {
            method: 'put',
            body: JSON.stringify({ "status": "rejected", "comment": this.state.reason }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Token}`
            }
        }).then(response => response.json())
            .then(data => {
                if (data.success === "false") {
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
    // approving the request
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
                if (data.success === "false") {
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
             const date = new Date(val.date);
             const DATE = date.toDateString();
            return (<tr key={index}>
                <td>{index + 1}</td>
                <td>{val.description}</td>
                <td>{val.name}</td>
                <td>{val.employeeId}</td>
                <td>{DATE}</td>
                <td>{val.dateFrom}</td>
                <td>{val.dateTo}</td>
                <td><img alt={val.employeeId} onClick={() => this.approveHandler(val._id)} src={require('../../../../assets/check.png')} /></td>
                <td><img alt={val.employeeId} onClick={() => this.rejectHandler(val._id)} src={require('../../../../assets/cross.png')} />
                    <input type="text" placeholder="Reason" name="reason" onChange={this.changeHandler} />
                </td>
            </tr>



            )
        })






        return (


            < div style={{ display: 'flex' }} >

                <div style={{ width: '20%' }}>
                    <AdminSideBar show={this.state.show} />
                </div>
                <div className={this.state.show ? "LRContainer" : "LRContainerActive"}>
                    <div style={{ marginTop: '15px' }} className='admintoggle' onClick={() => this.setState({ show: !this.state.show })}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>


                    <div className={this.state.show ? "LRheadActive" : "LRhead"} >
                        <h1 >Leave Requests</h1>

                        <div>
                            <table className={this.state.show ? "table table-striped table-bordered viewleaveWidthActive" : "table table-striped table-bordered viewleaveWidth"} >
                                <thead  >
                                    <tr>
                                        <th>#</th>
                                        <th>Purpose</th>
                                        <th>Employee Name</th>
                                        <th>Employee Id</th>
                                        <th>Applied On</th>
                                        <th>Date From</th>
                                        <th>Date To</th>
                                        <th>Approve</th>
                                        <th>Reject</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {result}
                                </tbody>
                            </table>
                        </div>

                    </div>


                </div>

            </div >

        )

    }

}

export default LeaveView;