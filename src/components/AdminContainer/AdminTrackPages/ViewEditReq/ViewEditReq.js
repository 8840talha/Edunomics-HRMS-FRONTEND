import React, { Component } from 'react'
import './ViewEditReq.css';
import { NavLink } from 'react-router-dom'


class EditReqView extends Component {
    state = {
        approve: false,
        reject: false,
        data: []
    }

    componentDidMount() {
        var token = localStorage.getItem('token');
        fetch('https://hrms-project.herokuapp.com/api/editdetail', {
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
                        alert(data.message + 'No Request for Detail Change Found')
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
        fetch(`https://hrms-project.herokuapp.com/api/editdetail/${leaveId}`, {
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
    approveHandler = (id, empId) => {
        console.log(id)
        var Tokenn = localStorage.getItem('token');
        var leaveID = id;
        fetch(`https://hrms-project.herokuapp.com/api/editdetail/${leaveID}`, {
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
                    if (data.success == "true") {
                        var Tokennn = localStorage.getItem('token');
                        fetch(`https://hrms-project.herokuapp.com/api/edit/${empId}`, {
                            method: 'put',
                            body: JSON.stringify(this.state.data),
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": `Bearer ${Tokennn}`
                            }
                        }).then(response => response.json())
                            .then(data => {
                                console.log(data)
                                if (data.success == "false") {
                                    alert(data.message + " unable to put data")
                                } else {

                                    alert(data.message + "detail changed ")

                                }
                            })
                            .catch(error => {
                                console.log(error)
                            });
                    }
                }
            })
            .catch(error => {
                console.log(error)
            });


        console.log('approving')
    }
    render() {


        var result = this.state.data.map((val, index) => {
            console.log(val)
            return (<tr key={index}>
                <td>{val.description}</td>
                <td>{val.employeeId}</td>
                <td>{val.createdAt}</td>
                <td><img alt={val.employeeId} onClick={() => this.approveHandler(val._id)} src={require('../../../../assets/check.png')} /></td>
                <td><img alt={val.employeeId} onClick={() => this.rejectHandler(val._id)} src={require('../../../../assets/cross.png')} /></td>
            </tr>



            )


        })






        return (


            < div >

                <div className="Container">
                    <div className="tab">
                        <NavLink className="link" to="/employees"  >Employees</NavLink>
                        <   NavLink className="link" to="/viewLeaveReq">Leave Requests</NavLink>
                        <   NavLink className="link" to="/editReq">Edit Requests</NavLink>
                    </div>

                    <div>
                        <h1 className='headwidth'>Edit Requests</h1>

                        <div>
                            <table className="table table-striped table-bordered vieweditWidth">
                                <thead  >
                                    <tr>
                                        <th>Description</th>
                                        <th>Employee Id</th>
                                        <th>Date</th>
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

export default EditReqView;