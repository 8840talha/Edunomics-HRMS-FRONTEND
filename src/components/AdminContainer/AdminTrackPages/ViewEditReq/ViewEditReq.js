import React, { Component } from 'react'
import './ViewEditReq.css';
import { NavLink } from 'react-router-dom'
import AdminSideBar from '../AdminSideBar/AdminSideBar'

class EditReqView extends Component {
    state = {
        approve: false,
        reject: false,
        data: [],
        show: false
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
                    if (data.success === "false") {
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
    // rejecting employees request for edittting detail
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

    // approving and editting employees request for edittting detail
    approveHandler = (id, empId, index) => {
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
                if (data.success === "false") {
                    alert(data.message)
                } else {
                    this.setState({ approve: true })
                    alert(data.message)
                    if (data.success === "true") {
                        var Tokennn = localStorage.getItem('token');
                        fetch(`https://hrms-project.herokuapp.com/api/edit/${empId}`, {
                            method: 'put',
                            body: JSON.stringify(this.state.data[index]),
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": `Bearer ${Tokennn}`
                            }
                        }).then(response => response.json())
                            .then(data => {
                                console.log(data)
                                if (data.success === "false") {
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
        console.log(this.state.data)

        var result = this.state.data.map((val, index) => {
            console.log(val)
            var date = new Date(val.createdAt)
            var d = date.toLocaleDateString();
            return (<tr key={index}>
                <td>{index + 1}</td>
                <td>{val.employeeId}</td>
                <td>{this.state.data[index].name ? <l1>Name:{this.state.data[index].name},</l1> : null}
                    {this.state.data[index].email ? <l1>Email:{this.state.data[index].email},</l1> : null}
                    {this.state.data[index].category ? <l1>Category:{this.state.data[index].category},</l1> : null}
                    {this.state.data[index].role ? <l1>Role:{this.state.data[index].role},</l1> : null}
                    {this.state.data[index].phone ? <l1>Contact:{this.state.data[index].phone},</l1> : null}
                </td>
                <td>{d}</td>
                <td><img alt={val.employeeId} onClick={() => this.approveHandler(val._id, val.employeeId, index )} src={require('../../../../assets/check.png')} /></td>
                <td><img alt={val.employeeId} onClick={() => this.rejectHandler(val._id)} src={require('../../../../assets/cross.png')} /></td>
            </tr>



            )


        })







        return (


            < div style={{ display: 'flex' }} >

                <div style={{ width: '20%' }}>
                    <AdminSideBar show={this.state.show} />
                </div>
                <div className={this.state.show ? "VEContainer" : "VEContainerActive"}>
                    <div style={{ marginTop: '15px' }} className='admintoggle' onClick={() => this.setState({ show: !this.state.show })}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>

                    <div className={this.state.show ? "VEheadActive" : "VEhead"} >
                        <h1 >Edit Requests</h1>

                        <div>
                            <table className={this.state.show ? "table table-striped table-bordered vieweditWidthActive" : "table table-striped table-bordered vieweditWidth"} >
                                <thead  >
                                    <tr>
                                        <th>#</th>
                                        <th>Employee Id</th>
                                        <th>Change Fields</th>
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