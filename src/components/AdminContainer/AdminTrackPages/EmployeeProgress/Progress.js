import React, { Component } from 'react'
import './Progress.css';
import AdminSideBar from '../AdminSideBar/AdminSideBar'

class Progress extends Component {
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


        fetch('https://hrms-project.herokuapp.com/api/checktask/all', {
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
                        const Myarr = data.task;
                        console.log(Myarr)
                        this.setState({ data: Myarr })
                        alert(data.message)
                    } else {
                        throw new Error(data.message)
                    }
                })
        }).catch(error => {
            alert(error)
        });




    }



    render() {


        var result = this.state.data.map((val, index) => {
            const date = new Date(val.date);
            const DATE = date.toDateString();
            return (<tr key={index}>
                <td>{index + 1}</td>
                <td>{val.name}</td>
                <td>{val.description}</td>
                <td>{val.employeeId}</td>
                <td>{DATE}</td>


            </tr>



            )
        })






        return (


            < div style={{ display: 'flex' }} >

                <div style={{ width: '20%' }}>
                    <AdminSideBar show={this.state.show} />
                </div>
                <div className={this.state.show ? "PContainer" : "PContainerActive"}>
                    <div style={{ marginTop: '15px' }} className='admintoggle' onClick={() => this.setState({ show: !this.state.show })}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>


                    <div className={this.state.show ? "PheadActive" : "Phead"} >
                        <h1 >Daily Progress</h1>

                        <div>
                            <table className={this.state.show ? "table table-striped table-bordered PWidthActive" : "table table-striped table-bordered PWidth"} >
                                <thead  >
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Description</th>
                                        <th>Employee Id</th>
                                        <th>Date</th>
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

export default Progress;