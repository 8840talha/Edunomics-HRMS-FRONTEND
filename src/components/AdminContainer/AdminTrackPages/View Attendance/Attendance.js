import React, { useState } from 'react'
import './Attendance.css'
import AdminSideBar from '../AdminSideBar/AdminSideBar'
import axios from 'axios';

const Attendance = (props) => {
    const [LeaveArr, setLeave] = useState([])
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const searchHandler = (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        axios.get('https://hrms-project.herokuapp.com/api/attendance/all', {
            params: {
                "dateFrom": dateFrom,
                "dateTo": dateTo
            },
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }).then(res => {
            console.log(res.data)
            if (res.data.success = "true") {
                alert('Attendance Record Found')
                setLeave(res.data.AttendenceRecord)
            } else {
                alert(res.data.message)
            }

        }).catch(err => {
            if (err.response.status == 500) {
                alert(err.response.data.message)
            } else if (err.response.status == 404) {
                alert('No Record Found for these dates')
            }
        })
        console.log('clicked')
    }
    const [show, setshow] = useState(false)
    const renderAttendanceData = () => {
        return LeaveArr.map((LeaveAr, index) => {
            const { name, onLeave, present, _user, date } = LeaveAr;
            const d = new Date(date);
            const DATE = d.toDateString();
            console.log(DATE)
            return (
                <tr key={index} >
                    <td>{index + 1}</td>
                    <td>{name}</td>
                    <td>{_user}</td>
                    <td>{onLeave ? 'Was On Leave' : 'No'}</td>
                    <td>{present ? 'Present' : 'Absent'}</td>
                    <td>{DATE}</td>
                </tr>
            )
        })
    }
    return (
        <div style={{ display: 'flex' }}>
            <div style={{ width: '20%' }}>
                <AdminSideBar show={show} />
            </div>
            <div className={show ? "VAContainer" : "VAContainerActive"} >
                <div style={{ marginTop: '15px' }} className='admintoggle' onClick={() => setshow(!show)}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div className={show ? "VAheadActive" : "VAhead"}>
                    <h1 > View Attendance </h1>
                    <div className="VAmark">
                        <h3 style={{margin: "auto"}}>Date From</h3>
                        <input onChange={(e) => setDateFrom(e.target.value)} className="VAinp" type="date" placeholder="dateFrom" />
                        <h3 style={{margin: "auto"}}>Date To</h3>
                        <input onChange={(e) => setDateTo(e.target.value)} className="VAinp" type="date" placeholder="dateTo" />
                        <button onClick={searchHandler} className="ASearch">Search</button>
                    </div>

                    <table style={{ width: '80%', marginLeft: '10%', marginTop: '10px' }} className="table table-striped table-bordered">
                        <thead >
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>EmployeeID</th>
                                <th>OnLeave</th>
                                <th>Present</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderAttendanceData()}
                        </tbody>
                    </table>


                </div>





            </div>

        </div>





    )

}

export default Attendance;